<?php

declare(strict_types=1);

require_once __DIR__ . '/security.php';

configureSecurityHeaders();
handlePreflightRequest();
startSecureSession();
requirePostRequest();

$login = requireAuthenticatedUser();
requireValidCsrfToken();

function booleanPostValue(string $key): int
{
    $value = $_POST[$key] ?? false;

    return in_array($value, ['1', 1, true, 'true', 'on', 'yes'], true) ? 1 : 0;
}

$participation = [
    'isComing' => booleanPostValue('isComing'),
    'isComingVIP' => booleanPostValue('isComingVIP'),
    'isSleeping' => booleanPostValue('isSleeping'),
    'partnerIsComing' => booleanPostValue('partnerIsComing'),
    'partnerIsComingVIP' => booleanPostValue('partnerIsComingVIP'),
    'partnerIsSleeping' => booleanPostValue('partnerIsSleeping'),
    'kidsComing' => max(0, min(3, (int) ($_POST['kidsComing'] ?? 0))),
];

try {
    require_once __DIR__ . '/config/database.php';

    $db = Database::getInstance();
    $db->beginTransaction();

    $stmt = $db->prepare('SELECT login, password, isVIP, hasChild, partnerFirstName FROM userlogin WHERE login = :login LIMIT 1');
    $stmt->bindValue(':login', $login, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        $db->rollBack();
        jsonResponse(['success' => false, 'errors' => ['Utilisateur introuvable']], 404);
    }

    if ((int) ($user['isVIP'] ?? 0) !== 1) {
        $participation['isComingVIP'] = 0;
        $participation['partnerIsComingVIP'] = 0;
    }

    if (($user['hasChild'] ?? null) === null || (int) $user['hasChild'] === 0) {
        $participation['kidsComing'] = 0;
    }

    if (($user['partnerFirstName'] ?? null) === null || trim((string) $user['partnerFirstName']) === '') {
        $participation['partnerIsComing'] = 0;
        $participation['partnerIsComingVIP'] = 0;
        $participation['partnerIsSleeping'] = 0;
    }

    $existsStmt = $db->prepare('SELECT login FROM participations WHERE login = :login LIMIT 1');
    $existsStmt->bindValue(':login', $login, PDO::PARAM_STR);
    $existsStmt->execute();

    if ($existsStmt->fetch(PDO::FETCH_ASSOC)) {
        $saveStmt = $db->prepare(
            'UPDATE participations
             SET isComing = :isComing,
                 isComingVIP = :isComingVIP,
                 isSleeping = :isSleeping,
                 partnerIsComing = :partnerIsComing,
                 partnerIsComingVIP = :partnerIsComingVIP,
                 partnerIsSleeping = :partnerIsSleeping,
                 kidsComing = :kidsComing
             WHERE login = :login'
        );
    } else {
        $saveStmt = $db->prepare(
            'INSERT INTO participations (
                 login,
                 isComing,
                 isComingVIP,
                 isSleeping,
                 partnerIsComing,
                 partnerIsComingVIP,
                 partnerIsSleeping,
                 kidsComing
             ) VALUES (
                 :login,
                 :isComing,
                 :isComingVIP,
                 :isSleeping,
                 :partnerIsComing,
                 :partnerIsComingVIP,
                 :partnerIsSleeping,
                 :kidsComing
             )'
        );
    }

    $saveStmt->bindValue(':login', $login, PDO::PARAM_STR);
    foreach ($participation as $field => $value) {
        $saveStmt->bindValue(':' . $field, $value, PDO::PARAM_INT);
    }
    $saveStmt->execute();

    $answerStmt = $db->prepare('UPDATE userlogin SET hasAnswered = 1 WHERE login = :login');
    $answerStmt->bindValue(':login', $login, PDO::PARAM_STR);
    $answerStmt->execute();

    $db->commit();

    unset($user['password']);
    $user['hasAnswered'] = 1;

    jsonResponse([
        'success' => true,
        'user' => $user,
        'participation' => $participation,
    ]);
} catch (PDOException $e) {
    if (isset($db) && $db instanceof PDO && $db->inTransaction()) {
        $db->rollBack();
    }

    error_log($e->getMessage());
    jsonResponse(['success' => false, 'errors' => ['Erreur lors de l’enregistrement de la participation']], 500);
}

<?php

declare(strict_types=1);

require_once __DIR__ . '/security.php';

configureSecurityHeaders();
handlePreflightRequest();
startSecureSession();
requirePostRequest();

$login = normalizeStringInput('login');
$password = normalizeStringInput('password');

if ($login === '' || $password === '') {
    jsonResponse(['success' => false, 'errors' => ['Login et mot de passe obligatoires']], 400);
}

try {
    require_once __DIR__ . '/config/database.php';

    $db = Database::getInstance();

    $stmt = $db->prepare('SELECT * FROM userlogin WHERE login = :login LIMIT 1');
    $stmt->bindValue(':login', $login, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, (string) $user['password'])) {
        jsonResponse(['success' => false, 'errors' => ['Login ou mot de passe invalide']], 401);
    }

    session_regenerate_id(true);
    $_SESSION['user_login'] = (string) $user['login'];
    $_SESSION['user_id'] = isset($user['id']) ? (string) $user['id'] : (string) $user['login'];

    unset($user['password']);

    jsonResponse([
        'success' => true,
        'user' => $user,
        'csrfToken' => createCsrfToken(),
    ]);
} catch (PDOException $e) {
    error_log($e->getMessage());
    jsonResponse(['success' => false, 'errors' => ['Erreur de connexion à la base de données']], 500);
}

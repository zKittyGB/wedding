<?php
// Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Origin: *");
// Autoriser les méthodes GET, POST, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Autoriser les en-têtes Content-Type et Authorization
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Vérifier la méthode de requête
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Répondre à la méthode OPTIONS avec un statut 200 OK
    http_response_code(200);
    exit();
}

// Initialisation des erreurs
$errors = [];

// Vérifier si les données ont été envoyées via POST
if ($_SERVER["REQUEST_METHOD"] !== "POST" || !isset($_POST['login']) || !isset($_POST['password'])) {
    $errors[] = "Données manquantes";
    $response = array("success" => false, "errors" => $errors);
    echo json_encode($response);
    exit;
}

// Récupérer et vérifier les données
$login = htmlspecialchars(trim($_POST['login']), ENT_QUOTES, 'UTF-8');
$password = htmlspecialchars(trim($_POST['password']), ENT_QUOTES, 'UTF-8');

if (empty($login) || empty($password)) {
    $errors[] = "Les données sont vides";
}

if (empty($errors)) {
    try {
        require_once __DIR__ . '/config/database.php';

        $db = Database::getInstance();

        $stmt = $db->prepare("SELECT * FROM userlogin WHERE login = :login");
        $stmt->bindParam(":login", $login);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']);

            $response = [
                "success" => true,
                "user" => $user
            ];
        } else {
            $errors[] = "Login ou mot de passe invalide";
        }
    } catch (PDOException $e) {
        error_log($e->getMessage());
        $errors[] = "Erreur de connexion à la base de données";
    }
}

if (!empty($errors)) {
    $response = array("success" => false, "errors" => $errors);
}

echo json_encode($response);
exit;
?>

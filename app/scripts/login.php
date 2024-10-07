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
        // Connexion à la base de données
        $db_host = 'axelnetstaff.mysql.db'; // Adresse de l'hôte de la base de données
        $db_name = 'axelnetstaff'; // Nom de la base de données
        $db_user = 'axelnetstaff'; // Nom d'utilisateur MySQL
        $db_pass = 'Its2PeoplyOutside'; // Mot de passe MySQL

        $db = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Préparer et exécuter la requête SQL pour récupérer toutes les informations de l'utilisateur
        $stmt = $db->prepare("SELECT * FROM userlogin WHERE login = :login");
        $stmt->bindParam(":login", $login);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Vérifier le mot de passe haché
            if (password_verify($password, $user['password'])) {
                // Supprimer le mot de passe de la réponse pour des raisons de sécurité
                unset($user['password']);

                $response = array("success" => true, "user" => $user);
            } else {
                $errors[] = "Login ou mot de passe invalide";
            }
        } else {
            $errors[] = "Login ou mot de passe invalide";
        }
    } catch (PDOException $e) {
        $errors[] = "Erreur de connexion à la base de données : " . $e->getMessage();
    }
}

if (!empty($errors)) {
    $response = array("success" => false, "errors" => $errors);
}

echo json_encode($response);
exit;
?>

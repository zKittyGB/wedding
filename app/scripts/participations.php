<?php
// Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Origin: *");
// Autoriser les méthodes GET, POST, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Autoriser les en-têtes Content-Type et Authorization
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Initialisation des erreurs
$errors = [];

// Vérifier la méthode de requête
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Répondre à la méthode OPTIONS avec un statut 200 OK
    http_response_code(200);
    $errors[] = "Erreur au début"; // Erreur ajoutée pour le débogage
    $response = array("success" => false, "errors" => $errors);
    echo json_encode($response);
    exit();
}

// Vérifier si les données ont été envoyées via POST
if ($_SERVER["REQUEST_METHOD"] !== "POST" || empty($_POST["login"])) {
    $errors[] = "Données manquantes";
    $response = array("success" => false, "errors" => $errors);
    echo json_encode($response);
    exit;
}

// Récupérer les données du formulaire
$isComing = isset($_POST['isComing']) && ($_POST['isComing'] === 'on' || $_POST['isComing'] === 'true') ? true : false;
$isComingVIP = isset($_POST['isComingVIP']) && ($_POST['isComingVIP'] === 'on' || $_POST['isComingVIP'] === 'true') ? true : false;
$isSleeping = isset($_POST['isSleeping']) && ($_POST['isSleeping'] === 'on' || $_POST['isSleeping'] === 'true') ? true : false;
$partnerIsComing = isset($_POST['partnerIsComing']) && ($_POST['partnerIsComing'] === 'on' || $_POST['partnerIsComing'] === 'true') ? true : false;
$partnerIsComingVIP = isset($_POST['partnerIsComingVIP']) && ($_POST['partnerIsComingVIP'] === 'on' || $_POST['partnerIsComingVIP'] === 'true') ? true : false;
$partnerIsSleeping = isset($_POST['partnerIsSleeping']) && ($_POST['partnerIsSleeping'] === 'on' || $_POST['partnerIsSleeping'] === 'true') ? true : false;
$kidsComing = isset($_POST['kidsComing']) ? (int)$_POST['kidsComing'] : 0;
$login = htmlspecialchars(trim($_POST['login']), ENT_QUOTES, 'UTF-8');

// // Ajouter un débogage pour vérifier les données reçues
// file_put_contents('debug.log', print_r($_POST, true), FILE_APPEND);

// // Préparer la réponse
// $response = array(
//     "success" => true,
//     "login" => $login,
//     "kidsComing" => $kidsComing,
//     "partnerIsSleeping" => $partnerIsSleeping,
//     "partnerIsComingVIP" => $partnerIsComingVIP,
//     "partnerIsComing" => $partnerIsComing,
//     "isSleeping" => $isSleeping,
//     "isComingVIP" => $isComingVIP,
//     "isComing" => $isComing
// );

// echo json_encode($response);
// exit;

try {
    // Connexion à la base de données
    $db_host = 'axelnetstaff.mysql.db'; // Adresse de l'hôte de la base de données
    $db_name = 'axelnetstaff'; // Nom de la base de données
    $db_user = 'axelnetstaff'; // Nom d'utilisateur MySQL
    $db_pass = 'Its2PeoplyOutside'; // Mot de passe MySQL

    $db = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Préparer la requête SQL pour mettre à jour les données
    $stmt = $db->prepare("
        UPDATE userlogin 
        SET 
            isComing = :isComing, 
            isComingVIP = :isComingVIP, 
            isSleeping = :isSleeping,
            partnerIsComing = :partnerIsComing, 
            partnerIsComingVIP = :partnerIsComingVIP, 
            partnerIsSleeping = :partnerIsSleeping, 
            kidsComing = :kidsComing, 
            hasAnswered = true
        WHERE login = :login
    ");

    // Lier les paramètres
    $stmt->bindParam(':isComing', $isComing, PDO::PARAM_BOOL);
    $stmt->bindParam(':isComingVIP', $isComingVIP, PDO::PARAM_BOOL);
    $stmt->bindParam(':isSleeping', $isSleeping, PDO::PARAM_BOOL);
    $stmt->bindParam(':partnerIsComing', $partnerIsComing, PDO::PARAM_BOOL);
    $stmt->bindParam(':partnerIsComingVIP', $partnerIsComingVIP, PDO::PARAM_BOOL);
    $stmt->bindParam(':partnerIsSleeping', $partnerIsSleeping, PDO::PARAM_BOOL);
    $stmt->bindParam(':kidsComing', $kidsComing, PDO::PARAM_INT);
    $stmt->bindParam(':login', $login, PDO::PARAM_STR);

    // Exécuter la requête
    $stmt->execute();

    // Vérifier si des lignes ont été affectées
    if ($stmt->rowCount() > 0) {
        $response = array("success" => true, "message" => "Données mises à jour avec succès");
    } else {
        $errors[] = "Aucune mise à jour effectuée. Vérifiez si le login est correct.";
        $response = array("success" => false, "errors" => $errors);
    }
} catch (PDOException $e) {
    $errors[] = "Erreur de connexion à la base de données : " . $e->getMessage();
    $response = array("success" => false, "errors" => $errors);
}

// Retourner la réponse au format JSON
echo json_encode($response);
exit;
?>

<?php
// Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Origin: *");
// Autoriser les méthodes GET, POST, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Autoriser les en-têtes Content-Type et Authorization
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Initialisation des erreurs
$errors = [];

// Tableau des utilisateurs avec leurs mots de passe non hachés
$users = [
    "Muriel" => "Zjm1zd9a",
    "Aurore" => "N1kt3mx!",
    "Sarah" => "B4nj6kc@",
    "Etienne" => "T5pl2dn!",
    "DaviEve" => "W8uq5rv@",
    "Eloise" => "L9sx2bm!",
    "CindyFamily" => "P7mb8kw@",
    "JulieFamily" => "E8dl7cn@",
    "zSamooth" => "C1hn8xy!",
    "zLolo" => "A7rp2sv%",
    "zChoinois" => "F6wr9nc!",
    "zDamik" => "D3kx5bt%",
    "Virginie" => "N8jz1ym@",
    "Allan" => "P3z1unv!",
    "Léa" => "Y4mv8zo@",
    "Arielle" => "Z5ku3lw?",
    "Crackou" => "N7xt2hp%",
    "GourouEtTeigne" => "Q9wb6nj@",
    "HattBigboss" => "M2np7a!",
    "Sissi" => "R6ni3hp@",
    "Kouka" => "P1gn2cd?",
    "Ayouya" => "M5lg3mj@",
    "TintinEpin" => "T3pw5qo%",
    "FloElva" => "X3pd7le!",
    "PasteauFamily" => "V6mj1zw$",
    "EmmaFurry" => "N7fb9yt@",
    "Freddy" => "K9jt6br!",
    "Salim" => "Q2ri8ln%",
];

if (empty($users)) {
    $errors[] = "Les données sont vides";
}

if (empty($errors)) {
    try {
        // Connexion à la base de données
        $db_host = 'axelnetstaff.mysql.db'; // Adresse de l'hôte de la base de données
        $db_name = 'axelnetstaff'; // Nom de la base de données
        $db_user = 'axelnetstaff'; // Nom d'utilisateur MySQL
        $db_pass = 'Its2PeoplyOutside'; // Mot de passe MySQL

        $db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Préparer la requête SQL pour mettre à jour les utilisateurs
        $stmt = $db->prepare("UPDATE userlogin SET password = :password WHERE login = :login");

        foreach ($users as $login => $password) {
            // Hacher le mot de passe
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Exécuter la requête avec les valeurs
            $stmt->bindParam(":login", $login);
            $stmt->bindParam(":password", $hashed_password);
            $stmt->execute();
        }

        $response = array("success" => true, "message" => "Tous les utilisateurs ont été mis à jour avec succès");
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

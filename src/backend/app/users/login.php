<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {

  $statement = $pdo->query('SELECT * FROM users');

  $user = $statement->fetch(PDO::FETCH_ASSOC);

  if (password_verify($_POST['password'], $user['password'])) {
    // If the password was valid we know that the user exists and provided
    // the correct password. We can now save the user in our session.
    // Remember to not save the password in the session!
    unset($user['password']);

    $_SESSION['user'] = $user;
  }

  echo json_encode($users);

  http_response_code(200);
}

// // Check if both email and password exists in the POST request.
// if (isset($_POST['email'], $_POST['password'])) {
//     $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

//     // Prepare, bind email parameter and execute the database query.
//     $statement = $pdo->prepare('SELECT * FROM users WHERE email = :email');
//     $statement->bindParam(':email', $email, PDO::PARAM_STR);
//     $statement->execute();

//     // Fetch the user as an associative array.
//     $user = $statement->fetch(PDO::FETCH_ASSOC);

//     // If we couldn't find the user in the database, redirect back to the login
//     // page with our custom redirect function.
//     if (!$user) {
//         redirect('/login.php');
//     }

//     // If we found the user in the database, compare the given password from the
//     // request with the one in the database using the password_verify function.
//     if (password_verify($_POST['password'], $user['password'])) {
//         // If the password was valid we know that the user exists and provided
//         // the correct password. We can now save the user in our session.
//         // Remember to not save the password in the session!
//         unset($user['password']);

//         $_SESSION['user'] = $user;
//     }
// }

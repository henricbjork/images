<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
// header('Access-Control-Allow-Methods: POST');

if (isset($_POST['email'], $_POST['password'])) {
  $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $getEmail = $pdo->prepare('SELECT * FROM users WHERE email = :email');
  $getEmail->bindParam(':email', $email, PDO::PARAM_STR);
  $getEmail->execute();

  $user = $getEmail->fetch(PDO::FETCH_ASSOC);

  if ($user) {
    echo json_encode(array('message' => 'User already exist'));
    exit;
  }

  $query = "INSERT INTO users ('email', 'password') VALUES (:email, :password)";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':email', $email, PDO::PARAM_STR);
  $statement->bindParam(':password', $password, PDO::PARAM_STR);
  $statement->execute();

  echo json_encode(array('message' => 'User was created'));
}

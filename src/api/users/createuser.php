<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

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

  $statement = $pdo->prepare('SELECT * FROM users WHERE email = :email');
  $statement->bindParam(':email', $email, PDO::PARAM_STR);
  $statement->execute();

  $user = $statement->fetch(PDO::FETCH_ASSOC);

  unset($user['password']);
  $_SESSION['user'] = $user['id'];

  echo json_encode(array('message' => 'User was created', 'user' => $user['id'], 'result' => 200));
}

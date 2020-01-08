<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_POST['email'], $_POST['password'])) {
  $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $statement = $pdo->prepare('SELECT email FROM users WHERE email = :email');
  $statement->bindParam(':email', $email, PDO::PARAM_STR);
  $statement->execute();
  $user = $statement->fetch(PDO::FETCH_ASSOC);

  if ($user) {
    echo json_encode(array('message' => 'User already exist'));
    exit;
  }

  $query = "INSERT INTO users ('email', 'password') VALUES (:email, :password)";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':email', $email, PDO::PARAM_STR);
  $statement->bindParam(':password', $password, PDO::PARAM_STR);
  $statement->execute();

  $query = "SELECT id FROM users WHERE email = :email";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':email', $email, PDO::PARAM_STR);
  $statement->execute();
  $user = $statement->fetch(PDO::FETCH_ASSOC);

  $query = "INSERT INTO followings (follower_user_id, followed_user_id) VALUES (:id, :id)";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':id', $user['id'], PDO::PARAM_STR);
  $statement->execute();

  $_SESSION['user'] = $user['id'];

  echo json_encode(array('message' => 'User was created', 'user' => $user['id']));
  http_response_code(201);
}

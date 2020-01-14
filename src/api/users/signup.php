<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_POST['email'], $_POST['password'], $_POST['passwordConfirm'])) {
  $sanitizedEmail = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
  $email = filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL);
  $password = $_POST['password'];
  $passwordConfirm = $_POST['passwordConfirm'];

  if (!$email || empty($email)) {
    echo json_encode(array('message' => 'Invalid email'));
    http_response_code(400);
    exit;
  }

  $statement = $pdo->prepare('SELECT email FROM users WHERE email = :email');
  $statement->bindParam(':email', $email, PDO::PARAM_STR);
  $statement->execute();
  $user = $statement->fetch(PDO::FETCH_ASSOC);

  if ($user) {
    echo json_encode(array('message' => 'User already exist'));
    http_response_code(401);
    exit;
  }

  if ($password !== $passwordConfirm) {
    echo json_encode(array('message' => 'Passwords need to match'));
    http_response_code(400);
    exit;
  }

  if (strlen($password) < 4) {
    echo json_encode(array('message' => 'Password to needs to be 4 characters or longer'));
    http_response_code(400);
    exit;
  }

  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  $query = "INSERT INTO users ('email', 'password') VALUES (:email, :password)";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':email', $email, PDO::PARAM_STR);
  $statement->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
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

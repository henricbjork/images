<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['email'], $_POST['password'], $_POST['passwordConfirm'])) {
    $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));
    $sanitizedEmail = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
    $email = filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'];
    $passwordConfirm = $_POST['passwordConfirm'];

    if (!empty($email)) {
      $query = "SELECT email FROM users WHERE email = :email AND NOT id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':email', $email, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
      $emailExists = $statement->fetch(PDO::FETCH_ASSOC);

      if ($emailExists) {
        echo json_encode(array('message' => 'Email already used by another user'));
        http_response_code(409);
        exit;
      }

      $query = "UPDATE users SET email = :email WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':email', $email, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
    }

    if (!empty($password)) {
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

      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
      $query = "UPDATE users SET password = :password WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':password', $password, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
    }

    echo json_encode(array('message' => 'Updated settings'));
    http_response_code(200);
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
  http_response_code(401);
}

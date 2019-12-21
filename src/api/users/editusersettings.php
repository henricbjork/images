<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_NUMBER_INT));

  if (isset($_POST['biography'], $_POST['email'], $_POST['password'])) {
    $biography = trim(filter_var($_POST['biography'], FILTER_SANITIZE_STRING));
    $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
    $password = $_POST['password'];

    if (!empty($biography) && !empty($email) && !empty($password)) {
      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
      $query = "UPDATE users SET biography = :biography, email = :email, password = :password WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':biography', $biography, PDO::PARAM_STR);
      $statement->bindParam(':email', $email, PDO::PARAM_STR);
      $statement->bindParam(':password', $password, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
      echo json_encode(array('message' => 'Updated settings'));
    }
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

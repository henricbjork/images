<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_NUMBER_INT));

  $statement = $pdo->prepare('SELECT * FROM users WHERE id = :id');
  $statement->bindParam(':id', $id, PDO::PARAM_INT);
  $statement->execute();

  $user = $statement->fetch(PDO::FETCH_ASSOC);
  unset($user['password']);

  echo json_encode($user);

  http_response_code(200);
} else {
  echo json_encode(array('message' => 'Not logged in'));
}
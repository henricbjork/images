<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));

  $query = "SELECT email, biography, avatar FROM users WHERE id = :id";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':id', $id, PDO::PARAM_STR);
  $statement->execute();
  $user = $statement->fetch(PDO::FETCH_ASSOC);

  echo json_encode($user);
  http_response_code(200);
} else {
  echo json_encode(array('message' => 'Not logged in'));
  http_response_code(401);
}

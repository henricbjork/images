<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  $filePath = (__DIR__ . '/hej.txt');

  $content = trim(file_get_contents("php://input"));

  $decoded = json_decode($content, true);

  // file_put_contents($filePath, $decoded);

  $query = "INSERT INTO posts ('user_id', 'description', 'content') VALUES (:user_id, :description, :content)";
  $statement = $pdo->prepare($query);

  if (!$statement) {
    die(var_dump($pdo->errorInfo()));
  }

  $statement->bindParam(':user_id', $decoded, PDO::PARAM_STR);
  $statement->bindParam(':description', $decoded, PDO::PARAM_STR);
  $statement->bindParam(':content', $decoded, PDO::PARAM_STR);
  $statement->execute();
}


http_response_code(201);

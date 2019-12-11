<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

// if (authenticated)

// $statement = $pdo->query('SELECT * FROM posts');

// $posts = $statement->fetchAll(PDO::FETCH_ASSOC);

// echo json_encode($posts);

// header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');

// http_response_code(200);

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));

  $decoded = json_decode($content, true);

  $query = 'INSERT INTO posts (content) VALUES (:content)';
  $statement = $pdo->prepare($query);
  if (!$statement) {
    die(var_dump($pdo->errorInfo()));
  }
  $statement->bindParam(':content', $decoded, PDO::PARAM_STR);
  $statement->execute();


  //If json_decode failed, the JSON is invalid.
  // if(! is_array($decoded)) {

  // } else {
  //   // Send error back to user.
  // }
}

header('Access-Control-Allow-Origin: *');
http_response_code(201);

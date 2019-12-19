<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  $statement = $pdo->query('SELECT * FROM posts ORDER BY id DESC');

  $posts = $statement->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($posts);

  http_response_code(200);
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

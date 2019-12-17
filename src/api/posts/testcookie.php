<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  echo json_encode('hej');
} else {
  echo json_encode('not logged in');
}

// $statement = $pdo->query('SELECT * FROM posts');

// $posts = $statement->fetchAll(PDO::FETCH_ASSOC);
// echo json_encode($posts);

// http_response_code(200);

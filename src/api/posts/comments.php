<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['id'])) {
    $id = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));

    $query = "SELECT comments.id, comments.comment, users.email FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.post_id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':id', $id, PDO::PARAM_STR);
    $statement->execute();
    $comments = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($comments) {
      echo json_encode($comments);
    } else {
      echo json_encode(array('message' => 'No comments'));
    }
    http_response_code(200);
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
  http_response_code(401);
}

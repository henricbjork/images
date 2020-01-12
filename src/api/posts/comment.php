<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['id'], $_POST['comment'])) {
    $postId = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));
    $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));
    $comment = trim(filter_var($_POST['comment'], FILTER_SANITIZE_STRING));

    if (!empty($comment)) {
      $query = "INSERT INTO comments ('post_id', 'user_id', 'comment') VALUES (:pid, :id, :comment)";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->bindParam(':comment', $comment, PDO::PARAM_STR);
      $statement->execute();

      echo json_encode(array('message' => 'Comment added'));
      http_response_code(201);
    } else {
      echo json_encode(array('message' => 'Comment empty'));
      http_response_code(400);
    }
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
  http_response_code(401);
}

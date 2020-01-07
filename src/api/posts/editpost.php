<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['description'], $_POST['id'])) {
    $description = trim(filter_var($_POST['description'], FILTER_SANITIZE_STRING));
    $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));
    $postId = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));

    $query = "SELECT description FROM posts WHERE id = :pid AND user_id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
    $statement->bindParam(':id', $id, PDO::PARAM_STR);
    $statement->execute();
    $post = $statement->fetch(PDO::FETCH_ASSOC);

    if ($post) {
      $query = "UPDATE posts SET description = :description WHERE id = :pid AND user_id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':description', $description, PDO::PARAM_STR);
      $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();
      echo json_encode(array('message' => 'The post was updated', 'result' => 200));
    } else {
      echo json_encode(array('message' => 'No access to edit post', 'result' => 400));
    }
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

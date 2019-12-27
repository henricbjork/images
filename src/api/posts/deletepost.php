<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['id'])) {
    $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));
    $postId = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));

    $query = "SELECT content FROM posts WHERE id = :pid AND user_id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
    $statement->bindParam(':id', $id, PDO::PARAM_STR);
    $statement->execute();

    $post = $statement->fetch(PDO::FETCH_ASSOC);

    if ($post) {
      $src = __DIR__ . '/uploads/images/' . $post['content'];

      unlink($src);

      $query = "DELETE FROM posts WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':id', $postId, PDO::PARAM_STR);
      $statement->execute();

      $query = "DELETE FROM likes WHERE post_id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':id', $postId, PDO::PARAM_STR);
      $statement->execute();

      echo json_encode(array('message' => 'The post is deleted'));
    } else {
      echo json_encode(array('message' => 'No access to delete post'));
    }
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

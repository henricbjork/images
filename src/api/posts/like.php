<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['id'])) {
    $postId = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));
    $userId = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));

    $query = "SELECT user_id, post_id FROM likes WHERE user_id = :uid AND post_id = :pid";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':uid', $userId, PDO::PARAM_STR);
    $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
    $statement->execute();

    $liked = $statement->fetch(PDO::FETCH_ASSOC);

    $query = "SELECT id, likes FROM posts WHERE id = :pid";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
    $statement->execute();

    $likes = $statement->fetch(PDO::FETCH_ASSOC);

    if ($liked) {
      $unlike = $likes['likes'] - 1;

      $query = "UPDATE posts SET likes = :unlike WHERE id = :pid";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':unlike', $unlike, PDO::PARAM_STR);
      $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
      $statement->execute();

      $query = "DELETE FROM likes WHERE user_id = :uid AND post_id = :pid";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':uid', $userId, PDO::PARAM_STR);
      $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
      $statement->execute();

      echo json_encode(array('message' => 'Unliked'));
    } else {
      $like = $likes['likes'] + 1;
      $query = "UPDATE posts SET likes = :like WHERE id = :pid";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':like', $like, PDO::PARAM_STR);
      $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
      $statement->execute();

      $query = "INSERT INTO likes ('user_id','post_id') VALUES (:uid, :pid)";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':uid', $userId, PDO::PARAM_STR);
      $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
      $statement->execute();

      echo json_encode(array('message' => 'Liked'));
    }
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

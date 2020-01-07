<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['id'])) {
    $userId = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));
    $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));

    $query = "SELECT follower_user_id, followed_user_id FROM followings WHERE follower_user_id = :id AND followed_user_id = :uid";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':id', $id, PDO::PARAM_STR);
    $statement->bindParam(':uid', $userId, PDO::PARAM_STR);
    $statement->execute();
    $followed = $statement->fetch(PDO::FETCH_ASSOC);

    if ($followed) {
      $query = "DELETE FROM followings WHERE follower_user_id = :id AND followed_user_id = :uid";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->bindParam(':uid', $userId, PDO::PARAM_STR);
      $statement->execute();

      echo json_encode(array('message' => 'Unfollowed'));
    } else {
      $query = "INSERT INTO followings ('follower_user_id','followed_user_id') VALUES (:id, :uid)";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->bindParam(':uid', $userId, PDO::PARAM_STR);
      $statement->execute();

      echo json_encode(array('message' => 'Followed'));
    }
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

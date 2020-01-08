<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));

  $query = "SELECT posts.id, posts.content, posts.description FROM followings INNER JOIN posts ON followings.followed_user_id = posts.user_id WHERE followings.follower_user_id = :id ORDER BY posts.id DESC";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':id', $id, PDO::PARAM_STR);
  $statement->execute();
  $posts = $statement->fetchAll(PDO::FETCH_ASSOC);

  $response = [];

  foreach ($posts as $post) {
    $postId = $post['id'];

    $query = "SELECT COUNT(post_id) as likes FROM likes WHERE post_id = :pid";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
    $statement->execute();
    $countLikes = $statement->fetch(PDO::FETCH_ASSOC);

    $query = "SELECT user_id, post_id FROM likes WHERE user_id = :id and post_id = :pid";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':id', $id, PDO::PARAM_STR);
    $statement->bindParam(':pid', $postId, PDO::PARAM_STR);
    $statement->execute();
    $liked = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($liked) {
      $response[] = [
        'id' => $post['id'],
        'content' => $post['content'],
        'description' => $post['description'],
        'likes' => $countLikes['likes'],
        'liked' => 1,
      ];
    } else {
      $response[] = [
        'id' => $post['id'],
        'content' => $post['content'],
        'description' => $post['description'],
        'likes' => $countLikes['likes'],
        'liked' => 0,
      ];
    }
  }

  echo json_encode($response);

  http_response_code(200);
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));
  $query = 'SELECT * FROM followings INNER JOIN users ON followings.followed_user_id = users.id INNER JOIN posts ON followings.followed_user_id = posts.user_id WHERE followings.follower_user_id = :id ORDER BY posts.id DESC';
  $statement = $pdo->prepare($query);
  $statement->bindParam(':id', $id, PDO::PARAM_STR);
  $statement->execute();
  $posts = $statement->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($posts);

  http_response_code(200);
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

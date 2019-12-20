<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['id'])) {
    $id = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));

    $statement = $pdo->prepare('SELECT * FROM posts WHERE id = :id');
    $statement->bindParam(':id', $id, PDO::PARAM_STR);
    $statement->execute();

    $post = $statement->fetch(PDO::FETCH_ASSOC);

    $likes = $post['likes'] + 1;
    $query = "UPDATE posts SET likes = :likes WHERE id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':likes', $likes, PDO::PARAM_STR);
    $statement->bindParam(':id', $id, PDO::PARAM_STR);
    $statement->execute();

    echo json_encode(array('message' => 'Liked', 'likes' => $likes));
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));

  $query = "SELECT id, email FROM users WHERE NOT id = :id";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':id', $id, PDO::PARAM_STR);
  $statement->execute();
  $users = $statement->fetchAll(PDO::FETCH_ASSOC);

  $response = [];

  foreach ($users as $user) {
    $userId = $user['id'];

    $query = "SELECT follower_user_id, followed_user_id FROM followings WHERE follower_user_id = :id AND followed_user_id = :uid";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':id', $id, PDO::PARAM_STR);
    $statement->bindParam(':uid', $userId, PDO::PARAM_STR);
    $statement->execute();
    $followed = $statement->fetch(PDO::FETCH_ASSOC);

    if ($followed) {
      $response[] = [
        'id' => $userId,
        'email' => $user['email'],
        'followed' => 1,
      ];
    } else {
      $response[] = [
        'id' => $userId,
        'email' => $user['email'],
        'followed' => 0,
      ];
    }
  }
  echo json_encode($response);
  http_response_code(200);
} else {
  echo json_encode(array('message' => 'Not logged in'));
  http_response_code(401);
}

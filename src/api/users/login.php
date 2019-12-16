<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
// header('Access-Control-Allow-Methods: POST');

if (isset($_POST['email'], $_POST['password'])) {
  $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));

  $statement = $pdo->prepare('SELECT * FROM users WHERE email = :email');
  $statement->bindParam(':email', $email, PDO::PARAM_STR);
  $statement->execute();

  $user = $statement->fetch(PDO::FETCH_ASSOC);

  if (!$user) {
    echo json_encode(array('message' => 'Not logged in'));
    http_response_code(400);
    exit;
  }

  if (password_verify($_POST['password'], $user['password'])) {
    unset($user['password']);

    // $_SESSION['user'] = $user;
    echo json_encode(array(
      'user' => $user['id'],
      'result' => 200
    ));
    http_response_code(200);
    exit;
  }
  echo json_encode(array('message' => 'Not logged in'));
  http_response_code(400);
}

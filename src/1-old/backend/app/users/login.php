<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

http_response_code(200);

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {

  // $content = trim(file_get_contents("php://input"));

  // $decoded = json_decode($content, true);

  // $filePath = (__DIR__ . '/hej.txt');
  // file_put_contents($filePath, $decoded);

  // $statement = $pdo->query("SELECT * FROM users WHERE email = '$decoded'");

  // $user = $statement->fetch(PDO::FETCH_ASSOC);

  // if (!$statement) {
  //   die(var_dump($pdo->errorInfo()));
  // }

  // if (password_verify($_POST['password'], $user['password'])) {
  //   // If the password was valid we know that the user exists and provided
  //   // the correct password. We can now save the user in our session.
  //   // Remember to not save the password in the session!
  //   // unset($user['password']);

  //   // $_SESSION['user'] = $user;
  // }

  http_response_code(201);

  // tell the user
  echo json_encode(array("message" => "Login"));
} else {
  http_response_code(503);

  // tell the user
  echo json_encode(array("message" => "Unable to login"));
}

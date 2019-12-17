<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  echo json_encode(array('message' => 'session destroyed'));
  session_destroy();
} else {
  echo json_encode(array('message' => 'not logged in'));
}

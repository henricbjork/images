<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  session_destroy();
  echo json_encode(array('message' => 'User logged out'));
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

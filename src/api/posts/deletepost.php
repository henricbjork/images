<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
// header('Access-Control-Allow-Methods: POST');

if (isset($_POST['id'])) {

  $id = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));

  $query = "DELETE FROM posts WHERE id = :id";
  $statement = $pdo->prepare($query);
  $statement->bindParam(':id', $id, PDO::PARAM_INT);
  $statement->execute();

  echo json_encode(array('message' => 'The file is was deleted'));
}

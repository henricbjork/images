<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_POST['description'], $_POST['id'])) {
    $description = trim(filter_var($_POST['description'], FILTER_SANITIZE_STRING));
    $id = trim(filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT));
    // $query = "UPDATE users SET biography = :biography, email = :email WHERE id = 3";
    $query = "UPDATE posts SET description = :description WHERE id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':description', $description, PDO::PARAM_STR);
    $statement->bindParam(':id', $id, PDO::PARAM_INT);
    $statement->execute();

    echo json_encode(array('message' => 'The post was updated', 'result' => 200));
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

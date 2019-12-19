<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_FILES['image'])) {

    $image = $_FILES['image'];

    if ($image['size'] <= 2097152) {
      $uid = md5($image['name'] . uniqid());

      if ($image['type'] === 'image/jpeg') {
        $filename = "$uid.jpeg";
      } else if ($image['type'] === 'image/png') {
        $filename = "$uid.png";
      } else if ($image['type'] === 'image/gif') {
        $filename = "$uid.gif";
      } else {
        echo json_encode(array('message' => 'The file is not supported'));
        exit;
      }

      $src = __DIR__ . '/uploads/images/' . $filename;

      move_uploaded_file($image['tmp_name'], $src);

      $description = trim(filter_var($_POST['description'], FILTER_SANITIZE_STRING));

      if (empty($description)) {
        $query = "INSERT INTO posts ('content') VALUES (:content)";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':content', $filename, PDO::PARAM_STR);
        $statement->execute();
      } else {
        $query = "INSERT INTO posts ('description', 'content') VALUES (:description, :content)";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':description', $description, PDO::PARAM_STR);
        $statement->bindParam(':content', $filename, PDO::PARAM_STR);
        $statement->execute();
      }

      echo json_encode(array('message' => 'The post is uploaded', 'result' => 200));
    } else {
      echo json_encode(array('message' => 'The file exceeds limit size'));
    }
  } else {
    echo json_encode(array('message' => 'No file'));
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
}

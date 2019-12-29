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
      $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));

      $query = "SELECT avatar FROM users WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();

      $user = $statement->fetch(PDO::FETCH_ASSOC);

      $uid = md5($image['name'] . uniqid());

      if ($image['type'] === 'image/jpeg') {
        $filename = "$uid.jpeg";
      } else if ($image['type'] === 'image/png') {
        $filename = "$uid.png";
      } else if ($image['type'] === 'image/gif') {
        $filename = "$uid.gif";
      } else {
        echo json_encode(array('message' => 'The file is not supported', 'result' => 400));
        exit;
      }

      $src = __DIR__ . '/uploads/avatars/' . $filename;

      if (empty($user['avatar'])) {
        move_uploaded_file($image['tmp_name'], $src);

        $query = "UPDATE users SET avatar = :avatar WHERE id = :id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':avatar', $filename, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_STR);
        $statement->execute();

        echo json_encode(array('message' => 'The avatar is uploaded', 'result' => 200));
      } else {
        $srcUnlink = __DIR__ . '/uploads/avatars/' . $user['avatar'];
        unlink($srcUnlink);
        move_uploaded_file($image['tmp_name'], $src);

        $query = "UPDATE users SET avatar = :avatar WHERE id = :id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':avatar', $filename, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_STR);
        $statement->execute();
        echo json_encode(array('message' => 'The avatar is uploaded', 'result' => 200));
      }
    } else {
      echo json_encode(array('message' => 'The file exceeds limit size', 'result' => 400));
    }
  } else {
    echo json_encode(array('message' => 'No file', 'result' => 400));
  }
} else {
  echo json_encode(array('message' => 'Not logged in', 'result' => 400));
}

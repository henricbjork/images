<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
  if (isset($_FILES['image'], $_POST['biography'])) {
    $id = trim(filter_var($_SESSION['user'], FILTER_SANITIZE_STRING));
    $image = $_FILES['image'];
    $biography = trim(filter_var($_POST['biography'], FILTER_SANITIZE_STRING));

    echo json_encode(array('message' => $image));
    http_response_code(200);
    exit;

    if (!empty($image) && (!empty($biography))) {
      if ($image['size'] <= 2097152) {
        $query = "SELECT avatar FROM users WHERE id = :id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':id', $id, PDO::PARAM_STR);
        $statement->execute();
        $avatar = $statement->fetch(PDO::FETCH_ASSOC);

        $uid = md5($image['name'] . uniqid());

        if ($image['type'] === 'image/jpeg') {
          $filename = "$uid.jpeg";
        } else if ($image['type'] === 'image/png') {
          $filename = "$uid.png";
        } else if ($image['type'] === 'image/gif') {
          $filename = "$uid.gif";
        } else {
          echo json_encode(array('message' => 'The file is not supported'));
          http_response_code(400);
          exit;
        }

        $src = __DIR__ . '/../uploads/avatars/' . $filename;
        move_uploaded_file($image['tmp_name'], $src);

        if ($avatar) {
          $srcUnlink = __DIR__ . '/../uploads/avatars/' . $avatar['avatar'];
          unlink($srcUnlink);

          $query = "UPDATE users SET avatar = :avatar WHERE id = :id";
          $statement = $pdo->prepare($query);
          $statement->bindParam(':avatar', $filename, PDO::PARAM_STR);
          $statement->bindParam(':id', $id, PDO::PARAM_STR);
          $statement->execute();
        } else {
          $query = "UPDATE users SET avatar = :avatar WHERE id = :id";
          $statement = $pdo->prepare($query);
          $statement->bindParam(':avatar', $filename, PDO::PARAM_STR);
          $statement->bindParam(':id', $id, PDO::PARAM_STR);
          $statement->execute();
        }

        $query = "UPDATE users SET biography = :biography WHERE id = :id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':biography', $biography, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_STR);
        $statement->execute();

        echo json_encode(array('message' => 'Updated settings'));
        http_response_code(201);
      } else {
        echo json_encode(array('message' => 'The file exceeds limit size'));
        http_response_code(400);
      }
    } elseif (!empty($image) && (empty($biography))) {
      if ($image['size'] <= 2097152) {
        $query = "SELECT avatar FROM users WHERE id = :id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':id', $id, PDO::PARAM_STR);
        $statement->execute();
        $avatar = $statement->fetch(PDO::FETCH_ASSOC);

        $uid = md5($image['name'] . uniqid());

        if ($image['type'] === 'image/jpeg') {
          $filename = "$uid.jpeg";
        } else if ($image['type'] === 'image/png') {
          $filename = "$uid.png";
        } else if ($image['type'] === 'image/gif') {
          $filename = "$uid.gif";
        } else {
          echo json_encode(array('message' => 'The file is not supported'));
          http_response_code(400);
          exit;
        }

        $src = __DIR__ . '/../uploads/avatars/' . $filename;
        move_uploaded_file($image['tmp_name'], $src);

        if ($avatar) {
          $srcUnlink = __DIR__ . '/../uploads/avatars/' . $avatar['avatar'];
          unlink($srcUnlink);

          $query = "UPDATE users SET avatar = :avatar WHERE id = :id";
          $statement = $pdo->prepare($query);
          $statement->bindParam(':avatar', $filename, PDO::PARAM_STR);
          $statement->bindParam(':id', $id, PDO::PARAM_STR);
          $statement->execute();
        } else {
          $query = "UPDATE users SET avatar = :avatar WHERE id = :id";
          $statement = $pdo->prepare($query);
          $statement->bindParam(':avatar', $filename, PDO::PARAM_STR);
          $statement->bindParam(':id', $id, PDO::PARAM_STR);
          $statement->execute();
        }

        echo json_encode(array('message' => 'Updated avatar'));
        http_response_code(201);
      } else {
        echo json_encode(array('message' => 'The file exceeds limit size'));
        http_response_code(400);
      }
    } elseif (empty($image) && (!empty($biography))) {
      $query = "UPDATE users SET biography = :biography WHERE id = :id";
      $statement = $pdo->prepare($query);
      $statement->bindParam(':biography', $biography, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_STR);
      $statement->execute();

      echo json_encode(array('message' => 'Updated biography'));
      http_response_code(201);
    }
  }
} else {
  echo json_encode(array('message' => 'Not logged in'));
  http_response_code(401);
}

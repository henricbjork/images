<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
// header('Access-Control-Allow-Methods: POST');

if (isset($_FILES['image'])) {

  $image = $_FILES['image'];

  if ($image['size'] <= 2097152) {
    $today = date('dmy');
    $uid = md5($image['name'] . uniqid());
    $src = __DIR__ . "/images/$uid.jpeg";
    move_uploaded_file($image['tmp_name'], $src);

    $description = trim(filter_var($_POST['description'], FILTER_SANITIZE_STRING));

    $query = "INSERT INTO posts ('description', 'content') VALUES (:description, :content)";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':description', $description, PDO::PARAM_STR);
    $statement->bindParam(':content', $src, PDO::PARAM_STR);
    $statement->execute();

    echo json_encode(array('message' => 'The file is uploaded'));
  } else {
    echo json_encode(array('message' => 'The file exceeds file limit'));
  }
}

// if (isset($_FILES['avatar'])) {
//   $avatar = $_FILES['avatar'];

//   if ($avatar['size'] >= 2097152) {
//       echo 'The uploaded file exceeded the file size limit.';
//   } else {
//       move_uploaded_file($avatar['tmp_name'], __DIR__.'/avatar.png');
//   }
// }

// if ($avatar['type'] !== 'image/png') {
//   echo 'The image file type is not allowed.';
// } else {
//   move_uploaded_file($avatar['tmp_name'], __DIR__.'/avatar.png');
// }

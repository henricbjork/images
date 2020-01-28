<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
    if (isset($_POST['comment'], $_POST['id'])) {
        $comment = trim(filter_var($_POST['comment'], FILTER_SANITIZE_STRING));
        $commentId = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));

        $query = "SELECT user_id FROM comments WHERE id = :cid";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':cid', $commentId,   PDO::PARAM_STR);
        $statement->execute();
        $author = $statement->fetch(PDO::FETCH_ASSOC);

        if ($author['user_id'] === $_SESSION['user']) {
        $query = "UPDATE comments SET comment = :comment WHERE id = :cid AND user_id = :user_id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':comment', $comment, PDO::PARAM_STR);
        $statement->bindParam(':cid', $commentId, PDO::PARAM_STR);
        $statement->bindParam(':user_id', $author['user_id'], PDO::PARAM_STR);
        $statement->execute();
        echo json_encode(array('message' => 'The post was updated'));
        http_response_code(200);
        }
    }
} else {
    echo json_encode(array('message' => 'Not logged in'));
    http_response_code(401);
}

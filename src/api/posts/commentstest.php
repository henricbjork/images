<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
    if (isset($_POST['id'])) {
        $id = trim(filter_var($_POST['id'], FILTER_SANITIZE_STRING));

        $query = "SELECT comments.id, comments.comment, users.email FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.post_id = :id ORDER BY comments.id DESC";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':id', $id, PDO::PARAM_STR);
        $statement->execute();
        $comments = $statement->fetchAll(PDO::FETCH_ASSOC);


        if ($comments) {
            $response = [];

            foreach ($comments as $comment) {
                $commentId = $comment['id'];
                $query = "SELECT id FROM comments WHERE user_id = :id AND id = :cid";
                $statement = $pdo->prepare($query);
                $statement->bindParam(':id', $id, PDO::PARAM_STR);
                $statement->bindParam(':cid', $commentId, PDO::PARAM_STR);
                $statement->execute();
                $canEdit = $statement->fetchAll(PDO::FETCH_ASSOC);

                if ($canEdit) {
                    $edit = 1;
                } else {
                    $edit = 0;
                }
                $response[] = [
                    'id' => $comment['id'],
                    'post_id' => $comment['post_id'],
                    'user_id' => $comment['user_id'],
                    'comment' => $comment['comment'],
                    'edit' => $edit
                ];
            }
            echo json_encode($response);
        } else {
            echo json_encode(array('message' => 'No comments'));
        }
        http_response_code(200);
    }
} else {
    echo json_encode(array('message' => 'Not logged in'));
    http_response_code(401);
}

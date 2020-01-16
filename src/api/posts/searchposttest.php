<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');


// echo json_encode(array('hej' => 'helloworld'));
// exit;
if (isset($_POST['search'])) {
    $search = trim(filter_var($_POST['search'], FILTER_SANITIZE_STRING));

    if (!empty($search)) {
        $searchQuery = '%' . $_POST['search'] . '%';

        $query = "SELECT description, content FROM posts WHERE description LIKE :search";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':search', $searchQuery, PDO::PARAM_STR);
        $statement->execute();
        $posts = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($posts);
        http_response_code(200);
    } else {
        echo json_encode(array('message' => 'Search query is empty'));
        http_response_code(400);
    }
}

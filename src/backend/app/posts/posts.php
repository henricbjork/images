<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

$statement = $pdo->query('SELECT * FROM posts');

$posts = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($posts);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

http_response_code(200);

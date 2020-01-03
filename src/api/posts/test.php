<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

$query = "select * from (select * from comments inner join (select * from posts) )";
$statement = $pdo->prepare($query);
$statement->execute();
$comments = $statement->fetchAll(PDO::FETCH_ASSOC);

$query = "select * from posts";
$statement = $pdo->prepare($query);
$statement->execute();
$posts = $statement->fetchAll(PDO::FETCH_ASSOC);

print_r($comments);
print_r($posts);

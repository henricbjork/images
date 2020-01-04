<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

// $query = "select * from (select * from comments inner join (select * from posts) )";
// $statement = $pdo->prepare($query);
// $statement->execute();
// $comments = $statement->fetchAll(PDO::FETCH_ASSOC);

$query = "select * from comments";
$statement = $pdo->prepare($query);
$statement->execute();
$comments = $statement->fetchAll(PDO::FETCH_ASSOC);

$query = "select * from posts";
$statement = $pdo->prepare($query);
$statement->execute();
$posts = $statement->fetchAll(PDO::FETCH_ASSOC);

function comments($comments, $post)
{
  foreach ($comments as $comment) {
    if ($comment['post_id'] === $post['id']) {
      echo $comment['post_id'];
      echo '<br>';
    }
  }
}

foreach ($posts as $post) {
  // print_r($post);
  // echo $post['id'];
  echo comments($comments, $post);
}

// print_r($comments);
// print_r($posts);

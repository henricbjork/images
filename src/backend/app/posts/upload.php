<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST");

// $filePath = (__DIR__ . '/hej.txt');

// $content = trim(file_get_contents("php://input"));

// $decoded = json_decode($content, true);

// file_put_contents($filePath, $decoded);

// $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

// print_r($contentType);
// if ($contentType === "application/json") {
//   //Receive the RAW post data.
//   $content = trim(file_get_contents("php://input"));

//   $decoded = json_decode($content, true);

//   die(var_dump($decoded));

//   //If json_decode failed, the JSON is invalid.
//   if (!is_array($decoded)) { } else {
//     // Send error back to user.
//   }
// }


// http_response_code(200);

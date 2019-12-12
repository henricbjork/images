<?php

declare(strict_types=1);

require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json;');
// header('Access-Control-Allow-Methods: POST');

echo json_encode(array("message" => $_FILES));

<?php

declare(strict_types=1);
require __DIR__ . '/../autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

echo json_encode(array("message" => "hej"));

http_response_code(201);

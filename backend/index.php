<?php
require __DIR__ . '/autoloader.php';

use Lms\Middleware\CorsMiddleware;
use Lms\Helpers\Response;
use Lms\Database\Database;

CorsMiddleware::process();

// Simple routing
try {
    $path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
    $className = 'Lms\\Controller\\' . ucwords(substr($path, 1)) . 'Controller';
    if (!class_exists($className)) {
        Response::send(404, "Not Found");
    }
    (new $className)->action($_SERVER['REQUEST_METHOD']);
} catch (Exception $e) {
    Response::send(500, "Internal Server Error");
}

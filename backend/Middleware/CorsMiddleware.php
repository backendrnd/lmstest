<?php

namespace Lms\Middleware;

class CorsMiddleware
{
    public static function process()
    {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
        }
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }
            header("Access-Control-Max-Age: 600"); // Maximum cache expiry time for Chromium
            header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

            exit(0);
        }
    }
}
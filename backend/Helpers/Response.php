<?php

namespace Lms\Helpers;

class Response
{
    public static function send(int $code, $data)
    {
        header('Content-type: application/json');
        http_response_code($code);
        echo json_encode(is_string($data) ? ["message" => $data] : $data);
        exit(0);
    }
}
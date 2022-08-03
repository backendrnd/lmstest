<?php

const DB_HOSTNAME = '127.0.0.1';
const DB_USERNAME = 'root';
const DB_PASSWORD = '';
const DB_LMS = 'lms';

const USERS_PER_PAGE = 5;

function response($code, $data) {
    header('Content-type: application/json');
    http_response_code($code);
    echo json_encode(is_string($data) ? ["message" => $data] : $data);
    exit(0);
}

function cors() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    }
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
        exit(0);
    }
}

function db() {
    $connection = @mysqli_connect('p:'.DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_LMS);
    if (!$connection) {
        response(500, "Can't connect to database");
    }
    return $connection;
}

function auth() {
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        session_start();
        $_SESSION = [];
        session_write_close();
        exit(0);
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        response(405, "Method Not Allowed");
    }
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $username = strtolower($data["username"]);
    $password = $data["password"];
    $remember = (bool)$data["remember"];
    if (!$username) {
        response(400, "username field is required");
    }
    if (!$password) {
        response(400, "password field is required");
    }
    $connection = db();
    $stmt = $connection->prepare("SELECT id, username, password FROM api_users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if (!$row || !password_verify($password, $row['password'])) {
        response(401, "Incorrect Username or Password");
    }
    session_start([
        'cookie_lifetime' => $remember ? 86400 : 0,
    ]);
    session_regenerate_id();
    // echo session_id();
    $_SESSION['user_id'] = $row['id'];
    response(200, [
        "id" => $row['id'],
        "username" => $username,
    ]);
}

function users() {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        response(405, "Method Not Allowed");
    }

    session_start();
    if(!isset($_SESSION['user_id']))
    {
        response(401, "Unauthorized");
    }
    session_write_close();

    $page = (int)$_GET['page'];

    $connection = db();
    $result = $connection->query("SELECT COUNT(1) FROM students");
    $row = $result->fetch_row();
    $count = $row[0];
    $maxPage = ceil($count / USERS_PER_PAGE);

    if (($page < 1) || ($page > $maxPage)) {
        $page = 1;
    }
    $offset = ($page-1)*USERS_PER_PAGE;
    $rowCount = USERS_PER_PAGE;

    $stmt = $connection->prepare("SELECT login, name FROM students LIMIT ?,?");
    $stmt->bind_param("ii", $offset, $rowCount);
    $stmt->execute();
    $result = $stmt->get_result();
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = [
            "login" => $row['login'],
            "name" => $row['name'],
        ];
    }
    response(200, [
        "page" => $page,
        "maxPage" => $maxPage,
        "users" => $users,
    ]);
}

cors();
try {
    $path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
    switch ($path) {
        case '/auth':
            auth();
            break;
        case '/users':
            users();
            break;
        default:
            response(404, "Not Found");
            break;
    }
} catch (Exception $e) {
    response(500, "Internal Server Error");
}

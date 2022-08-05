<?php

namespace Lms\Controller;

use Lms\Helpers\Response;
use Lms\Model\ApiUserModel;

class AuthController extends Controller
{
    function actionDelete() {
        session_start();
        $_SESSION = [];
        session_write_close();
        exit(0);
    }

    function actionPost() {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $username = strtolower($data["username"]);
        $password = $data["password"];
        $remember = (bool)$data["remember"];
        if (!$username) {
            Response::send(400, "username field is required");
        }
        if (!$password) {
            Response::send(400, "password field is required");
        }
        $apiUserModel = new ApiUserModel();
        $user = $apiUserModel->getUserByUsername($username);
        if (!$user || !password_verify($password, $user->password)) {
            Response::send(401, "Incorrect Username or Password");
        }
        session_start([
            'cookie_lifetime' => $remember ? 86400 : 0,
        ]);
        $_SESSION['user_id'] = $user->id;
        Response::send(200, [
            "id" => $user->id,
            "sessionId" => session_id(),
            "username" => $username,
        ]);
    }
}
<?php

namespace Lms\Controller;

use Lms\Helpers\Response;
use Lms\Model\UserModel;

const USERS_PER_PAGE = 5;

class UsersController extends Controller
{
    function beforeAction(): bool
    {
        session_id($_SERVER['HTTP_SESSION_ID']);
        session_start();
        if(!isset($_SESSION['user_id']))
        {
            Response::send(401, "Unauthorized");
        }
        session_write_close();
        return parent::beforeAction();
    }

    function actionGet() {
        $userModel = new UserModel();
        $count  = $userModel->getCount();

        $page = (int)$_GET['page'];
        $maxPage = ceil($count / USERS_PER_PAGE);
        if (($page < 1) || ($page > $maxPage)) {
            $page = 1;
        }

        $users = $userModel->getUsers($page, USERS_PER_PAGE);

        Response::send(200, [
            "page" => $page,
            "maxPage" => $maxPage,
            "users" => $users,
        ]);
    }
}
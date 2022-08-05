<?php

namespace Lms\Model;

class ApiUserModel extends Model
{
    public function __construct()
    {
        parent::__construct();
        $this->tableName = 'api_users';
    }

    public function getUserByUsername(string $username) {
        $stmt = $this->connection->prepare("SELECT * FROM api_users WHERE username = ?");
        $stmt->execute([$username]);
        return $stmt->fetchObject();
    }

}
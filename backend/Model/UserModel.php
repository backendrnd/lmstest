<?php

namespace Lms\Model;

use PDO;

class UserModel extends Model
{
    public function __construct()
    {
        parent::__construct();
        $this->tableName = 'students';
    }

    public function getUsers(int $page, int $rowsPerPage): array
    {
        $offset = ($page-1)*$rowsPerPage;
        $stmt = $this->connection->prepare("SELECT login, name FROM students LIMIT ?,?");
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsPerPage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
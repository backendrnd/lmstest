<?php

namespace Lms\Model;

use Exception;
use Lms\Database\Database;

class Model {
    protected $connection;
    protected $tableName;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $this->connection = Database::getConnection();
    }

    public function getCount() : int
    {
        return $this->connection->query("SELECT COUNT(1) FROM " . $this->tableName)->fetchColumn();
    }
}
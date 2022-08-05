<?php

namespace Lms\Database;

use Exception;
use PDO;
use PDOException;

class Database {

    /**
     * @throws Exception
     */
    public static function getConnection() {
        $DB_LMS = getenv('LMS_DB_DSN') ?: 'mysql:host=127.0.0.1;dbname=lms';
        $DB_USERNAME = getenv('LMS_DB_USERNAME') ?: 'root';
        $DB_PASSWORD = getenv('LMS_DB_PASSWORD') ?: '';
        try {
            $connection = new PDO($DB_LMS, $DB_USERNAME, $DB_PASSWORD);
        } catch (PDOException $e) {
            throw new Exception("Can't connect to database");
        }
        return $connection;
    }

}

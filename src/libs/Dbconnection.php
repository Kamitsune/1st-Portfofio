<?php

namespace Portfolio;

class Dbconnection {
    
    public static function getConnection(){
        try{
            $pdo = new \PDO("mysql:host=localhost;dbname=portfolio", "root", "");
            return $pdo;
        } catch(\PDOException $err) {
            exit($err);
        }
    }
}

?>
<?php

class Database
{
  private static $db;

  private static function initialize()
  {
    $dotenv = parse_ini_file(__DIR__ . '/../../.env');

    $host = $dotenv['DB_HOST'];
    $username = $dotenv['DB_USER'];
    $password = $dotenv['DB_PASS'];
    $dbName = $dotenv['DB_NAME'];

    self::$db = new PDO("mysql:host=$host;dbname=$dbName", "$username", "$password");
  }

  public static function query($sql, $params = [], $fetchMode = PDO::FETCH_ASSOC)
  {
    try {
      if (self::$db === null) {
        self::initialize();
      }

      $stmt = self::$db->prepare($sql);

      if ($params) {
        $stmt->execute($params);
      } else {
        $stmt->execute();
      }

      $queryType = strtoupper(substr(trim($sql), 0, 6)); // Check the first 6 characters of the SQL query

      switch ($queryType) {
        case 'SELECT':
          return $stmt->fetchAll($fetchMode);
          break;
        case 'INSERT':
          return self::$db->lastInsertId();
          break;
        case 'UPDATE':
        case 'DELETE':
          return $stmt->rowCount(); // Number of affected rows
          break;
        default:
          return null;
          break;
      }
    } catch (Exception $e) {
      echo "Database query failed: " . $e->getMessage();
      exit;
    }
  }
}

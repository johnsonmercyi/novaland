<?php

require_once __DIR__.'/../config/database/Database.php';

class VaccineAppointment
{
  public static function all()
  {
    $sql = "SELECT * FROM vaccine_appointments";
    return Database::query($sql);
  }

  public static function create($data = [])
  {
    // Extract the keys from the $data array
    $keys = array_keys($data);

    // Generate the column names for the INSERT INTO clause
    $columns = implode(', ', $keys);

    // Generate the placeholders for the VALUES clause
    $placeholders = implode(', ', array_fill(0, count($keys), '?'));

    // Prepare the SQL query
    $sql = "INSERT INTO vaccine_appointments ($columns) VALUES ($placeholders)";

    // echo "SQL: " . $sql;

    // Execute the query with the data array values as parameters
    return Database::query($sql, array_values($data));
  }
}

// $dataId = VaccineAppointment::create([
//   "health_card_number" => "afwaesfcwcc",
//   "email" => "maryann@mail.com",
//   "address" => "No. 2 Clement Atuegwu Street Awada Obosi",
//   "vaccine_type" =>  "pfizer",
//   "date_of_birth" =>  "2024-03-31",
//   "vaccine_location" =>  "location-2",
//   "available_date" =>  "2024-04-25",
//   "available_time" =>  "04:43"
// ]);

// echo $dataId;

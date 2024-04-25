<?php

require_once __DIR__.'/../model/VaccineAppointment.php';

class VaccineAppointmentController extends Controller
{
  public function index()
  {
    try {
      $dbResponse = VaccineAppointment::all();
    } catch (Exception $e) {
      return $this->errorResponse($e->getMessage());
    }
    return $this->response($dbResponse);
  }

  public function create()
  {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true); // true to get associative array
    try {
      $dbResponse = VaccineAppointment::create($data);
    } catch (Exception $e) {
      return $this->errorResponse($e->getMessage());
    }

    return $this->response($dbResponse);
  }
}

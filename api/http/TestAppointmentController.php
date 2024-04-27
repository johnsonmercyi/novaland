<?php

require_once __DIR__ . '/../model/TestAppointment.php';

class TestAppointmentController extends Controller
{

  public function index()
  {
    try {
      $dbResponse = TestAppointment::all();
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
      $dbResponse = TestAppointment::create($data);

      if ($dbResponse === 0 || !$dbResponse) {
        throw new Exception("Record failed to create likely because there's an appointment already scheduled for this citizen.", 1);
      }
    } catch (Exception $e) {
      return $this->errorResponse($e->getMessage());
    }

    return $this->response($dbResponse);
  }
}

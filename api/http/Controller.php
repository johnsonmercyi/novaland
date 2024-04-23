<?php

class Controller
{
  protected function response($data, $status = 200, $message = null)
  {
    $response = [
      'success' => true,
      'data' => $data
    ];

    if ($message !== null) {
      $response['message'] = $message;
    }

    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }

  public function errorResponse($message, $status = 400)
  {
    $response = [
      'success' => false,
      'message' => $message
    ];

    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }
}

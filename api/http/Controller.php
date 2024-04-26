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
    
    $this->setCorsHeaders();
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($response);
  }

  public function errorResponse($message, $status = 500)
  {
    $response = [
      'success' => false,
      'message' => $message
    ];

    $this->setCorsHeaders();
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($response);
  }

  protected function setCorsHeaders()
  {
    // Check if the request is a preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      // Handle preflight request
      header('Access-Control-Allow-Origin: http://localhost:3000');
      header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
      header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
      exit();
    }

    // Add CORS headers to the response
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
  }
}

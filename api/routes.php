<?php
// Load required files (e.g., controllers, models, helpers)
require_once './http/Controller.php';
require_once './http/VaccineAppointmentController.php';
require_once './handlers/ErrorHandler.php';
require_once './config/Route.php';

// Register error handler
set_error_handler(['ErrorHandler', 'handleError']);

// Get the requested URL and method
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

/**
 * Defines routes
 */
Route::set($request_uri, $request_method, [
  'GET' => [
    '/vaccine_appointment' => 'VaccineAppointmentController@index',
  ],
  'POST' => [
    '/vaccine_appointment' => 'VaccineAppointmentController@create',
  ],
  // Add more routes for other HTTP methods (PUT, DELETE, etc.)
]);

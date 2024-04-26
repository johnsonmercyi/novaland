<?php

class ErrorHandler
{
  public static function handleError($errno, $errstr, $errfile, $errline)
  {
    $errorMessage = "Error: [$errno] $errstr in $errfile on line $errline";
    self::logError($errorMessage);

    // Send error response to the client
    $controller = new Controller();
    $controller->errorResponse($errorMessage, 500);
  }

  private static function logError($message)
  {
    $logFile = 'error.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
  }
}
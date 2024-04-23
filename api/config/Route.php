<?php

class Route {
  public static function set($request_uri, $request_method, $routes) {
    $dotenv = parse_ini_file('.env');
    $appName = "/" . $dotenv['APP_NAME']."/api";
    // Access the environment variable
    $route_found = false;
    if (array_key_exists($request_method, $routes)) {
      foreach ($routes[$request_method] as $route => $action) {
        if ($request_uri === $appName.$route) {
          $route_found = true;
          list($controller, $method) = explode('@', $action);
          $controller_instance = new $controller();
          $controller_instance->$method();
          break;
        }
      }
    }
  
    // Handle 404 if route not found
    if (!$route_found) {
      $controller = new Controller();
      $controller->errorResponse('Route not found', 404);
    }
  }
}

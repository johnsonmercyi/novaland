<?php

class UserController extends Controller {
  public function index()
  {
    return $this->response(["data" => "Hello World!"]);
  }
}
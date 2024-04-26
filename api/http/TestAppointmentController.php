<?php

require_once __DIR__.'/../model/TestAppointment.php';

class TestAppointmentController extends Controller{
    
    public function index(){
        try{
            $dbResponse = TestAppointment::all();
        } catch (Exception $e){
            return $this->errorResponse($e->getMessage());
        }
        return $this->response($dbResponse);
    }

    public function create(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true); // true to get associative array
        try{
            $dbResponse = TestAppointment::create($data);
        } catch (Exception $e){
            return $this->errorResponse($e->getMessage());
        }

        return $this->response($dbResponse);
    }
}
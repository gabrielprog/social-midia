<?php

namespace App\Interfaces;


use Illuminate\Http\Request;

interface CRUDFeed {
    public function create(Request $request);
    public function read();
    public function delete($paramsID);
    public function update(Request $request, $paramsID);
}
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

class BodyRequest {

    static public function ValidateBodyCreate() {
        $validated = $request->validate([
            'title' => 'required'
        ]);

        dd($validated);
        
    }
}
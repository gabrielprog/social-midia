<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Iluminate\Http\Response;
use Illuminate\Validation\ValidationException;

class CheckFieldPost
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            
            $validatedData = $request->validate([
                'author' => ['required'],
                'categorie' => ['required'],
                'text_at_published' => ['required'],
            ]);
        }catch (ValidationException $e) {
            return Response()->json(array([
                "error" => true,
                "message" => "Field's not found"
            ]), 404);
        }

        $bodyRequest = $request->all();
        $accept_categories = [
            "Post",
            "Artigo",
            "Grupo"
        ];

        foreach($accept_categories as $accept_categorie){
            if($bodyRequest["categorie"] === $accept_categorie) {
                return $next($request);
            }
        }

        return Response()->json(array([
            "error" => true,
            "message" => "Categorie not accept"
        ]));
    }
}

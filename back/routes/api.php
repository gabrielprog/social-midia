<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedController;
use App\Http\Middleware\CheckFieldUpdatePostAndCategorieValidate;
use App\Http\Middleware\CheckFieldPost;


Route::get("/feed", [FeedController::class, 'read']);
Route::get("/feed/delete/{id}", [FeedController::class, 'delete']);
Route::post("/feed", [FeedController::class, 'create'])->middleware(CheckFieldPost::class);;
Route::post("/feed/update/{id}", [FeedController::class, 'update'])->middleware(CheckFieldUpdatePostAndCategorieValidate::class);
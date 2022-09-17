<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Response::json(array('return' => "Oi time, antes de mais nada eu fiz isso com muita dedicação, em apenas 2 dias full-time eu aprendi laravel e entreguei o que estão me pedindo, let's go"));;
});

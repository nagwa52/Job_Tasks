<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\frontend\FrontendController;
use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Auth;
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
    return view('front');
});
Route::get('/',[FrontendController::class,'index']);
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Route::group(['middleware' => ['auth', 'isAdmin']], function () {

//     Route::get('/dashboard', function () {
//         return view('admin.dashboard');
//     });
// });
Route::middleware(['auth', 'isAdmin'])->group(function () {

    // Route::get('/dashboard', function () {
    //     return view('admin.index');
    // });
    Route::get('/dashboard', 'Admin\FrontendController@index');
    Route::get('/categories', [CategoryController::class,'index']);
    Route::get('/categories/create', [CategoryController::class,'create']);
    Route::post('/categories', [CategoryController::class,'store']);
    Route::get('/categories/{id}/edit', [CategoryController::class,'edit']);
    Route::put('/categories/{id}', [CategoryController::class,'update']);
    Route::get('/categories/{id}',[CategoryController::class,'destroy']);

    Route::get('/products',[ProductController::class,'index']);
    Route::get('/products/create',[ProductController::class,'create']);
    Route::post('/products',[ProductController::class,'store']);
    Route::get('/products/{id}/edit',[ProductController::class,'edit']);
    Route::put('/products/{id}',[ProductController::class,'update']);
    Route::get('/products/{id}', [ProductController::class,'destroy']);
});

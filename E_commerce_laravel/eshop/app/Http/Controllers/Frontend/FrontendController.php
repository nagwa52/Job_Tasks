<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function index()
    {
        $trending_products = Product::where('trending','1')->take(14)->get();
       return view('frontend.index',compact('trending_products'));
    }
}

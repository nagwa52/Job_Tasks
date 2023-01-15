<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $product = Product::all();
        return view('admin.product.index', compact('product'));
    }
    public function create()
    {
        $category = Category::all();
        return view('admin.product.create',compact('category'));
    }
    public function store(Request $request)
    {
     $product = new Product();
     if ($request->hasFile('image')) {
        $file = $request->file('image');
        $ext = $file->getClientOriginalExtension();
        $filename = time() . '.' . $ext;
        $file->move('assets/uploads/product', $filename);
        $product->image = $filename;
    }
    $product->cat_id = $request->input('cat_id');
    $product->name = $request->input('name');
    $product->small_description = $request->input('small_description');
    $product->description = $request->input('description');
    $product->original_price = $request->input('original_price');
    $product->selling_price = $request->input('selling_price');
    $product->qty = $request->input('qty');
    $product->selling_price = $request->input('selling_price');
    $product->tax = $request->input('tax');
    $product->status = $request->input('status') == TRUE ? '1' : '0';
    $product->trending = $request->input('trending') == TRUE ? '1' : '0';;
    $product->meta_title = $request->input('meta_title');
    $product->meta_keywords = $request->input('meta_keywords');
    $product->meta_description = $request->input('meta_description');
    $product->save();
    return redirect('/products')->with('status', 'product created successfully');
    }
    public function edit($id)
    {
        $product = Product::find($id);
        return view('admin.product.edit', compact('product'));
    }
}

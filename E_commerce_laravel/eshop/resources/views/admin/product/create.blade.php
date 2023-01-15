<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./createBlade.css">
    <title>Document</title>
</head>

</html>
@extends('layouts.admin')
@section('content')
    <div class="row">
        <div class="col-lg-6 col-md-8 col-12 mx-auto">
            <div class="card">
                <div class="card-header p-3 pt-2">
                    <div class="text-front pt-1">
                        <h6 class="font-weight-bolder mb-0">Add Product</h6>
                    </div>
                </div>
                <div class="card-body">
                    <form role="form" action="{{ url('/products') }}" class="text-start" method="POST" autocomplete="on"
                        enctype="multipart/form-data">
                        @csrf
                        <select class="form-select input-group-outline" name="cat_id" aria-label="Default select example">
                            <option selected>select Category</option>
                            @foreach ($category as $item)
                                <option value="{{ $item->id }}">{{ $item->name }}</option>
                            @endforeach
                        </select>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="font-weight-bolder">Name </label>
                                <div class="input-group input-group-outline">
                                    <input type="text" class="form-control" name="name">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="font-weight-bolder">Small Description </label>
                                <div class="input-group input-group-outline">
                                    <input type="text" class="form-control" rows="3" name="small_description">
                                </div>
                            </div>
                        </div>
                        <label class="font-weight-bolder">Description </label>
                        <div class="input-group input-group-outline">
                            <textarea type="text" class="form-control" rows="3" name="description"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="font-weight-bolder">Original Price </label>
                                <div class="input-group input-group-outline">
                                    <input type="number" class="form-control" name="original_price">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="font-weight-bolder">Selling Price </label>
                                <div class="input-group input-group-outline">
                                    <input type="number" class="form-control" name="selling_price">
                                </div>
                            </div>
                        </div>
                        <div class="input-group input-group-outline">
                            <input type="file" class="form-control" name="image">
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="font-weight-bolder">Quantity </label>
                                <div class="input-group input-group-outline">
                                    <input type="text" class="form-control" name="qty">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="font-weight-bolder">Taxes </label>
                                <div class="input-group input-group-outline">
                                    <input type="text" class="form-control" name="tax">
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center justify-content-lg-center py-3 gap-5"
                            style="padding-bottom: 0 !important">
                            <div class="form-check form-check-info text-start ps-0 flex-sm-grow-0 d-flex" style="flex: 0; ">
                                <input class="form-check-input" style="margin: 0" type="checkbox" name="status"
                                    id="flexCheckDefault" checked>
                                <label class="form-check-label" style="margin-bottom: 0;" for="flexCheckDefault"> Status
                                </label>
                            </div>
                            <div class="form-check form-check-info text-start ps-0 flex-sm-grow-0 d-flex" style="flex: 0;">
                                <input class="form-check-input"style="margin: 0" type="checkbox"name="trending"
                                    id="flexCheckDefault" checked>
                                <label class="form-check-label " style="margin-bottom: 0;" for="flexCheckDefault">
                                    Trending
                                </label>
                            </div>
                        </div>
                        <label class="font-weight-bolder">Meta title </label>
                        <div class="input-group input-group-outline">
                            <input class="form-control" name="meta_title">
                        </div>
                        <label class="font-weight-bolder">Meta Keywords </label>
                        <div class="input-group input-group-outline">
                            <textarea type="text" class="form-control" rows="3" name="meta_keywords"></textarea>
                        </div>
                        <label class="font-weight-bolder">Meta Description </label>
                        <div class="input-group input-group-outline">
                            <textarea type="text" class="form-control" rows="3" name="meta_description"></textarea>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn bg-gradient-primary my-4 mb-2">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

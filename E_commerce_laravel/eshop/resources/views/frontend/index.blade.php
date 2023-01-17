@extends('layouts.front')

@section('title')
    welcome to E-shop
@endsection

@section('content')
    @include('layouts.inc.slider')
    <div class="py-5">
        <div class="container">
            <div class="row">
            @foreach ($trending_products as $product )
                <div class="col-md-3">
                    <div class="card">
                        <img src="{{asset('assets/uploads/product/'.$product->image)}}" alt="product image">
                        <div class="card-body">
                            <h5>{{$product->name}}</h5>
                            <small>{{$product->selling_price}}</small>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection

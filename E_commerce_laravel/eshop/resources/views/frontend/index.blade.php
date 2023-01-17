@extends('layouts.front')

@section('title')
    welcome to E-shop
@endsection

@section('content')
    @include('layouts.inc.slider')
    <div class="py-5">
        <div class="container">
            <div class="row">
                <div class="owl-carousel trending-carousel owl-theme">
                    @foreach ($trending_products as $product)
                        <div class="item">
                            <div class="card">
                                <img src="{{ asset('assets/uploads/product/' . $product->image) }}" alt="product image">
                                <div class="card-body">
                                    <h5>{{ $product->name }}</h5>
                                    <small>{{ $product->selling_price }}</small>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <script>
        $('.trending-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        })
    </script>
@endsection

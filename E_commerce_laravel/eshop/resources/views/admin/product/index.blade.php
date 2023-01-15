@extends('layouts.admin')
@section('content')
    <div class="container-fluid py-4">
        {{-- <div class="row">
       <div class="col-xl-12 col-sm-3 mb-xl-0 mb-4">
        <div class="card">
           <div class="card-header p-3 pt-2">
            <div class="text-front pt-1">
                <h6 class="font-weight-bolder mb-0">Cartegory page</h6>
            </div>

          </div>
        </div>
      </div>
    </div> --}}
        <div class="row">
            <div class="col-12">
                <div class="card my-4">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                            <h6 class="text-white text-capitalize ps-3">Products</h6>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-30">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">id
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Name</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Description</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            image</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($product as $item)
                                        <tr>
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm"> {{ $item->id }}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 class="mb-0 text-sm"> {{ $item->name }}</h6>
                                            </td>
                                            <td>
                                                <div class="px-2 py-1">
                                                    @php
                                                        $outDescriprion = strlen($item->description) > 100 ? substr($item->description, 0, 80) . '...' : $item->description;
                                                    @endphp

                                                    {{ $outDescriprion }}
                                                </div>
                                            </td>
                                            <td class="span3">
                                                <div>
                                                    <img src="{{ asset('assets/uploads/product/' . $item->image) }}"
                                                        class="cate-image" alt="product">
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex justify-content-sm-between px-2 py-1">
                                                
                                                  <a href="{{url('products/' .$item->id.'/show') }}" >
                                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                                  </a>
                                                  <a href="{{url('products/' .$item->id) }}" >
                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                  </a>
                                                  <a href="{{url('categories/' .$item->id) }}" >
                                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                                  </a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endsection

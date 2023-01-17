<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style="background-color: #000">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner"  style="width: 100%; height:500px; !important;">
      <div class="carousel-item active h-100">
        <img src="{{asset('assets/images/slider1.jpg')}}" class="d-block" style="object-fit:fill;height:100%;width:100%" alt="...">
      </div>
      <div class="carousel-item h-100" >
        <img src="{{asset('assets/images/slider1.jpg')}}" class="d-block" style="object-fit: fill;height:100%;width:100%" alt="...">
      </div>
      <div class="carousel-item">
        <img src="{{asset('assets/images/slider1.jpg')}}" class="d-block  mh-50 mw-100" style="object-fit:fill;height:100%;width:100%" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
<template>
    <Header/>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        
        <div class="carousel-indicators">
            
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div  class="carousel-inner text-white">
  
          <div  class="carousel-item scrolTextContainer active pt-5">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
             <h1 class="display-4 fw-bolder titleDaisy">Nivada Shop</h1>
             <p class="lead titleDaisyLead">
                Explore our diverse collection of trendy apparel at our supermarket clothing section. Discover the latest fashion trends, quality fabrics, and affordable prices for a stylish shopping experience.               
              </p>
           </div>
          <div  class="carousel-item scrolTextContainer pt-5">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
  
            <h1 class="display-4 fw-bolder titleDaisy">Nivada Shop</h1>
            <p class="lead titleDaisyLead">
                Elevate your wardrobe with our curated selection of fashionable clothing at the supermarket shop. From casual wear to elegant ensembles, find the perfect style to suit every occasion.          
                </p>
           </div>
          <div  class="carousel-item scrolTextContainer pt-5">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
  
            <h1 class="display-4 fw-bolder titleDaisy">Nivada Shop</h1>
              <p class="lead titleDaisyLead">
                Shop with ease at our supermarket clothing department, where fashion meets convenience. Uncover a variety of styles and sizes, ensuring everyone can find their perfect fit for any season.
              </p>
  
              </div>
  
            <!-- <img src="http://127.0.0.1:8000/img/image3.jpg" class="d-block w-100" style="height:75vh;object-fit: cover;"  alt="..."> -->
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
  
</template>
<script>
    import Header from './Header.vue';
   export default {
      name:"Home",
      components:{
        Header,
    },
   }
</script>

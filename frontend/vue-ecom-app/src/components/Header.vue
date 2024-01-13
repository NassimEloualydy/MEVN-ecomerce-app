<template>   
   <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand z-level-5" href="#">Nivada Shop</a>
        <button class="navbar-toggler z-level-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item z-level-5">
              <a class="nav-link active" @click="navigateMenu('/Home')" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item z-level-5">
              <a class="nav-link" @click="navigateMenu('/Login')" href="#">Login</a>
            </li>
            <li class="nav-item z-level-5">
               <a class="nav-link" @click="navigateMenu('/Sign In')" href="#">Sign In</a>
             </li>
 
          </ul>
        </div>
      </div>
    </nav> 



    
</template>
<script>
   export default {
      name:"Header",
      methods:{
        navigateMenu(url){
          this.$router.push(url)
        }
      }
      
   }
</script>

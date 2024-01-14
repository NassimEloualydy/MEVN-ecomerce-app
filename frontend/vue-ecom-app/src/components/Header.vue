<template>   
   <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand z-level-5 user-select-all" href="#">Nivada Shop</a>
        <button class="navbar-toggler z-level-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item z-level-5 select-bnt">
              <a  :class="[nativeUrl==='/Home' ? 'nav-link active':'nav-link']" @click="navigateMenu('/Home')" aria-current="page" >Home</a>
            </li>
            <li class="nav-item z-level-5 select-bnt">
              <a  :class="[nativeUrl==='/Login' ? 'nav-link active':'nav-link']" @click="navigateMenu('/Login')" >Login</a>
            </li>
            <li class="nav-item z-level-5 select-bnt">
               <a :class="[nativeUrl==='/Signin' ? 'nav-link active':'nav-link']" @click="navigateMenu('/Signin')" >Sign In</a>
             </li> 
          </ul>
        </div>
      </div>
    </nav>     
</template>
<script>
   export default {
      name:"Header",
      data:function(){

        return {
          nativeUrl:this.$route.fullPath,
        }
      },
      methods:{
        navigateMenu(url){
          this.$router.push(url)
        }
      }
      
   }
</script>

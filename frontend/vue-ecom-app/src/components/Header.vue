<template>   
   <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand z-level-5 user-select-all fw-bolder" href="#">Nivada Shop</a>
        <button class="navbar-toggler z-level-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item z-level-5 select-bnt">
              <a  :class="[nativeUrl==='/Home' ? 'nav-link active fw-bolder':'nav-link']" @click="navigateMenu('/Home')" aria-current="page" >Home</a>
            </li>
            <li v-if="user_connected.first_name !=''" class="nav-item z-level-5 select-bnt">
              <a  :class="[nativeUrl==='/Products' ? 'nav-link active fw-bolder':'nav-link']" @click="navigateMenu('/Products')" >Products</a>
            </li>
            <li v-if="user_connected.first_name !=''" class="nav-item z-level-5 select-bnt">
              <a  :class="[nativeUrl==='/Categories' ? 'nav-link active fw-bolder':'nav-link']" @click="navigateMenu('/Categories')" >Categories</a>
            </li>

            <li v-if="user_connected.first_name ==''" class="nav-item z-level-5 select-bnt">
              <a  :class="[nativeUrl==='/Login' ? 'nav-link active fw-bolder':'nav-link']" @click="navigateMenu('/Login')" >Login</a>
            </li>
            <li v-if="user_connected.first_name ==''" class="nav-item z-level-5 select-bnt">
               <a :class="[nativeUrl==='/Signin' ? 'nav-link active fw-bolder':'nav-link']" @click="navigateMenu('/Signin')" >Sign In</a>
             </li> 
             <li v-if="user_connected.first_name !=''" class="nav-item z-level-5 select-bnt">
               <a class="nav-link" @click="navigateMenu('/logOut')" >{{user_connected.first_name}} {{user_connected.last_name}} ({{user_connected.role}})</a>
             </li> 

             <li v-if="user_connected.first_name !=''" class="nav-item z-level-5 select-bnt">
               <a class="nav-link" @click="navigateMenu('/logOut')" >Log Out</a>
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
          user_connected:{
            first_name:"",
            last_name:"",
            role:"",            
            token:"",            
          },
        }
       },
      methods:{
        navigateMenu(url){
          if(url=="/logOut"){
            // fetch(`${this.API_URL}/user/signin`)
            localStorage.clear();
            this.user_connected.first_name="";
            this.user_connected.last_name="";
            this.user_connected.role="";  
            this.$router.push("/Home");
            this.$toast.success("Log Out with success !!");

          }else{
            this.$router.push(url)
          }
        }
      },
      mounted(){
        if(localStorage.getItem("user_info")!=null){
          const {first_name,last_name,role,token}=JSON.parse(localStorage.getItem("user_info"));
          this.user_connected.first_name=first_name;
          this.user_connected.last_name=last_name;
          this.user_connected.role=role;
          this.user_connected.token=token;
        }
      }      
   }
</script>

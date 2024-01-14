<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Sign In</h1>
            </div>
        </div>
    </section>

<Breadcrump :activeurl="activeurl" :inactiveurl="inactiveurl"/>
    <section class="m-3">
        <div class="container">
            <div class="row">
                <div class="card col-md-6 mx-auto">
                    <div class="card-body">
                        <div class="card-title">
                            <h3>Sign In Form</h3>
                        </div>
                        <form action="">
                            <div class="row col-md mt-2">
                                <label for="" class="form-label">Photo</label>
                                <input type="file" name="photo"  @change="handleChange"   class="form-control">
                            </div>

                            <div class="row col-md mt-2">
                                <label for="" class="form-label">First Name</label>
                                <input type="text" name="first_name"  @change="handleChange"  v-model="user.first_name" class="form-control">
                            </div>
                            <div class="row col-md mt-2">
                                <label for="" class="form-label">Last Name</label>
                                <input type="text" name="last_name"  @change="handleChange"  v-model="user.last_name" class="form-control">
                            </div>
                            <div class="row col-md mt-2">
                                <label for="" class="form-label">Phone</label>
                                <input type="text" name="phone"  @change="handleChange" v-model="user.phone" class="form-control">
                            </div>
                            <div class="row col-md mt-2">
                                <label for="" class="form-label">Sexe</label>
                                <select name="sexe"  @change="handleChange" v-model="user.sexe" class="form-control">
                                    <option value="">Choose your sexe</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div class="row col-md mt-2">
                                <label for="" class="form-label">Email</label>
                                <input type="text" name="email"  @change="handleChange"  v-model="user.email" class="form-control">
                            </div>
                            <div class="row col-md mt-2">
                                <label for="" class="form-label">Passowrd</label>
                                <input type="text"  name="password"  @change="handleChange" v-model="user.password" class="form-control">
                            </div>
                            <div class="row col-md mt-2">
                                <input type="button" @click="signIn()" value="Sign In" class="btn btn-dark"/>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

 import Header from './Header.vue';
 import Breadcrump from './breadcrumb.vue';
 export default {
    name:"Signin",
    data:function(){
        return {
            activeurl:"Sign In",
            inactiveurl:[{name:"Home"}],
            API_URL:"http://localhost:5050/API",
            userFormData:new FormData(),
            user:{
                first_name:"",
                last_name:"",
                email:"",
                password:"",
                phone:"",
                sexe:""
            },

        }
    },
    methods:{
        handleChange(e){
            const value=e.target.name=="photo"?e.target.files[0]:e.target.value;
            this.userFormData.set(e.target.name,value);
        },
        signIn(){

            console.log(this.userFormData);
            fetch(`${this.API_URL}/user/signin/`,{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    // "Content-Type":"application/json"
                },
                body:this.userFormData
            }).then(res=>res.json()).then(res=>{
                    if(res.message){
                        this.$toast.success(`${res.message}`);
                    
                    
                    } else if(res.error){
                        this.$toast.warning(`${res.error}`);

                }else{
                        console.log(res);
                    }
            }).catch(err=>console.log(err));

        }
    },
    components:{
        Header,
        Breadcrump   
    }
 }
</script>
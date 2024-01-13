<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Log In</h1>
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
                <h3>
                    Login Form
                </h3>
                 
                </div>
                <form>
                    <input type="hidden" name="_token" value="3REFFLh4Hlr7gDwDiAOFb91hcMavm3KPAaQQR7ZL">                    <div class="row col-md mt-2">
                        <label for="" class="form-label">Email</label>
                        <input type="text" name="email" v-model="user.email" required value="" class="form-control">

                    </div>
                    <div class="row col-md mt-2">
                        <label for="" class="form-label">Password</label>
                        <input type="text" name="pw" v-model="user.password" required value="" class="form-control">

                    </div>
                    <div class="row col-md mt-2">
                        <button type="submit" @click="login" class="btn btn-dark text-white">Submit</button>
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
        name:"Login",
        data:function(){
return {

    activeurl:"Login",
    inactiveurl:[{name:"Home"}],
    user:{
        email:"",
        password:""
    }
}
        },
        methods:{
            login(){
                // alert(this.user.email)
                // alert(this.user.password)
            }
        },
        components:{
            Header,Breadcrump
        },
     }
    </script>

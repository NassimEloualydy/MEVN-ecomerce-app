<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Categories</h1>

                <div class="container">
                    <form action="">
                        <div class="row text-center">
                            <div class="col-md mt-2"><input type="text" placeholder="Name" name="" id="" class="form-control"></div>
                            <div class="col-md mt-2"><input type="text" placeholder="Description" name="" id="" class="form-control"></div>
                        </div>
                        <input type="button" value="Search" class="btn btn-dark mt-2 w-100">
                    </form>
                </div>
            </div>
        </div>
    </section>

    <Breadcrump :activeurl="activeurl" :inactiveurl="inactiveurl"/>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md">
    
                    <button data-bs-toggle="modal" data-bs-target="#modelForm" class="btn btn-dark text-white" >
                        Add New
                    </button>
                </div>
            </div>
        </div>
    </section>
    <!-- <section class="model fade" id="modelForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>
                        Category Form
                    </h5>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="form">
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-cotrol">Name</label>
                                <input type="text" name="" id="" class="form-control">
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md mt-2">
                                <label for="" class="label-cotrol">Description</label>
                                <input type="text" name="" id="" class="form-control">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
    <section class="modal fade" id="modelForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Category Form</h5>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal" ></button>
                </div>
                <div class="modal-body">
                    <div class="form">
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Name</label>
                                <input type="text"  v-model="category.name"   class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control mt-2">Description</label>
                                <input type="text"  v-model="category.description"   class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <input type="button" @click="submitCategory"  value="Add" class="btn btn-dark">
                            </div>
                        </div>

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
        name:"Categories",
        data:function(){
            return {
            activeurl:"Categories",
            inactiveurl:[{name:"Home"}],
            API_URL:"http://localhost:5050/API",
            user_connected:{
            first_name:"",
            last_name:"",
            role:"",    
            token:"",        
          },

            category:{
                name:"",
                descriotion:""
            }
            }
        },
        methods:{
            submitCategory(){
                    fetch(`${this.API_URL}/category/submitcategory`,{
                        method:"POST",
                        headers:{
                            "Accept":"application/json",
                            "Content-Type":"application/json",
                             "authorization":`Bearer ${this.user_connected.token}`,
                        },
                        body:JSON.stringify(this.category)
                    }).then(res=>res.json()).then(res=>{
                        if(res.message){
                            this.$toast.success(res.message)
                        }else if(res.error){
                            this.$toast.warning(res.error)
                            
                        }else{
                            console.log(res);
                        }
                        
                    }).catch(error=>{console.log(error)})
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
      },
        components:{
            Header,Breadcrump
        }
        }
    </script>

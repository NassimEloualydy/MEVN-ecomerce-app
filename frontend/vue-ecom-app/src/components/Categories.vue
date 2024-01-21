<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Categories</h1>

                <div class="container">
                    <form action="">
                        <div class="row text-center">
                            <div class="col-md mt-2"><input type="text" placeholder="Name" v-model="categorySearch.name" class="form-control"></div>
                            <div class="col-md mt-2"><input type="text" placeholder="Description" v-model="categorySearch.description" class="form-control"></div>
                        </div>
                        <input type="button" @click="getData()" value="Search" class="btn btn-dark mt-2 w-100">
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
    <section class="mt-5">
        <div class="container">
            <div class="row">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th colspan="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="c._id" v-for="c in categories">
                                <td>#</td>
                                <td>{{c.name}}</td>
                                <td>{{c.description}}</td>
                                <td><ion-icon  name="pencil-outline" class="Icon Icon_update m-2" data-bs-toggle="modal" data-bs-target="#modelForm" @click="loadCategory(c)"></ion-icon>
                                <ion-icon  name="trash-outline" class="Icon Icon_delete m-2" @click="deleteCategory(c._id)"></ion-icon></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <div class="container">
        <div class="row">
            <div class="text-start">

                <ion-icon name="chevron-back-outline" class="Icon Icon_details" @click="navigateData('prev')" style="margin: 1px;"></ion-icon>
                <ion-icon name="chevron-forward-outline" class="Icon Icon_details" @click="navigateData('next')" style="margin: 1px;"></ion-icon>    
            </div>
        </div>
    </div>
    
    <section class="modal fade" id="modelForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Category Form</h5>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal" @click="clearData()" ></button>
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
                                <input type="button" @click="submitCategory"  :value="submitButton" class="btn btn-dark">
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
          }
          ,
            categorySearch:{
                name:"",
                description:""
            },
            categories:[]
            ,
            submitButton:"Add",
            offset:0,
            category:{
                _id:"",
                name:"",
                description:""
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
                            this.clearData();
                            this.getData();
                        }else if(res.error){
                            this.$toast.warning(res.error)
                        }else{
                            console.log(res);
                        }
                        
                    }).catch(error=>{console.log(error)})
            },
            deleteCategory(id){
                if(window.confirm("Are you sure that you want to delete this categorie ?")){

                    fetch(`${this.API_URL}/category/deleteCategory/${id}`,{
                        method:"POST",
                        headers:{
                            "Accept":"appication/json",
                            "Content-Type":"application/json",
                            "authorization":`Bearer ${this.user_connected.token}`
                        }
                    }).then(res=>res.json()).then(res=>{
                        if(res.message){
                            this.$toast.success(res.message);
                            this.getData();
                        }else{
                            console.log(res);
                        }
                        
                    }).catch(error=>console.log(error));
                }

            },
            loadCategory(data){
                this.category._id=data._id
                this.category.name=data.name
                this.category.description=data.description
                this.submitButton="Update";
            },
            clearData(){
                this.category._id=""
                this.category.name=""
                this.category.description=""
                this.submitButton="Add";

            },
            navigateData(step){
                if(step=="next"){
                    this.offset+=6;
                }
                if(step=="prev" && this.offset>0){
                    this.offset-=6;
                }
                this.getData();
            },
            getData(){
                fetch(`${this.API_URL}/category/getData/${this.offset}`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${this.user_connected.token}`,

                    },
                    body:JSON.stringify(this.categorySearch)
                }).then(res=>res.json()).then(res=>{
                    if(res.data){
                        if(res.data.length==0){
                            this.offset-=6;
                        }else{
                            this.categories=res.data;
                        }
                    }else{
                        console.log(res);
                    }
                }).catch(err=>{console.log(err)});
            }
        },

        mounted(){
        if(localStorage.getItem("user_info")!=null){
          const {first_name,last_name,role,token}=JSON.parse(localStorage.getItem("user_info"));
          this.user_connected.first_name=first_name;
          this.user_connected.last_name=last_name;
          this.user_connected.role=role;
          this.user_connected.token=token;
          this.getData();
        }
      },

        components:{
            Header,Breadcrump
        }
        }
    </script>
 
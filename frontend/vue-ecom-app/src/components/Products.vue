<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Products Management</h1>
            </div>
        </div>
    </section>
    <Breadcrump :activeurl="activeurl" :inactiveurl="inactiveurl"/>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md">
                    <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modelForm">New</button>
                </div>
            </div>
        </div>
    </section>
    <section class="modal fade" id="modelForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Product Form</h5>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal" ></button>
                </div>
                <div class="modal-body">
                    <div class="form">
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control">Photo</label>
                                <input type="file" name="photo" @change="handleChange" class="form-control">
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="col-md mt-2">
                                <label for="" class="label-control">Photo 1</label>
                                <input type="file" name="photo1" @change="handleChange" class="form-control">
                            </div>
                            
                        </div>
                        <div class="row">

                        <div class="col-md mt-2">
                            <label for="" class="label-control">Photo 2</label>
                            <input type="file" name="photo2" @change="handleChange" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mt-2">
                            <label for="" class="label-control">Photo 3</label>
                            <input type="file" name="photo3" @change="handleChange" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mt-2">
                            <label for="" class="label-control">Name</label>
                            <input type="text" name="name" v-model="product.name" @change="handleChange" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mt-2">
                            <label for="" class="label-control">Price</label>
                            <input type="text" name="price" v-model="product.price" @change="handleChange" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mt-2">
                            <label for="" class="label-control">Qte</label>
                            <input type="text" name="qte" v-model="product.qte" @change="handleChange" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mt-2">
                            <label for="" class="label-control">Rate</label>
                            <input type="text" name="rate" v-model="product.rate" @change="handleChange" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mt-2">
                            <label for="" class="label-control">Category</label>
                            <select v-model="product.category" name="category" @change="handleChange" class="form-control">
                                <option value="">Choose A Category</option>
                                <option :key="c._id" v-for="c in categories" :value="c._id">{{c.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mt-2">
                            <label for="" class="label-control">Description</label>
                            <textarea name="description" v-model="product.description" @change="handleChange" class="form-control" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mt-2">
                            <input type="button" @click="submitProduct" value="Add" class="btn btn-dark w-100">
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
        name:"Products",
        data:function(){
return {
    activeurl:"Products",
    inactiveurl:[{name:"Home"}],
    productFormData:new FormData(),
    API_URL:"http://localhost:5050/API",
    categories:[],
    user_connected:{
            first_name:"",
            last_name:"",
            role:"",    
            token:"",        
          }
          ,

    product:{
        name:"",
        price:"",
        qte:"",
        rate:"",
        category:"",
        description:"",
    }

}
        },
        methods:{
            handleChange(e){
                const value=(e.target.name=="photo" || e.target.name=="photo1" || e.target.name=="photo2" || e.target.name=="photo3")?e.target.files[0]:e.target.value;
                this.productFormData.append(e.target.name,value);
            },
            submitProduct(){
                fetch(`${this.API_URL}/product/submitProduct`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        // "Content-Type":"application/json",
                        "authorization":`Bearer ${this.user_connected.token}` 

                    },
                    body:this.productFormData
                }).then(res=>res.json()).then(res=>{
                    if(res.message){
                        this.$toast.success(res.message)
                    }else if(res.warning){
                        this.$toast.warning(res.warning)

                    }else{
                        console.log(res);
                    }
                }).catch(err=>console.log(err));

            },
            getCategories(){
                fetch(`${this.API_URL}/category/getCategoryForProduct`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${this.user_connected.token}` 

                    },
                }).then(res=>res.json()).then(res=>{
                    if(res.categories){
                        this.categories=res.categories
                    }else{
                        console.log(res);
                    }
                }).catch(err=>console.log(err));
            }
        },
        mounted(){
            if(localStorage.getItem("user_info")!=null){
                const {first_name,last_name,role,token}=JSON.parse(localStorage.getItem("user_info"));
                this.user_connected.first_name=first_name;
                this.user_connected.last_name=last_name;
                this.user_connected.role=role;
                this.user_connected.token=token;
                this.getCategories();
        }

        },
        components:{
            Header,
            Breadcrump
        }
    }
</script>
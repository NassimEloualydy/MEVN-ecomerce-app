<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Orders</h1>
                <container>
                    <div class="container">
                        <form action="">
                            <div class="row text-center">
                                <div class="col-md mt-2">
                                    <input type="text" name="first_name" v-model="orderSearch.first_name" placeholder="First Name"  class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text" name="last_name" v-model="orderSearch.last_name" placeholder="Last Name"  class="form-control"/>
                                </div>

                                <div class="col-md mt-2">
                                    <input type="text" name="price"  v-model="orderSearch.price" placeholder="Price"  class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text" name="qte" v-model="orderSearch.status" placeholder="Status"  class="form-control"/>
                                </div>

                            </div>
                            <div class="row text-center">
                                <div class="col-md mt-2">
                                    <input type="text" name="Delevered" v-model="orderSearch.delevered" placeholder="Delevered"  class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text" name="date_delevered" v-model="orderSearch.date_delevered" placeholder="Date Of Delevery"  class="form-control"/>
                                </div>
                                <div class="col-md mt-2">
                                    <input type="text" name="product" v-model="orderSearch.product" placeholder="Product"  class="form-control"/>
                                </div>

                            </div>
                            <div class="row text-center">
                                <div class="col-md mt-2">
                                    <input type="button" value="Search"  @click="getDataOrder" class="btn btn-dark w-100">
                                </div>
                            </div>
                        </form>
                    </div>
                </container>
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
    <section class="py-5">
        <div class="container">
            <div class="row">
            <!-- the start of the card -->
             
                <!-- <div :key="p._id" v-for="p in products" class="col-md-6 col-lg-4 mb-2">
                    
                    <div class="card" style="position: relative;">
                        <span class="badge bg-secndary"  v-if="p.qte>0" style="position: absolute; top: 2px;right: 5px;background-color: #2a9d8f;">Availble</span>
                        <span class="badge bg-secndary" v-if="p.qte==0" style="position: absolute; top: 2px;right: 5px;background-color: #e76f51;">Sold Out</span>
                        <img :src="this.API_URL+'/product/getImage/'+p._id"  class="card-img-top img-main img-fluid imgProduct"/>                <div class="card-body">
                            <hr>
                        <div class="card-body">
                            <div class="card-text text-start d-flex">
                                <div class="row py-2 p-3">
                                    <div class="fw-bolder">Name</div>
                                    <div class="fw-normal">{{p.name}}</div>
                                </div>
                                <div class="row py-2 p-3">
                                    <div class="fw-bolder">Price</div>
                                    <div class="fw-normal">{{p.price}}</div>
                                </div>
                                <div class="row py-2 p-3">
                                    <div class="fw-bolder">Category</div>
                                    <div class="fw-normal">{{p.category.name}}</div>
                                </div>
                                
                            </div>
                                <ion-icon  name="pencil-outline" class="Icon Icon_update m-2" data-bs-toggle="modal" data-bs-target="#modelForm" @click="loadProduct(p)"></ion-icon>
                                <ion-icon  name="trash-outline" class="Icon Icon_delete m-2" @click="deleteProduct(p._id)"></ion-icon>
                            

                        </div>
                    </div>
                </div>
            </div> -->
                    <!-- the start of the card -->

            </div>
        </div>
    </section>
    <!-- <section class="modal fade" id="modelForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Product Form</h5>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal" @click="hideData"></button>
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
                            <input type="button" @click="submitProduct" :value="btnSubmit" class="btn btn-dark w-100">
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->

</template>
<script>
    import Header from './Header.vue';
    import Breadcrump from './breadcrumb.vue';

    export default {
        name:"Orders",
        data:function(){
return {
    activeurl:"Orders",
    inactiveurl:[{name:"Home"}],
    productFormData:new FormData(),
    API_URL:"http://localhost:5050/API",
    user_connected:{
            first_name:"",
            last_name:"",
            role:"",    
            token:"",        
          },
    orders:[],
    orderSearch:{
        first_name:"",
        last_name:"",
        price:"",
        status:"",
        delevered:"",
        date_delevered:"",
        product:"",
        
    }
    
}
        },
        methods:{
            getDataOrder(){
                fetch(`${this.API_URL}/order/getData`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${this.user_connected.token}`
                    },
                    body:JSON.stringify(this.orderSearch)
                }).then(res=>res.json()).then(res=>{
                    if(res.orders){
                        this.orders=res.orders
                        console.log(res)

                    }else{
                        console.log(res)
                    }
                }).catch(err=>console.log(err));
            },
 },
        
        mounted(){
            if(localStorage.getItem("user_info")!=null){
                const {first_name,last_name,role,token}=JSON.parse(localStorage.getItem("user_info"));
                this.user_connected.first_name=first_name;
                this.user_connected.last_name=last_name;
                this.user_connected.role=role;
                this.user_connected.token=token;
                this.getDataOrder();
        }

        },
        components:{
            Header,
            Breadcrump
        }
    }
</script>
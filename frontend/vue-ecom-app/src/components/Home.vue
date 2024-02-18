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
        <!--  -->
      <!-- section categories -->
       <section class="py-5">
        <div class="container">
          
          <div :key="c" v-for="c in categorized">
            
            <div class="text-start fw-bolder h5 mt-3">{{c}}</div>
            <div class="row" >

              <div :key="p._id" v-for="p in products"  :class="[p.category.name==c?'col-md-6 col-lg-3 mt-2':'']">
                <div class="card" v-if="p.category.name==c"  style="position: relative;">
                  <span class="badge bg-secndary"  v-if="p.qte>0" style="position: absolute; top: 5px;right: 5px;background-color: #2a9d8f;">Availble</span>
                  <span class="badge bg-secndary" v-if="p.qte==0" style="position: absolute; top: 5px;right: 5px;background-color: #e76f51;">Sold Out</span>
                  <ion-icon    name="cart-outline" class="Icon Icon_update m-2" data-bs-toggle="modal" data-bs-target="#modelForm" @click="addProduct(p)"></ion-icon>
                  <div class="d-flex" style="position: absolute; top: 28px;right: 5px;">
                    <ion-icon :key="r" v-for="r in parseInt(p.rate)" name="star"></ion-icon>
                  </div>
                  <img :src="this.API_URL+'/product/getImage/'+p._id" class="card-img-top img-main img-fluid imgProduct">
                    <div class="card-body">
                      <div class="card-text text-start d-flex">

                        <div class="row py-2 p-3">
                          <div class="fw-bolder">Name</div>
                          <div class="fw-normal">{{p.name}}</div>
                        </div>
  
                        <div class="row py-2 p-3">
                          <div class="fw-bolder">Price</div>
                          <div class="fw-normal">{{p.price}} MAD</div>
                        </div>
  
                      </div>
                    </div>
                </div>
              </div>

            </div>
            
          </div>
        </div>
       </section>
      <!-- section categories -->
      <section class="modal fade bd-example-modal-x" id="modelForm">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Basket</h5>
              <button class="btn-close" aria-label="close" data-bs-dismiss="modal" ></button>
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qte</th>
                    <th scope="col">Price Total</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :v-key="p._id" v-for="p in basketProduct">
                    <td>#</td>
                    <td>{{p.name}}</td>
                    <td>{{p.price}}</td>
                    <td><input type="text" @input="handleQtePrice($event,p._id)" name="" :value="p.qte" id="" class="form-control"></td>
                    <td>{{p.priceTotal}}</td>
                    <td>                               
                       <ion-icon  name="trash-outline" class="Icon Icon_delete m-2" @click="deleteProductFromList(p._id)"></ion-icon>
                    </td>
 
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
</template>
<script>
    import Header from './Header.vue';

   export default {
      name:"Home",
      data:function(){
        return {
          products:[],
          API_URL:"http://localhost:5050/API",
          categorized:[],
          productSearch:{
        name:"",
        price:"",
        qte:"",
        rate:"",
        category:"",
        description:"",

    },
          basketProduct:[],
          user_connected:{
            first_name:"",
            last_name:"",
            role:"",   
            token:"",        
          }
          ,

        }
      },  
    methods:{
      
      saveProducts(){
        fetch(`${this.API_URL}/order/saveProductOrder`,{
          method:"POST",
          headers:{
            "Accpet":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${this.user_connected.token}`
          },
          body:JSON.stringify(this.basketProduct)
        }).then(res=>res.json()).then(res=>{
          console.log(res);
        })
      },
      handleQtePrice(e,id){
        if(e.target.value!=""){
          if(isFinite(e.target.value)){
            let foundProduct = this.basketProduct.find(product => product._id === id);
            foundProduct.priceTotal=parseInt(e.target.value)*foundProduct.price;
            foundProduct.qte=e.target.value;
            this.$forceUpdate();
            this.saveProducts();
          }else{
            this.$toast.warning("The Quantity Sould Be An Integer !!")
          }
        }else{
          this.$toast.warning("The Quantity Sould Be An Integer !!")
        }
      },
      addProduct(product){
          const productBasket={};
          productBasket._id=product._id;
          productBasket.name=product.name;
          productBasket.price=product.price;
          productBasket.priceTotal=product.price;
          productBasket.qte=1;
          productBasket.category=product.category.name;
          var is_exist=false;
          for(var i=0;i<this.basketProduct.length;i++){
            if(this.basketProduct[i]._id==product._id){
              is_exist=true;
              console.log("Become true")
              this.basketProduct[i].qte=parseInt(this.basketProduct[i].qte)+1
              break;
            }
          }
          if(is_exist==false){
            console.log("Become false")
            this.basketProduct.push(productBasket);
            this.saveProducts()
          }
      },
      deleteProductFromList(id){
        if(window.confirm("Are You Sur That You Want To Delete This Product from your basket")){

          let productIndexToDelete = this.basketProduct.findIndex(product => product._id === id);
          if(productIndexToDelete!=-1){
            this.basketProduct.splice(productIndexToDelete, 1);  
            this.$forceUpdate();
            this.saveProducts();
          }
          this.$toast.success("Delete From Your Basket With Success !");
        }
      },
      getProductChoosen(){
        fetch(`${this.API_URL}/order/getProductChoosen`,{
          method:"POST",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "authorization":`Bearer ${this.user_connected.token}`
          },
        }).then(res=>res.json()).then(res=>{
          if(res.products){
            var productBasket={}
            for(var i=0;i<res.products.length;i++){
              productBasket={}
          productBasket._id=res.products[i].product._id;
          productBasket.name=res.products[i].product.name;
          productBasket.price=res.products[i].product.price;
          productBasket.priceTotal=res.products[i].priceInQte;
          productBasket.qte=res.products[i].qte;
          productBasket.category=res.products[i].product.category.name;
          this.basketProduct.push(productBasket);
            }
            alert(JSON.stringify(this.basketProduct));
          }else{
            console.log(res)
          }
        }).catch(err=>console.log(err));
      },
        getProducts(){
          
          fetch(`${this.API_URL}/product/getData`,{
            method:"POST",
            headers:{
              "Accept":"application/json",
              "Content-Type":"application/json",
              "authorization":`Bearer ${this.user_connected.token}`
            },
            body:JSON.stringify(this.productSearch),
          }).then(res=>res.json()).then(res=>{
            if(res.data){
              this.products=res.data
              var categorized = new Array();
              categorized.push(this.products[0].category.name)
              for(var i=0;i<this.products.length;i++){
                var exist=false;
                for(var j=0;j<categorized.length;j++){
                    if(categorized[j]==this.products[i].category.name){
                      exist=true;
                      break
                    }
                }
                if(exist==false){
                  categorized.push(this.products[i].category.name)
                }
              }
              this.categorized=categorized;
              console.log(this.categorized)
              // this.products.forEach(product=>{
              //   console.log(categorized[product.category.name])
              //   if(categorized[product.category.name]==undefined){
              //     console.log("confnfnf")
              //     categorized.push(product.category.name)
              //   }
              // });
              // this.categorized=categorized
              // console.log(JSON.stringify(this.categorized));
            }else{
              console.log(res)
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
      }
      this.getProducts();
      this.getProductChoosen()
    },
    components:{
        Header,
    },

   }
</script>

<template>
    <Header/>
    <section id="barNav" class="bg-dark text-light p-5 text-center">
        <div class="container border border-white pb-3 rounded-3">
            <div class="p-2">
                <h1>Paiment</h1>
            </div>
        </div>
    </section>
    <Breadcrump :activeurl="activeurl" :inactiveurl="inactiveurl"/>

    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <div class="card p-3 mt-2">
                      <div class="card-title fw-bolder">
                        Your Produts
                      </div>
                      <div class="card-body">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              
                              <th>Price</th>
                              <th>Qte</th>
                              <th>Price Totale</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr :v-key="p._id" v-for="p in basketProduct">
                              <td>#</td>
                              <td>{{p.name}}</td>
                              <td>{{p.price}}</td>
                              <td>{{p.qte}}</td>
                              <td>{{p.priceTotal}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card p-3 mt-2">
                      <div class="card-title fw-bolder">
                        Personale Information
                      </div>
                      <form action="">
                        <div class="row">
                          <div class="col-md mt-2">
                            <label for="" class="label-control">Name</label>
                            <input type="text" :value="user_connected.first_name+' '+user_connected.last_name" name="" id="" readonly class="form-control"/>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md mt-2">
                            <label for="" class="label-control">The Price Totale </label>
                            <input type="text" :value="priceTotale+' MAD'" name="" id="" readonly class="form-control"/>
                          </div>
                          
                        </div>
                        <div class="row">
                          <div class="col-md mt-2">
                            <input type="button" value="Confirm" @click="confirmOrder" class="btn btn-dark w-100">
                          </div>
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
    import braintree from 'braintree-web';

    export default {
        name:"Paiment",
        data:function(){
return {
    activeurl:"Paiment",
    inactiveurl:[{name:"Home"}],
    productFormData:new FormData(),
    API_URL:"http://localhost:5050/API",
    user_connected:{
            first_name:"",
            last_name:"",
            role:"",    
            token:"",        
          }
          ,
          basketProduct:[],
          priceTotale:0

}
        },
        methods:{
          confirmOrder(){
            fetch(`${this.API_URL}/order/confirmOrder/${this.priceTotale}`,{
              method:"POST",
              headers:{
                "Appcept":"application/json",
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.user_connected.token}`
              },
              body:JSON.stringify(this.basketProduct)
            }).then(res=>res.json()).then(res=>{
              if(res.message){
                this.$toast.success(res.message)
                this.$router.push("/Home");

              }else{
                console.log(res);
              }
            }).catch(err=>console.log(err))
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
          this.priceTotale+=parseInt(res.products[i].priceInQte)
          this.basketProduct.push(productBasket);
            }
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
        this.getProductChoosen();
}

},
    components:{
        Header,
        Breadcrump
    }
    }
</script>
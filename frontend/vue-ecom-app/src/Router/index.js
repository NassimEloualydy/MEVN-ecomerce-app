import {createRouter,createWebHistory} from "vue-router"
import Home from  '../components/Home.vue'
import Login from  '../components/Login.vue'
import Signin from '../components/Signin.vue'
import Products from '../components/Products.vue'
import Categories from '../components/Categories.vue'
import  Paiment from '../components/Paiment.vue'
import Order from '../components/order.vue'
const routes=[
    {path:"/Home",name:"Home",component:Home},
    {path:"/Login",name:"Login",component:Login},
    {path:"/Signin",name:"Signin",component:Signin},
    {path:"/Products",name:"Products",component:Products},
    {path:"/Categories",name:"Categories",component:Categories},
    {path:"/Paiment",name:"Paiment",component:Paiment},
    {path:"/Order",name:"Order",component:Order},

]
const router=createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),routes
});

router.beforeEach((to,from)=>{
    from
    console.log(to.name)
    console.log(from.name)
    if(to==undefined && from==undefined){
        if(to.name==from.name)
        return {name:'Home'}
    }
});

export default router;
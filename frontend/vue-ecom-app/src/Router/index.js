import {createRouter,createWebHistory} from "vue-router"
import Home from  '../components/Home.vue'
import Login from  '../components/Login.vue'

const routes=[
    {path:"/Home",name:"Home",component:Home},
    {path:"/Login",name:"Login",component:Login},
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
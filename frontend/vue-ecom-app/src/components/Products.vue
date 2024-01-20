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

}
        },
        components:{
            Header,
            Breadcrump
        }
    }
</script>
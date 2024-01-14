<template>
    <section class="p-5 text-center">
        <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
            <ol class="breadcrumb">
                
                <li  class="breadcrumb-item" v-for="u in inactiveurl">
                    <router-link :to="u.name" class="breadcrumbHref">
                        {{u.name}}
                    </router-link>                
                </li>

                <li class="breadcrumb-item active" aria-current="page">{{activeurl}}</li>
            </ol>
        </nav>
        <hr>
</section>
</template>
<script>
export default {
   name:"Breadcrump",
   props:{
    activeurl:String,
    inactiveurl:Array
   }
}
</script>

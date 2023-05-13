<script >
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default{
  components:{
    Header,
    Footer,
  },
  setup(){
    return{
      lang: localStorage.lang,
      show: false,
      showModal:false
    }
  }
}
</script>

<template>
  <Header />
    <router-view/>
    <div class="mt-2"></div>
  <Footer />
</template>


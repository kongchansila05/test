<script>
const axios = require("axios");
  import $ from 'jquery'
  import en from "../en.js";
  import kh from "../kh.js";
  import ProfileFB from '../components/ProfileFB.vue'
  import  {Bootstrap4Pagination}  from 'laravel-vue-pagination';
  import Preloader from '../components/Preloader.vue'
  import Navbar from '../components/Navbar.vue'

  export default {
    mixins:[en,kh],
    name: 'NeWs',
    components: {
      ProfileFB,
      Navbar,
      Bootstrap4Pagination,
      Preloader,
    },

    data() {
    return {
      method:false,
      hover: false,
      highlightheads :[],
      highlights :[],
      categories:[],
      popular:[],
      highlightsWhere:[],
      articles:false,
      lang: localStorage.lang,
      loading:false,
      date: '2021-09-01'
    }
  },
  props: {
    msg: String
  },
  mounted(){
    this.gethighlight();
    this.gethighlighthead();
    this.getcategory();
    this.getPopular();
    this.getResults();
  },
  methods: {
    //=====the-end=========
     getResults(page = 1){
      axios.get(`http://admin.sharesport.news/api/article?page=${page}`).then((res)=>{
        this.loading = true;
        this.articles = res.data;
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====highlight=========
    gethighlighthead(){
      axios.get("https://admin.sharesport.news/api/highlight").then((res)=>{
        this.highlightheads = res.data;
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    //=====highlight=========
    gethighlight(){
      axios.get("https://admin.sharesport.news/api/highlight").then((res)=>{
        this.highlights = res.data;
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    //=====category=========
    getcategory(){
      axios.get("https://admin.sharesport.news/api/category").then((res)=>{
        this.categories = res.data;
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    //=====Popular=========
    getPopular(){
      axios.get("https://admin.sharesport.news/api/popular").then((res)=>{
        this.popular = res.data;
      }).catch(function (error) {
          console.error(error);
      });
    },
    SetLocal(data){
      localStorage.sharetitle =data.title;
      localStorage.sharedetail =data.detail;
      localStorage.sharephoto =data.photo;
    }
  },
};
$(document).ready(function () {
  showSlides();
      function showSlides() {
        $( "div.box" )
        .mouseenter(function() {
          $( this ).find( "a" ).addClass("div-hover");
        })
        .mouseleave(function() {
          $( this ).find( "a" ).removeClass("div-hover");
        });
        setTimeout(showSlides, 500); 
      }
});

</script>
<template>
  <Navbar />
<div class="lg:px-0 md:px-0 md:mt-2">
  <!-- <div class="max-w-6xl mx-auto"> -->
  <div class="container">
    <div class="flex flex-col gap-x-2 gap-y-2 lg:gap-x-5 lg:gap-y-4 md:flex-row md:gap-x-5 md:gap-y-4">
      <div class=" from-gray-100 lg:md:w-9/12 md:w-9/12 px-2 rounded-md w-full min-top-sila p-xs">

        <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pt-2 pb-2 border-b bg-fan-primary"
        style="border-radius: 5px 5px 0px 0px;">
            <div class="gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600">
              <div class="from-blue-900 flex items-center gap-x-2 px-2">
                <span>
                  <i class="fas fa-newspaper text-white"></i>
                </span> 
                <span class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" v-if="lang == 'kh'"> 
                  {{kh.article}}
                </span>
                <span class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" v-else> 
                  {{en.article}}
                </span>
              </div>
            </div> 
          </div>
          <!-- =========================== -->


        <div>
          <div xyz="fade back-1 small-80% ease-out stagger-2 perspective-2" 
          data-aos="slide-up" data-aos-duration="900"
        class="flex flex-col gap-y-3 md:gap-y-4 lg:gap-y-4 mt-2" v-for="(value, key, index) in  articles.data " :key="index">
          <div  class="bg-transparent flex gap-x-1.5 items-start lg:flex lg:gap-x-1.5 md:gap-x-1.5 " 
          style="--xyz-index:0; --xyz-index-rev:29;" @click="SetLocal(value)">
              <a v-bind:href="'/article/'+value.id" class=" grid grid-cols-2 md:flex lg:flex xl:flex lg:gap-x-2 md:gap-x-2 ">
                <img v-bind:src="'http://admin.sharesport.news/upload/'+ value.photo" 
                class="lg:w-4/12 md:h-1/4 lg:h-1/4 w-44 rounded-sm v-lazy-image v-lazy-image-loaded radis-sila">
                
                <div class="text">
                  <h1 class="leading-7 md:leading-5 text-gray-600 md:text-sm lg:text-lg xl:text-xl 
                  tracking-tight font-medium line-limit-one">
                  {{value.title}}
                  </h1> 
                    <div class="description">
                      <p class="hidden md:hidden italic lg:flex text-md text-gray-400 line-limit">
                        {{value.detail}}
                      </p>
                    <div class="flex items-center gap-x-1">
                      <span class="text-gray-400 text-xs md:text-xs lg:text-sm ">
                        <!-- {{value.date}} -->
                        <timeago :datetime="value.date"/>
                      </span>
                    </div>
                  </div>
                </div>
            </a>
          </div>  
        </div>
        <div class="mt-2"></div>
        <Bootstrap4Pagination :data="articles" @pagination-change-page="getResults"/>
        </div>
      
        <div v-if="articles == false">
          <Preloader color="#2f2151" scale="0.6" />
          <h1>{{ msg }}</h1>
        </div>

      </div>
      <div class="lg:w-3/12 md:w-6/12 w-full sidebar">
        <ProfileFB />
      </div>

    </div>
  </div>
</div>
</template>
<style scoped>
@media (max-width: 800px){
  .p-xs{
    padding-left: 0px !important;
  }
}
@media (max-width: 769px) {
  .min-top-sila{
   padding-top: 10px;
  }
}

 .bg-transparent a:hover{
  background: #2f2151;
    overflow: hidden;
    border-radius: 5px;
}

.bg-transparent a:hover .text h1{
    color: white;
  }
.bg-transparent a:hover .text span{
  color: #a3aab5;
}
ol, ul , li {
    list-style: none;
    margin: 0;
    padding: 0;
}
.active{
    background-color: #6f4b98 !important ;
    border-color: #6f4b98 !important;
}
.max-w-6xl {
    max-width: 90% !important;
}
.bg-fan-primary{
  background-color: #2f2151;
}
.container-twon{
  margin: 1px auto;
  background-color:#fff;
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  }
  .box-twon{
    align-items:center;
    justify-content:center;
  }
.div-hover span {
  right: 50%;
    top: 50%;
    margin-top: -16px;
    margin-right: -16px;
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    transform: scale(1.5);
}
 .box {
    color: #fff;
  }
.format-icon.format-video {
    padding-left: 2px;
}
.format-icon {
    position: absolute;
    right: 20px;
    top: 20px;
    pointer-events: none;
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    line-height: 28px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background: rgba(0,0,0,.3);
    font-size: 14px;
    -webkit-transition: .43s cubic-bezier(.47,.13,.16,.72) 0s;
    -moz-transition: .43s cubic-bezier(.47,.13,.16,.72) 0s;
    -o-transition: .43s cubic-bezier(.47,.13,.16,.72) 0s;
    transition: .43s cubic-bezier(.47,.13,.16,.72) 0s;
}
    .h1, h1 {
        font-size: unset;
    }
/* ........... */
    .line-limit-one{
      display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        /* max-height: 40px; */
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    .line-limit{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        /* max-height: 40px; */
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    .media{
        position: relative;
        background-color: #6f4b98;
        padding: 20px;
        color: white;
    }
    .widget-headline-new{
        font-weight: 600;
        position: relative;
        overflow: hidden;
        clear: both;
        text-align: left !important;
        text-transform: uppercase;
        color: #081f2c;
        font-size: 20px;
        padding: 10px 0 10px !important;
        line-height: 1;
    }
    .widget-headline-new:before {
      content: "";
      position: absolute;
      height: 3px;
      top: 50%;
      background-color: #a2aaad;
      margin-top: -1px;
      left: 0;
      right: 0;
    }
</style>
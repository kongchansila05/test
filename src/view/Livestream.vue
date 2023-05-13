<script>
const axios = require("axios");
  import $ from 'jquery'
  import en from "../en.js";
  import kh from "../kh.js";
  import ProfileFB from '../components/ProfileFB.vue'
  import Navbar from '../components/Navbar.vue'

  export default {
    mixins:[en,kh],
    name: 'MoVie',
    components: {
        ProfileFB,
        Navbar,
    },
    data() {
    return {
      method:false,
      hover: false,
      livestreams :[],
      livestatus :false,
      popular:[],
      articles :[],
      lang: localStorage.lang,
    }
  },
  mounted(){
    this.getlivestream();
    this.getPopular();
    this.getarticle();
  },
  methods: {
    //=====Livestream=========
    getlivestream(){
      axios.get("https://admin.sharesport.news/api/livestream").then((res)=>{
        if(res.data.status == true){
          this.livestatus = true
          this.livestreams = res.data.data;
        }
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
    //=====article=========
    getarticle(){
        axios.get("https://admin.sharesport.news/api/article").then((res)=>{
        this.articles = res.data;
      }).catch(function (error) {
          console.error(error);
      });
    }
    //=====the-end=========
 
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
  <Navbar/>
<div class="lg:px-0 md:px-0 md:mt-2">
  <div class="container">
  <!-- <div class="max-w-6xl mx-auto"> -->
    <div class="flex flex-col gap-x-2 gap-y-2 lg:gap-x-5 lg:gap-y-4 md:flex-row md:gap-x-5 md:gap-y-4 min-top-sila">
      <div class=" from-gray-100 lg:md:w-9/12 md:w-9/12 px-2 rounded-md w-full p-xs">
        <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pt-2 pb-2 border-b bg-fan-primary"
        style="border-radius:5px 5px 0px 0px;"> 
            <div class="gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600">
              <div class="from-blue-900 flex items-center gap-x-2 px-2">
                <span>
                  <i class="fas fa-video text-white"></i>
                </span> 
                <span class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" v-if="lang == 'kh'">
                  {{kh.livestream}}
                  </span>
                <span class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" v-else>
                  {{en.livestream}}
                  </span>
              </div>
            </div> 
          </div>
        <div class="container-twon">
          <div v-for="(value, key, index) in livestreams" :key="index">
            <div class="box-twon">
                <a :href="'/livestream/'+value.id" class="">
                  <div class="relative">
                    <img v-bind:src="'http://admin.sharesport.news/upload/'+ value.photo" class="radis-sila" ></div>
                <div class="flex flex-col">
                  <h1 class="text-sm md:text-md lg:text-lg py-2 leading-5 old-color"> 
                    {{value.detail}}
                  </h1>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="w-full mx-auto lg:px-0" v-if="livestatus = false">
          <div class="content text-gray-200 lg:leading-8 md:leading-8 lg:text-lg md:text-lg text-lg">
            <p v-if="lang == 'kh'">
              <img src="/not_stream.jpg" alt="" width="1200" height="675" class="radis-sila"> 
            </p>
            <p v-if="lang == 'en'">
              <img src="/not_stream_en.jpg" alt="" width="1200" height="675" class="radis-sila"> 
            </p>
          </div>
        </div>
      </div>
      <div class="lg:w-3/12 md:w-6/12 w-full sidebar" style=" padding-right: 7px;">
        <ProfileFB />
      </div>

    </div>
    <!-------------------------->
  </div>
</div>
</template>
<style scoped>
@media (max-width: 800px){
  .p-xs{
    padding-left: 0px !important;
  }
}
.max-w-6xl {
    max-width: 90% !important;
}
.bg-fan-primary{
  background-color: #2f2151 !important;
}
.to-blue-300 {
      --tw-gradient-to: #6f4b98;
  }
.px-7{
    padding-right: 0.5rem!important;
    padding-left: 0.5rem!important;
    padding-bottom: 0.5rem!important;
    padding-top: 0.5rem!important;
}
.wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 50% 50%;
    /* background-color: #fff; */
    color: #444;
    width: 99%;
    }

    .box {
      color: #fff;
      border-radius: 5px;
      font-size: 150%;

    }
    .a {
      grid-column: 1 / 2;
      grid-row: 1;
    }
    .b {
      grid-column: 2 ;
      grid-row: 1 / 3;
    }
    .c {
      grid-column: 1 /2 ;
      grid-row: 2 ;
    }
.container-twon{
  margin: 1px auto;
  /* background-color:#fff; */
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
        background-color: #2f2151;
        padding: 7px;
        color: white;
        --tw-gradient-from: #2f2151 !important;
        --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(73, 106, 199, 0));
        border-radius: 5px;
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
<script>
const axios = require("axios");
import $ from 'jquery'
import ProfileFB from '../components/ProfileFB.vue'
import  {Bootstrap4Pagination}  from 'laravel-vue-pagination';
import Navbar from '../components/Navbar.vue'

import en from "../en.js";
import kh from "../kh.js";
export default {
  mixins:[en,kh],
  el: '#mouse',
  name: 'HightLtem',
  components: {
      ProfileFB,
      Bootstrap4Pagination,
      Navbar
  },
  data() {
    return {
      method:false,
      hover: false,
      highlightheads :[],
      highlights :[],
      categories:[],
      highlightsWhere:[],
      lang: localStorage.lang,
      highlightsWhereStatus:false,
    }
  },
  mounted(){
    this.gethighlight();
    this.gethighlighthead();
    this.getcategory();
  },
  methods: {
    //=====highlight=========
    gethighlighthead(){
      axios.get("http://admin.sharesport.news/api/highlight").then((res)=>{
        this.highlightheads = res.data;
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    //=====highlight=========
    gethighlight(page = 1){
      axios.get(`http://admin.sharesport.news/api/highlight?page=${page}`).then((res)=>{
        this.highlights = res.data;
        this.highlightsWhereStatus = true;
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    //=====category=========
    getcategory(){
      axios.get("http://admin.sharesport.news/api/category").then((res)=>{
        this.categories = res.data;
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    categorywhere(event) {
      $(".example-a").removeAttr("style");
      document.getElementById(event.id).style.cssText = 'background-color: #2f2151!important; color: white !important',
      this.method = true;
      this.gethighlight();
      axios.get("http://admin.sharesport.news/api/highlight/category/" + event.id).then((res)=>{
        if(res.data.status == true){
          this.highlightsWhereStatus = true;
          this.highlightsWhere = res.data.data;
        }
        else if(res.data.status == false){
          this.highlightsWhereStatus = false;
          this.highlightsWhere = [];

        }
      }).catch(function (error) {
          console.error(error);
      });
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
    <div class="container-sm">
    <div class="flex flex-col gap-x-2 gap-y-2 lg:gap-x-5 lg:gap-y-4 md:flex-row md:gap-x-5 md:gap-y-4">
      <div class=" from-gray-100 lg:md:w-9/12 md:w-9/12 px-2 rounded-md min-top-sila p-xs">
        <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pt-2 pb-2 border-b bg-fan-primary"
        style="border-radius:5px 5px 0px 0px;"> 
            <div class="gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600">
              <div class="from-blue-900 flex items-center gap-x-2 px-2">
                <span>
                  <i class="fas fa-television text-white" aria-hidden="true"></i>
                </span> 
                <span class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white"  v-if="lang == 'kh'"> 
                  {{kh.highligh}}
                </span>
                <span class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" v-else> 
                  {{en.highligh}}
                </span>
              </div>
            </div> 
          </div>
      <!-- =========================== -->
      <div>
        <section class="archive-title">
          <div class="pre-title">
            <span class="category" v-if="lang == 'kh'"> {{kh.category_league}} </span>
            <span class="category" v-else>{{en.category_league}} </span>

          </div>
            <div class="term-badges">
              <div class="new-mumu example" >
                <span class="term-8" v-for="(value, key, index) in categories " :key="index">
                <button>
                  <a class="example-a" :id="value.id"  @click="categorywhere(value)" :value="value.ïd"> {{value.name}}</a>
                </button>  
                </span>
              </div>
            </div>
        </section>
      </div>
      <!-- =========================== -->
      <div v-if="method === false">
        <div class="grid-box"  v-for="(value, key, index) in  highlights.data " :key="index" data-aos-duration="900" data-aos="slide-up">
        <div class="grid grid-cols-2 md:flex lg:flex xl:flex lg:gap-x-2 md:gap-x-2">
          <div style="float: left;padding-right: 10px;" class="width-man">
            <div class="relative box radis-sila">
              <a v-bind:href="'/highligh/'+value.id">
                <span class=" format-icon format-video"> 
                  <i class="fas fa-play"></i>
                </span>
                <img v-bind:src="'http://admin.sharesport.news/upload/'+ value.photo" class="radis-sila w-154 limit-w-img" >
              </a>
            </div>
          </div>
          <div style="float: right;width: 100%;">
            <div class="text">
              <h1 class="leading-7 md:leading-5 text-gray-600 md:text-sm lg:text-lg xl:text-xl tracking-tight font-medium line-limit-one"
                >{{value.title}}</h1>
              <div class="description" >
                <div class="italic lg:flex text-md text-gray-400 line-limit"> 
                  {{value.detail}}
                </div>
                <div class="flex items-center gap-x-1">
                  <span class="text-gray-400">
                    <timeago :datetime="value.date"/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="mt-2"></div>
        <Bootstrap4Pagination :data="highlights" @pagination-change-page="gethighlight"/>
      </div>
      <div  v-else-if="method === true">
        <div class="grid-box"  v-for="(value, key, index) in  highlightsWhere " :key="index" data-aos-duration="900" data-aos="slide-up">
          <div class="grid grid-cols-2 md:flex lg:flex xl:flex lg:gap-x-2 md:gap-x-2">
          <div style="float: left;padding-right: 10px;" class="width-man">
            <div class="relative box radis-sila">
              <a v-bind:href="'/highligh/'+value.id">
                <span class=" format-icon format-video"> 
                  <i class="fas fa-play"></i>
                </span>
                <img v-bind:src="'http://admin.sharesport.news/upload/'+ value.photo" class="radis-sila w-154 limit-w-img" >
              </a>
            </div>
          </div>
          <div style="float: right;width: 100%;">
            <div class="text">
              <h1 class="leading-7 md:leading-5 text-gray-600 md:text-sm lg:text-lg xl:text-xl tracking-tight font-medium line-limit-one"
                >{{value.title}}</h1>
              <div class="description" >
                <div class="italic lg:flex text-md text-gray-400 line-limit"> 
                  {{value.detail}}
                </div>
                <div class="flex items-center gap-x-1">
                  <span class="text-gray-400">
                    <timeago :datetime="value.date"/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div v-if="highlightsWhereStatus == false" class="notfound">
        Category NotFound
      </div>

      </div>
      <div class="lg:w-3/12 md:w-6/12 sidebar" style=" padding-right: 7px;">
        <ProfileFB />
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
.term-8:hover button a{
  background: #2f2151!important;
  color: white !important;
}
.notfound{
  text-align: center;
  font-size: 25px;
  color: red;
  padding-top: 10%;
  padding-bottom: 10%;
}

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
.grid-box .grid-cols-2:hover{
  background: #2f2151;
    overflow: hidden;
    border-radius: 5px;
}
.grid-box div:hover .text h1{
    color: white;
  }
.width-man{
  width : 50%
}
@media (max-width: 765px){
  .width-man{
    width : 100%
  }
}
.max-w-6xl {
    max-width: 90% !important;
}
.bg-fan-primary{
  background-color: #2f2151 !important;
}
.article-container {
    overflow: hidden;
    position: relative;
}

.article-img-holder {
    width: 100%;
    height: 100%;
    background: url(https://awik.io/demo/background-image-zoom/traffic2.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 1s;
}

.article-img-holder:hover {
    transform: scale(1.2);
}
/* .limit-w-img{
  height: 180px; width: 320px;
} */
@media (max-width: 600px){
  .wrapper {
      grid-template-columns: unset !important;
  }
  .widget-headline-new{
    display: none !important;
  }
}
.line-limit-one {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    /* max-height: 40px; */
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
@media (max-width: 500px){
  .wrapper {
      grid-template-columns: unset !important;
  }
  .widget-headline-new{
    display: none !important;
  }
}
@media (max-width: 400px){
  .wrapper {
      grid-template-columns: unset !important;
  }
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
.category{
    padding: 10px 10px 10px 10px;
    align-items: center;
    background-color: #2f2151;
    color: white;
}
  .archive-title .term-badges span.term-badge a {
      background: #fff!important;
      border: 1px solid #d4d4d4!important;
      border-color: #d4d4d4!important;
      padding: 0 7px;
      display: inline-block;
      line-height: 20px;
      margin-right: 3px;
      font-size: 10px;
      float: left;
      color: #8b8b8b!important;
      font-weight: 700;
      margin-top: 4px;
  }
  .archive-title {
      margin-bottom: calc(var(--publisher-spacing-60-percent)*1px);
  }
.archive-title .pre-title:after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 120%;
    height: 3px;
    width: 100%;
    background-color: #2f2151;
}

.archive-title {
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 10px;
    padding-top: 15px;
}
.archive-title .pre-title {
    font-weight: 400;
    font-size: 14px;
    text-align: inherit;
    text-transform: capitalize;
}

.archive-title .pre-title {
    position: relative;
    margin-bottom: 17px;
}
.text-gray-15 {
    font-weight: 700;
    line-height: 20px;
    font-size: 15px;
    text-align: inherit;
    text-transform: none;
}
.grid-box-new{
  background-color: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
}

.media{
    position: relative;
    background-color: #6f4b98;
    padding: 20px;
    color: white;
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
.title {
    font-weight: 700;
    line-height: 28px;
    font-size: 23px;
    text-align: inherit;
    text-transform: capitalize;
    color: #0f0f0f;
}
  .text-gray-600{
    font-size: 20px;
  }
  .game-boarddd {
      display: grid;
      grid-template-columns: 850px 300px;
      justify-content: center;
      padding-top: 5px;
  }
  .grid-img{
    width:850px;
    display:grid;
    grid-template-columns: 100%;
    grid-row: auto auto;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
  }
  .grid-box{
    background-color:none;
    display:flex;
    align-items:center;
    /* justify-content:center; */
    padding: 10px 0px 0px 0px;
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
.listing-item-tb-2 .format-icon {
    right: 15px;
    top: 15px;
    width: 28px;
    height: 28px;
    line-height: 24px;
    font-size: 12px;
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
  @media (min-width: 580px)
    {
    .widget-headline{
        font-weight: 600;
        position: relative;
        overflow: hidden;
        clear: both;
        text-align: left !important;
        text-transform: uppercase;
        color: #081f2c;
        padding: 0;
        line-height: 1;
    }
    .widget-headline{
    font-size: 30px;
    margin: 15px 0 15px !important;
    }  

    
    .widget-headline-new{
        font-weight: 600;
        position: relative;
        overflow: hidden;
        clear: both;
        text-align: left !important;
        text-transform: uppercase;
        color: #081f2c;
        /* padding: 0; */
        padding: 10px 0 10px !important;
        line-height: 1;
    }
    .widget-headline-new{
      font-size: 20px;
    } 
  }
.header-footer{
  padding-top: 30px !important;
}

  .mx-auto {
      margin-left: auto;
      margin-right: auto;
  }
.w-full {
    width: 100%;
}
.text-gray-400 {
    font-size: 14px;
    --tw-text-opacity: 1;
    color: rgba(156, 163, 175, var(--tw-text-opacity));
}
.name{
  /* text-align: left; */
  font-size: 21px;
  font-weight: 700;
  font-size: 17px;
  text-align: inherit;
  text-transform: capitalize;
}
.absolute {
    position: absolute;
}
.p-6 {
    /* padding: 1.5rem; */
    padding: 0px 10px 0px 10px;
}
.bottom-0 {
    bottom: 0px;
}
.relative {
    position: relative;
}
  .wrapper {
    display: grid;
    grid-gap: 2px;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    background-color: #fff;
    color: #444;
  }
  .box {
    background-color: #444;
    color: #fff;
  }

  .b {
    grid-column: 3;
    grid-row: 1;
  }
  .a {
    grid-column: 1/3 ;
    grid-row: 1 / 3;
  }
  .d {
    grid-column: 4 ;
    grid-row: 2 ;
  }
  .c {
    grid-column: 3;
    grid-row: 2;
  }
</style>

<script >
const axios = require("axios");
import en from "../en.js";
import kh from "../kh.js";
import url from "../url.js";
import $ from 'jquery'
import  {Bootstrap4Pagination}  from 'laravel-vue-pagination';
  if (localStorage.lang) {
      localStorage.lang;
  }
  else{
    localStorage.lang ='kh';
  }
  localStorage.sponser ='show';
export default {
  mixins:[en,kh,url],
  components: {
      Bootstrap4Pagination,
    },
    el: '#app',
    data() {
        return {
        popular:[],
        sponser: localStorage.sponser,
        lang: localStorage.lang,
        }
    },
    mounted(){
      this.getPopular();
    },
    methods: {
    //=====Popular=========
    getPopular(page = 1){
      axios.get(`http://admin.sharesport.news/api/popular?page=${page}`).then((res)=>{
        this.popular = res.data;
        // console.log(res.data);
      }).catch(function (error) {
          console.error(error);
      });
    },
    //=====the-end=========
    }
  }
  document.querySelector("body").onclick=function(){
    $('.sponser').css('display', 'none');
  }
</script>

<template>

  <!-- <div data-aos="fade-down" data-aos-duration="1000" class=" container-sm vfm vfm--inset vfm--absolute sponser" style="z-index: 1000;pointer-events: none;">
    <div class="vfm__overlay vfm--overlay vfm--absolute vfm--inset"></div> 
    <div tabindex="-1" class="vfm__container vfm--absolute vfm--inset vfm--outline-none modal-container" style="">
      <div class="vfm__content modal-content">
        <div style="font-weigt: bold;color=#2f2151;font-family:Hanuman; text-align: center; float: right; width: 100%;">
          <img src="https://www.asiasport.com/img/banner-sticky.79153a56.png" alt="" width="100%" >
        </div>
      </div>
    </div>
  </div> -->

<div class="flex flex-col">
    <div class="bg-gray-100 dark:bg-white md:mt-0 lg:mt-0 xl:mt-0">
        <span class="bg-fan-primary text-md md:text-lg lg:text-lg xl:text-lg flex text-white p-2" 
        style="border-radius: 5px 5px 0px 0px;" v-if="lang == 'kh'">
       {{kh.facebookpage}}
        </span> 
        <span class="bg-fan-primary text-md md:text-lg lg:text-lg xl:text-lg flex text-white p-2" 
        style="border-radius: 5px 5px 0px 0px;" v-else>
        {{en.facebookpage}}
        </span> 
        <div class="flex flex-col items-center w-full">
<!-- <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKH88Cambodia&tabs=timeline&amp;small_header=true&amp;
adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=335145474823788" height="500" width="100%" scrolling="no" 
frameborder="0" allowfullscreen="allowfullscreen" data-lazy="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
style="border: none; overflow: hidden;">
</iframe> -->
<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKH88Cambodia%2F&tabs=timeline&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=335145474823788" width="100%"  height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
    </div>
</div>
<div class="mt-2"></div>
  <span class="bg-fan-primary text-md md:text-lg lg:text-lg xl:text-lg flex text-white p-2" 
      style="border-radius: 5px 5px 0px 0px;" v-if="lang == 'kh'">
      <img src="/benner/logo.jpeg" alt="" style="width: 35px;border-radius: 50%;margin-right: 5px;height: 35px;">

      {{kh.telegrampage}}
  </span> 
  <span class="bg-fan-primary text-md md:text-lg lg:text-lg xl:text-lg flex text-white p-2" 
      style="border-radius: 5px 5px 0px 0px;" v-else>
      <img src="/benner/logo.jpeg" alt="" style="width: 35px;border-radius: 50%;margin-right: 5px;height: 35px;">

      {{en.telegrampage}}
  </span> 
  <div class="tgme_page_action">
  <a class="tgme_action_button_img" href="tg://resolve?domain=KH88Promotion">
    <img style="width: 50%;margin-left: 25%;" src="/icon/IMG_9933.PNG">
  </a>
  <!-- <a class="tgme_action_button_new shine" href="tg://resolve?domain=newssportskh">
    View in Telegram</a> -->
</div>
  
<div class="mt-2"></div>
<h2 class="widget-headline-new">
  <span class="media bg-fan-primary" style="border-radius: 5px" v-if="lang == 'kh'">{{kh.popular}}</span>
  <span class="media bg-fan-primary" style="border-radius: 5px" v-else>{{en.popular}}</span>
</h2>
<div  class="bg-gray-100 dark:bg-white rounded-sm" v-for="(value, key, index) in popular.data " :key="index">
<article class="bg-transparent mb-2 flex gap-x-1.5 items-start lg:flex lg:gap-x-1.5 md:gap-x-1.5" data-aos="zoom-in" data-aos-duration="1000" >
    <a :href="'/popular/'+value.id" class="grid grid-cols-2 gap-x-3 md:flex lg:flex xl:flex">
            <img v-bind:src="'http://admin.sharesport.news/upload/'+ value.photo"
            class="h-24 w-44 md:w-1/4 md:h-1/4 lg:w-4/12 object-cover rounded-sm v-lazy-image v-lazy-image-loaded radis-sila" >
            <div class="text">
            <h1 class="leading-7 md:leading-5 text-gray-600 md:text-sm lg:text-md xl:text-md tracking-tight 
            font-medium">
            {{value.title}}
            </h1> 
            <div>
            <div class="flex items-center gap-x-1 mt-1 md:mt-2 lg:mt-2 xl:mt-2">
            <span class="text-gray-400 text-sm md:text-sm lg:text-sm">
                {{value.date}}
            </span>
        </div>
        </div>
    </div>
    </a>
</article>
</div>
<Bootstrap4Pagination :data="popular" @pagination-change-page="getPopular"/>
</template>

<style scoped>
.page-link.active {
    z-index: 0 ;
}
.modal-content {
    display: flex;
    flex-direction: column;
    width: unset;
    color: var(--bs-modal-color);
    pointer-events: auto;
    background-color: var(--bs-modal-bg);
    background-clip: padding-box;
    border: var(--bs-modal-border-width) solid var(--bs-modal-border-color);
    border-radius: var(--bs-modal-border-radius);
    outline: 0;
    padding-right: 19px;
}
.vfm--absolute{
    position: fixed !important;
}
.modal-container{
    display: flex;
    justify-content: right;
    align-items: end !important;
}
.vfm--inset{
    top: 0;
    right: 0;
    bottom: 20px;
    left: 0;
}
a.tgme_action_button_new.shine {
    background-image: linear-gradient(270deg, rgba(100, 181, 239, 0) 48.44%, #aea2cca8  75.52%, rgba(100, 181, 239, 0) 100%);
    background-repeat: no-repeat;
    animation: bg-move linear 5s infinite;
}

a.tgme_action_button_new {
    background-color: var(--accent-btn-color);
}
a.tgme_action_button, a.tgme_action_button_new {
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    color: #FFF;
    background: #2f2151;
    border-radius: 22px;
    overflow: hidden;
    display: inline-block;
    padding: 13px 24px;
    height: 42px;
    text-transform: uppercase;
    vertical-align: top;
}
a.tgme_action_button, a.tgme_action_button_img {
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    color: #FFF;
    background: #ffffff;
    border-radius: 22px;
    overflow: hidden;
    display: inline-block;
    padding: 13px 24px;
    /* height: 42px; */
    text-transform: uppercase;
    vertical-align: top;
    margin-top: -17px;
 }
.tgme_page_action {
    text-align: center;
    margin-top: 24px;
    line-height: 0;
}
.tgme_page_photo {
    text-align: center !important;
    padding-bottom: 16px;
}
.tgme_page_photo_image {
    width: 122px;
    height: 122px;
    border-radius: 61px;
}
@media (max-width: 2700px) {
  .modal-content{
      width: 31% !important;
  }
}
@media (max-width: 1200px) {
  .modal-content{
      width: 35% !important;
  }
}
@media (max-width: 1100px) {
  .modal-content{
      width: 40% !important;
  }
}
@media (max-width: 900px) {
  .modal-content{
      width: 45% !important;
  }
}
@media (max-width: 800px) {
  .modal-content{
      width: 52% !important;
  }
}
@media (max-width: 700px) {
  .modal-content{
      width: 60% !important;
  }
}
@media (max-width: 600px) {
  .modal-content{
      width: 60% !important;
  }
}
@media (max-width: 500px) {
  .modal-content{
      width: 70% !important;
  }
}

.vfm--absolute{
    position: absolute;
}
/* .vfm--overlay{
    background-color: rgba(0,0,0,.5);
} */
.modal-container {
    display: flex;
    justify-content: right;
    align-items: center;
}
.dark-mode div .modal-content {
    border-color: #2d3748;
    background-color: #1a202c;
}
.modal__content{
    flex-grow: 1;
    overflow-y: auto;
}
.prose p {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
}
.modal__action{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    padding: 1rem 0 0;
}
.modal__close{
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}

  .bg-transparent a:hover{
    background: #2f2151;
    overflow: hidden;
    border-radius: 5px;
  }
  .bg-transparent a:hover .text h1{
    color: white;
  }
.silapf{
  bottom: 90px;
  left: 61.5%;
  height: 200px;
}
@media (max-width: 1300px) {
  .silapf{
    bottom: 90px;
    left: 60%;
    height: 200px;
  }
}
@media (max-width: 1000px) {
  .silapf{
    bottom: 90px;
    left: 50%;
    height: 200px;
  }
}
@media (max-width: 800px) {
  .silapf{
    bottom: 90px;
    left: 45%;
    height: 200px;
  }
}
@media (max-width: 700px) {
  .silapf{
    bottom: 90px;
    left: 35%;
    height: 200px;
  }
}
@media (max-width: 600px) {
  .silapf{
    bottom: 90px;
    left: 25%;
    height: 200px;
  }
}

@media (max-width: 500px) {
  .silapf{
    bottom: 90px;
    left: 15%;
    height: 200px;
  }
}
@media (max-width: 400px) {
  .silapf{
    bottom: 90px;
    left: 3.5%;
    height: 200px;
  }
}

.text-gray-600 {
  font-size: 14px !important;
}
.modal-content-download__scanner{
    width: 3.375rem;
    height: 3.375rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon-text{
    font-size: .25rem;
    line-height: .6rem;
    margin-left: 0.3rem;
}
.icon-text .highlight{
    font-size: .65rem;
    line-height: .7rem;
    font-weight: 600;
}
.icon-holder img{
    width: 100%;
}
.modal-content-download img {
    filter: drop-shadow(0 4px 4px rgba(0,0,0,.25));
}

.modal-content-download__link a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #000;
    box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
    border: 1px solid #a6a6a6;
    padding: 0.3rem;
    border-radius: 0.25rem;
    margin: 0.1rem;
    min-width: 6rem;
    height: 30px;
    padding-top: 20px;
    color: white;
}


#ym-notification{
    width: 22rem;
    background-color: var(--color-grey-40);
    background: url(https://www.asiasport.com/img/banner-sticky.79153a56.png) no-repeat 100%;
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
.limit-w-img{
  height: 180px; width: 320px;
}
@media (max-width: 600px){
  .wrapper {
      grid-template-columns: unset !important;
  }
  .widget-headline-new{
    display: none !important;
  }
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
@media (max-width: 800px)
    {
.limit-w-img{
  height: 130px; width: 320px;
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
    width: 98%;
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
    background-color: #2f2151;
    padding: 7px;
    color: white;
    --tw-gradient-from: #2f2151 !important;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(73, 106, 199, 0));
    border-radius: 5px;
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

.max-w-6xl {
      max-width: 72rem;
      padding-top: 5px;
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


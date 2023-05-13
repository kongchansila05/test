<script type="text/javascript">
import en from "../en.js";
import kh from "../kh.js";
import $ from 'jquery'
const axios = require("axios");
import VueLoadImage from 'vue-load-image'
// import VLazyImage from "v-lazy-image";
const Swal = require('sweetalert2');

if (localStorage.lang) {
      localStorage.lang;
  }
  else{
    localStorage.lang ='kh';
  }
export default {
  mixins:[en,kh],
  name: 'ProMotion',
    components: {
        VueLoadImage,
        // VLazyImage,
    },
  data() {
    return {
        lang: localStorage.lang,
        promotion:[],
        titlePopup:'',
        photoPopup:'',
        videoPopup:'',
        detailPopup:'',
        Wherepromotion:[],
        category:[],
        ClickChere:false,
        ActiveIndex:false,
        titlePopup_khmer:'' ,
        photoPopup_khmer:''  ,
        detailPopup_khmer:'' ,

    }
  },
  
  mounted(){
        this.Getcategory();
        this.Getpromotion();
    },
    methods: {
        //=====Getpromotion=========
        Getpromotion(){
            axios.get("https://admin.kh.2m-sport.com/api/promotion").then((res)=>{
                this.promotion = res.data.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====Wherepromotion=========
        GetWherepromotion(id){
            $('.button').removeClass("ButtonActive");
            // document.getElementById(id).style.cssText = 'background-color: #2f2151!important; color: white !important';
            if(id == '21'){
                document.getElementById(id).classList.add("ButtonActive");
                axios.get("https://admin.kh.2m-sport.com/api/promotion").then((res)=>{
                    this.promotion = res.data.data;
                    this.ClickChere = false;
                }).catch(function (error) {
                    console.error(error);
                });
            }else{
                axios.get("https://admin.kh.2m-sport.com/api/promotion/"+id).then((res)=>{
                    if(res.data.status== true){
                        document.getElementById(id).classList.add("ButtonActive");
                        this.Wherepromotion = res.data.data;
                        this.ClickChere = true;
                    }
                    else{
                        Swal.fire({
                            title: 'Category Not Found',
                            timer: 800,
                            icon: 'error',
                            showConfirmButton: false,
                        })
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            }
        },
        //=====the-end=========
        //=====category=========
        Getcategory(){
            axios.get("https://admin.kh.2m-sport.com/api/category").then((res)=>{
                this.category = res.data.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        PopupData(data){
            this.titlePopup = data.title;
            this.photoPopup = data.photo;
            this.detailPopup = data.detail;
            this.videoPopup = data.video;
            this.titlePopup_khmer = data.title_khmer;
            this.photoPopup_khmer = data.photo_khmer;
            this.detailPopup_khmer = data.detail_khmer;
        },
        GetWherepromotionAll(){
            this.ClickChere = false;
        },
    }
}
$('.modal-backdrop').remove()
$(document.body).removeClass("modal-open");
</script>
<template>
<div class="mt-2"></div>
<div class="main-content" >
    <div class="container">
        <div style="margin-top:10px; margin-bottom:10px;" class="sila">
            <span  style="padding-right: 5px;" > 
                <button v-if="lang == 'kh'" style="margin: 10px;" class="btn btn-primary button"  @click="GetWherepromotionAll()">ការផ្ដល់ជួនពិសេស</button>
                <button v-else style="margin: 10px;" class="btn btn-primary button"  @click="GetWherepromotionAll()" >All</button>
            </span>
            <span v-for="(value, key, index) in promotion" :key="index" style="padding-right: 5px;" > 
                <button v-if="lang == 'kh'" style="margin: 10px;" class="btn btn-primary button"  @click="GetWherepromotion(value.category_id)" :id="value.category_id" >{{ value.category_name_khmer }}</button>
                <button v-else style="margin: 10px;" class="btn btn-primary button"  @click="GetWherepromotion(value.category_id)" :id="value.category_id" >{{ value.category_name }}</button>
            </span>
        </div>
        <div v-if="ClickChere == false">
            <div class="grid-2" >
                <div v-for="(value, key, index) in promotion" :key="index">
                    <div v-if="lang == 'kh'" class="img" data-aos="zoom-in">
                        <vue-load-image>
                            <template v-slot:image>
                            <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo_khmer" style="width: 100%;height: 100%; ">
                            </template>
                            <template v-slot:preloader> 
                            <img src="/blank/null-promotion.png" alt="" style="width: 100%;height: 100%; ">
                            <!-- <v-lazy-image :src="'https://admin.kh.2m-sport.com/upload/'+value.photo_khmer" :src-placeholder="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; " /> -->
                            </template>
                            <template v-slot:error><img src="/blank/null-promotion.png" alt="" style="width: 100%;height: 100%; "></template>
                        </vue-load-image>
                        <button type="button" class="bottom-right register-btn btn btn-primary read_more" data-bs-toggle="modal" data-bs-target="#read_more" @click="PopupData(value)">អានបន្ថែម</button>
                    </div>

                    <div v-else class="img" data-aos="zoom-in">
                        <vue-load-image>
                            <template v-slot:image>
                            <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; ">
                            </template>
                            <template v-slot:preloader> 
                            <img src="/blank/null-promotion.png" alt="" style="width: 100%;height: 100%; ">
                            <!-- <v-lazy-image :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" :src-placeholder="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; " /> -->
                            </template>
                            <template v-slot:error><img src="/blank/null-promotion.png" alt="" style="width: 100%;height: 100%; "></template>
                        </vue-load-image>
                        <button type="button" class="bottom-right register-btn btn btn-primary read_more" data-bs-toggle="modal" data-bs-target="#read_more" @click="PopupData(value)">Read More</button>
                    </div>

                </div>
            </div>
        </div>
        <div v-if="ClickChere == true">
            <div v-for="(value, key, index) in Wherepromotion" :key="index" data-aos="zoom-in"> 
                <div class="img" data-aos="zoom-in">
                    <vue-load-image>
                        <template v-slot:image>
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; " data-aos="zoom-in"> 
                        </template>
                        <template v-slot:preloader> 
                            <img src="/blank/null-promotion.png" alt="" style="width: 100%;height: 100%; ">
                        <!-- <v-lazy-image :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" :src-placeholder="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; " /> -->
                        </template>
                        <template v-slot:error><img src="/blank/null-promotion.png" alt="" style="width: 100%;height: 100%; "></template>
                    </vue-load-image>
                    <button type="button" class="bottom-right register-btn btn btn-primary read_more" data-bs-toggle="modal" data-bs-target="#read_more" @click="PopupData(value)">អានបន្ថែម</button>
                </div>
            </div>
        </div>
    <!-- Modal -->
        <div class="modal fade" id="read_more" role="dialog" tabindex="-1" aria-labelledby="read_more" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div v-if="lang == 'kh'"  class="modal-content ">
                <div class="modal-header" style="background: #5f2d85;">
                    <h5 class="modal-title" style="font-size: 20px; color: white;">
                         <b>{{ this.titlePopup_khmer }}</b>
                    </h5>
                </div>
                <div class="modal-header grid-header">
                    <div style="text-align: center">
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+photoPopup_khmer" style="width:100%;">
                    </div>
                </div>
                <div style="padding-left: 15px; padding-bottom: 15px; font-size: 20px;">
                    {{ this.detailPopup_khmer }}
                </div>
            </div>

            <div v-else class="modal-content ">
                <div class="modal-header" style="background: #5f2d85;">
                    <h5 class="modal-title" style="font-size: 20px; color: white;">
                         <b>{{ this.titlePopup }}</b>
                    </h5>
                </div>
                <div class="modal-header grid-header">
                    <div style="text-align: center">
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+photoPopup" style="width:100%;">
                    </div>
                </div>
                <div style="padding-left: 15px; padding-bottom: 15px; font-size: 20px;font-size: 20px;">
                    {{ this.detailPopup }}
                </div>
            </div>

        </div>
        </div>
    <!-- modal end -->

    </div>
</div>

</template>

<style scoped>
.modal{
    --bs-modal-width: 900px;
}
.img:hover img {
    transform: scale(1.01);
}
.modal-content{
    border: solid 2px #704c97 !important;
}
#container {
   min-height:100%;
   position:relative;
}
.sila{
    overflow-x: auto;
    white-space: nowrap;
}
.sila::-webkit-scrollbar {
  display: none;
}
.button {
    font-weight: 800;
    line-height: 20px;
    color: white;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    padding: 9px 21px !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important;
    transition: all 0.3s ease-in-out !important;
    background: radial-gradient(50.43% 23.75% at 50.43% 0, #9888c2 0, hsla(0, 0%, 100%, 0) 100%), radial-gradient(65% 65% at 50.43% 0, #603fbaba 0, rgba(255, 225, 150, 0) 100%), linear-gradient(180deg, #2f2151, #603fbaba 99.48%) !important;
}
.read_more:hover{
    background: unset !important;
    color: #ffffff;
    border-color: #f1cc50 !important;
}
.button:hover {
    font-weight: 800;
    line-height: 20px;
    color: yellow;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    padding: 9px 21px !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important;
    transition: all 0.3s ease-in-out !important;
    background: #2f2151 !important;
    box-shadow: 0 4px 4px rgb(107 102 200 / 25%), inset 0 -4px 8px rgb(98 98 168 / 60%) !important;
}

.ButtonActive {
    font-weight: 800;
    line-height: 20px;
    color: yellow;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    padding: 9px 21px !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important;
    transition: all 0.3s ease-in-out !important;
    background: #2f2151 !important;
    box-shadow: 0 4px 4px rgb(107 102 200 / 25%), inset 0 -4px 8px rgb(98 98 168 / 60%) !important;
}
.read_more {
    background: #f1cc50 !important;
    color: #ffffff;
    border-color: #f1cc50 !important;
}
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}
.img img{
    border-radius:10px;
}
.img{
    position: relative;
}
.grid-2{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr ;
}
.grid-3{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
}
.read_more{
    --bs-btn-font-size: 10px !important;
}
@media (max-width: 900px){
    .read_more{
        --bs-btn-font-size: 10px !important;
    }
}
 @media (max-width: 700px){
    .grid-2{
        grid-template-columns: 1fr ;
    }
}

</style>

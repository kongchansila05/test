<script type="text/javascript">
import en from "../en.js";
import kh from "../kh.js";
const axios = require("axios");
import VueLoadImage from 'vue-load-image'
    // import VLazyImage from "v-lazy-image";
if (localStorage.lang) {
      localStorage.lang;
  }
  else{
    localStorage.lang ='kh';
  }
export default {
    mixins:[en,kh],
    name: 'LotTol',
    components: {
    VueLoadImage,
    // VLazyImage,
    },
    data() {
        return {
            lang: localStorage.lang,
            Lottol:[],
            BennerLottol:[],
        }
    },
    mounted(){
        this.GetLottol();
        this.getBennerLottol();
    },
    methods: {
        //=====getBennerLottol=========
        getBennerLottol(){
            axios.get("https://admin.kh.2m-sport.com/api/bennerlottol").then((res)=>{
                this.BennerLottol = res.data.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====category=========
        GetLottol(){
        axios.get("https://admin.kh.2m-sport.com/api/lottol").then((res)=>{
            this.Lottol = res.data.data;
        }).catch(function (error) {
            console.error(error);
        });
        },
        //=====the-end=========

    }
}
</script>
<template>
    <div class="video">
    <video src="benner/sport.mp4" title="2m-sport" type="video/mp4" autoplay="autoplay" loop="loop" muted="muted" playsinline="" class="cursor-pointer" style="width:100%;"></video>
</div>
    <!-- <div v-for="(value, key, index) in BennerLottol" :key="index">
        <vue-load-image v-if="lang == 'en'">
            <template v-slot:image>
            <img :src="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo" style="width:100%; height: 100%;">
            </template>
            <template v-slot:preloader> 
            <v-lazy-image :src="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo" :src-placeholder="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo"/>
            </template>
            <template v-slot:error>Image load fails</template>
        </vue-load-image>
        <vue-load-image v-if="lang == 'kh'">
            <template v-slot:image>
            <img :src="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo_khmer" style="width:100%; height: 100%;">
            </template>
            <template v-slot:preloader> 
            <v-lazy-image :src="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo_khmer" :src-placeholder="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo_khmer"/>
            </template>
            <template v-slot:error>Image load fails</template>
        </vue-load-image>
    </div> -->
<div class="mt-2"></div>

<div class="main-content" >
    <div class="container">
        <div class="grid-footer game-list" data-aos="zoom-in">

            <div v-for="(value, key, index) in Lottol" :key="index">
                <div v-if="value.photo" class="box-footer game-single-list box bounce-1" data-aos="zoom-in" style="border-radius: 5px;overflow: hidden;">
                  
                    <!-- <vue-load-image v-if="lang == 'kh'">
                        <template v-slot:image>
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo_khmer" style="width: 100%;height: 100%; ">
                        </template>
                        <template v-slot:preloader> 
                            <img src="/blank/lotto.png" alt="" style="width: 100%;height: 100%; ">
                        </template>
                        <template v-slot:error>Image load fails</template>
                    </vue-load-image> -->
                    <vue-load-image>
                        <template v-slot:image>
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; ">
                        </template>
                        <template v-slot:preloader> 
                            <img src="/blank/lotto.png" alt="" style="width: 100%;height: 100%; ">
                        </template>
                        <template v-slot:error>Image load fails</template>
                    </vue-load-image>
                    <div class="game-single-list-hover" >
                        <div class="game-single-list-name">{{ value.title }}</div>
                        <div class="game-single-list-button" v-if="lang == 'kh'">
                            <a class="play-real">{{kh.real_play}}</a>
                            <a class="play-real2">{{kh.real_fun}}</a>
                        </div>
                        <div class="game-single-list-button" v-else>
                            <a class="play-real"> {{en.real_play}}</a>
                            <a class="play-real2">{{en.real_fun}}</a>
                        </div>
                    </div>
                </div>
                <div v-else class="box-footer game-single-list box bounce-1" data-aos="zoom-in" style="border-radius: 5px;overflow: hidden;">
                    <div class="sila-video">
                        <video :src="'https://admin.kh.2m-sport.com/upload/'+value.video" title="2m-sport" type="video/mp4" autoplay="autoplay" loop="loop" muted="muted" playsinline="" class="cursor-pointer" __idm_id__="4227073" style="width:100%;height: 100%;"></video>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</div>
</template>


<style scoped>
.box-footer img {
    border-radius: 20px;
}
.box-footer {
    border-radius: 20px !important;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.center-top {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.center-bottom {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.game-list .game-single-list:hover .game-single-list-hover{
    display: unset;
}
.game-list .game-single-list .game-single-list-hover {
    display: none;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 101;
}
.game-list .game-single-list .game-single-list-hover .game-single-list-name {
    background: #2d0302;
    width: 100%;
    padding: 6px;
    color: #fff;
    text-align: center;
    margin-top: 8px;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.5);
}
.game-list .game-single-list .game-single-list-hover .game-single-list-button {
    width: 80%;
    margin: 0 auto;
}
.game-list .game-single-list .game-single-list-hover .game-single-list-button a {
    width: 100%;
    padding: 10px 20px;
    text-align: center;
    float: left;
    margin-bottom: 7px;
    text-decoration: none;
    color: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-shadow: 1px 1px #000;
}
.game-list .game-single-list .game-single-list-hover .game-single-list-button a.play-real {
    transition: 0.5s;
    background-size: 200% auto;
    border: 1px solid #6f4b98;
}
.game-list .game-single-list .game-single-list-hover .game-single-list-button a.play-real:hover {
    background-color: #6f4b98;
    border: 1px solid #6f4b98;
}
.game-list .game-single-list .game-single-list-hover .game-single-list-button a.play-real2:hover {
    background-color: #6f4b98 !important;
    border: 1px solid #6f4b98 !important;
}
.play-real2{
    background-color: #2f2151;
}
.game-list .game-single-list {
    box-shadow: 3px 3px 3px 0px #989898;
    margin-bottom: 30px;
    position: relative;
    cursor: pointer;
}

.grid-footer{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-bottom: 10px;
    width: 100%;
}
 @media (max-width: 1000px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}

@media (max-width: 1300px){
    .img_lobby {
        height: 250px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
} 
@media (max-width: 1200px){
    .img_lobby {
        height: 180px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
} 
@media (max-width: 800px){
    .img_lobby {
        height: 180px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 770px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 220px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 580px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 250px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 570px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 250px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 560px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 230px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 540px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 230px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 530px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 210px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 510px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 200px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 500px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 163px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 430px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 140px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 430px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
    .img_lobby {
        height: 120px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 410px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr  ;
    }
    .img_lobby {
        height: 430px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 400px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr  ;
    }
    .img_lobby {
        height: 430px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 390px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr  ;
    }
    .img_lobby {
        height: 380px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 380px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr  ;
    }
    .img_lobby {
        height: 350px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
@media (max-width: 360px){
    .grid-footer{
        grid-template-columns: 1fr 1fr 1fr 1fr  ;
    }
    .img_lobby {
        height: 350px !important;
    }
    .box-footer img{
        border-radius: 10px !important;
        transition: all 0.3s ease-out;
    }
    .box-footer{
        border-radius: 10px !important;
    }
}
.box-footer{
    color: white;
    text-align: center;
    padding: 1px;
    margin-right: 2.2px;
    box-shadow: 3px 3px 3px 0px #454545;
    position: relative;
    cursor: pointer;
}

.wrapper:hover a{
    background-color: #2f2151;
    border: none;
}
.btn-primaryy {
    background-color: #6f4b98;
    border: none;
}

/* .btn-primary {
    background-color: #6f4b98;
} */
.main-content {
    /* background: url(https://media.tenor.com/4kblKSTpwzMAAAAi/huatwithprime-chinese.gif); */
    padding-bottom: 10px;
    padding-top: 10px;
}
.grid-footer .box-footer{
  box-shadow: rgba(0, 0, 0, 0.50) 0px 10px 30px !important;
}
.box-footer img {
    border-radius: 20px;
    transition: all 0.3s ease-out;
}
.box-footer:hover img {
    transform: scale(1.10);
}
.box {
    animation-duration: 2s;
    animation-iteration-count: infinite;
    margin: 0 auto 0 auto;
    transform-origin: bottom;
}
.bounce-1 {
    animation-name: unset;
    animation-timing-function: linear;
}
@keyframes bounce-1 {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-10px); }
    100% { transform: translateY(0); }
}
.bounce-1:hover{
    animation-name: bounce-1 !important;
}
</style>
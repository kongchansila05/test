<script type="text/javascript">
import en from "../en.js";
import kh from "../kh.js";
const axios = require("axios");
import VueLoadImage from 'vue-load-image'
import '../assets/production.css'

// import VLazyImage from "v-lazy-image";
if (localStorage.lang) {
      localStorage.lang;
  }
  else{
    localStorage.lang ='kh';
  }
export default {
  mixins:[en,kh],
  name: 'KeNo',
  components: {
    VueLoadImage,
    // VLazyImage,
    },
  data() {
        return {
        lang: localStorage.lang,
        Keno:[],
        BennerKeno:[],
        }
    },
    mounted(){
        this.GetKeno();
        this.getBennerKeno();
    },
    methods: {
        //=====getBennerKeno=========
        getBennerKeno(){
            axios.get("https://admin.kh.2m-sport.com/api/bennerkeno").then((res)=>{
                this.BennerKeno = res.data.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====category=========
        GetKeno(){
        axios.get("https://admin.kh.2m-sport.com/api/keno").then((res)=>{
            this.Keno = res.data.data;
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
    <!-- <div v-for="(value, key, index) in BennerKeno" :key="index">
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
    <div class="container ">
        <div class="grid-footer game-list" data-aos="zoom-in">
            <div v-for="(value, key, index) in Keno" :key="index">
                <div v-if="value.photo" class="box-footer game-single-list box bounce-1" data-aos="zoom-in" style="border-radius: 5px;overflow: hidden;width: 90%;">
                    <vue-load-image >
                        <template v-slot:image>
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; ">
                        <div class="game-single-list-hover">
                            <div class="name-production">{{ value.title }}</div>
                            <div class="bottom-play realplay"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div v-if="lang == 'kh'">{{kh.real_play}}</div>
                                <div v-else data-bs-toggle="modal" data-bs-target="#exampleModal">{{en.real_play}}</div>
                            </div>
                        </div>
                        </template>
                        <template v-slot:preloader>
                            <img src="/blank/joker.png" alt="" style="width: 100%;height: 100%; ">
                        </template>
                        <template v-slot:error>Image load fails</template>
                    </vue-load-image>
                </div>
                <div v-if="value.video" class="box-footer game-single-list box bounce-1" data-aos="zoom-in" style="border-radius: 5px;overflow: hidden;">
                    <div class="sila-video">
                        <video :src="url.production+value.video" title="2m-sport" type="video/mp4" autoplay="autoplay" loop="loop" muted="muted" playsinline="" class="cursor-pointer" __idm_id__="4227073" style="width:100%;"></video>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>
</template>
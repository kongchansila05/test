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
  name: 'JoKer',
  components: {
    VueLoadImage,
    // VLazyImage,
    },
  data() {
    return {
        lang: localStorage.lang,
        Joker:[],
        BennerJoker:[],    
    }
  },
    mounted(){
        this.GetJoker();
        this.getBennerJoker();
    },
    methods: {
        //=====getBennerJoker=========
        getBennerJoker(){
            axios.get("https://admin.kh.2m-sport.com/api/bennerjoker").then((res)=>{
                this.BennerJoker = res.data.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====GetJoker=========
        GetJoker(){
        axios.get("https://admin.kh.2m-sport.com/api/joker").then((res)=>{
            this.Joker = res.data.data;
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
        <video src="/benner/joker.mp4" title="2m-sport" type="video/mp4" autoplay="autoplay" loop="loop" muted="muted" playsinline="" class="cursor-pointer" style="width:100%;"></video>
    </div>
    <!-- <div v-for="(value, key, index) in BennerJoker" :key="index">
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
                <!-- <div class="row" v-for="(value, key, index) in Joker" :key="index">
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; ">
                </div> -->
                <div v-for="(value, key, index) in Joker" :key="index">
                    <div v-if="value.photo" class="row game-single-list box bounce-1" data-aos="zoom-in" style="border-radius: 5px;overflow: hidden;width: 90%;box-shadow: none;">
                        <vue-load-image >
                            <template v-slot:image>
                            <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" style="width: 100%;height: 100%; ">
                            <div class="game-single-list-hover">
                                <div class="name-production text-center" style="color: white;">{{ value.title }}</div>
                                <div class="bottom-play realplay"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <div v-if="lang == 'kh'" style="color:white">{{kh.real_play}}</div>
                                    <div v-else data-bs-toggle="modal" data-bs-target="#exampleModal" style="color:white">{{en.real_play}}</div>
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
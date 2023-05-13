<script type="text/javascript">
import en from "../en.js";
import kh from "../kh.js";
const axios = require("axios");
import VueLoadImage from 'vue-load-image'
import VLazyImage from "v-lazy-image";
import '../assets/production.css'

if (localStorage.lang) {
      localStorage.lang;
  }
  else{
    localStorage.lang ='kh';
  }
export default {
  mixins:[en,kh],
  name: 'KunKhmer',
  components: {
    VueLoadImage,
    VLazyImage,
    },
  data() {
    return {
        lang: localStorage.lang,
        Kunkhmer:[],
        BennerKunkhmer:[],    
    }
  },
    mounted(){
        this.GetKunkhmer();
        this.getBennerKunkhmer();
    },
    methods: {
        //=====getBennerKunkhmer=========
        getBennerKunkhmer(){
            axios.get("https://admin.kh.2m-sport.com/api/bennerkunkhmer").then((res)=>{
                this.BennerKunkhmer = res.data.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====GetKunkhmer=========
        GetKunkhmer(){
        axios.get("https://admin.kh.2m-sport.com/api/kunkhmer").then((res)=>{
            this.Kunkhmer = res.data.data;
        }).catch(function (error) {
            console.error(error);
        });
        },
        //=====the-end=========
    }
}
</script>
<template>
    <div v-for="(value, key, index) in BennerKunkhmer" :key="index">
        <!-- <vue-load-image v-if="lang == 'en'">
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
        </vue-load-image> -->
        <vue-load-image >
            <template v-slot:image>
            <img :src="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo" style="width:100%; height: 100%;">
            </template>
            <template v-slot:preloader> 
            <v-lazy-image :src="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo" :src-placeholder="'https://admin.kh.2m-sport.com/upload/benner/'+value.photo"/>
            </template>
            <template v-slot:error>Image load fails</template>
        </vue-load-image>
    </div>
       <div class="mt-2"></div>
    <div class="main-content" >
        <div class="container ">
            <div class="grid-footer game-list" data-aos="zoom-in">
                <div v-for="(value, key, index) in Kunkhmer" :key="index">
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
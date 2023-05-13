<script type="text/javascript">
import en from "../en.js";
import kh from "../kh.js";
const axios = require("axios");
if (localStorage.lang) {
      localStorage.lang;
  }
  else{
    localStorage.lang ='kh';
  }
export default {
  mixins:[en,kh],
  name: 'FooTer',
  data() {
    return {
        lang: localStorage.lang,
        info:[],
        hotgames:[],
        poker:[],
        contact:[],
        sponsor:[],
        bank:[],
    }
  },
    mounted(){
        this.Getsponsor();
        this.Getbank();
        this.Getinfo();
        this.Gethotgames();
        this.Getpoker();
        this.Getcontact();
    },
    methods: {
        //=====Getinfo=========
        async Getinfo(){
            await axios.get("https://admin.kh.2m-sport.com/api/footer/1").then((res)=>{
                this.info = res.data.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====Gethotgames=========
        Gethotgames(){
            axios.get("https://admin.kh.2m-sport.com/api/footer/2").then((res)=>{
                this.hotgames = res.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====Getpoker=========
        Getpoker(){
            axios.get("https://admin.kh.2m-sport.com/api/footer/3").then((res)=>{
                this.poker = res.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====Getcontact=========
        Getcontact(){
            axios.get("https://admin.kh.2m-sport.com/api/footer/4").then((res)=>{
                this.contact = res.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====Getsponsor=========
        Getsponsor(){
            axios.get("https://admin.kh.2m-sport.com/api/footer/5").then((res)=>{
                this.sponsor = res.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
        //=====Getbank=========
        Getbank(){
            axios.get("https://admin.kh.2m-sport.com/api/footer/6").then((res)=>{
                this.bank = res.data;
            }).catch(function (error) {
                console.error(error);
            });
        },
        //=====the-end=========
    }
}
</script>
<template>
    <footer id="footer" class="footer border-x">
        <div class="footer__top">
            <div class="container">
                <div class="grid-4">

                    <div class="col-lg-10" style="padding-right: 10px;">
                        <div class="wrap-info" >
                            <div v-for="(value, key, index) in info" :key="index">
                                <div class="footer__logo">
                                <a href="/" class="nuxt-link-exact-active nuxt-link-active">
                                    <img src="http://player.kh88bet.net/static/kh88bet/images/logo.gif" style="width: 50%;padding-top: 10px;">
                                </a>
                                </div>
                                <div class="footer__about">
                                  
                                    <p v-if="lang == 'kh'" >{{value.title_khmer}}</p>
                                    <p v-else >{{value.title}}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="footer__information contact">
                            <div class="footer__information-title flex-box">
                                <span class="text-md flex text-white">
                                    <img style="filter: brightness() invert(1);" src="https://design.khmergaming.com/Desktop-88/images/icon-title.svg">
                                    <p v-if="lang == 'kh'">{{ hotgames.name_khmer }}</p>
                                    <p v-else>{{ hotgames.name }}</p>
                                </span>
                            </div>
                            <ul class="footer__information-menu" v-for="(value, key, index) in hotgames.data" :key="index">
                                <li v-if="lang == 'kh'" class="flex-box flex">
                                    <div class="icon">
                                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" alt="mobile">
                                    </div>
                                    <a :href="value.link" class="text"> {{value.title_khmer}}</a>
                                </li>
                                <li v-else class="flex-box flex">
                                    <div class="icon">
                                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" alt="mobile">
                                    </div>
                                    <a class="text" :href="value.link">{{value.title}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="footer__information">
                            <div class="footer__information-title flex-box">
                                <span class="text-md flex text-white">
                                    <img style="filter: brightness() invert(1);" src="https://design.khmergaming.com/Desktop-88/images/icon-title.svg">
                                  
                                    <p v-if="lang == 'kh'" class="text">{{ poker.name_khmer }}</p>
                                    <p v-else class="text">{{ poker.name }}</p>
                                </span>
                            </div>
                            <ul class="footer__information-menu" v-for="(value, key, index) in poker.data" :key="index">
                                <li v-if="lang == 'kh'" class="flex-box flex">
                                    <div class="icon">
                                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" alt="mobile">
                                    </div>
                                    <a :href="value.link" class="text">{{value.title_khmer}}</a>
                                </li>
                                <li v-else class="flex-box flex">
                                    <div class="icon">
                                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" alt="mobile">
                                    </div>
                                    <a :href="value.link" class="text">{{value.title}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="footer__information contact">
                            <div class="footer__information-title flex-box">
                                <span class="text-md flex text-white">
                                    <img style="filter: brightness() invert(1);" src="https://design.khmergaming.com/Desktop-88/images/icon-title.svg">
                                    <p v-if="lang == 'kh'">{{ contact.name_khmer }}</p>
                                    <p v-else>{{ contact.name }}</p>
                                </span>
                            </div>
                            <ul class="footer__information-menu" v-for="(value, key, index) in contact.data" :key="index">
                                <li class="flex-box flex">
                                    <div class="icon">
                                        <img style="filter: brightness() invert(1);" :src="'https://admin.kh.2m-sport.com/upload/'+value.photo" alt="mobile">
                                    </div>
                                    <a :href="'tel:'+value.title">
                                    <div class="text">{{ value.title }}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- <div class="grid-footer container footer__bank">

            <div class="item" v-for="(value, key, index) in bank" :key="index">
                <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo">
            </div>
            <div class="item" v-for="(value, key, index) in sponsor" :key="index">
                <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo">
            </div>   

        </div> -->
        <div class="grid-2 container footer__bank">
            <div>
                <div class="name_bank" v-if="lang == 'kh'" style="text-align: center;">{{ bank.name_khmer }}</div>
                <div class="name_bank" v-else style="text-align: center;">{{ bank.name }}</div>
                <div class="grid-footer-bank border_right">
                    <div class="item" v-for="(value, key, index) in bank.data" :key="index">
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo">
                    </div>
                </div>
            </div>

            <div>
                <div class="name_bank" v-if="lang == 'kh'" style="text-align: center;">{{ sponsor.name_khmer }}</div>
                <div class="name_bank" v-else style="text-align: center;">{{ sponsor.name }}</div>
                <div class="grid-footer">
                    <div class="item" v-for="(value, key, index) in sponsor.data" :key="index">
                        <img :src="'https://admin.kh.2m-sport.com/upload/'+value.photo">
                    </div>
                </div>
            </div>
        </div>

       <center>
        <div class="name_bank_footer" v-if="lang == 'kh'"> © 2023 KH88.រក្សាសិទ្ធគ្រប់យ៉ាង</div>
        <div class="name_bank_footer" v-else > © 2023 KH88.CopyRights</div>
       </center> 

    </footer>
</template>
<style scoped>

    .footer__information-menu li.flex-box{
        margin-bottom: 5px !important;
    }
    .footer__information-menu li .text{
        font-size: 12.5px !important;
    }
    .footer__about p{
        font-size: 13px;
    }
    .footer__information-menu:hover .flex-box .text{
        color: yellow !important;
    }
    .footer__information-menu:hover li a{
        color: yellow !important;
    }
    #footer{
        /* position: fixed; */
        bottom: 0;
    }
    .border_right{
        border-right: solid 2px #8673b8;
    }
    .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr ;
        grid-template-rows: auto;
    }
    .footer__information-menu li .text{
        font-size: 15px ;
    }
    .footer__information-menu li{
        font-size: 15px ;
    }
  .footer__bank .item img {
        max-width:100%;
        /* margin-left: 20%; */
        /* margin-right: 20%; */
    }
    .footer__bank:before {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 3px;
        content: "";
        background-image: url(https://design.khmergaming.com/Desktop-88/images/line-header.png);
        background: radial-gradient(50.43% 23.75% at 50.43% 0, #9888c2 0, hsla(0, 0%, 100%, 0) 100%), radial-gradient(100% 65% at 50.43% 0, #000000ba 0, rgba(255, 225, 150, 0) 100%), linear-gradient(180deg, #7b7883, #6a55a4e3 99.48%)
    }
    ol, ul {
        padding-left: unset;
    }
      .footer__information {
            float: right ;
    }
    @media (max-width: 1400px){
        .footer__information {
                float: right ;
        }
        .footer__information-menu li .text{
        font-size: 13px !important;
        }
        .footer__information-menu li{
            font-size: 13px !important ;
        }
        .footer__about{
            font-size: 10px !important;
            line-height: 14px !important;
            letter-spacing: 1px !important;
        }
        .nuxt-link-active img{
            width: 40% !important;
        }
    }
    @media (max-width: 1200px){
        .footer__information {
                float: right ;
        }
        .footer__information-menu li .text{
        font-size: 10.5px !important;
        }
        .footer__information-menu li{
            font-size: 10.5px !important ;
        }
    }
    @media (max-width: 1000px){
        .footer__information-menu li .text{
            font-size: 9px !important;
        }
        .footer__information-menu li{
            font-size: 7px !important ;
        }
        .grid-footer {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr !important;
            grid-template-rows: auto;
        }
        .grid-footer-bank {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr !important;
            grid-template-rows: auto;
        }
        .footer__about{
            font-size: 7.5px !important;
            line-height: 12px !important;
            letter-spacing: 1px !important;
        }
        .name_bank{
            font-size: 10px !important;
            padding: 3px;
        }
        .name_bank_footer{
            font-size: 9px !important;
            padding: 3px;
        }
        .footer__bank{
            position: relative;
            padding: 0px !important;
        }
    }
    @media (max-width: 900px){
        .grid-footer {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr !important;
            grid-template-rows: auto;
        }
        .grid-footer-bank {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr !important;
            grid-template-rows: auto;
        }
        .footer__about p{
            display: -webkit-box;
            -webkit-line-clamp: 4;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-size: 10px;
        }
        .name_bank{
            font-size: 10px !important;
            padding: 3px;
        }
        .footer__bank{
            position: relative;
            padding: 0px !important;
        }
        .footer__information {
            float: unset !important ;
        }
    }
    @media (max-width: 800px){
        .contact{
                padding-left: 50%;
        }
        .footer__logo a img{
            width: 25% !important;
            padding-top: 10px !important;
        }
        .footer__logo{
            padding-bottom: 0px;
        }
        .grid-footer {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr !important;
            grid-template-rows: auto;
        }

        .grid-footer-bank {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr  !important;
            grid-template-rows: auto;
        }
        .grid-4 {
            display: grid;
            grid-template-columns: 1fr 1fr !important ;
            grid-template-rows: auto;
        }

        .footer__information-menu li.flex-box{
            margin-bottom: 5px !important;
        }
        .footer__information-menu li .icon{
            width: 10px !important;
            height: 10px !important;
            display: flex;
            justify-content: center;
            margin-right: 12px;
        }
        .footer__bank {
            position: relative;
            padding: 0px !important;
        }
        .footer__information {
            padding-top: 3px !important;
        }
        .footer__about p{
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-size: 10px;
        }
        .footer__information-title{
            line-height: 12px;
            text-transform: uppercase;
            color: #dec9a1;
            margin-bottom: 5px !important;
            font-weight: 800;
        }
        .footer__information-menu li .text{
            font-size: 8px !important;
        }
        .footer__information-menu li{
            font-size: 10px !important ;
        }
        .footer__top{
            margin-bottom: 0px !important;
        }
        .footer__information-title span{
            font-size: 11px !important;
        }
        .name_bank{
            font-size: 10px !important;
            padding: 3px;
        }

    }

    @media (max-width: 700px){
        .footer__information-menu li.flex-box{
            margin-bottom: 5px !important;
        }
        .footer__information-menu li .icon{
            width: 10px !important;
            height: 10px !important;
            display: flex;
            justify-content: center;
            margin-right: 12px;
        }
        .footer__bank {
            position: relative;
            padding: 0px !important;
        }
        .footer__information {
            padding-top: 3px !important;
        }
        .footer__about p{
            display: -webkit-box;
            -webkit-line-clamp: 3;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-size: 10px;
        }
        .footer__information-title{
            line-height: 12px;
            text-transform: uppercase;
            color: #dec9a1;
            margin-bottom: 5px !important;
            font-weight: 800;
        }
        .footer__information-title span{
            font-size: 11px !important;
        }
        .footer__top{
            margin-bottom: 0px !important;
        }
        .footer__information-menu li{
            font-size: 10px !important;
        }
        .name_bank{
            font-size: 10px !important;
            padding: 3px;
        }
        .contact{
                padding-left: 40%;
        }
    }
    @media (max-width: 600px){
        .footer__information-menu li.flex-box{
            margin-bottom: 5px !important;
        }
        .footer__information-menu li .icon{
            width: 10px !important;
            display: flex;
            justify-content: center;
            margin-right: 12px;
        }
        .footer__bank {
            position: relative;
            padding: 0px !important;
        }
        .footer__information {
            padding-top: 3px !important;
        }
        .footer__about p{
            display: -webkit-box;
            -webkit-line-clamp: 3;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-size: 10px;
        }
        .footer__information-title{
            line-height: 12px;
            text-transform: uppercase;
            color: #dec9a1;
            margin-bottom: 5px !important;
            font-weight: 800;
        }
        .footer__information-title span{
            font-size: 9px !important;
        }
        .footer__top{
            margin-bottom: 0px !important;
        }
        .footer__information-menu li{
            font-size: 10px !important;
        }
        .name_bank{
            font-size: 10px !important;
            padding: 3px;
       }
        .contact{
                padding-left: 40%;
        }
    }
    @media (max-width: 500px){
        .footer__information-menu li.flex-box{
            margin-bottom: 5px !important;
        }
        .footer__information-menu li .icon{
            width: 10px !important;
            display: flex;
            height: 10px !important;
            justify-content: center;
            margin-right: 12px;
        }
        .footer__bank {
            position: relative;
            padding: 0px !important;
        }
        .footer__information {
            padding-top: 3px !important;
            line-height: 11px !important;
        }
        .footer__about p{
            line-height: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-size: 9px;
        }
        .footer__information-title{
            line-height: 18px;
            text-transform: uppercase;
            color: #dec9a1;
            margin-bottom: 5px !important;
            font-weight: 800;
        }
        .footer__information-title span{
            font-size: 9px !important;
        }
        .footer__top{
            margin-bottom: 0px !important;
        }
        .footer__information-menu li{
            font-size: 9.5px !important;
        }
        .name_bank{
            font-size: 9px !important;
            padding: 3px;
        }
        .name_bank_footer{
            font-size: 8px !important;
            padding: 3px;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr !important ;
            grid-template-rows: auto;
        }
        .footer__information {
            float: unset !important ;
        }
    }
    @media (max-width: 400px){
        .contact{
                padding-left: 30%;
        }
        .footer__information {
                float: unset !important ;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr !important ;
            grid-template-rows: auto;
        }
        .name_bank{
            font-size: 8px !important;
            padding: 3px;
        }
        .name_bank_footer{
            font-size: 7px !important;
            padding: 3px;
        }
        .footer__information-menu li.flex-box{
            margin-bottom: 5px !important;
        }
        .footer__logo a img{
            width: 30% !important;
            padding-top: 10px !important;
        }
        .footer__information-menu li .icon{
            width: 10px !important;
            height: 10px !important;
            display: flex;
            justify-content: center;
            margin-right: 12px;
        }
        .Copyright{
            font-size: 8px;
        }
        .footer__bank {
            position: relative;
            padding: 0px !important;
        }
        .footer__information {
            padding-top: 3px !important;
            line-height: 11px !important;
        }
        .footer__about p{
            line-height: 11px;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-size: 9px;
        }
        .footer__information-title{
            line-height: 18px;
            text-transform: uppercase;
            color: #dec9a1;
            margin-bottom: 5px !important;
            font-weight: 800;
        }
        .footer__information-title span{
            font-size: 9px !important;
        }
        .footer__top{
            margin-bottom: 0px !important;
        }
        .footer__information-menu li{
            font-size: 9px !important;
        }
    }
    .grid-4 {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr ;
        grid-template-rows: auto;
    }
    .grid-footer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr ;
        grid-template-rows: auto;
    }
    .grid-footer-bank {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr  ;
        grid-template-rows: auto;
    }
    .just-center {
        justify-content: center;
    }
    a:hover {
        text-decoration: none;
        transition: all .3s ease;
        color: #2f2151;
    }
    a {
        color: white !important;
        text-decoration: underline;
    }
    .footer__information-menu li.flex-box {
        margin-bottom: 2px !important;
    }
    .footer__information-menu li .icon {
        width: 20px;
        display: flex;
        justify-content: center;
        margin-right: 12px;
    }
    .footer {
        background-color: #6f4b98;
        color: white;
        width: 100%;
        bottom: 0;
        background: url(../assets/footer.JPEG);
    }
    .footer__information-title {
        line-height: 18px;
        text-transform: uppercase;
        color: #dec9a1;
        margin-bottom: 18px;
        font-weight: 800;
    }
    .footer__information {
        padding-top: 13px;
    }   
    .footer__information-title img {
        margin-right: 8px;
    }
    .footer__information-menu {
        padding-right: 10px;
    }
    .footer__about {
        font-size: 11px;
        line-height: 20px;
        letter-spacing: 1px;
    }
    .footer__top {
        margin-bottom: 5px;
    }
    .footer__logo {
        padding-bottom: 6px;
    }
    .footer__bank {
        position: relative;
        padding: 10px 0;
    }
    .footer__bank .item {
        padding-right: 5px;
        padding-left: 5px;
    }
  
    .footer .copyright-text {
        padding: 23px;
    }
    .text-center {
        text-align: center!important;
    }
</style>
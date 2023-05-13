<script>
import en from "../en.js";
import kh from "../kh.js";
import App from '../components/App.vue'
    if (localStorage.lang) {
        localStorage.lang;
    }
    else{
        localStorage.lang ='kh';
    }
    export default {
        mixins:[en,kh],
        name:'HeaDer',
        components: {
                App
        },
        data() {
            return {
            name: '',
            email: 'chansila2222@gmail.com',
            response: '',
            success: '',
            activeClass: 'active',
            lang: localStorage.lang,
            }
        },
        methods: {
            submitForm() {
                
            }
        }

    }
</script>
<template>
    <App/>
    <div style="background-color: #6f4b98;">
        <div class="container">
            <header class="px-0 v-toolbar v-toolbar--flat sila" style="padding-top:10px;padding-bottom:10px">
                <span class="sila">
                <router-link to="/" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/logo/home.svg">
                            <P v-if="lang == 'kh'">ទំព័រដើម</P>
                            <P v-if="lang == 'th'">หน้าแรก</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">trang chủ</P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">HOME</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/livescore" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item" >
                        <span class="v-btn__content">
                        <img class="img-header" src="/logo/football_black.png">
                            <P v-if="lang == 'kh'">កីឡា</P>
                            <P v-if="lang == 'th'">ข่าว</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">Tin tức</P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">SPORTS</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/casino" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                            <img class="img-header" src="/logo/4k.png">
                            <P v-if="lang == 'kh'">K99 កាស៊ីណូ</P>
                            <P v-if="lang == 'th'" >K99 คาสิโน</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">K99 sòng bạc </P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">K99 CASINO</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/livecasino" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/logo/casino_black.png">
                            <P v-if="lang == 'kh'">កាស៊ីណូបន្តផ្ទាល់</P>
                            <P v-if="lang == 'th'">คาสิโนสด</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">Casino trực tuyến</P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">LIVE CASINO</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/awc" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/logo/casino_black.png">
                            <P>AWC</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/lottol" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/logo/lotto.png" style="width: 30px;">
                            <P v-if="lang == 'kh'">ឡូតូ</P>
                            <P v-if="lang == 'th'">เกมพนันชนิดหนึ่ง</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">lô tô</P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">LOTTO</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/keno" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/logo/keno_black.png">
                            <P v-if="lang == 'kh'">គីណូ</P>
                            <P v-if="lang == 'th'">คีโน</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">KENO</P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">KENO</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/cockfight" class="nav-link-example v-btn  ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/logo/cock_fight_black.png">
                            <P v-if="lang == 'kh'">មាន់ជល់</P>
                            <P v-if="lang == 'th'">ไก่ชน</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">chọi gà</P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">COCK FIGHTING</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/kunkhmer" class="nav-link-example v-btn  ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/benner/boxer.png" style="width: 34px;">
                            <P v-if="lang == 'kh'">គុនខ្មែរ</P>
                            <P v-if="lang == 'th'" >KUN KHMER</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">KUN KHMER</P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">KUN KHMER</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/joker" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/header/slot.png" style="height: 40px;">
                            <P v-if="lang == 'kh'">ជូកឺ</P>
                            <P v-if="lang == 'th'">JOKER</P>
                            <P v-if="lang == 'vn'" style="font-size: 11px;">JOKER</P>
                            <P v-if="lang == 'en'" style="font-size: 12px;">JOKER</P>
                        </span>
                    </button>
                </router-link>
                <router-link to="/promotion" class="nav-link-example v-btn ">
                    <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                        <span class="v-btn__content">
                        <img class="img-header" src="/logo/bonus_black1.png">
                        <P v-if="lang == 'kh'">ប្រូម៉ូសិន</P>
                        <P v-if="lang == 'th'">การส่งเสริม</P>
                        <P v-if="lang == 'vn'" style="font-size: 11px;">khuyến mãi</P>
                        <P v-if="lang == 'en'" style="font-size: 12px;">promotion</P>
                        </span>
                    </button>
                </router-link>
                </span>
            </header>
        </div>
    </div>
</template>
<style scoped>
.v-btn__content{
    font-family: 'Roboto','Battambang' !important;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
}
.sila{
    overflow-x: auto;
    white-space: nowrap;
}
.sila::-webkit-scrollbar {
  display: none;
}
.v-btn__content{
    font-family: 'Roboto','Battambang' !important;
    font-size: 15px;
    font-weight: bold;
}
.bd-navbar {
    min-height: 4rem;
    background-color: #6f4b98;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 5%), inset 0 -1px 0 rgb(0 0 0 / 10%);
}
.m-hidden{
    margin: 0 5px 0 5px;
}
.nav-link-example button:hover{
        background-color: #2e2151;
    }
.nav-link-example button:hover span{
    color: #fff ;
}
.top_content{
  background: #704c97 !important;
}
a.router-link-exact-active {
    background-color: #2e2151 !important;
    color: #fff;
    border-radius: 5px;
}
button span img {
    width: 100%;
    height: 20px;
    width: 20px;
    filter: brightness(0) invert(1);
    margin-top: -3px;
}
    .inputWithIcon {
        position: relative;
    }
   .btn-primary {
        background-color:  #3b2a69;
        --bs-btn-focus-shadow-rgb: none;
        border: none ;
        color: white;
    }
    .nav-link-examp:hover {
        color: #fff;
        background-color: #6f4b98;
    }

    .inputWithIcon i {
        position: absolute;
        left: 0;
        top: 2px;
        font-size: 14px;
        padding: 9px 12px;
        color: #2e2151;
        transition: 0.3s;
    }
    .text_uper {
        text-transform: uppercase !important;
    }
    .form-group input, .form-group select {
        width: 210px;
        height: 34px;
        padding: 7px 26px;
        margin-right: 10px;
        font-size: 14px;
        font-family: "Catamaran", sans-serif;
        font-weight: 500;
        color: #000000;
        background-color: #fff;
        border-radius: 8px;
        width: 358px !important;
        font-family: Battambang, "Trebuchet MS", sans-serif, "Battambang";
        font-weight: bold;
    }
    button:focus {
        outline: none;
    }
</style>
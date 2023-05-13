<script>
// location.reload();
    import ProfileFB from '../components/ProfileFB.vue'
    import Navbar from '../components/Navbar.vue'
    import { useRoute } from 'vue-router';
    const axios = require("axios");
    import moment from 'moment'
    export default {
        components: {
            Navbar,
            ProfileFB
        },
        data() {
            return {
            livestream:[],
            id:{},
            time: '',
            }
        },
        mounted(){
            this.getsetup();
            this.getlivestream();
        },
        methods: {
            formatDate(dateString) {
             localStorage.CountDate = dateString;
            },
            FormDate(value) {
                if (value) {
                    return moment(String(value)).format('MMMM-DD-YYYY')
                }
            },
            getsetup(){
                const route = useRoute()
                this.id = route.params.id;
            },
            //=====livestream=========
            getlivestream(){
            axios.get("http://admin.sharesport.news/api/livestream/"+this.id).then((res)=>{
                this.livestream = res.data;
            }).catch(function (error) {
                console.error(error);
            });
            },
            //=====the-end=========

        }
    }
        var end = new Date(localStorage.CountDate);
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;
        
        function showRemaining() {
            var now = new Date();
            var distance = end - now;
                if (distance < 0) {
                    clearInterval(timer);
                    document.getElementById('countdown_d').innerHTML = '00' ;
                    document.getElementById('countdown_t').innerHTML = '00';
                    document.getElementById('countdown_m').innerHTML = '00';
                    document.getElementById('countdown_s').innerHTML = '00';
                    document.getElementById("showimage").setAttribute("class", "democlass"); 
                    document.getElementById("videolive").setAttribute("class", "videoliveclass"); 
                    return;
                }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);
            if(days === 0){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 1){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 2){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 3){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 4){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 5){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 6){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 7){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 8){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else if(days === 9){
                document.getElementById('countdown_d').innerHTML = '0'+days
            }
            else{
                document.getElementById('countdown_d').innerHTML = days
            }

            if(hours === 0){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 1){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 2){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 3){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 4){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 5){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 6){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 7){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 8){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else if(hours === 9){
                document.getElementById('countdown_t').innerHTML = '0'+hours
            }
            else{
                document.getElementById('countdown_t').innerHTML = hours
            }

            if(minutes === 0){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 1){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 2){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 3){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 4){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 5){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 6){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 7){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 8){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else if(minutes === 9){
                document.getElementById('countdown_m').innerHTML = '0'+minutes
            }
            else{
                document.getElementById('countdown_m').innerHTML = minutes
            }

            if(seconds === 0){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 1){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 2){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 3){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 4){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 5){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 6){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 7){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 8){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else if(seconds === 9){
                document.getElementById('countdown_s').innerHTML = '0'+seconds
            }
            else{
                document.getElementById('countdown_s').innerHTML = seconds
            }
        }
        timer = setInterval(showRemaining, 1000);
</script>

<template>
    <Navbar/>
    <div class="lg:px-0 md:px-0">
        <div class="max-w-6xl mx-auto">
            <div class="flex flex-col gap-x-2 gap-y-2 md:gap-x-5 md:gap-y-4 lg:gap-x-5 lg:gap-y-4 items-start justify-between lg:py-3 md:flex-row md:py-3 mx-auto">
                <div class="w-full md:w-7/12 lg:w-9/12" v-for="(value, key, index) in  livestream " :key="index">
                    <div class=" flex flex-col from-gray-100 gap-y-4 lg:gap-y-4 md:gap-y-4 rounded-md">
                        <div class="bg-transparent rounded px-2">
                            <div class="w-full mx-auto lg:px-0">
                                <div class="content text-gray-200 lg:leading-8 md:leading-8 lg:text-lg md:text-lg text-lg">
                                        <div id="videolive" style="position:relative;padding-bottom:56.25%;overflow:hidden;height:0;max-width:100%;display: none;">
                                            <iframe :id="value.live_id" :src="'https://iframe.dacast.com/live/'+value.server_id+'/'+value.live_id" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay;encrypted-media" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen style="position:absolute;top:0;left:0;"></iframe>
                                        </div>
                                        <div style="disdivlay: block;" id="showimage">
                                            <div class="container-img">
                                                <img v-bind:src="'http://admin.sharesport.news/upload/'+ value.photo" 
                                            alt="" width="1200" height="675" class="radis-sila">
                                            <div class="centered start">ការប្រកួតនឹងចាប់ផ្តើមនៅ</div>

                                            <div class="centered-d start">
                                                <span id="countdown_d">00</span>
                                            </div>
                                            <div class="centered-t start">
                                                <span id="countdown_t">00</span>
                                            </div>
                                            <div class="centered-m start">
                                                <span id="countdown_m">00</span>
                                            </div>
                                            <div class="centered-s start">
                                                <span id="countdown_s">00</span>
                                            </div>

                                            <div class="centered-d-bottom start-bottom">
                                                <span>Days</span>
                                            </div>
                                            <div class="centered-t-bottom start-bottom">
                                                <span>Hours</span>
                                            </div>
                                            <div class="centered-m-bottom start-bottom">
                                                <span>Minutes</span>
                                            </div>
                                            <div class="centered-s-bottom start-bottom">
                                                <span>Seconds</span>
                                            </div>

                                            </div>
                                        </div>

                                </div>
                            </div>
                            <div class="lg:px-0 md:flex-row mx-auto w-full">
                                <div class="items-start justify-start lg:px-0">
                                    <div class="flex items-center">
                                        <h2 class="capitalize font-medium lg:leading-10 lg:text-2xl md:leading-8 md:text-md md:pt-3 lg:pt-3 text-2xl leading-10 py-3">
                                            {{value.title}}
                                        </h2>
                                    </div> 
                                    <div class="flex items-center justify-between">
                                        <div class="group flex gap-x-5"><div>
                                                <p class="flex font-medium gap-x-1 items-center leading-none lg:text-base text-gray-600 text-sm">
                                                <span class="font-semibold md:font-medium">                   
                                                         {{FormDate(value.date)}}
                                                         {{formatDate(value.date)}}
                                                         <!-- <span id="countdown_t"></span>h
                                                         <span id="countdown_m"></span>min
                                                         <span id="countdown_s"></span>s -->
                                                </span>
                                                </p>
                                            </div> 
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                            
                    <iframe name="f6aedf7d4e55f8" width="1000px" height="100px" data-testid="fb:comments Facebook Social Plugin" title="fb:comments Facebook Social Plugin" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v7.0/plugins/comments.php?app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df3f6b569f15ad34%26domain%3Dkh88bet.net%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Fkh88bet.net%252Ff3acf98711934d8%26relation%3Dparent.parent&amp;container_width=810&amp;height=100&amp;href=http%3A%2F%2Fkh88bet.net%2Fnews%2Fsport-news%2Fbenzema&amp;locale=en_US&amp;numposts=5&amp;sdk=joey&amp;version=v7.0&amp;width=" style="border: none; visibility: visible; width: 100%; height: 263px;" class=""></iframe>

                </div>
                <div class="sidebar w-full md:w-6/12 lg:w-4/12">
                    <ProfileFB />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped> 
@media (max-width: 1700px){
    .start {
        font-size: 40px !important;
        background: #2f2151;
        padding: 25px;
        border-radius: 30px;
    }
}
@media (max-width: 1600px){
    .start {
        font-size: 40px !important;
        background: #2f2151;
        padding: 25px;
        border-radius: 30px;
    }
}
@media (max-width: 1500px){
    .start {
        font-size: 40px !important;
        background: #2f2151;
        padding: 25px;
        border-radius: 30px;
    }
}
@media (max-width: 1400px){
    .start {
        font-size: 35px !important;
        background: #2f2151;
        padding: 25px;
        border-radius: 30px;
    }
}
@media (max-width: 1300px){
    .start {
        font-size: 30px !important;
        background: #2f2151;
        padding: 25px;
        border-radius: 30px;
    }
}
@media (max-width: 1200px){
    .start {
        font-size: 30px !important;
        background: #2f2151;
        padding: 20px !important;
        border-radius: 30px;
    }
}
@media (max-width: 1200px){
    .start {
        font-size: 30px !important;
        background: #2f2151;
        padding: 15px !important;
        border-radius: 30px;
    }
}
@media (max-width: 1100px){
    .start {
        font-size: 12px !important;
        background: #2f2151;
        /* padding: 10px !important; */
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        border-radius: 15px !important;
    }
    .start-bottom {
        font-size: 12px !important;
    }
}
@media (max-width: 900px){
    .start {
        font-size: 9px !important;
        background: #2f2151;
        /* padding: 10px !important; */
        padding-top: 3px !important;
        padding-bottom: 3px !important;
        border-radius: 15px !important;
    }
    .start-bottom {
        font-size: 9px !important;
        padding-top: 10px !important;
    }
}

@media (max-width: 770px){
    .start {
        font-size: 15px !important;
        background: #2f2151;
        padding-top: 10px !important;
        padding-bottom: 10px !important;
        border-radius: 15px !important;
    }
    .start-bottom {
        font-size: 15px !important;
        padding-top: 10px !important;
    }
}
@media (max-width: 500px){
    .start {
        font-size: 10px !important;
        background: #2f2151;
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        border-radius: 15px !important;
    }
    .start-bottom {
        font-size: 10px !important;
        padding-top: 10px !important;
    }
}
@media (max-width: 400px){
    .start {
        font-size: 10px !important;
        background: #2f2151;
        padding-top: 1px !important;
        padding-bottom: 1px !important;
        border-radius: 15px !important;
    }
    .start-bottom {
        font-size: 10px !important;
        padding-top: 10px !important;
    }
}
.container-img {
  position: relative;
  text-align: center;
  color: white;
  background: black;
}
.container-img img{
    opacity: 60%;
}
.start{
    font-size: 50px;
    background: #2f2151;
    padding: 25px;
    border-radius: 30px;
}
.start-bottom{
    font-size: 20px;
}
.centered {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.centered-d {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
}
.centered-t {
  position: absolute;
  top: 50%;
  left: 43%;
  transform: translate(-50%, -50%);
}
.centered-m {
  position: absolute;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
}
.centered-s {
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
}

.centered-d-bottom {
  position: absolute;
  top: 60%;
  left: 30%;
  transform: translate(-50%, -50%);
}
.centered-t-bottom {
  position: absolute;
  top: 60%;
  left: 43%;
  transform: translate(-50%, -50%);
}
.centered-m-bottom {
  position: absolute;
  top: 60%;
  left: 57%;
  transform: translate(-50%, -50%);
}
.centered-s-bottom {
  position: absolute;
  top: 60%;
  left: 70%;
  transform: translate(-50%, -50%);
} 
.democlass {
    display: none !important;
}
.videoliveclass{
    display: block !important;
}
.max-w-6xl {
    max-width: 90% !important;
}
</style>
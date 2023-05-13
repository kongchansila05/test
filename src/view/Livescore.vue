<script > 
const axios = require("axios");
import {ref } from "vue";
import en from "../en.js";
import kh from "../kh.js";
import { useRoute } from 'vue-router';
// import $ from 'jquery'
// import moment from 'moment';
import ProfileFB from '../components/ProfileFB.vue'
import Preloader from '../components/Preloader.vue'
import Navbar from '../components/Navbar.vue'

import router from "../router";
const twoDaysAgo = new Date().getTime() - 48 * 60 * 60 * 1000;
const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000;
const today = new Date();
const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
const twoDaysTime = new Date().getTime() + 48 * 60 * 60 * 1000;
const dates = [twoDaysAgo, yesterday, today, tomorrow, twoDaysTime];
const activeDateIndex = ref(2);
const current = new Date();
const showCalendar = ref(false);
  export default {
    mixins:[en,kh],
    name: 'MoVie',
    components: {
      Navbar,
      ProfileFB,
      Preloader
    },
    data() {
      return {
        products :[],
        leagues :[],
        LiveScore:[],
        logo:'https://lsm-static-prod.livescore.com/medium/',
        notlogo:'https://www.livescore.com/ls-web-assets/svgs/common/badge-default-201a546527a7779845697b44be2a618a.svg',
        dates:dates,
        activeDateIndex:activeDateIndex,
        year:`${current.getFullYear()}`,
        month:`${current.getMonth()+1}`,
        day:'',
        showCalendar:showCalendar,
        today:today,
        LiveScoreNow:[],
        LiveScoreWhere:[],
        LiveScoreMethod: false,
        lang: localStorage.lang,
        iflang:'',
        seeall:false,
        LiveScorestatus:false,
        search: '',
        people: [],
      }
     
    },
    mounted(){
      this.getsetup();
      this.getLiveScore();
      this.getleagues();
      this.getLiveScoreNow();
    } ,
    created() {
      this.getAllStarWarsleagues();
    },
    //=====mounted=========
    methods: {
      getAllStarWarsleagues() {
        fetch("/static/api/league.json")
          .then(response => response.json())
          .then(res => {
            if (this.search) {
              this.leagues = res.Ccg.filter(leagues =>
                leagues.Ccd.toLowerCase().includes(this.search.toLowerCase())
              );
            } else {
              this.leagues = res.Ccg;
            }
          });
      },
      getsetup(){
          const route = useRoute()
          this.iflang = route.name;
      },
      goToGame (id){
        router.push(`/games/${id}`);
      },
      formatDate(date) {
        const newDate = new Intl.DateTimeFormat("en-ng", {
          day: "2-digit",
          weekday: "short",
          month: "short",
        }).format(new Date(date));

        return newDate;
      },
      getFormattedDate(dateString) {
            const onlyNumbers = dateString.toString(); 
            const year = onlyNumbers.slice(0,4) 
            const month = onlyNumbers.slice(4,6)
            const day = onlyNumbers.slice(6,8)
            const time = onlyNumbers.slice(8,10)
            const min = onlyNumbers.slice(10,12)
            const sc = onlyNumbers.slice(12,14)
            const current = new Date(year, month - 1, day ,time,min,sc);
            const lastdate = `${current.getHours() }:00`;
            return  lastdate
      },
      //=====highlight=========
      getLiveScore(){
        this.LiveScorestatus = false ;
        const CurrentDate = `${current.getFullYear()}${current.getMonth()+1}${current.getDate()}`;
        const url ='https://livescore6.p.rapidapi.com/matches/v2/list-by-date';
        const LiveScore = {
            params: {Category: 'soccer', Date: CurrentDate, Timezone: '7'},
            headers: {
              'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
              'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
            }
          }
        axios.get(url, LiveScore).then((res)=>{
          this.LiveScore = res.data.Stages;
          this.LiveScorestatus = true ;

        }).catch(function (error) {
            console.error(error);
        });
      },
      //=====the-end=========
      getLiveScoreMethod(data){
        this.LiveScoreWhere = '';
        this.LiveScoreNow = '';
        this.LiveScore = '';
        this.LiveScoreMethod = true ; 
        this.day = data;
        this.getLiveScoreWhere();
      },
      getLiveScoreLiveNow(){
        this.LiveScoreWhere = '';
        this.LiveScoreNow = '';
        this.LiveScore = '';
        this.LiveScoreMethod = 'now' ;
        this.getLiveScoreNow();
      },  
      showseeall(){
        this.seeall = true ;
      },
      less(){
          this.seeall = false;
        },
      showgameplay(id){
        localStorage.gameplay = id;
      },
      //=====getLiveNow=========
      getLiveScoreNow(){
        this.LiveScorestatus = false ;
        const url ='https://livescore6.p.rapidapi.com/matches/v2/list-live';
        const LiveScoreNow = {
            params: {Category: 'soccer',Timezone: '7'},
            headers: {
              'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
              'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
            }
          }
        axios.get(url, LiveScoreNow).then((res)=>{
          this.LiveScoreNow = res.data.Stages;
          this.LiveScorestatus = true ;
        }).catch(function (error) {
            console.error(error);
        });
      },
      //=====the-end=========
      //=====getLiveScore=========
        getLiveScoreWhere(){
          this.LiveScorestatus = false ;
          const onlyDay = this.day.toString(); 
          const dayWhere = onlyDay.slice(0,2) 
          if(current.getMonth() == '0'){
            const mothly = current.getMonth()+ 1;
            // const currentMonth = new Date().getMonth() + 1;
            const CurrentWhere = `${current.getFullYear()}${'0'+mothly}`+dayWhere;
            const url ='https://livescore6.p.rapidapi.com/matches/v2/list-by-date';
            const LiveScoreWhere = {
                  params: {Category: 'soccer', Date: CurrentWhere, Timezone: '7'},
                  headers: {
                    'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
                    'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
                  }
                }
            axios.get(url, LiveScoreWhere).then((res)=>{
              this.LiveScoreWhere = res.data.Stages;
              this.LiveScorestatus = true ;
            }).catch(function (error) {
                console.error(error);
            });
          }
          else{
          
            const CurrentWhere = `${current.getFullYear()}${current.getMonth()+1}`+dayWhere;
            const url ='https://livescore6.p.rapidapi.com/matches/v2/list-by-date';
            const LiveScoreWhere = {
                params: {Category: 'soccer', Date: CurrentWhere, Timezone: '7'},
                headers: {
                  'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
                  'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
                }
              }
            axios.get(url, LiveScoreWhere).then((res)=>{
              this.LiveScoreWhere = res.data.Stages;
            }).catch(function (error) {
                console.error(error);
            });
          }

        },
      //=====the-end=========
    //=====getleagues=========
      getleagues(){
          axios.get('./static/api/league.json').then((res)=>{
              this.leagues = res.data.Ccg;
          }).catch(function (error) {
              console.error(error);
          });
        }
      //=====the-end=========
    },

  };

</script>

<template id="body">
  <Navbar/>
  <div class="container min-top-sila">
    <div class="flex flex-col  md:flex-row lg:flex-row justify-between lg:gap-x-2 md:gap-x-2">
      <div class="lg:w-3/12 md:w-3/12 lg:flex md:hidden hidden"> 
          <div  class="relative flex flex-col">
            <div class="flex justify-between text-sm lg:pb-3 md:pb-3 pb-2 border-b" >
              <div class="gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600" >
                <div class="bg-gradient-to-r px-7 from-blue-900 to-blue-300 flex items-center gap-x-2 px-2" >
                  <span>
                    <i class="fas fa-futbol white fa-spin"></i>
                  </span> 

                  <span v-if="lang == 'kh'" class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" >
                    {{kh.league_list}}
                  </span>
                  <span v-else class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" >
                    {{en.league_list}}
                  </span>
                </div></div><!----></div>
               
                  <div class="U" id="content-left">
            <div class="ic" id="content-left">
              <div id="searchBarWrapper" class="Hh">
                <span class="stl"><img alt="" src="/icon/search.svg" decoding="async" data-nimg="fixed" class="stl2"></span>
                <input
          type="text"
          v-model.trim="search"
          placeholder="Search people..."
          @keyup="getAllStarWarsleagues"
        />
              
              </div>
              <div class="jc"></div>
              <div id="exploreMenuList" class="Zh">
                <ul class="ai" v-for="(value, key, index) in leagues.slice(0,30)" :key="index">
                  <li class="bi">
                    <a class="ci" data-iscategory="true" data-active="false" data-id="england" 
                      id="menu-link-England" v-bind:href="'/league/'+value.Cid">
                      <div class="hi" style="margin-left: 10px;">
                        <img loading="lazy" v-bind:src="'https://static.livescore.com/i2/fh/'+ value.Ccd+'.jpg'">
                      </div>
                      <span class="menuItemName">{{value.Cnm}}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div id="exploreMenuList" class="Zh" v-if="seeall == true">
                <ul class="ai" v-for="(value, key, index) in leagues.slice(30)" :key="index">
                  <li class="bi">
                    <a class="ci" data-iscategory="true" data-active="false" data-id="england" 
                      id="menu-link-England" v-bind:href="'/league/'+value.Cid">
                      <div class="hi" style="margin-left: 10px;">
                        <img loading="lazy" v-bind:src="'https://static.livescore.com/i2/fh/'+ value.Ccd+'.jpg'">
                      </div>
                      <span class="menuItemName">{{value.Cnm}}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="jc isBottomDivider"></div>
              <div class="kc">
                <a @click="showseeall" v-if="seeall == false">
                <span  v-if="lang == 'kh'">
                  {{kh.more_league}}
                </span>
                <span  v-else>
                  {{en.more_league}}
                </span>
                </a>
                <a @click="less" v-else>
                  <span  v-if="lang == 'kh'">
                    {{kh.less_league}}
                  </span>
                  <span  v-else>
                    {{en.less_league}}
                  </span>
                </a>
              </div>
            </div>
          </div>
          </div>
      </div>
      <div class="lg:w-5/12 md:w-7/12 w-full min-top-sila">
            <div class="px-2.5 flex justify-between items-center">
            <button @click="getLiveScoreLiveNow">
                <p class="font-bold w-10 py-[2px] flex justify-center text-n-black text-11px uppercase rounded" style="background-color: red; color: white;">
                Live
              </p>
            </button>
        <div
          v-for="(date, idx) in dates"
          :key="idx"
          class="cursor-pointer bydeveloper"
          @click="activeDateIndex = idx"
        
          style="padding: 10px;border-radius: 5px;"
          >
          <div @click="getLiveScoreMethod(formatDate(date).slice(5,8))" class="kongchansila">
            <p
              class=" font-bold flex justify-center text-11px uppercase"
              :class="idx === activeDateIndex ? 'text-n-orange' : ''"
            >
              {{ date === today ? "TODAY" : formatDate(date).slice(0, 3) }}
            </p>
            <p
              class="font-bold text-9px uppercase"
              :class="idx === activeDateIndex ? 'text-n-orange' : ''"
            >
              {{ formatDate(date).slice(4) }}
            </p>
          </div>
        </div>

        <!-- <div
          @mouseover="showCalendar = true"
          @mouseout="showCalendar = false"
          class="relative cursor-pointer"
        >
          <i class="fa fa-calendar"></i>
          <div class="absolute right-1">
            <input type="date"  class="bg-transparent">
          </div>
        </div> -->
      </div>
        <!-- -----------"Live Now"--------- -->
        <div data-aos="zoom-in" data-aos-duration="1000" v-if="LiveScoreMethod == 'now'">
          <div  class="px-2">
            <div class="group">
              <div v-for="(item) in LiveScoreNow" :key="item">
                <div class="flex md:mb-1 lg:mb-1 md:mt-2 lg:mt-2 w-full">
                  <div class="relative flex items-center gap-x-2">

                    <div id="10872__category-header" class="Ec Fc">
                      <a v-bind:href="'/country/league/'+item.CompId" class="Hc bi" id="10872__category-header__link">
                        <div class="Ic">
                          <div class="ei">
                            <img loading="lazy" v-bind:src="'https://static.livescore.com/i2/fh/'+ item.Ccd+'.jpg'">
                          </div>
                        </div>
                        <div class="Jc">
                          <div class="Kc" id="category-header__stage">
                            {{item.Snm}}
                          </div>
                          <div class="Mc" id="category-header__category">
                            {{item.Cnm}}
                          </div>
                        </div>
                      </a>
                    </div>

                  </div>
                </div>
              <div v-for="(team) in item.Events" :key="team" data-aos="zoom-in"
      data-aos-duration="800" >
                <div class="rounded" @click="showgameplay(team.Eid)">
                  <div xyz="fade back-1 small-60% ease-out stagger-2 perspective-2" 
                      class="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-y-2 gap-x-3 pt-1">
                    <div class="bg-fan-primary cursor-pointer py-2 pl-1 
                      ease-in-out flex items-center rounded-md shadow gap-x-2 px-2" 
                      style="--xyz-index:0; --xyz-index-rev:1;">
                      <div class="duration text-center flex flex-col w-10">
                        <span class="text-white font-light text-xs"> 
                        <span v-if="team.Eps == 'FT'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'AP'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'Postp.'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'AET'">
                          {{team.Eps}}
                        </span>
                        <span v-else>
                          {{team.Eps}}
                        </span>
                        </span>
                      </div>
                      <div class="flex team w-full">
                        <a @click="goToGame(team.Eid)" class="w-full">
                          <div class="relative">
                            <div class="flex flex-col">
                                <div class="flex group justify-between w-full" v-for="(tm) in team.T1" :key="tm">
                                  <div class="flex gap-x-2 items-center">
                                    <div v-bind:aria-label="0" role="img" class="v-image v-responsive grey 
                                    lighten-2 theme--light" style="max-height: 15px; max-width: 15px;">
                                      <div class="v-responsive__sizer" style="padding-bottom: 100%;">
                                      </div>

                                      <div v-if="tm.Img == null" class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+notlogo+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div v-else class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+logo+ tm.Img+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div class="v-responsive__content" style="width: 80px;"></div>
                                    </div>
                                    <div>
                                      <span class="text-xs text-white">{{ tm.Nm }}</span>
                                    </div>
                                  </div> 
                                  <div class="score">
                                    <span class="text-white font-normal">{{team.Tr1}}</span>
                                  </div>
                                </div> 
                                <div class="flex group justify-between w-full" v-for="(tm) in team.T2" :key="tm">
                                  <div class="flex gap-x-2 items-center">
                                    <div v-bind:aria-label="0" role="img" 
                                          class="v-image v-responsive grey lighten-2 theme--light" 
                                          style="max-height: 15px; max-width: 15px;">
                                      <div class="v-responsive__sizer" style="padding-bottom: 100%;"></div>

                                      <div v-if="tm.Img == null" class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+notlogo+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div v-else class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+logo+ tm.Img+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div class="v-responsive__content" style="width: 81px;"></div>
                                    </div> 

                                    <div>
                                      <span class="text-xs text-white">
                                        {{ tm.Nm }}
                                      </span>
                                    </div>
                                  </div> 
                                  <div class="score">
                                    <span class="text-white font-normal">
                                      {{team.Tr2}}
                                    </span>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
        </div>
        <!-- ----------"Live Now end"---------- -->
        <!-- -----------"LiveScoreWhere"--------- -->
        <div data-aos="zoom-in" data-aos-duration="1000" v-if="LiveScoreMethod == true">
          <div  class="px-2">
            <div class="group">
              <div v-for="(item) in LiveScoreWhere" :key="item" >
                <div class="flex md:mb-1 lg:mb-1 md:mt-2 lg:mt-2 w-full">
                  <div class="relative flex items-center gap-x-2">

                    <div id="10872__category-header" class="Ec Fc">
                      <a v-bind:href="'/country/league/'+item.CompId" class="Hc bi" id="10872__category-header__link">
                        <div class="Ic">
                          <div class="ei">
                            <img loading="lazy" v-bind:src="'https://static.livescore.com/i2/fh/'+ item.Ccd+'.jpg'">
                          </div>
                        </div>
                        <div class="Jc">
                          <div class="Kc" id="category-header__stage">
                            {{item.Snm}}
                          </div>
                          <div class="Mc" id="category-header__category">
                            {{item.Cnm}}
                          </div>
                        </div>
                      </a>
                    </div>

                  </div>
                </div>
              <div v-for="(team) in item.Events" :key="team" data-aos="zoom-in"
      data-aos-duration="800">
                <div class="rounded" @click="showgameplay(team.Eid)">
                  <div xyz="fade back-1 small-60% ease-out stagger-2 perspective-2" 
                      class="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-y-2 gap-x-3 pt-1">
                    <div class="bg-fan-primary cursor-pointer py-2 pl-1 
                      ease-in-out flex items-center rounded-md shadow gap-x-2 px-2" 
                      style="--xyz-index:0; --xyz-index-rev:1;">
                      <div class="duration text-center flex flex-col w-10">
                        <span class="text-white font-light text-xs"> 
                        <span v-if="team.Eps == 'FT'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'AP'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'Postp.'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'AET'">
                          {{team.Eps}}
                        </span>
                        <span v-else>
                          {{getFormattedDate(team.Esd)}}
                        </span>
                        </span>
                      </div>
                      <div class="flex team w-full">
                        <a @click="goToGame(team.Eid)" class="w-full">
                          <div class="relative">
                            <div class="flex flex-col">
                                <div class="flex group justify-between w-full" v-for="(tm) in team.T1" :key="tm">
                                  <div class="flex gap-x-2 items-center">
                                    <div v-bind:aria-label="0" role="img" class="v-image v-responsive grey 
                                    lighten-2 theme--light" style="max-height: 15px; max-width: 15px;">
                                      <div class="v-responsive__sizer" style="padding-bottom: 100%;">
                                      </div>

                                      <div v-if="tm.Img == null" class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+notlogo+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div v-else class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+logo+ tm.Img+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div class="v-responsive__content" style="width: 80px;"></div>
                                    </div>
                                    <div>
                                      <span class="text-xs text-white">{{ tm.Nm }}</span>
                                    </div>
                                  </div> 
                                  <div class="score">
                                    <span class="text-white font-normal">{{team.Tr1}}</span>
                                  </div>
                                </div> 
                                <div class="flex group justify-between w-full" v-for="(tm) in team.T2" :key="tm">
                                  <div class="flex gap-x-2 items-center">
                                    <div v-bind:aria-label="0" role="img" 
                                          class="v-image v-responsive grey lighten-2 theme--light" 
                                          style="max-height: 15px; max-width: 15px;">
                                      <div class="v-responsive__sizer" style="padding-bottom: 100%;"></div>

                                      <div v-if="tm.Img == null" class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+notlogo+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div v-else class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+logo+ tm.Img+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div class="v-responsive__content" style="width: 81px;"></div>
                                    </div> 

                                    <div>
                                      <span class="text-xs text-white">
                                        {{ tm.Nm }}
                                      </span>
                                    </div>
                                  </div> 
                                  <div class="score">
                                    <span class="text-white font-normal">
                                      {{team.Tr2}}
                                    </span>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
        </div>
        <!-- ----------"LiveScoreWhere end"---------- -->

        <!-- -----------"LiveScore"--------- -->
        <div data-aos="zoom-in" data-aos-duration="1000" v-if="LiveScoreMethod == false">
          <div  class="px-2">
            <div class="group">
              <div v-for="(item) in LiveScore" :key="item">
                <div class="flex md:mb-1 lg:mb-1 md:mt-2 lg:mt-2 w-full">
                  <div class="relative flex items-center gap-x-2">

                    <div id="10872__category-header" class="Ec Fc">
                      <a v-bind:href="'/country/league/'+item.CompId" class="Hc bi" id="10872__category-header__link">
                        <div class="Ic">
                          <div class="ei">
                            <img loading="lazy" v-bind:src="'https://static.livescore.com/i2/fh/'+ item.Ccd+'.jpg'">
                          </div>
                        </div>
                        <div class="Jc">
                          <div class="Kc" id="category-header__stage">
                            {{item.Snm}}
                          </div>
                          <div class="Mc" id="category-header__category">
                            {{item.Cnm}}
                          </div>
                        </div>
                      </a>
                    </div>

                  </div>
                </div>
              <div v-for="(team) in item.Events" :key="team" data-aos="zoom-in"
      data-aos-duration="800" >
                <div class="rounded" @click="showgameplay(team.Eid)">
                  <div xyz="fade back-1 small-60% ease-out stagger-2 perspective-2" 
                      class="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-y-2 gap-x-3 pt-1">
                    <div class="bg-fan-primary cursor-pointer py-2 pl-1 
                      ease-in-out flex items-center rounded-md shadow gap-x-2 px-2" 
                      style="--xyz-index:0; --xyz-index-rev:1;">
                      <div class="duration text-center flex flex-col w-10">
                        <span class="text-white font-light text-xs"> 
                        <span v-if="team.Eps == 'FT'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'AP'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'Postp.'">
                          {{team.Eps}}
                        </span>
                        <span v-else-if="team.Eps == 'AET'">
                          {{team.Eps}}
                        </span>
                        <span v-else>
                          {{team.Eps}}
                        </span>
                        </span>
                      </div>
                      <div class="flex team w-full">
                        <a @click="goToGame(team.Eid)" class="w-full">
                          <div class="relative">
                            <div class="flex flex-col">
                                <div class="flex group justify-between w-full" v-for="(tm) in team.T1" :key="tm">
                                  <div class="flex gap-x-2 items-center">
                                    <div v-bind:aria-label="0" role="img" class="v-image v-responsive grey 
                                    lighten-2 theme--light" style="max-height: 15px; max-width: 15px;">
                                      <div class="v-responsive__sizer" style="padding-bottom: 100%;">
                                      </div>

                                      <div v-if="tm.Img == null" class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+notlogo+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div v-else class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+logo+ tm.Img+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div class="v-responsive__content" style="width: 80px;"></div>
                                    </div>
                                    <div>
                                      <span class="text-xs text-white">{{ tm.Nm }}</span>
                                    </div>
                                  </div> 
                                  <div class="score">
                                    <span class="text-white font-normal">{{team.Tr1}}</span>
                                  </div>
                                </div> 
                                <div class="flex group justify-between w-full" v-for="(tm) in team.T2" :key="tm">
                                  <div class="flex gap-x-2 items-center">
                                    <div v-bind:aria-label="0" role="img" 
                                          class="v-image v-responsive grey lighten-2 theme--light" 
                                          style="max-height: 15px; max-width: 15px;">
                                      <div class="v-responsive__sizer" style="padding-bottom: 100%;"></div>

                                      <div v-if="tm.Img == null" class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+notlogo+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div v-else class="v-image__image v-image__image--cover"
                                      v-bind:style="{ backgroundImage: 'url('+logo+ tm.Img+ ')' }" 
                                      style="background-position: center center;">
                                      </div>

                                      <div class="v-responsive__content" style="width: 81px;"></div>
                                    </div> 

                                    <div>
                                      <span class="text-xs text-white">
                                        {{ tm.Nm }}
                                      </span>
                                    </div>
                                  </div> 
                                  <div class="score">
                                    <span class="text-white font-normal">
                                      {{team.Tr2}}
                                    </span>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
        </div>
        <!-- ----------"LiveScore end"---------- -->
        <div v-if="LiveScorestatus == false">
          <Preloader color="#2f2151" scale="0.6" />
          <h1>{{ msg }}</h1>
        </div>
      </div>
      <div class="lg:w-4/12 md:w-6/12 lg:flex md:flex flex-col">
        <ProfileFB />
      </div>
    </div>
  </div>
</template>
<style scoped>
.min-top-sila{
  padding-top: 10px;
}
@media (max-width: 769px) {
  .min-top-sila{
   padding-top: 10px;
  }
}
.ai .bi:hover{
  background: #2f2151;
  border-radius: 5px;
}
.bi a:hover span{
    color: white;
  }
.bydeveloper:hover{
  background-color: #504077ab;
  border-radius: 5px;
}
.rounded .bg-fan-primary:hover{
   background-color: #504077ab;
}
  input:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
.bg-fan-primary{
  background-color: #2f2151;
}
.max-w-6xl {
    max-width: 90% !important;
}
.text-n-orange{
  color: #6f4b98;
}
.text-n-black {
    --tw-text-opacity: 1;
    color: rgb(11 11 11 / var(--tw-text-opacity));
}

.uppercase {
    text-transform: uppercase;
}
.text-9px {
    font-size: 9px;
}
.font-bold {
    font-weight: 700;
}
.text-11px {
    font-size: 0.688rem;
}
.py-\[2px\] {
    padding-top: 2px;
    padding-bottom: 2px;
}
p {
    margin-top: 0;
    margin-bottom: 0;
}
.bg-n-white {
    --tw-bg-opacity: 1;
    background-color: #2f2151;
    color: white;
}
.px-2\.5 {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
}
.bgnew{
  background: rgba(47, 33, 81, 0.35) !important;
}
.Ec>a {
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
}

.Hc {
    min-width: 0;
}
.Ic {
    display: flex;
    margin-right: 13px;
    position: relative;
}
.ei {
    display: flex;
    align-items: center;
    width: 20px;
    min-width: 20px;
    height: 100%;
}
.Ic img {
    border-radius: 2px;
}
.ei img {
    width: 100%;
    min-height: 12px;
    text-indent: -10000px;
    background-size: 20px 12px;
    background-repeat: no-repeat;
    background-position: 50%;
}
.Jc, .Kc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.Kc {
    color: #2f2151;
    font-weight: 700;
    margin-bottom: 2px;
}
.Mc {
    font-size: 11px;
    color: #38275b;
}

.Jc, .Kc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.Jc {
    flex: 1 1;
    width: auto;
}
.bi {
    text-decoration: none;
    display: inherit;
    align-items: inherit;
}
.Ec, .Ec>a {
    display: flex;
}
.Ec {
    font-size: 14px;
    padding: 10px 15px;
    min-width: 0;
}
.px-7{
    padding-right: 0.5rem!important;
    padding-left: 0.5rem!important;
    padding-bottom: 0.5rem!important;
    padding-top: 0.5rem!important;
}
.to-blue-300{
    --tw-gradient-to: #6f4b98;
}

</style>
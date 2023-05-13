<script >
import en from "../en.js";
import kh from "../kh.js";
import { ref } from "vue";
import { useRoute } from 'vue-router';
const axios = require("axios");
import moment from "moment";
import ProfileFB from '../components/ProfileFB.vue'
import Navbar from '../components/Navbar.vue'
const activeDateIndex = ref(2);
export default {
  mixins:[en,kh],
  components: {
      ProfileFB,
      Navbar,
    },
    data() {
        return {
          id:{},
          lang: localStorage.lang,
          tabs: ["Info", "Summary", "Stats", "Line-ups", "H2H"],
          gameStatus : ref("NotStarted"),
          activeTab : ref("Summary"),
          activeSubtab : ref("Events"),
          activeTableSubTab : ref("All"),
          activeH2HSubTab : ref("H2H"),
          subTabs : ["Events", "Commentary"],
          tableTabs : ["All", "Home", "Away"],
          H2HTabs : ["H2H", "Team A", "Team B"],
          lineups:[],
          lineups2:[],
          league:'',
          url_logo:'https://static.livescore.com/i2/fh/',
          url_logo_h2h:'https://lsm-static-prod.livescore.com/medium/',
          null_logo:'/icon/null.webp',
          logo_league:'',
          country:'',
          scoreboards:[],
          homeScore:'',
          awayScore:'',
          logohomeScore:'',
          logoawayScore:'',
          namehomeScore:'',
          nameawayScore:'',
          mathtime:'',
          h2hmacth:[],
          infomacth:[],
          commentary:[],
          commentaryshowall:false,
          event:[],
          event2:[],
          statstm1:[],
          statstm2:[],
          listItems: [],
          leagues :[],
          logo:'https://lsm-static-prod.livescore.com/medium/',
          notlogo:'https://www.livescore.com/ls-web-assets/svgs/common/badge-default-201a546527a7779845697b44be2a618a.svg',
          activeDateIndex:activeDateIndex,
          iflang:'',
          seeall:false,
          search: '',
          Substitution:[],
          lineupschange:[],
        }
    },
    mounted(){
      this.getsetup();
      this.getevent();
      this.getscoreboard();
      this.getcommentary();
      this.getleagues();
    },
    created() {
      this.getAllStarWarsleagues();
    },
    methods: {
        showseeall(){
          this.seeall = true;
        },
        less(){
          this.seeall = false;
        },
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
        getleagues(){
            axios.get('/static/api/league.json').then((res)=>{
                this.leagues = res.data.Ccg;
            }).catch(function (error) {
                console.error(error);
            });
          },
        getFormattedDate(dateString) {
              const onlyNumbers = dateString.toString(); 
              const year = onlyNumbers.slice(0,4) 
              return  year
        },
        formatDate(dateString) {
          const onlyNumbers = dateString ? dateString.toString() : ''
          // const onlyNumbers = dateString.toString(); 
              const year = onlyNumbers.slice(0,4) 
              const month = onlyNumbers.slice(4,6)
              const day = onlyNumbers.slice(6,8)
              const time = onlyNumbers.slice(8,10)
              const min = onlyNumbers.slice(10,12)
              const sc = onlyNumbers.slice(12,14)
              const current = new Date(year, month - 1, day ,time,min,sc);
              const lastdate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()+1}`;
          return  lastdate
        },
        FormDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM-DD-YYYY')
            }
        },
        commentaryall(){
          this.commentaryshowall = true ;
        },
        commentaryhide(){
          this.commentaryshowall = false ;
        },
        getsetup(){
          const route = useRoute()
          if(route.params.id){
            this.id = route.params.id;
          }
          else{
            this.id = localStorage.gameplay
          }
        },
      //=====getLiveScore=========
        getlineup(){
          const url ='https://livescore6.p.rapidapi.com/matches/v2/get-lineups';
          const lineup = {
              params: {Category: 'soccer', Eid:this.id},
              headers: {
                'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
                'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
              }
            }
          axios.get(url, lineup).then((res)=>{
            this.Substitution = res.data.Lu[0].Ps;
            this.lineups = res.data.Lu[0].Ps;
            this.lineups2 = res.data.Lu[1].Ps;
          }).catch(function (error) {
              console.error(error);
          });
        
          
        },
      //=====the-end=========

      //=====get-scoreboard=========
        getscoreboard(){
            const url ='https://livescore6.p.rapidapi.com/matches/v2/get-scoreboard';
            const scoreboard = {
                params: {Category: 'soccer', Eid:this.id},
                headers: {
                  'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
                  'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
                }
              }
            axios.get(url, scoreboard).then((res)=>{
              this.logo_league = res.data.Stg.Ccd
              this.scoreboards = res.data;
              this.league      = res.data.Stg.CompN
              this.country     = res.data.Stg.Cnm
              this.homeScore   = res.data.Tr1
              this.awayScore   = res.data.Tr2
              this.mathtime    = res.data.Eps
              res.data.T1.forEach((item) => {
                this.logohomeScore   = item.Img
                this.namehomeScore   = item.Nm
              })
              res.data.T2.forEach((item) => {
                this.logoawayScore   = item.Img
                this.nameawayScore   = item.Nm
              })
            }).catch(function (error) {
                console.error(error);
            });
          },
      //=====the-end=========

      //=====geth2hmacth=========
        geth2hmacth(){
          const url ='https://livescore6.p.rapidapi.com/matches/v2/get-h2h';
          const h2hmacth = {
              params: {Category: 'soccer', Eid:this.id},
              headers: {
                'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
                'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
              }
            }
          axios.get(url, h2hmacth).then((res)=>{
            this.h2hmacth = res.data.H2H;
          }).catch(function (error) {
              console.error(error);
          });
        },
      //=====the-end=========

      //=====getinfomacth=========
        getinfomacth(){
          fetch('https://livescore6.p.rapidapi.com/matches/v2/get-info?Category=soccer&Timezone=7&Eid='+this.id, {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
                'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
              }
            }).then(
              response => response.json()
              ).then(
              response => this.infomacth = response
              ).catch(
              err => console.error(err));
        },
      //=====the-end=========
    
      //=====getcommentary=========
      getcommentary(){
        const url ='https://livescore6.p.rapidapi.com/matches/v2/get-commentary';
        const commentary = {
            params: {Eid:this.id,},
            headers: {
              'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
              'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
            }
          }
        axios.get(url, commentary).then((res)=>{
          this.commentary = res.data.Com;
        }).catch(function (error) {
            console.error(error);
        });
      },
      //=====the-end=========
      getevent(){
        const url ='https://livescore6.p.rapidapi.com/matches/v2/detail';
        const stats = {
            params: {Eid: this.id,Category: 'soccer'},
            headers: {
              'X-RapidAPI-Key': 'b28e1bbb11mshb21562baa37acb0p1ab74cjsn6f5de5c3acba',
              'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
            }
          }
        axios.get(url, stats).then((res)=>{
          this.statstm1 = res.data.Stat[0];
          this.statstm2 = res.data.Stat[1];
          this.event    = res.data.Incs[1];
          this.event2    = res.data.Incs[2];
          this.getinfomacth();
          this.geth2hmacth();
          this.getlineup();
        }).catch(function (error) {
            console.error(error);
        });
      },
    }

  }
</script>

<template id="body">
  <Navbar/>
<div class="lg:px-0 md:px-0 md:mt-2">
<!-- <div class="max-w-6xl mx-auto lg:py-5 md:py-5 ">  -->
  <div class="container-sm">
    <div class="flex flex-col md:flex-row lg:flex-row justify-between lg:gap-x-2 md:gap-x-2">

      <div class="lg:w-3/12 md:w-3/12 lg:flex md:hidden hidden"> 
          <div  class="relative flex flex-col">
            <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pt-2 pb-2 border-b" >
              <div class="gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600" >
                <div class="bg-gradient-to-r px-7 from-blue-900 to-blue-300 flex items-center gap-x-2 px-2" >
                  <span><i class="fa fa-futbol-o white"></i></span> 
                  <span v-if="lang == 'en'" class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" >
                    {{en.league_list}}
                  </span>
                  <span v-else class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" >
                    {{kh.league_list}}
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
          @keyup="getAllStarWarsleagues" />
              
              </div>
              <div class="jc"></div>
              <div id="exploreMenuList" class="Zh">
                <ul class="ai" v-for="(value, key, index) in leagues.slice(0,20)" :key="index">
                  <li class="bi">
                    <a class="ci" data-iscategory="true" data-active="false" data-id="england" 
                      id="menu-link-England" v-bind:href="'/league/'+value.Cid">
                      <div class="hi">
                        <img loading="lazy" v-bind:src="'https://static.livescore.com/i2/fh/'+ value.Ccd+'.jpg'">
                      </div>
                      <span class="menuItemName">{{value.Cnm}}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div id="exploreMenuList" class="Zh" v-if="seeall == true">
                <ul class="ai" v-for="(value, key, index) in leagues.slice(20)" :key="index">
                  <li class="bi">
                    <a class="ci" data-iscategory="true" data-active="false" data-id="england" 
                      id="menu-link-England" v-bind:href="'/league/'+value.Cid">
                      <div class="hi">
                        <img loading="lazy" v-bind:src="'https://static.livescore.com/i2/fh/'+ value.Ccd+'.jpg'">
                      </div>
                      <span class="menuItemName">{{value.Cnm}}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="jc isBottomDivider"></div>
              <div class="kc">
                <a @click="showseeall" v-if="seeall == false">More League</a>
                <a @click="less" v-else>Less League</a>
              </div>
            </div>
          </div>
          </div>
      </div>
      <div class="lg:w-5/12 md:w-7/12 w-full">

          <div class="px-2.5 mb-2 flex justify-between items-center">
            <div class="flex items-center gap-2 mb-2" v-if="logo_league">
              <img  v-bind:src="url_logo + logo_league+'.jpg'" alt="" class="w-5 h-3"/>

              <div class="grid">
                <p class="capitalize text-sm font-bold" style="color: #2f2151;">{{ league }}</p>
                <p class="capitalize text-11px text-pry">{{ country }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <i class="fa fa-gamepad"></i>
            </div>
          </div>

          <div class="mx-2.5 h-20 py-3 relative flex justify-center items-center bg-n-bg-sila-new rounded-lg">
              <div class="flex justify-between items-center gap-10 w-64">
                <div class="flex flex-col justify-center gap-3">
                  <img v-bind:src="'https://lsm-static-prod.livescore.com/medium/'+ logohomeScore" alt="" class="w-6 h-6 mx-auto" />

                  <p class="text-11px text-center">{{namehomeScore}}</p>
                </div>

                <div>
                  <p class="text-[22px] flex items-center gap-1 font-bold">
                    <span> {{ homeScore }}</span> - <span> {{ awayScore }}</span>
                  </p>
                  <p style="text-align: center; font-size: 10px;"> {{ mathtime }} </p>
                </div>

                <div class="flex flex-col justify-center gap-3">
                  <img v-bind:src="'https://lsm-static-prod.livescore.com/medium/'+ logoawayScore" alt="" class="w-6 h-6 mx-auto"/>
                  <p class="text-11px text-center">{{ nameawayScore }}</p>
                </div>
              </div>
          </div>

          <div class="pb-1 mb-2 border-n-bg-gray border-b">
            <div class="my-2 mx-2.5 flex gap-4 overflow-auto">
              <p
                @click="activeTab = tab"
                v-for="(tab, idx) in tabs"
                :key="idx"
                class="text-sm font-bold cursor-pointer"
                :class="tab === activeTab ? 'text-n-orange' : 'text-pry'"
              >
                {{ tab }}
              </p>
            </div>
          </div>

          <div v-if="activeTab === 'Info'" class="mx-2.5 text-pry">
            <div id="match-detail__info" class="Rf"><span>Match Info</span></div>
            <div class="Sf">
              <button class="Tf">
                <div class="Wf">
                  <span class="tttt">
                    <span class="oooo">
                      <img alt="" aria-hidden="true" src="/icon/calendar.svg" class="qqqq">
                    </span>
                    <img alt="" src="/icon/calendar.svg" class="rrrr">
                  </span>
                </div>
                <div class="Uf">
                  <span class="Vf">{{formatDate(infomacth.Esd)}}</span>
                </div>
              </button>
              <button class="Tf">
                <div class="Wf">
                  <span class="pppp">
                    <span class="oooo">
                      <img alt="" aria-hidden="true" 
                      src="/icon/referee.svg" 
                      class="qqqq">
                    </span>
                    <img alt="" 
                    src="/icon/referee.svg" 
                    class="rrrr">
                  </span>
                </div>
                <div class="Uf">
                      <span class="Vf">{{infomacth.Refs[0].Nm}} ({{ infomacth.Refs[0].Cn }})</span>
                </div>
              </button>
              <button class="Tf" v-if="infomacth.Vnm" >
                <div class="Wf">
                  <span class="pppp">
                    <span class="oooo">
                      <img alt="" aria-hidden="true" 
                      src="/icon/start.svg" 
                      class="qqqq">
                    </span>
                    <img alt="" src="/icon/start.svg" 
                    class="rrrr">
                  </span>
                </div>
                <div class="Uf">
                  <span class="Vf">{{ infomacth.Vnm }}</span>
                </div>
              </button>
              <button class="Tf"  v-if="infomacth.Vsp" >
                <div class="Wf" >
                  <span class="pppp" >
                    <span class="oooo">
                      <img alt="" aria-hidden="true" 
                      src="/icon/users.svg" 
                      class="qqqq">
                    </span>
                    <img alt="" 
                    src="/icon/users.svg" 
                    class="rrrr">
                  </span>
                </div>
                <div class="Uf">
                  <span class="Vf">{{ infomacth.Vsp }}</span>
                </div>
              </button>
            </div>
            <p class="mt-2 text-11px uppercase font-bold">who will win?</p>
          </div>
          
          <div v-if="activeTab === 'Summary'" class="mx-2.5 text-pry">
          <div class="px-1 pb-2 flex items-center gap-2">
            <p
              @click="activeSubtab = tab"
              v-for="(tab, idx) in subTabs"
              :key="idx"
              class="uppercase text-11px py-1 px-2 rounded-2xl cursor-pointer"
              :class="
                activeSubtab === tab
                  ? 'bg-fan-primary text-white'
                  : 'bg-transparent border-pry border'
              " >
              {{ tab }}
            </p>
          </div>

          <div v-if="activeSubtab === 'Events'" class="mx-1 border border-n-bg-gray rounded-md" >
            <div class="Pf">
              <div class="Ko" v-for="(value, key, index) in event" :key="index">
                <span class="Po" v-if="value.Min">{{ value.Min }} <span v-if="value.MinEx"> &nbsp; + {{ value.MinEx }}</span>'</span>
                <div class="Lo homeContent">
                
                    <div class="So homePlayer" v-if="value.Nm == 1">
                      <span v-for="(team,key,index) in value.Incs" :key="index" >
                        <span class="Mo" style="color: #2f2151;" v-if="key == '0'">{{ team.Pn }}</span>
                      </span>
                      <span v-for="(team,key,index) in value.Incs" :key="index" >
                        <span class="No" v-if="key == '1'">{{ team.Pn }}</span>
                      </span>
                      <span class="Mo" style="color: #2f2151;" v-if="value.Pn">{{ value.Pn }}</span>
                    </div>
                  <div class="Qo homeIcon" v-if="value.Nm == 1">
                    <div class="Ro" v-if="value.IT == '37'" style="color: #2f2151;">PEN</div>
                    <div class="Ro" v-if="value.IT == '39'" style="color: #2f2151;">OG</div>
                    <div class="Ro" v-if="value.IT == '62'" style="color: #2f2151;">VAR</div>
                    <span class="Rn">
                      <svg v-if="value.IT == '43'" xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballYellowCard"><rect width="10" height="14" x="2" rx="2" transform="translate(-1.68)" fill="#FFCE00" fill-rule="evenodd"></rect></svg>
                      <svg v-else-if="value.IT == '44'" viewBox="0 0 32 32" name="FootballRedYellowCard"><path fill="#ffce00" d="M13.714 4.571h9.143c2.525 0 4.571 2.047 4.571 4.571v18.286c0 2.525-2.047 4.571-4.571 4.571h-9.143c-2.525 0-4.571-2.047-4.571-4.571v-18.286c0-2.525 2.047-4.571 4.571-4.571z"></path><path fill="#df2357" d="M9.143 0h9.143c2.525 0 4.571 2.047 4.571 4.571v18.286c0 2.525-2.047 4.571-4.571 4.571h-9.143c-2.525 0-4.571-2.047-4.571-4.571v-18.286c0-2.525 2.047-4.571 4.571-4.571z"></path></svg>
                      <svg v-else-if="value.IT == '37'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" name="FootballGoalPen"><g transform="translate(.63 .5)" fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#222" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path><g transform="translate(6 6)"><circle cx="4" cy="4" r="4" fill="#23DF8C" transform="matrix(1 0 0 -1 0 8)"></circle><path fill="#111111" d="M3.52 6.34c.27 0 .47-.1.6-.3l2.2-3.17c.1-.14.14-.3.14-.42a.68.68 0 00-.7-.67c-.26 0-.44.1-.6.34L3.52 4.65l-.79-.81a.65.65 0 00-.5-.22c-.4 0-.7.3-.7.68 0 .17.05.3.2.47L2.96 6.1a.7.7 0 00.56.24z"></path></g></g></svg>
                      <svg v-else-if="value.IT == '39'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" name="FootballOwnGoal"><g fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#DF2357" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path></g></svg>
                      <svg v-else-if="value.IT == '62'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" name="FootballGoalMiss"><g transform="translate(.63 .5)" fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#222" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path><g transform="translate(6 6)"><circle cx="4" cy="4" r="4" fill="#DF2357" transform="matrix(1 0 0 -1 0 8)"></circle><path fill="#111111" d="M5.88 2.23l.04.06c.13.23.1.5-.09.69L4.81 4l1.02 1.03c.23.22.23.58 0 .8l-.05.05a.57.57 0 01-.76-.05L4 4.81 2.98 5.83l-.06.05a.58.58 0 01-.75-.05l-.05-.06-.04-.06a.57.57 0 01.09-.68L3.19 4 2.17 2.98a.57.57 0 010-.81l.05-.05a.57.57 0 01.75.05L4 3.19l1.03-1.02.05-.05.02-.02a.57.57 0 01.73.07l.05.06z"></path></g></g></svg>
                      <i v-else-if="value.Sc" class="fa fa-futbol-o" aria-hidden="true"></i>
                      <svg v-if="value.IT == '45'" xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballRedCard"><rect width="10" height="14" x="2" rx="2" transform="translate(-1.66)" fill="#DF2357" fill-rule="evenodd"></rect></svg>
                    </span>
                  </div>
                </div>
                <div class="Oo">
                  <span style="color: #2f2151;">
                    <span v-for="(curscore,key,index) in value.Sc" :key="index"> 
                        <span v-if="key == '0'">{{ curscore  }} </span>
                    </span>
                      <span v-if="value.Sc">-</span>
                    <span v-for="(curscore,key,index) in value.Sc" :key="index"> 
                      <span v-if="key == '1'">{{ curscore  }} </span>
                    </span>
                  </span>
                </div>
                <div class="Lo awayContent">
                  <div class="Qo awayIcon" v-if="value.Nm == 2">
                    <div class="Ro" v-if="value.IT == '37'" style="color: #2f2151;">PEN</div>
                    <div class="Ro" v-if="value.IT == '39'" style="color: #2f2151;">OG</div>
                    <div class="Ro" v-if="value.IT == '62'" style="color: #2f2151;">VAR</div>


                    <span class="Rn" v-if="value.Nm == 2">

                      <svg v-if="value.IT == '43'" xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballYellowCard"><rect width="10" height="14" x="2" rx="2" transform="translate(-1.68)" fill="#FFCE00" fill-rule="evenodd"></rect></svg>
                      <svg v-else-if="value.IT == '44'" viewBox="0 0 32 32" name="FootballRedYellowCard"><path fill="#ffce00" d="M13.714 4.571h9.143c2.525 0 4.571 2.047 4.571 4.571v18.286c0 2.525-2.047 4.571-4.571 4.571h-9.143c-2.525 0-4.571-2.047-4.571-4.571v-18.286c0-2.525 2.047-4.571 4.571-4.571z"></path><path fill="#df2357" d="M9.143 0h9.143c2.525 0 4.571 2.047 4.571 4.571v18.286c0 2.525-2.047 4.571-4.571 4.571h-9.143c-2.525 0-4.571-2.047-4.571-4.571v-18.286c0-2.525 2.047-4.571 4.571-4.571z"></path></svg>
                      <svg v-else-if="value.IT == '37'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" name="FootballGoalPen"><g transform="translate(.63 .5)" fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#222" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path><g transform="translate(6 6)"><circle cx="4" cy="4" r="4" fill="#23DF8C" transform="matrix(1 0 0 -1 0 8)"></circle><path fill="#111111" d="M3.52 6.34c.27 0 .47-.1.6-.3l2.2-3.17c.1-.14.14-.3.14-.42a.68.68 0 00-.7-.67c-.26 0-.44.1-.6.34L3.52 4.65l-.79-.81a.65.65 0 00-.5-.22c-.4 0-.7.3-.7.68 0 .17.05.3.2.47L2.96 6.1a.7.7 0 00.56.24z"></path></g></g></svg>
                      <svg v-else-if="value.IT == '39'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" name="FootballOwnGoal"><g fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#DF2357" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path></g></svg>
                      <svg v-else-if="value.IT == '62'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" name="FootballGoalMiss"><g transform="translate(.63 .5)" fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#222" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path><g transform="translate(6 6)"><circle cx="4" cy="4" r="4" fill="#DF2357" transform="matrix(1 0 0 -1 0 8)"></circle><path fill="#111111" d="M5.88 2.23l.04.06c.13.23.1.5-.09.69L4.81 4l1.02 1.03c.23.22.23.58 0 .8l-.05.05a.57.57 0 01-.76-.05L4 4.81 2.98 5.83l-.06.05a.58.58 0 01-.75-.05l-.05-.06-.04-.06a.57.57 0 01.09-.68L3.19 4 2.17 2.98a.57.57 0 010-.81l.05-.05a.57.57 0 01.75.05L4 3.19l1.03-1.02.05-.05.02-.02a.57.57 0 01.73.07l.05.06z"></path></g></g></svg>
                      <i v-else-if="value.Sc" class="fa fa-futbol-o" aria-hidden="true"></i>
                      <svg v-if="value.IT == '45'" xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballRedCard"><rect width="10" height="14" x="2" rx="2" transform="translate(-1.66)" fill="#DF2357" fill-rule="evenodd"></rect></svg>
                    
                    </span>
                  </div>
                  <div class="So awayPlayer" v-if="value.Nm == 2">
                      <span v-for="(team,key,index) in value.Incs" :key="index" >
                          <span class="Mo" style="color: #2f2151;" v-if="key == '0'">{{ team.Pn }}</span>
                      </span>
                      <span v-for="(team,key,index) in value.Incs" :key="index" >
                        <span class="No" v-if="key == '1'">{{ team.Pn }}</span>
                      </span>
                    <span class="Mo" style="color: #2f2151;" v-if="value.Pn">{{ value.Pn }}</span>
                  </div>
                </div>
              </div>
              <div class="Ko" v-for="(value, key, index) in event2" :key="index">
                <span class="Po" v-if="value.Min">{{ value.Min }} <span v-if="value.MinEx"> &nbsp; + {{ value.MinEx }}</span>'</span>
                <div class="Lo homeContent">
                
                    <div class="So homePlayer" v-if="value.Nm == 1">
                      <span v-for="(team,key,index) in value.Incs" :key="index" >
                        <span class="Mo" style="color: #2f2151;" v-if="key == '0'">{{ team.Pn }}</span>
                      </span>
                      <span v-for="(team,key,index) in value.Incs" :key="index" >
                        <span class="No" v-if="key == '1'">{{ team.Pn }}</span>
                      </span>
                      <span class="Mo" style="color: #2f2151;" v-if="value.Pn">{{ value.Pn }}</span>
                    </div>
                  <div class="Qo homeIcon" v-if="value.Nm == 1">
                    <div class="Ro" v-if="value.IT == '37'" style="color: #2f2151;">PEN</div>
                    <div class="Ro" v-if="value.IT == '39'" style="color: #2f2151;">OG</div>
                    <div class="Ro" v-if="value.IT == '62'" style="color: #2f2151;">VAR</div>
                    <span class="Rn">
                      <svg v-if="value.IT == '43'" xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballYellowCard"><rect width="10" height="14" x="2" rx="2" transform="translate(-1.68)" fill="#FFCE00" fill-rule="evenodd"></rect></svg>
                      <svg v-else-if="value.IT == '44'" viewBox="0 0 32 32" name="FootballRedYellowCard"><path fill="#ffce00" d="M13.714 4.571h9.143c2.525 0 4.571 2.047 4.571 4.571v18.286c0 2.525-2.047 4.571-4.571 4.571h-9.143c-2.525 0-4.571-2.047-4.571-4.571v-18.286c0-2.525 2.047-4.571 4.571-4.571z"></path><path fill="#df2357" d="M9.143 0h9.143c2.525 0 4.571 2.047 4.571 4.571v18.286c0 2.525-2.047 4.571-4.571 4.571h-9.143c-2.525 0-4.571-2.047-4.571-4.571v-18.286c0-2.525 2.047-4.571 4.571-4.571z"></path></svg>
                      <svg v-else-if="value.IT == '37'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" name="FootballGoalPen"><g transform="translate(.63 .5)" fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#222" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path><g transform="translate(6 6)"><circle cx="4" cy="4" r="4" fill="#23DF8C" transform="matrix(1 0 0 -1 0 8)"></circle><path fill="#111111" d="M3.52 6.34c.27 0 .47-.1.6-.3l2.2-3.17c.1-.14.14-.3.14-.42a.68.68 0 00-.7-.67c-.26 0-.44.1-.6.34L3.52 4.65l-.79-.81a.65.65 0 00-.5-.22c-.4 0-.7.3-.7.68 0 .17.05.3.2.47L2.96 6.1a.7.7 0 00.56.24z"></path></g></g></svg>
                      <svg v-else-if="value.IT == '39'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" name="FootballOwnGoal"><g fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#DF2357" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path></g></svg>
                      <svg v-else-if="value.IT == '62'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" name="FootballGoalMiss"><g transform="translate(.63 .5)" fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#222" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path><g transform="translate(6 6)"><circle cx="4" cy="4" r="4" fill="#DF2357" transform="matrix(1 0 0 -1 0 8)"></circle><path fill="#111111" d="M5.88 2.23l.04.06c.13.23.1.5-.09.69L4.81 4l1.02 1.03c.23.22.23.58 0 .8l-.05.05a.57.57 0 01-.76-.05L4 4.81 2.98 5.83l-.06.05a.58.58 0 01-.75-.05l-.05-.06-.04-.06a.57.57 0 01.09-.68L3.19 4 2.17 2.98a.57.57 0 010-.81l.05-.05a.57.57 0 01.75.05L4 3.19l1.03-1.02.05-.05.02-.02a.57.57 0 01.73.07l.05.06z"></path></g></g></svg>
                      <i v-else-if="value.Sc" class="fa fa-futbol-o" aria-hidden="true"></i>
                      <svg v-if="value.IT == '45'" xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballRedCard"><rect width="10" height="14" x="2" rx="2" transform="translate(-1.66)" fill="#DF2357" fill-rule="evenodd"></rect></svg>
                    
                    </span>
                  </div>
                </div>
                <div class="Oo">
                  <span style="color: #2f2151;">
                    <span v-for="(curscore,key,index) in value.Sc" :key="index"> 
                        <span v-if="key == '0'">{{ curscore  }} </span>
                    </span>
                      <span v-if="value.Sc">-</span>
                    <span v-for="(curscore,key,index) in value.Sc" :key="index"> 
                      <span v-if="key == '1'">{{ curscore  }} </span>
                    </span>
                  </span>
                </div>
                <div class="Lo awayContent">
                  <div class="Qo awayIcon" v-if="value.Nm == 2">
                    <div class="Ro" v-if="value.IT == '37'" style="color: #2f2151;">PEN</div>
                    <div class="Ro" v-if="value.IT == '39'" style="color: #2f2151;">OG</div>
                    <div class="Ro" v-if="value.IT == '62'" style="color: #2f2151;">VAR</div>


                    <span class="Rn" v-if="value.Nm == 2">

                      <svg v-if="value.IT == '43'" xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballYellowCard"><rect width="10" height="14" x="2" rx="2" transform="translate(-1.68)" fill="#FFCE00" fill-rule="evenodd"></rect></svg>
                      <svg v-else-if="value.IT == '44'" viewBox="0 0 32 32" name="FootballRedYellowCard"><path fill="#ffce00" d="M13.714 4.571h9.143c2.525 0 4.571 2.047 4.571 4.571v18.286c0 2.525-2.047 4.571-4.571 4.571h-9.143c-2.525 0-4.571-2.047-4.571-4.571v-18.286c0-2.525 2.047-4.571 4.571-4.571z"></path><path fill="#df2357" d="M9.143 0h9.143c2.525 0 4.571 2.047 4.571 4.571v18.286c0 2.525-2.047 4.571-4.571 4.571h-9.143c-2.525 0-4.571-2.047-4.571-4.571v-18.286c0-2.525 2.047-4.571 4.571-4.571z"></path></svg>
                      <svg v-else-if="value.IT == '37'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" name="FootballGoalPen"><g transform="translate(.63 .5)" fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#222" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path><g transform="translate(6 6)"><circle cx="4" cy="4" r="4" fill="#23DF8C" transform="matrix(1 0 0 -1 0 8)"></circle><path fill="#111111" d="M3.52 6.34c.27 0 .47-.1.6-.3l2.2-3.17c.1-.14.14-.3.14-.42a.68.68 0 00-.7-.67c-.26 0-.44.1-.6.34L3.52 4.65l-.79-.81a.65.65 0 00-.5-.22c-.4 0-.7.3-.7.68 0 .17.05.3.2.47L2.96 6.1a.7.7 0 00.56.24z"></path></g></g></svg>
                      <svg v-else-if="value.IT == '39'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" name="FootballOwnGoal"><g fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#DF2357" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path></g></svg>
                      <svg v-else-if="value.IT == '62'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" name="FootballGoalMiss"><g transform="translate(.63 .5)" fill="none" fill-rule="evenodd"><circle cx="7" cy="7" r="6" fill="#FDFDFD"></circle><path fill="#222" d="M7 0h.28H7a6.8 6.8 0 01.56.02l.14.01.25.03h.02l.04.01.22.04.13.02.14.03.13.03.24.06.08.03.23.07.04.01.53.2.03.01c.95.42 1.8 1.03 2.47 1.8a5.96 5.96 0 01.62.82l.08.13.06.1c.42.7.72 1.49.87 2.32l.02.07a7.47 7.47 0 01.07 1.85 6.97 6.97 0 01-.94 2.9l-.03.05-.08.13.1-.18-.2.34-.03.04-.37.5-.04.03c-.12.16-.26.3-.4.45l-.05.05-.12.12-.4.35-.07.05-.19.15-.04.02v.01l-.25.17.25-.18a7.3 7.3 0 01-1.67.9l-.05.02-.22.08-.06.02a5.9 5.9 0 01-.37.1l-.16.04a6.95 6.95 0 01-3.11.01l-.06-.01-.15-.04-.09-.02-.03-.01a6.16 6.16 0 01-.24-.07l-.09-.03-.2-.07-.06-.02a7.96 7.96 0 01-.24-.1h-.03c-.5-.22-.96-.48-1.38-.79h-.01l-.04-.03-.2-.16.24.18a6.66 6.66 0 01-.82-.7l-.05-.04a6.47 6.47 0 01-.4-.45l-.04-.04A6.97 6.97 0 01.03 7.66a7.5 7.5 0 010-1.34l.02-.13.01-.11.04-.27.02-.11c.16-.82.45-1.59.87-2.28l.06-.1.08-.13A6.94 6.94 0 014.22.58l.04-.02.51-.2.06-.01.23-.08.06-.01.25-.07c.05 0 .09-.02.13-.03l.14-.03.13-.02L6 .07h.06L6.3.03h.14A3.85 3.85 0 017 0zm1.88 1.3L7.44 2.45a.7.7 0 01-.8.05l-.08-.05L5.12 1.3a6 6 0 00-2.96 2.16l.65 1.72a.7.7 0 01-.2.78L2.54 6 1 7.02v.2a5.96 5.96 0 001.14 3.29l1.83-.09a.7.7 0 01.68.43l.03.09.49 1.77a5.94 5.94 0 003.66 0l.49-1.77a.7.7 0 01.62-.51h.09l1.84.08A5.96 5.96 0 0013 7.02l-1.54-1.01a.7.7 0 01-.3-.75l.03-.08.65-1.72A6.01 6.01 0 008.88 1.3zM7.4 4.5l1.84 1.33c.24.18.35.5.25.79l-.7 2.16a.7.7 0 01-.66.48H5.86a.7.7 0 01-.66-.48l-.7-2.16a.7.7 0 01.25-.78L6.59 4.5a.7.7 0 01.82 0z"></path><g transform="translate(6 6)"><circle cx="4" cy="4" r="4" fill="#DF2357" transform="matrix(1 0 0 -1 0 8)"></circle><path fill="#111111" d="M5.88 2.23l.04.06c.13.23.1.5-.09.69L4.81 4l1.02 1.03c.23.22.23.58 0 .8l-.05.05a.57.57 0 01-.76-.05L4 4.81 2.98 5.83l-.06.05a.58.58 0 01-.75-.05l-.05-.06-.04-.06a.57.57 0 01.09-.68L3.19 4 2.17 2.98a.57.57 0 010-.81l.05-.05a.57.57 0 01.75.05L4 3.19l1.03-1.02.05-.05.02-.02a.57.57 0 01.73.07l.05.06z"></path></g></g></svg>
                      <i v-else-if="value.Sc" class="fa fa-futbol-o" aria-hidden="true"></i>
                      <svg v-if="value.IT == '45'" xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballRedCard"><rect width="10" height="14" x="2" rx="2" transform="translate(-1.66)" fill="#DF2357" fill-rule="evenodd"></rect></svg>
                    
                    </span>
                  </div>
                  <div class="So awayPlayer" v-if="value.Nm == 2">
                      <span v-for="(team,key,index) in value.Incs" :key="index" >
                          <span class="Mo" style="color: #2f2151;" v-if="key == '0'">{{ team.Pn }}</span>
                      </span>
                      <span v-for="(team,key,index) in value.Incs" :key="index" >
                        <span class="No" v-if="key == '1'">{{ team.Pn }}</span>
                      </span>
                    <span class="Mo" style="color: #2f2151;" v-if="value.Pn">{{ value.Pn }}</span>
                  </div>
                </div>
              </div>       
            </div>
          </div>
          <div v-else class="mx-1 border border-n-bg-gray rounded-md">

            <div class="px-2 py-3 flex justify-start items-center border-n-bg-gray border-b" 
            v-for="(value, key, index) in commentary.slice(0,20)" :key="index" >
              <p class="mr-2 text-pry text-11px"> {{ value.Min }}  <span v-if="value.MinEx"> + {{ value.MinEx }}</span>' </p>
              <p class="text-pry text-11px">
                {{ value.Txt }}
              </p>
            </div>
            <div v-if="commentaryshowall == true">
              <div   class="px-2 py-3 flex justify-start items-center border-n-bg-gray border-b" 
            v-for="(value, key, index) in commentary.slice(20)" :key="index" >
              <p class="mr-2 text-pry text-11px" v-if="value.Min" > {{ value.Min }}  
                <span v-if="value.MinEx ">
                  + {{ value.MinEx }}
                </span>' </p>
              <p class="text-pry text-11px">
                {{ value.Txt }}
              </p>
            </div>
            </div>
      
            <span class="Of" v-if="commentaryshowall == false"><button @click="commentaryall">More commentary</button></span>
            <span class="Of" v-else><button @click="commentaryhide">Less commentary</button></span>

          </div>
          </div>

          <div v-if="activeTab === 'Stats'" class="px-2.5 text-pry">
            <div class="grid">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Shon }}</p>
                <p>Shots on target</p>
                <p>{{ statstm2.Shon }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg">
                  <div class="h-[10px] rounded-l-lg bg-n-orange" :style="{width: statstm1.Shon+'%'}"></div>
                </div>

                <div class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg">
                  <div class="h-[10px] bg-n-orange " :style="{width: statstm2.Shon+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid my-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Shof }}</p>
                <p>Shots off target</p>
                <p>{{ statstm2.Shof }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm1.Shof+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm2.Shof+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid my-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Shbl }}</p>
                <p>Blocked Shots</p>
                <p>{{ statstm2.Shbl }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg"
                >
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm1.Shbl+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm2.Shbl+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Pss }}</p>
                <p>Possession (%)</p>
                <p>{{ statstm2.Pss }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm1.Pss+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm2.Pss+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">

              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Cos }}</p>
                <p>Corner Kicks</p>
                <p>{{ statstm2.Cos }}</p>
              </div>

              <div class="flex justify-between items-center gap-2">
                <div class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg">
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm1.Cos+'%'}"></div>
                </div>
                <div class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg" >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm2.Cos+'%'}"></div>
                </div>
              </div>

            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Ofs }}</p>
                <p>Offsides</p>
                <p>{{ statstm2.Ofs }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg"
                >
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm1.Ofs+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg">
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm2.Ofs+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Fls }}</p>
                <p>Fouls</p>
                <p>{{ statstm2.Fls }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg">
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm1.Fls+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg">
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm2.Fls+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Ths }}</p>
                <p>Throw ins</p>
                <p>{{ statstm2.Ths }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm1.Ths+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm2.Ths+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Ycs }} </p>
                <p>Yellow Cards</p>
                <p>{{ statstm2.Ycs }} </p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg">
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm1.Ycs+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg">
                  <div class="h-[10px] bg-n-orange " :style="{width: statstm2.Ycs+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Crs }}</p>
                <p>Crosses</p>
                <p>{{ statstm2.Crs }}</p>

              </div>
              <div class="flex justify-between items-center gap-2">
                <div class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg">
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm1.Crs+'%'}"></div>
                </div>

                <div class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg">
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm2.Crs+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Att }}</p>
                <p>Counter attacks</p>
                <p>{{ statstm2.Att }}</p>

              </div>
              <div class="flex justify-between items-center gap-2">
                <div class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg">
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm1.Att+'%'}"></div>
                </div>

                <div class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg" >
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm2.Att+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Gks }}</p>
                <p>Goalkeeper saves</p>
                <p>{{ statstm2.Gks }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg"
                >
                  <div class="h-[10px] bg-n-orange" :style="{width: statstm1.Gks+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm2.Gks+'%'}"></div>
                </div>
              </div>
            </div>

            <div class="grid mb-2">
              <div class="flex justify-between items-center text-11px text-pry">
                <p>{{ statstm1.Goa }}</p>
                <p>Goal Kicks</p>
                <p>{{ statstm2.Goa }}</p>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div
                  class="bg-n-bg-gray flex justify-end w-1/2 h-[10px] rounded-l-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm1.Goa+'%'}"></div>
                </div>

                <div
                  class="bg-n-bg-gray flex justify-start w-1/2 h-[10px] rounded-r-lg"
                >
                  <div class=" h-[10px] bg-n-orange" :style="{width: statstm2.Goa+'%'}"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'Line-ups'" class="px-2.5 text-pry">
            <p class="uppercase text-11px">REAL BETIS</p>
              <div class="col-6-sila">
                <div class="box">
                  <div class="cp" v-for="(tm1, key, index) in lineups" :key="index">
                      <div class="ep"  v-if="tm1.Pon !=='SUBSTITUTE_PLAYER' && tm1.Pon !=='COACH'">
                        <div class="fp">
                          <div class="hp ip">
                            <div class="sp">
                              <div class="up">
                                <span class="vp xp tp">
                                  <!-- <span  class="Bp">
                                    <span class="Rn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballYellowCard">
                                        <rect width="10" height="14" x="2" rx="2" transform="translate(-1.68)" fill="#FFCE00" fill-rule="evenodd">
                                        </rect>
                                      </svg>
                                    </span>
                                  </span> -->
                                  <span class="Cp" v-if="tm1.Mo">
                                    <span class="Rn">
                                      <svg viewBox="0 0 14 14" fill="red" name="FootballSubOut"><path fill="#df2357" d="M14 7A7 7 0 110 7a7 7 0 0114 0z"></path><path fill="#111111" d="M9 3.5V7h1.44a.25.25 0 01.19.42l-3.26 3.66a.5.5 0 01-.74 0L3.37 7.42A.25.25 0 013.56 7H5V3.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5z"></path></svg>
                                    </span>
                                  </span>
                                  {{ tm1.Snu }}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="mp">
                            <span>                      
                                {{ tm1.Fn }} {{ tm1.Ln }}
                            </span>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="box">
                  <div class="cp" v-for="(tm2, key, index) in lineups2" :key="index">

                      <div class="ep" v-if="tm2.Pon !=='SUBSTITUTE_PLAYER' && tm2.Pon !=='COACH'">
                        <div class="gp">
                          <div class="hp ip">
                            <div class="sp">
                              <div class="up">
                                <span class="vp zp tp">
                                  <!-- <span  class="Bp">
                                    <span class="Rn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballYellowCard">
                                        <rect width="10" height="14" x="2" rx="2" transform="translate(-1.68)" fill="#FFCE00" fill-rule="evenodd">
                                        </rect>
                                      </svg>
                                    </span>
                                  </span> -->

                                  <span class="Cp" v-if="tm2.Mo">
                                    <span class="Rn">
                                      <svg viewBox="0 0 14 14" fill="red" name="FootballSubOut"><path fill="#df2357" d="M14 7A7 7 0 110 7a7 7 0 0114 0z"></path><path fill="#111111" d="M9 3.5V7h1.44a.25.25 0 01.19.42l-3.26 3.66a.5.5 0 01-.74 0L3.37 7.42A.25.25 0 013.56 7H5V3.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5z"></path></svg>
                                    </span>
                                  </span>
                                  {{ tm2.Snu }}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="mp">
                            <span>                        
                              {{ tm2.Fn }} {{ tm2.Ln }}
                            </span>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            <p class="uppercase text-11px">Substitute Players</p>
              <div class="col-6-sila">
                <div class="box">
                  <div class="cp" v-for="(tm1, key, index) in lineups" :key="index">
                      <div class="ep"  v-if="tm1.Pon == 'SUBSTITUTE_PLAYER'">
                        <div class="fp">
                          <div class="hp ip">
                            <div class="sp">
                              <div class="up">
                                <span class="vp xp tp">
                                  <!-- <span  class="Bp">
                                    <span class="Rn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballYellowCard">
                                        <rect width="10" height="14" x="2" rx="2" transform="translate(-1.68)" fill="#FFCE00" fill-rule="evenodd">
                                        </rect>
                                      </svg>
                                    </span>
                                  </span> -->
                                  <span class="Cp" v-if="tm1.Mo">
                                    <span class="Rn">
                                      <svg viewBox="0 0 14 14" fill="red" name="FootballSubIn">
                                        <path fill="#23df8c" d="M14 7A7 7 0 100 7a7 7 0 0014 0z"></path>
                                        <path fill="#111111" d="M9 10.5V7h1.44a.25.25 0 00.19-.42L7.37 2.92a.5.5 0 00-.74 0L3.37 6.58a.25.25 0 00.19.42H5v3.5c0 .28.22.5.5.5h3a.5.5 0 00.5-.5z">
                                        </path>
                                      </svg>
                                    </span>
                                  </span>
                                  {{ tm1.Snu }}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="mp">
                            <span>                      
                                {{ tm1.Fn }} {{ tm1.Ln }}
                            </span>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="box">
                  <div class="cp" v-for="(tm2, key, index) in lineups2" :key="index">

                      <div class="ep" v-if="tm2.Pon == 'SUBSTITUTE_PLAYER'">
                        <div class="gp">
                          <div class="hp ip">
                            <div class="sp">
                              <div class="up">
                                <span class="vp zp tp">
                                  <!-- <span  class="Bp">
                                    <span class="Rn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" name="FootballYellowCard">
                                        <rect width="10" height="14" x="2" rx="2" transform="translate(-1.68)" fill="#FFCE00" fill-rule="evenodd">
                                        </rect>
                                      </svg>
                                    </span>
                                  </span> -->

                                  <span class="Cp" v-if="tm2.Mo">
                                    <span class="Rn">
                                      <svg viewBox="0 0 14 14" fill="red" name="FootballSubIn">
                                        <path fill="#23df8c" d="M14 7A7 7 0 100 7a7 7 0 0014 0z"></path>
                                        <path fill="#111111" d="M9 10.5V7h1.44a.25.25 0 00.19-.42L7.37 2.92a.5.5 0 00-.74 0L3.37 6.58a.25.25 0 00.19.42H5v3.5c0 .28.22.5.5.5h3a.5.5 0 00.5-.5z">
                                        </path>
                                      </svg>
                                    </span>
                                  </span>
                                  {{ tm2.Snu }}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="mp">
                            <span>                        
                              {{ tm2.Fn }} {{ tm2.Ln }}
                            </span>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            <div class="bp">Coaches</div>
              <div class="col-6-sila">
                  <div class="box">
                    <div class="cp" v-for="(tm1, key, index) in lineups" :key="index">
                      <div class="ep" v-if="tm1.Pon == 'COACH'">
                        <div class="fp">
                          <div class="hp ip"></div>
                          <div class="mp">
                            <span>
                              {{ tm1.Fn }} {{ tm1.Ln }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="box">
                    <div class="cp" v-for="(tm2, key, index) in lineups2" :key="index">
                      <div class="ep" v-if="tm2.Pon == 'COACH'">
                        <div class="gp">
                          <div class="hp ip">
                          </div>
                          <div class="mp">
                            <span>                          
                                {{ tm2.Fn }} {{ tm2.Ln }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>

          <div v-if="activeTab === 'H2H'" class="px-2.5">
            <div class="px-1 pb-2 flex items-center gap-2">
            </div>

            <div v-for="(game, idx) in h2hmacth" :key="idx" class="mt-2">
              <div class="flex items-center gap-2 mb-2">
                <img v-if="game.Stg.Ccd" :src="url_logo + game.Stg.Ccd+'.jpg'" alt="" class="w-5 h-3" />
                <img v-else :src="null_logo" alt="" class="w-5 h-3" />
                <div class="grid">
                  <p class="capitalize text-sm font-bold" style="color: #2f2151;">{{ game.Stg.Snm }}</p>
                  <p class="capitalize text-11px text-pry">{{ game.Stg.Cnm }}</p>
                </div>
              </div>
              <div class="bg-fan-primary rounded-lg p-3 flex justify-between items-center" >
                <div class="flex gap-2">
                  <div class="grid gap-2">
                    <p class="text-xxs text-center text-pry font-thin">
                      {{ getFormattedDate(game.Esd) }}
                    </p>
                    <p class="text-11px text-center text-pry font-thin">{{ game.Eps }}</p>
                  </div>
                  <div class="grid gap-1">
                    <div class="flex items-center gap-2" v-for="(team) in game.T1" :key="team">
                      <img :src="url_logo_h2h+team.Img" alt="" class="w-5 h-5" />
                      <p class="text-sm text-pry">{{ team.Nm }}</p>
                    </div>
                    <div class="flex items-center gap-2" v-for="(team2) in game.T2" :key="team2">
                      <img :src="url_logo_h2h+team2.Img" alt="" class="w-5 h-5" />
                      <p class="text-sm text-pry">{{ team2.Nm }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="flex flex-col gap-2">
                    <p class="text-white text-sm">{{ game.Tr1 }}</p>
                    <p class="text-white text-sm">{{ game.Tr2 }}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

      </div>
      <div class="lg:w-4/12 md:w-6/12 lg:flex md:flex flex-col">
        <ProfileFB />
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
  .ep .hp .lp, .ep .mp {
      display: flex;
      flex-direction: column;
  }

  .ep .hp .lp {
      height: 32px;
      justify-content: space-between;
      margin-right: 10px;
  }
  .ep .hp .jp {
      margin: 0;
      width: 50px;
      text-align: center;
  }
  .ep .hp {
      justify-content: space-between;
      padding: 0;
  }

  .ep .fp, .ep .gp, .ep .hp {
      display: flex;
      align-items: center;
  }
  .ep {
      border-radius: 5px;
  }
  .sp .up .vp.tp .Bp {
      right: -8px;
      top: -8px;
  }
  .sp .up .vp.tp .Cp {
      bottom: -8px;
      right: -8px;
  }
  .sp .up .vp .Cp {
      bottom: -4px;
      right: -4px;
  }
  .sp .up .vp .Ap, .sp .up .vp .Bp, .sp .up .vp .Cp, .sp .up .vp .Dp {
      position: absolute;
  }
  .sp .up .vp.tp svg {
      transform: scale(.6);
  }
  .ep svg {
      width: 14px;
      height: 14px;
  }
  .Rn svg {
      max-height: 14px;
      min-width: 14px;
      display: block;
  }
  .sp .up .vp.tp .Cp {
      bottom: -8px;
      right: -8px;
  }
  .bp {
      color: #aaa;
      padding: 13px 15px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
  }
  .col-6-sila {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 5px;
    overflow: hidden;
    /* background: #2f2151; */
  }
  .cp {
      margin: 0px !important;
      border: unset !important;
      border-radius: 0px !important;
  } 
  .ep .fp, .ep .gp, .ep .hp {
      display: flex;
      align-items: center;
  }

  .ep .fp, .ep .gp {
      flex-basis: 100% !important;
      flex-basis: 1;
      width: 100%;
  }
  .ep .hp.ip {
      width: 35px;
  }

  .ep .hp {
      justify-content: space-between;
      padding: 0;
  }
  .sp {
      flex: 1 1;
  }
  .sp .up, .sp .up .vp {
      display: flex;
      justify-content: center;
  }
  .sp .up .vp.tp {
    width: 1rem;
    height: 1rem;
      font-size: 7px;
      background-color: #6f4b98;
      color: #fdfdfd;
      font-weight: 500;
  }

  .sp .up .vp.wp, .sp .up .vp.xp {
      background-color: #6f4b98;
  }
  .ep .mp span {
      font-size: 11px;
      margin: 0;
      line-height: 1.3;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      flex: 1 1;
  }
  .sp .up .vp {
      align-items: center;
      border-radius: 9999px;
      height: 2rem;
      width: 2rem;
      font-weight: 700;
      font-size: .75rem;
      position: relative;
  }

  .sp .up {
      flex: 1 1;
      text-align: center;
  }

  .sp .tp {
      border: 1px solid #fdfdfd;
  }
  .ep .mp {
      margin-top: 1px;
      height: 100%;
      justify-content: center;
      overflow: hidden;
  }

  .ep .hp .lp, .ep .mp {
      display: flex;
      flex-direction: column;
  }
  .ep {
      display: flex;
      color: white;
      font-size: .7rem;
      background-color: #18005194;
      font-size: 11px;
      padding: 12px 10px 12px 0;
      border: solid #fff;
      /* border-width: 0 0 1px; */
      margin: 0;
  }
  .rounded-lg {
      border-radius: 0.5rem;
  }
  .bg-n-gray {
      --tw-bg-opacity: 1;
      background-color: #6f4b98;
  }
  .bg-n-bg-sila-new{
    --tw-bg-opacity: 1;
    background: #2f2151;
    color: white;
    border-radius: 5px;
  }
  .bg-n-bg-gray {
      --tw-bg-opacity: 1;
      background-color: #2f2151;
  }
  .rounded-2xl {
    border-radius: 1rem;
  }

  .rounded-l-lg {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
  }
  .w-1\/3 {
      width: 33.333333%;
  }
  .rounded-r-lg {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
  }
  .justify-end {
      justify-content: flex-end;
  }
  .w-0 {
      width: 0px;
  }
  .bg-n-orange {
      --tw-bg-opacity: 1;
      background-color:#ffe500 !important
  }
  .w-1\/2 {
      width: 50%;
  }
  .h-\[10px\] {
      height: 10px;
  }
  .text-pry {
      --tw-text-opacity: 1;
      color: rgb(170 170 170 / var(--tw-text-opacity));
  }
  .So.awayPlayer {
        text-align: left;
    }
    .So {
        display: flex;
        flex-direction: column;
    }
    .Rn svg {
        max-height: 14px;
        min-width: 14px;
        display: block;
    }
    .Rn {
        position: relative;
        width: 14px;
        max-width: -webkit-max-content;
        max-width: -moz-max-content;
        max-width: max-content;
    }
    .Mo, .Oo {
        font-weight: 700;
        color: #fdfdfd;
    }
    .Mo, .No {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap;
    }
    .Lo.homeContent {
        justify-content: flex-end;
    }
    .So.homePlayer {
        text-align: right;
    }

    .So {
        display: flex;
        flex-direction: column;
    }
    .Ro {
        font-weight: 700;
        color: #fdfdfd;
        font-size: 9px;
    }
    .Ko, .Lo {
        white-space: nowrap;
        align-items: center;
    }
    .Oo {
        display: flex;
        flex-direction: column;
        flex: 0 0 36px;
        text-align: center;
    }
    .Mo, .Oo {
        font-weight: 700;
        color: #fdfdfd;
    }
    .Qo {
        min-width: 34px;
        flex-direction: column;
    }
    .Po, .Qo {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Pf {
        border-radius: 6px;
        /* margin: 4px 10px 10px; */
        /* border: 1px solid #222; */
        border-bottom: none;
    }
    .Ko, .Lo {
      white-space: nowrap;
      align-items: center;
    }
    .So.homePlayer {
        text-align: right;
    }
    .So {
        display: flex;
        flex-direction: column;
    }
    .So.homePlayer {
        text-align: right;
    }
    .Mo, .Oo {
        font-weight: 700;
        color: #fdfdfd;
    }
    .Mo, .No {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap;
    }

    .Ko {
        position: relative;
        font-size: 11px;
    }
    .Po {
        width: 50px;
        min-width: 50px;
        height: 50px;
    }
    .Lo.homeContent {
        justify-content: flex-end;
    }

    .Lo {
        display: flex;
        flex: 1 1;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 50px;
    }
    .Ko, .hm {
        color: #aaa;
        border: solid #222;
        border-width: 0 0 1px;
        display: flex;
        justify-content: space-between;
    }
    .Of button {
        background-color: transparent;
        outline: none;
        border: none;
        color: #2f2151;
        cursor: pointer;
    }
    .Of {
        display: flex;
        justify-content: flex-end;
        padding: 4px;
        border-radius: 3px;
        border-bottom: 1px solid #222;
    }
    .tttt{
      box-sizing: border-box; 
      display: inline-block; 
      overflow: hidden; 
      width: initial; 
      height: initial;
      background: none; 
      opacity: 1; 
      border: 0px; 
      margin: 0px; 
      padding: 0px; 
      position: relative; 
      max-width: 100%
    }
    .Rf {
        color: #aaa;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 12px 10px;
    }
    .rrrr{
      position: absolute; 
      inset: 0px; 
      box-sizing: border-box; 
      padding: 0px; 
      border: none; 
      margin: auto; 
      display: block; 
      width: 0px; 
      height: 0px; 
      min-width: 100%; 
      max-width: 100%; 
      min-height: 100%; 
      max-height: 100%;
    }
    .Sf, .Tf {
        margin: 0 10px;
        display: flex;
    }

    .Sf {
        border-radius: 5px;
        border: 1px solid #222;
        padding: 5px 10px;
        flex-wrap: wrap;
        justify-content: center;
    }
    .Tf, .Tf:last-child {
    border: none;
    }
    .Vf {
        font-size: 11px;
    }
    .Wf {
      padding: 8px;
    }
    .Wf img {
        width: 18px;
        filter: brightness(0) saturate(100%) invert(69%) sepia(25%) saturate(5%) hue-rotate(37deg) brightness(94%) contrast(92%);
    }
    .Uf {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .Tf {
        background: none;
        color: inherit;
        padding: 0;
        align-items: center;
    }
    .Sf, .Tf {
        margin: 0 10px;
        display: flex;
    }
    .qqqq{
      display: block; 
      max-width: 100%; 
      width: initial; 
      height: initial; 
      background: none; 
      opacity: 1; 
      border: 0px; 
      margin: 0px; 
      padding: 0px;
    }
  .pppp{
    box-sizing: border-box;
    display: inline-block; 
    overflow: hidden; 
    width: initial; 
    height: initial; 
    background: none; 
    opacity: 1; 
    border: 0px; 
    margin: 0px; 
    padding: 0px; 
    position: relative; 
    max-width: 100%;
  }
  .oooo{
    box-sizing: border-box;
    display: block;
    width: initial; 
    height: initial; 
    background: none; 
    opacity: 1; 
    border: 0px; 
    margin: 0px; 
    padding: 0px; 
    max-width: 100%;
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
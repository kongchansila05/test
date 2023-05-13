<script>
    import ProfileFB from '../components/ProfileFB.vue'
    import Navbar from '../components/Navbar.vue'
    import { useRoute } from 'vue-router';
    const axios = require("axios");
    import moment from 'moment'
    import en from "../en.js";
    import kh from "../kh.js";
    export default {
        mixins:[en,kh],
        components: {
            Navbar,
            ProfileFB,
        },
        data() {
            return {
            articles:[],
            id:{},
            lang: localStorage.lang,
            }
        },
        mounted(){
            this.getsetup();
            this.getPopular();
        },
        methods: {
            FormDate(value) {
                if (value) {
                    return moment(String(value)).format('MMMM-DD-YYYY')
                }
            },
            getsetup(){
                const route = useRoute()
                this.id = route.params.id;
            },
            //=====articles=========
            getPopular(){
            axios.get("https://admin.sharesport.news/api/popular/"+this.id).then((res)=>{
                this.articles = res.data;
            }).catch(function (error) {
                console.error(error);
            });
            },
            //=====the-end=========

        }
    }
</script>

<template>
    <Navbar/>
    <div class="container">
        <div class="flex min-top-sila flex-col gap-x-2 gap-y-2 md:gap-x-5 md:gap-y-4 lg:gap-x-5 lg:gap-y-4 items-start justify-between lg:py-3 md:flex-row md:py-3 mx-auto">
            <div class="w-full md:w-7/12 lg:w-9/12" v-for="(value, key, index) in  articles " :key="index">
                <div class="flex justify-between text-sm lg:pt-3 md:pt-3 lg:pb-3 md:pb-3 pt-2 pb-2 border-b bg-fan-primary"
                    style="border-radius: 5px 5px 0px 0px;">
                    <div class="gap-x-2 items-center lg:gap-x-1 md:gap-x-1 text-gray-600">
                    <div class="from-blue-900 flex items-center gap-x-2 px-2">
                        <span>
                            <i class="fas fa-newspaper text-white"></i>
                        </span> 
                        <span class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" v-if="lang == 'kh'"> 
                        {{kh.article_detail}}
                        </span>
                        <span class="inline-block text-lg lg:text-lg md:text-lg font-medium text-white" v-else> 
                        {{en.article_detail}}
                        </span>
                    </div>
                    </div> 
                </div>
                <div class=" flex flex-col from-gray-100 gap-y-4 lg:gap-y-4 md:gap-y-4 rounded-md">
                    <div class="bg-transparent rounded px-2">
                
                        <div class="lg:px-0 md:flex-row mx-auto w-full">
                            <div class="items-start justify-start lg:px-0">
                                <div class="flex items-center">
                                    <div class="capitalize font-medium lg:leading-10 lg:text-2xl md:leading-8 md:text-md md:pt-3 lg:pt-3 text-2xl leading-10">
                                        {{value.title}}
                                    </div>
                                </div> 
                                <div class="flex items-center justify-between">
                                    <div class="group flex gap-x-5"><div>
                                            <p class="flex font-medium gap-x-1 items-center leading-none lg:text-base text-gray-600 text-sm">
                                            <span class="font-semibold md:font-medium">                   
                                                    {{FormDate(value.date)}}
                                            </span>
                                            </p>
                                        </div> 
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div class="w-full mx-auto lg:px-0">
                            <div class="content text-gray-200 lg:leading-8 md:leading-8 lg:text-lg md:text-lg text-lg">
                                <p>
                                    <img v-bind:src="'http://admin.sharesport.news/upload/'+ value.photo" 
                                    alt="" width="1200" height="675" class="radis-sila">
                                </p>
                            </div>
                        </div>
                        <p>
                            {{value.detail}}
                        </p>
                        <div class="w-full mx-auto lg:px-0" v-if="value.photo1">
                            <div class="content text-gray-200 lg:leading-8 md:leading-8 lg:text-lg md:text-lg text-lg">
                                <p>
                                    <img v-bind:src="'http://admin.sharesport.news/upload/'+ value.photo1" 
                                    alt="" width="1200" height="675" class="radis-sila">
                                </p>
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
</template>

<style scoped> 
.max-w-6xl {
    max-width: 90% !important;
}
.bg-fan-primary {
    background-color: #2f2151;
}
</style>
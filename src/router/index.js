import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import News from '../view/News.vue'
import Livescore from '../view/Livescore.vue'
import Livestream from '../view/Livestream.vue'
import Highlight from '../view/Highlight.vue'
import ViewArticle from "../view/ViewArticle.vue";
import ViewPopular from "../view/ViewPopular.vue";
import ViewLive from "../view/ViewLive.vue";
import ViewVideo from "../view/ViewVideo.vue";
import GameDetails from "../view/GameDetails.vue";
import Casino from "../view/Casino.vue";
import LiveCasino from "../view/Livecasino.vue";
import Lottol from "../view/Lottol.vue";
import Keno from "../view/Keno.vue";
import Cockfight from "../view/Cockfight.vue";
import Joker from "../view/Joker.vue";
import SportBook from "../view/Sportbook.vue";
import Promotion from "../view/Promotion.vue";
import Kunkhmer from "../view/Kunkhmer.vue";
import Awc from "../view/Awc.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
   
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/livescore',
      name: 'Livescore',
      component: Livescore
    },
    {
      path: '/livestream',
      name: 'Livestream',
      component: Livestream
    },
    {
      path: '/highlight',
      name: 'Highlight',
      component: Highlight
    },
    {
      path: '/casino',
      name: 'Casino',
      component: Casino
    },
      {
      path: '/casino',
      name: 'Casino',
      component: Casino
    },
    {
      path: '/livecasino',
      name: 'Livecasino',
      component: LiveCasino
    },
    {
      path: '/lottol',
      name: 'Lottol',
      component: Lottol
    },
    {
      path: '/keno',
      name: 'Keno',
      component: Keno
    },
    {
      path: '/cockfight',
      name: 'Cockfight',
      component: Cockfight
    },
    {
      path: '/awc',
      name: 'awc',
      component: Awc
    },
    {
      path: '/joker',
      name: 'Joker',
      component: Joker
    },
    {
      path: '/kunkhmer',
      name: 'kunkhmer',
      component: Kunkhmer
    },
    {
      path: '/sportbook',
      name: 'SportBook',
      component: SportBook
    },
    {
      path: '/promotion',
      name: 'Promotion',
      component: Promotion
    },
    {
      path: '/livestream/:id',
      name: 'WatchLive',
      component: ViewLive
     
    },
    {
      path: "/games/:id",
      name: "Game Details",
      component: GameDetails,
    },
    {
      path: "/article/:id",
      name: "Article Details",
      component: ViewArticle,
    },
    {
      path: "/popular/:id",
      name: "Popular Details",
      component: ViewPopular,
    },
    {
      path: "/highligh/:id",
      name: "Video Details",
      component: ViewVideo,
    },

  ]
})

export default router

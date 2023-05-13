import { createApp } from 'vue'
import './assets/sila.css'
import './assets/icons.css'
import './assets/sharesport.css'
import router from './router'
import App from './App.vue'
import VueAnimate from 'vue-animate-scroll'
import VuePlyr from '@altinget/vue-plyr'
import '@altinget/vue-plyr/dist/vue-plyr.css'
import moment from 'moment';
let cors = require("cors");
import timeago from 'vue-timeago3'
import AOS from 'aos';
import 'aos/dist/aos.css';
import VueCountdown from '@chenfengyuan/vue-countdown';
import Countdown from 'vue3-flip-countdown'
import VueSocialSharing from 'vue-social-sharing'
const app = createApp(App)
app.component(VueCountdown.name, VueCountdown);

AOS.init({
    duration: 1000,
  })
app.use(VueSocialSharing)
app.use(Countdown)
app.use(cors)
app.use(moment)
app.use(AOS)
app.use(timeago)
app.use(VuePlyr)
app.use(VueAnimate)
app.use(router)
app.mount('#app')

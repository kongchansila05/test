<script>
import en from "../en.js";
import kh from "../kh.js";
    if (localStorage.lang) {
        localStorage.lang;
    }
    else{
        localStorage.lang ='kh';
    }
    export default {
        mixins:[en,kh],
        name:'NavBar',
        data() {
            return {
            lang: localStorage.lang,
            }
        },
    }
</script>
<template>
        <header class="px-0 v-sheet v-toolbar v-toolbar--flat" style="padding-top:5px;padding-bottom:5px">
                <div class="v-toolbar__content container">
                    <span class="sila">
                    <router-link to="/sportbook" class="nav-link-example v-btn">
                        <button type="button" class="v-btn v-btn--text v-size--default nav__item ">
                            <span class="v-btn__content">
                                <i class="fas fa-list-alt"></i>
                                <P v-if="lang == 'kh'"> កីឡា</P>
                                <P v-else> sportbook</P>
                            </span>
                        </button>
                    </router-link>
                    <router-link to="/livescore" class="nav-link-example v-btn">
                        <button type="button" class="v-btn v-btn--text v-size--default nav__item ">
                            <span class="v-btn__content">
                                <i class="fas fa-futbol white fa-spin"></i>
                                <P v-if="lang == 'kh'"> ពិន្ទុបាល់</P>
                                <P v-else> livescore</P>
                            </span>
                        </button>
                    </router-link>
                    <router-link to="/livestream" class="nav-link-example v-btn">
                        <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                            <span class="v-btn__content">
                                <i class="fas fa-video"></i>
                                <P v-if="lang == 'kh'"> ផ្សាយផ្ទាល់</P>
                                <P v-else> livestream</P>
                            </span>
                        </button>
                    </router-link>
                    <router-link to="/news" class="nav-link-example v-btn">
                        <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                            <span class="v-btn__content">
                                <i class="fas fa-newspaper"></i>
                                <P v-if="lang == 'kh'"> ព័ត៌មានកីឡា</P>
                                <P v-else> News</P>
                            </span>
                        </button>
                    </router-link>
                    <router-link to="/highlight" class="nav-link-example v-btn">
                        <button type="button" class="v-btn v-btn--text v-size--default nav__item">
                            <span class="v-btn__content">
                                <i class="fas fa-photo-video"></i>
                                <P v-if="lang == 'kh'"> ហាយឡាយ</P>
                                <P v-else> highlight</P>
                            </span>
                        </button>
                    </router-link>
                        
                    </span>
                </div>
        </header>

</template>
<style scoped>
header{
    background-color: #2e2151;
}
.sila{
    overflow-x: auto;
    white-space: nowrap;
}
.sila::-webkit-scrollbar {
  display: none;
}
.v-btn__content{
    font-family: 'Roboto','Hanuman' !important;
    font-size:0.8rem;
}
.bd-navbar {
    min-height: 4rem;
    background-color: #6f4b98;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 5%), inset 0 -1px 0 rgb(0 0 0 / 10%);
}
a.router-link-exact-active {
    background-color: #6f4b98 !important;
    color: #fff;
    border-radius: 5px;
}
.sila button:hover{
        background-color: #6f4b98;
        color: #fff;
    }
a{
    color: #fff;
}
</style>
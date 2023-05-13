<script>
// import { useRoute } from 'vue-router';
      // import router from "./router";
    const axios = require("axios");
    const Swal = require('sweetalert2');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token e3543a091350bec511dbe18c6acfcbe4ed4a4b97'
    }
    import $ from 'jquery'
    import Form from 'vform'
    import DaTe from '../components/Date.vue'
    import PopupRegister from '../components/PopupRegister.vue'
    import Chat from '../components/Chat.vue'
    import login from "../login.js";
    import en from "../en.js";
    import kh from "../kh.js";
    if (localStorage.lang) {
      localStorage.lang;
    }
    else{
      localStorage.lang ='kh';
    }
    const current = new Date();
    export default {
      mixins:[en,kh,login],
      components: {
        DaTe,
        PopupRegister,
        Chat,
      },
      data() {
        return { 
          lang: localStorage.lang,
          show: false,
          showModal:false,
          year:`${current.getFullYear()}`,
          footer:[],
          hover: false,
          Showsignup: false,
          submitlogin: false,
          form: new Form({
            username: '',
            password: '',
            cert: 'EHuaa4ckmp5RA2NLaU42Bm'
          }),
          inputemail:true,
          inputpassword:true,
          inputpasswordcf:true,
          cert: 'EHuaa4ckmp5RA2NLaU42Bm'
        }
      },
      computed:{
        routePath(){
          return this.$route.path 
        },
        routeName(){
          return this.$route.name
        },
        
      },

      mounted(){
        this.getfooter();
      },
      
      methods: {
        login(){
          let data = {
            "username": this.form.username,
            "password": this.form.password,
            "cert": "EHuaa4ckmp5RA2NLaU42Bm"
          }
          axios.post(`http://p-api.sbc369.club/api/cash/login/`,data,{
              headers: headers
            }).then((response)=>{
              if(response.status == '200'){
                  this.inputemail = true
                  this.inputpassword = true
                  this.showModal = false
                  $('#exampleModal').hide()
                  $('.modal-backdrop').remove();
                  Swal.fire({
                      title: 'Login Successfully',
                      timer: 500,
                      icon: 'success',
                      showConfirmButton: false,
                  })
                this.submitlogin= false;
                 let rehref = 'https://player.kh88bet.net/?sid='+response.data.sessionid+'&uid='+response.data.userid+'&cert='+this.cert+'&language=EN'
                window.location.href = rehref;
              }
              else{
                this.submitlogin= true;
                this.showModal = false,
                Swal.fire({
                    title: 'Login False',
                    timer: 500,
                    icon: 'success',
                    showConfirmButton: false,
                })
              }
          })
          .catch(error => {
            if(error.response.data.message == 'Username or password is not valid!'){
                Swal.fire({
                    title: 'Username or password is not valid!',
                    timer: 1000,
                    icon: 'error',
                    showConfirmButton: false,
                })
                this.inputemail = false;
                this.inputpassword = false
            }
            this.errored = true
          });
        },
        reloadPage() {
          window.location.reload();
        },
        goToGame(text){
          this.hover = false,
          localStorage.lang = text;
          this.lang = text;
          this.showModal = false
          this.reloadPage();
        },
        display() {
          this.show = !this.show
        },
        popup_lang(){
          this.showModal = true
        },
        //=====footer=========
        getfooter(){
          axios.get("https://admin.sharesport.news/api/footer").then((res)=>{
              this.footer = res.data;
          }).catch(function (error) {
              console.error(error);
          });
          },
        //=====the-end=========
      }
    }
    $('.modal-backdrop').remove()
    $(document.body).removeClass("modal-open");
    $(document).ready(function(){
      $(".exampleModal").click(function(){
        // var fId = '';
        //   if(fId){
        //       localStorage.setItem('fId', "");
        //       fId = "";
        //   }else{
        //       if(localStorage.getItem('fId')){
        //           fId = localStorage.getItem('fId');
        //       }
        //   }
        let params = new URLSearchParams(document.location.search);
              $('.fid-affiliate').val(params.get('fid'));
        // if(params.get('fid')){
        //   localStorage.fid = params.get('fid');
        // }else{
        //   localStorage.removeItem('fid');
        // }
      });
    });
</script>

<template> 

<div style="background-color: #6f4b98;">
  <div class="container">
    <div class="grid-2">
      <div>
        <div class="display-flex-center header-logo-limit logo-hide" style="justify-content: unset;">
          <div class="home-nav__icon-wrapper">
            <router-link to="/" class="nav-item nav-link ">
            <img src="https://player.kh88bet.net/static/kh88bet/images/logo.gif" alt="Nature" class="responsive img-400" width="100">
            </router-link>
          </div>
        </div>
      </div>
      <div>
        <DaTe/>
      </div>
    </div>
  </div>
</div>
<div class="home-nav__match-wrapper home-nav__match-wrapper__app-download " style="background-color: #6f4b98; padding-top: 10px;" >
  <div class="container" style="overflow: visible;">
    <form v-on:submit.prevent="login">
    <div class="display-flex-sb">
      <div class="display-flex-center header-logo-limit hide-300">
        <div class="home-nav__icon-wrapper hide-400">
          <router-link to="/" class="nav-item nav-link ">
          <img src="https://player.kh88bet.net/static/kh88bet/images/logo.gif" alt="Nature" class="responsive img-img" width="100">
          </router-link>
        </div>
      </div>
      <div class="display-flex-center">

          <div class="v-menu d-none d-sm-flex grid-12" v-if="lang == 'kh'">
              <div class="form-group">
                  <input type="text" class="form-control m-hidden text_uper" v-model="form.username" id="username" name="username"  placeholder="បញ្ចូលឈ្មោះអ្នកប្រើ"  style="max-width: 190px;" >
                  <span v-if="form.username == ''">
                    <div style="position: absolute;color: red;" v-if="inputemail==false">បញ្ចូលឈ្មោះអ្នកប្រើ</div>
                  </span>
              </div>
              <div class="form-group">
                  <input type="password" class="form-control m-hidden text_uper" v-model="form.password" id="password" name="password"  placeholder="បញ្ចូលពាក្យសម្ងាត់"  style="max-width: 190px;" >
                  <span v-if="form.password == ''">
                    <div style="position: absolute;color: red;" v-if="inputpassword==false">បញ្ចូលពាក្យសម្ងាត់</div>
                  </span>
              </div>
          </div>
          <div class="v-menu d-none d-sm-flex grid-12" v-if="lang == 'en'">
              <div class="form-group">
                  <input type="text" class="form-control m-hidden text_uper" v-model="form.username" id="username" name="username"  placeholder="USERNAME"  style="max-width: 190px;" >
                  <span v-if="form.username == ''">
                    <div style="position: absolute;color: red;" v-if="inputemail==false">USERNAME</div>
                  </span>

              </div>
              <div class="form-group">
                  <input type="password" class="form-control m-hidden text_uper" v-model="form.password" id="password" name="password"  placeholder="PASSWORD"  style="max-width: 190px;" >
                  <span v-if="form.password == ''">
                    <div style="position: absolute;color: red;" v-if="inputpassword==false">PASSWORD</div>
                  </span>
              </div>
          </div>
          <div class="v-menu d-none d-sm-flex grid-12" v-if="lang == 'th'">
              <div class="form-group">
                  <input type="text" class="form-control m-hidden text_uper" v-model="form.username" id="username" name="username"  placeholder="ชื่อผู้ใช้"  style="max-width: 190px;" >
                  <span v-if="form.username == ''">
                    <div style="position: absolute;color: red;" v-if="inputemail==false">ชื่อผู้ใช้</div>
                  </span>

              </div>
              <div class="form-group">
                  <input type="password" class="form-control m-hidden text_uper" v-model="form.password" id="password" name="password"  placeholder="รหัสผ่าน"  style="max-width: 190px;" >
                  <span v-if="form.password == ''">
                    <div style="position: absolute;color: red;" v-if="inputpassword==false">รหัสผ่าน</div>
                  </span>
              </div>
          </div>
          <div class="v-menu d-none d-sm-flex grid-12" v-if="lang == 'vn'">
              <div class="form-group">
                  <input type="text" class="form-control m-hidden text_uper" v-model="form.username" id="username" name="username"  placeholder="tên tài khoản"  style="max-width: 190px;" >
                  <span v-if="form.username == ''">
                    <div style="position: absolute;color: red;" v-if="inputemail==false">tên tài khoản</div>
                  </span>
              </div>
              <div class="form-group">
                  <input type="password" class="form-control m-hidden text_uper" v-model="form.password" id="password" name="password"  placeholder="mật khẩu"  style="max-width: 190px;" >
                  <span v-if="form.password == ''">
                    <div style="position: absolute;color: red;" v-if="inputpassword==false">mật khẩu</div>
                  </span>
              </div>
          </div>

          <div class=" d-md-flex justify-content-md-end" style="white-space: nowrap;padding-left: 5px;">
              <button class="btn btn-primary me-md-2 btn-lg wd-120 d-none-big">
                <p v-if="lang == 'kh'">ចូល</p> 
                <p v-if="lang == 'en'" class="font-500min">LOGIN</p> 
                <p v-if="lang == 'th'" class="font-500min">เข้าสู่ระบบ</p>
                <p v-if="lang == 'vn'" class="font-500min">đăng nhập</p>
              </button>

               <span class="btn btn-primary me-md-2 btn-lg by-sila-2pd-samll wd-120" @click="showModal = true">
                <p v-if="lang == 'kh'">ចូល</p> 
                <p v-if="lang == 'en'" class="font-500min">LOGIN</p> 
                <p v-if="lang == 'th'" class="font-500min">เข้าสู่ระบบ</p>
                <p v-if="lang == 'vn'" class="font-500min">đăng nhập</p>
              </span>
              <button class="btn btn-primary btn-lg header-limit-pd by-sila-2pd wd-120 exampleModal"  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                <p v-if="lang == 'kh'">ចុះឈ្មោះ</p> 
                <p v-if="lang == 'en'" class="font-500min">REGISTER</p> 
                <p v-if="lang == 'th'" class="font-500min">ลงทะเบียน</p>
                <p v-if="lang == 'vn'" class="font-500min">đăng ký</p>
              </button>
          </div>

          <div class="language-wrapper"  @mouseover="hover = true"
                @mouseleave="hover = false">
            <div class="langauge-selection__wrapper">

              <div class="langauge-selection">
                <i class="fas fa-globe  " style="color: white;"></i>
              </div>
            </div>
              <div class="language-list__wrapper" :class="{ selected: hover }">

                <div class="language-list__container" @click="goToGame('en')">
                  <div class="language-list__name">
                    <img class="img-contain language-list__name-icon" src="/logo/en.svg">
                    <span>English</span> 
                    <span><img src="/icon/active.png" alt="" v-if="lang == 'en'"></span> 
                  </div>
                  <div class="language-list__tick"></div>
                </div>

                <div class="language-list__container" @click="goToGame('kh')">
                  <div class="language-list__name">
                    <img class="img-contain language-list__name-icon" src="/logo/kh.svg"> 
                    <span>ភាសាខ្មែរ</span> 
                    <span><img src="/icon/active.png" alt="" v-if="lang == 'kh'"></span> 
                  </div>
                  <div class="language-list__tick selected"></div>
                </div>

                <div class="language-list__container" @click="goToGame('th')">
                  <div class="language-list__name">
                    <img class="img-contain language-list__name-icon" src="/logo/th.png"> 
                    <span>Thailand</span> 
                    <span><img src="/icon/active.png" alt="" v-if="lang == 'th'"></span> 
                  </div>
                  <div class="language-list__tick selected"></div>
                </div>

                <div class="language-list__container" @click="goToGame('vn')">
                  <div class="language-list__name">
                    <img class="img-contain language-list__name-icon" src="/logo/vn.png"> 
                    <span>Vietnam</span> 
                    <span><img src="/icon/active.png" alt="" v-if="lang == 'vn'"></span> 
                  </div>
                  <div class="language-list__tick selected"></div>
                </div>

              </div>
          </div>

      </div>
    </div>
  </form>
  </div>
</div>

<div class="modal-mask login-sila" v-if="showModal == true" >
  <div class="modal-wrapper">
    <form v-on:submit.prevent="login">

    <div class="modal-container">
      <div class="modal-body">
        <div class="modal-header grid-header" style="padding-top: unset;">
            <div style="text-align: center">
            </div>
            <div style="text-align: center">
                <img src="/benner/logokh88.png" style="width:100%;">
            </div>
            <div style="text-align: center">
            </div>
        </div>
        <div style="padding-top: 5px;"></div>
        <slot name="body">
          <div class="form-group">
            <input v-if="lang == 'kh'" type="text" class="form-control m-hidden text_uper" id="username" name="username" v-model="form.username" placeholder="បញ្ចូលឈ្មោះអ្នកប្រើ">
            <input v-else type="text" class="form-control m-hidden text_uper" id="username" name="username" v-model="form.username" placeholder="USERNAME">
            <span v-if="inputemail==false">
              <div style="color: red;" v-if="form.username == ''">បញ្ចូលឈ្មោះអ្នកប្រើ</div>
            </span>
          </div>
          <div style="padding-top: 5px;"></div>
          <div class="form-group">
            <input v-if="lang == 'kh'" type="password" class="form-control m-hidden text_uper" id="password" v-model="form.password" name="password" placeholder="បញ្ចូលពាក្យសម្ងាត់">
            <input v-else type="password" class="form-control m-hidden text_uper" id="password" v-model="form.password" name="password" placeholder="PASSWORD">
            <span v-if="inputpassword==false">
              <div style="color: red;" v-if="form.password == ''">បញ្ចូលពាក្យសម្ងាត់</div>
            </span>
          </div>
        </slot>
      </div>
      <div style="padding-top: 5px;"></div>
      <div class="modal-footer">
        <slot name="footer">
          <button v-if="lang == 'kh'" class="btn btn-primary " type="button" style="margin-right: 5px;" @click="showModal = false">ត្រឡប់ក្រោយ</button>
          <button v-else class="btn btn-primary " type="button" style="margin-right: 5px;" @click="showModal = false">Back</button>
          <button  v-if="lang == 'kh'" class="btn btn-primary me-md-2 " :class="[name ? activeClass : '']" type="submit">ចូល</button>
          <button v-else class="btn btn-primary me-md-2 " :class="[name ? activeClass : '']" type="submit">Login</button>
        </slot>
      </div>
    </div>
    </form>
  </div>
</div>
<div>

<PopupRegister />
<Chat />

</div>
</template>

<style scoped>
.text_uper {
    text-transform: uppercase !important;
}
.wd-120{
  width: 120px;
}
.mt-2{
  padding-bottom: 20px;
}
.button {
    position: relative;
    font-weight: 800;
    line-height: 20px;
    color: #291b07;
    text-align: center;
    text-transform: uppercase;
    /* border: 1px solid #2f2151 !important; */
    cursor: pointer;
    padding: 9px 21px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important;
    transition: all 0.3s ease-in-out !important;
    background: radial-gradient(50.43% 23.75% at 50.43% 0, #9888c2 0, hsla(0, 0%, 100%, 0) 100%), radial-gradient(65% 65% at 50.43% 0, #603fbaba 0, rgba(255, 225, 150, 0) 100%), linear-gradient(180deg, #2f2151, #603fbaba 99.48%) !important;
    box-shadow: 0 4px 4px rgb(107 102 200 / 25%), inset 0 -4px 8px rgb(98 98 168 / 60%) !important;
    width: 110px !important;
}
.modal-body{
    margin: unset !important;
}
.grid-12 {
    display: grid;
    grid-template-columns: 1fr 1fr !important ;
    grid-template-rows: auto;
}
.modal-header:after, .modal-header:before {
    position: absolute;
    left: 0;
    bottom: 0;
    content: "";
    width: 100%;
    height: 1px;
    background-image: url(https://design.khmergaming.com/template86/images/line-header-modal.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    background: radial-gradient(37.56% 50% at 50% 0, rgba(255, 244, 217, 0.128) 0, rgba(255, 244, 217, 0) 100%), linear-gradient(90deg, rgba(184, 153, 72, 0) 8.42%, rgba(184, 153, 72, 0.2) 50.18%, rgba(184, 153, 72, 0) 88.6%);
}
.btn-primary {
    --bs-btn-color: #fff;
    --bs-btn-bg: #2f2151;
    --bs-btn-border-color: #2f2151;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #2f2151;
    --bs-btn-hover-border-color: #2f2151;
    --bs-btn-focus-shadow-rgb: 49,132,253;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #603fba;
    --bs-btn-active-border-color: #2f2151;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: #2f2151;
    --bs-btn-disabled-border-color: #2f2151;
}
.by-sila-2pd{
  margin-right: 2px;
}

  .modal-content{
    border: solid #6f4b98 2px;
    border-radius: 5px;
    overflow: hidden;
  }
    .modal-header {
        padding: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom: none;
    }
    .modal .modal-content .modal-header .modal-title {
        color: #fff;
        font-size: 24px !important;
        font-family: 'Battambang' !important;
    }
    .modal-title {
        color: #2f2151 !important;
        font-size: 24px !important;
        font-family: 'Battambang' !important;
    }
    .grid-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        padding-top: 10px;
        /* background: #2f2151; */
    }
  input[type="text"], select ,input[type="password"]{
      border: 2px solid;
      border-color: #151f58 !important;
      border-radius: 7px;
      margin-left: 6px;
      color: #151f58;
      font-weight: 600;
      font-family: 'Hanuman', serif;
      height: 49px !important;
  }
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 15px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.login-sila{
  display: none;
}
.Showsignup-sila{
  display: table;
}
.d-none-small{
  display: none !important;
}

.by-sila-2pd-samll{
display: none;
}
@media (max-width: 770px) {
  .login-sila{
    display: table;
  }
  .d-sm-flex {
      display: none!important;
  }
/* .d-none{
  display: n !important;
} */
.d-none-big{
  display: none !important;
}
.by-sila-2pd-samll{
  display: inline-grid !important;
  margin: 5px !important;
}
}
.top_content{
  background: #704c97 !important;
}
 .btn-primary {
        background-color:  #3b2a69;
        --bs-btn-focus-shadow-rgb: none;
        border: none ;
        color: white;
    }
.m-hidden{
    margin: 0 5px 0 5px;
}
.footer-img a:hover img{
  filter: brightness(0) invert(1);
}
.app-redirect__icon-bounce_small{
    width: 3.5rem;
    position: absolute;
    top: -1rem;
    left: 1.11rem;
}
.app-redirect__icon-bounce_live_small{
    width: 1.4rem;
    position: absolute;
    top: 0rem;
    left: -1.4rem;
}
  .nav-link-example span {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none; 
      text-transform: uppercase!important;
  }
  .router-link-exact-active span{
    font-weight: 700;
    color: #ffde4a;
}
  .home-nav__container8{
    display: none;
  }
  .img-img{
    width: 200px;
    padding: 5px;
  }
@media (max-width: 800px) {
  .img-img{
    padding: 0px;
  }
  .home-nav__container{
    display: none !important;
  }
  .home-nav__container8{
    padding-top: 10px;
    display: flex !important;
    margin-left:10% ;
  }
}
.home-nav__child-indicator {
    width: 80%;
    height: 0.2rem;
    background-color: #704c97;
    border-radius: 1rem;
    margin-top: 0.3rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 0.2rem;
    display: block!important;
}
.home-nav__child:hover .home-nav__child-indicator {
    width: 80%;
    height: 0.2rem;
    background-color: #ffde4a;
    border-radius: 1rem;
    margin-top: 0.3rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 0.2rem;
    display: block!important;
}
a.router-link-exact-active {
    color: #ffde4a;
}
.home-nav__child span{
  text-transform: uppercase !important;
}
.home-nav__child:hover span {
    font-weight: 700;
    color: #ffde4a;
}
.nav-pill:hover{
  background-color: #2f2151;
  color: #fff;
}
.language-list__wrapper .language-list__container:hover{
  background: #453176a8 !important;
  border-radius: 5px;
}
.app-redirect__icon-bounce_live{
    width: 1.4rem;
    position: absolute;
    top: -0rem;
    left: -1.3rem;
}
.home-nav__match-wrapper {
    position: relative;
    z-index: 3;
    /* padding: 1.5rem 0; */
    background: #6f4b98;
}
.display-flex-sb {
    align-items: center;
    justify-content: space-between;
}

.display-flex, .display-flex-align-baseline, .display-flex-align-center, .display-flex-align-end, .display-flex-align-start, .display-flex-center, .display-flex-fe, .display-flex-fs, .display-flex-justify-center, .display-flex-sa, .display-flex-sb, .display-flex-sb-t, .display-flex-se {
    display: flex;
}
.app-redirect__icon-bounce{
    width: 3.125rem;
    position: absolute;
    top: -0.8rem;
    left: -2rem;
}
.display-flex-center {
    align-items: center;
    justify-content: center;
}
.pb-0 {
    padding-bottom: 0;
}
.nav-pill__wrapper {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    white-space: nowrap;
}
.language-wrapper{
    position: relative;
}
.langauge-selection__wrapper{
    width: 2.5rem;
    display: flex;
    justify-content: flex-end;
}
.img-contain {
    -o-object-fit: contain;
    object-fit: contain;
}
.langauge-selection,.mobile-default-avatar-wrapper {
    position: relative;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-grey-60);
    cursor: pointer;
}
.language-list__name span{
    color: white;
}
.language-list__wrapper{
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.1rem;
    min-width: 12rem;
    background-color: #2f2151;
    padding: 0.5rem 0.3rem;
    border-radius: 0.5rem;
    transform: scale(0);
    transform-origin: 11.5rem 0;
    transition: all .3s;
}
.language-list__container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    transition: all .3s;
}
.language-list__tick{
    width: 1rem;
    height: 1rem;
}
.language-list__name{
    display: flex;
    align-items: center;
    font-size: .88rem;
}
.language-list__name-icon{
    -o-object-fit: contain;
    object-fit: contain;
    margin-right: 0.7rem;
    width: 1.5rem;
    height: 1.5rem;
}
.app-redirect{
    font-size: .625rem;
    line-height: .875rem;
    font-weight: 700;
    margin-right: 0.75rem;
    display: flex;
    align-items: center;
    position: relative;
}
.app-redirect img{
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
}
.app-redirect__icon{
    width: 2.375rem;
}
.nav-pill {
    border: 0.1rem solid #fff;
    border-radius: 1rem;
    color: #fff;
    padding: 0.25rem 0.7rem;
    margin-right: 0.5rem;
    font-size: .8rem;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    background-color: transparent;
}
.nav-pill.selected {
    background-color: var(--bg-selected)!important;
    color: #000!important;
    border: 0.1rem solid var(--bg-selected)!important;
    font-weight: 700!important;
}
.home-logo {
    width: 5rem;
}
.home-nav__container {
    display: flex;
}
.home-nav__child.selected {
    font-weight: 700!important;
}

.home-nav__child {
    color: #fff;
    margin-right: 1rem;
    transition: all .3s;
    font-size: .88rem;
    cursor: pointer;
    transition: all .25s;
}
.router-link-exact-active span {
    font-weight: 700;
}
.router-link-exact-active .home-nav__child-indicator {
    width: 80%;
    height: 0.2rem;
    background-color: #ffde4a;
    border-radius: 1rem;
    margin-top: 0.3rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 0.2rem;
    display: block!important;
}

.selected .home-nav__child-indicator {
    display: block!important;
}
.home-nav__child {
    color: #fff;
    margin-right: 1rem;
    transition: all .3s;
    font-size: .88rem;
    cursor: pointer;
    transition: all .25s;
}
.relative {
    position: relative;
}
.langauge-selection, .mobile-default-avatar-wrapper {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2e2151;
    cursor: pointer;
}
.language-list__wrapper.selected{
    transform: scale(1);
}



  #nav a{
    border-bottom: 5px solid #6f4b98;
    border-radius: 5px;
  }
  #nav a:hover{
    border-bottom: 5px solid yellow;
    border-radius: 5px;
  }
.bg-fan-sila ul li:hover{
  background-color: #41316c;
}
.yearlo{
  color: rgb(255, 222, 74);
}
.bg-fan-sila{
  background-color: #2e2151;
}
dl, ol, ul {
    margin-bottom: 0px !important;
}
.text-black{
  color: black;
}
.transform ul {
    padding-left: unset !important;
}
.bounce-enter-active {
    animation: bounce-in .5s ease-out both;
}

.bounce-leave-active {
    animation: bounce-in .5s reverse ease-in both;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.10);
    }
    100% {
        transform: scale(1);
    }
}

@media (max-width: 999px) {
  .change_lang{
    display: none
    ;
  }
  .change_lang_min{
    display: block;
  }

}
.grid-2{
    display: grid;
    grid-gap: 1px;
    grid-template-columns: 1fr 1fr ;
    background-color: #6f4b98;
}
.logo-hide{
  display: none !important;
}
@media (max-width: 1000px) {
  .logo-hide{
    display: block !important;
  }
  .hide-400{
    display: none !important;
  }
  .img-400{
    width: 150px;
  }
}
@media (max-width: 900px) {
  .logo-hide{
    display: block !important;
  }
  .hide-400{
    display: none !important;
  }
  .img-400{
    width: 150px;
  }
}
@media (max-width: 800px) {
  .new-mumu{
    display: block !important;
  }
  .logo-hide{
    display: block !important;
  }
  .hide-400{
    display: none !important;
  }
  .img-400{
    width: 150px;
  }
}
@media (max-width: 770px) {
  .new-mumu{
    display: block !important;
  }
  .logo-hide{
    display: none !important;
  }
  .hide-400{
    display: block !important;
  }
  .img-400{
    width: 150px;
  }
}
@media (max-width: 600px) {
  .grid-2 {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: 1fr !important;
    background-color: #6f4b98;
}
}
@media (max-width: 500px) {
  .logo-hide{
    display: block !important;
  }
  .hide-400{
    display: block !important;
  }
  .img-400{
    width: 150px;
    display: none !important;
  }
  .wd-120{
    max-width: 90px;
  }
  .font-500min{
    font-size: 13px;
  }
}
@media (max-width: 400px) {
  .logo-hide{
    display: block !important;
  }
  .img-400{
    width: 150px;
  }
  .font-500min{
    font-size: 13px;
  }
}
@media (max-width: 300px) {
  .hide-300{
    display: none !important;
  }
  .font-500min{
    font-size: 13px;
  }
}
.dropbtn {
  background-color:white;
  color: #2e2151;
  padding: 5px;
  font-size: 16px;
  border: none;
  border-radius: 50px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #2e2151;
  /* margin-right: 180px; */
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  
}

.dropdown-content a:hover {
  background-color: #262230;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #2e2151;
  border-radius: 50px;
  color: white;

}

  .flexby .form-control {
    border-radius: 10px !important;
  }
  .search-icon{
    padding-bottom: 10px;
  }
  .search-type{
    display: none;
  }
  .example {
    display: none;
  }
  .box-highligh::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 999px) {
    .search-btn{
      height: 32px;
      padding-bottom: 10px;
    }
    .search-type .btn {
    /* background-color:rgb(255, 222, 74); */
    border-radius: 0px;color: white;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  input:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
    .search-icon{
      padding-bottom: 8px;
    }
    .search-type{
      display: block;
    }
    .nav-link-example {
        padding-right: 5px ;
        padding-left: 5px ;
        color: white;
    }

    /* .new-mumu{
      display: block;
    } */
    .example {
      /* width: 400px; */
      overflow-x: scroll;
      padding: 10px;
    }

  .example::-webkit-scrollbar {
      display: none;
  }

  .example {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    white-space: nowrap;
  }
}
.nav-link{
margin: 5px;
}

.nav-footer{
  text-align: center;
}
li a{
  color: white !important;
}
.justify-content-end {
    -webkit-box-pack: end !important;
    -ms-flex-pack: end !important;
    justify-content: flex-end !important;
}
.nav-footer-text {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    list-style: none;
    align-items: center;
}
ol, ul, dl {
    margin-top: 0;
    margin-bottom: 1rem;
}
  .secondary {
      background-color: #2e2151 !important;
      border-color: #2e2151 !important;
  }
  div a {
      color: black;
      text-decoration: auto;
  } 
  .from-blue-900 {
      --tw-gradient-from: #2f2151;
      --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(30, 58, 138, 0));
  }
  .bg-blue-900 {
      --tw-bg-opacity: 1;
      background-color: rgba(30, 58, 138, var(--tw-bg-opacity));
  }

  .mt-2 {
      margin-top: 0.5rem;
  }
  .bg-blue-900 {
      --tw-bg-opacity: 1;
      background-color: rgba(30, 58, 138, var(--tw-bg-opacity));
  }
  .mt-2 {
      margin-top: 0.5rem;
  }
  .justify-center {
      justify-content: center;
  }

  .items-center {
      align-items: center;
  }
  @media (max-width: 1000px) {
        .flexby .search {
            display: none;
          }
          .flexby .btn {
            display: none;
          }
    }
  @import url('https://fonts.googleapis.com/css2?family=Hanuman&display=swap');
  #nav a:hover{
    color:rgb(255, 222, 74);
    /* border-bottom: 2px solid; */
    }
  .flexby{
    background-color:white;
    border-radius: 10px;
    max-height: 30px;
    max-width: 220px;
  }
  .flexby .btn {
    /* background-color:rgb(255, 222, 74); */
    /* border-radius: 0px;color: white; */
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  .form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .responsive {
    max-width: 100%;
    height: auto;
  }
  #nav a {
    color: white;
    font-size: 17px;
  }

  #nav a.router-link-exact-active {
    color:rgb(255, 222, 74);
  }
  #nav a.router-link-exact-active {
    color:rgb(255, 222, 74);
  }
  .bg-fan-primary {
      background-color: #6f4b98;
  }
  @media (max-width: 305px) {
    .header-logo-limit{
      display: none;
    }
    .header-limit-pd{
      margin-left: 10px ;
    }
  }
</style>


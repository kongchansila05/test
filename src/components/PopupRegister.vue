<script>
import { useRoute } from 'vue-router';
      // import router from "./router";
    const axios = require("axios");
    const Swal = require('sweetalert2');
    import $ from 'jquery'
    // $('.modal-backdrop').remove();
    import Form from 'vform'
    import { Button, AlertError } from 'vform/src/components/bootstrap5'
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
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token e3543a091350bec511dbe18c6acfcbe4ed4a4b97'
    }
    export default {
      mixins:[en,kh,login],
      components: {
        Button, AlertError,
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
          form: new Form({
            account: '',
            name: '',
            password: '',
            contact: '',
            affiliate: '',
            cert: "EHuaa4ckmp5RA2NLaU42Bm"
          }),
          inputaccount:true,
          inputpassword:true,
          inputpasswordcf:true,
          inputcon:true,
          acclimit:false,
          ready:false,
          numberready:false,
          affiliatefalse:false,
          account: '',
          name: '',
          password: '',
          contact: '',
          affiliate: '',
          cert: "EHuaa4ckmp5RA2NLaU42Bm",
          with:'',
          test:'',
          usernamefix:true,
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
        this.getsetupSila();
        this.getfooter();
      },
      methods: {
        getsetupSila(){
            const route = useRoute()
            this.test=route;
        },
        create () {
          var acc_r = $('#account').val();
          var pass_r = $('#rpassword').val();
          var raffiliate = $('#raffiliate').val();
          var p_r = $('#contact').val();
          if (acc_r.length < 4 ) {
                this.inputaccount = false;
                this.acclimit = false;
                $('#account').focus();
                return false;
          }
          if(pass_r.length < 6){
            this.inputpassword = false;
            $('#rpassword').focus();
            return false;
          }
          if (p_r.length < 6) {
               this.inputcon = false;
              $('#contact').focus();
              return false;
          }
          if(this.usernamefix == false){
            return false;
          }
          if(raffiliate == ''){
            let data = {
              "account": this.form.account,
              "name": '',
              "password": this.form.password,
              "contact": this.form.contact,
              "affiliate": '',
              "cert": "EHuaa4ckmp5RA2NLaU42Bm"
            }

            let datal = {
              "username": this.form.account,
              "password": this.form.password,
              "cert": "EHuaa4ckmp5RA2NLaU42Bm"
            }
            this.acclimit = false,
            this.ready = false,
            axios.post(`http://p-api.sbc369.club/api/cash/registration/`,data,{
                headers: headers,
              }).then((response)=>{
                
            if(response.status == '201'){
              axios.post(`http://p-api.sbc369.club/api/cash/login/`,datal,{
                  headers: headers
                }).then((response)=>{
                  if(response.status == '200'){
                    this.inputaccount = true
                    this.inputpassword = true
                    this.showModal = false
                    $('#exampleModal').hide()
                    $('.modal-backdrop').remove();
                    Swal.fire({
                        title: 'Create Successfully',
                        timer: 500,
                        icon: 'success',
                        showConfirmButton: false,
                    })
                  let rehref = 'http://player.kh88bet.net/?sid='+response.data.sessionid+'&uid='+response.data.userid+'&cert='+this.cert+'&language=EN'
                  window.location.href = rehref;
                }
              });
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
              if(error.response.data.message == 'Minimum username 6 digits and maxiumm 10 digits!'){
                  this.inputaccount = false;
                  this.inputpassword = false;
                  this.acclimit = true;
              }
              else if(error.response.data.message == 'Something went wrong, pls try again!'){
                  this.acclimit = false;
                  this.inputaccount = true;
                  this.inputpassword = false;
              }
              else if(error.response.data.message == 'The account is already exists!'){
                  this.ready = true;
              }
              else if(error.response.data.message == 'The phone number is already exists!'){
                this.numberready = true;
              }
              this.errored = true
            });
          }else{
            
            let data = {
              "account": this.form.account ,
              "name": '',
              "password": this.form.password,
              "contact": this.form.contact,
              "affiliate": raffiliate,
              "cert": "EHuaa4ckmp5RA2NLaU42Bm"
            }
            
            let datal = {
              "username": this.form.account,
              "password": this.form.password,
              "cert": "EHuaa4ckmp5RA2NLaU42Bm"
            }
            this.acclimit = false,
            this.ready = false,
            axios.post(`http://p-api.sbc369.club/api/cash/registration/`,data,{
                headers: headers,
              }).then((response)=>{
                console.log(response);
                if(response.status == '201'){
                  axios.post(`http://p-api.sbc369.club/api/cash/login/`,datal,{
                      headers: headers
                    }).then((response)=>{
                      if(response.status == '200'){
                        this.inputaccount = true
                        this.inputpassword = true
                        this.showModal = false
                        $('#exampleModal').hide()
                        $('.modal-backdrop').remove();
                        Swal.fire({
                            title: 'Create Successfully',
                            timer: 500,
                            icon: 'success',
                            showConfirmButton: false,
                        })
                      let rehref = 'http://player.kh88bet.net/?sid='+response.data.sessionid+'&uid='+response.data.userid+'&cert='+this.cert+'&language=EN'
                      window.location.href = rehref;
                    }
                  });
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
              console.log(error.response.data.message);
              if(error.response.data.message == 'Minimum username 6 digits and maxiumm 10 digits!'){
                  this.inputaccount = false;
                  this.inputpassword = false;
                  this.acclimit = true;
              }
              else if(error.response.data.message == 'Something went wrong, pls try again!'){
                  this.acclimit = false;
                  this.inputaccount = true;
                  this.inputpassword = false;
              }
              else if(error.response.data.message == 'The account is already exists!'){
                  this.ready = true;
              }
              else if(error.response.data.message == 'The phone number is already exists!'){
                this.numberready = true;
              }
              else if(error.response.data.message == 'Affiliate is not valid, pls check again!'){
                this.affiliatefalse = true;
              }
              this.errored = true
            });
          }
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
         containsTextAndNumber(input) {
          return /[a-zA-Z]/.test(input) && /\d/.test(input) || /[a-zA-Z]/.test(input);
        },
        parseValueToName(param) {
          this.containsTextAndNumber(param)
          if(this.containsTextAndNumber(param) == false){
            this.usernamefix = false
          }else{
            this.usernamefix = true
            this.inputaccount = true;
            this.ready = false;
            this.form.name = param;
            let Account = {
              "account": param,
            }
            axios.post(`http://p-api.sbc369.club/api/cash/check_name/`,Account,{
                headers: headers
              }).then((response)=>{
                $('.grid-header').val(response);
            });
          }
        },
        parseValueToPass(param) {
            if(param){
              this.inputpassword   = true;
            }
        },
        parseValueToCon(param) {
            if(param){
              this.inputcon   = true;
            }
        },
        //=====the-end=========
      }
    }

    $('.modal-backdrop').remove()
    $(document.body).removeClass("modal-open");
</script>
<template>
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" role="dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
              <div class="modal-header grid-header">
                  <div style="text-align: center">
                  </div>
                  <div style="text-align: center">
                      <img src="/benner/logokh88.png" style="width:100%;">
                  </div>
                  <div style="text-align: center">
                  </div>
              </div>
            <form @submit.prevent="create" @keydown="form.onKeydown($event)">
              <AlertError :form="form" />
              <div class="modal-body">
                  <div class="mb-3">
                    <input v-if="lang == 'kh'" class="form-control text_uper" v-model="form.account" @keyup="parseValueToName(form.account)" placeholder="គណនីរបស់អ្នក" id="account" name="account" type="text">
                    <input v-if="lang == 'en'" class="form-control text_uper" v-model="form.account" @keyup="parseValueToName(form.account)" placeholder="USERNAME" id="account" name="account" type="text">
                    <input v-if="lang == 'th'" class="form-control text_uper" v-model="form.account" @keyup="parseValueToName(form.account)" placeholder="บัญชี" id="account" name="account" type="text">
                    <input v-if="lang == 'vn'" class="form-control text_uper" v-model="form.account" @keyup="parseValueToName(form.account)" placeholder="Tài khoản" id="account" name="account" type="text">
                 
                    <span  v-if="lang == 'kh'" style="color: red;">
                      <span v-if="ready == true">គណនីមានរួចហើយ!</span>
                    </span>
                    <span  v-if="lang == 'en'" style="color: red;">
                      <span v-if="ready == true">The account is already exists!</span>
                    </span>
                    <span  v-if="lang == 'th'" style="color: red;">
                      <span v-if="ready == true">มีบัญชีอยู่แล้ว!</span>
                    </span>
                    <span  v-if="lang == 'vn'" style="color: red;">
                      <span v-if="ready == true">Tài khoản đã tồn tại!</span>
                    </span>
                    <span v-if="form.account == ''"  >
                      <div style="color: red;" v-if="inputaccount==false">
                        <span  v-if="lang == 'kh'">គណនីអ្នកប្រើប្រាស់មិនត្រឹមត្រូវ</span>
                        <span  v-if="lang == 'en'">USERNAME</span>
                        <span  v-if="lang == 'th'">บัญชี</span>
                        <span  v-if="lang == 'vn'">Tài khoản</span>
                      </div>
                    </span>
                    <span v-if="form.account != ''">
                      <div style="color: red;" v-if="inputaccount==false">
                        <span  v-if="lang == 'kh'">
                          <span v-if="acclimit == true">Minimum username 6 digits and maxiumm 10 digits!</span>
                        </span>
                        <span  v-if="lang == 'en'">
                          <span v-if="acclimit == true">Minimum username 6 digits and maxiumm 10 digits!</span>
                          <span v-if="ready == true">The account is already exists!</span>
                        </span>
                        <span  v-if="lang == 'th'">
                          <span v-if="acclimit == true">ชื่อผู้ใช้ขั้นต่ำ 6 หลักและสูงสุด 10 หลัก!</span>
                        </span>
                        <span  v-if="lang == 'vn'">
                          <span v-if="acclimit == true">Tên người dùng tối thiểu 6 chữ số và tối đa 10 chữ số!</span>
                        </span>
                      </div>
                    </span>

                    <div style="color: red;" v-if="usernamefix==false">
                      <span  v-if="lang == 'kh'">ឈ្មោះអ្នកប្រើត្រូវការអក្សរនិងលេខ</span>
                      <span  v-if="lang == 'en'"> Username Need Letter and Number</span>
                      <span  v-if="lang == 'th'">ชื่อผู้ใช้ต้องมีตัวอักษรและตัวเลข</span>
                      <span  v-if="lang == 'vn'">tên người dùng cần chữ cái và số</span>
                    </div>
                    
                  </div>
                  <!-- <div class="mb-3">
                    <input v-if="lang == 'kh'" class="form-control text_uper" v-model="form.name" placeholder="បង្កើតឈ្មោះរបស់អ្នក" id="name" name="name" type="text">
                    <input v-if="lang == 'en'" class="form-control text_uper" v-model="form.name" placeholder="USERNAME" id="name" name="name" type="text">
                    <input v-if="lang == 'th'" class="form-control text_uper" v-model="form.name" placeholder="ชื่อผู้ใช้" id="name" name="name" type="text">
                    <input v-if="lang == 'vn'" class="form-control text_uper" v-model="form.name" placeholder="tên tài khoản" id="name" name="name" type="text">
                  </div> -->

                  <div class="mb-3">
                    <input v-if="lang == 'kh'"  class="form-control text_uper" v-model="form.password" @keyup="parseValueToPass(form.password)" placeholder="ពាក្យសម្ងាត់" id="rpassword" name="password" type="password">
                    <input v-if="lang == 'en'"  class="form-control text_uper" v-model="form.password" @keyup="parseValueToPass(form.password)" placeholder="PASSWORD" id="rpassword" name="password" type="password">
                    <input v-if="lang == 'th'"  class="form-control text_uper" v-model="form.password" @keyup="parseValueToPass(form.password)" placeholder="รหัสผ่าน" id="rpassword" name="password" type="password">
                    <input v-if="lang == 'vn'"  class="form-control text_uper" v-model="form.password" @keyup="parseValueToPass(form.password)" placeholder="Mật khẩu" id="rpassword" name="password" type="password">
                      <div style="color: red;" v-if="inputpassword==false">
                        <span  v-if="lang == 'kh'">ពាក្យសម្ងាត់មិនត្រឹមត្រូវ</span>
                        <span  v-if="lang == 'en'"> INVALID PASSWORD</span>
                        <span  v-if="lang == 'th'">รหัสผ่านไม่ถูกต้อง</span>
                        <span  v-if="lang == 'vn'">mật khẩu không hợp lệ</span>
                      </div>

                  </div>
           
                  <div class="mb-3">
                    <input v-if="lang == 'kh'" class="form-control text_uper" v-model="form.contact" @keyup="parseValueToCon(form.contact)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="លេខទូរស័ព្ទ" id="contact" name="contact" type="text">
                    <input v-if="lang == 'en'" class="form-control text_uper" v-model="form.contact" @keyup="parseValueToCon(form.contact)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"  placeholder="PHONE" id="contact" name="contact" type="text">
                    <input v-if="lang == 'th'" class="form-control text_uper" v-model="form.contact" @keyup="parseValueToCon(form.contact)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="โทรศัพท์" id="contact" name="contact" type="text">
                    <input v-if="lang == 'vn'" class="form-control text_uper" v-model="form.contact" @keyup="parseValueToCon(form.contact)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="điện thoại" id="contact" name="contact" type="text">
                  
                    <span  v-if="form.contact != ''">
                      <span  v-if="inputcon == true">
                        <span  v-if="numberready == true">
                            <span  style="color: red;" v-if="lang == 'kh'">លេខទូរស័ព្ទមានហើយ!</span>
                            <span  style="color: red;" v-if="lang == 'en'">The phone number is already exists!</span>
                            <span  style="color: red;" v-if="lang == 'th'">มีหมายเลขโทรศัพท์อยู่แล้ว!</span>
                            <span  style="color: red;" v-if="lang == 'vn'">Số điện thoại đã tồn tại!</span>
                        </span>
                      </span>
                      <span  v-else>
                          <span  style="color: red;" v-if="lang == 'kh'">ទូរស័ព្ទមិនត្រឹមត្រូវ!</span>
                          <span  style="color: red;" v-if="lang == 'en'">INVALID NUMBER!</span>
                          <span  style="color: red;" v-if="lang == 'th'">หมายเลขไม่ถูกต้อง!</span>
                          <span  style="color: red;" v-if="lang == 'vn'">SỐ KHÔNG HỢP LỆ!</span>
                        </span>
                    </span> 
                    <span  v-if="form.contact == ''">
                        <span  v-if="inputcon == false">
                          <span  style="color: red;" v-if="lang == 'kh'">ទូរស័ព្ទមិនត្រឹមត្រូវ!</span>
                          <span  style="color: red;" v-if="lang == 'en'">INVALID NUMBER!</span>
                          <span  style="color: red;" v-if="lang == 'th'">หมายเลขไม่ถูกต้อง!</span>
                          <span  style="color: red;" v-if="lang == 'vn'">SỐ KHÔNG HỢP LỆ!</span>
                      </span>
                    </span>

                  </div>
                  <div class="mb-3">
                    <input v-if="lang == 'kh'" class="form-control text_uper fid-affiliate" placeholder="បុត្រសម្ព័ន្ធ" name="affiliate" type="text" readonly id="raffiliate" >
                    <input v-if="lang == 'en'"  class="form-control text_uper fid-affiliate" placeholder="AFFILIATE" name="affiliate" type="text" readonly id="raffiliate" >
                    <input v-if="lang == 'th'"  class="form-control text_uper fid-affiliate" placeholder="พันธมิตร" name="affiliate" type="text" readonly id="raffiliate" >
                    <input v-if="lang == 'vn'"  class="form-control text_uper fid-affiliate" placeholder="liên kết" name="affiliate" type="text" readonly id="raffiliate" >
                    <span  v-if="affiliatefalse == true">
                        <span  style="color: red;" v-if="lang == 'kh'">បុត្រសម្ព័ន្ធមិនត្រឹមត្រូវទេ សូមពិនិត្យម្តងទៀត!!</span>
                        <span  style="color: red;" v-if="lang == 'en'">Affiliate is not valid, pls check again!</span>
                        <span  style="color: red;" v-if="lang == 'th'">พันธมิตรไม่ถูกต้อง โปรดตรวจสอบอีกครั้ง!</span>
                        <span  style="color: red;" v-if="lang == 'vn'">Đơn vị liên kết không hợp lệ, vui lòng kiểm tra lại!</span>
                    </span>
                  </div>
              </div>
              <div class="modal-footer">
                <Button :form="form" class="btn btn-primary button" >
                  <p v-if="lang == 'kh'">ចុះឈ្មោះ</p> 
                  <p v-if="lang == 'en'">REGISTER</p> 
                  <p v-if="lang == 'th'">ลงทะเบียน</p> 
                  <p v-if="lang == 'vn'">đăng ký</p> 
                  </Button>
              </div>
              <div class="mt-2">
                  <div style="text-align: center;">
                        <p v-if="lang == 'kh'">លក្ខខណ្ឌ</p> 
                        <p v-if="lang == 'en'">Terms & Conditions</p> 
                        <p v-if="lang == 'th'">ข้อตกลงและเงื่อนไข</p> 
                        <p v-if="lang == 'vn'">Điều khoản và điều kiện</p> 
                  </div>
                  <div style="text-align: center;">
                      <span> 
                        <p v-if="lang == 'kh'">តើអ្នកមានគណនីរួចហើយឬនៅ?</p> 
                        <p v-if="lang == 'en'">Do you already have an account ? </p>  
                        <p v-if="lang == 'th'">คุณมีบัญชีอยู่แล้ว ? </p>  
                        <p v-if="lang == 'vn'">Bạn đã có tài khoản chưa ?</p>  
                        <a href="/">
                          <b v-if="lang == 'kh'">ចូលឥឡូវនេះ</b>
                          <b v-if="lang == 'en'">LOGIN NOW</b>
                          <b v-if="lang == 'th'">ลงชื่อเข้าใช้ตอนนี้</b>
                          <b v-if="lang == 'vn'">Đăng nhập ngay</b>
                        </a></span>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  <!-- Modal End-->
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
@media (max-width: 770px) {
  .login-sila{
    display: table;
  }
.d-none{
  display: none !important;
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
    font-size: 15px;
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
    font-size: 15px;
  }
}
@media (max-width: 300px) {
  .hide-300{
    display: none !important;
  }
  .font-500min{
    font-size: 15px;
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


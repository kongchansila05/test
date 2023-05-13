<template>
    <div class="fb-customerchat"
      :page_id="pageId"
      :theme_color="themeColor"
      :logged_in_greeting="loggedInGreeting"
      :logged_out_greeting="loggedOutGreeting">
    </div>
  </template>
  
  <script>
  export default {
    name: 'FacebookChatPlugin',
    data() {
      return {
        pageId: '104319282592472',
        themeColor: '#0078FF',
        loggedInGreeting: 'Hi there! How can we help you today?',
        loggedOutGreeting: 'Hi there! How can we help you today?'
      }
    },
    mounted() {
      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml            : true,
          version          : 'v12.0'
        });
      };
    
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }
  </script>
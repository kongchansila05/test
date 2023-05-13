<template>
    <div class="profile-card">
      <div class="profile-image">
        <img />
      </div>
      <div class="grid-footer">
        <div class="profile-info left-btm">
          <span />
        </div>
        <div class="profile-info right-btm">
          <span />
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .left-btm{
    background-color: #6f4b98;
    border-radius: 0px 0px 0px 15px;
    overflow: hidden;
  }
  .right-btm{
    background-color: #3b2a69;
    overflow: hidden;
    border-radius: 0px 0px 15px 0px;
  }
  .grid-footer{
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      padding-top: 1px;
  }
  .profile-image img {
    width: 100%;
    padding-top: 100%;
    animation: pulse-bg 1s infinite;
    border-radius: 15px 15px 0px 0px;

  }
  
  .profile-info span {
    width: 100%;
    height: 80px;
    display: block;
    /* animation: pulse-bg 1s infinite; */
  }
  
  
  .profile-info p {
    width: 80%;
    height: 16px;
    animation: pulse-bg 1s infinite;
  }
  
  @keyframes pulse-bg {
    0% {
      background-color: #eee;
    }
    50% {
      background-color: #eaeaea;
    }
    100% {
      background-color: #eee;
    }
  }
  </style>
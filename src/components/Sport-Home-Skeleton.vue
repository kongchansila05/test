<template>
      <div class="profile-image">
      </div>
  </template>
  
  <style scoped>
  .profile-image {
    width: 100%;
    padding-top: 20%;
    animation: pulse-bg 1s infinite;
    border-radius: 10px;

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
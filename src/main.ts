import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAjB53WmwCMf3hOHeYQiG-ZpY26xCFQl3s",
  authDomain: "skillsdemo-2e3d6.firebaseapp.com",
  databaseURL: "https://skillsdemo-2e3d6.firebaseio.com",
  projectId: "skillsdemo-2e3d6",
  storageBucket: "skillsdemo-2e3d6.appspot.com",
  messagingSenderId: "378463088653"
};

firebase.initializeApp(config);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

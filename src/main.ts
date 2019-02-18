import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from "firebase";
import BootstrapVue from 'bootstrap-vue';
import FireBaseConfig from './FireBaseConfig';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faFileDownload);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);

// Create a firebase config file with the following code
/*export default class FireBaseConfig {
  public data = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId"
  };
}*/


const firebaseconfig = new FireBaseConfig();
firebase.initializeApp(firebaseconfig.data);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

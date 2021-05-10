import Vue from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL : 'https://rest.sintasi.com/latihan/quasar'
});

Vue.prototype.$api = api;

Vue.prototype.$axios = axios;

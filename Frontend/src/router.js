import Vue from 'vue'
import Router from 'vue-router'
import BarcodeForm from './components/BarcodeForm.vue'
import Product from './components/product.vue'
import Sell from './components/sell.vue'
import Recipant from './components/recipant.vue'
import Send from './components/send.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      path: '/home',
      name: 'Home',
      components: { default: BarcodeForm }
    },
    {
      path: '/product',
      name: 'Product',
      components: { default: Product }
    },
    {
      path: '/sell',
      name: 'Sell',
      components: { default: Sell }
    },
    {
      path: '/recipant',
      name: 'Recipant',
      components: { default: Recipant }
    },
    {
      path: '/send',
      name: Send,
      components: { default: Send }
    }
  ]
})

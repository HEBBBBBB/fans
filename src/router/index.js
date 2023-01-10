import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloWorld from '../components/HelloWorld.vue'
import SaleList from '../components/SaleList.vue'
import RankList from '../components/RankList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home',
    name: 'index',
    component: HomeView,
    children: [
      {
        path: 'home',
        component:HelloWorld
      },
      {
        path: 'saleNo',
        component:SaleList
      },
      
      {
        path: 'rank',
        component:RankList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

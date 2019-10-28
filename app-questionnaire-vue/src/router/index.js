import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Survey from '../components/Survey'
import Score from "../components/Score";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/survey/:id',
    props: true,
    name: 'survey',
    component: Survey
  },
  {
    path: '/score',
    props: true,
    name: 'score',
    component: Score
  }
]

const router = new VueRouter({
  routes
})

export default router

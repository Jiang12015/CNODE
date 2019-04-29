import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/views/Article'
import PostList from '@/views/PostList.vue'
import UserInfo from './components/UserInfo'
import SlideBar from './components/SlideBar'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      name: 'root',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
      name: 'post_content',
      path: '/topic/:id&author=:name',
      components: {
        main: Article,
        slidebar: SlideBar
      }
    },
    {
      name: 'user_info',
      path: '/userinfo/:name',
      components: {
        main: UserInfo
      }
    },
  ]
})

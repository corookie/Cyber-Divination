import {createRouter,createWebHashHistory, RouteRecordRaw} from 'vue-router'


import Home from '../views/homePage.vue'
import Chat from '../views/chatPage.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path : '/', name :'Home',component : Home
    },
    {
        path : '/chat' ,name:'Chat', component : Chat
    }
]
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes
})

export default router
import { createMemoryHistory, createRouter } from 'vue-router'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/register', component: SignUp }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
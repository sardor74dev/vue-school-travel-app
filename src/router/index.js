import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import sourceData from '../data.json';
// import NotFound from '../views/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/protected',
        name: 'protected',
        component: () => import('../views/Protected.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/invoices',
        name: 'invoices',
        component: () => import('../views/Invoices.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/destination/:id/:slug',
        name: 'destination.show',
        component: () => import('../views/DestinationShow.vue'),
        props: route => ({...route.params, id: parseInt(route.params.id)}),
        beforeEnter(to, from){
            const exists = sourceData.destinations.find(
                destination => destination.id === parseInt(to.params.id) && destination.slug === to.params.slug
            )
            if (!exists){
                return {
                    name: 'Not Found',
                    params: { pathMatch: to.path.split('/').slice(1) },
                    query: to.query,
                    hash: to.hash
                }
            }
        },
        children: [
            {
                path: ':experienceSlug',
                name: 'experience.show',
                component: () => import('../views/ExperienceShow.vue'),
                props: route => ({...route.params, id: parseInt(route.params.id)})
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Not Found',
        component: () => import('../views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition){
        return savedPosition || new Promise((resolve) => {
            setTimeout(() => resolve({top: 0}), 300)
        })
    }
    // linkActiveClass: 'active-link'
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !window.user){
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        }
    }
})

export default router
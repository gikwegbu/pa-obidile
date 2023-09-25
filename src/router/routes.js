import { useDbStore } from 'stores/db'


const routes = [
  {
    path: '/',
    name: "Website",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        name: "Index",
        component: () => import('pages/IndexPage.vue') 
      }
    ]
  },
  {
    path: '/auth',
    name: "Auth",
    component: () => import('pages/admin/login.vue'), // Login
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    beforeEnter(to,from) {
      if(!useDbStore().getAdminDetails.token.length) {
        alert("Bia nwanne, wetin you find come here??, oya go login osiso ?  😂")
        return '/auth';
      }
    },
    children: [
      {
        path: 'dashboard',
        name: "Dashboard",
        component: () =>  import('pages/admin/dashboard.vue'), // dashboard
      },
      {
        path: 'gallery',
        name: "Gallery",
        component: () =>  import('pages/admin/photo_gallery.vue'), // gallery
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

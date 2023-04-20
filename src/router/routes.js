const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'menu', component: () => import('pages/Menu.vue') },
      { path: 'info', component: () => import('pages/GameInfo.vue') },
      { path: 'start', component: () => import('pages/StartGame.vue') },
      { path: 'dev', component: () => import('pages/Dev.vue') },
      // { path: 'start', component: () => import('pages/testCam.vue') },
      { path: 'model', component: () => import('components/model.json') },
      // { path: 'model', component: () => import('../services/model_v1.json') },
      // { path: 'testmodel', component: () => import('pages/ModelTest.vue') }
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

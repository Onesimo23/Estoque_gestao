const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '', // Rota padrão
        name: 'loginDefault',
        component: () => import('pages/Login.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/Register.vue')
      },
      {
        path: 'forgotpassword',
        name: 'forgotpassword',
        component: () => import('pages/ForgotPassword.vue')
      }

    ]
  },
  {
    path: '/', // Rota para a área principal do seu aplicativo
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // {
      //   path: 'main', // Página inicial da área principal
      //   name: 'main',
      //   component: () => import('pages/Index.vue')
      // },
      {
        path: '/index',

        component: () => import('pages/Index.vue')
      },
      {
        path: '/user',

        component: () => import('pages/User.vue')
      },
      {
        path: '/product',

        component: () => import('src/pages/product.vue')
      }

    ]
  },
  {
    path: '/me', // Adicione uma rota para a página 'me'
    name: 'me',
    component: () => import('pages/Me.vue') // Substitua 'Me.vue' pelo nome correto do seu componente
  },
  // ...
  {
    path: '/:catchAll(.*)*', // Rota para lidar com URLs não correspondidas
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;

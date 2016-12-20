import Main from './views/main.vue'

import Test from './views/main/test.vue'

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/test',
        name: 'test',
        component: Test
      }
    ]
  }
]

export default routes

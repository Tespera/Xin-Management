import Container from './views/Container.vue'

import Login from './components/Login.vue'

import StoreManage from './views/StoreManage.vue'
import StoreDetils from './views/StoreManage/StoreDetils.vue'
import CarModels from './views/StoreManage/CarModels.vue'
import CarList from './views/StoreManage/CarList.vue'

const routes = [
  {
    path: '/',
    component: Container,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'stores',
        name: 'StoreManage',
        component: StoreManage,
        children: [
          {
            path: 'details',
            name: 'StoreDetils',
            component: StoreDetils
          },
          {
            path: 'models',
            name: 'CarModels',
            component: CarModels
          },
          {
            path: 'carlist',
            name: 'CarList',
            component: CarList
          }
        ]
      }
    ]
  }
]

export default routes

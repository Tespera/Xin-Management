import Container from './views/Container.vue'

import Login from './components/Login.vue'

import StoreManage from './views/StoreManage.vue'
import StoreDetils from './views/StoreManage/StoreDetils.vue'
import CarModels from './views/StoreManage/CarModels.vue'
import CarList from './views/StoreManage/CarList.vue'

import PlatformSetting from './views/PlatformSetting.vue'

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
        path: 'platform',
        name: 'Platform',
        meta: { navIndex: '2'},
        component: PlatformSetting
      },
      {
        path: 'stores',
        name: 'StoreManage',
        component: StoreManage,
        meta: { navIndex: '1'},
        children: [
          {
            path: 'details',
            name: 'StoreDetils',
            meta: { navIndex: '1'},
            component: StoreDetils
          },
          {
            path: 'models',
            name: 'CarModels',
            meta: { navIndex: '1'},
            component: CarModels
          },
          {
            path: 'carlist',
            name: 'CarList',
            meta: { navIndex: '1'},
            component: CarList
          }
        ]
      }
    ]
  }
]

export default routes

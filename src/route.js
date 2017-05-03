import Container from './views/Container.vue'

import Login from './components/Login.vue'

import StoreManage from './views/StoreManage.vue'
import StoreDetils from './views/StoreManage/StoreDetils.vue'
import CarModels from './views/StoreManage/CarModels.vue'
import CarList from './views/StoreManage/CarList.vue'

import CarMaintain from './views/CarMaintain.vue'
import StoreMaintain from './views/CarMaintain/StoreMaintain.vue'
import Coupon from './views/CarMaintain/Coupon.vue'


import PlatformSetting from './views/PlatformSetting.vue'
import MaintainSetting from './views/CarMaintain/MaintainSetting.vue'

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
        meta: { navIndex: '1-2'},
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
            meta: { navIndex: '1-1'},
            component: StoreDetils
          },
          {
            path: 'models',
            name: 'CarModels',
            meta: { navIndex: '1-1'},
            component: CarModels
          },
          {
            path: 'carlist',
            name: 'CarList',
            meta: { navIndex: '1-1'},
            component: CarList
          }
        ]
      },
      {
        path: 'maintain',
        name: 'CarMaintain',
        component: CarMaintain,
        meta: { navIndex: '2'},
        children: [
          {
            path: 'sotre',
            name: 'StoreMaintain',
            meta: { navIndex: '2-1'},
            component: StoreMaintain
          },
          {
            path: 'coupon',
            name: 'Coupon',
            meta: { navIndex: '2-2'},
            component: Coupon
          },
          {
            path: 'setting',
            name: 'MaintainSetting',
            meta: { navIndex: '2-3'},
            component: MaintainSetting
          }
        ]
      }
    ]
  }
]

export default routes

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

import PlatformInfo from './views/PlatformInfo.vue'
import ArticleList from './views/PlatformInfo/ArticleList.vue'
import AddArticle from './views/PlatformInfo/AddArticle.vue'
import EditArticle from './views/PlatformInfo/EditArticle.vue'
import ArticleType from './views/PlatformInfo/ArticleType.vue'

import UserManage from './views/UserManage.vue'
import UserList from './views/UserManage/UserList.vue'

import OrderManage from './views/OrderManage.vue'
import OrderList from './views/OrderManage/OrderList.vue'
import MaintainOrder from './views/OrderManage/MaintainOrder.vue'

import EnquiryManage from './views/EnquiryManage.vue'
import EnquiryUnprocessed from './views/EnquiryManage/EnquiryUnprocessed.vue'
import EnquiryProcessed from './views/EnquiryManage/EnquiryProcessed.vue'

import CommentsManage from './views/CommentsManage.vue'
import HandleComments from './views/CommentsManage/HandleComments.vue'

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
        meta: { navIndex: '1-2' },
        component: PlatformSetting
      },
      {
        path: 'stores',
        name: 'StoreManage',
        component: StoreManage,
        meta: { navIndex: '1' },
        children: [
          {
            path: 'details',
            name: 'StoreDetils',
            meta: { navIndex: '1-1' },
            component: StoreDetils
          },
          {
            path: 'models',
            name: 'CarModels',
            meta: { navIndex: '1-1' },
            component: CarModels
          },
          {
            path: 'carlist',
            name: 'CarList',
            meta: { navIndex: '1-1' },
            component: CarList
          }
        ]
      },
      {
        path: 'maintain',
        name: 'CarMaintain',
        component: CarMaintain,
        meta: { navIndex: '2' },
        children: [
          {
            path: 'sotre',
            name: 'StoreMaintain',
            meta: { navIndex: '2-1' },
            component: StoreMaintain
          },
          {
            path: 'coupon',
            name: 'Coupon',
            meta: { navIndex: '2-2' },
            component: Coupon
          },
          {
            path: 'setting',
            name: 'MaintainSetting',
            meta: { navIndex: '2-3' },
            component: MaintainSetting
          }
        ]
      },
      {
        path: 'info',
        name: 'PlatformInfo',
        component: PlatformInfo,
        meta: { navIndex: '3' },
        children: [
          {
            path: 'list',
            name: 'ArticleList',
            component: ArticleList,
            meta: { navIndex: '3-1' }
          },
          {
            path: 'new',
            name: 'AddArticle',
            component: AddArticle,
          },
          {
            path: 'edit',
            name: 'EditArticle',
            component: EditArticle
          },
          {
            path: 'type',
            name: 'ArticleType',
            component: ArticleType,
            meta: { navIndex: '3-2'}
          }
        ]
      },
      {
        path: 'order',
        name: 'OrderManage',
        component: OrderManage,
        meta: { navInddex: '4'},
        children: [
          {
            path: 'list',
            name: 'OrderList',
            component: OrderList,
            meta: { navIndex: '4-1' }
          },
          {
            path: 'maintain',
            name: 'MaintainOrder',
            component: MaintainOrder,
            meta: { navIndex: '4-2'}
          }
        ]
      },
      {
        path: 'user',
        name: 'UserManage',
        component: UserManage,
        meta: { navIndex: '5' },
        children: [
          {
            path: 'list',
            name: 'UserList',
            component: UserList,
            meta: { navIndex: '5-1' }
          }
        ]
      },
      {
        path: 'enquiry',
        name: 'EnquiryManage',
        component: EnquiryManage,
        meta: { navIndex: '6'},
        children: [
          {
            path: 'unprocessed',
            name: 'EnquiryUnprocessed',
            component: EnquiryUnprocessed,
            meta: { navIndex: '6-1'},
          },
          {
            path: 'processed',
            name: 'EnquiryProcessed',
            component: EnquiryProcessed,
            meta: { navIndex: '6-2'},
          }
        ]
      },
      {
        path: 'comments',
        name: 'CommentsManage',
        component: CommentsManage,
        meta: { navIndex: '7'},
        children: [
          {
            path: 'handle',
            name: 'HandleComments',
            component: HandleComments,
            meta: { navIndex: '7-1' }
          }
        ]
      }
    ]
  }
]

export default routes

import Vue from 'vue'
import Router from 'vue-router'
// 注册路由
Vue.use(Router)

/* Layout */
// 公共布局组件
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
// 动态路由=》后期做后台系统页面访问控制=》路由规则的动态添加（根据当前登录人的权限标识）=》权限控制
// 引入多个动态路由模块
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
/**
 * 配置路由：
 * 1. 父路由使用Layout作为component的值
 * 2. 真正配置的页面放到children里配置
 * 3. 加上meta里边配置title就会自动显示到左侧导航菜单里
 * 说明：通过hidden: true（父路由）控制路由不在菜单中显示
 */
export const asyncRoutes = [
  departmentsRouter,
  settingRouter,
  employeesRouter,
  permissionRouter,
  approvalsRouter,
  attendancesRouter,
  salarysRouter,
  socialRouter
]

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 静态路由（不做访问的限制）
export const constantRoutes = [
  // 登录页
  {
    path: '/login',
    // 路由懒加载=》通过一个函数返回组件对象
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // excel导入页面
  {
    path: '/import',
    component: Layout,
    // 不在菜单显示
    hidden: true,
    children: [{
      path: '',
      name: 'import',
      component: () => import('@/views/import/index')
    }]
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
  // 动态路由
]

// 使用工厂模式返回路由的实例=》可复用
const createRouter = () => new Router({
  // mode: 'history', // require service support
  // 每次页面切换把滚动位置重置为0=》从顶部开始
  scrollBehavior: () => ({ y: 0 }),
  // 数组合并=》[...arr1, ...arr2]
  // routes: [...constantRoutes, ...asyncRoutes]
  // 只留下静态路由=》根据权限点数据动态添加路由
  routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由=》避免路由规则缓存
// eslint-disable-next-line space-before-function-paren
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

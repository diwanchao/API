// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'vue-awesome/icons'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import tools from './extend/tools'
import ListView from './components/Base/ListView'
import ListWithTreeView from './components/Base/ListWithTreeView'
import EditView from './components/Base/EditView'
import SearchView from './components/Base/SearchView'
import ElementFileUpload from './components/ElementUI/ElementFileUpload'
import UEditor from './components/UEditor/UEditor'
import ECharts from 'echarts'
import EChart from './components/EChart/EChart'
import '../static/UEditor/ueditor.config.js'
import '../static/UEditor/ueditor.all.min.js'
import '../static/UEditor/lang/zh-cn/zh-cn.js'
import '../static/UEditor/ueditor.parse.min.js'

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.component('icon', Icon)
Vue.component('ListView', ListView)
Vue.component('ListWithTreeView', ListWithTreeView)
Vue.component('EditView', EditView)
Vue.component('SearchView', SearchView)
Vue.component('ElementFileUpload', ElementFileUpload)
Vue.component('UEditor', UEditor)
Vue.component('EChart', EChart)

Vue.prototype.$system_title = '测试系统'
Vue.prototype.$http = axios
Vue.prototype.$echarts = ECharts
Vue.prototype.$tools = tools
Vue.prototype.$server_root = 'http://211.159.159.46'
Vue.prototype.$image_server_root = 'http://211.159.159.46'

Vue.prototype.$store = new Vuex.Store({
  state: {
    ueditor_items: [],
    data_menu: [],
    main_menu: [],
    sub_menu: [],
    sub_menu_active: {},
    tabs: []
  }
})

Vue.prototype.$color = {
  DEFAULT: '',
  PRIMARY: 'primary',
  TEXT: 'text',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger'
}

Vue.prototype.$listtype = {
  TEXT: 'Text',
  IMAGE: 'Image',
  TAG: 'Tag'
}

Vue.prototype.$edittype = {
  HIDDEN: 'Hidden',
  TEXT: 'Text',
  TEXTAREA: 'Textarea',
  SELECT: 'Select',
  RADIO: 'Radio',
  SWITCH: 'Switch',
  DATE: 'Date',
  CHECKLIST: 'CheckList',
  SLIDER: 'Slider',
  RATE: 'Rate',
  COLOR: 'Color',
  IMAGE: 'Image',
  RICHTEXT: 'RichText',
  NUMBER: 'Number',
  CASCADER: 'Cascader',
  DATERANGE: 'DataRange',
  TIME: 'Time'
}

router.onReady(function () {
  router.push('/')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

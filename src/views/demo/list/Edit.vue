<template>
  <div>
    <EditView :form_data="form_data" :form_controller="form_controller" ref="ref_editview" :EditType="this.$edittype" :DataUrl="data_url" :SetData="SetData"></EditView>

  </div>
</template>

<script>
  /* eslint-disable camelcase,object-property-newline,no-trailing-spaces,no-unused-vars */
  /* eslint-disable camelcase,object-property-newline */
  export default {
    name: 'Edit',
    data () {
      return {
        data_url: '/cms/Notice/',
        form_data: [
          {name: 'Name', label: '公告标题', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'Description', label: '公告摘要', type: this.$edittype.TEXTAREA, isrequire: true, value: ''},
          {name: 'Content', label: '公告内容', type: this.$edittype.RICHTEXT, isrequire: true, value: '',
            config: {width: 500, height: 400}},
          {name: 'Image', label: '公告图片', type: this.$edittype.IMAGE, isrequire: true, value: '', config: {
            Folder: 'CMS/Notice/'}},
          {name: 'ParentId', label: '', type: this.$edittype.HIDDEN, isrequire: true, value: ''},
          {name: 'Type', label: '按钮类型', type: this.$edittype.SELECT, isrequire: true, value: '', event: {change: function (param_object, param_value) {
            if (param_value === 'click') {
              param_object.GetFormItem('Key').isshow = true
              param_object.GetFormItem('Url').isshow = false
            } else {
              param_object.GetFormItem('Key').isshow = false
              param_object.GetFormItem('Url').isshow = true
            }
          }},
            option: [
              {key: 'click', value: '关键词'},
              {key: 'view', value: '跳转链接'}
            ]
          },
          {name: 'Key', label: '关键词', type: this.$edittype.TEXT, isrequire: false, value: ''},
          {name: 'Show', label: '是否开启', type: this.$edittype.RADIO, isrequire: true, value: 1,
            option: [{key: 1, value: '开启'}, {key: 2, value: '关闭'}]},
          {name: 'Sex', label: '性别', field: 'Sex', width: 120, type: this.$edittype.RADIO, isrequire: true, value: '',
            option: [{key: '1', value: '男', color: 'danger'}, {key: '2', value: '女', color: 'success'}]},
          {name: 'Color', label: '颜色', type: this.$edittype.COLOR, isrequire: false, value: '#20a0ff'},
          {name: 'Slider', label: '滑块', type: this.$edittype.SLIDER, isrequire: false, value: 36},
          {name: 'Rate', label: '评分', type: this.$edittype.RATE, isrequire: false, value: null},
          {name: 'Time', label: '时间', type: this.$edittype.TIME, isrequire: false, value: '',
            config: {start: '08:30', step: '00:15', end: '18:30'}},
          {name: 'Daterange', label: '日期范围', type: this.$edittype.DATERANGE, isrequire: false, value: []},
          {name: 'Date', label: '日期', type: this.$edittype.DATE, isrequire: false, value: ''},
          {name: 'Checklist', label: '多选', type: this.$edittype.CHECKLIST, isrequire: false, value: ['上海', '北京'],
            checklist: ['上海', '北京', '广州', '深圳']},
          {name: 'Number', label: '数量', type: this.$edittype.NUMBER, isrequire: false, value: 1, min: 1, max: 10},
          {name: 'Cascader', label: '数量', type: this.$edittype.CASCADER, isrequire: false, value: [],
            option: [
            {value: 'zhinan', label: '指南', children: [{value: 'shejiyuanze', label: '设计原则', children: [{value: 'yizhi', label: '一致'}, {value: 'fankui', label: '反馈'}]}]},
            {value: 'zujian', label: '组件', children: [{value: 'basic', label: 'Basic', children: [{value: 'layout', label: 'Layout 布局'}, {value: 'color', label: 'Color 色彩'}]}]},
            {value: 'notice', label: 'Notice', children: [{value: 'alert', label: 'Alert 警告'}, {value: 'loading', label: 'Loading 加载'}]}, {value: 'navigation', label: 'Navigation',
              children: [{value: 'menu', label: 'NavMenu 导航菜单'}, {value: 'tabs', label: 'Tabs 标签页'}]},
            {value: 'others', label: 'Others', children: [{value: 'dialog', label: 'Dialog 对话框'}, {value: 'tooltip', label: 'Tooltip 文字提示'}]}]}
        ],
        form_controller: [
          {
            button_text: '保存',
            button_icon: '',
            button_color: 'primary',
            button_onclick: function (param_object, param_data) {
              param_object.SubmitForm(param_data)
            }
          },
          {
            button_text: '返回',
            button_icon: '',
            button_color: '',
            button_onclick: function (param_object, param_data) {
              param_object.$router.back()
            }
          }
        ]
      }
    },
    mounted: function () {
      this.loaded()
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
        this.$refs.ref_editview.LoadData(this.$server_root + this.data_url + 'ItemInfo/ItemId/' + this.$store.itemid)
      },
      SetData: function (param_response_data) {
        return param_response_data.NoticeInfo
      }
    }
  }
</script>
<style>
</style>

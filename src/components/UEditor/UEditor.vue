<template>
  <div>
    <div ref="editor"></div>
  </div>
</template>
<script>
  /* eslint-disable func-call-spacing */
  export default {
    name: 'UEditor',
    data () {
      return {
        id: this.$tools.GetGuid() + '_ueditor',
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String,
        default: ''
      },
      config: {
        type: Object,
        default: {}
      },
      data_item: {
        type: Object,
        default: {}
      },
      OnContentChange: {
        type: Function,
        default: null
      },
      OnDataReady: {
        type: Function,
        default: null
      }
    },
    watch: {
      defaultMsg: function () {
        this.editor.setContent(this.defaultMsg)
      }
    },
    mounted () {
      const _this = this
      this.$refs.editor.id = this.id
      this.editor = window.UE.getEditor(this.id, this.config)
      this.editor.addListener('ready', function () {
        _this.editor.setContent(_this.defaultMsg)
      })
      this.editor.addListener('blur', function () {
        _this.editor.getContent()
        _this.OnContentChange(_this.data_item, _this.editor.getContent())
      })
    },
    methods: {
      loaded: function () {
      },
      getUEContent () { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed () {
      this.editor.destroy()
    }
  }
</script>

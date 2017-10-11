<template>
<div>
  <el-row :gutter="0" style="padding:10px 10px 0 10px">
    <el-col :span="6" style="text-align:right;margin-bottom: 15px;" scope="scope">
      <el-input :placeholder="Search_input_placeholder" v-model="input_search_text" @keyup.enter.native="show()" size="small">
        <el-button slot="append" icon="search" @click="GetSearchData(ParentView)"></el-button>
      </el-input>
    </el-col>
    <el-col :span="18" style="text-align:right;margin-bottom: 15px;" scope="scope">
      <el-button v-for="button in Toolbar_buttons" @click="button.button_onclick(ParentView)" :type="button.button_color">{{ button.button_text }}
      </el-button>
    </el-col>
  </el-row>
</div>
</template>
<script>
  /* eslint-disable camelcase */

  export default {
    name: 'SearchView',
    props: {
      Toolbar_buttons: {
        type: Array,
        default: []
      },
      Data_Pagesize: {
        type: '',
        default: 15
      },
      OnSearchClick: {
        type: Function,
        default: null
      },
      SetData: {
        type: Function,
        default: null
      },
      Search_input_placeholder: {
        type: String,
        default: ''
      },
      Data_Url: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        input_search_text: ''
      }
    },
    computed: {
      ParentView: function () {
        return this
      }
    },
    methods: {
      GetSearchData: function (param_object) {
        let self = this
        this.$tools.PostDataToServer(
          self,
          self.$server_root + self.Data_Url + 'ListItem/PageSize/' + self.Data_Pagesize,
          {Keyword: self.input_search_text},
          function success (response) {
            console.log(self.$server_root + self.Data_Url + 'ListItem/PageSize/' + self.Data_Pagesize)
            param_object.$parent.OnSearchClick(response.data, self.input_search_text)
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      show: function () {
        this.GetSearchData(this.ParentView)
      }
    }
  }
</script>

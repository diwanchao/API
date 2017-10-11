<template>
  <el-row>
    <el-col :span="4" style="padding-right: 10px;" v-if="Accordion">
      <el-tree :data="tree_data" node-key="Id" :default-expanded-keys="tree_root" :expand-on-click-node="false" highlight-current accordion @node-click="handleNodeClick"></el-tree>
    </el-col>
    <el-col :span="3" style="padding-right: 10px;" v-else>
      <el-tree :data="tree_data" node-key="Id" :default-expanded-keys="tree_root" :expand-on-click-node="false" highlight-current @node-click="handleNodeClick"></el-tree>
    </el-col>
    <el-col :span="21">
      <ListView :TableColumn="TableColumn" :Controller="controller" :Data_Url="Data_Url" :Data_Pagesize="Data_Pagesize" :TableController="TableController" :SetData="SetData" ref="listview_child"></ListView>
    </el-col>
  </el-row>
</template>
<script>
  /* eslint-disable camelcase */
  export default {
    name: 'ListWithTreeView',
    props: {
      TableColumn: {
        type: Array,
        default: []
      },
      TableController: {
        type: Array,
        default: null
      },
      Accordion: {
        type: '',
        default: false
      },
      Request_Url: {
        type: String,
        default: ''
      },
      TableData_Url: {
        type: String,
        default: ''
      },
      Data_Url: {
        type: String,
        default: ''
      },
      Data_Pagesize: {
        type: '',
        default: 15
      },
      SetData: {
        type: Function,
        default: null
      }
    },
    computed: {
      ParentView: function () {
        return this
      }
    },
    data () {
      return {
        input_name: 'search_input',
        controller: 'ListWithTree',
        input5: '',
        select: '',
        total: 0,
        page: 0,
        tree_data: [],
        tree_root: [],
        pagesize: 0,
        parentid: 0,
        multipleSelection: [],
        table_data: [],
        defaultProps: {
          children: 'Children',
          label: 'Name'
        }
      }
    },
    mounted: function () {
      this.loaded()
      this.tree()
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
//        this.GetTreeData()
      },
      DeleteRow: function (param_object, param_data) {
//        console.log(param_object)
        this.$refs.listview_child.DeleteRow(param_object, param_data)
      },
      tree: function () {
        let self = this
        this.$tools.GetDataFromServer(
          this,
          this.$server_root + this.Data_Url + 'ListWithTree/',
          function success (response) {
            let tree_data_new = []
            let tree_data_temp = response.data.TreeList
            for (let i = 0; i < tree_data_temp.length; i++) {
              tree_data_temp[i].children = []
              tree_data_temp[i].label = tree_data_temp[i].Name
            }
            let boolean_got_root = false
            for (let i = 0; i < tree_data_temp.length; i++) {
              if (tree_data_temp[i].ParentId === 0) {
                if (!boolean_got_root) {
                  self.tree_root.push(tree_data_temp[i].Id)
                  boolean_got_root = true
                }
                tree_data_new.push(self.MadeTree(tree_data_temp[i], tree_data_temp))
              }
            }
            self.tree_data = tree_data_new
            console.log('Tree数据：', self.tree_data)
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      MadeTree: function (param_parent, param_data) {
        var current_children = []
        if (param_data != null) {
          for (let i = 0; i < param_data.length; i++) {
            if (param_data[i].ParentId === param_parent.Id) {
              current_children.push(param_data[i])
              this.MadeTree(param_data[i], param_data)
            }
          }
          param_parent.children = current_children
        }
        return param_parent
      },
      toggleSelection: function (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleNodeClick (data) {
        let self = this
        this.$refs.listview_child.search_key = ''
        this.$tools.GetDataFromServer(
          this,
          this.$server_root + this.Data_Url + 'ListItem/ParentId/' + data.Id + '/PageSize/' + this.Data_Pagesize,
          function success (response) {
            self.$refs.listview_child.SetTableData(response.data, data.Id)
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      SetSearchData: function (param_text, param_key) {
        this.$refs.listview_child.SetSearchData(param_text, param_key)
      }
    }
  }
</script>
<style>
</style>

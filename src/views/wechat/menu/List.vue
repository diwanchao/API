<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark" style="float: right;padding-bottom: 18px;padding-right: 20px">
        <el-button v-for="button in toolbar_buttons" @click="button.button_onclick(ParentView)" :type="button.button_color">{{ button.button_text }}
        </el-button>
      </div>
    </el-col>
    <el-table
      :data="table_data"
      style="width: 100%;font-weight:bold;color:gray;"
      :default-expand-all=true>
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-table
              :data="props.row.children"
              :show-header=false
              style="width: 100%;font-size:12px;font-weight:normal;color:dimgray;">
              <el-table-column width="48">&nbsp;</el-table-column>
              <el-table-column v-for="column in TableColumn" :prop="column.field" :label="column.label"
                               :width="column.width" v-if="column.type === 'Tag'">
                <template scope="scope">
                  <el-tag
                    :type="option.color" v-for="option in column.option"
                    v-if="option.key.toString() === scope.row[column.field].toString()"
                    close-transition>{{ option.value }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column v-else-if="column.type === 'Image'" :prop="column.field" :label="column.label"
                               :width="column.width">
                <template scope="scope">
                  <img v-if="scope.row[column.field] !== ''" :src="ParentView.$server_root + scope.row[column.field]" :width="column.param['width']"
                       :height="column.param['height']"/>
                </template>
              </el-table-column>
              <el-table-column v-else-if="column.field === 'ParentId'" :prop="column.field" :label="column.label" width="120px"></el-table-column>
              <el-table-column v-else :prop="column.field" :label="column.label" :width="column.width"></el-table-column>
              <el-table-column label="操作" width="300px">
                <template scope="scope">
                  <div v-for="button in TableController" style="display:inline;">
                    <div v-if="button.option != undefined" style="display:inline;">
                      <el-button
                        v-for="item_option in button.option"
                        v-if="scope.row[item_option.name] === item_option.value"
                        @click="button.button_onclick(ParentView, scope.row)"
                        :icon="button.button_icon" :type="button.button_color"
                        size="small"
                        style="margin-left:6px;"
                      >
                        {{button.button_text}}
                      </el-button>
                    </div>
                    <div v-else style="display:inline;float:right;">
                      <el-button
                        @click="button.button_onclick(ParentView, scope.row)"
                        :icon="button.button_icon" :type="button.button_color"
                        style="margin-left:6px;"
                        size="small">
                        {{button.button_text}}
                      </el-button>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column v-for="column in TableColumn" :prop="column.field" :label="column.label"
                       :width="column.width" v-if="column.type === 'Tag'">
        <template scope="scope">
          <el-tag
            :type="option.color" v-for="option in column.option"
            v-if="option.key.toString() === scope.row[column.field].toString()"
            close-transition>{{ option.value }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column v-else-if="column.type === 'Image'" :prop="column.field" :label="column.label"
                       :width="column.width">
        <template scope="scope">
          <img v-if="scope.row[column.field] !== ''" :src="ParentView.$server_root + scope.row[column.field]" :width="column.param['width']"
               :height="column.param['height']"/>
        </template>
      </el-table-column>
      <el-table-column v-else :prop="column.field" :label="column.label" :width="column.width"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template scope="scope">
          <div v-for="button in TableController" style="display:inline;">
            <div v-if="button.option != undefined" style="display:inline;">
              <el-button
                v-for="item_option in button.option"
                v-if="scope.row[item_option.name] === item_option.value"
                @click="button.button_onclick(ParentView, scope.row)"
                :icon="button.button_icon" :type="button.button_color"
                size="small"
                style="margin-left:6px;float:right;"
              >
                {{button.button_text}}
              </el-button>
            </div>
            <div v-else style="display:inline;">
              <el-button
                @click="button.button_onclick(ParentView, scope.row)"
                :icon="button.button_icon" :type="button.button_color"
                style="margin-left:6px;float:right;"
                size="small">
                {{button.button_text}}
              </el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<!-- ListView部分vue代码Start -->
<script>
  /* eslint-disable camelcase,key-spacing,object-property-newline,indent */
  export default {
    name: 'List',
    data () {
      return {
        Data_Url: '/wechat/WeChatMenu/',
        data_pagesize: 15,
        accordion: false,
        search_input_placeholder: '请输入关键词',
        TableColumn: [
          {label: 'ID', field: 'Id', width: 120, type: 'Text'},
          {label: '父ID', field: 'ParentId', width: 80, type: 'Text'},
          {label: '菜单名称', field: 'Name', type: 'Text'},
          {label: '菜单类型', field: 'Type', width: 120, type: 'Text'},
          {label: '创建时间', field: 'CreateTime', width: 180, type: 'Text'},
          {label: '是否开启', field: 'Show', width: 120, type: 'Tag', option:
            [
              {key: '1', value: '开启', color: 'success'},
              {key: '2', value: '关闭', color: 'danger'}
            ]
          }
        ],
        TableController: [
          {
            button_text: '删除',
            button_icon: 'delete',
            button_color: 'danger',
            button_onclick: function (param_object, param_data) {
              param_object.DeleteRow(param_data)
            }
          },
          {
            button_text: '编辑',
            button_icon: 'edit',
            button_color: 'info',
            button_onclick: function (param_object, param_data) {
              param_object.$store.itemid = param_data.Id
              param_object.$store.parentid = param_data.ParentId
              param_object.$router.push('/wechat/menu/Edit')
            }
          },
          {
            button_text: '添加子菜单',
            button_icon: 'plus',
            button_color: 'success',
            option: [{name: 'ParentId', value: 0}],
            button_onclick: function (param_object, param_data) {
              if (param_data.children.length >= 5) {
                param_object.$message({
                  type: 'error',
                  message: '子菜单不能超过5个!'
                })
              } else {
                param_object.$store.parentid = param_data.Id
                param_object.$router.push('/wechat/menu/Edit')
              }
            }
          }
        ],
        toolbar_buttons: [
          {
            button_text: '新增主菜单',
            button_color: 'success',
            button_onclick: function (param_object) {
              if (param_object.table_data.length >= 3) {
                param_object.$message({
                  type: 'error',
                  message: '主菜单不能超过3个!'
                })
              } else {
                param_object.$store.parentid = 0
                param_object.$router.push('/wechat/menu/Edit')
              }
            }
          },
          {
            button_text: '同步到微信',
            button_color: 'info',
            button_onclick: function (param_object) {
              param_object.$tools.GetDataFromServer(
                param_object,
                param_object.$server_root + '/wechat/WeChatSetting/CreateMenu',
                function success (response) {
                  param_object.$message({
                    message: '同步成功!',
                    type: 'success'
                  })
                },
                function error (error) {
                  console.log(error)
                  param_object.$message({
                    type: 'error',
                    message: '同步失败!'
                  })
                }
              )
            }
          }
        ],
        table_data: []
      }
    },
    computed: {
      ParentView: function () {
        return this
      }
    },
    mounted: function () {
      this.loaded()
    },
    methods: {
      loaded: function () {
        this.GetTableData()
        this.$store.itemid = ''
      },
      GetTableData: function () {
        let self = this
        let post_url = this.$server_root + this.Data_Url + 'ListItem'
        this.$tools.GetDataFromServer(
          this,
          post_url,
          function success (response) {
            let tree_data_new = []
            let tree_data_temp = response.data.MenuInfo.Itemlist
            for (let i = 0; i < tree_data_temp.length; i++) {
              tree_data_temp[i].children = []
              tree_data_temp[i].label = tree_data_temp[i].Name
            }
            let boolean_got_root = false
            for (let i = 0; i < tree_data_temp.length; i++) {
              if (tree_data_temp[i].ParentId === 0) {
                if (!boolean_got_root) {
                  boolean_got_root = true
                }
                tree_data_new.push(self.MadeTree(tree_data_temp[i], tree_data_temp))
              }
            }
            self.table_data = tree_data_new
            console.log('Tree数据：', self.table_data)
            self.OnPageChanged(self.SetData(response.data))
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
              param_data[i]['Name'] = param_data[i]['Name']
              current_children.push(param_data[i])
              this.MadeTree(param_data[i], param_data)
            }
          }
          param_parent.children = current_children
        }
        return param_parent
      },
      SetData: function (param_response_data) {
        return param_response_data.MenuInfo
      },
      OnPageChanged: function (param_data) {
        this.loading = false
//        this.table_data = param_data.Itemlist
        this.page = param_data.Page
        this.pagesize = param_data.PageSize
        this.total = param_data.TotalCount
      },
      ReloadData: function () {
        let self = this
        this.$tools.GetDataFromServer(
          this,
          this.$server_root + this.Data_Url + 'ListItem',
          function success (response) {
            self.OnPageChanged(self.SetData(response.data))
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      DelData: function (Id) {
        let self = this
        this.$tools.PostDataToServer(
          this,
          this.$server_root + this.Data_Url + 'RemoveItem',
          {ItemId: Id},
          function success () {
            self.$message({
              message: '删除成功!',
              type: 'success'
            })
            self.GetTableData()
          },
          function error () {
            self.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        )
      },
      DeleteRow: function (param_data) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.DelData(param_data.Id, this.parent_id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
<!-- ListView部分vue代码End -->
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table__expanded-cell{
    padding:0;
  }
</style>

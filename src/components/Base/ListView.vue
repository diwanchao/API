<template>
  <el-row>
    <div style="padding-right:10px;">
      <el-table ref="multipleTable" :data="table_data" v-loading.body="loading" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
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
            <img v-if="scope.row[column.field] !== null" :src="ParentView.$server_root + scope.row[column.field]" :width="column.param['width']"
                 :height="column.param['height']"/>
          </template>
        </el-table-column>
        <el-table-column v-else :prop="column.field" :label="column.label" :width="column.width"></el-table-column>
        <div>
        <el-table-column v-if="TableController !== null && TableController !== ''" fixed="right" label="操作">
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
              <div v-else style="display:inline;">
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
        </div>
      </el-table>
    </div>
    <div style="text-align:right;margin-top:10px;" id="page">
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :page-size="pagesize" :current-page="page"
                       layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
  </el-row>
</template>
<script>
  /* eslint-disable camelcase */
  export default {
    name: 'ListView',
    data () {
      return {
        table_data: [],
        multipleSelection: [],
        total: 0,
        page: 0,
        pagesize: 0,
        loading: true,
        visible2: false,
        parent_id: '',
        search_key: ''
      }
    },
    props: {
      Data_Url: {
        type: String,
        default: ''
      },
      Controller: {
        type: String,
        default: ''
      },
      Data_Pagesize: {
        type: '',
        default: 10
      },
      TableColumn: {
        type: Array,
        default: []
      },
      TableController: {
        type: Array,
        default: null
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
    mounted: function () {
      this.loaded()
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
        this.GetTableData()
        this.$store.itemid = ''
      },
      GetTableData: function () {
        let self = this
        let post_url = ''
        if (this.Controller === '') {
          post_url = this.$server_root + this.Data_Url + 'ListItem/PageSize/' + this.Data_Pagesize
        } else {
          post_url = this.$server_root + this.Data_Url + this.Controller + '/PageSize/' + this.Data_Pagesize
        }
        this.$tools.GetDataFromServer(
          this,
          post_url,
          function success (response) {
            console.log(response.data)
            self.OnPageChanged(self.SetData(response.data))
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      handleCurrentChange (val) {
        this.OnPageChange(val)
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
      },
      OnPageChanged: function (param_data) {
        this.loading = false
        this.table_data = param_data.Itemlist
        this.page = param_data.Page
        this.pagesize = param_data.PageSize
        this.total = param_data.TotalCount
      },
      OnPageChange: function (val) {
        this.loading = true
        let self = this
        let get_url = this.$server_root + this.Data_Url + 'ListItem/PageSize/' + this.Data_Pagesize + '/Page/' + val
        if (this.search_key !== '') {
          get_url += '/Keyword/' + this.search_key
        }
        if (this.parent_id !== '' && this.parent_id !== 0 && this.search_key === '') {
          get_url += '/ParentId/' + this.parent_id
        }
        this.$tools.GetDataFromServer(
          this,
          get_url,
          function success (response) {
            self.OnPageChanged(self.SetData(response.data))
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      DelData: function (Id, parent_id) {
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
            self.ReloadData(parent_id)
          },
          function error () {
            self.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        )
      },
      ReloadData: function (parent_id) {
        let self = this
        this.$tools.GetDataFromServer(
          this,
          this.$server_root + this.Data_Url + 'ListItem/PageSize/' + this.Data_Pagesize + '/Page/' + this.page + '/ParentId/' + parent_id,
          function success (response) {
            self.OnPageChanged(self.SetData(response.data))
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      SetTableData: function (param_data, parent_id) {
        this.OnPageChanged(this.SetData(param_data))
        this.parent_id = parent_id
      },
      SetSearchData: function (param_data, parent_key) {
        this.OnPageChanged(this.SetData(param_data))
        this.search_key = parent_key
        this.parent_id = 0
      }
    }
  }
</script>
<style>
</style>

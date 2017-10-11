<template>
  <div>
    <el-row>
      <el-col :span="18"  style="text-align: right;padding-right:6px;">
        <el-button @click="Back()">返回</el-button>
        <el-button type="success" @click="Save()">保存</el-button>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="8" v-for="item_menu in data_menu">
            <el-card :body-style="{ padding: '0px'}" style="margin: 6px;">
              <el-button
                type="primary"
                @click="OnItemClick(item_menu)"
                :class="item_menu.Active?'node-root-active':'node-root'"
                size="small"
                :plain="false"
              >
                <i :class="item_menu.Active?'el-icon-check el-icon--left':'el-icon-close el-icon--left'"></i>&nbsp;{{ item_menu.Name }}
              </el-button>
              <hr color="#EEEEEE"/>
              <el-row v-for="item_children_menu in item_menu.Children" class="row">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="2" class="tabs">
                      &nbsp;
                    </el-col>
                    <el-col :span="22">
                      <el-button
                        type="primary"
                        @click="OnItemClick(item_children_menu)"
                        :class="item_children_menu.Active?'node-child-root-active':'node-child-root'"
                        size="small"
                      >
                        <i :class="item_children_menu.Active?'el-icon-check el-icon--left':'el-icon-close el-icon--left'"></i>&nbsp;{{ item_children_menu.Name }}
                      </el-button>
                    </el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col :span="24">
                      <el-row>
                        <el-col :span="2" class="tabs">
                          &nbsp;
                        </el-col>
                        <el-col :span="2" class="tabs">
                          &nbsp;
                        </el-col>
                        <el-col :span="20">
                          <el-button
                            type="primary"
                            v-for="item_third_menu in item_children_menu.Children"
                            @click="OnItemClick(item_third_menu)"
                            :class="item_third_menu.Active?'node-child-root-active':'node-child-root'"
                            size="small"
                          >
                            <i :class="item_third_menu.Active?'el-icon-check el-icon--left':'el-icon-close el-icon--left'"></i>&nbsp;{{ item_third_menu.Name }}
                          </el-button>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /* eslint-disable camelcase,object-property-newline,no-trailing-spaces,no-unused-vars */
  /* eslint-disable camelcase,object-property-newline */
  export default {
    name: 'Access',
    data () {
      return {
        data_url: '/system/UserRole/',
        post_data_menu: [],
        post_data_role_relation: [],
        data_menu: []
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
    watch: {
      data_menu: {
        handler (newValue, oldValue) {
          for (let i = 0; i < newValue.length; i++) {
            if (oldValue[i] !== newValue[i]) {
              console.log(newValue)
            }
          }
        },
        deep: true
      }
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
        let self = this
        this.$tools.GetDataFromServer(
          this,
          this.$server_root + this.data_url + 'Access/ItemId/' + this.$store.itemid,
          function success (response) {
            self.post_data_menu = response.data.MenuInfo.Itemlist
            self.post_data_role_relation = response.data.RoleRelation.Itemlist
            console.log('菜单数据：', self.post_data_menu)
            console.log('菜单关系数据：', self.post_data_role_relation)
            for (let i = 0; i < self.post_data_menu.length; i++) {
              self.$set(self.post_data_menu[i], 'Active', false)
              for (let j = 0; j < self.post_data_role_relation.length; j++) {
                if (self.post_data_role_relation[j].MenuId === self.post_data_menu[i].Id) {
                  self.post_data_menu[i].Active = true
                }
              }
            }
            for (let i = 0; i < self.post_data_menu.length; i++) {
              if (self.post_data_menu[i].ParentId === 0) {
                let current_menu = self.MadeTree(self.post_data_menu[i], self.post_data_menu)
                self.data_menu.push(current_menu)
              }
            }
            console.log('新菜单数据', self.data_menu)
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
          param_parent.Children = current_children
        }
        return param_parent
      },
      OnItemClick: function (param_object) {
        console.log('点击的父ID：', param_object.ParentId)
        if (param_object.Active === false) {
          param_object.Active = true
          for (let i = 0; i < param_object.Children.length; i++) {
            this.SetChildrenActive(param_object.Children[i], true)
          }
          this.SetParentActive(this.data_menu, param_object.ParentId)
        } else {
          param_object.Active = false
          for (let i = 0; i < param_object.Children.length; i++) {
            this.SetChildrenActive(param_object.Children[i], false)
          }
        }
      },
      SetChildrenActive: function (param_parent, param_active) {
        param_parent.Active = param_active
        if (param_parent.Children !== undefined) {
          for (let i = 0; i < param_parent.Children.length; i++) {
            this.SetChildrenActive(param_parent.Children[i], param_active)
          }
        }
      },
      SetParentActive: function (param_root, param_parentid) {
        for (let i = 0; i < param_root.length; i++) {
          if (param_root[i].Id === param_parentid) {
            param_root[i].Active = true
            this.SetParentActive(this.data_menu, param_root[i].ParentId)
          }
          if (param_root[i].Children != null) {
            this.SetParentActive(param_root[i].Children, param_parentid)
          }
        }
      },
      Back: function () {
        this.$router.push('/system/user_role/List')
      },
      Save: function () {
        let self = this
        this.$tools.PostDataToServer(
          this,
          this.$server_root + this.data_url + 'SaveAccess',
          {menu_data: JSON.stringify(this.post_data_menu), itemid: this.$store.itemid},
          function success (data) {
            console.log(data)
            self.$message({
              message: '保存成功!',
              type: 'success'
            })
          },
          function error () {
            self.$message({
              type: 'error',
              message: '保存失败!'
            })
          }
        )
      }
    }
  }
</script>
<style>
  .tabs {
    /*border-right:solid 1px grey;*/
  }

  .row {
    padding: 0px;
  }

  .node {
    margin: 8px;
    cursor: pointer;
  }

  .node-root{
    margin: 8px;
    cursor: pointer;
    border-color:#7DE1B7;
    background-color:#7DE1B7;
    color:white;
  }

  .node-root:hover,.node-root:focus{
    margin: 8px;
    cursor: pointer;
    border-color:#7DE1B7;
    background-color:#7DE1B7;
    color:white;
  }

  .node-root-active{
    margin: 8px;
    cursor: pointer;
    border-color:#1b7e5a;
    background-color:#1b7e5a;
    color:white;
  }

  .node-root-active:hover,.node-root-active:focus{
    margin: 8px;
    cursor: pointer;
    border-color:#1b7e5a;
    background-color:#1b7e5a;
    color:white;
  }

  .node-child-root{
    margin: 8px;
    cursor: pointer;
    border-color:#ADD7F0;
    background-color:#ADD7F0;
    color:white;
  }

  .node-child-root:hover,.node-child-root:focus{
    margin: 8px;
    cursor: pointer;
    border-color:#ADD7F0;
    background-color:#ADD7F0;
    color:white;
  }

  .node-child-root-active{
    margin: 8px;
    cursor: pointer;
    border-color:#2489c5;
    background-color:#2489c5;
    color:white;
  }

  .node-child-root-active:hover,.node-child-root-active:focus{
    margin: 8px;
    cursor: pointer;
    border-color:#2489c5;
    background-color:#2489c5;
    color:white;
  }

  .el-button+.el-button {
    margin-left: 10px;
  }

  hr{
    margin:0px;
  }
</style>

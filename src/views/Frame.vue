<template>
  <div style="height:100%;">
    <header>
      <!--<img src="" alt="logo" class="header-logo">-->
      <label>Logo</label>
      <ul class="header-operations">
        <li>
          <el-dropdown style="color:white" @command="handleCommand">
            <span class="el-dropdown-link">
              User<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="ChangePassword">修改密码</el-dropdown-item>
              <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </header>
    <div id="menu_main">
      <div style="height:50px;width:100%;"></div>
      <ul>
        <li v-for="item in $store.state.main_menu" v-on:click="menu_main_click(item.Id)"
            :class="item.Active? 'active':''">
          <icon class="main_menu_icon" :name="item.Icon" scale="2"></icon>
          <br/>
          <label style="font-size:12px;width:100%;">{{ item.Name }}</label>
        </li>
      </ul>
    </div>
    <div id="menu_sub">
      <div style="height:50px;width:100%;"></div>
      <ul> <!--//v-for="item in ItemListSub"-->
        <li v-for="item in $store.state.sub_menu" v-on:click="menu_sub_click(item.Id)"
            :class="item.Active? 'active':''">
          <label>{{ item.Name }}</label>
        </li>
      </ul>
    </div>

    <div id="main_content">
      <div style="height:50px;width:100%;"></div>
      <ul> <!--//v-for="item in ItemListSub"-->
        <li>
          <!--<label>{{ item.Name }}</label>-->
          <el-tabs @tab-click="handleClick" v-model="tab_active_name">
            <el-tab-pane v-for="item in $store.state.tabs" :label="item.Name" :name="item.Name" :id="item.Id"
                         v-on:click="tabClick(item.Id)">
            </el-tab-pane>
          </el-tabs>
        </li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="password_form_data">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input v-model="password_form_data.password_old" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="password_form_data.password_new" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="password_form_data.password_confirm" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SubmitForm(form_data)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable camelcase */

  let string_init_tab = ''
  export default {
    name: 'Frame',
    data () {
      return {
        data_url: '/system/User/',
        tab_active_name: '',
        dialogFormVisible: false,
        password_form_data: {
          password_old: '',
          password_new: '',
          password_confirm: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted: function () {
      this.loaded()
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
        let isinitsubmenu = false
        let isinittab = false
        this.$store.state.main_menu = []
        this.$store.state.sub_menu = []
        this.$store.state.tabs = []
        for (let i = 0; i < this.$store.state.data_menu.length; i++) {
          this.$store.state.data_menu[i].Active = false
        }
        for (let i = 0; i < this.$store.state.data_menu.length; i++) {
          if (this.$store.state.data_menu[i].ParentId === 0) {
            this.$store.state.main_menu.push(this.$store.state.data_menu[i])
            if (this.$store.state.main_menu.length === 1) {
              this.$store.state.data_menu[i].Active = true
            }
            if (isinitsubmenu === false) {
              for (let j = 0; j < this.$store.state.data_menu.length; j++) {
                if (this.$store.state.data_menu[j].ParentId === this.$store.state.data_menu[i].Id) {
                  this.$store.state.sub_menu.push(this.$store.state.data_menu[j])
                  if (isinittab === false) {
                    for (let k = 0; k < this.$store.state.data_menu.length; k++) {
                      if (this.$store.state.data_menu[k].ParentId === this.$store.state.data_menu[j].Id && this.$store.state.data_menu[k].Level === 4) {
                        this.$store.state.tabs.push(this.$store.state.data_menu[k])
                        if (this.$store.state.tabs.length === 1) {
                          string_init_tab = '/' + this.$store.state.data_menu[k].Model + '/' + this.$store.state.data_menu[k].Function + '/' + this.$store.state.data_menu[k].Action
                          this.tab_active_name = this.$store.state.tabs[0].Name
                        }
                      }
                    }
                    isinittab = true
                  }
                }
              }
              this.$store.state.sub_menu[0].Active = true
              this.$store.state.sub_menu_active = this.$store.state.sub_menu[0]
              isinitsubmenu = true
            }
          }
        }
        this.$router.push(string_init_tab)
      },
      menu_main_click: function (id) {
        this.$store.state.sub_menu = []
        for (let i = 0; i < this.$store.state.data_menu.length; i++) {
          this.$store.state.data_menu[i].Active = false
          if (this.$store.state.data_menu[i].Id === id) {
            this.$store.state.data_menu[i].Active = true
          }
          if (this.$store.state.data_menu[i].ParentId === id) {
            this.$store.state.sub_menu.push(this.$store.state.data_menu[i])
          }
        }
        for (let i = 0; i < this.$store.state.sub_menu.length; i++) {
          if (this.$store.state.sub_menu[i].Id === this.$store.state.sub_menu_active.Id) {
            this.$store.state.sub_menu[i].Active = true
          }
        }
      },
      menu_sub_click: function (id) {
        this.$store.state.tabs = []
        for (let i = 0; i < this.$store.state.data_menu.length; i++) {
          if (this.$store.state.data_menu[i].ParentId === id && this.$store.state.data_menu[i].Level === 4) {
            this.$store.state.tabs.push(this.$store.state.data_menu[i])
            if (this.$store.state.tabs.length === 1) {
              string_init_tab = '/' + this.$store.state.tabs[0].Model + '/' + this.$store.state.tabs[0].Function + '/' + this.$store.state.tabs[0].Action
              this.tab_active_name = this.$store.state.tabs[0].Name
            }
          }
        }
        for (let i = 0; i < this.$store.state.sub_menu.length; i++) {
          this.$store.state.sub_menu[i].Active = false
          if (this.$store.state.sub_menu[i].Id === id) {
            this.$store.state.sub_menu[i].Active = true
            this.$store.state.sub_menu_active = this.$store.state.sub_menu[i]
            console.log(this.$store.state.sub_menu_active)
          }
        }
        this.$router.push(string_init_tab)
      },
      tabClick: function (id) {

      },
      handleClick (tab, event) {
        for (let i = 0; i < this.$store.state.data_menu.length; i++) {
          if (tab.$attrs.id === this.$store.state.data_menu[i].Id) {
            this.$router.push('/' + this.$store.state.data_menu[i].Model + '/' + this.$store.state.data_menu[i].Function + '/' + this.$store.state.data_menu[i].Action)
          }
        }
      },
      handleCommand (command) {
        if (command === 'ChangePassword') {
          this.dialogFormVisible = true
        }
      },
      SubmitForm: function (param_data) {
        var self = this
        var get_data = this.password_form_data
        this.$tools.PostDataToServer(
            this,
            this.$server_root + this.data_url + 'ChangePassword',
            get_data,
            function success (response) {
              console.log(response)
              if (response.data.State.Code === 1) {
                self.$message({
                  message: '保存成功',
                  type: 'success',
                  showClose: true
                })
              } else {
                self.$message.error(response.data.State.Message)
              }
            },
            function error (error) {
              console.log(error)
            }
          )
      },
      SetData: function (param_response_data) {
        return param_response_data.UserInfo
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-operations {
    display: inline-block;
    float: right;
    height: 100%;
  }

  .header-operations li {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    line-height: 50px;
    cursor: pointer;
  }

  .header-operations .header-download.is-available {
    opacity: 1;
    cursor: pointer;
  }

  .header-logo {
    display: inline-block;
    vertical-align: middle;
  }

  .header-operations:after, header:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }

  #menu_main, #menu_sub {
    position: absolute;
    top: 0;
    height: 100%;
  }

  #menu_main ul .active {
    color: rgb(32, 160, 255);
    background: #e3e3e3;
    text-align: center;
    padding: 8px 0 8px 0;
  }

  #menu_main {
    width: 70px;
    left: 0;
  }

  #menu_sub {
    width: 180px;
    left: 70px;
  }

  #menu_sub ul li {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #8391a5;
  }

  #menu_sub ul li:hover {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: aliceblue;
  }

  #menu_sub ul .active {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: black;
    background: aliceblue;
  }

  #main_content {
    margin-left: 250px;
    height: 100%;

  }

  #menu_main {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  #menu_main li {
    color: #8391a5;
    text-align: center;
    padding: 8px 0 8px 0;
  }

  #menu_main li:hover {
    color: rgb(32, 160, 255);
    text-align: center;
    padding: 8px 0 8px 0;
  }

  #menu_main li .active {
    color: #8391a5;
    background: #e3e3e3;
    text-align: center;
    padding: 8px 0 8px 0;
  }

  #menu_main li .active {
    border-left-color: #f2f6f9;
    -moz-border-left-colors: #f2f6f9;
  }

  #menu_main li .active {
    display: block;
    content: "";
    position: absolute;
    top: -1px;
    right: -10px;
    bottom: auto;
    z-index: 1;
    border-style: solid;
    border-width: 20px 0 21px 10px;
    border-color: transparent;
  }
</style>

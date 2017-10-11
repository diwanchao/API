<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  /* eslint-disable camelcase */

  export default {
    name: 'Index',
    data () {
      return {}
    },
    mounted: function () {
      this.loaded()
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
        let self = this
        // 验证用户Token
        if (this.$tools.CheckCookie('UserToken')) {
          // http request 拦截器
          this.$http.interceptors.request.use(
            config => {
              config.headers.UserToken = `${self.$tools.GetCookie('UserToken')}`
              return config
            },
            err => {
              return Promise.reject(err)
            })
          // 获取菜单数据
          this.$tools.GetDataFromServer(
            this,
            this.$server_root + '/System/Menu/ListItem',
            function success (response) {
              if (self.$store.state.data_menu.length === 0) {
                let object_menu_children = []
                self.$store.state.data_menu = response.data.MenuInfo.Itemlist
                console.log(self.$store.state.data_menu)
                for (let i = 0; i < self.$store.state.data_menu.length; i++) {
                  if (self.$store.state.data_menu[i].Action !== '') {
                    // 动态生成子路由
                    object_menu_children.push(
                      {
                        path: '/' + self.$store.state.data_menu[i].Model + '/' + self.$store.state.data_menu[i].Function + '/' + self.$store.state.data_menu[i].Action,
                        name: self.$store.state.data_menu[i].Model + '/' + self.$store.state.data_menu[i].Function + '/' + self.$store.state.data_menu[i].Action,
                        component: function (resolve) {
                          require(['@/views' + '/' + self.$store.state.data_menu[i].Model + '/' + self.$store.state.data_menu[i].Function + '/' + self.$store.state.data_menu[i].Action], resolve)
                        }
                      }
                    )
                  }
                }
                // 将路由信息加入主路由
                self.$router.addRoutes([{
                  path: '/Frame',
                  name: 'Frame',
                  component: function (resolve) {
                    require(['@/views/Frame'], resolve)
                  },
                  children: object_menu_children
                }])
                self.$router.push('/Frame')
              }
            }
            ,
            function error (response) {
              console.log(response)
            }
          )
        } else {
          this.$router.push('/Login')
        }
      }
    }
  }
</script>

<style scoped>

</style>

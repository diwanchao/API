<template>
  <el-row>
    <el-col :span="17" style="padding:10px;">
      <el-form label-width="80px">
        <el-form-item :label="item.label" v-for="item in this.form_data"
                      :style="item.isshow == true?'':'display:none;'">
          <el-input :type="item.type" v-model="item.value" :placeholder="'请输入' + item.label"
                    v-if="item.type==EditType.TEXT" :disabled="item.disabled"/>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.TEXT"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <el-input :type="item.textarea" v-model="item.value" :placeholder="'请输入' + item.label"
                    v-if="item.type==EditType.TEXTAREA"/>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.TEXTAREA"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <el-select v-if="item.type==EditType.SELECT" :disabled="item.disabled" v-model="item.value"
                     @change="item.event != undefined? item.event.change(ParentView, item.value) : ''">
            <el-option
              :key="item.value"
              :label="item_option.value"
              :value="item_option.key"
              v-for="item_option in item.option"></el-option>
          </el-select>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.SELECT"
               :style="ruleform_data[item.key] == true?'display:inherit;':''">请输入{{ item.value }}
          </div>
          <el-radio-group v-if="item.type==EditType.RADIO" v-model="item.value">
            <el-radio
              v-for="item_radio in item.option"
              :label="item_radio.key">
              {{ item_radio.value }}
            </el-radio>
          </el-radio-group>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.RADIO"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <el-input-number v-model="item.value" @change="handleChange" :min="item.config.min" :max="item.config.max"
                           v-if="item.type==EditType.NUMBER"></el-input-number>
          <el-switch
            v-if="item.type==EditType.SWITCH"
            v-model="item.value"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
          <el-time-select
            v-model="item.value" v-if="item.type==EditType.TIME"
            :picker-options="item.option"
            :placeholder="'请选择' + item.label">
          </el-time-select>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.TIME"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <el-date-picker
            v-if="item.type==EditType.DATERANGE"
            v-model="item.value"
            :placeholder="item.label"
            type="daterange">
          </el-date-picker>
          <el-date-picker
            type="date"
            v-if="item.type==EditType.DATE"
            v-model="item.value"
            :placeholder="item.label"
            :picker-options="item.option">
          </el-date-picker>
          <el-checkbox-group v-model="item.value" v-if="item.type==EditType.CHECKLIST">
            <el-checkbox-button
              v-for="check in item.checkList"
              :label="check" :key="check" :value="check">
              {{ check }}
            </el-checkbox-button>
          </el-checkbox-group>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.CHECKLIST"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <el-cascader
            :options="item.options"
            v-model="item.selectedOptions"
            @change="handleChange"
            v-if="item.type==EditType.OPTION">
          </el-cascader>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.OPTION"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <el-slider v-model="item.value" v-if="item.type==EditType.SLIDER"></el-slider>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.SLIDER"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <el-rate v-model="item.value" v-if="item.type==EditType.RATE"></el-rate>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.RATE"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <el-color-picker v-model="item.color" v-if="item.type==EditType.COLOR"></el-color-picker>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.COLOR"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
          <ElementFileUpload :item_data="item" v-if="item.type==EditType.IMAGE">
          </ElementFileUpload>
          <UEditor :data_item="item" :defaultMsg="item.value"
                   :OnContentChange="OnContentChange" :config="item.config" ref="ue"
                   v-if="item.type==EditType.RICHTEXT"></UEditor>
          <div class="el-form-item__error hidden" v-if="item.type==EditType.RICHTEXT"
               :style="ruleform_data[item.name] == true?'display:inherit;':''">请输入{{ item.label }}
          </div>
        </el-form-item>
        <el-form-item :style="isshow == true?'':'display:none;'">
          <el-button @click="controller.button_onclick(ParentView,form_data)" :icon="controller.button_icon"
                     :type="controller.button_color"
                     v-for="controller in form_controller">
            {{controller.button_text}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  /* eslint-disable camelcase */
  export default {
    name: 'EditView',
    props: {
      form_data: {
        type: Array,
        default: []
      },
      SetData: {
        type: Function,
        default: null
      },
      form_controller: {
        type: Array,
        default: []
      },
      GetDataUrl: {
        type: String,
        default: ''
      },
      PostDataUrl: {
        type: String,
        default: ''
      },
      EditType: {
        type: Object,
        default: {}
      },
      DataUrl: {
        type: String,
        default: ''
      }
    },
    watch: {
      form_data: {
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
    data () {
      return {
        ruleform_data: [],
        isshow: false
      }
    },
    computed: {
      ParentView: function () {
        return this
      },
      temp_form_data: function () {
        let total = 0
        this.form_data.forEach(function (item) {
          total += item.count
        })
        return total
      }
    },
    mounted: function () {
      this.loaded()
      console.log(this.form_data)
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
        for (let i = 0; i < this.form_data.length; i++) {
          this.$set(this.form_data[i], 'isshow', false)
        }
      },
      SubmitForm: function (param_data) {
        let can_submit = true
        for (var i = 0; i < this.form_data.length; i++) {
//          this.rules[param_data[i]['name']] = [{required: param_data[i]['isrequire'], message: '请输入' + parad[i].label, trigger: 'blur'}]
          if (param_data[i].isrequire === true && param_data[i].value === '') {
            this.ruleform_data[param_data[i].name] = true
            this.ruleform_data.splice(param_data[i].name, 1, !this.ruleform_data[param_data[i].name])
            can_submit = false
          } else {
            this.ruleform_data[param_data[i].name] = false
            this.ruleform_data.splice(param_data[i].name, 1, !this.ruleform_data[param_data[i].name])
          }
        }
        if (can_submit === false) {
          this.$message.error('请检查表单数据！')
        } else {
          //        console.log(this.ruleform_data)
          var _self = this
          var get_data = {}
          for (i = 0; i < param_data.length; i++) {
            get_data[param_data[i]['name']] = param_data[i]['value']
          }
          console.log(get_data)
          if (this.$store.itemid) {
            get_data.ItemId = this.$store.itemid
            this.$tools.PostDataToServer(
              this,
              this.$server_root + this.DataUrl + 'ModifyItem',
              get_data,
              function success (response) {
                if (response.data.State.Code === 1) {
                  _self.$message({
                    message: '保存成功',
                    type: 'success',
                    showClose: true
                  })
                } else {
                  _self.$message.error(response.data.State.Message)
                }
              },
              function error (error) {
                console.log(error)
              }
            )
          } else {
            this.$tools.PostDataToServer(
              this,
              this.$server_root + this.DataUrl + 'AddItem',
              get_data,
              function success (response) {
                if (response.data.State.Code === 1) {
                  _self.$message({
                    message: '保存成功',
                    type: 'success',
                    showClose: true
                  })
                } else {
                  _self.$message.error(response.data.State.Message)
                }
              },
              function error (error) {
                console.log(error)
              }
            )
          }
        }
      },
      OnContentChange: function (param_object, param_text) {
        param_object.value = param_text
      },
      GetFormItem: function (param_name) {
        for (let i = 0; i < this.form_data.length; i++) {
          if (this.form_data[i].name === param_name) {
            this.form_data[i].disabled = false
            return this.form_data[i]
          }
        }
      },
      LoadData: function (param_url) {
        let self = this
        if (this.$store.itemid) {
          this.$tools.GetDataFromServer(
            this,
            param_url,
            function success (response) {
              let current_data = self.SetData(response.data)
              for (let i = 0; i < self.form_data.length; i++) {
                self.form_data[i].value = current_data[self.form_data[i].name]
              }
              for (let i = 0; i < self.form_data.length; i++) {
                self.$set(self.form_data[i], 'isshow', true)
              }
              self.isshow = true
              return self.form_data
            },
            function error (error) {
              console.log(error)
              return self.form_data
            }
          )
        } else {
          self.isshow = true
          for (let i = 0; i < self.form_data.length; i++) {
            self.$set(self.form_data[i], 'isshow', true)
          }
        }
        return self.form_data
      }
    }
  }
</script>

<style>
  .hidden {
    display: none;
  }

  .avatar-uploader .el-upload {
    border: 2px dashed gray;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

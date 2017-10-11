<template>
  <div>
    <div ref="echart" :style="chart_config.chart_style"></div>
  </div>
</template>
<script>
  /* eslint-disable func-call-spacing */
  export default {
    name: 'EChart',
    data () {
      return {
        id: this.$tools.GetGuid() + '_echart',
        echart: null,
        data_demo: {
          chart_data: {
            title: {text: 'echarts'}, // 标题
            draggable: true, /* 可拖拽 */
            grid: {}, // 网格
            visualMap: { // 直观图的显示
              type: 'continuous',
              dimension: 1, // 指定用数据的『哪个维度』，映射到视觉元素上。
              text: ['High', 'Low'], // 文本名称
              inverse: false, // 是否翻转
              itemHeight: 300, // 高度
              calculable: true, // 是否显示拖拽用的手柄
              max: 40, // 最大值
              min: 2, // 最小值
              bottom: 25, // 距离底部的位置
              left: 10, // 距离左边的位置
              inRange: {
                colorLightness: [0.4, 0.8]
              }, // 颜色渐变
              outOfRange: {color: '#bbb'}, // 在选中范围外的视觉元素
              controller: {inRange: {color: '#2f4554'}} // 有了这个控制器，会采用控制器里面你的设置
            },
            brush: {
              toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'], // 选择什么样的选择类型，矩形选择、圈行选择、横向选择、纵向选择、保持选择、清除选择
              xAxisIndex: 0}, /* 指定哪些 xAxisIndex 可以被刷选。 */
            toolbox: {
              feature: {
                magicType: { // 动态类型切换
                  type: ['stack', 'tiled'] // 平铺和叠加
                },
                dataView: {} // 数据视图
              }
            },  // 选择为折叠、平铺或数据的文字显示
            legend: { /* 图例 */
              orient: 'vertical', // 图例列表的布局朝向。
              align: 'left', // 放置位置
              left: 100, /* 图例的位置 */
              data: ['销量2'] // 图例的数据
            },
            tooltip: { // 提示框组件。
              trigger: 'axis', // 触发类型
              axisPointer: { // 坐标轴指示器配置项。
                type: 'shadow'
              }
            },  // 坐标轴指示器，坐标轴触发有效
            xAxis: [
              {
                type: 'value' // 坐标轴类型。
              }
            ], /* 横坐标数据 */
            dataZoom: [
              {
                type: 'slider',
                show: true,
                xAxisIndex: [0] // 设置 dataZoom-inside 组件控制的 y轴
              }, /* 可滑动 */
              {
                type: 'slider',
                show: true,
                yAxisIndex: [0]
              },
              {
                type: 'inside',
                xAxisIndex: [0]
              }, /* 可放大 */
              {
                type: 'inside',
                yAxisIndex: [0]
              }
            ],
            yAxis: [
              {
                type: 'category', // 类目轴
                inverse: false, // 是否是反向坐标轴
                splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                  show: false
                },
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
              }
            ], // 设定Y坐标轴
            series: [ // 系列列表
              {
                name: '销量2', // 系列名称
                type: 'bar', // 默认是line
                data: [-5, 20, 36, 10, 10, 20],
                animationDelay: function (idx) { /* 显示延迟效果 */
                  return idx * 1000
                }
              }
            ]
          },
          chart_style: {
            width: '100%',
            height: '400px'
          }
        }
      }
    },
    props: {
      chart_config: {
        type: Object,
        default: {}
      }
    },
    watch: {},
    mounted () {
      this.$refs.echart.id = this.id
      // 基于准备好的dom，初始化echarts实例
      this.echart = this.$echarts.init(document.getElementById(this.$refs.echart.id))
      // 绘制图表
      this.echart.setOption(this.chart_config.chart_data)
    },
    methods: {
      loaded: function () {
      }
    }
//    ,
//    destroyed () {
//      this.echart.destroy()
//    }
  }
</script>

<template>
  <div>
    <h2>Ocean Warming</h2>
    <div class="chart" id="fourChart"></div>
  </div>
</template>

<script>
import { inject, onMounted, reactive } from "vue";
export default {
  setup() {
    // 引入echarts
    let $echarts = inject("echarts");
    let $http = inject("axios");
    // 数据接收
    let fourData = reactive({});

    let x = reactive([]);
    let y1 = reactive([]);
    let y2 = reactive([]);
    let y3 = reactive([]);
    let y4 = reactive([]);
    let y5 = reactive([]);
    let y6 = reactive([]);
    async function getState() {
      fourData = await $http({ url: "/four/data" });
      // console.log(fourData.data.chartFour);
    }
    function setData() {
      x = fourData.data.chartFour.map((v) => v.YEAR);
      y1 = fourData.data.chartFour.map((v) => v.WO);
      y2 = fourData.data.chartFour.map((v) => v.WOse);
      y3 = fourData.data.chartFour.map((v) => v.NH);
      y4 = fourData.data.chartFour.map((v) => v.NHse);
      y5 = fourData.data.chartFour.map((v) => v.SH);
      y6 = fourData.data.chartFour.map((v) => v.SHse);
    }
    onMounted(() => {
      // 初始化echarts
      let myChart = $echarts.init(document.getElementById("fourChart"));
      getState().then(() => {
        setData()
        console.log(x)
        myChart.setOption({
          animationDuration: 10000,
          title: {
            // text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['WO', 'WOse', 'NH', 'NHse', 'SH', 'SHse'],
            textStyle:{
              color:'white',
              // lineHeight:60,
            }
          },
          dataZoom: {
            show: true,
            type: 'inside',
            filterMode: 'none',
            // xAxisIndex: [0],
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: x,
            name: 'YEAR',
            nameLocation: 'center',
            nameTextStyle:{
              color:'white',
              lineHeight:40,
            }
          },
          yAxis: {
            type: 'value'
          },
          
          series: [
            {
              endLabel: {
                color :'white',
                show: true,
                fontSize: 11,
                borderWidth: 0,
                formatter: function (params) {
                  return params.seriesName + ':' + params.value;
                }
              },
              
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              name: 'WO',
              type: 'line',
              showSymbol: false,
              data: y1
            },
            {
              endLabel: {
                color :'white',
                show: true,
                fontSize: 11,
                borderWidth: 0,
                formatter: function (params) {
                  return params.seriesName + ':' + params.value;
                }
              },
              
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              name: 'WOse',
              type: 'line',
              showSymbol: false,
              data: y2
            },
            {
              endLabel: {
                color :'white',
                show: true,
                fontSize: 11,
                borderWidth: 0,
                formatter: function (params) {
                  return params.seriesName + ':' + params.value;
                }
              },
              
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              name: 'NH',
              type: 'line',
              showSymbol: false,
              data: y3
            },
            {
              endLabel: {
                color :'white',
                show: true,
                fontSize: 11,
                borderWidth: 0,
                formatter: function (params) {
                  return params.seriesName + ':' + params.value;
                }
              },
              
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              name: 'NHse',
              type: 'line',
              showSymbol: false,
              data: y4
            },
            {
              endLabel: {
                color :'white',
                show: true,
                fontSize: 11,
                borderWidth: 0,
                formatter: function (params) {
                  return params.seriesName + ':' + params.value;
                }
              },
              
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              name: 'SH',
              type: 'line',
              showSymbol: false,
              data: y5
            },
            {
              endLabel: {
                color :'white',
                show: true,
                fontSize: 11,
                borderWidth: 0,
                formatter: function (params) {
                  return params.seriesName + ':' + params.value;
                }
              },
              
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              name: 'SHse',
              type: 'line',
              showSymbol: false,
              data: y6
            },

          ]
        });
        window.onresize = myChart.resize;
      });
    });
    return {
      getState,
      fourData,
    };
  },
};
</script>

<style lang="less" scoped>
.chart {
  height: 7.5rem;
}

h2 {
  height: 0.9rem;
  color: #fff;
  line-height: 1rem;
  margin-left: 55px;
  text-align: left;
  font-size: 35px;
}
</style>
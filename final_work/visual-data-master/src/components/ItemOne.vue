<template>
  <div>
    <h2 >Gobal_temperature</h2>
    <div class="chart" id="oneChart">图标容器</div>
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
    let oneData = reactive({});
    let xData = reactive([]);
    let yData = reactive([]);
    let zData = reactive([]);
    function setData() {
      xData = oneData.data.chartOne.map((v) => v[0]);
      yData = oneData.data.chartOne.map((v) => v[1]);
      zData = oneData.data.chartOne.map((v) => v[2]);
      // console.log(xData);
      // console.log(yData);
    }
    async function getState() {
      oneData = await $http({ url: "/one/data" });
      // console.log(oneData.data.chartOne);
    }
    onMounted(() => {
      // 初始化echarts
      let myChart = $echarts.init(document.getElementById("oneChart"));
      getState().then(() => {
        setData();
        myChart.setOption({
          animationDuration: 2000,
          visualMap: [
            {
              show: false,
              type: 'continuous',
              seriesIndex: 1,
              dimension: 0,
              min: 0,
              max: xData.length - 1
            },
          ],
          title: [
            {
              // left: 'left',
              // text: 'Gobal_temperature'
            }
          ],

          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Annual mean', 'Lowess smoothing'],
            orient: 'vertical',
            left: '50px',
            textStyle:{
              color:'white',
              // lineHeight:60,
            }
          },
          xAxis: {
            data: xData,
            name: 'YEAR',
            splitLine:{
              show:true
            },
            position: 'bottom',
            nameLocation: 'center',
            nameTextStyle:{
              color:'white',
              lineHeight:60,
            }
            // gridIndex: 1
          }
          ,
          yAxis:
          {
            name: 'Temperature Anomaly',
            nameLocation: 'center',
            nameTextStyle:{
              color:'white',
              lineHeight:40,
            }
          },
          dataZoom:{
            show: true,
            type: 'inside',
            filterMode: 'none',
            // xAxisIndex: [0],
            startValue: '1976',
            endValue: '2012'
          }
          ,
          grid:
          {
            bottom: '40%'
          }
          ,
          toolbox: {

          },
          series: [
            {
              name: 'Annual mean',

              // smooth: true,
              type: 'line',
              // showSymbol: false,
              data: yData,
              // xAxisIndex: 1,
              // yAxisIndex: 1
            },
            {
              name: 'Lowess smoothing',
              type: 'line',
              showSymbol: false,
              data: zData,
              // xAxisIndex: 1,
              // yAxisIndex: 1
            }
          ]
        });
        window.onresize = myChart.resize;
      });
    });
    return {
      getState,
      oneData,
      xData,
      yData,
      zData,
      setData,
    };
  },
};
</script>

<style lang="less" scoped>
.chart {
  height: 10rem;
}

h2 {
  height: 0.9rem;
  color: #fff;
  line-height: 1rem;
  margin-left: 55px;
  text-align: left;
  font-size:35px;
}
</style>
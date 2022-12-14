<template>
  <div>
    <h2>1978-2021 Ice</h2>
    <div class="chart" id="twoChart"></div>
  </div>
</template>

<script>
import { inject, onMounted } from "vue";
export default {
  setup() {
    let $echarts = inject("echarts");
    // let $http = inject("axios");
    // let JJ = reactive({});
    async function getState() {
      // twoData = await $http({ url: "/two/data" });
      // JJ = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    }
    onMounted(() => {
      getState().then(() => {
        console.log("折线图");
        let myChart = $echarts.init(document.getElementById("twoChart"));
        myChart.setOption({

          tooltip: {
            // trigger: 'axis'
          },
          legend: {
            data: ['1979', '1984', '1989', '1994', '1999', '2004', '2009', '2014', '2019'],
            orient: 'vertical',
            right: '-2px',
            bottom: '80',
            icon: 'pin',
            // itemGap:'10',
            textStyle: {
              color: 'white',
              borderType: 'solid',
              fontSize: 10
              // lineHeight:60,
            }
          },
          toolbox: { //可以选择具体数据，柱状图，折线图，还原，保存图片的的切换选择
            show: true,
            showTitle: false,
            itemSize: 20,
            top: 10,
            left: 50,
            feature: {
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['line', 'bar'] //可选折线图和柱状图
              },
              restore: {
                show: true  //恢复默认
              },

            }
          },
          calculable: true,
          dataZoom: {
            show: true,
            type: 'inside',
            filterMode: 'none',
            // xAxisIndex: [0],
            startValue: "February",
            endValue: "May",
          },
          xAxis: [{
            type: 'category',
            data: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            name: 'Month',
            position: 'bottom',
            nameLocation: 'center',
            nameTextStyle: {
              color: 'white',
              lineHeight: 60,
            }

          }],
          yAxis: [{
            type: 'value',
            name: 'Ice coverage（m2)',
            position: 'bottom',
            nameLocation: 'center',
            nameTextStyle: {
              color: 'white',
              lineHeight: 40,
            }
          }],
          series: [{
            name: '1979',
            type: 'bar',// bar
            data: [15.41, 16.18, 16.34, 15.45, 13.86, 12.53, 10.31, 8.04, 7.05, 8.75, 10.94, 13.34],
            // color: '#CC0000'
          },
          {
            name: '1984',
            type: 'bar',//bar
            data: [14.47, 15.30, 15.58, 15.02, 13.58, 12.15, 9.98, 7.77, 6.81, 8.56, 10.84, 12.99, 11.91],
            // color: '#009999'
          },
          {
            name: '1989',
            type: 'bar',//bar
            data: [14.96, 15.50, 15.42, 14.33, 13.04, 12.25, 10.13, 7.88, 7.01, 8.83, 11.12, 13.39, 11.97],
            // color: '#009999'
          },
          {
            name: '1994',
            type: 'bar',//bar
            data: [14.73, 15.56, 15.55, 14.89, 13.62, 12.02, 9.93, 7.64, 7.14, 8.92, 11.12, 13.27, 12.01],
            // color: '#009999'
          },
          {
            name: '1999',
            type: 'bar',//bar
            data: [14.36, 15.31, 15.40, 15.08, 13.75, 11.78, 9.49, 7.23, 6.12, 8.60, 10.80, 12.64, 11.69],
            // color: '#009999'
          },
          {
            name: '2004',
            type: 'bar',//bar
            data: [14.03, 14.91, 14.99, 13.99, 12.56, 11.45, 9.43, 6.86, 5.98, 7.93, 10.34, 12.55, 11.24],
            // color: '#009999'
          },
          {
            name: '2009',
            type: 'bar',//bar
            data: [13.91, 14.81, 14.98, 14.50, 13.19, 11.32, 8.47, 6.14, 5.26, 6.92, 9.77, 12.20, 10.93],
            // color: '#009999'
          },
          {
            name: '2014',
            type: 'bar',//bar
            data: [13.65, 14.42, 14.76, 14.09, 12.70, 11.03, 8.11, 6.08, 5.22, 7.23, 10.12, 12.35, 10.79],
            // color: '#000f99'
          },
          {
            name: '2019',
            type: 'bar',//bar
            data: [13.57, 14.39, 14.57, 13.43, 12.19, 10.59, 7.59, 5.03, 4.36, 5.74, 9.35, 11.90, 10.20],
            // color: '#059900'
          },
          ]
        });
        // echarts自适应
        window.onresize = myChart.resize;
      });
    });
    return {

      getState,
    };
  },
};
</script>

<style scoped>
.chart {
  height: 7rem;
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
<template>
    <div class="map" id="map"></div>
</template>
  
<script>
import { onMounted, reactive, inject } from "vue";
export default {
    setup() {
        let axios = inject("axios");
        let $echarts = inject("echarts");
        let mapData = reactive({});
        async function getState() {
            mapData = await axios.get("/map/data");
            // console.log(mapData);
        }
        // let co2data = co2data.filter((item) => {
        //     return item.Country == 'Australia'
        // })
        onMounted(() => {
            getState().then(() => {
                let population = mapData.data.chartp;

                $echarts.registerMap("world", mapData.data.chartMap);
                let myChart = $echarts.init(document.getElementById("map"));
                myChart.setOption({
                    // geo: {
                    //     roam: true,
                    //     map: "world",
                    //     zoom: 3,
                        
                    // },
                    visualMap: {
                        min: 0,
                        max: 500000,
                        realtime: true,
                        calculable: true,
                        color: ['purple','orangered', 'yellow', 'lightskyblue',]
                    },
                    
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var value = (params.value + '').split('.');
                            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                                    + '.' + value[1];
                            return params.name + ' : ' + value;
                        }
                    },
                    title: {
                        text: "World Papulation(2010)",
                        left: 'center',

                        textStyle: {
                            color: "#fff",
                            fontSize: 50,
                            textShadowBlur: 5,
                            textShadowColor: "#33ffff",
                        }
                    },

                    series: [
                        {   
                            roam: true,
                            zoom: 3,
                            type: 'map',
                            mapType: 'world',
                            boundingCoords: [
                            // 定位左上角经纬度
                            [-10, 150],
                            // 定位右下角经纬度
                            [280, -90]
                        ],
                        scaleLimit: {
                            min: 1,
                        },
                        itemStyle: {
                            areaColor: "#0099ff",
                            borderColor: "#00ffff",
                            shadowColor: "rgba(230, 130, 70, 0.5)",
                            shadowBlur: 30,
                            emphasis: {
                                focus: "self",
                                areaColor: '#0a2dae',
                            },
                            normal: {
                                areaColor: '#3a7fd5',
                                borderColor: '#0a53e9', //线
                                shadowColor: '#092f8f', //外发光
                                shadowBlur: 20,
                            },

                        },

                            data:population,
                        },
                    ],
                });
            });
        });
        return {
            getState,
            mapData,
        };
    },
};
</script>
  
<style>
.map {
    height: 15rem;
    width: 15rem;
}
</style>
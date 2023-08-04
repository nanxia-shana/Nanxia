<template>
  <div class="map">
    <div id="main"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
import $ from "jquery";

onMounted(() => {
  setTimeout(() => {
    init();
  }, 300);
});

const init = () => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option: any;
  $.get("/src/assets/icons/amCharts-pixelMap.svg", function (svg: any) {
    echarts.registerMap("World", { svg: svg });
    option = {
      tooltip: {},
      visualMap: {
        left: "center",
        bottom: "10%",
        min: 5,
        max: 100,
        orient: "horizontal",
        text: ["", "Price"],
        realtime: true,
        calculable: true,
        inRange: {
          color: ["#dbac00", "#db6e00", "#cf0000"],
        },
      },
      series: [
        {
          name: "Country Data",
          type: "map",
          map: "World",
          roam: true,
          emphasis: {
            label: {
              show: false,
            },
          },
          selectedMode: false,
          data: [
            { name: "United Arab Emirates", value: 15 },
            { name: "Afghanistan", value: 35 },
            { name: "Albania", value: 15 },
            { name: "Armenia", value: 25 },
            { name: "Angola", value: 45 },
            { name: "Argentina", value: 85 },
            { name: "Austria", value: 25 },
            { name: "Australia", value: 15 },
            { name: "Azerbaijan", value: 55 },
            { name: "Bosnia and Herzegovina", value: 25 },
            { name: "Bangladesh", value: 65 },
            { name: "Belgium", value: 45 },
            { name: "Burkina Faso", value: 85 },
            { name: "Bulgaria", value: 35 },
            { name: "Burundi", value: 75 },
            { name: "Benin", value: 65 },
            { name: "Brunei Darussalam", value: 65 },
            { name: "Bolivia", value: 85 },
            { name: "Brazil", value: 75 },
            { name: "Bahamas", value: 65 },
            { name: "Bhutan", value: 55 },
            { name: "Botswana", value: 45 },
            { name: "Belarus", value: 85 },
            { name: "Belize", value: 15 },
            { name: "Canada", value: 65 },
            { name: "Democratic Republic of Congo", value: 45 },
            { name: "Central African Republic", value: 85 },
            { name: "Republic of Congo", value: 65 },
            { name: "Switzerland", value: 95 },
            { name: "Côte d'Ivoire", value: 60 },
            { name: "Chile", value: 60 },
            { name: "Cameroon", value: 60 },
            { name: "China", value: 100 },
            { name: "Colombia", value: 60 },
            { name: "Costa Rica", value: 20 },
            { name: "Cuba", value: 30 },
            { name: "Cyprus", value: 10 },
            { name: "Czechia", value: 50 },
            { name: "Germany", value: 40 },
            { name: "Djibouti", value: 60 },
            { name: "Denmark", value: 70 },
            { name: "Dominican Republic", value: 30 },
            { name: "Algeria", value: 50 },
            { name: "Ecuador", value: 60 },
            { name: "Estonia", value: 20 },
            { name: "Eritrea", value: 60 },
            { name: "Spain", value: 60 },
            { name: "Finland", value: 30 },
            { name: "Fiji", value: 60 },
            { name: "France", value: 60 },
            { name: "Gabon", value: 30 },
            { name: "United Kingdom", value: 20 },
            { name: "Georgia", value: 60 },
            { name: "French Guiana", value: 80 },
            { name: "Ghana", value: 90 },
            { name: "Greenland", value: 60 },
            { name: "Gambia", value: 20 },
            { name: "Guinea", value: 10 },
            { name: "Equatorial Guinea", value: 20 },
            { name: "Greece", value: 30 },
            { name: "Guatemala", value: 40 },
            { name: "Guinea-Bissau", value: 50 },
            { name: "Guyana", value: 60 },
            { name: "Honduras", value: 60 },
            { name: "Croatia", value: 20 },
            { name: "Haiti", value: 10 },
            { name: "Hungary", value: 60 },
            { name: "Israel", value: 50 },
            { name: "India", value: 60 },
            { name: "Iraq", value: 60 },
            { name: "Iran", value: 70 },
            { name: "Iceland", value: 60 },
            { name: "Italy", value: 90 },
            { name: "Jamaica", value: 60 },
            { name: "Jordan", value: 80 },
            { name: "Japan", value: 60 },
            { name: "Kenya", value: 80 },
            { name: "Kyrgyzstan", value: 10 },
            { name: "Cambodia", value: 20 },
            { name: "North Korea", value: 60 },
            { name: "South Korea", value: 20 },
            { name: "Kosovo", value: 60 },
            { name: "Kuwait", value: 30 },
            { name: "Kazakhstan", value: 30 },
            { name: "Lao People's Democratic Republic", value: 60 },
            { name: "Lebanon", value: 60 },
            { name: "Sri Lanka", value: 22 },
            { name: "Liberia", value: 60 },
            { name: "Lesotho", value: 30 },
            { name: "Lithuania", value: 60 },
            { name: "Luxembourg", value: 50 },
            { name: "Latvia", value: 77 },
            { name: "Libya", value: 60 },
            { name: "Morocco", value: 60 },
            { name: "Moldova", value: 60 },
            { name: "Montenegro", value: 10 },
            { name: "Madagascar", value: 20 },
            { name: "North Macedonia", value: 60 },
            { name: "Mali", value: 60 },
            { name: "Myanmar", value: 60 },
            { name: "Mongolia", value: 70 },
            { name: "Mauritania", value: 40 },
            { name: "Malawi", value: 60 },
            { name: "Mexico", value: 40 },
            { name: "Malaysia", value: 30 },
            { name: "Mozambique", value: 30 },
            { name: "Namibia", value: 60 },
            { name: "New Caledonia", value: 60 },
            { name: "Niger", value: 20 },
            { name: "Nigeria", value: 20 },
            { name: "Nicaragua", value: 60 },
            { name: "Netherlands", value: 10 },
            { name: "Norway", value: 10 },
            { name: "Nepal", value: 60 },
            { name: "New Zealand", value: 10 },
            { name: "Oman", value: 20 },
            { name: "Panama", value: 10 },
            { name: "Peru", value: 60 },
            { name: "Papua New Guinea", value: 60 },
            { name: "Philippines", value: 40 },
            { name: "Poland", value: 60 },
            { name: "Pakistan", value: 10 },
            { name: "Puerto Rico", value: 20 },
            { name: "Palestinian Territories", value: 60 },
            { name: "Portugal", value: 60 },
            { name: "Paraguay", value: 10 },
            { name: "Qatar", value: 50 },
            { name: "Romania", value: 50 },
            { name: "Serbia", value: 60 },
            { name: "Russia", value: 60 },
            { name: "Rwanda", value: 70 },
            { name: "Saudi Arabia", value: 70 },
            { name: "Solomon Islands", value: 60 },
            { name: "Slovenia", value: 60 },
            { name: "Svalbard and Jan Mayen", value: 60 },
            { name: "Slovakia", value: 80 },
            { name: "Sierra Leone", value: 60 },
            { name: "Svalbard and Jan Mayen", value: 90 },
            { name: "Slovakia", value: 60 },
            { name: "Sierra Leone", value: 90 },
            { name: "Senegal", value: 80 },
            { name: "Syria", value: 60 },
            { name: "Swaziland", value: 60 },
            { name: "Chad", value: 60 },
            { name: "French Southern and Antarctic Lands", value: 40 },
            { name: "Togo", value: 40 },
            { name: "Thailand", value: 60 },
            { name: "Tajikistan", value: 40 },
            { name: "Timor-Leste", value: 60 },
            { name: "Turkmenistan", value: 30 },
            { name: "Tunisia", value: 20 },
            { name: "Turkey", value: 20 },
            { name: "Trinidad and Tobago", value: 60 },
            { name: "Taiwan", value: 30 },
            { name: "Tanzania", value: 40 },
            { name: "Ukraine", value: 60 },
            { name: "Uganda", value: 60 },
            { name: "United States", value: 60 },
            { name: "Uruguay", value: 60 },
            { name: "Uzbekistan", value: 60 },
            { name: "Venezuela", value: 10 },
            { name: "Vietnam", value: 10 },
            { name: "Vanuatu", value: 60 },
            { name: "Yemen", value: 60 },
            { name: "South Africa", value: 80 },
            { name: "Zambia", value: 60 },
            { name: "Zimbabwe", value: 80 },
            { name: "Egypt", value: 60 },
            { name: "Western Sahara", value: 80 },
            { name: "South Sudan", value: 30 },
            { name: "El Salvador", value: 30 },
            { name: "Sudan", value: 60 },
            { name: "Sweden", value: 60 },
            { name: "Ethiopia", value: 20 },
            { name: "Falkland Islands", value: 30 },
            { name: "Somalia", value: 20 },
            { name: "Suriname", value: 20 },
            { name: "Indonesia", value: 60 },
            { name: "Ireland", value: 60 },
          ],
        },
      ],
    };
    myChart.setOption(option);
  });
  option && myChart.setOption(option);
};
</script>
<style lang="less" scoped>
.map {
  width: 100%;
  height: 100%;
  background-color: #505050;
  display: flex;
  justify-content: center;
  align-items: center;
}
#main {
  width: 100%;
  height: 100%;
}
</style>

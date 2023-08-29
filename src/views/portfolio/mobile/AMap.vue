<template>
  <div class="amap-mobile">
    <div id="container"></div>
    <div id="panel"></div>
    <div class="tool">
      <div class="tool-search" v-if="true">
        <input class="tool-search-input" type="text" v-model="searchValue" />
        <div class="tool-search-nav">
          <svg-icon name="nav" className="icon"></svg-icon>
        </div>
      </div>
      <div class="tool-nav" v-else>
        <div class="tool-nav-start">
          <div class="tool-nav-start-point"></div>
          <input class="tool-nav-start-input" type="text" placeholder="起始位置" v-model="startValue" />
        </div>
        <div class="tool-nav-line">
          <div class="tool-nav-line-left"></div>
          <svg-icon name="exchange" className="icon1" @click="exchange()"></svg-icon>
        </div>
        <div class="tool-nav-end">
          <div class="tool-nav-end-point"></div>
          <input class="tool-nav-end-input" type="text" placeholder="终点位置" v-model="endValue" />
        </div>
        <div class="tool-nav-type">
          <div
            class="tool-nav-type-item"
            :class="{ itemSel: navType == 'Driving' }"
            @click="initNav(startValue, endValue, 'Driving')">
            驾车
          </div>
          <div
            class="tool-nav-type-item"
            :class="{ itemSel: navType == 'Walking' }"
            @click="initNav(startValue, endValue, 'Walking')">
            步行
          </div>
          <div
            class="tool-nav-type-item"
            :class="{ itemSel: navType == 'Riding' }"
            @click="initNav(startValue, endValue, 'Riding')">
            骑行
          </div>
          <div
            class="tool-nav-type-item"
            :class="{ itemSel: navType == 'Transfer' }"
            @click="initNav(startValue, endValue, 'Transfer')">
            公交地铁
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { shallowRef } from "@vue/reactivity";
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  securityJsCode: "c086309e02a1b81384b8f3f33c9ff508",
};
let map = shallowRef(null);
const searchValue = ref("");
const startValue = ref("北京");
const endValue = ref("滨江");
const navType = ref("Driving");
onMounted(() => {
  initMap();
});
const initMap = () => {
  AMapLoader.load({
    key: "c73e9afb6ff55e23cdb5dbb04587a36a", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        mapStyle: "amap://styles/fresh", //设置地图的显示样式
        resizeEnable: true,
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 11, //初始化地图级别
        // center: [105.602725, 37.076636], //初始化地图中心点位置,不传自动定位
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

const initNav = (startIn, endIn, type) => {
  AMapLoader.load({
    key: "c73e9afb6ff55e23cdb5dbb04587a36a", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Driving", "AMap.Walking", "AMap.Riding", "AMap.Transfer"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        mapStyle: "amap://styles/fresh", //设置地图的显示样式
        resizeEnable: true,
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 11, //初始化地图级别
        // center: [105.602725, 37.076636], //初始化地图中心点位置,不传自动定位
      });
      var option = {
        map: map,
        panel: "panel",
      };
      navType.value = type;
      switch (type) {
        case "Driving":
          var driving = new AMap.Driving(option);
          driving.search(
            [
              { keyword: startIn, city: "" },
              { keyword: endIn, city: "" },
            ],
            function (status, result) {
              // 未出错时，result即是对应的路线规划方案
              console.log("navDriving", status, result);
            },
          );
          break;
        case "Walking":
          var walking = new AMap.Walking(option);
          walking.search(
            [
              { keyword: startIn, city: "" },
              { keyword: endIn, city: "" },
            ],
            function (status, result) {
              console.log("navWalking,步行路线数据查询失败", status, result);
            },
          );
          break;
        case "Riding":
          var riding = new AMap.Riding(option);
          riding.search(
            [
              { keyword: startIn, city: "" },
              { keyword: endIn, city: "" },
            ],
            function (status, result) {
              console.log("navRiding", status, result);
            },
          );
          break;
        case "Transfer":
          var transOptions = {
            map: map,
            city: "全国",
            panel: "panel",
            policy: AMap.TransferPolicy.LEAST_TIME,
          };
          var transfer = new AMap.Transfer(transOptions);
          transfer.search(
            [
              { keyword: startIn, city: "" },
              { keyword: endIn, city: "" },
            ],
            function (status, result) {
              console.log("navTransfer", status, result);
            },
          );
          break;
        default:
          var driving = new AMap.Driving(option);
          driving.search(
            [
              { keyword: startIn, city: "" },
              { keyword: endIn, city: "" },
            ],
            function (status, result) {
              // 未出错时，result即是对应的路线规划方案
              console.log("navDriving", status, result);
            },
          );
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
const exchange = () => {
  let temp = startValue.value;
  startValue.value = endValue.value;
  endValue.value = temp;
  initNav(startValue.value, endValue.value, navType.value);
};
</script>
<style lang="less" scoped>
.amap-mobile {
  width: 100%;
  height: 100%;
  background-color: #333;
  position: relative;
  .tool {
    width: 95%;
    padding: 10px;
    background-color: #f7f7f7;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    left: 2.5%;
    &-search {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-input {
        width: 84%;
        height: 26px;
        border-radius: 4px;
      }
      &-nav {
        width: 26px;
        height: 26px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .icon {
          width: 25px;
          height: 25px;
          padding: 2px;
          border-radius: 50%;
          border: 2px solid #333;
          box-sizing: border-box;
          fill: #333;
          cursor: pointer;
        }
      }
    }
    &-nav {
      width: 100%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: space-between;
      &-start,
      &-end {
        overflow: hidden;
        width: 100%;
        height: 30px;
        position: relative;
        &-point {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          left: 7.5px;
          top: 12px;
        }
        &-input {
          width: 100%;
          height: 100%;
          padding: 0 20px;
          font-size: 12px;
        }
      }
      &-start {
        border-radius: 8px 8px 0 0;
        &-point {
          background-color: #67c23a;
        }
      }
      &-start::after {
        content: "";
        width: 74%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 20px;
        background-color: #eee;
        z-index: 8;
      }
      &-end {
        border-radius: 0 0 8px 8px;
        &-point {
          background-color: #f56c6c;
        }
      }
      &-line {
        width: 74%;
        height: 0px;
        margin-left: 10px;
        position: relative;
        &-left {
          width: 1px;
          height: 14px;
          background-color: #eee;
          position: absolute;
          top: -7px;
          left: 0px;
          z-index: 8;
        }
        .icon1 {
          width: 22px;
          height: 22px;
          fill: #333;
          position: absolute;
          top: -11px;
          right: -40px;
          z-index: 8;
          cursor: pointer;
        }
      }
      &-type {
        width: 100%;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-item {
          padding: 0 10px;
          height: 24px;
          border-radius: 12px;
          font-size: 12px;
          color: #666;
          line-height: 24px;
          text-align: center;
          cursor: pointer;
        }
        &-item:hover {
          background: linear-gradient(to right, #5f79b3, #82a2d4);
          color: #fff;
        }
        .itemSel {
          background: linear-gradient(to right, #435782, #627aa1);
          color: #fff;
        }
      }
    }
  }
}
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
<!-- <style type="text/css">
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style> -->

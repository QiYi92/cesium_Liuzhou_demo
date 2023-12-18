<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import AmapMercatorTilingScheme from "../utils/AmapMercatorTilingScheme.js";
import * as Cesium from 'cesium';
import { onMounted } from 'vue';
onMounted(() => {
  // 创建一个 Cesium Viewer 对象
  const viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: true,  // 信息框
    geocoder: true,  // 地址查询
    homeButton: true,  // 回到初始位置按钮
    sceneModePicker: true,  // 场景模式选择器
    baseLayerPicker: true,  // 底图选择器
    navigationHelpButton: true,  // 导航帮助按钮
    animation: true,  // 动画控制按钮
    timeline: true,  // 时间线控制按钮
    fullscreenButton: true,  // 全屏按钮
    scene: {
      canvas: document.getElementById('cesiumContainer'),  // 场景画布
      resize: true,  // 自适应大小
    },
    // 创建一个 UrlTemplateImageryProvider 对象高德影像地形地图
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",  // 图层地址
    })
  });
  // 高德影像注记地图
  viewer.imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
        minimumLevel: 3,
        maximumLevel: 18,
        tilingScheme: new AmapMercatorTilingScheme(),  // 图层地址
      })
  );

  // 设置初始位置  Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
  const boundingSphere = new Cesium.BoundingSphere(
      Cesium.Cartesian3.fromDegrees(109.406944, 24.318611, 100),  // 经纬度十进制度数格式（DD）和高度
      15000  // 半径
  );

  // 定位到初始位置
  viewer.camera.flyToBoundingSphere(boundingSphere, {
    duration: 0,  // 飞行时间
  });
});


</script>

<style>
html,body,#cesiumContainer{
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
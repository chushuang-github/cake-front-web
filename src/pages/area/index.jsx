import React, { useRef, useEffect, useState } from 'react';
import { Space, Button, message } from 'antd';
import { areaAdd, areaQuery } from '../../api/area';
import './index.less';

export default function Area() {
  const mapRef = useRef();
  const [drawing, setDrawing] = useState(false);
  let map, mouseTool;
  useEffect(() => {
    map = new AMap.Map(mapRef.current, {
      center: [116.434381, 39.898515],
      zoom: 10,
    });
    initDrawMap();
  }, []);

  // 初始化绘制
  const initDrawMap = async () => {
    let res = await areaQuery();
    res.results.forEach((item) => {
      let path = item.path;
      let polygon = new AMap.Polygon({
        path,
        strokeColor: '#FF33FF',
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: '#1791fc',
        zIndex: 50,
      });
      map.add(polygon);
      let polyEditor = new AMap.PolyEditor(map, polygon);
    });
  };

  // 绘制多边形
  const drawPolygon = () => {
    setDrawing(true);
    mouseTool = new AMap.MouseTool(map);
    mouseTool.polygon({
      strokeColor: '#FF33FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillColor: '#1791fc',
      fillOpacity: 0.4,
      // 线样式还支持 'dashed'，strokeStyle是dashed时有效
      strokeStyle: 'solid',
      // strokeDasharray: [30,10],
    });
    // 绘制完成之后，双击鼠标，结束绘制，会执行下面的方法
    mouseTool.on('draw', function (event) {
      // path是一个对象，里面的lat和lng是经纬度参数 (将事件对象里面的obj属性，调用getPath方法，获取经纬度)
      let path = event.obj.getPath();
      let arr = path.map((item) => [item.lng, item.lat]);
      areaAdd({ city: '北京', path: arr }).then(() => {
        message.success('绘制成功');
        setDrawing(false);
      });
    });
  };

  return (
    <div className="container">
      {/* 地图容器，这个容器需要设置好宽度和高度 */}
      <div className="map" ref={mapRef}></div>
      <div className="btnWrapper">
        <Space>
          <Button
            type="primary"
            size="large"
            loading={drawing}
            onClick={drawPolygon}
          >
            {drawing ? '正在绘制' : '开始绘制'}
          </Button>
        </Space>
      </div>
    </div>
  );
}

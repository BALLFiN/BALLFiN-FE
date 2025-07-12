import { useMemo } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

type Point = [number, number];

// 4개월치(약 17주) 더미 데이터 생성
const { priceData, volumeData } = (() => {
  const pd: Point[] = [];
  const vd: Point[] = [];
  let time = Date.UTC(2025, 0, 1); // 2025-01-01
  for (let i = 0; i < 17; i++) {
    const price = Math.round(100 + Math.random() * 20);
    const vol = Math.round(1000 + Math.random() * 2000);
    pd.push([time, price]);
    vd.push([time, vol]);
    time += 7 * 24 * 3600 * 1000; // 7일 후
  }
  return { priceData: pd, volumeData: vd };
})();

export default function PriceVolumeChart() {
  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        backgroundColor: '#fff',
        zoomType: 'x',
        height: 500,
      },
      title: { text: '' },
      xAxis: {
        crosshair: {
          color: 'rgba(0,0,0,0.2)',
          dashStyle: 'ShortDot',
          width: 1,
        },
        type: 'datetime',
      },
      yAxis: [
        {
          title: { text: 'Price' },
          height: '65%',
          lineWidth: 2,
          crosshair: {
            color: 'rgba(0,0,0,0.2)',
            dashStyle: 'ShortDot',
            width: 1,
          },
        },
        {
          title: { text: 'Volume' },
          top: '70%',
          height: '30%',
          offset: 0,
          lineWidth: 2,
        },
      ],
      tooltip: {
        split: false,
        shared: true,
        crosshairs: true,
        formatter(this: any) {
          const p = this.points![0].point as Highcharts.Point;
          const v = this.points![1].point as Highcharts.Point;
          return `
          <b>${Highcharts.dateFormat('%Y-%m-%d', p.x)}</b><br/>
          가격: ${p.y}<br/>
          거래량: ${v.y}
        `;
        },
      },
      series: [
        {
          type: 'line',
          name: 'Price',
          data: priceData,
          yAxis: 0,
          tooltip: { valueDecimals: 0 },
        },
        {
          type: 'column',
          name: 'Volume',
          data: volumeData,
          yAxis: 1,
          color: '#c0d9e3',
          tooltip: { valueDecimals: 0 },
        },
      ],
      rangeSelector: {
        enabled: false,
      },
      navigator: { enabled: false },
      credits: { enabled: false },
    }),
    []
  );

  return <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={options} />;
}

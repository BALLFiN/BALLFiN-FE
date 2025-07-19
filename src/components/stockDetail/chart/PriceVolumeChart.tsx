import { useEffect, useMemo, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { HistoricalData, TimeRangePT } from '.';

type Point = [number, number];
export interface PriceVolumeChartProps {
  data: HistoricalData[];
  timeRange: TimeRangePT;
  showMA: Record<'ma5' | 'ma20' | 'ma60' | 'ma120', boolean>;
}

export default function PriceVolumeChart({ data, timeRange, showMA }: PriceVolumeChartProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import('highcharts/modules/annotations')
      .then((mod) => {
        const AnnotationsModule = (mod as any).default || mod;
        AnnotationsModule(Highcharts);
      })
      .finally(() => {
        setReady(true);
      });
  }, []);
  const { priceData, volumeData } = useMemo(() => {
    // 일/주/월봉 예시 로직 (원하시는 방식으로 변경)
    const arr = data.map((d) => ({
      ts: new Date(d.date).getTime(),
      close: d.close,
      volume: d.volume,
    }));
    let filtered = arr;
    if (timeRange === '1w') filtered = arr.filter((_, i) => i % 7 === 0);
    else if (timeRange === '1m') {
      const byMonth: Record<string, (typeof arr)[0]> = {};
      arr.forEach((i) => {
        const dt = new Date(i.ts);
        const key = `${dt.getFullYear()}-${dt.getMonth() + 1}`;
        byMonth[key] = i;
      });
      filtered = Object.values(byMonth).sort((a, b) => a.ts - b.ts);
    }
    return {
      priceData: filtered.map((i) => [i.ts, i.close] as Point),
      volumeData: filtered.map((i) => [i.ts, i.volume] as Point),
    };
  }, [data, timeRange]);

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        zoomType: 'x',
        backgroundColor: '#fff',
        height: 500,
      },

      title: { text: '' },
      xAxis: {
        type: 'datetime',
        crosshair: true,
        min: priceData[priceData.length - 10][0],
        max: priceData[priceData.length - 1][0],
      },
      yAxis: [
        {
          title: { text: 'Price' },
          height: '65%',
          lineWidth: 2,
          crosshair: true,
        },
        {
          title: { text: 'Volume' },
          top: '67%',
          height: '30%',
          offset: 0,
          lineWidth: 2,
        },
      ],
      tooltip: {
        shared: true,
        split: false,
      },
      series: [
        {
          type: 'line',
          name: 'Price',
          data: priceData,
          yAxis: 0,
          lineWidth: 2,
          marker: { enabled: false, radius: 3 },
          tooltip: {
            pointFormatter() {
              return `<b>${Highcharts.dateFormat('%Y-%m-%d', this.x)}</b><br/>가격: ${this.y}<br/>`;
            },
          },
        },
        {
          type: 'column',
          name: 'Volume',
          data: volumeData,
          yAxis: 1,
          color: '#c0d9e3',
          pointPadding: 0.05,
          groupPadding: 0.02,
          borderWidth: 0,
          tooltip: {
            pointFormatter() {
              return `거래량: ${this.y}<br/>`;
            },
          },
        },
      ],
      rangeSelector: { enabled: false },
      navigator: { enabled: false },
      credits: { enabled: false },
    }),
    []
  );

  if (!ready) return null;

  return <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={options} />;
}

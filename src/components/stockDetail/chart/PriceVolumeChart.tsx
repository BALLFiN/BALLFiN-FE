import { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { HistoricalData, TimeRangePT } from ".";
import { miniteTable } from "@/config/chart";

type Point = [number, number];
export interface PriceVolumeChartProps {
  data: HistoricalData[];
  timeRange: TimeRangePT;
  showMA: Record<"ma5" | "ma20" | "ma60" | "ma120", boolean>;
}

export default function PriceVolumeChart({
  data,
  timeRange,
}: PriceVolumeChartProps) {
  const [ready, setReady] = useState(false);

  // Annotations 모듈 안전 로딩 (환경별 export 방식 대응)
  useEffect(() => {
    (async () => {
      try {
        const mod: any = await import("highcharts/modules/annotations");
        const initFn =
          typeof mod === "function"
            ? mod
            : typeof mod?.default === "function"
              ? mod.default
              : null;
        if (initFn) {
          initFn(Highcharts);
        }
      } catch (_) {
        // 실패해도 치명적이지 않음
      } finally {
        setReady(true);
      }
    })();
  }, []);

  //  timeRange 에 따른 데이터 필터링 및 Point 생성
  const { priceData, volumeData } = useMemo(() => {
    const arr = data.map((d) => ({
      ts: new Date(d.date).getTime(),
      close: d.close,
      volume: d.volume,
    }));

    let filtered = arr;

    // 분/시간 단위
    if (miniteTable.some((m) => m.key === timeRange)) {
      // TODO: 분봉 API 데이터를 쓸 때 로직을 바꿔주세요
      filtered = arr;
    }

    // 일봉
    else if (timeRange === "1d") {
      filtered = arr;
    }

    // 주봉
    else if (timeRange === "1w") {
      filtered = arr.filter((_, i) => i % 7 === 0);
    }

    // 월봉
    else if (timeRange === "1mo") {
      const byMonth: Record<string, (typeof arr)[0]> = {};
      arr.forEach((item) => {
        const dt = new Date(item.ts);
        const key = `${dt.getFullYear()}-${dt.getMonth() + 1}`;
        byMonth[key] = item; // 마지막 업데이트된 달의 데이터를 남김
      });
      filtered = Object.values(byMonth).sort((a, b) => a.ts - b.ts);
    }

    // 연봉
    else if (timeRange === "1y") {
      const byYear: Record<string, (typeof arr)[0]> = {};
      arr.forEach((item) => {
        const yr = new Date(item.ts).getFullYear();
        byYear[yr] = item;
      });
      filtered = Object.values(byYear).sort((a, b) => a.ts - b.ts);
    }

    return {
      priceData: filtered.map((i) => [i.ts, i.close] as Point),
      volumeData: filtered.map((i) => [i.ts, i.volume] as Point),
    };
  }, [data, timeRange]);

  // 3) 차트 옵션
  const options: Highcharts.Options = useMemo(() => {
    const len = priceData.length;
    const start = len > 0 ? priceData[Math.max(0, len - 10)][0] : undefined;
    const end = len > 0 ? priceData[len - 1][0] : undefined;

    return {
      chart: {
        zoomType: "x",
        backgroundColor: "#fff",
        height: 500,
      },
      accessibility: { enabled: false },
      title: { text: "" },
      xAxis: {
        type: "datetime",
        crosshair: true,
        ...(start !== undefined ? { min: start } : {}),
        ...(end !== undefined ? { max: end } : {}),
      },
      yAxis: [
        {
          title: { text: "Price" },
          height: "65%",
          lineWidth: 2,
          crosshair: true,
        },
        {
          title: { text: "Volume" },
          top: "67%",
          height: "30%",
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
          type: "line",
          name: "Price",
          data: priceData,
          yAxis: 0,
          lineWidth: 2,
          marker: { enabled: false, radius: 3 },
          tooltip: {
            pointFormatter() {
              return `<b>${Highcharts.dateFormat("%Y-%m-%d", this.x)}</b><br/>가격: ${this.y}<br/>`;
            },
          },
        },
        {
          type: "column",
          name: "Volume",
          data: volumeData,
          yAxis: 1,
          color: "#c0d9e3",
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
    };
  }, [priceData, volumeData]);

  if (!ready) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={options}
    />
  );
}

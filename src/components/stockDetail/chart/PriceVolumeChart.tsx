import { useEffect, useMemo, useRef, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { TimeRangePT } from ".";
import type { HistoricalData } from "@/config/chart";
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
  showMA,
}: PriceVolumeChartProps) {
  // 초기부터 렌더링하여 차트가 안 보이는 문제 방지
  const [ready, setReady] = useState(true);
  const tvContainerRef = useRef<HTMLDivElement | null>(null);
  const [tvReady, setTvReady] = useState(false);

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
        // 모듈 로딩 실패/성공과 무관하게 이미 렌더링 중
        setReady(true);
      }
    })();
  }, []);

  // TradingView Lightweight Charts 렌더링 (가능하면 우선 사용)
  useEffect(() => {
    let chart: any | null = null;
    let candleSeries: any | null = null;
    let volumeSeries: any | null = null;
    let ma5Series: any | null = null;
    let ma20Series: any | null = null;
    let ma60Series: any | null = null;
    let ma120Series: any | null = null;

    (async () => {
      if (!tvContainerRef.current) return;
      try {
        const tv = await import("lightweight-charts");
        const { createChart, CandlestickSeries, HistogramSeries, LineSeries } =
          tv as any;

        chart = createChart(tvContainerRef.current, {
          layout: {
            textColor: "#334155",
            background: { type: "solid", color: "#ffffff" },
          },
          grid: {
            vertLines: { color: "#f1f5f9" },
            horzLines: { color: "#f1f5f9" },
          },
          rightPriceScale: { borderColor: "#e2e8f0" },
          timeScale: {
            borderColor: "#e2e8f0",
            fixLeftEdge: true,
            fixRightEdge: true,
            barSpacing: 2,
          },
          autoSize: true,
        });

        candleSeries = chart.addSeries(CandlestickSeries, {
          upColor: "#16a34a",
          downColor: "#ef4444",
          borderVisible: false,
          wickUpColor: "#16a34a",
          wickDownColor: "#ef4444",
        });

        volumeSeries = chart.addSeries(HistogramSeries, {
          priceFormat: { type: "volume" },
          color: "#cbd5e1",
        });
        // 상단 70% 가격, 하단 25% 거래량 영역 확보
        (candleSeries as any)
          .priceScale()
          .applyOptions({ scaleMargins: { top: 0.05, bottom: 0.3 } });
        (volumeSeries as any)
          .priceScale()
          .applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });

        const tvCandles = data.map((d) => ({
          time: d.date, // YYYY-MM-DD
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
        }));
        const tvVolumes = data.map((d) => ({
          time: d.date,
          value: d.volume,
          color: d.close >= d.open ? "#9bd3ae" : "#f3b6b6",
        }));

        candleSeries.setData(tvCandles);
        volumeSeries.setData(tvVolumes);

        // MA 시리즈
        const makeLine = (color: string) =>
          chart.addSeries(LineSeries, {
            color,
            priceLineVisible: false,
            lastValueVisible: false,
            lineWidth: 2,
          });
        if (showMA.ma5) {
          ma5Series = makeLine("#8b5cf6");
          ma5Series.setData(
            data
              .filter((d) => d.ma5 != null)
              .map((d) => ({ time: d.date, value: d.ma5! }))
          );
        }
        if (showMA.ma20) {
          ma20Series = makeLine("#10b981");
          ma20Series.setData(
            data
              .filter((d) => d.ma20 != null)
              .map((d) => ({ time: d.date, value: d.ma20! }))
          );
        }
        if (showMA.ma60) {
          ma60Series = makeLine("#fb923c");
          ma60Series.setData(
            data
              .filter((d) => d.ma60 != null)
              .map((d) => ({ time: d.date, value: d.ma60! }))
          );
        }
        if (showMA.ma120) {
          ma120Series = makeLine("#3b82f6");
          ma120Series.setData(
            data
              .filter((d) => d.ma120 != null)
              .map((d) => ({ time: d.date, value: d.ma120! }))
          );
        }

        chart.timeScale().fitContent();
        setTvReady(true);
      } catch {
        setTvReady(false);
      }
    })();

    return () => {
      if (chart && tvContainerRef.current) {
        try {
          chart.remove?.();
        } catch {}
      }
    };
  }, [data, showMA]);

  //  timeRange 에 따른 데이터 필터링 및 Point 생성
  const {
    ohlcData,
    volumePoints,
    ma5Data,
    ma20Data,
    ma60Data,
    ma120Data,
    lastClose,
  } = useMemo(() => {
    const arr = data.map((d) => ({
      ts: new Date(d.date).getTime(),
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: d.volume,
      ma5: d.ma5,
      ma20: d.ma20,
      ma60: d.ma60,
      ma120: d.ma120,
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

    const ohlcData = filtered.map(
      (i) =>
        [i.ts, i.open, i.high, i.low, i.close] as unknown as [
          number,
          number,
          number,
          number,
          number,
        ]
    );
    const volumePoints = filtered.map((i) => ({
      x: i.ts,
      y: i.volume,
      color: (i.close ?? 0) >= (i.open ?? 0) ? "#9bd3ae" : "#f3b6b6",
    })) as unknown as Highcharts.PointOptionsObject[];

    const last = filtered[filtered.length - 1];

    return {
      ohlcData,
      volumePoints,
      ma5Data: filtered
        .filter((i) => i.ma5 !== undefined)
        .map((i) => [i.ts, i.ma5 as number] as Point),
      ma20Data: filtered
        .filter((i) => i.ma20 !== undefined)
        .map((i) => [i.ts, i.ma20 as number] as Point),
      ma60Data: filtered
        .filter((i) => i.ma60 !== undefined)
        .map((i) => [i.ts, i.ma60 as number] as Point),
      ma120Data: filtered
        .filter((i) => i.ma120 !== undefined)
        .map((i) => [i.ts, i.ma120 as number] as Point),
      lastClose: last?.close,
    };
  }, [data, timeRange]);

  // 3) 차트 옵션
  const options: Highcharts.Options = useMemo(() => {
    const len = ohlcData.length;
    const start = len > 0 ? ohlcData[Math.max(0, len - 10)][0] : undefined;
    const end = len > 0 ? ohlcData[len - 1][0] : undefined;

    return {
      chart: {
        zoomType: "x",
        backgroundColor: "#ffffff",
        height: 500,
      },
      accessibility: { enabled: false },
      title: { text: "" },
      xAxis: {
        type: "datetime",
        crosshair: true,
        ...(start !== undefined ? { min: start } : {}),
        ...(end !== undefined ? { max: end } : {}),
        gridLineWidth: 1,
        gridLineColor: "#f1f5f9",
      },
      yAxis: [
        {
          title: { text: "" },
          height: "65%",
          lineWidth: 2,
          crosshair: true,
          opposite: true,
          gridLineColor: "#eef2f7",
          labels: { style: { color: "#475569" } },
        },
        {
          title: { text: "" },
          top: "67%",
          height: "30%",
          offset: 0,
          lineWidth: 2,
          opposite: true,
          gridLineColor: "#f1f5f9",
          labels: { style: { color: "#64748b" } },
        },
      ],
      tooltip: {
        shared: false,
        split: true,
      },
      series: [
        {
          type: "candlestick",
          name: "Price",
          data: ohlcData as any,
          yAxis: 0,
          tooltip: { valueDecimals: 2 },
          color: "#ef4444",
          lineColor: "#ef4444",
          upColor: "#16a34a",
          upLineColor: "#16a34a",
          pointPadding: 0,
          dataGrouping: { enabled: false },
        },
        {
          type: "column",
          name: "Volume",
          data: volumePoints as any,
          yAxis: 1,
          color: "#d1e3ea",
          pointPadding: 0.05,
          groupPadding: 0.02,
          borderWidth: 0,
          tooltip: { valueDecimals: 0 },
        },
        {
          type: "line",
          name: "MA5",
          data: ma5Data,
          color: "#8b5cf6",
          yAxis: 0,
          visible: !!showMA.ma5,
          tooltip: { valueDecimals: 2 },
        },
        {
          type: "line",
          name: "MA20",
          data: ma20Data,
          color: "#10b981",
          yAxis: 0,
          visible: !!showMA.ma20,
          tooltip: { valueDecimals: 2 },
        },
        {
          type: "line",
          name: "MA60",
          data: ma60Data,
          color: "#fb923c",
          yAxis: 0,
          visible: !!showMA.ma60,
          tooltip: { valueDecimals: 2 },
        },
        {
          type: "line",
          name: "MA120",
          data: ma120Data,
          color: "#3b82f6",
          yAxis: 0,
          visible: !!showMA.ma120,
          tooltip: { valueDecimals: 2 },
        },
      ],
      rangeSelector: { enabled: false },
      navigator: { enabled: false },
      credits: { enabled: false },
    };
  }, [
    ohlcData,
    volumePoints,
    ma5Data,
    ma20Data,
    ma60Data,
    ma120Data,
    showMA,
    lastClose,
  ]);

  if (!ready) {
    return <div className="h-[500px] bg-gray-100 rounded" />;
  }

  return tvReady ? (
    <div ref={tvContainerRef} className="h-[500px] w-full" />
  ) : (
    <HighchartsReact
      key={`${timeRange}-${ohlcData.length}`}
      highcharts={Highcharts}
      constructorType="stockChart"
      options={options}
    />
  );
}

import { useEffect, useMemo, useRef, useState, memo } from "react";
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

const PriceVolumeChart = memo(function PriceVolumeChart({
  data,
  timeRange,
  showMA,
}: PriceVolumeChartProps) {
  // TradingView 차트 우선 사용
  const [ready, setReady] = useState(false);
  const tvContainerRef = useRef<HTMLDivElement | null>(null);
  const [tvReady, setTvReady] = useState(false);
  const [tvFailed, setTvFailed] = useState(false);

  // TradingView 실패 시에만 Highcharts 모듈 로딩
  useEffect(() => {
    if (tvFailed) {
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
    }
  }, [tvFailed]);

  // 1) 데이터 정렬 및 이동평균(MA) 계산
  const computedData = useMemo(() => {
    const sorted = [...data]
      .map((d) => ({ ...d, ts: new Date(d.date).getTime() }))
      .sort((a, b) => a.ts - b.ts);

    const addSMA = (
      arr: (typeof sorted)[number][],
      windowSize: number,
      key: "ma5" | "ma20" | "ma60" | "ma120"
    ) => {
      let sum = 0;
      const q: number[] = [];
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i].close;
        q.push(arr[i].close);
        if (q.length > windowSize) sum -= q.shift() as number;
        if (q.length === windowSize) {
          (arr[i] as any)[key] = +(sum / windowSize).toFixed(2);
        }
      }
    };

    addSMA(sorted as any, 5, "ma5");
    addSMA(sorted as any, 20, "ma20");
    addSMA(sorted as any, 60, "ma60");
    addSMA(sorted as any, 120, "ma120");

    return sorted.map(({ ts, ...rest }) => rest);
  }, [data]);

  // TradingView Lightweight Charts 렌더링 (가능하면 우선 사용)
  useEffect(() => {
    let chart: any | null = null;
    let candleSeries: any | null = null;
    let volumeSeries: any | null = null;
    let ma5Series: any | null = null;
    let ma20Series: any | null = null;
    let ma60Series: any | null = null;
    let ma120Series: any | null = null;

    // TradingView 로딩 타임아웃 (3초)
    const timeoutId = setTimeout(() => {
      if (!tvReady && !tvFailed) {
        console.log("TradingView 차트 로딩 타임아웃, Highcharts로 폴백");
        setTvFailed(true);
      }
    }, 3000);

    (async () => {
      if (!tvContainerRef.current) return;
      try {
        const tv = await import("lightweight-charts");
        const {
          createChart,
          CandlestickSeries,
          HistogramSeries,
          LineSeries,
          CrosshairMode,
          LineStyle,
        } = tv as any;

        const container = tvContainerRef.current;
        chart = createChart(container, {
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
            fixLeftEdge: false,
            fixRightEdge: false,
            barSpacing: 2,
            rightOffset: 0,
          },
          crosshair: {
            mode: CrosshairMode.Normal,
            vertLine: {
              color: "#94a3b8",
              width: 1,
              style: LineStyle.Dashed,
              labelBackgroundColor: "#0f172a",
            },
            horzLine: {
              color: "#94a3b8",
              width: 1,
              style: LineStyle.Dashed,
              labelBackgroundColor: "#0f172a",
            },
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

        const tvCandles = computedData.map((d) => ({
          time: d.date, // YYYY-MM-DD
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
        }));
        const tvVolumes = computedData.map((d) => ({
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
            priceLineVisible: true,
            lastValueVisible: true,
            lineWidth: 2.5,
            lineStyle: 0, // solid
            crossHairMarkerVisible: true,
          });
        if (showMA.ma5) {
          ma5Series = makeLine("#8b5cf6");
          ma5Series.setData(
            computedData
              .filter((d) => d.ma5 != null)
              .map((d) => ({ time: d.date, value: d.ma5! }))
          );
        }
        if (showMA.ma20) {
          ma20Series = makeLine("#10b981");
          ma20Series.setData(
            computedData
              .filter((d) => d.ma20 != null)
              .map((d) => ({ time: d.date, value: d.ma20! }))
          );
        }
        if (showMA.ma60) {
          ma60Series = makeLine("#fb923c");
          ma60Series.setData(
            computedData
              .filter((d) => d.ma60 != null)
              .map((d) => ({ time: d.date, value: d.ma60! }))
          );
        }
        if (showMA.ma120) {
          ma120Series = makeLine("#3b82f6");
          ma120Series.setData(
            computedData
              .filter((d) => d.ma120 != null)
              .map((d) => ({ time: d.date, value: d.ma120! }))
          );
        }

        chart.timeScale().fitContent();

        // 반응형: ResizeObserver로 컨테이너 크기 변경 시 차트 리사이즈
        let resizeObserver: ResizeObserver | null = null;
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(() => {
            try {
              const { clientWidth, clientHeight } = container;
              if (clientWidth && clientHeight) {
                chart.applyOptions({
                  width: clientWidth,
                  height: clientHeight,
                });
              }
            } catch {}
          });
          resizeObserver.observe(container);
        } else {
          // 폴백: 윈도우 리사이즈
          const onResize = () => {
            try {
              const { clientWidth, clientHeight } = container;
              chart.applyOptions({ width: clientWidth, height: clientHeight });
            } catch {}
          };
          window.addEventListener("resize", onResize);
          // cleanup에서 제거
          (chart as any).__onResize = onResize;
        }
        setTvReady(true);
        setTvFailed(false);
        clearTimeout(timeoutId); // 성공 시 타임아웃 클리어
      } catch (error) {
        console.error("TradingView 차트 로딩 실패:", error);
        setTvReady(false);
        setTvFailed(true);
        clearTimeout(timeoutId); // 실패 시 타임아웃 클리어
      }
    })();

    return () => {
      clearTimeout(timeoutId); // 컴포넌트 언마운트 시 타임아웃 클리어
      if (chart && tvContainerRef.current) {
        try {
          chart.remove?.();
        } catch {}
      }
      // 리사이즈 옵저버/리스너 정리
      try {
        const onResize = (chart as any)?.__onResize;
        if (onResize) {
          window.removeEventListener("resize", onResize);
        }
      } catch {}
    };
  }, [computedData, showMA, tvReady, tvFailed]);

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
    // 이동평균이 포함된 데이터 기준으로 가공
    const arr = computedData.map((d) => ({
      ts: new Date(d.date).getTime(),
      dateStr: d.date,
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

    // 주봉: ISO 주 기준으로 그룹핑하여 주별 마지막 데이터 사용
    else if (timeRange === "1w") {
      const byWeek: Record<string, (typeof arr)[0]> = {};
      const getIsoWeekKey = (ts: number) => {
        const d = new Date(ts);
        // ISO 주 번호 계산
        const target = new Date(
          Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
        );
        const dayNum = (target.getUTCDay() + 6) % 7; // 월=0 ... 일=6
        target.setUTCDate(target.getUTCDate() - dayNum + 3); // 목요일 기준
        const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
        const weekNo =
          1 +
          Math.round(
            ((target.getTime() - firstThursday.getTime()) / 86400000 -
              3 +
              ((firstThursday.getUTCDay() + 6) % 7)) /
              7
          );
        const year = target.getUTCFullYear();
        return `${year}-W${String(weekNo).padStart(2, "0")}`;
      };

      arr.forEach((item) => {
        const key = getIsoWeekKey(item.ts);
        byWeek[key] = item; // 같은 주의 마지막 아이템으로 갱신
      });
      filtered = Object.values(byWeek).sort((a, b) => a.ts - b.ts);
    }

    // 월봉
    else if (timeRange === "1mo") {
      const byMonth: Record<string, (typeof arr)[0]> = {};
      arr.forEach((item) => {
        const dt = new Date(item.ts);
        const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
        byMonth[key] = item; // 월별 마지막 데이터로 갱신
      });
      filtered = Object.values(byMonth).sort((a, b) => a.ts - b.ts);
    }

    // 연봉
    else if (timeRange === "1y") {
      const byYear: Record<string, (typeof arr)[0]> = {};
      arr.forEach((item) => {
        const yr = new Date(item.ts).getFullYear();
        byYear[String(yr)] = item; // 연도별 마지막 데이터
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

  // 3) 차트 옵션 (최적화)
  const options: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        zoomType: "x",
        backgroundColor: "#ffffff",
        height: 500,
        animation: {
          duration: 500, // 부드러운 전환을 위한 애니메이션
          easing: "easeInOutCubic",
        },
        reflow: true, // 컨테이너 크기 변화에 반응
      },
      accessibility: { enabled: false },
      title: { text: "" },
      xAxis: {
        type: "datetime",
        crosshair: {
          width: 1,
          color: "#94a3b8",
          dashStyle: "Dash",
          snap: true,
          label: {
            enabled: true,
            backgroundColor: "#0f172a",
            borderRadius: 4,
            style: { color: "#fff" },
          },
        },
        gridLineWidth: 1,
        gridLineColor: "#f1f5f9",
        labels: {
          step: Math.max(1, Math.floor(ohlcData.length / 10)), // 라벨 수 줄이기
        },
        tickPixelInterval: 80,
        tickLength: 0,
      },
      yAxis: [
        {
          title: { text: "" },
          height: "65%",
          lineWidth: 2,
          crosshair: {
            width: 1,
            color: "#94a3b8",
            dashStyle: "Dash",
            snap: true,
            label: {
              enabled: true,
              backgroundColor: "#0f172a",
              borderRadius: 4,
              style: { color: "#fff" },
            },
          },
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
        shared: true,
        split: false,
        animation: true,
        hideDelay: 120,
        stickOnContact: true,
        followPointer: true,
        followTouchMove: true,
        distance: 10,
        padding: 0,
        borderRadius: 12,
        shadow: false,
        borderWidth: 0,
        backgroundColor: "transparent",
        useHTML: true,
        style: {
          color: "#0f172a",
          fontSize: "12px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
        },
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          const date = new Date(this.x as number);
          const dateStr = new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(date);

          // 시리즈별 값 추출
          const find = (name: string) =>
            this.points?.find((p) => p.series.name === name);
          const pricePoint = find("가격");
          const volumePoint = find("거래량");

          const priceVal = pricePoint?.y as number | undefined;
          const volVal = (volumePoint?.point as any)?.y as number | undefined;

          const price =
            priceVal != null ? priceVal.toLocaleString("ko-KR") : "-";
          const volume = volVal != null ? volVal.toLocaleString("ko-KR") : "-";

          // iOS 스타일 툴팁 (둥근 모서리, 세미투명 배경, 그림자, 작은 꼬리)
          return `
            <div style="pointer-events:none;">
              <div style="
                background: rgba(255,255,255,0.96);
                backdrop-filter: saturate(180%) blur(10px);
                border: 1px solid rgba(0,0,0,0.06);
                border-radius: 12px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                padding: 10px 12px;
                min-width: 160px;
              ">
                <div style="font-weight:600; color:#0f172a; margin-bottom:6px;">${dateStr}</div>
                <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:4px;">
                  <span style="color:#64748b;">현재가</span>
                  <span style="color:#0f172a; font-weight:600;">₩${price}</span>
                </div>
                <div style="display:flex; justify-content:space-between; gap:12px;">
                  <span style="color:#64748b;">거래량</span>
                  <span style="color:#0f172a; font-weight:600;">${volume}</span>
                </div>
              </div>
            </div>
          `;
        },
      },
      plotOptions: {
        series: {
          animation: { duration: 350, easing: "easeOutCubic" },
          states: { inactive: { opacity: 1 } },
          point: {
            events: {
              mouseOver() {
                // 툴팁 전환시 튐을 줄이기 위해 noop
              },
            },
          },
        },
      },
      series: [
        {
          type: "candlestick",
          name: "가격",
          data: ohlcData as any,
          yAxis: 0,
          tooltip: { valueDecimals: 2 },
          color: "#ef4444",
          lineColor: "#ef4444",
          upColor: "#16a34a",
          upLineColor: "#16a34a",
          pointPadding: 0,
          dataGrouping: { enabled: false },
          animation: {
            duration: 500,
            easing: "easeInOutCubic",
          }, // 시리즈 애니메이션 활성화
          enableMouseTracking: true,
          states: {
            hover: {
              enabled: true,
              halo: { size: 6, opacity: 0.15 },
              lineWidthPlus: 0,
            },
            inactive: { opacity: 1 },
          },
        },
        {
          type: "column",
          name: "거래량",
          data: volumePoints as any,
          yAxis: 1,
          color: "#d1e3ea",
          pointPadding: 0.05,
          groupPadding: 0.02,
          borderWidth: 0,
          tooltip: { valueDecimals: 0 },
          states: { hover: { enabled: false }, inactive: { opacity: 1 } },
        },
        {
          type: "line",
          name: "MA5",
          data: ma5Data,
          color: "#8b5cf6",
          yAxis: 0,
          visible: !!showMA.ma5,
          tooltip: { valueDecimals: 2 },
          lineWidth: 2.5,
          marker: { enabled: false },
        },
        {
          type: "line",
          name: "MA20",
          data: ma20Data,
          color: "#10b981",
          yAxis: 0,
          visible: !!showMA.ma20,
          tooltip: { valueDecimals: 2 },
          lineWidth: 2.5,
          marker: { enabled: false },
        },
        {
          type: "line",
          name: "MA60",
          data: ma60Data,
          color: "#fb923c",
          yAxis: 0,
          visible: !!showMA.ma60,
          tooltip: { valueDecimals: 2 },
          lineWidth: 2.5,
          marker: { enabled: false },
        },
        {
          type: "line",
          name: "MA120",
          data: ma120Data,
          color: "#3b82f6",
          yAxis: 0,
          visible: !!showMA.ma120,
          tooltip: { valueDecimals: 2 },
          lineWidth: 2.5,
          marker: { enabled: false },
        },
      ],
      rangeSelector: { enabled: false },
      navigator: { enabled: false },
      scrollbar: { enabled: false },
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

  // TradingView 차트 우선 렌더링
  if (tvReady) {
    return (
      <div
        ref={tvContainerRef}
        className="w-full transition-all duration-300 ease-in-out"
        style={{
          opacity: 1,
          height:
            typeof window !== "undefined" && window.innerWidth < 640
              ? 360
              : typeof window !== "undefined" && window.innerWidth < 1024
                ? 420
                : 500,
        }}
      />
    );
  }

  // TradingView 실패 시 Highcharts 사용
  if (tvFailed && ready) {
    return (
      <div
        className="transition-all duration-300 ease-in-out w-full overflow-hidden"
        style={{
          height:
            typeof window !== "undefined" && window.innerWidth < 640
              ? 360
              : typeof window !== "undefined" && window.innerWidth < 1024
                ? 420
                : 500,
        }}
      >
        <HighchartsReact
          key={`${timeRange}-${ohlcData.length}`}
          highcharts={Highcharts}
          constructorType="stockChart"
          options={options}
        />
      </div>
    );
  }

  // TradingView 로딩 중이지만 데이터가 있으면 Highcharts로 폴백
  if (data.length > 0 && !tvReady && !tvFailed) {
    return (
      <div
        className="transition-all duration-300 ease-in-out w-full overflow-hidden"
        style={{
          height:
            typeof window !== "undefined" && window.innerWidth < 640
              ? 360
              : typeof window !== "undefined" && window.innerWidth < 1024
                ? 420
                : 500,
        }}
      >
        <HighchartsReact
          key={`${timeRange}-${ohlcData.length}`}
          highcharts={Highcharts}
          constructorType="stockChart"
          options={options}
        />
      </div>
    );
  }

  // 로딩 중
  return (
    <div className="h-[500px] bg-gray-100 rounded animate-pulse transition-all duration-300 ease-in-out" />
  );
});

export default PriceVolumeChart;

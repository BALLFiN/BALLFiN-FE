declare module 'highcharts/modules/stock' {
  import * as Highcharts from 'highcharts';
  function StockModule(H: typeof Highcharts): void;
  export = StockModule;
}

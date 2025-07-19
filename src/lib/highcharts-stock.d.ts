declare module 'highcharts/modules/stock' {
  import * as Highcharts from 'highcharts';
  function StockModule(H: typeof Highcharts): void;
  export = StockModule;
}
declare module 'highcharts/modules/annotations' {
  import * as Highcharts from 'highcharts';

  function AnnotationsModule(H: typeof Highcharts): void;
  export = AnnotationsModule;
}

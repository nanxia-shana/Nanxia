import * as echarts from "echarts/core";

import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  // BarSeriesOption,
  LineChart,
  // LineSeriesOption,
  PieChart,
  // PieSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  // TitleComponentOption,
  TooltipComponent,
  // TooltipComponentOption,
  GridComponent,
  // GridComponentOption,
  // 数据集组件
  DatasetComponent,
  // DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
// type ECOption = echarts.ComposeOption<
//   | BarSeriesOption
//   | LineSeriesOption
//   | PieSeriesOption
//   | TitleComponentOption
//   | TooltipComponentOption
//   | GridComponentOption
//   | DatasetComponentOption
// >;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
]);

export default echarts;

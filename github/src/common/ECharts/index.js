import React from 'react';
import { FormattedMessage } from 'react-intl';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/visualMap';

import prefixer from '@/utils/prefix';
import './index.less';

const prefix = prefixer('rs-echarts');


// ECharts with empty message and loading
function ECharts({ height = 300, option, style }) {
  const dataEmpty = !option.series || option.series.reduce((empty, serie) => empty && (!serie.data || serie.data.length < 1), true);

  function renderEmptyMessage() {
    return (
      <div className={prefix('body-info')}>
        <FormattedMessage id="components.echarts.empty" />
      </div>
    );
  }

  const styleObj = Object.assign({ height }, style);

  return (
    <div className="rs-echarts" style={styleObj}>
      {
        dataEmpty ? renderEmptyMessage() :
          <ReactEchartsCore
            echarts={echarts}
            option={option}
            style={{ height: '100%' }}
          />
      }
    </div>
  );
}

export default ECharts;
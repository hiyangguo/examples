/* eslint-disable react/prop-types,jsx-a11y/anchor-has-content */
import React from 'react';
import { Table, Tooltip, Whisper, Divider } from 'rsuite';
import { FULL_DATE, FULL_DATE_TIME } from '@/constants/DateFomat';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import _get from 'lodash/get';
import { Link } from 'react-router';
import { toPercent } from '@/utils/format';

export const { Cell } = Table;

// ** 公共 Cell

export const ObjectCell = ({ rowData = {}, dataKey, titleKey, ...props }) => {
  const data = _.get(rowData, dataKey) || null;
  const title = _.get(rowData, titleKey === true ? dataKey : titleKey);
  const content = (
    <Cell {...props}>
      {data && data !== '' ? data : '--'}
    </Cell>
  );
  if (!title) {
    return content;
  }
  const tooltip = <Tooltip>{title}</Tooltip>;
  return (
    <Whisper placement="top" speaker={tooltip}>
      {content}
    </Whisper>
  );
};

export const DateCell = ({ rowData, dataKey, ...props }) => {
  let data = _.get(rowData, dataKey, '--');
  return (
    <Cell {...props}>
      <span>{data ? moment(data)
        .format(FULL_DATE) : '--'}</span>
    </Cell>
  );
};

export const DateTimeCell = ({ rowData, dataKey, ...props }) => {
  let data = _.get(rowData, dataKey) || null;
  return (
    <Cell {...props}>
      <span>{data ? moment(data)
        .format(FULL_DATE_TIME) : '--'}</span>
    </Cell>
  );
};

export const ActionCell = ({ rowData, renderContent, ...props }) => (
  <Cell {...props}>
    {
      _.reduce(
        (
          (renderContent && renderContent({ rowData, ...props })) || []
        ),
        (actions, action, index, array) => {
          if (index === (array.length - 1)) {
            return [...actions, action];
          }
          return [...actions, action, <Divider key={index} vertical />];
        },
        []
      )
    }
  </Cell>
);

ActionCell.Action = ({ className, ...props }) => <a className={classnames('table-action', className)} {...props} />;

export const LinkCell = ({ rowData, dataKey, url, getUrl, ...props }) => {
  const text = _.get(rowData, dataKey, '--');

  const speaker = (
    <Tooltip className="popover-not-title">
      <span className="word-break">{text}</span>
    </Tooltip>
  );


  return (
    <Whisper placement="top" speaker={speaker}>
      <Cell {...props}>
        <Link
          to={url || getUrl(rowData)}
          className="text-ellipsis hover-active"
          style={{ width: 'initial', maxWidth: '100%' }}
        >
          <span>{text}</span>
        </Link>
      </Cell>
    </Whisper>
  );
};

export const nullable = (CellComp) => {
  return (props) => {
    const { rowData, dataKey, ...otherProps } = props;
    const value = _get(rowData, dataKey, null);
    if (value === null) {
      return <Cell {...otherProps}>--</Cell>;
    }
    return <CellComp {...props} />;
  };
};

export const NumberCell = nullable(({ rowData, dataKey, digits = 2, ...props }) => {
  const value = +_get(rowData, dataKey);
  return (
    <Cell {...props}>{value.toFixed(2)}</Cell>
  );
});

export const PercentCell = nullable(({ rowData, dataKey, digits = 1, ...props }) => {
  const value = +_get(rowData, dataKey);
  return (
    <Cell {...props} >{toPercent(value, digits)}</Cell>
  );
});

export const MappingCell = nullable(({ rowData, dataKey, mapping = {}, ...props }) => {
  const value = _get(rowData, dataKey);
  return (
    <Cell {...props}>{mapping[value] || value}</Cell>
  );
});

export function SerialCell({ rowData, dataKey, ...props }) {
  const { rowIndex, current = 1, pagesize = 30 } = props;
  return (
    <Cell {...props} >
      {rowIndex + 1 + ((current - 1) * pagesize)}
    </Cell>
  );
}
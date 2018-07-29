/* eslint-disable react/prop-types,jsx-a11y/anchor-has-content */
import React from 'react';
import { Table } from 'rsuite';
import { FULL_DATE, FULL_DATE_TIME } from '@/constants/DateFomat';

export const { Cell } = Table;

export function SerialCell({ rowData, dataKey, ...props }) {
  const { rowIndex, current = 1, pagesize = 30 } = props;
  return (
    <Cell {...props} >
      {rowIndex + 1 + ((current - 1) * pagesize)}
    </Cell>
  );
}
import React from 'react';
import { Table as RsTable } from 'rsuite';
import { SerialCell } from './Cells';

const { Column, HeaderCell } = RsTable;

export function SerialColumn() {
  return (
    <Column width={80} fixed>
      <HeaderCell />
      <SerialCell />
    </Column>
  );
}

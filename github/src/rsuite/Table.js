import React from 'react';
import { Table as RsTable, DOMHelper } from 'rsuite';

function Table(props) {
  const FRAME_PADDING = 60 + 60;
  const NAV_HEIGHT = 51;
  return (
    <RsTable
      height={DOMHelper.getHeight(window) - FRAME_PADDING - NAV_HEIGHT}
      {...props}
    />
  );
}

const { Column, HeaderCell, Cell } = RsTable;

Table.Column = Column;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export default Table;

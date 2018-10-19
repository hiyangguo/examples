import React from 'react';
import { Table as RsTable, DOMHelper } from 'rsuite';

const FRAME_PADDING = 60 + 60;
const NAV_HEIGHT = 51;

export function getTableHeight() {
  return DOMHelper.getHeight(window) - FRAME_PADDING - NAV_HEIGHT;
}

function Table(props) {
  return (
    <RsTable
      height={getTableHeight()}
      {...props}
    />
  );
}

const { Column, HeaderCell, Cell } = RsTable;

Table.Column = Column;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;
Table.getTableHeight = getTableHeight;

export default Table;

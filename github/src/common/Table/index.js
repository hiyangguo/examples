import React, { PureComponent } from 'react';
import type { ChildrenArray } from 'react';
import { Table as RsTable, TablePagination, DOMHelper } from 'rsuite';
import classnames from 'classnames';
import _ from 'lodash';
import prefix from '@/utils/prefix';
import { SerialCell } from '@/common/Table/Cells';

const { on, getHeight } = DOMHelper;
const baseClassName = 'table-wrap';

export const DEFAULT_PAGE_SIZE = 30;

const MIN_PAGE_HEIGHT = 768;
const TABLE_MIN_HEIGHT = 400;
const FRAME_HEIGHT = 100;  // 上下 20 + marging 60
const FRAME_HEADER_HEIGHT = 55; // header 高度 55 + marging 20
const TABLE_TOOLBAR_HEIGHT = 66; // 上下20 + 默认行高 36

const LENGTH_MENU = [
  {
    value: 10,
    label: 10
  },
  {
    value: DEFAULT_PAGE_SIZE,
    label: DEFAULT_PAGE_SIZE
  },
  {
    value: 50,
    label: 50
  }
];
//
// type SortParams = {
//   orderColumn?: string,
//   orderType?: 'desc' | 'asc'
// };
//
// type FilterParams = {
//   filterColumn?: string,
//   word?: string
// };
//
// type PagingParams = {
//   page?: number,
//   current?: number,
//   pagesize?: number,
//   total?: number
// };
//
// export type Params = { // SortParams & FilterParams & PagingParams;
//   orderColumn?: string,
//   orderType?: 'desc' | 'asc',
//
//   filterColumn?: string,
//   word?: string,
//
//   page?: number,
//   current?: number,
//   pagesize?: number,
//   total?: number
// };
//
// type TableProps = {
//   className?: string,
//   data?: Array<Object>,
//   loading?: boolean,
//   children?: ChildrenArray<*>
// };
//
// type Props = TableProps & {
//   params: Params,
//   onParamsChange: (params: Object) => void
// };
//
// type State = {
//   height: number,
// };

const defaultParams: Params = {
  page: 1,
  pagesize: 30
};

class TableView extends PureComponent {
  static defaultProps = {
    params: {
      current: 1,
      pagesize: DEFAULT_PAGE_SIZE,
      total: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      height: this.calculateTableHeight(),
      params: { ...defaultParams, ...this.props.params }
    };
  }

  componentDidMount() {
    this._onWindowResizeListener = on(window, 'resize', _.debounce(this.handleWindowResize, 50));
  }

  componentWillUnmount() {
    if (this._onWindowResizeListener) {
      this._onWindowResizeListener.off();
    }
  }

  _onWindowResizeListener: () => void;

  calculateTableHeight = () => {
    if (this.props.height) {
      return this.props.height;
    }
    const windowHeight = getHeight(window);
    const useAbleHeight = windowHeight > MIN_PAGE_HEIGHT ? windowHeight : MIN_PAGE_HEIGHT;

    const frameHeight = 120;
    const tabHeight = 51;
    const tableToolbarHeight = 66 + 10;
    const tablePaginationHeight = 64;
    let height = useAbleHeight - frameHeight - tabHeight - tableToolbarHeight - tablePaginationHeight;

    return height < TABLE_MIN_HEIGHT ? TABLE_MIN_HEIGHT : height;
  };

  handleWindowResize = () => {
    this.setState({
      height: this.calculateTableHeight()
    });
  };

  // state.params 发生变化时 调用此方法
  handleParamsChange = (values: Object) => {
    _.attempt(this.props.onParamsChange,
      _.pick({ ...this.props.params, ...values }, ['orderColumn', 'orderType', 'current', 'pagesize']));
  };

  handleSort = (orderColumn: string, orderType: string) =>
    this.handleParamsChange({ orderColumn, orderType });

  handleChangePage = (current: number) =>
    this.handleParamsChange({ current });
  handleChangePagesize = (pagesize: number) =>
    this.handleParamsChange({ pagesize, current: 1 });

  renderTable() {
    const { className, data = [], serial = true, loading, hidePagination, onParamsChange, params: { orderColumn, orderType, current, pagesize }, ...props } = this.props;

    const baseColumns = serial ? [
      <Column key="serial" width={80} fixed>
        <HeaderCell />
        <SerialCell current={current} pagesize={pagesize}/>
      </Column>
    ] : [];

    return (
      <RsTable
        {...props}
        className={classnames(className, prefix(baseClassName, 'table'))}
        height={this.state.height}
        data={data}
        loading={loading}
        sortColumn={orderColumn}
        sortType={orderType}
        onSortColumn={this.handleSort}
      >
        {baseColumns.concat(this.props.children)}
      </RsTable>
    );
  }

  renderToolbar() {
    const { toolbar } = this.props;
    return toolbar && (
      <div className={prefix(baseClassName, 'table-toolbar')}>
        {toolbar}
      </div>
    );
  }

  renderPagination() {
    const { data = [], params: { current = 1, pagesize, total = data.length } } = this.props;

    return (
      <TablePagination
        lengthMenu={LENGTH_MENU}
        activePage={current}
        displayLength={pagesize}
        total={total}
        onChangePage={this.handleChangePage}
        onChangeLength={this.handleChangePagesize}
      />
    );
  }

  render() {
    const { toolbar, hidePagination, className } = this.props;
    return (
      <div className={classnames(baseClassName, className)}>
        {this.renderToolbar()}
        {this.renderTable()}
        {!hidePagination && this.renderPagination()}
      </div>
    );
  }
}

export default TableView;

export const { Column, HeaderCell, Cell } = RsTable;

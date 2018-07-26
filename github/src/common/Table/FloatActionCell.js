import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Table, Tooltip, Whisper, Icon, IconButton, Popover, Dropdown } from 'rsuite';
import createConstants from '@/utils/createConstants';
import createChainedFunction from 'rsuite-utils/src/utils/createChainedFunction';
import './FloatActionCell.less';
import { Link } from 'react-router';

const { Cell } = Table;

/**
 * @type {{ACTION,DROPDOWN_ITEM, LINK}}
 */
const ACTION_TYPE = createConstants('ACTION', 'DROPDOWN_ITEM', 'LINK');

class FloatActionCell extends React.Component {
  static get displayName() {
    return 'FloatActionCell';
  }

  static propTypes = {
    rowData: PropTypes.object,
    dataKey: PropTypes.string,
    maxActionNum: PropTypes.number,
    titleKey: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    className: PropTypes.string,
    renderActions: PropTypes.func,
    children: PropTypes.any
  };

  static defaultProps = {
    maxActionNum: 3
  };

  constructor(props) {
    super(props);
    this.bindDropdownRef = this.bindDropdownRef.bind(this);
    this.state = {
      moreActionBarOpen: false
    };
  }

  bindDropdownRef(ref) {
    this.dropdown = ref;
  }

  hideDropdown = () => {
    this.dropdown && this.dropdown.hide();
  };

  handleDropdownToggleClick = () => {
    this.setState({
      moreActionBarOpen: true
    });
  };

  handleDropdownMenuItemClick = _.partial(createChainedFunction, this.hideDropdown, _);

  handleDropdownExited = () => {
    this.setState({
      moreActionBarOpen: false
    });
  };

  mapToDropDownItem = (action, index) => React.cloneElement(action, {
    key: index,
    type: ACTION_TYPE.DROPDOWN_ITEM,
    onClick: this.handleDropdownMenuItemClick(_.get(action, 'props.onClick'))
  });

  render() {
    const { rowData, dataKey, className, titleKey, maxActionNum, renderActions } = this.props;
    const props = _.omit(this.props, _.keys(FloatActionCell.propTypes));
    const data = _.get(rowData, dataKey);
    const title = _.get(rowData, titleKey === true ? dataKey : titleKey) || null;
    const children = renderActions(rowData) || this.props.children || [];
    let content = (<span>{data && data !== '' ? data : '--'}</span>);
    if (title) {
      const tooltip = <Tooltip>{title}</Tooltip>;
      content = (<Whisper placement="topLeft" speaker={tooltip}>{content}</Whisper>);
    }
    const needDropDown = children.length >= maxActionNum;
    // 固定数 =  最大 action 数 -1
    const fixedActionNum = maxActionNum - 1;
    const actions = needDropDown ? _.take(children, fixedActionNum) : children;
    const dropDownActions = needDropDown ? _.takeRight(children, children.length - fixedActionNum) : [];
    return (
      <Cell
        className={classnames('float-action-cell', { 'more-action-bar-open': this.state.moreActionBarOpen }, className)}
        {...props}
      >
        {content}
        <div className="float-action-cell-action-bar">
          {actions}
          {
            needDropDown && (
              <Whisper
                placement="autoVerticalLeft"
                // trigger="click"
                triggerRef={this.bindDropdownRef}
                speaker={
                  <Popover
                    full
                  >
                    <Dropdown.Menu>
                      {
                        dropDownActions.map(this.mapToDropDownItem)
                      }
                    </Dropdown.Menu>
                  </Popover>
                }
                onExited={this.handleDropdownExited}
              >
                <IconButton
                  onMouseOver={this.handleDropdownToggleClick}
                  appearance="link"
                  circle
                  icon={<Icon icon="more" />}
                />
              </Whisper>)
          }
        </div>
      </Cell>
    );
  }
}

// eslint-disable-next-line react/prop-types
const renderAction = ({ icon, children, ...props }) => (
  <Whisper placement="top" speaker={<Tooltip>{children}</Tooltip>}>
    <IconButton {...props} appearance="link" icon={<Icon icon={icon} />} circle />
  </Whisper>
);

const renderLink = ({ to, icon, title, children, ...props }) => (
  <Whisper placement="top" speaker={<Tooltip>{children}</Tooltip>}>
    <Link to={to}>
      <IconButton {...props} appearance="link" icon={<Icon icon={icon} />} circle />
    </Link>
  </Whisper>
);

// eslint-disable-next-line react/prop-types
const renderDropDownItem = ({ icon, children, ...props }) => (
  <Dropdown.Item
    {...props}
  >
    <Icon icon={icon} /> {children}
  </Dropdown.Item>
);

FloatActionCell.Action = ({ type = ACTION_TYPE.ACTION, ...props }) => {
  const render = _.get({
    [ACTION_TYPE.ACTION]: renderAction,
    [ACTION_TYPE.DROPDOWN_ITEM]: renderDropDownItem,
    [ACTION_TYPE.LINK]: renderLink
  }, type) || renderAction;
  return render(props);
};

export default FloatActionCell;

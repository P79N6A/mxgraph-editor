import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Tooltip } from 'antd';
import IMAGE_SHAPES from '../config/image-shape';

import './sidebar.less';

const { Panel } = Collapse;

const BASIC_SHAPES = [
  {
    name: '矩形',
    key: 'Rectangle',
    logo: 'https://img.alicdn.com/tfs/TB19O8OokvoK1RjSZFNXXcxMVXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: '圆角矩形',
    key: 'Rounded Rectangle',
    logo: 'https://img.alicdn.com/tfs/TB1rzVHojDpK1RjSZFrXXa78VXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: '梯形',
    key: 'Trapezoid',
    logo: 'https://img.alicdn.com/tfs/TB1nEXPokvoK1RjSZPfXXXPKFXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: '圆形',
    key: 'Circle',
    logo: 'https://img.alicdn.com/tfs/TB15iXQogHqK1RjSZFkXXX.WFXa-38-38.svg',
    width: 80,
    height: 80,
  },
  {
    name: '三角形',
    key: 'Triangle',
    logo: 'https://img.alicdn.com/tfs/TB1cxNKohTpK1RjSZR0XXbEwXXa-38-38.svg',
    width: 80,
    height: 80,
  },
  {
    name: '连线',
    key: 'Line',
    logo: 'https://img.alicdn.com/tfs/TB1LOxPoirpK1RjSZFhXXXSdXXa-38-38.svg',
    width: 80,
    height: 80,
  },
];

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {
    this.handleSidebarItems();
  }

  handleSidebarItems() {
    const { editor } = this.props;

    if (editor && editor.initSidebar) {
      const sidebarItems = document.querySelectorAll('.custom-sidebar-node');

      const newSidebarItems = [];

      sidebarItems
        && sidebarItems.forEach((item) => {
          if (!item.classList.contains('has-inited')) {
            item.classList.add('has-inited');
            newSidebarItems.push(item);
          }
        });

      editor.initSidebar(newSidebarItems);
    }
  }

  onChange() {
    setTimeout(() => {
      this.handleSidebarItems();
    }, 1000);
  }

  render() {
    return (
      <div className="J_Sidebar_Container sidebar-container">

        <Collapse
          bordered={false}
          defaultActiveKey={['common', 'general']}
          onChange={() => {
            this.onChange();
          }}
        >
          <Panel key="common" header="基础组件">

            {BASIC_SHAPES.map(shape => (
              <a
                href="javascript:void(0);"
                key={`panel_a_${shape.key}`}
                className="geItem custom-sidebar-node common-panel-node"
                data-shape-type="general"
                data-shape-name={shape.key}
                data-shape-label={shape.name}
                data-shape-width={shape.width}
                data-shape-height={shape.height}
              >
                <Tooltip
                  placement="top"
                  title={shape.name}
                  key={`panel_${shape.key}`}
                  className="tooltip"
                >
                  <img className="sidebar-node-image" src={shape.logo} alt="" />
                  <span className="sidebar-node-label">
                    {shape.name}
                  </span>
                </Tooltip>
              </a>
            ))}

          </Panel>
          <Panel header="常用组件" key="general">

            {IMAGE_SHAPES.map(shape => (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  return false;
                }}
                key={`panel_a_${shape.key}`}
                href="a"
                className="geItem custom-sidebar-node"
                data-shape-type="image"
                data-shape-width={shape.width}
                data-shape-height={shape.height}
                data-shape-name={shape.key}
                data-shape-label={shape.name}
                title={shape.name}
              >
                <Tooltip
                  placement="top"
                  title={shape.name}
                  key={`panel_${shape.key}`}
                  className="tooltip"
                >
                  <img className="sidebar-node-image" src={shape.logo} alt="" />
                  <span className="sidebar-node-label">
                    {shape.name}
                  </span>
                </Tooltip>

              </a>
            ))}

          </Panel>

        </Collapse>

      </div>
    );
  }
}

SideBar.propTypes = {
  editor: PropTypes.object,
};

// Specifies the default values for props:
SideBar.defaultProps = {
  editor: {},
};

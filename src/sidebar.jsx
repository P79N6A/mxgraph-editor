import React, {Component} from 'react';
import {Collapse} from 'antd';

const Panel = Collapse.Panel;

import 'antd/dist/antd.css';
import './sidebar.less';

export default class SideBar extends React.Component {
  /**
   * type: 类型（svg 或 image）
   * name: 图形名称
   */
  createCells (type, shapeName, shapeLabel, width, height) {
    let style;

    switch (type) {
      case 'svg':
        style = `shape=${shapeName}`;
        break;
      case 'image':
        style = `image;html=1;labelBackgroundColor=#ffffff;image=../resources/grapheditor/stencils/clipart/${shapeName}_128x128.png`;
        break;
      default:
        // do nothing
        break;
    }

    const cells = [
      new mxCell (shapeLabel, new mxGeometry (0, 0, width, height), style),
    ];
    cells[0].vertex = true;

    return cells;
  }

  createSidebarItem () {
    // cells, title, showLabel, showTitle, width, height, allowCellsInserted

    const width = 80;
    const height = 80;

    const value = null;

    var req = mxUtils.load ('resources/stencils.xml');
    var root = req.getDocumentElement ();
    var shape = root.firstChild;

    while (shape != null) {
      if (shape.nodeType == mxConstants.NODETYPE_ELEMENT) {
        mxStencilRegistry.addStencil (
          shape.getAttribute ('name'),
          new mxStencil (shape)
        );
      }

      shape = shape.nextSibling;
    }

    const elts = document.querySelectorAll ('.custom-sidebar-node');

    for (let i = 0; i < elts.length; i++) {
      // const style = ``;

      // const cells = [
      //   new mxCell ('hello', new mxGeometry (0, 0, width, height), style),
      // ];
      // cells[0].vertex = true;

      // var doc = mxUtils.parseXml(this.graph.decompress(data));
      // var codec = new mxCodec(doc);

      // var model = new mxGraphModel();
      // codec.decode(doc.documentElement, model);

      // var cells = this.graph.cloneCells(model.root.getChildAt(0).children);

      // const cells = [
      //   new mxCell ('world', new mxGeometry (0, 0, width, height), 'shape=and'),
      // ];
      // cells[0].vertex = true;

      const shapeType = elts[i].getAttribute ('data-shape-type');
      const shapeName = elts[i].getAttribute ('data-shape-name');
      const shapeLable = elts[i].getAttribute ('data-shape-label');

      const cells = this.createCells (shapeType, shapeName, shapeLable, width, height);

      window.sidebar.createItem (
        cells,
        null,
        false,
        null,
        width,
        height,
        true,
        elts[i]
      );
    }
  }

  componentDidMount () {
    setTimeout (() => {
      this.createSidebarItem ();
    }, 3000);
  }

  callback (key) {
    console.log (key);
  }

  render () {
    return (
      <div className="J_Sidebar_Container sidebar-container">

        <Collapse
          defaultActiveKey={['1', '2', '3', '4']}
          onChange={this.callback}
        >
          <Panel header="数据接入" key="1">
            <div className="sidebar-content">
              <a
                href="javascript:void(0);"
                className="geItem custom-sidebar-node"
                data-shape-type="image"
                data-shape-name="Chart1"
                data-shape-label="实时数据"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-shishishuju" />
                </svg>
                <span className="sidebar-node-label">实时数据</span>
              </a>
              <a
                href="javascript:void(0);"
                className="geItem custom-sidebar-node"
                data-shape-type="image"
                data-shape-name="Chart2"
                data-shape-label="CSV"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-CSV" />
                </svg>
                <span className="sidebar-node-label">CSV</span>
              </a>
              <a
                href="javascript:void(0);"
                className="geItem custom-sidebar-node"
                data-shape-type="image"
                data-shape-name="Chart3"
                data-shape-label="图像文件"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-tuxiangwenjian" />
                </svg>
                <span className="sidebar-node-label">图像文件</span>
              </a>
            </div>
          </Panel>

          <Panel header="数据预处理" key="2">
            <div className="sidebar-content">
              <a
                href="javascript:void(0);"
                className="geItem custom-sidebar-node"
                data-shape-type="svg"
                data-shape-name="and"
                data-shape-label="缺省值填充"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-queshizhitianchong" />
                </svg>
                <span className="sidebar-node-label">缺省值填充</span>
              </a>
            </div>

          </Panel>
          <Panel header="数据字典" key="3">
            <div className="sidebar-content">
              <a
                href="javascript:void(0);"
                className="geItem custom-sidebar-node"
                data-shape-type="svg"
                data-shape-name="or"
                data-shape-label="自定义"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-zidingyi" />
                </svg>
                <span className="sidebar-node-label">自定义</span>
              </a>
              <a
                href="javascript:void(0);"
                className="geItem custom-sidebar-node"
                data-shape-type="image"
                data-shape-name="Chart3"
                data-shape-label="锅炉"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-guolu" />
                </svg>
                <span className="sidebar-node-label">锅炉</span>
              </a>
            </div>
          </Panel>
          <Panel header="算法" key="4">
            <div className="sidebar-content">
              <p
                className="custom-sidebar-node suanfa-node"
                data-shape-type="image"
                data-shape-name="Chart4"
                data-shape-label="回归预测模板"
              >
                <svg className="icon small-icon" aria-hidden="true">
                  <use href="#icon-suanfaguize" />
                </svg>
                <span className="suanfa-name">回归预测模板</span>
              </p>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

import React, {Component} from 'react';
import './sidebar.less';

export default class SideBar extends React.Component {
  createSidebarItem () {
    // cells, title, showLabel, showTitle, width, height, allowCellsInserted

    const width = 80;
    const height = 80;

    const value = null;

    const elts = document.querySelectorAll ('.custom-sidebar-node');

    for (let i = 0; i < elts.length; i++) {
      const style = `image;html=1;labelBackgroundColor=#ffffff;image=../resources/grapheditor/stencils/clipart/Chart${i + 1}_128x128.png`;

      // const cells = [
      //   new mxCell ('hello', new mxGeometry (0, 0, width, height), style),
      // ];
      // cells[0].vertex = true;

      // var doc = mxUtils.parseXml(this.graph.decompress(data));
      // var codec = new mxCodec(doc);

      // var model = new mxGraphModel();
      // codec.decode(doc.documentElement, model);

      // var cells = this.graph.cloneCells(model.root.getChildAt(0).children);

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

      const cells = [
        new mxCell('world', new mxGeometry(0, 0, width, height), 'shape=and')
      ];
      cells[0].vertex = true;

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

  render () {
    return (
      <div className="J_Sidebar_Container sidebar-container">
        <div className="sidebar-title">custom node</div>
        <div className="sidebar-content">
          <a href="javascript:void(0);" className="geItem custom-sidebar-node">
            <svg className="icon" aria-hidden="true">
              <use href="#icon-shishishuju" />
            </svg>
            aaa
          </a>
          <a href="javascript:void(0);" className="geItem custom-sidebar-node">
            <svg className="custom-svg">
              <g>
                <g />
                <g>
                  <g>
                    <image
                      x="2"
                      y="2"
                      width="31"
                      height="31"
                      href="../resources/grapheditor/stencils/clipart/Chart2_128x128.png"
                    />
                  </g>
                  <text x="0" y="15" fill="red">bbb</text>

                </g>
                <g />
                <g />
              </g>
            </svg>
          </a>
          <a href="javascript:void(0);" className="geItem custom-sidebar-node">
            ccc
          </a>
          <a href="javascript:void(0);" className="geItem custom-sidebar-node">
            ddd
          </a>
          <a href="javascript:void(0);" className="geItem custom-sidebar-node">
            eee
          </a>
          <a href="javascript:void(0);" className="geItem custom-sidebar-node">
            fff
          </a>
        </div>
      </div>
    );
  }
}

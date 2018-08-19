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

      const style =
      `image;html=1;labelBackgroundColor=#ffffff;image=../resources/grapheditor/stencils/clipart/Chart${i+1}_128x128.png`;

      const cells = [
        new mxCell (
          value != null ? value : '',
          new mxGeometry (0, 0, width, height),
          style
        ),
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
          aaa
            {/* <svg className="custom-svg">
              <g>
                <g />
                <g>
                  <g>
                    <image
                      x="2"
                      y="2"
                      width="31"
                      height="31"
                      href="../resources/grapheditor/stencils/clipart/Chart1_128x128.png"
                    />
                  </g>
                  <text x="0" y="15" fill="red">aaa</text>

                </g>
                <g />
                <g />
              </g>
            </svg> */}
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
        </div>
      </div>
    );
  }
}

import React, {
  Component
} from 'react';
import Sidebar from './sidebar';

class GraphEditor extends React.Component {

  saveXML() {
    if (window.mxgraphUi) {
      const xml = mxUtils.getXml(window.mxgraphUi.editor.getGraphXml());
      console.log(xml);
      window.localStorage.setItem('graph-xml', xml);
    }
  }

  renderGraphFromXml() {
    // const xml = '<mxGraphModel dx="950" dy="576" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" background="#ffffff"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;elbow=vertical;curved=1;strokeWidth=3;strokeColor=#006666;endArrow=none;endFill=0;" edge="1" parent="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="2" value="" style="shape=mxgraph.flowchart.annotation_122222;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2" vertex="1" parent="1"><mxGeometry x="140" y="170" width="40" height="70" as="geometry"/></mxCell><mxCell id="3" value="" style="image;html=1;labelBackgroundColor=#ffffff;image=../resources/grapheditor/stencils/clipart/Chart2_128x128.png" vertex="1" parent="1"><mxGeometry x="510" y="350" width="80" height="80" as="geometry"/></mxCell></root></mxGraphModel>';

    const xml = window.localStorage.getItem('graph-xml');

    const xmlDocument = mxUtils.parseXml(xml);

    const container = document.querySelector('.geDiagramContainer');

    if (xmlDocument.documentElement != null && xmlDocument.documentElement.nodeName == 'mxGraphModel') {
      const decoder = new mxCodec(xmlDocument);
      const node = xmlDocument.documentElement;

      window.mxgraphUi.editor.setGraphXml(node);

    }

  }

  componentDidMount() {
    var editorUiInit = EditorUi.prototype.init;

    EditorUi.prototype.init = function () {
      editorUiInit.apply(this, arguments);
      this.actions.get('export').setEnabled(false);

      // Updates action states which require a backend
      if (!Editor.useLocalStorage) {
        mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function (req) {
          var enabled = req.getStatus() != 404;
          this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
          this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
          this.actions.get('save').setEnabled(enabled);
          this.actions.get('saveAs').setEnabled(enabled);
          this.actions.get('export').setEnabled(enabled);
        }));
      }
    };

    // Adds required resources (disables loading of fallback properties, this can only
    // be used if we know that all keys are defined in the language specific file)
    mxResources.loadDefaultBundle = false;
    var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
      mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

    // Fixes possible asynchronous requests
    mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function (xhr) {
      // Adds bundle text to resources
      mxResources.parse(xhr[0].getText());

      // Configures the default graph theme
      var themes = new Object();
      themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

      const editorUiContainer = document.querySelector('.J_Editor_Ui');

      // Main
      window.mxgraphUi = new EditorUi(new Editor(urlParams['chrome'] == '0', themes), editorUiContainer);
    }, function () {
      document.body.innerHTML =
        '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
    });



    window.saveXML = this.saveXML;

    setTimeout(() => {
      this.renderGraphFromXml();
    }, 3000);

  }

  render() {
    return <div className="main">
      <div className="J_Editor_Ui">
        <Sidebar />
      </div>
    </div>;
  }

}

export default GraphEditor;
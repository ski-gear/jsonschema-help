import * as React from 'react';
import MonacoEditor, { ReactMonacoEditorProps } from 'react-monaco-editor';

interface State {
  code: string
};

interface Props {
  [ key: string ]: any
};

class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: this.props.code,
    }
  }

  editorDidMount = (editor: any, monaco: any): void => {
    editor.focus();
  }

  onChange = (newValue: any, e: any): void => {
    this.setState({ code: newValue });
  }

  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      minimap: {
        enabled: false
      }
    };
    return (
      <MonacoEditor
        height="450"
        language="json"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default Editor

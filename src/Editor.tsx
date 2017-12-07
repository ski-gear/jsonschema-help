import * as React from 'react';
import MonacoEditor, { ReactMonacoEditorProps } from 'react-monaco-editor';

interface State {
  code: string
};

interface Props {
  [ key: string ]: string
};

class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: this.props.code,
    }
  }

  editorDidMount(editor: any, monaco: any): void {
    editor.focus();
  }

  onChange(newValue: any, e: any): void {
    console.log('onChange', newValue, e);
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
        height="600"
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

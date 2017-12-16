import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  code: string,
  onChange: any
};

class Editor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  editorDidMount = (editor: any, monaco: any): void => {
    editor.focus();
  }

  onChange = (newValue: any, e: any): void => {
    this.props.onChange(newValue)
  }

  render() {
    const code = this.props.code;
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

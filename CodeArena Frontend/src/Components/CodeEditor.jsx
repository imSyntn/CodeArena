import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

const CodeEditor = ({ io, setIo }) => {

  // const { io, setIo } = useContext(codeContext)
  // console.log(io.input, io.output)

  return (
    <CodeMirror value={io.input} theme='dark' height='450px' extension={[javascript({ jsx: true })]}
      onChange={(value) => setIo(prev=>({
        ...prev,
        input: value
      }))}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        history: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }} />
  )
}

export default CodeEditor
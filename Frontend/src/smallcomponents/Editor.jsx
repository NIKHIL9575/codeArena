import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";

const Editor = ({ slide, starterCode, onCodeChange }) => {
 

 useEffect(() => {
  onCodeChange(starterCode || "");
}, [slide, starterCode]);

  const defineTheme = (monaco) => {
    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0C0F1D",
        "editor.foreground": "#F5F5F5",
        "editorLineNumber.foreground": "#777777",
        "editorLineNumber.activeForeground": "#5500FF",
      },
    });
  };

  return (
    <div className="w-full">
      <MonacoEditor
        height="500px"
        language={slide}
        theme="myTheme"
        beforeMount={defineTheme}
        value={starterCode}
         onChange={(value) => onCodeChange(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          renderLineHighlight: "none",
        }}
      />
    </div>
  );
};

export default Editor;
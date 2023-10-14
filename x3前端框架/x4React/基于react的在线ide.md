创建
`pnpm create vite react-editor -t react-ts`
`cd react-editor`
`pnpm i`
`pnpm dev`
![[Pasted image 20230923195254.png]]

安装对应的包
```
import * as React from "react";

import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";

interface ICodeMirror {
  language?: "json" | "javascript";
  value?: string;
  onChange: (content: string) => void;
}

/**
 * 代码编辑器
 * @constructor
 */
function CodeMirror(props: ICodeMirror) {
  // 编辑器挂载点
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    if (!editorRef || !editorRef.current) {
      return;
    }
    // 初始状态
    const startState = EditorState.create({
      doc:
        props.language === "json"
          ? JSON.stringify(props.value, null, 2)
          : props.value,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        props.language === "json" ? json() : javascript(),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            props.onChange(v.state.toJSON().doc);
          }
        }),
      ],
    });
    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });
    return () => view.destroy();
  }, [editorRef]);

  const render = () => {
    return <div ref={editorRef} />;
  };

  return render();
}

export default CodeMirror;

```
[React CodeMirror6 入门用法示例 - 知乎](https://zhuanlan.zhihu.com/p/608009942)
interface Frame {
  id: string;
  content: string;
}

interface EditorState {
  frames: Array;
}
interface EditorContextValue {
  state: EditorState;
}

interface Frame {
  id: string;
  content: string;
}

interface EditorState {
  frames: Array;
  currentFrameIndex: number;
}
interface EditorContextValue {
  state: EditorState;
}

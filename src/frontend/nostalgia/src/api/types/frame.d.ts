type FrameType = "text" | "image";

interface Frame {
  id: string;
  prompt: string;
  type: FrameType;
}

interface TextFrame extends Frame {
  type: "text";
  content: string;
}

interface ImageData {
  alt: string;
  url: string;
}

interface ImageFrame extends Frame {
  type: "image";
  images: ImageData[];
}

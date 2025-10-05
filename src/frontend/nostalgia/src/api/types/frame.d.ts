type FrameType = "text" | "image";

interface Frame {
  id: string;
  prompt: string;
  type: FrameType;
  content?: string;
  images?: FrameImage[];
}

interface FrameImage {
  image: string;
  caption: string;
  altText?: string;
}

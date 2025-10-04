interface MemoryMetadata {
  id: string;
  title: string;
  createdAt: string;
  image: string | null;
}

interface Memory extends MemoryMetadata {
  frames: Frame[];
}

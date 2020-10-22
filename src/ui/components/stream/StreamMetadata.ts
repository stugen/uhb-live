interface StreamSource {
  weight: number;
  url: string;
}

export interface StreamMetadata {
  name: string;
  uuid: string;
  shortName: string;
  sources: StreamSource[];
  startTime: number;
  chat: boolean;
}

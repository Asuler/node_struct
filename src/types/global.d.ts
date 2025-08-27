declare namespace NodeJS {
  interface ProcessConfig {
    readonly variables: {
      [key: string]: any; // 或 string
    } & {
      pointer_size?: number | string;
    };
  }
}

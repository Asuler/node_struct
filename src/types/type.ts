/**
 * 定义所有格式码与它们的基础大小（标准大小）
 */
export interface TypeDef {
  size: number;
  alignment?: number;
  pack: (dv: DataView, offset: number, value: any, le: boolean, count?: number) => void;
  unpack: (dv: DataView, offset: number, le: boolean, count?: number) => any;
}

export interface FieldInfo {
  code: string;
  count: number;
  size: number;
  offset: number;
}

export type EndianChar = '@' | '=' | '<' | '>' | '!';

export interface Token {
  code: string;
  count: number;
}

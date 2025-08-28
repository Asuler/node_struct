import { typeMap } from './constant';
import parseFormat from './utils/parseFormat';

export function unpack(fmt: string, buffer: Buffer | ArrayBuffer | Uint8Array | DataView): any[] {
  const { tokens, littleEndian } = parseFormat(fmt);

  let dv: DataView;

  if (buffer instanceof DataView) {
    dv = buffer;
  } else if (buffer instanceof ArrayBuffer) {
    dv = new DataView(buffer);
  } else if (ArrayBuffer.isView(buffer)) {
    // Uint8Array、Buffer 等 TypedArray
    dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else {
    throw new Error('Unsupported buffer type');
  }

  let offset = 0;
  const result: any[] = [];

  for (const t of tokens) {
    const type = typeMap[t.code];
    if (!type) throw new Error(`Unknown format code: ${t.code}`);

    const val = type.unpack(dv, offset, littleEndian, t.count);
    result.push(val);

    offset += type.size * t.count;
  }

  return result;
}
export default unpack;

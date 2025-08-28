import parseFormat from './utils/parseFormat';
import calcSizeByToken from './calcSizeByToken';
import { typeMap } from './constant';

export function pack(format: string, ...values: any[]): Buffer {
  const { tokens, littleEndian } = parseFormat(format);

  const size = calcSizeByToken(tokens); // 总字节数
  const buffer = Buffer.alloc(size);
  const dv = new DataView(buffer.buffer);

  let offset = 0;
  for (const t of tokens) {
    const type = typeMap[t.code];

    if (t.count > 1 && t.code !== 's') {
      for (let i = 0; i < t.count; i++) {
        const value = values.shift();
        type.pack(dv, offset + i * type.size, value, littleEndian, 1);
      }
    } else {
      const value = values.shift();
      type.pack(dv, offset, value, littleEndian, t.count);
    }

    offset += type.size * t.count;
  }

  return buffer;
}

export default pack;

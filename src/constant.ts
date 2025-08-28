import type { TypeDef } from './types/type';
export const pointerSize = process.arch.includes('64') ? 8 : 4;

export const typeMap: Record<string, TypeDef> = {
  x: {
    size: 1,
    alignment: 1,
    pack: (dv, off, _val, _le, count) => {
      const n = count ?? 1;
      for (let i = 0; i < n; i++) {
        dv.setUint8(off + i, 0);
      }
    },
    unpack: (_dv, _off, _le, _count) => null,
  },
  c: { size: 1, alignment: 1, pack: (dv, off, val) => dv.setUint8(off, val.charCodeAt(0)), unpack: (dv, off) => String.fromCharCode(dv.getUint8(off)) },
  b: { size: 1, alignment: 1, pack: (dv, off, val) => dv.setInt8(off, val), unpack: (dv, off) => dv.getInt8(off) },
  B: { size: 1, alignment: 1, pack: (dv, off, val) => dv.setUint8(off, val), unpack: (dv, off) => dv.getUint8(off) },
  '?': { size: 1, alignment: 1, pack: (dv, off, val) => dv.setUint8(off, val ? 1 : 0), unpack: (dv, off) => dv.getUint8(off) !== 0 },
  h: { size: 2, alignment: 2, pack: (dv, off, val, le) => dv.setInt16(off, val, le), unpack: (dv, off, le) => dv.getInt16(off, le) },
  H: { size: 2, alignment: 2, pack: (dv, off, val, le) => dv.setUint16(off, val, le), unpack: (dv, off, le) => dv.getUint16(off, le) },
  i: { size: 4, alignment: 4, pack: (dv, off, val, le) => dv.setInt32(off, val, le), unpack: (dv, off, le) => dv.getInt32(off, le) },
  I: { size: 4, alignment: 4, pack: (dv, off, val, le) => dv.setUint32(off, val, le), unpack: (dv, off, le) => dv.getUint32(off, le) },
  l: { size: 4, alignment: 4, pack: (dv, off, val, le) => dv.setInt32(off, val, le), unpack: (dv, off, le) => dv.getInt32(off, le) },
  L: { size: 4, alignment: 4, pack: (dv, off, val, le) => dv.setUint32(off, val, le), unpack: (dv, off, le) => dv.getUint32(off, le) },
  q: { size: 8, alignment: 8, pack: (dv, off, val, le) => dv.setBigInt64(off, BigInt(val), le), unpack: (dv, off, le) => dv.getBigInt64(off, le) },
  Q: { size: 8, alignment: 8, pack: (dv, off, val, le) => dv.setBigUint64(off, BigInt(val), le), unpack: (dv, off, le) => dv.getBigUint64(off, le) },
  f: { size: 4, alignment: 4, pack: (dv, off, val, le) => dv.setFloat32(off, val, le), unpack: (dv, off, le) => dv.getFloat32(off, le) },
  d: { size: 8, alignment: 8, pack: (dv, off, val, le) => dv.setFloat64(off, val, le), unpack: (dv, off, le) => dv.getFloat64(off, le) },
  s: {
    size: 1,
    alignment: 1,
    pack: (dv, off, val, _le, count = 1) => {
      let buf: Buffer;

      if (typeof val === 'string') {
        buf = Buffer.from(val, 'latin1'); // 默认 utf8，可改 'latin1'
      } else if (Buffer.isBuffer(val)) {
        buf = val;
      } else if (val && val.buffer instanceof ArrayBuffer) {
        // Uint8Array / TypedArray / DataView
        buf = Buffer.from(val.buffer, val.byteOffset ?? 0, val.byteLength);
      } else {
        console.log('val', val);
        throw new Error('s type must be string, Buffer or Uint8Array');
      }

      for (let i = 0; i < count; i++) {
        dv.setUint8(off + i, i < buf.length ? buf[i] : 0);
      }
    },
    unpack: (dv, off, _le, count = 1) => {
      const buf = Buffer.alloc(count);
      for (let i = 0; i < count; i++) {
        buf[i] = dv.getUint8(off + i);
      }
      return buf; // 解包也直接返回 Buffer
    },
  },
};

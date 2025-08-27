const pointerSize = process.config.variables.pointer_size; // 4 or 8

export const structFormatCodes = {
  byteOrder: {
    "@": "native byte order, native size & alignment",
    "=": "native byte order, standard size, no alignment",
    "<": "little-endian, standard size",
    ">": "big-endian, standard size",
    "!": "network (= big-endian), standard size",
  },
  types: {
    x: { size: 1 },
    c: { size: 1 },
    b: { size: 1 },
    B: { size: 1 },
    "?": { size: 1 },
    h: { size: 2 },
    H: { size: 2 },
    i: { size: 4 },
    I: { size: 4 },
    l: { size: 4 },
    L: { size: 4 },
    q: { size: 8 },
    Q: { size: 8 },
    n: { size: pointerSize },
    N: { size: pointerSize },
    e: { size: 2 },
    f: { size: 4 },
    d: { size: 8 },
    // s / p 必须动态决定
    s: { size: (len) => len }, // len 是数字前缀
    p: { size: (len) => len }, // len 是数字前缀
    P: { size: pointerSize },
  },
};

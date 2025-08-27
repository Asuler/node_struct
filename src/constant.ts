export const structFormatCodes = {
  byteOrder: {
    "@": "native byte order, native size & alignment", // 默认
    "=": "native byte order, standard size, no alignment",
    "<": "little-endian, standard size",
    ">": "big-endian, standard size",
    "!": "network (= big-endian), standard size",
  },
  types: {
    x: { description: "pad byte", size: 1 },
    c: { description: "char (bytes of length 1)", size: 1 },
    b: { description: "signed char", size: 1 },
    B: { description: "unsigned char", size: 1 },
    "?": { description: "bool", size: 1 },
    h: { description: "short", size: 2 },
    H: { description: "unsigned short", size: 2 },
    i: { description: "int", size: 4 },
    I: { description: "unsigned int", size: 4 },
    l: { description: "long", size: 4 },
    L: { description: "unsigned long", size: 4 },
    q: { description: "long long", size: 8 },
    Q: { description: "unsigned long long", size: 8 },
    n: { description: "ssize_t (platform-dependent size)", size: "native" },
    N: { description: "size_t (platform-dependent size)", size: "native" },
    e: { description: "float (2 bytes, IEEE 754 binary16)", size: 2 },
    f: { description: "float (4 bytes, IEEE 754 binary32)", size: 4 },
    d: { description: "double (8 bytes, IEEE 754 binary64)", size: 8 },
    s: {
      description: "char[] (string, length before s)",
      size: "length given",
    },
    p: {
      description: "pascal string (1 byte length + data)",
      size: "length given",
    },
    P: {
      description: "void * (pointer, platform size)",
      size: "native pointer size",
    },
  },
};

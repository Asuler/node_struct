import { endianness } from 'os';

function isLittleEndian(byteOrder: string | null): boolean {
  switch (byteOrder) {
    case '<': // 小端
      return true;
    case '>': // 大端
    case '!': // 网络字节序，大端
      return false;
    case '@': // native
    case '=': // native byte order, standard size
      return endianness() === 'LE';
    default: // 没有显式指定，按 native
      return endianness() === 'LE';
  }
}

export default isLittleEndian;

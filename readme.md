使用 ts 版 nodejs 复刻 python 中的 struct, 目前只支持 pack，unpack,calcsize 方法

### 使用 gpt5 辅助生成

### install

npm install node_py_struct

### 使用方法

function pack(format: string, ...values: any[]): Buffer;

function unpack(fmt: string, buffer: Buffer | ArrayBuffer | Uint8Array | DataView): any[];

function calcsize(fmt: string): number;

### demo

```
import struct from "node_py_struct";
struct.pack("<i", 123, Buffer.from([3,4,5]));
```

function isLE(): boolean {
  const b = new ArrayBuffer(2);
  new DataView(b).setInt16(0, 256, true);
  return new Int16Array(b)[0] === 256;
}

export default isLE;

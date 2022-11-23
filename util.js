export function grindKey(keySeed) {
  const keyValueLimit = ec.ec.n;
  if (!keyValueLimit) {
    return keySeed;
  }
  const sha256EcMaxDigest = number.toBN(
    "1 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000",
    16
  );
  const maxAllowedVal = sha256EcMaxDigest.sub(
    sha256EcMaxDigest.mod(keyValueLimit)
  );
}

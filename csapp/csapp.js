const log = console.log;
const MAX = Math.pow(2, 32);

function addBitFrontPaddings(binStr, size) {
  while (binStr.length < size)
    binStr = "0" + binStr;
  return binStr;
}
function addBitBackPaddings(binStr, size) {
  while (binStr.length < size)
    binStr += "0";
  return binStr;
}

function createFloatingBinStr(signed, exp, frac, size) {
  signed = signed || "0";
  exp = exp || "0";
  frac = frac || "0";
  size = size || 32;

  return signed + addBitFrontPaddings(exp, size === 32 ? 8 : 11) + addBitBackPaddings(frac, size === 32 ? 23 : 52); 
}

function B2T(binStr) {
  var ret = 0;
  for (let i = 0; i < binStr.length; i++) {
    ret += (Math.pow(2, binStr.length - i - 1) * (i == 0 ? -1 : 1) * parseInt(binStr[i]));
  }
  return ret;
}

function B2U(binStr) {
  var ret = 0;
  for (let i = 0; i < binStr.length; i++) {
    ret += (Math.pow(2, binStr.length - i - 1) * parseInt(binStr[i]));
  }
  return ret;
}

function U2B(num) {
  return num.toString(2);
}

function T2B(num, size) {
  if (num >= 0) return addBitFrontPaddings(U2B(num), size);

  var ret = addBitFrontPaddings(Math.abs(num).toString(2), size);
  ret = ret.split("");
  for (let i = 0; i < ret.length; i++)
    ret[i] = ret[i] === '0' ? '1' : '0';
  ret = ret.join("");
  return (parseInt(ret, 2) + 1).toString(2);
}

function T2U(num) {
  return B2U(T2B(num));
}

function U2T(num) {
  return num >= MAX ? MAX - num :  num;
}


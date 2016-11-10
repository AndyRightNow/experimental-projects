const log = console.log;
const MAX = Math.pow(2, 32);

function add32BitPaddings(binStr) {
  while (binStr.length < 32)
    binStr = "0" + binStr;
  return binStr;
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

function T2B(num) {
  if (num >= 0) return add32BitPaddings(U2B(num));

  var ret = add32BitPaddings(Math.abs(num).toString(2));
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

function B2F(binStr) {
  let m = binStr.indexOf('.');
  if (m === -1) {
    return B2T(binStr);
  }

  let weight = m - 1;
  let ret = 0;
  for (let i = 0, ll = binStr.length; i < ll; i++) {
    if (binStr[i] !== '.') {
      ret += (Math.pow(2, weight--) * parseInt(binStr[i]));
    }
  }
  return ret;
}


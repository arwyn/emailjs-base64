'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOOKUP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
var MAX_CHUNK_LENGTH = 16383; // must be multiple of 3

var tripletToBase64 = function tripletToBase64(num) {
  return LOOKUP[num >> 18 & 0x3F] + LOOKUP[num >> 12 & 0x3F] + LOOKUP[num >> 6 & 0x3F] + LOOKUP[num & 0x3F];
};

function encodeChunk(uint8, start, end) {
  var output = '';
  for (var i = start; i < end; i += 3) {
    output += tripletToBase64((uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2]);
  }
  return output;
}

var str2arr = function str2arr(str) {
  return new Uint8Array(str.split('').map(function (char) {
    return char.charCodeAt(0);
  }));
};

function encode(data) {
  var len = data.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += MAX_CHUNK_LENGTH) {
    output += encodeChunk(data, i, i + MAX_CHUNK_LENGTH > len2 ? len2 : i + MAX_CHUNK_LENGTH);
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    var tmp = data[len - 1];
    output += LOOKUP[tmp >> 2];
    output += LOOKUP[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    var _tmp = (data[len - 2] << 8) + data[len - 1];
    output += LOOKUP[_tmp >> 10];
    output += LOOKUP[_tmp >> 4 & 0x3F];
    output += LOOKUP[_tmp << 2 & 0x3F];
    output += '=';
  }

  return output;
}

exports.default = function (data) {
  return typeof data === 'string' ? encode(str2arr(unescape(encodeURIComponent(data)))) : encode(data);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYXNlNjQtZW5jb2RlLmpzIl0sIm5hbWVzIjpbIkxPT0tVUCIsInNwbGl0IiwiTUFYX0NIVU5LX0xFTkdUSCIsInRyaXBsZXRUb0Jhc2U2NCIsIm51bSIsImVuY29kZUNodW5rIiwidWludDgiLCJzdGFydCIsImVuZCIsIm91dHB1dCIsImkiLCJzdHIyYXJyIiwiVWludDhBcnJheSIsInN0ciIsIm1hcCIsImNoYXIiLCJjaGFyQ29kZUF0IiwiZW5jb2RlIiwiZGF0YSIsImxlbiIsImxlbmd0aCIsImV4dHJhQnl0ZXMiLCJsZW4yIiwidG1wIiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTUEsU0FBUyxtRUFBbUVDLEtBQW5FLENBQXlFLEVBQXpFLENBQWY7QUFDQSxJQUFNQyxtQkFBbUIsS0FBekIsQyxDQUErQjs7QUFFL0IsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQU9ILE9BQU9JLE9BQU8sRUFBUCxHQUFZLElBQW5CLElBQTJCSixPQUFPSSxPQUFPLEVBQVAsR0FBWSxJQUFuQixDQUEzQixHQUFzREosT0FBT0ksT0FBTyxDQUFQLEdBQVcsSUFBbEIsQ0FBdEQsR0FBZ0ZKLE9BQU9JLE1BQU0sSUFBYixDQUF2RjtBQUFBLENBQXhCOztBQUVBLFNBQVNDLFdBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCQyxLQUE3QixFQUFvQ0MsR0FBcEMsRUFBeUM7QUFDdkMsTUFBSUMsU0FBUyxFQUFiO0FBQ0EsT0FBSyxJQUFJQyxJQUFJSCxLQUFiLEVBQW9CRyxJQUFJRixHQUF4QixFQUE2QkUsS0FBSyxDQUFsQyxFQUFxQztBQUNuQ0QsY0FBVU4sZ0JBQWdCLENBQUNHLE1BQU1JLENBQU4sS0FBWSxFQUFiLEtBQW9CSixNQUFNSSxJQUFJLENBQVYsS0FBZ0IsQ0FBcEMsSUFBMENKLE1BQU1JLElBQUksQ0FBVixDQUExRCxDQUFWO0FBQ0Q7QUFDRCxTQUFPRCxNQUFQO0FBQ0Q7O0FBRUQsSUFBTUUsVUFBVSxTQUFWQSxPQUFVO0FBQUEsU0FBTyxJQUFJQyxVQUFKLENBQWVDLElBQUlaLEtBQUosQ0FBVSxFQUFWLEVBQWNhLEdBQWQsQ0FBa0I7QUFBQSxXQUFRQyxLQUFLQyxVQUFMLENBQWdCLENBQWhCLENBQVI7QUFBQSxHQUFsQixDQUFmLENBQVA7QUFBQSxDQUFoQjs7QUFFQSxTQUFTQyxNQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUNyQixNQUFNQyxNQUFNRCxLQUFLRSxNQUFqQjtBQUNBLE1BQU1DLGFBQWFGLE1BQU0sQ0FBekIsQ0FGcUIsQ0FFTTtBQUMzQixNQUFJVixTQUFTLEVBQWI7O0FBRUE7QUFDQSxPQUFLLElBQUlDLElBQUksQ0FBUixFQUFXWSxPQUFPSCxNQUFNRSxVQUE3QixFQUF5Q1gsSUFBSVksSUFBN0MsRUFBbURaLEtBQUtSLGdCQUF4RCxFQUEwRTtBQUN4RU8sY0FBVUosWUFBWWEsSUFBWixFQUFrQlIsQ0FBbEIsRUFBc0JBLElBQUlSLGdCQUFMLEdBQXlCb0IsSUFBekIsR0FBZ0NBLElBQWhDLEdBQXdDWixJQUFJUixnQkFBakUsQ0FBVjtBQUNEOztBQUVEO0FBQ0EsTUFBSW1CLGVBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsUUFBTUUsTUFBTUwsS0FBS0MsTUFBTSxDQUFYLENBQVo7QUFDQVYsY0FBVVQsT0FBT3VCLE9BQU8sQ0FBZCxDQUFWO0FBQ0FkLGNBQVVULE9BQVF1QixPQUFPLENBQVIsR0FBYSxJQUFwQixDQUFWO0FBQ0FkLGNBQVUsSUFBVjtBQUNELEdBTEQsTUFLTyxJQUFJWSxlQUFlLENBQW5CLEVBQXNCO0FBQzNCLFFBQU1FLE9BQU0sQ0FBQ0wsS0FBS0MsTUFBTSxDQUFYLEtBQWlCLENBQWxCLElBQXdCRCxLQUFLQyxNQUFNLENBQVgsQ0FBcEM7QUFDQVYsY0FBVVQsT0FBT3VCLFFBQU8sRUFBZCxDQUFWO0FBQ0FkLGNBQVVULE9BQVF1QixRQUFPLENBQVIsR0FBYSxJQUFwQixDQUFWO0FBQ0FkLGNBQVVULE9BQVF1QixRQUFPLENBQVIsR0FBYSxJQUFwQixDQUFWO0FBQ0FkLGNBQVUsR0FBVjtBQUNEOztBQUVELFNBQU9BLE1BQVA7QUFDRDs7a0JBRWM7QUFBQSxTQUFRLE9BQU9TLElBQVAsS0FBZ0IsUUFBaEIsR0FBMkJELE9BQU9OLFFBQVFhLFNBQVNDLG1CQUFtQlAsSUFBbkIsQ0FBVCxDQUFSLENBQVAsQ0FBM0IsR0FBaUZELE9BQU9DLElBQVAsQ0FBekY7QUFBQSxDIiwiZmlsZSI6ImJhc2U2NC1lbmNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBMT09LVVAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLycuc3BsaXQoJycpXG5jb25zdCBNQVhfQ0hVTktfTEVOR1RIID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbmNvbnN0IHRyaXBsZXRUb0Jhc2U2NCA9IG51bSA9PiBMT09LVVBbbnVtID4+IDE4ICYgMHgzRl0gKyBMT09LVVBbbnVtID4+IDEyICYgMHgzRl0gKyBMT09LVVBbbnVtID4+IDYgJiAweDNGXSArIExPT0tVUFtudW0gJiAweDNGXVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgbGV0IG91dHB1dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgb3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCgodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pKVxuICB9XG4gIHJldHVybiBvdXRwdXRcbn1cblxuY29uc3Qgc3RyMmFyciA9IHN0ciA9PiBuZXcgVWludDhBcnJheShzdHIuc3BsaXQoJycpLm1hcChjaGFyID0+IGNoYXIuY2hhckNvZGVBdCgwKSkpXG5cbmZ1bmN0aW9uIGVuY29kZSAoZGF0YSkge1xuICBjb25zdCBsZW4gPSBkYXRhLmxlbmd0aFxuICBjb25zdCBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICBsZXQgb3V0cHV0ID0gJydcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAobGV0IGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gTUFYX0NIVU5LX0xFTkdUSCkge1xuICAgIG91dHB1dCArPSBlbmNvZGVDaHVuayhkYXRhLCBpLCAoaSArIE1BWF9DSFVOS19MRU5HVEgpID4gbGVuMiA/IGxlbjIgOiAoaSArIE1BWF9DSFVOS19MRU5HVEgpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIGNvbnN0IHRtcCA9IGRhdGFbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gTE9PS1VQW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBMT09LVVBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgY29uc3QgdG1wID0gKGRhdGFbbGVuIC0gMl0gPDwgOCkgKyAoZGF0YVtsZW4gLSAxXSlcbiAgICBvdXRwdXQgKz0gTE9PS1VQW3RtcCA+PiAxMF1cbiAgICBvdXRwdXQgKz0gTE9PS1VQWyh0bXAgPj4gNCkgJiAweDNGXVxuICAgIG91dHB1dCArPSBMT09LVVBbKHRtcCA8PCAyKSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9J1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRhID0+IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IGVuY29kZShzdHIyYXJyKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChkYXRhKSkpKSA6IGVuY29kZShkYXRhKVxuIl19
var qrcode = require("./qrCode");

function convert_length(length) {
  return Math.round((wx.getSystemInfoSync().windowWidth * length) / 750);
}

function barc(id, code, width, height) {
  barcode.code128(
    wx.createCanvasContext(id),
    code,
    convert_length(width),
    convert_length(height)
  );
}

function qrc(id, code, width, height) {
  qrcode.api.draw(code, {
    ctx: wx.createCanvasContext(id),
    width: width,
    height: height
  });
}

// export defalut qrc;
module.exports = {
  qrc: qrc
};

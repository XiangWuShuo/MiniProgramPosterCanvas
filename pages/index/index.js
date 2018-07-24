const drawing = require("../../utils/drawing");
const qrcode = require("../../utils/qrCode");
const app = getApp();

const context = wx.createCanvasContext("myCanvas");
const deviceWidth = wx.getSystemInfoSync().windowWidth;
const bgHeight = (deviceWidth * 1334) / 750;

Page({
  data: {
    expressData: {
      imgPath:
        "https://imgs-1253854453.image.myqcloud.com/fdbd20b19b6ab2ea2f12b4910ac91d45.png",
      qrCodeUrl: {
        code: "www.jd.com",
        width: 110,
        height: 110,
        x: 225,
        y: 375
      },
      list: {
        avatar: {
          imgUrl:
            "https://imgs-1253854453.image.myqcloud.com/0eff60f48db1f79f0ac43dd7fb12c56a.jpg",
          width: 50,
          height: 50,
          x: 40,
          y: 53
        },
        product: {
          imgUrl:
            "http://imgs-1253854453.image.myqcloud.com/40ed9acfe204832551f68e2ae167023e.jpg",
          width: 161,
          height: 242,
          x: 108,
          y: 120
        },
        text: {
          text: "迪士尼儿童背带",
          color: "#f00",
          font: "24",
          x: 30,
          y: 400
        },
        total: {
          text: "2081",
          color: "#000",
          font: "15",
          x: 90,
          y: 427
        }
      }
    }
  },

  onLoad: function() {
    this.drawCanvasImg();
  },

  // 画图
  drawCanvasImg: function() {
    wx.showLoading({
      title: "加载中"
    });
    this.drawBackgroudImage().then(() => {
      Promise.all([this.drawAvatar(), this.drawProduct()]).then(() => {
        this.drawQrCodeImage();
        this.saveCanvasToLocal("qrCodeCanvas").then(localPath => {
          context.drawImage(
            localPath,
            deviceWidth * (this.data.expressData.qrCodeUrl.x / 375),
            deviceWidth * (this.data.expressData.qrCodeUrl.y / 375),
            deviceWidth * (this.data.expressData.qrCodeUrl.width / 375),
            deviceWidth * (this.data.expressData.qrCodeUrl.height / 375)
          );
          context.draw();
          wx.hideLoading();
        });
      });
    });
  },

  saveCanvasToLocal(id) {
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        canvasId: id,
        success: function(res) {
          resolve(res.tempFilePath);
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },

  drawBackgroudImage() {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: _this.data.expressData.imgPath,
        success: function(res) {
          context.drawImage(res.path, 0, 0, deviceWidth, bgHeight);
          resolve();
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },

  drawQrCodeImage() {
    drawing.qrc("qrCodeCanvas", this.data.expressData.qrCodeUrl.code, 50, 50);
  },

  drawProduct() {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: _this.data.expressData.list.product.imgUrl,
        success: function(res) {
          // 商品
          context.drawImage(
            res.path,
            deviceWidth * (_this.data.expressData.list.product.x / 375),
            deviceWidth * (_this.data.expressData.list.product.y / 375),
            deviceWidth * (_this.data.expressData.list.product.width / 375),
            deviceWidth * (_this.data.expressData.list.product.height / 375)
          );
          // 文字
          const list = _this.data.expressData.list;
          _this.drawText(
            context,
            list.text,
            deviceWidth * (_this.data.expressData.list.text.font / 375),
            deviceWidth * (_this.data.expressData.list.text.x / 375),
            deviceWidth * (_this.data.expressData.list.text.y / 375)
          );
          _this.drawText(
            context,
            list.total,
            deviceWidth * (_this.data.expressData.list.total.font / 375),
            deviceWidth * (_this.data.expressData.list.total.x / 375),
            deviceWidth * (_this.data.expressData.list.total.y / 375)
          );

          return resolve();
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },

  drawAvatar() {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: _this.data.expressData.list.avatar.imgUrl,
        success: function(res) {
          _this.drawCircleImg(
            context,
            res.path,
            deviceWidth * (_this.data.expressData.list.avatar.x / 375),
            deviceWidth * (_this.data.expressData.list.avatar.y / 375),
            deviceWidth * (_this.data.expressData.list.avatar.width / 750)
          );
          resolve();
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },

  drawText: function(context, data, font, x, y) {
    context.setFontSize(font);
    context.setFillStyle(data.color);
    context.setTextAlign("left");
    context.fillText(data.text, x, y);
  },

  drawCircleImg: function(ctx, img, x, y, r) {
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
  },

  longClick: function() {
    let _this = this;
    _this.saveCanvasToLocal("myCanvas").then(canvasPath => {
      wx.showModal({
        content: "保存图片",
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            wx.saveImageToPhotosAlbum({
              filePath: canvasPath,
              success(res) {
                console.log("res:saveimg---", res);
                wx.showToast({
                  title: "保存成功",
                  icon: "success",
                  duration: 2000
                });

                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2500);
              },
              fail(err) {
                console.log("errsaveimg", err);
                wx.hideToast();

                wx.getSetting({
                  success: res => {
                    if (!res.authSetting["scope.writePhotosAlbum"]) {
                      wx.showModal({
                        title: "提示",
                        content: "保存图片需要打开手机图库授权，是否继续授权？",
                        success: function(res) {
                          if (res.confirm) {
                            wx.openSetting();
                          } else if (res.cancel) {
                            console.log("用户点击取消");
                          }
                        }
                      });
                    }
                  }
                });
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    });
  }
});

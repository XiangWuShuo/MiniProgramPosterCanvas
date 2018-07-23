const Drawing = require("../../utils/drawing");
const app = getApp();
Page({
  data: {
    expressData: {
      imgPath:
        "http://imgs-1253854453.image.myqcloud.com/fdbd20b19b6ab2ea2f12b4910ac91d45.png",
      qrCodeUrl: {
        code: "www.jd.comfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        url:
          "http://imgs-1253854453.image.myqcloud.com/35ffdec6d3eefe6247e34c72fb257a1b.png",
        width: 110,
        height: 110,
        x: 224,
        y: 370
      },
      list: [
        {
          type: "image",
          imgUrl:
            "http://imgs-1253854453.image.myqcloud.com/0eff60f48db1f79f0ac43dd7fb12c56a.jpg",
          width: 50,
          height: 50,
          x: 40,
          y: 53,
          isCircle: true
        },
        {
          type: "image",
          imgUrl:
            "http://imgs-1253854453.cossh.myqcloud.com/0aa8a0e8f25a0f608deefb36c34be39f.jpg",
          width: 161,
          height: 242,
          x: 110,
          y: 120
        },
        {
          type: "text",
          text: "迪士尼儿童背带",
          color: "#f00",
          font: "24",
          x: 30,
          y: 400
        },
        {
          type: "text",
          text: "2081",
          color: "#000",
          font: "15",
          x: 100,
          y: 427
        }
      ]
    },
    bgImgUrl: "",
    qrCodeUrl: "",
    touXiangImg: "",
    product: ""
  },

  onLoad: function(options) {
    this.getQrcodeImg();
    this.startDrawing();
  },
  // 获取二维码链接，并生成图片
  getQrcodeImg: function() {
    Drawing.qrc("qrCodeCanvas", this.data.expressData.imgPath, 50, 50);
  },
  // 绘制图片
  myDrawImg: function(context, data) {
    if (data.isCircle) {
      this.circleImg(context, data.imgUrl, data.x, data.y, 25);
    } else {
      context.drawImage(data.imgUrl, data.x, data.y, data.width, data.height);
    }
  },
  // 绘制文字
  drawText: function(context, data) {
    context.setFontSize(data.font);
    context.setFillStyle(data.color);
    context.setTextAlign("left");
    context.fillText(data.text, data.x, data.y);
  },
  // 绘制圆形头像
  circleImg: function(ctx, img, x, y, r) {
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
  },

  // 将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  drawCanvasImg: function() {
    var that = this;
    var context = wx.createCanvasContext("mycanvas");
    let deviceWidth = wx.getSystemInfoSync().windowWidth;
    let deviceHeight = wx.getSystemInfoSync().windowHeight;
    // 背景图;
    wx.getImageInfo({
      src: that.data.expressData.imgPath,
      success: function(res) {
        that.setData({
          bgImgUrl: res.path
        });
        // context.drawImage(that.data.bgImgUrl, 0, 0, deviceWidth, deviceHeight);
        // 二维码
        wx.getImageInfo({
          src: that.data.expressData.qrCodeUrl.url,
          success: function(res) {
            // success
            that.setData({
              qrCodeUrl: res.path
            });

            // 头像
            wx.getImageInfo({
              src: that.data.expressData.list[0].imgUrl,
              success: function(res) {
                // success
                that.setData({
                  touXiangImg: res.path
                });

                // 商品图片
                wx.getImageInfo({
                  src: that.data.expressData.list[1].imgUrl,
                  success: function(res) {
                    that.setData({
                      product: res.path
                    });

                    // 背景
                    context.drawImage(
                      that.data.bgImgUrl,
                      0,
                      0,
                      deviceWidth,
                      deviceHeight
                    );
                    // 二维码
                    context.drawImage(that.data.qrCodeUrl, 270, 390, 100, 100);
                    // 头像
                    that.circleImg(context, that.data.touXiangImg, 40, 53, 25);
                    // 商品
                    context.drawImage(that.data.product, 110, 120, 161, 242);
                    for (
                      let i = 0;
                      i < that.data.expressData.list.length;
                      i++
                    ) {
                      let value = that.data.expressData.list[i];
                      if (value.type == "text") {
                        that.drawText(context, value);
                      }
                    }
                    context.draw();
                    // 保存canvas
                    setTimeout(function() {
                      wx.canvasToTempFilePath({
                        canvasId: "mycanvas",
                        success: function(res) {
                          var tempFilePath = res.tempFilePath;
                          that.setData({
                            imagePath: tempFilePath,
                            canvasHidden: true
                          });
                        },
                        fail: function(res) {
                          console.log(res);
                        }
                      });
                    }, 200);
                    //
                  }
                });
              }
            });
          }
        });
      }
    });
  },

  //开始生成
  startDrawing: function(e) {
    var that = this;
    wx.showToast({
      title: "生成中...",
      icon: "loading",
      duration: 1000
    });
    that.drawCanvasImg();
  },

  // 点击图片预览
  previewImage: function(e) {
    wx.previewImage({
      current: this.data.imagePath, // 当前显示图片的http链接
      urls: [this.data.imagePath] // 需要预览的图片http链接列表
    });
  },
  onPullDownRefreash: function() {
    this.startDrawing();
  }
});

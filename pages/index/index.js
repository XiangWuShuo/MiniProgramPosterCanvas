const Drawing = require("../drawing");
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
            "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoFN9WMUV2y7un0hvsBbIc5W9Q94nuQlIhBso2Kib6vRXibgUia8pE60W1LTGmGOk4bC7BfsWBia3Xufw/132",
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
          width: 242,
          height: 242,
          x: 70,
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
          font: "12",
          x: 90,
          y: 427
        }
      ]
    },
    bgImgUrl: ""
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

  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  drawCanvasImg: function() {
    var that = this;
    var context = wx.createCanvasContext("mycanvas");
    // 背景图
    context.drawImage(this.data.expressData.imgPath, 0, 0, 375, 667);

    // 二维码
    context.drawImage(this.data.expressData.qrCodeUrl.url, 220, 370, 100, 100);

    // 生成文案与图片
    for (let i = 0; i < this.data.expressData.list.length; i++) {
      let value = this.data.expressData.list[i];
      if (value.type == "text") {
        this.drawText(context, value);
      } else if (value.type == "image") {
        this.myDrawImg(context, value);
      }
    }
    context.draw();

    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
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
  },

  //点击保存到相册
  saveToLocal: function() {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: "图片已保存到相册，赶紧晒一下吧~",
          showCancel: false,
          confirmText: "好的",
          confirmColor: "#333",
          success: function(res) {
            if (res.confirm) {
              console.log("用户点击确定");
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              });
            }
          },
          fail: function(res) {
            console.log(11111);
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
    setTimeout(function() {
      wx.hideToast();
      that.drawCanvasImg();
    }, 1000);
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

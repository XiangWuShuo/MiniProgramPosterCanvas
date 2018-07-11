const Drawing = require("../drawing");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    expressData: {
      imgPath:
        "http://imgs-1253854453.cossh.myqcloud.com/fdbd20b19b6ab2ea2f12b4910ac91d45.png",
      qrCodeUrl: {
        code: "www.jd.comfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
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
          font: "24px Airal",
          x: 30,
          y: 400
        },
        {
          type: "text",
          text: "2081",
          color: "#000",
          font: "16px Airal",
          x: 90,
          y: 427
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.formSubmit();
    // this.getQrcodeImg();
  },

  // 获取二维码链接，并生成图片
  getQrcodeImg: function() {
    console.log("getQrcodeImg start --->>>");
    Drawing.qrc("qrCodeCanvas", this.data.imgPath, 150, 150);
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
  createNewImg: function() {
    var that = this;
    var context = wx.createCanvasContext("mycanvas");
    context.setFillStyle("#ffe200");
    context.fillRect(0, 0, 375, 667);
    var path =
      "http://imgs-1253854453.image.myqcloud.com/fdbd20b19b6ab2ea2f12b4910ac91d45.png";
    context.drawImage(path, 0, 0, 375, 812);

    // 拼团商品
    var productPath =
      "http://imgs-1253854453.image.myqcloud.com/0aa8a0e8f25a0f608deefb36c34be39f.jpg";
    context.drawImage(productPath, 70, 170, 242, 242);

    //拼团文案
    context.setFontSize(16);
    context.setFillStyle("#666");
    context.setTextAlign("left");
    context.fillText("背包XXXXXXXXXX", 33, 485);

    //拼团数量
    context.setFontSize(16);
    context.setFillStyle("#666");
    context.setTextAlign("left");
    context.fillText("127", 95, 515);

    //绘制右下角扫码提示语
    var path5 =
      "http://imgs-1253854453.image.myqcloud.com/1ab20e9f41573eecd2acf58067225d58.png";
    context.drawImage(path5, 208, 470, 100, 100);

    //绘制头像
    that.circleImg(context, productPath, 38, 60, 40);
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
  baocun: function() {
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
  //点击生成
  formSubmit: function(e) {
    var that = this;
    wx.showToast({
      title: "生成中...",
      icon: "loading",
      duration: 1000
    });
    setTimeout(function() {
      wx.hideToast();
      that.createNewImg();
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
    this.formSubmit();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: "这个是我分享出来的东西",
      success: function(res) {
        console.log(res, "转发成功");
      },
      fail: function(res) {
        console.log(res, "转发失败");
      }
    };
  }
});

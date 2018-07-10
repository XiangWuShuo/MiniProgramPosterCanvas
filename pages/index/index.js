const Drawing = require("../drawing");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img:
      "https://imgs-1253854453.cossh.myqcloud.com/34430437579ac6c9d1af3c1cd3767df2.png",
    wechat:
      "https://imgs-1253854453.cossh.myqcloud.com/34430437579ac6c9d1af3c1cd3767df2.png",
    quan:
      "https://imgs-1253854453.cossh.myqcloud.com/34430437579ac6c9d1af3c1cd3767df2.png",
    code: "E7AI98",
    inputValue: "",
    maskHidden: false,
    name: "",
    touxiang: "",
    code: "E7A93C",
    imgPath:
      "https://imgs-1253854453.cossh.myqcloud.com/34430437579ac6c9d1af3c1cd3767df2.png",
    imagePath: ""
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
    Drawing.qrc("canvas", this.data.imgPath, 150, 150);
  },

  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function() {
    var that = this;
    var context = wx.createCanvasContext("mycanvas");
    // context.setFillStyle("#ffe200");
    context.fillRect(0, 0, 375, 667);
    var path =
      "https://imgs-1253854453.cossh.myqcloud.com/34430437579ac6c9d1af3c1cd3767df2.png";
    context.drawImage(path, 0, 0, 375, 812);

    //绘制右下角扫码提示语
    var path5 =
      "http://ww1.sinaimg.cn/large/41e13d0bgy1fsvsmiwuyxj20dw0jomyx.jpg";
    context.drawImage(path5, 208, 528, 100, 100);
    //绘制头像
    context.arc(186, 246, 50, 0, 2 * Math.PI); //画出圆

    context.clip(); //裁剪上面的圆形
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
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: "生成中...",
      icon: "loading",
      duration: 1000
    });
    setTimeout(function() {
      wx.hideToast();
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
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

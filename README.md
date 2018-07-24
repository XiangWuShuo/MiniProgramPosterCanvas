# MiniProgramPosterCanvas

[![Codebeat](https://codebeat.co/badges/f95d40b0-dc89-49ee-aa4e-1387e490f485)](https://codebeat.co/projects/github-com-xiangwushuo-miniprogrampostercanvas-master)
[![LICENSE](https://img.shields.io/badge/license-MIT-000000.svg)](https://raw.githubusercontent.com/XiangWuShuo/MiniProgramPosterCanvas/master/LICENSE)
[![3](https://img.shields.io/badge/made%20with-%3C3-orange.svg)](https://raw.githubusercontent.com/EyreFree/EFQRCode/assets/icon/MadeWith%3C3.png)

MiniProgramPosterCanvas is a tool to generate poster in MiniProgram with Canvas.

> [中文介绍](/README_CN.md)

## Overview

![](http://imgs-1253854453.image.myqcloud.com/1d8a8178d03dae3a603974bd61e621fc.png)

## Demo

1.  To run the example project manually, clone the repo, demos are in the 'Examples' folder;
2.  After you download the file, use the WeChatMiniProgramDevTool to open the file;
3.  `pages/index/index.html` is main function;
4.  You can change `expressData` in `index.js` to custom the poster.

## Requirements

- [MiniProgram](https://developers.weixin.qq.com/miniprogram/dev/)
- [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

## Quick Start

### 1. Realization principle

1.  Using JSON to make page configurable;
2.  Generate image with Canvas.

### 2. Request data description

```yml
expressData: {
      data: {
        // 这个是背景图
        imgPath:
          "http://imgs-1253854453.cossh.myqcloud.com/fdbd20b19b6ab2ea2f12b4910ac91d45.png",
        // 这个是需要生成的二维码的信息
        // code:需要转为二维码的数据
        // width: 二维码宽度
        // height：二维码高度
        // x：x轴的坐标
        // y：y轴的坐标
        qrCodeUrl: {
          code: "www.jd.comfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
          width: 110,
          height: 110,
          x: 224,
          y: 370
        },
        // 页面其他元素
        // type: 后端返回数据有两种，image（图片）和text（文本）
        // imgUrl: 图片元素的链接
        // text：文本内容
        // width：宽度
        // height：高度
        // x: x轴的坐标
        // y: y轴的坐标
        // isCircle: 判断是否是用户头像
        // color： 文本的颜色
        // font：字体大小与类型
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
    }
```

## Contact

mingying，mingying@xiangwushuo.com;  
danchaofan，danchaofan@xiangwushuo.com.

## License

<a href="https://github.com/XiangWuShuo/MiniProgramPosterCanvas/blob/master/LICENSE">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/License_icon-mit-88x31-2.svg/128px-License_icon-mit-88x31-2.svg.png">
</a>

MiniProgramPosterCanvas is available under the MIT license. See the LICENSE file for more info.

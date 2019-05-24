## 概述
使用gulp来打包支付宝小程序

## 优势
可以使用gulp的所有功能，包括webpack，demo阶段只加入了sass编译
1. sass编译
2. 设置环境
3. 只会打入有用的文件
4. 图片压缩

## 使用
1. vscode打开项目根目录
2. 按照package.json里的scripts打包出来dist文件夹，现支持dev和fat环境
3. 支付宝小程序IDE打开dist作为项目目录
4. 修改src里的文件会自动触发gulp watch并重新打包

## css文件打包优先级
同目录下如果既有sass文件也有acss文件
1. npm run时默认使用sass文件
2. gulp watch运行中修改哪个使用哪个

**推荐使用sass**

## 打包相关文件
/gulpfile.js

/gulptasks/*.js





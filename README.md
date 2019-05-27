## 概述
使用gulp来打包支付宝小程序

## 使用
1. vscode打开项目根目录
2. npm i 安装依赖
3. 按照package.json里的scripts打包出来dist文件夹，现支持dev和fat环境
4. 支付宝小程序IDE打开dist作为项目目录
5. 修改src里的文件会自动触发gulp watch并重新打包

## 打包相关文件
/gulpfile.js

/gulptasks/*.js

## 现有功能
### 设置环境
1. **gulp fat** 即可运行fat环境，其他环境同理

### sass编译
同目录下如果既有sass文件也有acss文件：
1. npm run时默认使用sass文件
2. gulp watch运行中修改哪个使用哪个

### 图片压缩相关
1. **gulp imgmin-log** 做src路径下图片压缩检查
2. **gulp imgmin** 将src路径下图片压缩
3. 项目运行时自动将src路径下图片压缩到dist，并监控src路径下图片修改（此功能默认关闭）








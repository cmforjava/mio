查看当前源地址 npm config get registry

使用 nrm 管理 registry 地址

a.下载 nrm

npm install -g nrm

b.添加 registry 地址

nrm add npm http://registry.npmjs.org

nrm add taobao https://registry.npm.taobao.org

c.切换 npm registry 地址

nrm use taobao

nrm use npm

//需要切换到 npm 源上传

npm login

npm who am i

mkdir mioc
cd mioc
npm init

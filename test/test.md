---
title: Typora+PicGo+搭建图床
description: 腾讯前端实习面试总结与复盘
publishedAt: '2022-06-03'
lastUpdated: '2022-06-03'
tags: 'typescript'
---

## 下载 Typora 和 PicGo

### 1.下载 Typora

Typora 从 1.0.0 版本以后开始收费了，功能更加齐全稳定，如果有更多的需求，还是建议购买，不过测试版的功能已经满足了用户大部分的需求了，如果需要最后一个免费使用的版本，可以点击[网盘链接](https://pan.baidu.com/s/1eesTkZ0TWtoIPbUcyvGPfw?pwd=fr4c)进行下载（提取码: fr4c），也可以从官网中找到所有的老版本，然后下载 Old Beta 0.11.18 版，只要以后不更新即可白嫖

Typora[官网下载链接](https://typora.io/)

安装过程就是一直下一步，更改文件下载路径即可

### 2.下载 PicGo

进入[PicGo 官网](https://molunerfinn.com/PicGo/)，点击免费下载即可进入到 PicGo 在 Github 上的项目[下载地址](https://github.com/Molunerfinn/picgo/releases)

然后找到最新的稳定正式版

![9a186523229682557c2c3f9f9542d46e](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201019981.png)

找到安装包下载链接，点击下载即可![423d7ca56af537f65353efa80ac92cca](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201019243.png)

Win 用户下载 `.exe` 文件即可

Mac 用户下载 `.dmg`

安装同样很简单，这里就在赘述

### 3.设置 Typora

首先，打开刚刚下载的 Markdown 编辑器 Typora，点击`文件`>`偏好设置`>`图像`

然后进行以下设置

![26a9412fc2956037693d7531ed560da4](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201021598.png)

## 阿里云 OSS

### 1.设定 KeyId 和设定 KeySecret

在 AccessKey 管理这里进去后可以创建账户，并查看对应的 KeyId 和 KeySecret
![1](https://pic1.zhimg.com/80/v2-45076c9146b83f61ebe3b92a5b878220_720w.jpg)

### 2.设定存储空间名

- 存储类型建议选择【标准存储】，选择【低频访问存储】的话，虽然存储费用可以降低，但数据取回费用相对较高。

- 读写权限选择【公共读】，如果选择【私有】，PicGo 仍然可以上传，但在 PicGo 中不能预览，用起来不方便。

![](https://pic2.zhimg.com/80/v2-73b2503dc8f503e5d88cd321dfdeb82d_720w.jpg)

### 3.确认存储区域

获取途径参考下图，注意后缀的.<http://aliyun.com不需要（PicGo会自动添加）>

![](https://pic3.zhimg.com/80/v2-027c3d8d447fb69ce7b21d7fdfd304e2_720w.jpg)

### 4.指定存储路径

指定存储路径可根据实际情况设置

![](https://pic3.zhimg.com/80/v2-ccec4b013b6a644e03d1adf24aeb0e3e_720w.jpg)

### 5.设定网址后缀

可以为空，也可以根据已经在 OSS 中事先设置好的文件样式（比如说水印样式）来设置，格式为 `?x-oss-process=style/[stylename]`。比如说，在 OSS 中事先设置了如下的一个样式，如下图所示，其效果是在图片右上角显示一个水印符号。

![](https://pic2.zhimg.com/80/v2-0f681b1b7a60be74cbfeb4126487b099_720w.jpg)

如果需要这样的样式，那么我们可以在 PicGo 的【设定网址后缀】这里设置为：?x-oss-process=style/quant.show，

![](https://pic3.zhimg.com/80/v2-3dd2dbe0595f081aa141a43e0be0ded2_720w.jpg)

这样设置后，上传图片不影响，改变的是在 PicGo 的相册里，显示的图片会自动加上该样式的水印，供用户使用。那么用户是否可以使用加水印前的图片呢？答案是可以的。虽然在 PicGo 相册中可能没有显示，但是可以手动地删除图片地址的?x-oss-process=style/quant.show 部分，就可以访问到原图了。

不过，如果没有大量使用有样式的图片的需求的话，建议【设定网址后缀】这里还是设置为空，在 Wiki、博客等写在过程如果偶尔有使用样式的需求，可以通过在 PicGo 的链接后缀后手动地添加样式。

### 6.设定自定义域名

自定义域名的设置和是否能成功上传无关，即便设置错误，仍然可以正常上传至 OSS。但是，如果设置错误，在 PicGo 相册中一是不能正常显示，二是其链接无效。

![](https://pic4.zhimg.com/80/v2-962ea46eb84107474cacea68505b0017_720w.jpg)

### 7.OSS 的数据安全设置

为了既保证上传的数据安全，又不影响 PicGo 的正常使用，在 OSS 的【基础设置】——【服务器加密】中，设置【OSS 完全托管】，会使用 OSS 完全托管的密钥加密每个 Object。目前是免费的。

![](https://pic3.zhimg.com/80/v2-ed609e475fb1b06488fefe5b7d867466_720w.jpg)

## 腾讯云 OSS

### 1.开通配置腾讯云对象存储

进入[腾讯云官网](https://cloud.tencent.com/)，注册登录腾讯云账号，如还未进行实名认证，需要先实名认证

然后，在首页找到`产品`>`存储`>`对象存储`，点击对象存储

![e1f7a06062861e69e01f566b42a0e881](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201024840.png)

然后，进入到对象存储页面，点击立即使用

![773f9300616acac559f56dc21a501ab1](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201024750.png)

然后，进入到对象存储的控制台，如果是第一次使用，这里会显示开通对象存储 COS 服务，点击开通即可

开通成功后，点击图中的**创建存储桶**

![7db249afb925f237623fd6ed244849be](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201025836.png)

然后进入到存储桶列表页面，在该界面再次点击创建存储桶

![d24651705092a84f2bb969df3e7cc6a3](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201025115.png)

然后，对存储桶进行以下设置

![8acb96eee488e88e7cbe603f1f706e8a](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201026738.png)

![70167898672199675264104c50c28532](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201026714.png)

创建成功后，会进入到刚刚创建的存储桶的文件列表中，即我们存放文件的地方，在这里我们可以新建文件夹来存储相关类型的文件，便于管理；这儿我们新建一个名为**images**的文件夹，表示存放图片

![28a26dac35f59c02416562f5dd8c198b](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201027898.png)

点击图中上方的返回桶列表，然后在左侧菜单栏找到密钥管理，点击**访问密钥**

![6c077c2dc65d5b16a2ccb937e4bda185](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201027206.png)

点击访问密钥后，进入到以下界面，在高风险提示中，如果不会子账号的相关操作，点击**继续使用**主账号也行

![303e8bfe1b505618bd9b992b7626d1f6](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201028391.png)

然后，点击**新建密钥**

![40189d4a366ffa294f92cc934cd84dcf](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201028884.png)

新建密钥成功后，我们就得到了需要的**AAPID**、**SecretId**和**SecretKey**的值

然后，返回到存储桶列表，点击刚刚创建的存储桶

然后在这个存储桶的概览中找到基本信息，获取到**存储桶名称**、**所属地域**

![3ca05c91919d48fb41b868d2e07a7355](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201028516.png)

### 2.设置 PicGo

打开 PicGo，点击 PicGo 设置，根据个人需要进行一些简单设置，也可以和我设置一样

![30bc3c97686a30d6f73e659c39cf14a8](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201029857.png)

点击**图床设置**>**腾讯云 COS**将上方我们获取到的**SecretId、SecretKey、APPID、存储空间名**、**存储区域(地域)**分别填入下方

由于刚刚我们在存储桶的文件列表新建了一个**images**文件夹来存放图片，那么在下方的存储路径我们就需要指定相应文件夹

然后点击确定，并设为默认图床

![bcc207be1f9c9cc6db169c4ad6039303](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201030502.png)

### 3.验证是否成功

在 Typora 中，仍是`偏好设置`>`图像`，点击验证图片上传

![47aef84b9d8179b8d6e9f00ea6d794b2](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201031993.png)

如果出现以下提示即代表搭建图床成功

![298f3f5318d70b70c1d7cd2c1b0aa69b](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201031986.png)

然后我们就可以在创建的存储桶中查看已上传的图片了

注：这种方式搭建的图床有一个弊端：如果我们在 PicGo 中删除一张不需要的图片后，对象存储中对应的这张图片不会同步删除，而是需要我们去到对象存储控制台手动删除才行

### 4.Gitee/Github 图床文件转移

**注：如果之前并没未使用过 Gitee/Github 作为图床可忽略**

这里我已**Gitee**图床为例

将所有文件下载下来并解压

![408e947be350bdffea31c5b653fab9ea](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201034018.png)

然后进入创建好的存储桶的文件列表中，进入到**images**文件夹

然后点击**上传文件**

![922f1abc59cd8d26d29380fff50c97cc](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201036114.png)

在窗口中点击**选择文件**，然后选中刚刚下载下来的 Gitee 图床中所有图片文件
![8ce7c6657dd5ca957eff5d6baf6c292a](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201036509.png)

选择好所有文件后，点击参数配置

![96dbf242e82ae14ac89bb4c4f074727d](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201037233.png)

设置对象属性，对这些文件进行以下设置（可根据需要自行修改）

![772339fd162d9465d014f5e8bf440210](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201037041.png)

然后点击**上传**等待上传成功即可

![e9ccddb5ee3c995b629c13cb7936c0cb](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201038650.png)

然后，根据刚刚在 Typora 验证图片上传成功后的提示可以知道我们刚刚搭建的对象存储的 url 地址，比如，上传成功后的 url 地址为<https://xxxx.myqcloud.com/images/202204041817436.png，我们只需复制https://xxxx.myqcloud.com/images/这一部分>

同时，我们也可以通过查看存储桶的域名信息知道存储桶的访问域名`https://xxxx.myqcloud.com/`

![ed472625129ea929eb0f112fc5006ad7](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201040814.png)

然后，打开我们需要更改图片地址的文章，复制之前 Gitee 图床的`url`地址（同样也只需要复制 xxxx.png 即文件名前面一部分）

然后，按下`Ctrl`+`H`，使用对象存储的 url 地址替换掉 Gitee 图床的 url 地址

![3160b14e853a973d2156025a38dd843c](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201041187.png)

注：因为我们在 PicGo 设置中设置了图片上传使用时间戳重命名，所有图片名称都是没变的，所以我们只需更改 url 路径即可

结语：其实整个过程是很简单的，如果对于对象存储想有更高级的使用，比如给对象存储设置防盗链、存储桶的权限管理、域名与传输管理等，可参考一下腾讯云中的官方文档，仔细研究一下还是很容易看懂的。可能很多人害怕对象存储的费用很高，其实不用担心，费用真的很少，他是默认按量计费，我用了半个月才用了几分钱（可能我请求量之类的比较少），如果存放在对象存储上的文件访问的比较少，可以将它们设置为低频存储之类，费用就会更少

到此，Typora+PicGo+腾讯云 COS 搭建图床和图床文件转移就结束了！有不足之处望指出！😄

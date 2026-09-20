# 我的教材库

这是一个手机优先的静态教材 PDF 网站。

## 文件结构

textbook_library/
├─ index.html
├─ style.css
├─ books.js
├─ app.js
├─ viewer.html
└─ pdfs/
   ├─ sample.pdf
   └─ 你的其他教材.pdf

## 添加教材

1. 把 PDF 放进 `pdfs/` 文件夹。
2. 打开 `books.js`。
3. 按照下面格式增加：

{
  title: "教材名称",
  author: "作者",
  category: "分类",
  course: "课程名",
  file: "pdfs/文件名.pdf",
  cover: "",
  tags: ["关键词1", "关键词2"]
}

注意：最后一条数据后面可以不写逗号。

## 封面

如果你有封面图片，可以建立 `covers/` 文件夹，然后：

cover: "covers/book.jpg"

不填则显示默认书本图标。

## 部署

可直接部署到：
- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel
- 你自己的云服务器

建议 PDF 和网页放在同一个站点下，这样手机预览兼容性最好。

## 版权提醒

请只上传、保存、分发你有权使用的教材或 PDF。

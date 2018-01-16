# RSSReader
这是一款RSS订阅器，它使用 Goole Feed Reader API 将 RSS源转换成我们能够利用的 JSON 对象。它还使用了 Handlebars 模板库和 Jquery。并使用jasmine进行了单元测试。
# How to use
在浏览器中运行index.html即可运行全部代码，
app.js中是处理业务逻辑的代码，
feedreader.js中是单元测试的内容。本着测试驱动开发的原则，在单元测试全部通过的情况下，就表示代码可以正常使用。
以下是代码中全部的测试用例：
### RSS Feeds
保证 allFeeds 变量被定义了而且不是空的。包括了链接字段和名字字段检查。
### The menu
保证菜单元素默认是隐藏的，且当菜单图标被点击的时候菜单会切换可见状态。
### Initial Entries
保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素里面至少有一个 .entry 的元素。
### New Feed Selection
保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
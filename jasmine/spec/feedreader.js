/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有运行的测试。
 */

/* 所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        

        /* 
         * 遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('url not empty', function() {
            var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/; // 检查 URL 格式是否正确的正规表达式
            for(var i=0; i<allFeeds.length; i++) {
                feedTest(allFeeds[i].url);
                expect(allFeeds[i].url).toMatch(regularExpressionUrl);
            }        
        });

        /* 
         * 遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('name not empty', function() {
            for(var i=0; i<allFeeds.length; i++) {
                feedTest(allFeeds[i].name);
            }        
        });
        /* 
         * 检查字段是否为空
         */
        function feedTest(strExp) {
            expect(strExp).toBeDefined();
            expect(strExp).not.toBe('');
        }
    });

    /*  菜单的测试用例 */
    describe('The menu', function() {
        /* 
         * 保证菜单元素默认是隐藏的。
         */
        it('menu is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* 
          * 保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试包含两个 expectation ： 党点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */
        it('menu is changed', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        it('menu is changed again', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    
         
    /*  "Initial Entries" 的测试用例 */
    describe('Initial Entries', function() {
        /*
         * 保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * loadFeed() 函数是异步的所以使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('loadFeed success', function(done) {
            expect($('.feed')).not.toBe('');
            done();
        });
    });
        

    /*  "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function() {
        /*
         * 保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         */
        var mParam = new Array();
        beforeEach(function(done) {
            loadFeed(1, loadFeed(2, done));
        });
        it('loadFeed success', function(done) {
            //将最新加载的两个源的第一个标题取出，用来对比内容是否改变
            mParam[0] = iTitle.pop();
            mParam[1] = iTitle.pop();
            expect(mParam[0] == mParam[1]).toBe(false);
            done();
        });   
    });      
}());

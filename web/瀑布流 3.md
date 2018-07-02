# CSS 瀑布流

CSS3里面提供了一个控制列的属性，`column-width` 表示列的宽度, 而 `column-gap` 表示列与列之间的距离。

1.准备HTML与一些图片

```html
    <div class="container">
            <div>
                <img src="./img/1.jpg">
            </div>
            <div>
                <img src="./img/2.jpg">
            </div>
            <div>
                <img src="./img/3.jpg">
            </div>
             <div>
                <img src="./img/4.jpg">
            </div>
             <div>
                <img src="./img/5.jpg">
            </div>
             <div>
                <img src="./img/6.jpg">
            </div>
            <div>
                <img src="./img/6.jpg">
            </div>
            <div>
                <img src="./img/10.jpg">
            </div>
            <div>
                <img src="./img/8.jpg">
            </div>
            <div>
                <img src="./img/9.jpg">
            </div>
    </div>
```

2. 准备CSS样式

```css
        *{padding: 0;margin: 0;}
        .container{
            column-width: 350px;
            column-gap: 20px;
            padding: 0 20px;
        }

        .container div{
           width: 350px;
           overflow: hidden;
           margin-bottom: 10px;
           box-shadow: 0px 1px 1px 1px rgba(0,0,0,.21);
        }

        div img{
            width: 100%;
        }

        .container div{
            max-width: 100%;
            padding: 10px;
            box-sizing: border-box;
        }
```

代码量可以说非常的少，对于一些品质要求比较高的网站来说，这个方法并不是那么完善，它的排列顺序是上下左右的，可以看到阴影也有问题，不过未来的CSS可能更加强大。


## 使用JS动态计算实现瀑布流

这里我先把实现瀑布流的流程给叙述一遍，增加大家的印象，这样我们就可以有迹可循的写出瀑布流。

无论是什么瀑布流，它们的宽度都是相等，而高度是根据宽度不同，高度自动调整的。

我们为了实现瀑布流居中，可以使用`margin: 0 auto;`，但是使用它的规制必须是宽度固定的，当然我们也可以使用其他布局方法比如`flex`，其实实现一些小功能有很多种方法，而多种方法组合起来，就是解决一个大功能的方法。

那么我们如何知晓它的宽度呢？

屏幕宽度我们是否可以知道呢？ 是的，我们可以通过`document.body.clientWidth`、`document.documentElement.clientWidth`获得它屏幕的宽度。

那么获取一个div盒子的宽度呢？（注意 offsetWidth 是不包括 margin 的），这里我们不给盒子增加任何 margin，而是再添加一层 div 使用 padding 来替代 margin 效果（不加就要自己加上margin，不过自己要通过js获取自己加一下，俩者优劣，仁者仁，智者智）。所以我们这里直接通过 offsetWidth 来拿到div的宽度。

现在我们已知总宽度，和一个盒子的宽度，问我们最多能放多少个盒子，那么这些盒子一起的宽度是多少呢？（没错，这就是一个小学数学应用题）。

假设我们的屏幕宽度为`let clientWith`, 一个盒子的宽度为 `let oneBoxWidth`。 最多能放 ` let canLayBoxNum = Math.floor(clientWidth % oneBoxWidth) `， 此时我们可能还要往下取整，我们可以使用`Math.floor`，有的朋友可能不熟悉`floor`方法，我们可以把`floor`看成`footer`也就是脚，通常脚是在下面的，所以就是往下取整。那么一起的宽度为 `let allBoxWidth = oneBoxWidth * canLayBoxNum`

现在我们解决了我们的第一个小问题，如何居中。

其实这并不是教大家如何写代码，终有一天你写任何代码都没问题，但是解决问题的方法，与按部就班的思考才是精髓，这不仅体现在编程中，还体现在你所有的现实生活中。

从第一个例子，我们现在已经非常清楚瀑布流的特效了，第一行是没有任何问题的，只要我们使用`float:left;` 就可以了，但是第二行开始，它会认为第一行的高度为，第一行里面高度最高的盒子。所以第二行与第一行之间将会有参差不齐的间隙，现在我们的问题就是解决这个现象？让盒子出现在我们想要的位置，我们通常用的方法就是`postion:relative`的父元素，`postion:absolute`的子元素，那么它的 `left` 和 `top`
又应该是多少呢？我们如何知晓呢？

首先我们正常考虑，（此时我建议你在你的心里面构建一个矩阵，或者说棋盘。）把第二行的第一个盒子，放在第一行，第一个盒子的下面，拿到第一行第一个盒子的高度做为下面盒子的 top，left相同即可，但是这样有没有考虑这样一个问题，每一次第一个盒子的高度都是最短的呢？ 要是来个20横行，那不就出现了第一竖列短的要命，其他的长的不像话，这样不好了。

所以我们应该是在上一行高度最小的地方放置下一行的盒子，所以此时我们需要一个数组，来存储每一竖列当前的高度，而这个每竖列当前的高度，恰好可以作为我们当前添加盒子的`top`,而left，我们只需要知道它是在第几列就行了，`第几列 * 盒子的宽度 = left`。每次加上了一个新的盒子，是不是我们要更新当前的列高度啊，直接加上当前加上盒子的高度集合，然后接着找高度最小的列，继续添加盒子。

### 首先准备HTML
我们直接使用 Emmet 插件直接生成, 要不然写30个得累死。

```css
    div#main>(.box>.pic>img[src='./img/$.jpg'])*30
```

接着按下Tab键就行了。

### 再来点好看的样式

```css
    #main{
        position: relative;
    }

    .box{
        float: left;
        padding: 15px 0 0 15px;
    }

    .pic{
        padding: 10px;
        border: 1px solid #ccc;
        box-shadow: 0 0 3px #ccc;
        border-radius: 5px;
    }
```

### JS 开工

首先我们解决居中问题

```js
function init(mainSelector, boxSelector){
    const main = document.querySelector(mainSelector);
    const boxArray = document.querySelectorAll(boxSelector);
    const boxCanLayNumber = Math.floor(document.documentElement.clientWidth / boxArray[0].offsetWidth);
    const mainWidth = boxCanLayNumber * boxArray[0].offsetWidth;
    main.style.cssText = `width:${mainWidth}px;margin:0 auto;`;
}

init('#main', '.box')
```

紧接着我们完善我们的瀑布流逻辑, 修改一些变量和函数名，让其更容易被阅读

```js
function render(mainSelector, boxSelector){
    const main = document.querySelector(mainSelector);
    const boxArray = document.querySelectorAll(boxSelector);
    const oneBoxWidth = boxArray[0].offsetWidth;
    const boxCanLayNumber = Math.floor(document.documentElement.clientWidth / oneBoxWidth);
    const mainWidth = boxCanLayNumber * oneBoxWidth;
    main.style.cssText = `width:${mainWidth}px;margin:0 auto;`;

    let boxHeightArray = [];

    boxArray.forEach((box, index) => { // 遍历计算每一个盒子的left和top，并设置它们。
        if(index < boxCanLayNumber){  // 假如是第一行，那么直接就存储到数组里面
            boxHeightArray[index] = box.offsetHeight;
        }else{
            const minHeightValue = Math.min(...boxHeightArray);  //  找到列里面最小的值。
            const minHeightIndex = boxHeightArray.findIndex((v) => v == minHeightValue); // 当前最小列的索引值  
            box.style.position = 'absolute';
            box.style.left = minHeightIndex * oneBoxWidth + 'px'; // 当minHeightIndex为 0 刚好，left 就为 0；
            // box.style.left = boxArray[minHeightIndex].offsetLeft + 'px'; // 跟每一列第一个的左偏移量相同也可
            box.style.top = minHeightValue + 'px';
            boxHeightArray[minHeightIndex] += box.offsetHeight; // 增加当前列的高度
        }
    });
}

render('#main', '.box')
```

此时，我们假如快速的刷新几次，我们会发现有一些问题，图片发生重叠，出现错误，接下来如何判断我完全是依照我自己的经验来的，我感觉` boxHeightArray[minHeightIndex] += box.offsetHeight` 这一行出现了问题，后来思考了一下，高度的问题，会不会是图片还没有加载完成，就直接计算了，导致高度不准确，所以我们把`render`放到`window.onload`里面去就可以了。


### 通常瀑布流都是无限加载的

我们把剩下的加载逻辑完成。逻辑也是非常的简单，当用户滚动的时候，滚到最后一个元素距离顶部的位置的时候，开始加载图片。

以下是全部代码。

```js
        function render(mainSelector, boxSelector){

            const main = document.querySelector(mainSelector);
            const boxArray = document.querySelectorAll(boxSelector);
            const oneBoxWidth = boxArray[0].offsetWidth;
            const boxCanLayNumber = Math.floor(document.documentElement.clientWidth / oneBoxWidth);
            const mainWidth = boxCanLayNumber * oneBoxWidth;
            main.style.cssText = `width:${mainWidth}px;margin:0 auto;`;

            let boxHeightArray = [];

            boxArray.forEach((box, index) => {
                console.log(boxHeightArray);
                if(index < boxCanLayNumber){  // 假如是第一行，那么直接就存储到数组里面
                    boxHeightArray[index] = box.offsetHeight;
                }else{
                    const minHeightValue = Math.min(...boxHeightArray);  //  找到列里面最小的值。
                    const minHeightIndex = boxHeightArray.findIndex((v) => v == minHeightValue); // 当前最小列的索引值  
                    box.style.position = 'absolute';
                    box.style.left = minHeightIndex * oneBoxWidth + 'px'; // 当minHeightIndex为 0 刚好，left 就为 0；
                    // box.style.left = boxArray[minHeightIndex].offsetLeft + 'px'; // 跟每一列第一个的左偏移量相同也可
                    box.style.top = minHeightValue + 'px';
                    boxHeightArray[minHeightIndex] += box.offsetHeight;
                }
            });


        }

        const arrayLast = (arr) => arr[arr.length - 1]

        function shouldLoad(mainSelector, boxSelector){
            const main = document.querySelector(mainSelector);
            const boxArray = document.querySelectorAll(boxSelector);
            const scrollTop = document.body.scrollTop; // 当前滚动所处的位置
            const clientHeight = document.documentElement.clientHeight; // 一个页面高度，第一屏的高度。
            const lastBoxHeight = arrayLast(boxArray).offsetTop;  // 最后一个元素距离顶部的距离
            return lastBoxHeight < scrollTop + clientHeight;  
            // 当第一屏的高度加上滚动的高度，再减去一个容错的 300 大于最后一个盒字距离顶部的距离的时候
            // scrollTop 是不包括当前可见的部分，所以要加上clientHeight可见部分的高度。
        }

        function loadImg(data, mainSelector){
            const main = document.querySelector(mainSelector);
            data.forEach((img, index) => {
                // 创建 box 、将box假如到main中，创建pic，将pic添加到box中，创建img，将img添加到pic中
                let box = document.createElement('div');
                box.className = 'box';
                main.appendChild(box);
                let pic = document.createElement('div');
                pic.classList.add('pic');
                box.appendChild(pic);
                let imgDom = document.createElement('img');
                imgDom.src = `./img/${img.src}`;
                pic.appendChild(imgDom);
            });
        }


        window.onload = () => {
            render('#main', '.box');

            window.onscroll = () => {
                console.log(shouldLoad('#main', '.box'));
                if(shouldLoad('#main', '.box')){
                    const data = [{src:'31.jpg'},{src:'32.jpg'},{src:'33.jpg'},{src:'34.jpg'},{src:'35.jpg'},{src:'36.jpg'},{src:'37.jpg'}];
                    // data 是模拟的假数据
                    loadImg(data, '#main');
                    render('#main', '.box');
                }
            }
        }
```

因为有一张图比较大，所以我们添加一个css逻辑，固定以下宽度。

```css
        .pic{
            padding: 10px;
            border: 1px solid #ccc;
            box-shadow: 0 0 3px #ccc;
            border-radius: 5px;
            max-width: 100%;
        }

        .pic img{
            width: 287px;
        }
```

好了，大功告成，自己滚一下看看吧。

所有代码例子都在我的 Github 可以找到。
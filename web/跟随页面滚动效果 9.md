跟随页面滚动非常的简单，就是设置元素的`top`值即可，代码量只有20行。


1.准备 HTML

```html
    <div class="roll">

    </div>
```


2.准备css

一定要记得把动画个加上

```css
        body{
            min-height: 4000px;
        }
        .roll{
            position: relative;
            width: 400px;
            height: 200px;
            background: red;

            transition: all .5s;
        }
```


3.js逻辑

这个 `20` 最初始 `roll`距离顶部的距离，具体看你的设置多少。

```js
        const roll = document.querySelector('.roll');
        window.onscroll = (e) => {
            if(document.body.scrollTop > 20 ){
                roll.style.top = (document.body.scrollTop + 20) + 'px';
            }
        }
```
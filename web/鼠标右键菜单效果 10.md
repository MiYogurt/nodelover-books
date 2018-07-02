1.首先准备我们的HTML

```html
 <div class="menu">
        <ul>
            <li>春眠不觉晓，处处闻啼鸟。</li>
            <li>Any
                <ul>
                    <li>lover</li>
                    <li>Gold
                        <ul>
                            <li>Dog</li>
                            <li>Cat</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>华为
                <ul>
                    <li>荣耀</li>
                    <li>青春
                        <ul>
                            <li>荷月</li>
                            <li>池塘</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
```


2.美化一下我们的样式


```css
        *{padding: 0;margin: 0;}

        .menu{
            position: absolute;
            display: none;
        }

        .menu ul{
            list-style: none;
            background: #eee;
        }

        ul ul{
            display: none;
            position: absolute;
        }

        ul li{
            padding-left: 10px;
            padding-right: 20px;
            white-space: nowrap;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            border-bottom: 1px solid #999;
            cursor: pointer;
        }

        li.hasNext::after{
            content: ' > ';
            position: absolute;
            right: 5px;
        }

        li.active > ul{
            display: block;
        }
```


3.JS逻辑

```js
            // mouseout -> inner li mouseover (错误点)  -> outer li mouseover 错误的顺序
            // mouseout -> outer li mouseover -> inner li mouseover 正常顺序
            // inner li mouseover -> outer li mouseover 正常顺序
```

这个你需要注意， 当我们是要冒泡的时候 是第一个事件触发顺序，所以会出错，我们应该使用第二种，或者第三种顺序。 

第二种是使用定时器的逻辑。

第三种就是不使用事件冒泡，使用事件捕获，也就是当前使用的方式。

```js
function setWidth(obj) { // 设置obj的宽度，拿到下面li标签里面最宽的，设置为ul的宽度
            let maxWidth = 0;

            for (i = 0; i < obj.children.length; i++) {
                let oLi = obj.children[i];
                let iWidth = oLi.clientWidth;
                if (iWidth > maxWidth) maxWidth = iWidth;
            }

            for (i = 0; i < obj.children.length; i++) obj.children[i].style.width = maxWidth + "px";
        }

        const liNodeList = document.querySelectorAll('li');

        const menu = document.querySelector('.menu');

        Array.from(liNodeList).forEach( li => {
            const innerUlDom = li.querySelector('ul');
            innerUlDom && li.classList.add('hasNext'); // 当 li 下面有 ul标签的时候，添加一个小箭头的样式

            // let clearTimer, showTimer;
            
            li.addEventListener('mouseover', (e) => {
                if(innerUlDom){
                    // clearTimer && clearTimeout(clearTimer)
                    // showTimer = setTimeout(() => {
                        li.classList.add('active');
                        
                        setWidth(innerUlDom); // 设置当前UL的宽度

                        let top = li.offsetTop; // 当前的top，就为li所在的top值
                        let left = li.offsetWidth; // lef 就是li的宽度

                        innerUlDom.style.left = left + 'px';
                        innerUlDom.style.top = top + 'px';

                        
                    // }, 300);

                }
            }, true); // 阻止冒泡，让逻辑正常

            li.onclick = (e) => {
                e.stopPropagation();
                console.log('你点击了', e.target); // 为每一个li绑定一下事件
                hidden(menu);
            }

            li.onmouseout = () => { // 鼠标移出的时候，隐藏菜单
                // showTimer && clearTimeout(showTimer)
                // clearTimer = setTimeout(() => {
                    li.classList.remove('active'); // 鼠标移开去掉 active 类
                // }, 300);
            }

            // mouseout -> inner li mouseover (错误点)  -> outer li mouseover 错误的顺序
            // mouseout -> outer li mouseover -> inner li mouseover 正常顺序
            // inner li mouseover -> outer li mouseover 正常顺序
        });


        function hidden(target) // 隐藏菜单方法
        {
            target.style.display = 'none';
            target.style.left = '-900px';
            target.style.top = '-900px';
        }


        window.onload = (e) => {
            document.oncontextmenu = (e) => {
                e.preventDefault();

                menu.style.display = 'block'; // 显示出菜单栏

                const uls = document.querySelectorAll('ul');
                setWidth(uls[0]); // 设置 ul 的宽度


                menu.style.left = e.pageX + 'px'; // 让菜单栏显示在鼠标所点的位置
                menu.style.top = e.pageY + 'px';
                return false;
            }

            document.onclick = (e) =>{
                console.log('你取消了菜单'); // 当在其他地方点击的时候，取消显示菜单
                hidden(menu);
            }
        }
```
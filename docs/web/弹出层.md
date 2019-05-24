这一节，我们来制作弹出框，这个组件在非常多的网页中都有用到，其实大多数用到的还是css动画。其实用JS也可以做，但是请记住能CSS写的尽量别用JS写，专业的东西交给专业的做，因为用JS写非常的消耗性能，写的不好就炸了，常见的基本都可以通过css完成。

## 首先准备HTML
（慎重）这个HTML DOM结构 不好做css动画。正确的在后面。

```html
    <div class="testContent" style="height:3000px;">
        <button id="login">show mask</button>
    </div>
    <div id="mask">
        <div class="box">
            <span class="close">x</span>
            <h1>Hello Mask!</h1>
        </div>
    </div>
```

## 准备CSS

```css
        #mask{
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(0,0,0,.7);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all ease-in-out 1s;
        }

        #mask .box{
            width: 800px;
            height: 400px;
            background: #f9f9f9;
            border: 1px solid #f7f7f7;
            border-radius: 5px;
            position: relative;
        }

        #mask .close{
            position: absolute;
            right: 20px;
            top: 20px;
            display: block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            border-radius: 50%;
            color: #ff7878;
            border: 1px solid;
        }

        #mask .box h1{
            text-align: center;
            line-height: 400px;      
            margin: 0;
            color: rgb(185, 185, 185);
            font-size: 80px; 
        }
```

这里我们终于用了flex居中，我只是为了让大家认识到居中有很多种方法，想认识更多，上google搜一下，非常多的人写了类似的文章。

假如按照目前的HTML结构和思路去完善，写是可以写出来，但是想加上动画就不行了，因为在同一个div里面，都是公用一个transition属性。

之所以留下这些错误，是让大家可以试着完善，真正体会下这些坑，我写的时候，也是感觉怀疑人生的。

这里我们换一个DOM结构，把 mask 分离开来。因为我们想在mask里面添加一个动画，还想在box里面添加一个动画，假如2个在一起就会发生重叠。而且`transition`是对`display:none`，变成`display:block`不起动画作用的。我们用`opacity/visibility`代替，之所以不随便用z-index是因为，这会造成一些bug。你可以尝试加上z-index试一试，你会发现当z-index为1的时候，按钮是白色的，其他地方是黑色的，这种体验就非常不好了。

```html
    <div class="testContent" style="height:3000px;">
        <button id="login">show mask</button>
    </div>
    <div id="mask"></div>
    <div id="dialog">
        <div class="box">
            <span class="close">x</span>
            <h1>Hello Mask!</h1>
        </div>
    </div>

```

假如我们尝试把 ` transition: all .7s ;` 加到 `#dialog`里面，会发现动画不起作用了。

```css
    #mask, #dialog{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        visibility: hidden;
    }

    #mask{
        background: rgba(0,0,0,.7);
        opacity: 0;
        transition: all .7s ;
    }

    #dialog{
        justify-content: center;
        align-items: center;
        display: flex;
    }

    #dialog .box{
        width: 800px;
        height: 400px;
        background: #f9f9f9;
        border: 1px solid #f7f7f7;
        border-radius: 5px;
        transition: all .7s ;
        position: relative;
        top: -900px;
    }

    #mask.show{
        opacity: 1;
        visibility: visible;
        
    }

    #dialog.show{
        display: flex;
        visibility: visible;
    }

    #dialog.show .box{
        top: 0px;
    }

    #dialog .close{
        position: absolute;
        right: 20px;
        top: 20px;
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        border-radius: 50%;
        color: #ff7878;
        border: 1px solid;
    }

    #dialog .close:hover{
        color:red;
    }

    #dialog .box h1{
        text-align: center;
        line-height: 400px;      
        margin: 0;
        color: rgb(185, 185, 185);
        font-size: 80px; 
    }
```

JS逻辑其实就是添加类名。

```js
    const loginBtn = document.querySelector('#login');
    const mask = document.querySelector('#mask');
    const closeBtn = document.querySelector('#dialog .close');
    const dialog = document.querySelector('#dialog');

    function close(){
        dialog.classList.remove('show');
        mask.classList.remove('show')
    }

    function open(){
        dialog.classList.add('show');
        mask.classList.add('show')
    }

    loginBtn.addEventListener('click', open);

    closeBtn.onclick = close

    dialog.onclick = (e) => {
        if(e.target.id == 'dialog') close();
    }
```
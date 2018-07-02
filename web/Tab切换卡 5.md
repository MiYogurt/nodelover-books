## CSS :hover 实现 Tab 切换选项卡

这里我们主要使用`:hover`伪类选择器 与 `~` 兄弟选择器 与 `nth-of-type` 选择器实现 Tab 选项卡。

能实现的功能不多，假如能满足需要，使用这个方法是最简单的。

1. 准备一下 HTML

```html
    <div class="tab">
        <span class="top one">1</span>
        <div class="content">
            <h1>Hello Tab</h1>
            <a href="www.baidu.com">baidu.com</a>
        </div>
        <span class="top two">2</span>
        <div class="content">222</div>
        <span class="top three">3</span>
        <div class="content">333</div>
        <span class="top four">4</span>
        <div class="content">4444</div>
    </div>
```

2. 准备css

```css
    .tab{
        width: 800px;
        height: 600px;
        position: relative;
        margin: 0 auto;
        background: #f7f7f7;
    }

    .content:first-of-type{
        display: block;
        z-index: 1;
    }

    .one:hover ~ .content:nth-of-type(1),
    .two:hover ~ .content:nth-of-type(2),
    .three:hover ~ .content:nth-of-type(3),
    .four:hover ~ .content:nth-of-type(4)
    {
        display: block;
        z-index: 9;
        background: #f7f7f7;
    }


    .one ~ .content:nth-of-type(1):hover,
    .two ~ .content:nth-of-type(2):hover,
    .three ~ .content:nth-of-type(3):hover,
    .four ~ .content:nth-of-type(4):hover{
        display: block;
        z-index: 9;
        background: #f7f7f7;
    }


    .top{
        width: 100px;
        height: 30px;
        line-height: 30px;
        display: block;
        text-align: center;
        float: left;
        background: #f5f5f5;
        cursor: pointer;
    }

    .content{
        position: absolute;
        top: 30px;
        left: 0;
        right: 0;
        bottom: 0;
        display: none;
    }
```

## css 借助 input 来实现选项卡

当我们为label，配置了for的时候，只要我们点击 label 就可以选中input。

而选中的input，我们可以通过`:checked`伪类选择器来选中它。

```html
            <input checked id="one" name="tabs" type="radio">
            <label for="one">Tab One</label>

            <input id="two" name="tabs" type="radio" value="Two">
            <label for="two">Tab Two</label>

            <input id="three" name="tabs" type="radio">
            <label for="three">Tab Three</label>
```

大家可以随便新建一个html，试一下上面的代码，然后改掉for，看看点击label还能不能成功。

1. 言归正传，我们开始准备HTML


```html
    <article class="tabs">

        <input checked id="one" name="tabs" type="radio">
        <label for="one">选项卡1</label>

        <input id="two" name="tabs" type="radio" value="Two">
        <label for="two">选项卡2</label>

        <input id="three" name="tabs" type="radio">
        <label for="three">选项卡3</label>

        <input id="four" name="tabs" type="radio">
        <label for="four">选项卡4</label>

        <div class="panels">

            <div class="panel">
                <h2>明月何皎皎</h2>
                <p>明月何皎皎，照我罗床帏。 忧愁不能寐，揽衣起徘徊。 客行虽云乐，不如早旋归。 出户独彷徨，愁思当告谁！ 引领还入房，泪下沾裳衣。
                </p>
            </div>

            <div class="panel">
                <h2>短歌行</h2>
                <p>
                    对酒当歌，人生几何！譬如朝露，去日苦多。 慨当以慷，忧思难忘。何以解忧？唯有杜康。 青青子衿，悠悠我心。但为君故，沉吟至今。 呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。 明明如月，何时可掇？忧从中来，不可断绝。 越陌度阡，枉用相存。契阔谈讌，心念旧恩。(谈讌
                    一作：谈宴) 月明星稀，乌鹊南飞。绕树三匝，何枝可依？ 山不厌高，海不厌深。周公吐哺，天下归心。(海 一作：水)
                </p>
            </div>

            <div class="panel">
                <h2>七哀诗三首·其一</h2>
                <p>
                    西京乱无象，豺虎方遘患。 复弃中国去，委身适荆蛮。 亲戚对我悲，朋友相追攀。 出门无所见，白骨蔽平原。 路有饥妇人，抱子弃草间。 顾闻号泣声，挥涕独不还。 “未知身死处，何能两相完？” 驱马弃之去，不忍听此言。 南登霸陵岸，回首望长安， 悟彼下泉人，喟然伤心肝。
                </p>

            </div>

            <div class="panel">
                <h2>入若耶溪</h2>
                <p>艅艎何泛泛，空水共悠悠。 阴霞生远岫，阳景逐回流。 蝉噪林逾静，鸟鸣山更幽。 此地动归念，长年悲倦游。
                </p>

            </div>

        </div>

    </article>
```


2.准备 CSS 结构

```css
        body {
            font-family: Cambria, Arial;
            background: #555;
        }
        
        .tabs {
            width: 100%;
            max-width: 600px;
            margin: 50px auto;
        }
        
        input {
            opacity: 0;
        }
        
        label {
            cursor: pointer;
            background: #999;
            color: #fff;
            border-radius: 4px 4px 0 0;
            padding: 1.5% 3%;
            float: left;
            margin-right: 2px;
        }
        
        label:hover {
            background: palegreen;
        }
        
        input:checked+label {
            background: palegreen;
            color: blueviolet;
        }
        
        .tabs input:nth-of-type(1):checked~.panels .panel:first-child,
        .tabs input:nth-of-type(2):checked~.panels .panel:nth-child(2),
        .tabs input:nth-of-type(3):checked~.panels .panel:nth-child(3),
        .tabs input:nth-of-type(4):checked~.panels .panel:last-child {
            opacity: 1;
            transition: .9s;
        }
        
        .panels {
            float: left;
            clear: both;
            position: relative;
            width: 100%;
            background: #fff;
            border-radius: 0 10px 10px 10px;
            min-height: 315px;
        }
        
        .panel {
            width: 100%;
            opacity: 0;
            position: absolute;
            background: #fff;
            border-radius: 0 10px 10px 10px;
            padding: 4%;
            box-sizing: border-box;
        }
        
        .panel h2 {
            margin: 0;
        }
```

使用这样的也行，`.tabs input:nth-of-type(1):checked~.panels .panel:nth-of-type(1)`，你应该清楚`of-type`与`child`的区别。其实原理跟第一个差不多，只是多了一个input来记录状态，比`hover`来的更好。


### 使用 JS 实现Tab选项框

1.准备html结构
```html
    <div class="tabs">
        <div class="menus">
            <button class="menu">One</button>
            <button class="menu">Two</button>
            <button class="menu">Three</button>
            <button class="menu">Four</button>
        </div>
        <div class="panels">
            <div class="panel">
                <h1>山有木兮木有枝，心悦君兮君不知。</h1>
            </div>
            <div class="panel">2</div>
            <div class="panel">3</div>
            <div class="panel">4</div>
        </div>
    </div>
```


2.加上css

```css
        *{
            margin: 0;
            padding: 0;
        }
        .tabs{
            width: 680px;
            padding: 5px;
            margin: 50px auto;
        }

        .menus{
            height: 40px;
            width: 100%;
        }

        .menu{
            height: 40px;
            line-height: 40px;
            width: 120px;
            border: none;
            outline: none;
            margin-right: -5px;
            border-radius: 5px 5px 0 0;
        }

        .menu.checked{
            background: #F7A3A3;
        }

        .panels{
            background: buttonface;
            min-height: 315px;
            border-radius: 0 10px 10px 10px;
            position: relative;
        }
        
        .panel{
            width: 100%;
            opacity: 0;
            transition: .7s;
            position: absolute;
        }

        .panel.show{
            opacity: 1;
        }
```


3.JS添加 css class 逻辑。

这里我们需要通过`Array.from`将 NodeList 转化为 Array 类型。

```js
        function init(){
            let panels = Array.from(document.querySelectorAll('.panel'));
            let menus = Array.from(document.querySelectorAll('.menu'));

            showTab(panels, menus, 0); // 显示第一页

            menus.forEach((menu, index) => {
                menu.onclick = () => {
                    clearCSS(panels, menus); // 清楚所有css
                    showTab(panels, menus, index);
                }
            });
        }

        // 清楚所有再显示的 css class
        function clearCSS(panels, menus){
            menus.forEach((p) => p.classList.remove('checked'));
            panels.forEach((p) => p.classList.remove('show'));
        }

        function showTab(panels, menus, index){
            panels[index].classList.add('show');
            menus[index].classList.add('checked')
        }

        init();
```
function ribbon() {
    var Stats = function() {
        var e = Date.now(),
            t = e,
            n = 0,
            i = 1 / 0,
            a = 0,
            d = 0,
            l = 1 / 0,
            o = 0,
            s = 0,
            r = 0,
            c = document.createElement("div");
        c.id = "stats",
            c.addEventListener("mousedown",
                function(e) {
                    e.preventDefault(),
                        g(++r % 2)
                },
                !1),
            c.style.cssText = "width:80px;opacity:0.9;cursor:pointer";
        var p = document.createElement("div");
        p.id = "fps",
            p.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002",
            c.appendChild(p);
        var h = document.createElement("div");
        h.id = "fpsText",
            h.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",
            h.innerHTML = "FPS",
            p.appendChild(h);
        var f = document.createElement("div");
        for (f.id = "fpsGraph", f.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff", p.appendChild(f); 74 > f.children.length;)(v = document.createElement("span")).style.cssText = "width:1px;height:30px;float:left;background-color:#113",
            f.appendChild(v);
        var x = document.createElement("div");
        x.id = "ms",
            x.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",
            c.appendChild(x);
        var m = document.createElement("div");
        m.id = "msText",
            m.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",
            m.innerHTML = "MS",
            x.appendChild(m);
        var u = document.createElement("div");
        for (u.id = "msGraph", u.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0", x.appendChild(u); 74 > u.children.length;) {
            var v = document.createElement("span");
            v.style.cssText = "width:1px;height:30px;float:left;background-color:#131",
                u.appendChild(v)
        }
        var g = function(e) {
                switch (r = e) {
                    case 0:
                        p.style.display = "block",
                            x.style.display = "none";
                        break;
                    case 1:
                        p.style.display = "none",
                            x.style.display = "block"
                }
            },
            y = function(e, t) {
                e.appendChild(e.firstChild).style.height = t + "px"
            };
        return {
            REVISION: 11,
            domElement: c,
            setMode: g,
            begin: function() {
                e = Date.now()
            },
            end: function() {
                var r = Date.now();
                return n = r - e,
                    i = Math.min(i, n),
                    a = Math.max(a, n),
                    m.textContent = n + " MS (" + i + "-" + a + ")",
                    y(u, Math.min(30, 30 - n / 200 * 30)),
                    s++,
                r > t + 1e3 && (d = Math.round(1e3 * s / (r - t)), l = Math.min(l, d), o = Math.max(o, d), h.textContent = d + " FPS (" + l + "-" + o + ")", y(f, Math.min(30, 30 - d / 100 * 30)), t = r, s = 0),
                    r
            },
            update: function() {
                e = this.end()
            }
        }
    };


    (function(t) {
        function e(t) {
            this.init(t || {})
        }
        function n(t) {
            this.init(t || {})
        }
        function i(t) {
            document.removeEventListener("mousemove", i),
                document.removeEventListener("touchstart", i),
                document.addEventListener("mousemove", r),
                document.addEventListener("touchmove", r),
                document.addEventListener("touchstart", u),
                r(t),
                a(),
                o()
        }
        function a() {
            w = [];
            for (var t = 0; t < E.trails; t++) w.push(new n({
                spring: .45 + t / E.trails * .025
            }))
        }
        function o() {
            if (f.running) {
                f.globalCompositeOperation = "source-over",
                    f.fillStyle = "rgba(237,237,239,0)",
                    f.clearRect(0,0,f.canvas.width,f.canvas.height),
                    f.fillRect(0, 0, f.canvas.width, f.canvas.height),
                    // f.globalCompositeOperation = "lighter",
                    f.strokeStyle = "hsla(" + Math.round(l.update()) + ",90%,50%,0.25)",
                    f.lineWidth = 1,
                f.frame % 60 == 0 && console.log(l.update(), Math.round(l.update()), l.phase, l.offset, l.frequency, l.amplitude);
                for (var t, e = 0; e < E.trails; e++)(t = w[e]).update(),
                    t.draw();
                f.frame++,
                    f.stats.update(),
                    requestAnimFrame(o)
            }
        }
        function s() {
            f.canvas.width = t.innerWidth,
                f.canvas.height = t.innerHeight
        }
        function h() {
            f.running || (f.running = !0, o())
        }
        function d() {
            f.running = !1
        }
        function r(t) {
            t.touches ? (x.x = t.touches[0].pageX, x.y = t.touches[0].pageY) : (x.x = t.clientX, x.y = t.clientY),
                t.preventDefault()
        }
        function u(t) {
            1 == t.touches.length && (x.x = t.touches[0].pageX, x.y = t.touches[0].pageY)
        }
        function c(t) {
            switch (t.keyCode) {
                case 32:
                    p()
            }
        }
        function m(t) {
            for (var e, n = document.getElementById(t), i = n.innerHTML.replace("&amp;", "&").split(""), a = "", o = 0, s = i.length; o < s; o++) a += (e = i[o].replace("&", "&amp")).trim() ? '<span class="letter-' + o + '">' + e + "</span>": "&nbsp;";
            n.innerHTML = a,
                setTimeout(function() {
                        n.className = "transition-in"
                    },
                    500 * Math.random() + 500)
        }
        function p() {
            y || ((y = document.createElement("canvas")).width = screen.availWidth, y.height = screen.availHeight, y.ctx = y.getContext("2d"), (v = document.createElement("form")).method = "post", v.input = document.createElement("input"), v.input.type = "hidden", v.input.name = "data", v.appendChild(v.input), document.body.appendChild(v)),
                y.ctx.fillStyle = "rgba(8,5,16)",
                y.ctx.fillRect(0, 0, y.width, y.height),
                y.ctx.drawImage(canvas, Math.round(y.width / 2 - canvas.width / 2), Math.round(y.height / 2 - canvas.height / 2)),
                y.ctx.drawImage(g, Math.round(y.width / 2 - g.width / 4), Math.round(y.height / 2 - g.height / 4), g.width / 2, g.height / 2),
                t.open(y.toDataURL(), "wallpaper", "top=0,left=0,width=" + y.width + ",height=" + y.height)
        }
        var f, l, g, v, y, x = {},
            w = [],
            E = {};
        E.debug = !0,
            E.friction = .5,
            E.trails = 20,
            E.size = 50,
            E.dampening = .25,
            E.tension = .98,
            Math.TWO_PI = 2 * Math.PI,
            e.prototype = function() {
                var t = 0;
                return {
                    init: function(t) {
                        this.phase = t.phase || 0,
                            this.offset = t.offset || 0,
                            this.frequency = t.frequency || .001,
                            this.amplitude = t.amplitude || 1
                    },
                    update: function() {
                        return this.phase += this.frequency,
                            t = this.offset + Math.sin(this.phase) * this.amplitude
                    },
                    value: function() {
                        return t
                    }
                }
            } (),
            n.prototype = function() {
                function t() {
                    this.x = 0,
                        this.y = 0,
                        this.vy = 0,
                        this.vx = 0
                }
                return {
                    init: function(e) {
                        this.spring = e.spring + .1 * Math.random() - .05,
                            this.friction = E.friction + .01 * Math.random() - .005,
                            this.nodes = [];
                        for (var n, i = 0; i < E.size; i++)(n = new t).x = x.x,
                            n.y = x.y,
                            this.nodes.push(n)
                    },
                    update: function() {
                        var t = this.spring,
                            e = this.nodes[0];
                        e.vx += (x.x - e.x) * t,
                            e.vy += (x.y - e.y) * t;
                        for (var n, i = 0,
                                 a = this.nodes.length; i < a; i++) e = this.nodes[i],
                        i > 0 && (n = this.nodes[i - 1], e.vx += (n.x - e.x) * t, e.vy += (n.y - e.y) * t, e.vx += n.vx * E.dampening, e.vy += n.vy * E.dampening),
                            e.vx *= this.friction,
                            e.vy *= this.friction,
                            e.x += e.vx,
                            e.y += e.vy,
                            t *= E.tension
                    },
                    draw: function() {
                        var t, e, n = this.nodes[0].x,
                            i = this.nodes[0].y;
                        f.beginPath(),
                            f.moveTo(n, i);
                        for (var a = 1,
                                 o = this.nodes.length - 2; a < o; a++) t = this.nodes[a],
                            e = this.nodes[a + 1],
                            n = .5 * (t.x + e.x),
                            i = .5 * (t.y + e.y),
                            f.quadraticCurveTo(t.x, t.y, n, i);
                        t = this.nodes[a],
                            e = this.nodes[a + 1],
                            f.quadraticCurveTo(t.x, t.y, e.x, e.y),
                            f.stroke(),
                            f.closePath()
                    }
                }
            } (),
            t.requestAnimFrame = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame ||
                function(e) {
                    t.setTimeout(e, 1e3 / 60)
                },
            (f = document.getElementById("canvas").getContext("2d")).stats = new Stats,
            f.running = !0,
            f.frame = 1,
            l = new e({
                phase: Math.random() * Math.TWO_PI,
                amplitude: 85,
                frequency: .0015,
                offset: 285
            }),
            document.addEventListener("mousemove", i),
            document.addEventListener("touchstart", i),
            document.body.addEventListener("orientationchange", s),
            t.addEventListener("resize", s),
            t.addEventListener("keyup", c),
            t.addEventListener("focus", h),
            t.addEventListener("blur", d),
            s();
    }) (window);
}

ribbon();

window.onload = function() {
    var $body = document.body,
        $mnav = document.getElementById("mnav"), //获取导航三角图标
        $mainMenu = document.getElementById("main-menu"), //手机导航
        $process = document.getElementById('process'), //进度条
        $ajaxImgs = document.querySelectorAll('.img-ajax'), //图片懒加载
        $commentsCounter = document.getElementById('comments-count'),
        $gitcomment = document.getElementById("gitcomment"),
        $backToTop = document.getElementById("back-to-top"),
        $toc = document.getElementById("article-toc"),
        timer = null;

    //设备判断
    var isPC = true;
    (function(designPercent) {
        function params(u, p) {
            var m = new RegExp("(?:&|/?)" + p + "=([^&$]+)").exec(u);
            return m ? m[1] : '';
        }
        if (/iphone|ios|android|ipod/i.test(navigator.userAgent.toLowerCase()) == true && params(location.search, "from") != "mobile") {
            isPC = false;
        }
    })();

    //手机菜单导航
    $mnav.onclick = function() {
        var navOpen = $mainMenu.getAttribute("class");
        if (navOpen.indexOf("in") != '-1') {
            $mainMenu.setAttribute("class", "collapse navbar-collapse");
        } else {
            $mainMenu.setAttribute("class", "collapse navbar-collapse in");
        }
    };

    //首页文章图片懒加载
    function imgsAjax($targetEles) {
        if (!$targetEles) return;
        var _length = $targetEles.length;
        if (_length > 0) {
            var scrollBottom = getScrollTop() + window.innerHeight;
            for (var i = 0; i < _length; i++) {
                (function(index) {
                    var $this = $targetEles[index];
                    var $this_offsetZero = $this.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
                    if (scrollBottom >= $this_offsetZero && $this.getAttribute('data-src') && $this.getAttribute('data-src').length > 0) {
                        if ($this.nodeName.toLowerCase() === 'img') {
                            $this.src = $this.getAttribute('data-src');
                            $this.style.display = 'block';
                        } else {
                            var imgObj = new Image();
                            imgObj.onload = function() {
                                $this.innerHTML = "";
                            };
                            imgObj.src = $this.getAttribute('data-src');
                            $this.style.backgroundImage = "url(" + $this.getAttribute('data-src') + ")";
                        }
                        $this.removeAttribute('data-src'); //为了优化，移除
                    }
                })(i);
            }
        }
    }

    //获取滚动高度
    function getScrollTop() {
        return ($body.scrollTop || document.documentElement.scrollTop);
    }
    //滚动回调
    var scrollCallback = function() {
        if ($process) {
            $process.style.width = (getScrollTop() / ($body.scrollHeight - window.innerHeight)) * 100 + "%";
        }
        (isPC && getScrollTop() >= 300) ? $backToTop.removeAttribute("class", "hide"): $backToTop.setAttribute("class", "hide");
        imgsAjax($ajaxImgs);
    };
    scrollCallback();

    //监听滚动事件
    window.addEventListener('scroll', function() {
        if ($toc) {
            var top = $toc.offsetTop;
            var left = $toc.offsetLeft;
            var width = $toc.offsetWidth;
            if (getScrollTop() <= top) {
                $toc.style = "";
            } else {
                $toc.style.position = "fixed";
                $toc.style.top = "5px";
                $toc.style.left = left + "px";
                $toc.style.width = width + "px"
            }
        }
        clearTimeout(timer);
        timer = setTimeout(function fn() {
            scrollCallback();
        }, 200);
    });

    //返回顶部
    $backToTop.onclick = function() {
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
            var sTop = getScrollTop();
            if (sTop > 0) {
                $body.scrollTop = document.documentElement.scrollTop = sTop - 50;
                timer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(timer);
            }
        });
    };

};

// 点击效果
+(function() {
    class Circle {
        constructor({ origin, speed, color, angle, context }) {
            this.origin = origin
            this.position = { ...this.origin }
            this.color = color
            this.speed = speed
            this.angle = angle
            this.context = context
            this.renderCount = 0
        }

        draw() {
            this.context.fillStyle = this.color
            this.context.beginPath()
            this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
            this.context.fill()
        }

        move() {
            this.position.x = (Math.sin(this.angle) * this.speed) + this.position.x
            this.position.y = (Math.cos(this.angle) * this.speed) + this.position.y + (this.renderCount * 0.3)
            this.renderCount++
        }
    }

    class Boom {
        constructor ({ origin, context, circleCount = 10, area }) {
            this.origin = origin
            this.context = context
            this.circleCount = circleCount
            this.area = area
            this.stop = false
            this.circles = []
        }

        randomArray(range) {
            const length = range.length
            const randomIndex = Math.floor(length * Math.random())
            return range[randomIndex]
        }

        randomColor() {
            const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
            return '#' + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range)
        }

        randomRange(start, end) {
            return (end - start) * Math.random() + start
        }

        init() {
            for(let i = 0; i < this.circleCount; i++) {
                const circle = new Circle({
                    context: this.context,
                    origin: this.origin,
                    color: this.randomColor(),
                    angle: this.randomRange(Math.PI - 1, Math.PI + 1),
                    speed: this.randomRange(1, 6)
                })
                this.circles.push(circle)
            }
        }

        move() {
            this.circles.forEach((circle, index) => {
                if (circle.position.x > this.area.width || circle.position.y > this.area.height) {
                    return this.circles.splice(index, 1)
                }
                circle.move()
            })
            if (this.circles.length == 0) {
                this.stop = true
            }
        }

        draw() {
            this.circles.forEach(circle => circle.draw())
        }
    }

    class CursorSpecialEffects {
        constructor() {
            this.computerCanvas = document.createElement('canvas')
            this.renderCanvas = document.createElement('canvas')

            this.computerContext = this.computerCanvas.getContext('2d')
            this.renderContext = this.renderCanvas.getContext('2d')

            this.globalWidth = window.innerWidth
            this.globalHeight = window.innerHeight

            this.booms = []
            this.running = false
        }

        handleMouseDown(e) {
            const boom = new Boom({
                origin: { x: e.clientX, y: e.clientY },
                context: this.computerContext,
                area: {
                    width: this.globalWidth,
                    height: this.globalHeight
                }
            })
            boom.init()
            this.booms.push(boom)
            this.running || this.run()
        }

        handlePageHide() {
            this.booms = []
            this.running = false
        }

        init() {
            const style = this.renderCanvas.style
            style.position = 'fixed'
            style.top = style.left = 0
            style.zIndex = '999999999999999999999999999999999999999999'
            style.pointerEvents = 'none'

            style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
            style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight

            document.body.append(this.renderCanvas)

            window.addEventListener('mousedown', this.handleMouseDown.bind(this))
            window.addEventListener('pagehide', this.handlePageHide.bind(this))
        }

        run() {
            this.running = true
            if (this.booms.length == 0) {
                return this.running = false
            }

            requestAnimationFrame(this.run.bind(this))

            this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
            this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

            this.booms.forEach((boom, index) => {
                if (boom.stop) {
                    return this.booms.splice(index, 1)
                }
                boom.move()
                boom.draw()
            })
            this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
        }
    }

    const cursorSpecialEffects = new CursorSpecialEffects()
    cursorSpecialEffects.init()
})();

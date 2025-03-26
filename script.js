document.addEventListener('DOMContentLoaded', function() {
    // 状态控制变量
    let isInteracting = false;
    let transitionTimeout = null;

    // 获取DOM元素
    const cat = document.getElementById('cat');
    const sleepSign = document.getElementById('sleepSign');
    const windowImg = document.getElementById('window');
    const enterButton = document.getElementById('enterButton');

    // 图片资源
    const IMAGES = {
        window: {
            close: 'images/windowclose.PNG',
            open: 'images/windowopen.PNG'
        },
        cat: {
            sleep: 'images/catsleep.GIF',
            wakeup: 'images/catwakeup.GIF',
            back: 'images/catback.PNG'
        }
    };

    // 初始化
    function init() {
        resetToDefaultState();
        setupEventListeners();
    }

    function resetToDefaultState() {
        windowImg.src = IMAGES.window.close;
        cat.src = IMAGES.cat.sleep;
        enterButton.style.display = 'none';
        sleepSign.style.opacity = '0';
        isInteracting = false;
    }

    function setupEventListeners() {
        // 使用事件委托减少闪烁
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        
        enterButton.addEventListener('click', handleEnterClick);
    }

    function handleMouseOver(e) {
        if (isInteracting) return;
        
        // 检查是否悬停在窗户上
        if (e.target === windowImg || e.target === enterButton) {
            openWindow();
        }
        
        // 检查是否悬停在猫上
        if (e.target === cat && !isInteracting) {
            sleepSign.style.opacity = '1';
        }
    }

    function handleMouseOut(e) {
        // 检查是否从窗户移开
        if ((e.target === windowImg || e.target === enterButton) && isInteracting) {
            closeWindow();
        }
        
        // 检查是否从猫移开
        if (e.target === cat) {
            sleepSign.style.opacity = '0';
        }
    }

    function openWindow() {
        if (isInteracting) return;
        
        isInteracting = true;
        clearTimeout(transitionTimeout);
        
        // 立即切换窗户状态
        windowImg.src = IMAGES.window.open;
        enterButton.style.display = 'block';
        
        // 处理猫动画
        cat.src = IMAGES.cat.wakeup;
        transitionTimeout = setTimeout(() => {
            cat.src = IMAGES.cat.back;
        }, 1000); // 匹配GIF动画时长
    }

    function closeWindow() {
        clearTimeout(transitionTimeout);
        
        // 立即恢复窗户状态
        windowImg.src = IMAGES.window.close;
        enterButton.style.display = 'none';
        
        // 恢复猫状态
        cat.src = IMAGES.cat.sleep;
        isInteracting = false;
    }

    function handleEnterClick(e) {
        e.preventDefault();
        
        // 猫跳入动画
        cat.style.transition = 'all 0.8s ease';
        cat.style.transform = 'translate(-300px, -200px) scale(0.5)';
        
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 800);
    }

    // 初始化
    init();
});


document.addEventListener('DOMContentLoaded', function() {
    // 确保所有物品都有悬停效果
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        // 鼠标进入显示标签
        item.addEventListener('mouseenter', function() {
            const label = this.querySelector('.label');
            label.style.opacity = '1';
        });
        
        // 鼠标离开隐藏标签
        item.addEventListener('mouseleave', function() {
            const label = this.querySelector('.label');
            label.style.opacity = '0';
        });
        
        // 点击动画
        item.addEventListener('click', function(e) {
            if(e.target.classList.contains('item-link')) return;
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
});



function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    document.body.appendChild(flower);

    // 让花朵在屏幕的随机位置生成
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.top = "-10vh"; // 从屏幕外开始
    flower.style.animationDuration = Math.random() * 3 + 3 + "s"; // 3~6秒随机飘落

    // 🌸 随机花朵大小（60px ~ 100px）
    let size = Math.random() * 40 + 60 + "px";
    flower.style.width = size;
    flower.style.height = size;

    // 3秒后删除花朵，避免页面太多花瓣
    setTimeout(() => {
        flower.remove();
    }, 6000);
}

// **每500ms 生成一朵花**
setInterval(createFlower, 500);



document.addEventListener("DOMContentLoaded", function() {
    // 获取所有周按钮和内容区域
    const weekButtons = document.querySelectorAll('.week-btn');
    const weekContents = document.querySelectorAll('.week-content');
    const defaultContent = document.getElementById('default-content');
    
    // 初始隐藏所有内容，显示默认内容
    weekContents.forEach(content => {
        content.style.display = 'none';
    });
    defaultContent.style.display = 'block';
    
    // 为每个按钮添加点击事件
    weekButtons.forEach(button => {
        button.addEventListener('click', function() {
            const week = this.getAttribute('data-week');
            
            // 移除所有按钮的active类
            weekButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 给当前按钮添加active类
            this.classList.add('active');
            
            // 隐藏所有内容
            weekContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // 隐藏默认内容
            defaultContent.style.display = 'none';
            
            // 显示选中的周内容
            document.getElementById(`${week}-content`).style.display = 'block';
            
            // 滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // 默认选中第一周
    weekButtons[0].click();
});

document.addEventListener("DOMContentLoaded", function() {
    // Hide all week contents initially
    document.querySelectorAll('.week-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show week1 by default
    document.getElementById('week1-content').style.display = 'block';
    
    // Week navigation button clicks
    document.querySelectorAll('.week-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Hide all week contents
            document.querySelectorAll('.week-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected week
            const weekToShow = this.getAttribute('data-week');
            document.getElementById(`${weekToShow}-content`).style.display = 'block';
            
            // Update active button style
            document.querySelectorAll('.week-btn').forEach(btn => {
                btn.style.backgroundColor = '#ff69b4';
                btn.style.color = 'white';
            });
            this.style.backgroundColor = 'white';
            this.style.color = '#ff69b4';
        });
    });
});

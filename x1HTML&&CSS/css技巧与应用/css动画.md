# 动画

## animation

animation 由以下属性构成：
1animation-name 
2animation-duration 
3animation-timing-function 
4animation-delay 
5animation-iteration-count 
6animation-direction;

默认值：animation: none 0 ease 0 1 normal;

``` css
@keyframs Fade {
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@keyframs Fade {
    0% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}
```

动画效果的两种方式：1.过渡2动画

animate动画填充模式backward可以解决延迟播放开始前元素直接展示静态状态。

解决动画中的意外震动backface-visibility:hidden;

## transition

谁做属性变化就放在谁上面。

transition 属性设置元素当过渡效果，它是一个速记属性，四个简写属性为：
- transition-property
- transition-duration
- transition-timing-function
- transition-delay

默认值：all 0 ease 0

如果要延迟，需要写上timing函数。

# css动画库

hover.css，针对hover的动画库

animate.css

magic.css3

csshake：模仿窗口震动

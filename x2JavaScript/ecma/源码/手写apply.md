和手写call十分相似，建议先了解手写call

## apply的描述

1、是函数的公有方法，任何函数都可以调用

2、参数：对象，参数数组

3、函数执行过程中，this指向apply的第一个参数，参数接受apply的传过来的参数数组的元素

4、无参时apply的是window

5、参数是基本类型时包装为对象再apply

6、返回值：函数的返回值

7、没有传入args数组时也不会报错，正常运行。



## apply的实现

1、将apply挂载到Fuction类的显示原型上

 ``` javascript
function myapply(){
    
}
Function.prototype.myapply=myapply;
 ```

2、忽略这段代码的声明位置，立即执行这个挂载过程（不论这段代码在第一行行还是最后一行）

``` javascript
;(function(){
    function myapply(){
        
    }
    Function.prototype.myapply=myapply;
})()
```

3、参数接受与返回值

``` javascript
;(function(){
    function myapply(context,args){
        // 此时执行过程调用apply的函数中的this仍未指向对象
        // 返回值是以this指向window计算得出的，并不准确
        // 此处的return只是临时为了有返回值而存在
        return this();
    }
    Function.prototype.myapply=myapply;
})()
```

4、参数包装

``` javascript
;(function(){
    function myapply(context,args){
        context=context?Object(context):window;

        // 不准确的return
        return this();
    }
    Function.prototype.myapply=myapply;
})()
```

5、改变函数this的指向（通过挂载为obj.f并调用obj.f）

``` javascript
;(function(){
    function myapply(context,args){
        context=context?Object(context):window; 
        context.f=this;
        return context.f(...args)
    }
    Function.prototype.myapply=myapply;
})()
```

6、去掉副作用（去掉挂载的context.f）

``` javascript
;(function(){
    function myapply(context,args){
        context=context?Object(context):window; 
        context.f=this;
        let res=context.f(...args);
        delete context.f;
        return res;
    }
    Function.prototype.myapply=myapply;
})()
```

7、没有传入args的情况

``` javascript
;(function(){
    function myapply(context,args){
        context=context?Object(context):window; 
        context.f=this;
        let res=args?context.f(...args):context.f();
        delete context.f;
        return res;
    }
    Function.prototype.myapply=myapply;
})()
```


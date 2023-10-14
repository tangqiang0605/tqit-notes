[JavaScript Error 类: 异常处理与错误管理 | 编程时光](https://www.coding-time.cn/js/advance/Error%E7%B1%BB.html#%E5%BC%95%E8%A8%80)

Error 类是所有内置错误的基类，其他内置错误类（如 SyntaxError、TypeError 等）都继承自 Error 类。自定义错误也可以继承 (extends) Error 类来实现自定义的错误类型。

常用属性：
name：表示错误的名称，通常为字符串。
message：表示错误的描述信息，通常为字符串。
stack：表示错误发生时的堆栈信息，通常为字符串。只在某些环境下可用。

常用的 API：
Error.prototype.toString ()：返回表示错误的字符串，通常为错误的名称和描述信息的组合。
Error.captureStackTrace ()：用于捕获错误发生时的堆栈信息。
Error. stackTraceLimit：控制堆栈信息的最大限制。

错误在层级没被处理，最终都会抛到顶级，被引擎处理，处理方式就是打印错误和中断执行（出现某些错误时）

## 自定义错误类型
```
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

try {
  throw new CustomError('Something went wrong');
} catch (error) {
  console.error(error.name, error.message);
}
```
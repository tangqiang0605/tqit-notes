实现 JavaScript 的语法降级。

There are three library features that the library uses but IE 11 doesn't support. For these you'll need to load polyfills of some kind.

1. Promise
2. Object. assign
3. ChildNode. remove
You can either manually include code that defines these when they aren't already available, or use a service like polyfill. io to get them...

```
<script src=
  " https://polyfill.io/v3/polyfill.min.js?features=Promise%2CObject.assign%2CElement.prototype.remove"
></script>
```
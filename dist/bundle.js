!function(t){var n={};function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(i,r,function(n){return t[n]}.bind(null,r));return i},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=2)}([function(t,n,e){"use strict";var i,r,o=this&&this.__extends||(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)},function(t,n){function e(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)});Object.defineProperty(n,"__esModule",{value:!0}),function(t){t[t.X=0]="X",t[t.Y=1]="Y"}(r=n.Axis||(n.Axis={}));var s=function(){return function(){}}();n.Drawable=s;var a=function(){function t(){}return t.makeRect=function(t,n,e,i){return new u([{x:t,y:n},{x:t+e,y:n},{x:t+e,y:n+i},{x:t,y:n+i}])},t}();n.Shapes=a;var c=function(t){function n(n,e){var i=t.call(this)||this;return i.img=new Image,i.img.src=n,i.loc=e,i}return o(n,t),n.prototype.draw=function(t){t.drawImage(this.img,this.loc.x,this.loc.y)},n}(s);n.Diagram=c;var u=function(t){function n(n,e){void 0===e&&(e="red");var i=t.call(this)||this;return i.points=n,i.fillColor=e,i}return o(n,t),n.prototype.draw=function(t){if(t.fillStyle=this.fillColor,t.beginPath(),null!=this.points[0]){t.moveTo(this.points[0].x,this.points[0].y);for(var n=0;n<this.points.length-1;n++)null!=this.points[n+1]&&t.lineTo(this.points[n+1].x,this.points[n+1].y);t.fill()}},n.prototype.splitBy=function(t){var e=this,i=this.points.map(function(n){return{x:n.x,y:t.findY(n.x)}}),r=this.points.map(function(n){return{x:t.findX(n.y),y:n.y}}),o=[];i.concat(r).forEach(function(t){e.has(t)&&(f(o,t)||o.push(t))});var s=[];this.points.forEach(function(t){var n=o[0].x>=t.x||o[0].y>=t.y,e=o[1].x>=t.x||o[1].y>=t.y;(n||e)&&s.push(t)});var a=o.concat(s.reverse());return console.log(a),[new n(a)]},n.validPolygon=function(t){},n.prototype.pointsWith=function(t,n){var e=[];return this.points.forEach(function(i){n==(t==r.X?i.x:i.y)&&e.push(i)}),e.sort(function(n,e){return t==r.X?e.y-n.y:e.x-n.x}),e},n.prototype.lineIntersects=function(t){return!0},n.prototype.has=function(t){var n=this.min(r.X)<=t.x&&t.x<=this.max(r.X),e=this.min(r.Y)<=t.y&&t.y<=this.max(r.Y);return n&&e},n.prototype.pointFunc=function(t,n,e){var i=t;return this.points.map(function(t){var o=n==r.X?t.x:t.y;e(i,o)&&(i=o)}),i},n.prototype.max=function(t){return this.pointFunc(0,t,function(t,n){return t<n})},n.prototype.min=function(t){return this.pointFunc(1/0,t,function(t,n){return n<=t})},n.prototype.center=function(){var t=0,n=0,e=this.points.length;return this.points.map(function(e){n+=e.x,t+=e.y}),{x:n/e,y:t/e}},n}(s);n.Polygon=u;var h=function(t){function n(n,e,i){void 0===i&&(i="blue");var r=t.call(this)||this;return r.fillColor=i,r.pos=n,r.radius=e,r}return o(n,t),n.prototype.draw=function(t){t.fillStyle=this.fillColor,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI,!0),t.fill()},n}(s);n.Circle=h;var p=function(t){function n(n,e,i,r){void 0===i&&(i=1),void 0===r&&(r=!1);var o=t.call(this)||this;return o.start=n,o.end=e,o.extend=r,o.lineWidth=i,o}return o(n,t),n.prototype.draw=function(t){t.lineWidth=this.lineWidth,this.extend?(t.beginPath(),t.moveTo(this.findX(0),0),t.lineTo(this.findX(1e3),1e3),t.stroke()):(t.beginPath(),t.moveTo(this.start.x,this.start.y),t.lineTo(this.end.x,this.end.y),t.stroke())},n.prototype.slope=function(){return(this.end.y-this.start.y)/(this.end.x-this.start.x)},n.prototype.findX=function(t){return(t-this.start.y+this.slope()*this.start.x)/this.slope()},n.prototype.findY=function(t){return this.slope()*(t-this.start.x)+this.start.y},n}(s);function f(t,n){for(var e=0;e<t.length;e++)if(t[e].x==n.x&&t[e].y==n.y)return!0;return!1}n.Line=p,n.includes=f},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(3)),i(e(4)),i(e(5)),i(e(0))},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});e(1);var i=e(6);window.addEventListener("DOMContentLoaded",function(){i.graph()})},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(0),r=function(){function t(t,n,e,r,o){var s=this;void 0===r&&(r=!1),void 0===o&&(o=!0),this.canvas=document.createElement("canvas"),this.canvas.setAttribute("width",String(n)),this.canvas.setAttribute("height",String(e)),this.canvas.setAttribute("id","canvas"),document.getElementById(t).appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.objects=[],o?(this.cursorImage=new i.Diagram("cursor.png",{x:0,y:0}),this.addEventListener("mousemove",function(t,n){s.cursorImage.loc={x:n.x-5,y:n.y-4}})):this.cursorImage=null,setInterval(function(){return s.render()},0)}return t.prototype.add=function(t){return this.objects.push(t),this.objects.length-1},t.prototype.addList=function(t){var n=this,e=[];return t.forEach(function(t){e.push(n.add(t))}),e},t.prototype.paintList=function(t){var n=this;t.forEach(function(t){t.draw(n.ctx)})},t.prototype.paint=function(t){t.draw(this.ctx)},t.prototype.render=function(){var t=this;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.objects.forEach(function(n){return n.draw(t.ctx)}),null!=this.cursorImage&&this.cursorImage.draw(this.ctx)},t.prototype.remove=function(t){delete this.objects[t]},t.prototype.removeList=function(t){var n=this;t.forEach(function(t){n.remove(t)})},t.prototype.clear=function(){this.objects=[]},t.prototype.move=function(t,n){this.objects[t]instanceof i.Polygon&&this.objects[t].points.forEach(function(t){t.x+=n.x,t.y+=n.y})},t.prototype.get=function(t){return this.objects[t]},t.prototype.addEventListener=function(t,n){var e=this;this.canvas.addEventListener(t,function(t){var i,r,o,s=(i=e.canvas,r=t,o=i.getBoundingClientRect(),{x:r.clientX-o.left,y:r.clientY-o.top});n(t,s)})},t}();n.MagmaCanvas=r},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(){this.frames=[],this.nRepeat=0,this.loopFrames=[],this.isLooping=!1}return t.prototype.addFrame=function(t,n){this.isLooping?this.loopFrames.push({transCondition:t,action:n}):this.frames.push({transCondition:t,action:n})},t.prototype.start=function(t){var n=this;void 0===t&&(t=0),this.intervalHandler=window.setInterval(function(){0!=n.frames.length?n.frames[0].transCondition()?n.frames.shift():n.frames[0].action():clearInterval(n.intervalHandler)},t)},t.prototype.stop=function(){clearInterval(this.intervalHandler)},t.prototype.startLoop=function(t){this.nRepeat=t,this.isLooping=!0},t.prototype.endLoop=function(){var t=Array(this.nRepeat).fill(this.loopFrames).reduce(function(t,n){return t.concat(n)});this.frames=this.frames.concat(t),this.isLooping=!1},t}();n.Animator=i},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(0),r=function(){function t(t,n){this.width=t,this.height=n,this._gridSpaceIndex=6,this.gridSpaces=function(t){for(var n=[],e=1;e<=t/2;e++)t%e==0&&t/e%2==0&&n.push(e);return n}(this.width).slice(4,-4),this._gridSpace=this.gridSpaces[this._gridSpaceIndex]}return Object.defineProperty(t.prototype,"gridSpace",{get:function(){return this._gridSpace},set:function(t){t!=this._gridSpace&&(this._gridSpace=t,this.mCanvas.removeList(this.shapeHandlers),this.make())},enumerable:!0,configurable:!0}),t.prototype.attach=function(t){var n=this;this.mCanvas=t,this.mCanvas.canvas.addEventListener("wheel",function(t){t.deltaY>0?n.gridSpace!=n.gridSpaces[n.gridSpaces.length-1]&&(n._gridSpaceIndex+=1,n.gridSpace=n.gridSpaces[n._gridSpaceIndex],console.log(n.gridSpace)):n.gridSpace!=n.gridSpaces[0]&&(n._gridSpaceIndex-=1,n.gridSpace=n.gridSpaces[n._gridSpaceIndex])}),this.make()},t.prototype.make=function(){var t=[],n=i.Shapes.makeRect(400,0,400,400);n.fillColor="#E1D2DF",t.push(n);var e=i.Shapes.makeRect(0,0,400,400);e.fillColor="#F7E7EA",t.push(e);var r=i.Shapes.makeRect(0,400,400,400);r.fillColor="#E8F2E2",t.push(r);var o=i.Shapes.makeRect(400,400,400,400);o.fillColor="#F7FBEA",t.push(o);for(var s=this._gridSpace;s<this.width;s+=this._gridSpace)t.push(new i.Line({x:s,y:0},{x:s,y:this.height}));for(s=this._gridSpace;s<this.height;s+=this._gridSpace)t.push(new i.Line({x:0,y:s},{x:this.width,y:s}));t.push(new i.Line({x:400,y:0},{x:400,y:800},3)),t.push(new i.Line({x:0,y:400},{x:800,y:400},3)),this.shapeHandlers=this.mCanvas.addList(t)},t}();n.Grid=r},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(1);n.graph=function(){var t=new i.MagmaCanvas("canvasContainer",800,800,!0);new i.Grid(800,800).attach(t)}}]);
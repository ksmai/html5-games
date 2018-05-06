webpackJsonp([1],{aVsR:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});for(var s=i("WT6e"),o=function(){},r=i("v2mS"),n=i("Y5Yx"),h=i("TToO"),a=i("QFcC"),u=i("ToJw"),p=function(){function t(){this.vertices={},this.edges={}}return t.prototype.addVertex=function(t){if(this.vertices.hasOwnProperty(t.toString()))throw new Error("Vertex already exists: "+t);this.vertices[t.toString()]=!0,this.edges[t.toString()]={}},t.prototype.addEdge=function(t,e){if(t===e)throw new Error("Self loop is not allowed: "+t);if(!this.vertices.hasOwnProperty(t.toString()))throw new Error("Unknown vertex: "+t);if(!this.vertices.hasOwnProperty(e.toString()))throw new Error("Unknown vertex: "+e);if(this.edges[t.toString()].hasOwnProperty(e.toString()))throw new Error("Edge already exists: "+t+" - "+e);if(this.edges[e.toString()].hasOwnProperty(t.toString()))throw new Error("Edge already exists: "+e+" - "+t);this.edges[t.toString()][e.toString()]=!0,this.edges[e.toString()][t.toString()]=!0},t.prototype.getVertices=function(){return this.vertices},t.prototype.getEdges=function(){return this.edges},t.prototype.growTree=function(){var e=new t,i=[],s={},o={},r=Object.keys(this.vertices).length,n=Math.floor(Math.random()*r),h=Object.keys(this.vertices)[n];for(i.push(+h),s[+h]=!0,o[+h]=!0,e.addVertex(+h);i.length;){for(var a=!1,p=Math.random()<.5?0:Math.floor(Math.random()*i.length),c=i[p],l=0,d=Object(u.a)(Object.keys(this.edges[c.toString()]));l<d.length;l++){var f=d[l];if(!o.hasOwnProperty(f.toString())){a=!0,i.push(+f),s[+f]=!0,o[+f]=!0,e.addVertex(+f),e.addEdge(+c,+f);break}}a||(i.splice(p,1),delete s[+c])}return e},t.prototype.search=function(t,e){for(var i,s=[t],o=((i={})[t.toString()]=!0,i);s.length;){for(var r=!1,n=0,h=Object.keys(this.edges[s[s.length-1].toString()]);n<h.length;n++){var a=h[n];if(!o[a.toString()]){s.push(+a),o[a.toString()]=!0,r=!0;break}}if(r){if(s[s.length-1]===e)break}else s.pop()}return s},t.prototype.debug=function(t,e){Object.keys(this.vertices).map(Number).sort();for(var i=[],s=0;s<e;s++){for(var o="",r="",n=0;n<t;n++){var h=s*t+n;o+=0,n<t-1&&this.edges[h.toString()].hasOwnProperty((h+1).toString())?o+="-":o+=" ",s<e-1&&(this.edges[h.toString()].hasOwnProperty((h+t).toString())?r+="| ":r+="  ")}i.push(o,r)}console.log(i.join("\n"))},t}(),c=function(){function t(t,e){this.width=t,this.height=e}return t.prototype.generate=function(t){void 0===t&&(t=this.width);for(var e=new p,i=0;i<this.height;i++)for(var s=0;s<this.width;s++)e.addVertex(i*this.width+s);for(i=0;i<this.height;i++)for(s=0;s<this.width;s++)i<this.height-1&&e.addEdge(i*this.width+s,(i+1)*this.width+s),s<this.width-1&&e.addEdge(i*this.width+s,i*this.width+(s+1));var o,r,n,h,a,u,c,l=e.growTree(),d=0;do{d>10&&(l=e.growTree(),d=0);do{o=(u=this.getRandomPointAtEdge())[0],r=u[1],n=(c=this.getRandomPointAtEdge())[0],h=c[1]}while(Math.abs(o-n)+Math.abs(r-h)<2);a=l.search(r*this.width+o,h*this.width+n),this.shortcut(a),d+=1}while(a.length<t);return a},t.prototype.getRandomPointAtEdge=function(){var t,e;return Math.random()<.5?(t=Math.floor(Math.random()*(this.width-2))+1,e=Math.random()<.5?0:this.height-1):(t=Math.random()<.5?0:this.width-1,e=Math.floor(Math.random()*(this.height-2))+1),[t,e]},t.prototype.shortcut=function(t){for(var e=!0;e;){e=!1;for(var i=0;i<t.length-2;i++){for(var s=Math.floor(t[i]/this.width),o=t[i]%this.width,r=i+2;r<t.length;r++){var n=Math.floor(t[r]/this.width),h=t[r]%this.width;if(Math.abs(s-n)+Math.abs(o-h)<=1){t.splice(i+1,r-i-1),e=!0;break}}if(e)break}}},t}(),l={TOP_LEFT_INNER:48,TOP_RIGHT_INNER:46,BOTTOM_LEFT_INNER:2,BOTTOM_RIGHT_INNER:0,TOP_LEFT_OUTER:3,TOP_RIGHT_OUTER:4,BOTTOM_LEFT_OUTER:26,BOTTOM_RIGHT_OUTER:27,TOP:47,BOTTOM:1,LEFT:25,RIGHT:23,MIDDLE:50,COIN:49,SIDE:24},d=[],f=0;f<4;f++)for(var g=0;g<3;g++){for(var m=69*f+5*g,y={},v=0,w=Object.entries(l);v<w.length;v++){var b=w[v];y[b[0]]=b[1]+m}d.push(y)}var S=function(){function t(t,e,i){this.width=t,this.height=e,this.scene=i}return t.prototype.init=function(t){var e,i=this,s=Math.ceil(this.width/2),o=Math.ceil(this.height/2);e=t||new c(s,o).generate(s+o),this.map=Array(this.height).fill(null).map(function(){return Array(i.width).fill(0)});for(var r=0,n=e;r<n.length;r++){var h=(x=n[r])%s;2*(S=Math.floor(x/s))<this.height&&2*h<this.width&&(this.map[2*S][2*h]=1),2*S+1<this.height&&2*h<this.width&&(this.map[2*S+1][2*h]=1),2*S<this.height&&2*h+1<this.width&&(this.map[2*S][2*h+1]=1),2*S+1<this.height&&2*h+1<this.width&&(this.map[2*S+1][2*h+1]=1)}var a=e[0],u=2*Math.floor(a/s),p=a%s*2;this.startNodes=[],0===p&&this.startNodes.push([p,u],[p,u+1]),p===this.width-2&&this.startNodes.push([p+1,u],[p+1,u+1]),0===u&&this.startNodes.push([p,u],[p+1,u]),u===this.height-2&&this.startNodes.push([p,u+1],[p+1,u+1]);var l=e[e.length-1],d=2*Math.floor(l/s),f=l%s*2;this.endNodes=[],0===f&&this.endNodes.push([f,d],[f,d+1]),f===this.width-2&&this.endNodes.push([f+1,d],[f+1,d+1]),0===d&&this.endNodes.push([f,d],[f+1,d]),d===this.height-2&&this.endNodes.push([f,d+1],[f+1,d+1]);var g=this.getSpawnPoint(),m=g[0],y=g[1];this.path={},this.xyPath=[[m,y]];for(var v=y*this.width+m,w=0,b=e;w<b.length;w++){var S,x=b[w],M=(S=2*Math.floor(x/s)+1)*this.width+(h=x%s*2+1);this.path[v]=M,v=M,this.xyPath.push([h,S])}},t.prototype.create=function(){for(var t=d[Math.floor(Math.random()*d.length)],e=[],i=0;i<this.map.length;i++){for(var s=[],o=0;o<this.map[i].length;o++){var r=void 0;if(this.map[i][o]){var n=this.isTerminalNode(o,i),h=0===o&&!n||o>0&&!this.map[i][o-1],a=o===this.map[i].length-1&&!n||o<this.map[i].length-1&&!this.map[i][o+1];r=0===i&&!n||i>0&&!this.map[i-1][o]?h?t.TOP_LEFT_OUTER:a?t.TOP_RIGHT_OUTER:t.TOP:i===this.map.length-1&&!n||i<this.map.length-1&&!this.map[i+1][o]?h?t.BOTTOM_LEFT_OUTER:a?t.BOTTOM_RIGHT_OUTER:t.BOTTOM:h?t.LEFT:a?t.RIGHT:o>0&&i>0&&!this.map[i-1][o-1]?t.TOP_LEFT_INNER:o<this.map[i].length-1&&i>0&&!this.map[i-1][o+1]?t.TOP_RIGHT_INNER:o>0&&i<this.map.length-1&&!this.map[i+1][o-1]?t.BOTTOM_LEFT_INNER:o<this.map[i].length-1&&i<this.map.length-1&&!this.map[i+1][o+1]?t.BOTTOM_RIGHT_INNER:t.MIDDLE}else r=t.SIDE;s.push(r)}e.push(s)}var u=this.scene.make.tilemap({data:e,tileWidth:64,tileHeight:64}),p=u.addTilesetImage("spritesheet");u.createStaticLayer(0,p,0,0)},t.prototype.getSpawnPoint=function(){var t=this.startNodes[1],e=t[0],i=t[1];return 0===e?[e-1,i]:e===this.width-1?[e+1,i]:0===i?[e,i-1]:[e,i+1]},t.prototype.getNextPoint=function(t,e){var i=this.path[e*this.width+t];return"number"==typeof i?[i%this.width,Math.floor(i/this.width)]:null},t.prototype.getLastPoint=function(){return this.xyPath[this.xyPath.length-1]},t.prototype.getWholePath=function(){return this.xyPath},t.prototype.isEmptySlot=function(t,e){return!(e<0||t<0||e>this.map.length-1||t>this.map[e].length-1)&&0===this.map[e][t]},t.prototype.fillSlot=function(t,e){this.map[e][t]=2},t.prototype.isTerminalNode=function(t,e){return!!this.startNodes.find(function(i){return i[0]===t&&i[1]===e})||!!this.endNodes.find(function(i){return i[0]===t&&i[1]===e})},t}(),x=i("g5jc"),M=function(t){function e(e,i){var s=t.call(this,e,64*i[0][0],64*i[0][1],"spritesheet")||this;return s.path=i,s.scene.add.existing(s),s.scene.physics.add.existing(s),s.setup(),s}return Object(h.b)(e,t),e.prototype.setup=function(){var t=this;this.setSize(this.boxWidth,this.boxHeight),this.setFrame(this.frameNumber),this.setDepth(64*this.path[0][1]+Math.max(this.boxWidth,this.boxHeight));var e=this.path.slice(1).map(function(e,i){var s=e[0],o=e[1];return{targets:t,duration:64*(Math.abs(t.path[i+1][0]-t.path[i][0])+Math.abs(t.path[i+1][1]-t.path[i][1]))/t.speed*1e3,ease:"Linear",repeat:!1,props:{x:64*s,y:64*o,depth:64*o+Math.max(t.boxWidth,t.boxHeight)},onStart:function(){var e,r=t.path[i],n=r[0],h=r[1];s>n?(e=0,t.setSize(t.boxWidth,t.boxHeight)):s<n?(e=Math.PI,t.setSize(t.boxWidth,t.boxHeight)):o>h?(e=Math.PI/2,t.setSize(t.boxHeight,t.boxWidth)):(e=3*Math.PI/2,t.setSize(t.boxHeight,t.boxWidth)),t.setRotation(e)}}});this.moveTimeline=this.scene.tweens.timeline({tweens:e})},e.prototype.getDamage=function(){return this.damage},e.prototype.getCoins=function(){return this.coins},e.prototype.getScore=function(){return this.score},e.prototype.cleanup=function(){this.moveTimeline.destroy(),this.resetTintEvent&&this.resetTintEvent.destroy()},e.prototype.onDamage=function(t){var e=this;this.hp-=t,this.hp<=0?this.scene.events.emit("enemyDestroyed",this):(this.setTint(16711680),this.resetTintEvent&&this.resetTintEvent.destroy(),this.resetTintEvent=this.scene.time.delayedCall(200,function(){e.setTint(16777215)},null,this))},e.prototype.onDestroy=function(t){this.cleanup(),this.destroy(),t&&t.remove(this,!0,!0)},e}(a.Physics.Arcade.Sprite),O=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=96,this.hp=200,this.damage=16,this.boxWidth=20,this.boxHeight=25,this.frameNumber=245,this.coins=100,this.score=100,t.prototype.setup.call(this)},e}(M),T=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=96,this.hp=200,this.damage=16,this.boxWidth=16,this.boxHeight=26,this.frameNumber=246,this.coins=100,this.score=100,t.prototype.setup.call(this)},e}(M),E=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=96,this.hp=200,this.damage=16,this.boxWidth=16,this.boxHeight=26,this.frameNumber=247,this.coins=100,this.score=100,t.prototype.setup.call(this)},e}(M),j=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=96,this.hp=200,this.damage=16,this.boxWidth=16,this.boxHeight=26,this.frameNumber=248,this.coins=100,this.score=100,t.prototype.setup.call(this)},e}(M),P=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=64,this.hp=1e3,this.damage=48,this.boxWidth=52,this.boxHeight=36,this.frameNumber=268,this.coins=100,this.score=500,t.prototype.setup.call(this)},e}(M),N=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=64,this.hp=1e3,this.damage=48,this.boxWidth=52,this.boxHeight=36,this.frameNumber=269,this.coins=100,this.score=500,t.prototype.setup.call(this)},e}(M),G=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=192,this.hp=100,this.damage=64,this.boxWidth=43,this.boxHeight=23,this.frameNumber=270,this.coins=100,this.score=1e3,t.prototype.setup.call(this)},e}(M),D=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=192,this.hp=100,this.damage=64,this.boxWidth=43,this.boxHeight=23,this.frameNumber=271,this.coins=100,this.score=1e3,t.prototype.setup.call(this)},e}(M),C=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=96,this.hp=300,this.damage=25,this.boxWidth=47,this.boxHeight=20,this.frameNumber=291,this.coins=100,this.score=200,t.prototype.setup.call(this)},e}(M),R=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.speed=96,this.hp=300,this.damage=25,this.boxWidth=48,this.boxHeight=20,this.frameNumber=292,this.coins=100,this.score=200,t.prototype.setup.call(this)},e}(M),I=function(){function t(e,i){void 0===i&&(i=!1);var s=this;this.level=e,this.numEnemies=0,this.ellapsed=0,this.rate=Math.min(10,Math.sqrt(e+1)),this.maxTime=6e4+1e4*this.level,this.maxEnemies=this.rate*(this.maxTime/1e3+10),i&&(this.maxTime=-1,this.maxEnemies=-1),this.rng=new Phaser.Math.RandomDataGenerator([Date.now().toString()]),this.cumulativeWeights=t.enemyTypes.map(function(t){return t.weight(s.level)});for(var o=this.cumulativeWeights.reduce(function(t,e){return t+e},0),r=0;r<this.cumulativeWeights.length;r++)0===r?this.cumulativeWeights[r]/=o:this.cumulativeWeights[r]=this.cumulativeWeights[r]/o+this.cumulativeWeights[r-1]}return t.prototype.startSpawn=function(){return this.subject=new x.a,this.numEnemies=0,this.ellapsed=0,this.subject.asObservable()},t.prototype.update=function(t){if(this.ellapsed+=t,this.subject){if(this.maxEnemies>0&&this.maxEnemies<=this.numEnemies||this.maxTime>0&&this.ellapsed>=this.maxTime)return this.subject.complete(),void(this.subject=null);var e=this.rate*t/1e3;if(e>1)for(var i=Math.floor(e),s=0;s<i&&(this.maxEnemies<0||this.maxEnemies>this.numEnemies);s++)this.spawn();else this.rng.frac()<e&&this.spawn()}},t.prototype.spawn=function(){var e,i=this.rng.frac();for(e=0;e<this.cumulativeWeights.length&&!(i<this.cumulativeWeights[e]);e++);var s=t.enemyTypes[e].constructors;this.subject.next(s[Phaser.Math.Between(0,s.length-1)]),this.numEnemies+=1},t.enemyTypes=[{type:"minion",constructors:[O,T,E,j],weight:function(t){return Math.max(5,100-10*t)}},{type:"tank",constructors:[P,N],weight:function(t){return Math.min(35,Math.max(0,15*t-5))}},{type:"plane",constructors:[G,D],weight:function(t){return Math.min(20,Math.max(0,10*t-15))}},{type:"cannon",constructors:[C,R],weight:function(t){return Math.min(40,Math.max(0,20*t-40))}}],t}(),_=function(t){function e(e,i,s){var o=t.call(this,e,i,s,"spritesheet")||this;return o.currentCooldown=0,o.target=null,e.add.existing(o),e.physics.add.existing(o),o.setDepth(s),o.setup(),o}return Object(h.b)(e,t),e.prototype.setup=function(){this.setFrame(this.frameNumber),this.setCircle(this.radius,32-this.radius,32-this.radius)},e.prototype.tick=function(t,e){if(this.currentCooldown=Math.max(0,this.currentCooldown-e),this.setFrame(this.currentCooldown<=500?this.frameNumber:this.idleFrameNumber),this.target){var i=this.calculateRotation(this.x,this.y,this.target.x,this.target.y);if(this.setRotation(i),this.currentCooldown<=0){var s=this.createProjectiles(i);this.scene.events.emit("projectilesCreated",s),this.currentCooldown=this.maxCooldown}this.target=null}},e.prototype.getTarget=function(){return this.target},e.prototype.setTarget=function(t){this.target=t},e.prototype.createProjectiles=function(t){return[new this.projectileConstructor(this.scene,this.x,this.y,this.target)]},Object.defineProperty(e.prototype,"frameNumber",{get:function(){return e.frameNumber},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"radius",{get:function(){return e.radius},enumerable:!0,configurable:!0}),e.prototype.calculateRotation=function(t,e,i,s){return s===e?i>t?Math.PI/2:-Math.PI/2:s>e?Math.PI-Math.atan((i-t)/(s-e)):-Math.atan((i-t)/(s-e))},e}(a.Physics.Arcade.Sprite),A=function(t){function e(e,i,s,o){var r=t.call(this,e,i,s,"spritesheet")||this;return r.target=o,e.add.existing(r),e.physics.add.existing(r),r.setDepth(s),r.setup(),r}return Object(h.b)(e,t),e.prototype.setup=function(){this.setFrame(this.frameNumber),this.setCircle(this.size,32-this.size,32-this.size)},e.prototype.tick=function(t,e){var i,s=this.target.x-this.x,o=this.target.y-this.y;i=0===o?s>0?Math.PI/2:-Math.PI/2:o>0?Math.PI-Math.atan(s/o):-Math.atan(s/o);var r=e/1e3*this.speed*Math.sin(i),n=e/1e3*this.speed*-Math.cos(i);this.x+=r,this.y+=n,this.setRotation(i+this.angularOffset),!this.target.active&&Math.sqrt(Math.pow(this.x-this.target.x,2)+Math.pow(this.y-this.target.y,2))<32&&this.scene.events.emit("projectileExploded",this)},e.prototype.getDamage=function(){return this.damage},e.prototype.isAOE=function(){return this.aoe},e.prototype.getAOERadius=function(){return this.aoeRadius},e.prototype.onDestroy=function(t){this.destroy(),t.remove(this,!0,!0)},e}(a.Physics.Arcade.Sprite),k=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.damage=40,this.speed=256,this.aoe=!1,this.size=9,this.frameNumber=295,this.angularOffset=Math.PI,t.prototype.setup.call(this)},e}(A),z=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.damage=40,this.speed=384,this.aoe=!1,this.size=17,this.frameNumber=296,this.angularOffset=Math.PI,t.prototype.setup.call(this)},e}(A),H=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.damage=200,this.speed=448,this.aoe=!0,this.aoeRadius=48,this.size=12,this.frameNumber=251,this.angularOffset=0,t.prototype.setup.call(this)},e}(A),W=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.damage=200,this.speed=448,this.aoe=!0,this.aoeRadius=48,this.size=15,this.frameNumber=252,this.angularOffset=0,t.prototype.setup.call(this)},e}(A),F=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.idleFrameNumber=this.frameNumber,this.maxCooldown=250,this.halfSize=32,this.projectileConstructor=z,t.prototype.setup.call(this)},e.prototype.createProjectiles=function(t){return[new this.projectileConstructor(this.scene,this.x+this.halfSize*Math.sin(t),this.y-this.halfSize*Math.cos(t),this.target)]},Object.defineProperty(e.prototype,"frameNumber",{get:function(){return e.frameNumber},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"radius",{get:function(){return e.radius},enumerable:!0,configurable:!0}),e.radius=128,e.cost=1e3,e.frameNumber=249,e}(_),L=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.idleFrameNumber=this.frameNumber,this.maxCooldown=300,this.currentCooldown=0,this.halfSize=32,this.projectileConstructor=k,t.prototype.setup.call(this)},e.prototype.createProjectiles=function(t){return[new this.projectileConstructor(this.scene,this.x-10+this.halfSize*Math.sin(t),this.y-this.halfSize*Math.cos(t),this.target),new this.projectileConstructor(this.scene,this.x+10+this.halfSize*Math.sin(t),this.y-this.halfSize*Math.cos(t),this.target)]},Object.defineProperty(e.prototype,"frameNumber",{get:function(){return e.frameNumber},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"radius",{get:function(){return e.radius},enumerable:!0,configurable:!0}),e.radius=128,e.cost=2e3,e.frameNumber=250,e}(_),V=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.idleFrameNumber=229,this.maxCooldown=2500,this.halfSize=7,this.projectileConstructor=W,t.prototype.setup.call(this)},e.prototype.createProjectiles=function(t){return[new this.projectileConstructor(this.scene,this.x+this.halfSize*Math.sin(t),this.y-this.halfSize*Math.cos(t),this.target)]},Object.defineProperty(e.prototype,"frameNumber",{get:function(){return e.frameNumber},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"radius",{get:function(){return e.radius},enumerable:!0,configurable:!0}),e.radius=300,e.cost=4e3,e.frameNumber=206,e}(_),B=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(h.b)(e,t),e.prototype.setup=function(){this.idleFrameNumber=228,this.maxCooldown=2500,this.halfSize=4,this.projectileConstructor=H,t.prototype.setup.call(this)},e.prototype.createProjectiles=function(t){return[new this.projectileConstructor(this.scene,this.x-8.5+this.halfSize*Math.sin(t),this.y-this.halfSize*Math.cos(t),this.target),new this.projectileConstructor(this.scene,this.x+8.5+this.halfSize*Math.sin(t),this.y-this.halfSize*Math.cos(t),this.target)]},Object.defineProperty(e.prototype,"frameNumber",{get:function(){return e.frameNumber},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"radius",{get:function(){return e.radius},enumerable:!0,configurable:!0}),e.radius=300,e.cost=8e3,e.frameNumber=205,e}(_),U=function(t){function e(){return t.call(this,{key:"StartScene"})||this}return Object(h.b)(e,t),e.prototype.preload=function(){this.load.spritesheet("spritesheet","assets/tower-defense/tilesheet/tilesheet.png",{frameWidth:64,frameHeight:64}),this.load.atlas("explosion","assets/tower-defense/particles/explosion.png","assets/tower-defense/particles/explosion.json"),this.load.audio("music",["assets/tower-defense/sounds/music.ogg","assets/tower-defense/sounds/music.mp3"],void 0,void 0),this.load.audio("explode",["assets/tower-defense/sounds/explode.wav"],void 0,void 0),this.load.audio("hit",["assets/tower-defense/sounds/hit.wav"],void 0,void 0),this.load.audio("coin",["assets/tower-defense/sounds/coin.wav"],void 0,void 0),this.load.audio("victory",["assets/tower-defense/sounds/victory.wav"],void 0,void 0),this.load.audio("defeat",["assets/tower-defense/sounds/defeat.wav"],void 0,void 0),this.load.audio("disallowed",["assets/tower-defense/sounds/disallowed.wav"],void 0,void 0)},e.prototype.init=function(){this.levelMap=new S(this.sys.canvas.width/64,this.sys.canvas.height/64,this),this.levelMap.init([24,32,33,34,26,27,28,36,37,38,30,31]),this.enemySpawner=new I(0,!0)},e.prototype.create=function(){var t=this;this.cameras.main.fadeIn(1e3,255,255,255),this.towerGroup=this.physics.add.group(),this.enemyGroup=this.physics.add.group(),this.projectileGroup=this.physics.add.group(),this.towerGroup.add(new F(this,160,480)),this.towerGroup.add(new F(this,224,480)),this.towerGroup.add(new F(this,672,480)),this.towerGroup.add(new F(this,736,480)),this.towerGroup.add(new L(this,416,544)),this.towerGroup.add(new L(this,480,544)),this.sound.play("music",{loop:!0,volume:.5}),this.particles=this.add.particles("explosion"),this.particles.createEmitter({frame:["smoke-puff","cloud","smoke-puff"],lifespan:2e3,quantity:6,angle:{min:0,max:359},speed:{min:16,max:32},scale:{start:.5,end:.25},alpha:{start:.8,end:0},on:!1}),this.levelMap.create();var e=this.levelMap.getWholePath(),i=e.slice().reverse();i.unshift([16,7]),this.subscription=this.enemySpawner.startSpawn().subscribe(function(s){var o=new s(t,e),r=new s(t,i);t.enemyGroup.addMultiple([o,r])}),this.physics.add.collider(this.projectileGroup,this.enemyGroup,function(e,i){i.onDamage(e.getDamage()),e.onDestroy(t.projectileGroup)}),this.physics.add.overlap(this.towerGroup,this.enemyGroup,function(t,e){t.getTarget()||t.setTarget(e)}),this.events.on("enemyDestroyed",function(e){t.particles.setDepth(e.y+64),t.particles.emitParticleAt(e.x,e.y,6),e.onDestroy(t.enemyGroup)}),this.events.on("projectilesCreated",function(e){t.projectileGroup.addMultiple(e)}),this.events.on("projectileExploded",function(e){e.onDestroy(t.projectileGroup)});var s=this.add.text(this.sys.canvas.width/2,128,"TOWER DEFENSE");s.setFontSize(96),s.setFontStyle("bold"),s.setOrigin(.5),s.setStroke("#000000",3);var o=this.add.text(this.sys.canvas.width/2,256,"Click to start!");o.setFontSize(48),o.setFontStyle("bold"),o.setOrigin(.5),o.setStroke("#000000",1),this.tweens.add({targets:o,props:{alpha:.4},ease:"Linear",duration:800,yoyo:!0,repeat:-1}),this.input.once("pointerup",function(){t.cameras.main.fadeOut(1e3,255,255,255,function(e,i){i<1||(t.cleanup(),t.scene.stop("StartScene"),t.scene.start("PlayScene",{score:0,coins:1500,level:0}))},t)})},e.prototype.update=function(t,e){this.enemySpawner.update(e),this.towerGroup.getChildren().forEach(function(i){return i.tick(t,e)}),this.projectileGroup.getChildren().forEach(function(i){return i.tick(t,e)})},e.prototype.cleanup=function(){this.tweens.killAll(),this.sound.stopAll(),this.input.removeAllListeners(),this.subscription&&(this.subscription.unsubscribe(),this.subscription=null)},e}(a.Scene),q=function(t){function e(e,i,s){var o=t.call(this,e,i,s,"spritesheet")||this;return o.maxHP=100,o.hp=100,o.frameNumber=134,o.collisionRadius=24,e.add.existing(o),e.physics.add.existing(o),o.setDepth(s+32),o.setFrame(o.frameNumber),o.setCircle(o.collisionRadius,32-o.collisionRadius,32-o.collisionRadius),o.tween=e.tweens.add({targets:o,rotation:2*Math.PI,loop:-1,duration:6e3,ease:"Linear"}),o}return Object(h.b)(e,t),e.prototype.getHit=function(t){this.hp-=t.getDamage(),this.setTint(16711935+65280*this.hp/this.maxHP),this.scene.events.emit("enemyDestroyed",t),this.hp<=0&&(this.scene.events.emit("leafDestroyed"),this.cleanup(),this.destroy())},e.prototype.cleanup=function(){this.tween.stop()},e}(a.Physics.Arcade.Sprite),Y=function(){function t(t){this.scene=t,this.towers=[F,L,V,B],this.margin=24,this.width=48,this.height=48,this.y=8,this.groups=[]}return t.prototype.create=function(){var t=this;this.xStart=(this.scene.sys.canvas.width-this.width*this.towers.length-this.margin*(this.towers.length-1))/2,this.towers.forEach(function(e,i){var s=t.renderButton(t.xStart+(t.width+t.margin)*i,t.y,e);t.groups.push(s)})},t.prototype.handlePointerMove=function(t){for(var e=0;e<this.towers.length;e++){var i=this.towers[e],s=this.xStart+(this.width+this.margin)*e;if(t.x>s&&t.x<s+this.width&&t.y>this.y&&t.y<this.y+this.height)return this.groups[e].getChildren().forEach(function(t){t.setAlpha(.8)}),!0;this.selectedTower!==i&&this.groups[e].getChildren().forEach(function(t){t.setAlpha(.5)})}return!0},t.prototype.handlePointerDown=function(t){for(var e=0;e<this.towers.length;e++){var i=this.towers[e],s=this.xStart+(this.width+this.margin)*e;if(t.x>s&&t.x<s+this.width&&t.y>this.y&&t.y<this.y+this.height)return this.selectedTower=this.selectedTower===i?null:i,!1}return!0},t.prototype.getSelectedTower=function(){return this.selectedTower},t.prototype.renderButton=function(t,e,i){var s=this,o=this.scene.add.graphics();o.fillStyle(16777215),o.lineStyle(5,16777215),o.fillRect(t,e,this.width,this.height),o.strokeRect(t,e,this.width,this.height),o.setDepth(e+this.height),o.setAlpha(.5);var r=this.scene.add.sprite(t+this.width/2,e+16,"spritesheet",i.frameNumber);r.setDepth(e+this.height),r.setAlpha(.5),r.setScale(.5);var n=this.scene.add.group(null,null);return n.addMultiple([o,r]),i.cost.toString().split("").forEach(function(i,o){var r=s.scene.add.sprite(t+8+10*o,e+s.height-8,"spritesheet",+i+276);r.setDepth(e+s.height),r.setAlpha(.5),r.setScale(.4),r.setTint(13685760),n.add(r)}),n},t}(),J=function(t){function e(){return t.call(this,{key:"PlayScene"})||this}return Object(h.b)(e,t),e.prototype.init=function(t){var e=t.coins,i=t.score,s=t.level;this.levelMap=new S(this.sys.canvas.width/64,this.sys.canvas.height/64,this),this.levelMap.init(),this.enemySpawner=new I(s),this.gameover=!1,this.score=i,this.level=s,this.coins=e,this.spawningEnded=!1,this.aoeCircles=[]},e.prototype.preload=function(){this.load.spritesheet("spritesheet","assets/tower-defense/tilesheet/tilesheet.png",{frameWidth:64,frameHeight:64}),this.load.atlas("explosion","assets/tower-defense/particles/explosion.png","assets/tower-defense/particles/explosion.json"),this.load.audio("music",["assets/tower-defense/sounds/music.ogg","assets/tower-defense/sounds/music.mp3"],void 0,void 0),this.load.audio("explode",["assets/tower-defense/sounds/explode.wav"],void 0,void 0),this.load.audio("hit",["assets/tower-defense/sounds/hit.wav"],void 0,void 0),this.load.audio("coin",["assets/tower-defense/sounds/coin.wav"],void 0,void 0),this.load.audio("victory",["assets/tower-defense/sounds/victory.wav"],void 0,void 0),this.load.audio("defeat",["assets/tower-defense/sounds/defeat.wav"],void 0,void 0),this.load.audio("disallowed",["assets/tower-defense/sounds/disallowed.wav"],void 0,void 0)},e.prototype.create=function(){var t=this;this.cameras.main.fadeIn(1e3,255,255,255),this.explodeSound=this.sound.add("explode"),this.particles=this.add.particles("explosion"),this.particles.createEmitter({frame:["smoke-puff","cloud","smoke-puff"],lifespan:2e3,quantity:6,angle:{min:0,max:359},speed:{min:16,max:32},scale:{start:.5,end:.25},alpha:{start:.8,end:0},on:!1}),this.towerShop=new Y(this),this.towerShop.create(),this.towerShadow=this.add.sprite(0,0,"spritesheet"),this.towerShadow.setAlpha(.5),this.towerShadow.setVisible(!1),this.rangeIndicator=this.add.graphics(),this.rangeIndicator.setAlpha(.5),this.rangeIndicator.setVisible(!1),this.statGroup=this.add.group(null,null),this.towerGroup=this.physics.add.group(),this.enemyGroup=this.physics.add.group(),this.projectileGroup=this.physics.add.group(),this.levelMap.create();var e=this.levelMap.getLastPoint();this.holyLeaf=new q(this,64*e[0],64*e[1]),this.updateStatGroup(),this.physics.add.collider(this.holyLeaf,this.enemyGroup,function(e,i){e.getHit(i),t.cameras.main.shake(100,.01)}),this.physics.add.collider(this.projectileGroup,this.enemyGroup,function(e,i){e.isAOE()?(t.aoeCircles.push([new a.Geom.Circle(e.x,e.y,e.getAOERadius()),e.getDamage()]),t.explodeSound.stop(),t.explodeSound.play(),t.particles.emitParticleAt(e.x,e.y,6)):(t.sound.play("hit",{volume:.3}),i.onDamage(e.getDamage())),e.onDestroy(t.projectileGroup)}),this.physics.add.overlap(this.towerGroup,this.enemyGroup,function(t,e){t.getTarget()||t.setTarget(e)}),this.events.once("leafDestroyed",function(){t.holyLeaf=null,t.gameover=!0,t.tweens.killAll(),t.cameras.main.flash(),t.cameras.main.fadeOut(1e3,0,0,0,function(e,i){i<1||(t.onGameover(),t.cameras.main.fadeIn(1e3,0,0,0))},t)}),this.events.on("enemyDestroyed",function(e){t.increaseStats({coins:e.getCoins(),score:e.getScore()}),t.particles.setDepth(e.y+64),t.explodeSound.stop(),t.explodeSound.play(),t.particles.emitParticleAt(e.x,e.y,6),e.onDestroy(t.enemyGroup)}),this.events.on("projectilesCreated",function(e){t.projectileGroup.addMultiple(e)}),this.events.on("projectileExploded",function(e){e.isAOE()&&(t.aoeCircles.push([new a.Geom.Circle(e.x,e.y,e.getAOERadius()),e.getDamage()]),t.explodeSound.stop(),t.explodeSound.play(),t.particles.emitParticleAt(e.x,e.y,6)),e.onDestroy(t.projectileGroup)}),this.input.on("pointermove",function(e){if(!t.towerShop.handlePointerMove(e))return t.towerShadow.setVisible(!1),void t.rangeIndicator.setVisible(!1);var i=t.towerShop.getSelectedTower();if(!i)return t.towerShadow.setVisible(!1),void t.rangeIndicator.setVisible(!1);var s=Math.floor(e.x/64),o=Math.floor(e.y/64);if(!t.levelMap.isEmptySlot(s,o))return t.towerShadow.setVisible(!1),void t.rangeIndicator.setVisible(!1);t.towerShadow.setPosition(64*s+32,64*o+32),t.towerShadow.setDepth(64*o+32),t.towerShadow.setFrame(i.frameNumber),t.towerShadow.setVisible(!0),t.towerShadow.setTint(t.coins<i.cost?16751001:16777215),t.rangeIndicator.clear();var r=new a.Geom.Circle(64*s+32,64*o+32,i.radius);t.rangeIndicator.fillStyle(t.coins<i.cost?16751001:16777215,.5),t.rangeIndicator.fillCircleShape(r),t.rangeIndicator.setDepth(64*o+32),t.rangeIndicator.setVisible(!0)}),this.input.on("pointerdown",function(e){if(t.towerShop.handlePointerDown(e)){var i=t.towerShop.getSelectedTower();if(i)if(t.coins<i.cost)t.sound.play("disallowed",{volume:.5});else{var s=Math.floor(e.x/64),o=Math.floor(e.y/64);if(t.levelMap.isEmptySlot(s,o)){t.increaseStats({coins:-i.cost});var r=new i(t,64*Math.floor(e.x/64)+32,64*Math.floor(e.y/64)+32);t.towerGroup.add(r),t.levelMap.fillSlot(s,o),t.towerShadow.setVisible(!1),t.rangeIndicator.setVisible(!1),t.sound.play("coin",{volume:.5})}}}}),this.time.delayedCall(5e3,function(){t.subscription=t.enemySpawner.startSpawn().subscribe(function(e){var i=new e(t,t.levelMap.getWholePath());t.enemyGroup.add(i)},null,function(){return t.spawningEnded=!0}),t.sound.play("music",{loop:!0,volume:.5})},null,this)},e.prototype.update=function(t,e){var i=this;if(!this.gameover){if(this.spawningEnded&&!this.enemyGroup.getLength())return this.gameover=!0,this.tweens.killAll(),void this.cameras.main.fadeOut(1e3,255,255,255,function(t,e){e<1||(i.onWin(),i.cameras.main.fadeIn(1e3,255,255,255))},this);if(this.enemySpawner.update(e),this.towerGroup.getChildren().forEach(function(i){return i.tick(t,e)}),this.projectileGroup.getChildren().forEach(function(i){return i.tick(t,e)}),this.aoeCircles.length){for(var s=this.enemyGroup.getChildren(),o=function(t){var e=s[t],o=e.body.getBounds({}),n=o.x,h=o.y,u=new a.Geom.Rectangle(n,h,o.right-n,o.bottom-h);r.aoeCircles.forEach(function(t){var s=t[1];e.active&&a.Geom.Intersects.CircleToRectangle(t[0],u)&&(i.sound.play("hit",{volume:.3}),e.onDamage(s))})},r=this,n=s.length-1;n>=0;n--)o(n);this.aoeCircles=[]}}},e.prototype.cleanup=function(){this.sound.stopAll(),this.input.removeAllListeners(),this.subscription&&(this.subscription.unsubscribe(),this.subscription=null)},e.prototype.increaseStats=function(t){var e=void 0===t?{}:t,i=e.coins,s=void 0===i?0:i,o=e.score;this.score+=void 0===o?0:o,this.coins+=s,this.updateStatGroup()},e.prototype.updateStatGroup=function(){var t=this;this.statGroup.clear(!0,!0);var e=16,i=16,s=this.statGroup.create(i,e,"spritesheet",274,!0,!0);s.setScale(.5),s.setAlpha(.8),s.setDepth(80),i+=16,(this.level+1).toString().split("").forEach(function(s){var o=t.statGroup.create(i,e,"spritesheet",+s+276,!0,!0);o.setScale(.5),o.setAlpha(.8),o.setDepth(80),i+=16});var o=this.statGroup.create(i+=16,e,"spritesheet",275,!0,!0);o.setScale(.5),o.setAlpha(.8),o.setDepth(80),i+=16,this.score.toString().split("").forEach(function(s){var o=t.statGroup.create(i,e,"spritesheet",+s+276,!0,!0);o.setScale(.5),o.setAlpha(.8),o.setDepth(80),i+=16}),i=this.sys.canvas.width-16,this.coins.toString().split("").reverse().forEach(function(s){var o=t.statGroup.create(i,e,"spritesheet",+s+276,!0,!0);o.setScale(.5),o.setAlpha(.8),o.setDepth(80),i-=16});var r=this.statGroup.create(i,e,"spritesheet",272,!0,!0);r.setScale(.5),r.setAlpha(.8),r.setDepth(80),i-=16},e.prototype.onWin=function(){var t=this;this.increaseStats({score:5e3*(this.level+1),coins:Math.floor(1e3*Math.sqrt(this.level+1))});var e=this.add.graphics();e.setDepth(this.sys.canvas.height+1e3),e.fillStyle(0,.7),e.fillRect(0,0,this.sys.canvas.width,this.sys.canvas.height);var i=2*this.sys.canvas.width/3,s=2*this.sys.canvas.height/3,o=(this.sys.canvas.height-s)/2;e.fillRect((this.sys.canvas.width-i)/2,o,i,s);var r=this.sys.canvas.width/2,n=this.sys.canvas.height/2,h=this.add.text(r,o+48+64,"LEVEL COMPLETED",{fontSize:48,fontStyle:"bold"});h.setOrigin(.5),h.setDepth(e.depth+1);var a=this.add.text(r,n+96,"Click to continue",{fontSize:48*.7,fontStyle:"bold"});a.setOrigin(.5),a.setDepth(e.depth+1),this.cleanup(),this.tweens.add({targets:a,props:{alpha:.5},ease:"Power",duration:500,yoyo:!0,repeat:-1}),this.sound.play("victory"),this.input.once("pointerup",function(){t.cleanup(),t.cameras.main.fadeOut(1e3,255,255,255,function(e,i){i<1||(t.scene.stop("PlayScene"),t.scene.start("PlayScene",{level:t.level+1,score:t.score,coins:t.coins}))},t)})},e.prototype.onGameover=function(){var t=this,e=this.add.graphics();e.setDepth(this.sys.canvas.height+1e3),e.fillStyle(0,.7),e.fillRect(0,0,this.sys.canvas.width,this.sys.canvas.height);var i=2*this.sys.canvas.width/3,s=2*this.sys.canvas.height/3,o=(this.sys.canvas.height-s)/2;e.fillRect((this.sys.canvas.width-i)/2,o,i,s);var r=this.sys.canvas.width/2,n=this.sys.canvas.height/2,h=this.add.text(r,o+64+16,"GAME OVER",{fontSize:64,fontStyle:"bold"});h.setOrigin(.5),h.setDepth(e.depth+1);var a=n+32,u=this.add.text(r,a,"HIGHSCORE",{fontSize:70.4,fontStyle:"bold"});u.setOrigin(.5),u.setDepth(e.depth+1);var p=this.add.text(r,a+64+16,this.score.toString(),{fontSize:64,fontStyle:"bold"});p.setOrigin(.5),p.setDepth(e.depth+1),this.cleanup(),this.sound.play("defeat"),this.input.once("pointerup",function(){t.cleanup(),t.cameras.main.fadeOut(1e3,255,255,255,function(e,i){i<1||(t.scene.stop("PlayScene"),t.scene.start("StartScene"))},t)})},e}(a.Scene),X=function(){return function(){this.config={title:"Tower Defense",url:"https://ksmai.github.io/html5-games/tower-defense",version:"1.0",pixelArt:!1,antialias:!0,width:1024,height:640,zoom:1,backgroundColor:"#ffffff",scene:[U,J],physics:{default:"arcade",arcade:{gravity:{x:0,y:0},debug:!1}}},this.instructions="Kill all the enemies before they touch the star!"}}(),K=s._2({encapsulation:0,styles:[[""]],data:{}});function Q(t){return s._21(0,[(t()(),s._4(0,0,null,null,1,"game-phaser-game-container",[],null,null,null,r.b,r.a)),s._3(1,4374528,null,0,n.a,[s.k],{config:[0,"config"],title:[1,"title"],instructions:[2,"instructions"]},null),(t()(),s._20(-1,null,["\n"]))],function(t,e){var i=e.component;t(e,1,0,i.config,i.config.title,i.instructions)},null)}var Z=s._0("ng-component",X,function(t){return s._21(0,[(t()(),s._4(0,0,null,null,1,"ng-component",[],null,null,null,Q,K)),s._3(1,49152,null,0,X,[],null,null)],null,null)},{},{},[]),$=i("Xjw4"),tt=i("LdoY"),et=i("bfOx"),it=function(){};i.d(e,"TowerDefenseModuleNgFactory",function(){return st});var st=s._1(o,[],function(t){return s._11([s._12(512,s.j,s.X,[[8,[Z]],[3,s.j],s.w]),s._12(4608,$.k,$.j,[s.t,[2,$.p]]),s._12(512,$.b,$.b,[]),s._12(512,tt.a,tt.a,[]),s._12(512,et.p,et.p,[[2,et.u],[2,et.m]]),s._12(512,it,it,[]),s._12(512,o,o,[]),s._12(1024,et.i,function(){return[[{path:"",component:X}]]},[])])})}});
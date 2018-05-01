webpackJsonp(["tower-defense.module"],{

/***/ "./src/app/tower-defense/tower-defense-game/enemy-spawner.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnemySpawner; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");

var EnemySpawner = /** @class */ (function () {
    function EnemySpawner(options) {
        this.numEnemies = 0;
        this.ellapsed = 0;
        var mergedOptions = Object.assign({}, EnemySpawner.defaultOptions, options || {});
        this.rate = mergedOptions.rate;
        this.maxEnemies = mergedOptions.maxEnemies;
        this.maxTime = mergedOptions.maxTime;
        this.rng = new Phaser.Math.RandomDataGenerator([Date.now().toString()]);
    }
    EnemySpawner.prototype.startSpawn = function () {
        this.subject = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["a" /* Subject */]();
        this.numEnemies = 0;
        this.ellapsed = 0;
        return this.subject.asObservable();
    };
    EnemySpawner.prototype.update = function (dt) {
        this.ellapsed += dt;
        if (this.subject) {
            if (this.maxEnemies > 0 && this.maxEnemies <= this.numEnemies || this.maxTime > 0 && this.ellapsed >= this.maxTime) {
                this.subject.complete();
                this.subject = null;
                return;
            }
            var rate = this.rate * dt / 1000;
            if (rate > 1) {
                var count = Math.floor(rate);
                for (var i = 0; i < count; i++) {
                    if (this.maxEnemies < 0 || this.maxEnemies > this.numEnemies) {
                        this.spawn();
                    }
                    else {
                        break;
                    }
                }
            }
            else if (this.rng.frac() < rate) {
                this.spawn();
            }
        }
    };
    EnemySpawner.prototype.spawn = function () {
        this.subject.next();
        this.numEnemies += 1;
    };
    EnemySpawner.defaultOptions = {
        rate: 1,
        maxEnemies: -1,
        maxTime: -1,
    };
    return EnemySpawner;
}());



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Enemy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__("./node_modules/phaser/src/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(scene, path, frame) {
        var _this = _super.call(this, scene, path[0][0] * 64, path[0][1] * 64, 'spritesheet', frame) || this;
        _this.path = path;
        _this.speed = 64;
        _this.hp = 100;
        _this.scene.add.existing(_this);
        var tweens = path.slice(1).map(function (_a, i) {
            var x = _a[0], y = _a[1];
            return ({
                targets: _this,
                duration: (Math.abs(path[i + 1][0] - path[i][0]) + Math.abs(path[i + 1][1] - path[i][1])) * 64 / _this.speed * 1000,
                ease: 'Linear',
                repeat: false,
                props: {
                    x: x * 64,
                    y: y * 64,
                },
            });
        });
        _this.scene.tweens.timeline({
            tweens: tweens,
        });
        return _this;
    }
    return Enemy;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["GameObjects"].Sprite));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/level-map.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LevelMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__path_generator__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/path-generator.ts");

var TILE_OFFSETS = {
    TOP_LEFT_INNER: 48,
    TOP_RIGHT_INNER: 46,
    BOTTOM_LEFT_INNER: 2,
    BOTTOM_RIGHT_INNER: 0,
    TOP_LEFT_OUTER: 3,
    TOP_RIGHT_OUTER: 4,
    BOTTOM_LEFT_OUTER: 26,
    BOTTOM_RIGHT_OUTER: 27,
    TOP: 47,
    BOTTOM: 1,
    LEFT: 25,
    RIGHT: 23,
    MIDDLE: 50,
    COIN: 49,
    SIDE: 24,
};
var TILES = [];
for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 3; x++) {
        var offset = y * (3 * 23) + x * 5;
        var tiles = {};
        for (var _i = 0, _a = Object.entries(TILE_OFFSETS); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            tiles[key] = value + offset;
        }
        TILES.push(tiles);
    }
}
var LevelMap = /** @class */ (function () {
    function LevelMap(width, height, scene) {
        this.width = width;
        this.height = height;
        this.scene = scene;
    }
    LevelMap.prototype.init = function () {
        var _this = this;
        var pathGeneratorWidth = Math.ceil(this.width / 2);
        var pathGeneratorHeight = Math.ceil(this.height / 2);
        var pathGenerator = new __WEBPACK_IMPORTED_MODULE_0__path_generator__["a" /* PathGenerator */](pathGeneratorWidth, pathGeneratorHeight);
        var path = pathGenerator.generate(pathGeneratorWidth + pathGeneratorHeight);
        this.map = Array(this.height)
            .fill(null)
            .map(function () { return Array(_this.width).fill(0); });
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var node = path_1[_i];
            var y = Math.floor(node / pathGeneratorWidth);
            var x = node % pathGeneratorWidth;
            if (y * 2 < this.height && x * 2 < this.width) {
                this.map[y * 2][x * 2] = 1;
            }
            if (y * 2 + 1 < this.height && x * 2 < this.width) {
                this.map[y * 2 + 1][x * 2] = 1;
            }
            if (y * 2 < this.height && x * 2 + 1 < this.width) {
                this.map[y * 2][x * 2 + 1] = 1;
            }
            if (y * 2 + 1 < this.height && x * 2 + 1 < this.width) {
                this.map[y * 2 + 1][x * 2 + 1] = 1;
            }
        }
        var startNode = path[0];
        var startNodeY = 2 * Math.floor(startNode / pathGeneratorWidth);
        var startNodeX = 2 * (startNode % pathGeneratorWidth);
        this.startNodes = [];
        if (startNodeX === 0) {
            this.startNodes.push([startNodeX, startNodeY], [startNodeX, startNodeY + 1]);
        }
        if (startNodeX === this.width - 2) {
            this.startNodes.push([startNodeX + 1, startNodeY], [startNodeX + 1, startNodeY + 1]);
        }
        if (startNodeY === 0) {
            this.startNodes.push([startNodeX, startNodeY], [startNodeX + 1, startNodeY]);
        }
        if (startNodeY === this.height - 2) {
            this.startNodes.push([startNodeX, startNodeY + 1], [startNodeX + 1, startNodeY + 1]);
        }
        var endNode = path[path.length - 1];
        var endNodeY = 2 * Math.floor(endNode / pathGeneratorWidth);
        var endNodeX = 2 * (endNode % pathGeneratorWidth);
        this.endNodes = [];
        if (endNodeX === 0) {
            this.endNodes.push([endNodeX, endNodeY], [endNodeX, endNodeY + 1]);
        }
        if (endNodeX === this.width - 2) {
            this.endNodes.push([endNodeX + 1, endNodeY], [endNodeX + 1, endNodeY + 1]);
        }
        if (endNodeY === 0) {
            this.endNodes.push([endNodeX, endNodeY], [endNodeX + 1, endNodeY]);
        }
        if (endNodeY === this.height - 2) {
            this.endNodes.push([endNodeX, endNodeY + 1], [endNodeX + 1, endNodeY + 1]);
        }
        var _a = this.getSpawnPoint(), startX = _a[0], startY = _a[1];
        this.path = {};
        this.xyPath = [[startX, startY]];
        var lastPoint = startY * this.width + startX;
        for (var _b = 0, path_2 = path; _b < path_2.length; _b++) {
            var node = path_2[_b];
            var y = Math.floor(node / pathGeneratorWidth) * 2 + 1;
            var x = node % pathGeneratorWidth * 2 + 1;
            var point = y * this.width + x;
            this.path[lastPoint] = point;
            lastPoint = point;
            this.xyPath.push([x, y]);
        }
    };
    LevelMap.prototype.create = function () {
        var tileset = TILES[Math.floor(Math.random() * TILES.length)];
        var data = [];
        for (var y = 0; y < this.map.length; y++) {
            var row = [];
            for (var x = 0; x < this.map[y].length; x++) {
                var currentTile = void 0;
                if (this.map[y][x]) {
                    var isTerminal = this.isTerminalNode(x, y);
                    var isTop = y === 0 && !isTerminal || y > 0 && !this.map[y - 1][x];
                    var isLeft = x === 0 && !isTerminal || x > 0 && !this.map[y][x - 1];
                    var isRight = x === this.map[y].length - 1 && !isTerminal || x < this.map[y].length - 1 && !this.map[y][x + 1];
                    var isBottom = y === this.map.length - 1 && !isTerminal || y < this.map.length - 1 && !this.map[y + 1][x];
                    if (isTop) {
                        if (isLeft) {
                            currentTile = tileset.TOP_LEFT_OUTER;
                        }
                        else if (isRight) {
                            currentTile = tileset.TOP_RIGHT_OUTER;
                        }
                        else {
                            currentTile = tileset.TOP;
                        }
                    }
                    else if (isBottom) {
                        if (isLeft) {
                            currentTile = tileset.BOTTOM_LEFT_OUTER;
                        }
                        else if (isRight) {
                            currentTile = tileset.BOTTOM_RIGHT_OUTER;
                        }
                        else {
                            currentTile = tileset.BOTTOM;
                        }
                    }
                    else if (isLeft) {
                        currentTile = tileset.LEFT;
                    }
                    else if (isRight) {
                        currentTile = tileset.RIGHT;
                    }
                    else {
                        if (x > 0 && y > 0 && !this.map[y - 1][x - 1]) {
                            currentTile = tileset.TOP_LEFT_INNER;
                        }
                        else if (x < this.map[y].length - 1 && y > 0 && !this.map[y - 1][x + 1]) {
                            currentTile = tileset.TOP_RIGHT_INNER;
                        }
                        else if (x > 0 && y < this.map.length - 1 && !this.map[y + 1][x - 1]) {
                            currentTile = tileset.BOTTOM_LEFT_INNER;
                        }
                        else if (x < this.map[y].length - 1 && y < this.map.length - 1 && !this.map[y + 1][x + 1]) {
                            currentTile = tileset.BOTTOM_RIGHT_INNER;
                        }
                        else {
                            currentTile = tileset.MIDDLE;
                        }
                    }
                }
                else {
                    currentTile = tileset.SIDE;
                }
                row.push(currentTile);
            }
            data.push(row);
        }
        var map = this.scene.make.tilemap({
            data: data,
            tileWidth: 64,
            tileHeight: 64,
        });
        var tiles = map.addTilesetImage('spritesheet');
        var layer = map.createStaticLayer(0, tiles, 0, 0);
    };
    LevelMap.prototype.getSpawnPoint = function () {
        var _a = this.startNodes[1], startNodeX = _a[0], startNodeY = _a[1];
        if (startNodeX === 0) {
            return [startNodeX - 1, startNodeY];
        }
        else if (startNodeX === this.width - 1) {
            return [startNodeX + 1, startNodeY];
        }
        else if (startNodeY === 0) {
            return [startNodeX, startNodeY - 1];
        }
        else {
            return [startNodeX, startNodeY + 1];
        }
    };
    LevelMap.prototype.getNextPoint = function (x, y) {
        var point = y * this.width + x;
        var nextPoint = this.path[point];
        if (typeof nextPoint === 'number') {
            return [nextPoint % this.width, Math.floor(nextPoint / this.width)];
        }
        return null;
    };
    LevelMap.prototype.getLastPoint = function () {
        return this.xyPath[this.xyPath.length - 1];
    };
    LevelMap.prototype.getWholePath = function () {
        return this.xyPath;
    };
    LevelMap.prototype.isTerminalNode = function (x, y) {
        var startNode = this.startNodes.find(function (node) { return node[0] === x && node[1] === y; });
        if (startNode) {
            return true;
        }
        var endNode = this.endNodes.find(function (node) { return node[0] === x && node[1] === y; });
        if (endNode) {
            return true;
        }
        return false;
    };
    return LevelMap;
}());



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/path-generator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathGenerator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_graph__ = __webpack_require__("./src/utils/graph.ts");

var PathGenerator = /** @class */ (function () {
    function PathGenerator(width, height) {
        this.width = width;
        this.height = height;
    }
    PathGenerator.prototype.generate = function (minWidth) {
        if (minWidth === void 0) { minWidth = this.width; }
        var graph = new __WEBPACK_IMPORTED_MODULE_0__utils_graph__["a" /* Graph */]();
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                graph.addVertex(y * this.width + x);
            }
        }
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (y < this.height - 1) {
                    graph.addEdge(y * this.width + x, (y + 1) * this.width + x);
                }
                if (x < this.width - 1) {
                    graph.addEdge(y * this.width + x, y * this.width + (x + 1));
                }
            }
        }
        var tree = graph.growTree();
        var startX;
        var startY;
        var endX;
        var endY;
        var path;
        var retryCount = 0;
        do {
            if (retryCount > 10) {
                tree = graph.growTree();
                retryCount = 0;
            }
            do {
                _a = this.getRandomPointAtEdge(), startX = _a[0], startY = _a[1];
                _b = this.getRandomPointAtEdge(), endX = _b[0], endY = _b[1];
            } while (Math.abs(startX - endX) + Math.abs(startY - endY) < 2);
            path = tree.search(startY * this.width + startX, endY * this.width + endX);
            this.shortcut(path);
            retryCount += 1;
        } while (path.length < minWidth);
        return path;
        var _a, _b;
    };
    PathGenerator.prototype.getRandomPointAtEdge = function () {
        var isAtHorizontalEdge = Math.random() < 0.5;
        var x;
        var y;
        if (isAtHorizontalEdge) {
            x = Math.floor(Math.random() * (this.width - 2)) + 1;
            y = Math.random() < 0.5 ? 0 : this.height - 1;
        }
        else {
            x = Math.random() < 0.5 ? 0 : this.width - 1;
            y = Math.floor(Math.random() * (this.height - 2)) + 1;
        }
        return [x, y];
    };
    PathGenerator.prototype.shortcut = function (path) {
        var hasShortcut = true;
        while (hasShortcut) {
            hasShortcut = false;
            for (var i = 0; i < path.length - 2; i++) {
                var y = Math.floor(path[i] / this.width);
                var x = path[i] % this.width;
                for (var j = i + 2; j < path.length; j++) {
                    var y2 = Math.floor(path[j] / this.width);
                    var x2 = path[j] % this.width;
                    if (Math.abs(y - y2) + Math.abs(x - x2) <= 1) {
                        path.splice(i + 1, j - i - 1);
                        hasShortcut = true;
                        break;
                    }
                }
                if (hasShortcut) {
                    break;
                }
            }
        }
    };
    return PathGenerator;
}());



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/play.scene.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayScene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__("./node_modules/phaser/src/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__level_map__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/level-map.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enemy_spawner__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy-spawner.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var PlayScene = /** @class */ (function (_super) {
    __extends(PlayScene, _super);
    function PlayScene() {
        return _super.call(this, { key: 'PlayScene' }) || this;
    }
    PlayScene.prototype.init = function () {
        var mapWidth = this.sys.canvas.width / 64;
        var mapHeight = this.sys.canvas.height / 64;
        this.levelMap = new __WEBPACK_IMPORTED_MODULE_1__level_map__["a" /* LevelMap */](mapWidth, mapHeight, this);
        this.levelMap.init();
        this.enemySpawner = new __WEBPACK_IMPORTED_MODULE_3__enemy_spawner__["a" /* EnemySpawner */]({
            rate: 1,
        });
    };
    PlayScene.prototype.preload = function () {
        this.load.spritesheet('spritesheet', 'assets/tower-defense/tilesheet/tilesheet.png', { frameWidth: 64, frameHeight: 64 });
    };
    PlayScene.prototype.create = function () {
        var _this = this;
        this.levelMap.create();
        this.subscription = this.enemySpawner.startSpawn().subscribe(function () {
            new __WEBPACK_IMPORTED_MODULE_2__enemy__["a" /* Enemy */](_this, _this.levelMap.getWholePath(), 246);
        });
        var _a = this.levelMap.getLastPoint(), lastX = _a[0], lastY = _a[1];
        this.add.sprite(lastX * 64, lastY * 64, 'spritesheet', 134);
        this.input.once('pointerdown', function () { return _this.scene.restart(); });
    };
    PlayScene.prototype.update = function (t, dt) {
        this.enemySpawner.update(dt);
    };
    PlayScene.prototype.destroy = function () {
        this.input.removeAllListeners();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    return PlayScene;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Scene"]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/start.scene.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartScene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__("./node_modules/phaser/src/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        return _super.call(this, { key: 'StartScene' }) || this;
    }
    StartScene.prototype.preload = function () {
    };
    StartScene.prototype.create = function () {
        var _this = this;
        this.add.text(432, 243, 'StartScene').setColor('#ffffff').setOrigin(0.5);
        this.input.once('pointerup', function () {
            _this.scene.start('PlayScene');
        });
    };
    return StartScene;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Scene"]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower-defense-game.component.html":
/***/ (function(module, exports) {

module.exports = "<game-phaser-game-container\n  [config]=\"config\"\n  [title]=\"config.title\"\n  [instructions]=\"instructions\"\n></game-phaser-game-container>\n"

/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower-defense-game.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower-defense-game.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TowerDefenseGameComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__start_scene__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/start.scene.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__play_scene__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/play.scene.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TowerDefenseGameComponent = /** @class */ (function () {
    function TowerDefenseGameComponent() {
        this.config = {
            title: 'Tower Defense',
            url: 'https://ksmai.github.io/html5-games/tower-defense',
            version: '1.0',
            pixelArt: false,
            antialias: true,
            width: 1024,
            height: 640,
            zoom: 1,
            scene: [
                __WEBPACK_IMPORTED_MODULE_1__start_scene__["a" /* StartScene */],
                __WEBPACK_IMPORTED_MODULE_2__play_scene__["a" /* PlayScene */],
            ],
        };
        this.instructions = "Kill all the enemies before they touch the star!";
    }
    TowerDefenseGameComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./src/app/tower-defense/tower-defense-game/tower-defense-game.component.html"),
            styles: [__webpack_require__("./src/app/tower-defense/tower-defense-game/tower-defense-game.component.scss")],
        })
    ], TowerDefenseGameComponent);
    return TowerDefenseGameComponent;
}());



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TowerDefenseRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tower_defense_game_tower_defense_game_component__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower-defense-game.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__tower_defense_game_tower_defense_game_component__["a" /* TowerDefenseGameComponent */] },
];
var TowerDefenseRoutingModule = /** @class */ (function () {
    function TowerDefenseRoutingModule() {
    }
    TowerDefenseRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */],
            ],
        })
    ], TowerDefenseRoutingModule);
    return TowerDefenseRoutingModule;
}());



/***/ }),

/***/ "./src/app/tower-defense/tower-defense.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TowerDefenseModule", function() { return TowerDefenseModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tower_defense_game_tower_defense_game_component__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower-defense-game.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tower_defense_routing_module__ = __webpack_require__("./src/app/tower-defense/tower-defense-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__phaser_game_phaser_game_module__ = __webpack_require__("./src/app/phaser-game/phaser-game.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var TowerDefenseModule = /** @class */ (function () {
    function TowerDefenseModule() {
    }
    TowerDefenseModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__phaser_game_phaser_game_module__["a" /* PhaserGameModule */],
                __WEBPACK_IMPORTED_MODULE_3__tower_defense_routing_module__["a" /* TowerDefenseRoutingModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tower_defense_game_tower_defense_game_component__["a" /* TowerDefenseGameComponent */],
            ],
        })
    ], TowerDefenseModule);
    return TowerDefenseModule;
}());



/***/ }),

/***/ "./src/utils/graph.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Graph; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shuffle__ = __webpack_require__("./src/utils/shuffle.ts");

/**
 * Simple undirected graph with no self loop
 */
var Graph = /** @class */ (function () {
    function Graph() {
        this.vertices = {};
        this.edges = {};
    }
    /**
     * Add a new vertex
     */
    Graph.prototype.addVertex = function (vertex) {
        if (this.vertices.hasOwnProperty(vertex.toString())) {
            throw new Error("Vertex already exists: " + vertex);
        }
        this.vertices[vertex.toString()] = true;
        this.edges[vertex.toString()] = {};
    };
    /**
     * Add a new edge between two existing vertices
     */
    Graph.prototype.addEdge = function (vertex1, vertex2) {
        if (vertex1 === vertex2) {
            throw new Error("Self loop is not allowed: " + vertex1);
        }
        if (!this.vertices.hasOwnProperty(vertex1.toString())) {
            throw new Error("Unknown vertex: " + vertex1);
        }
        if (!this.vertices.hasOwnProperty(vertex2.toString())) {
            throw new Error("Unknown vertex: " + vertex2);
        }
        if (this.edges[vertex1.toString()].hasOwnProperty(vertex2.toString())) {
            throw new Error("Edge already exists: " + vertex1 + " - " + vertex2);
        }
        if (this.edges[vertex2.toString()].hasOwnProperty(vertex1.toString())) {
            throw new Error("Edge already exists: " + vertex2 + " - " + vertex1);
        }
        this.edges[vertex1.toString()][vertex2.toString()] = true;
        this.edges[vertex2.toString()][vertex1.toString()] = true;
    };
    Graph.prototype.getVertices = function () {
        return this.vertices;
    };
    Graph.prototype.getEdges = function () {
        return this.edges;
    };
    /**
     * Get a spanning tree from the graph
     * The algorithm starts from a random vertex and
     * add the vertex to both the visited set and the active set
     * at each iteration, choose either a random node between or
     * the oldest node in the active set, and visit a random unvisited
     * neighbour of that node
     * if the chosen node has no unvisited neighbour, it will get removed
     * from the active set
     * The process repeats until there are no more nodes in the active set
     */
    Graph.prototype.growTree = function () {
        var tree = new Graph();
        var activeNodes = [];
        var activeNodeSet = {};
        var visitedNodeSet = {};
        var numNodes = Object.keys(this.vertices).length;
        var randomIndex = Math.floor(Math.random() * numNodes);
        var startingNode = Object.keys(this.vertices)[randomIndex];
        activeNodes.push(+startingNode);
        activeNodeSet[+startingNode] = true;
        visitedNodeSet[+startingNode] = true;
        tree.addVertex(+startingNode);
        while (activeNodes.length) {
            var hasUnvisitedNeighbor = false;
            var nodeIdx = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * activeNodes.length);
            var node = activeNodes[nodeIdx];
            var neighbours = Object(__WEBPACK_IMPORTED_MODULE_0__shuffle__["a" /* inPlaceFisherYatesShuffle */])(Object.keys(this.edges[node.toString()]));
            for (var _i = 0, neighbours_1 = neighbours; _i < neighbours_1.length; _i++) {
                var neighbour = neighbours_1[_i];
                if (!visitedNodeSet.hasOwnProperty(neighbour.toString())) {
                    hasUnvisitedNeighbor = true;
                    activeNodes.push(+neighbour);
                    activeNodeSet[+neighbour] = true;
                    visitedNodeSet[+neighbour] = true;
                    tree.addVertex(+neighbour);
                    tree.addEdge(+node, +neighbour);
                    break;
                }
            }
            if (!hasUnvisitedNeighbor) {
                activeNodes.splice(nodeIdx, 1);
                delete activeNodeSet[+node];
            }
        }
        return tree;
    };
    /**
     * Search a path between two vertices by DFS
     */
    Graph.prototype.search = function (start, end) {
        var path = [start];
        var visited = (_a = {},
            _a[start.toString()] = true,
            _a);
        while (path.length) {
            var nodes = Object.keys(this.edges[path[path.length - 1].toString()]);
            var hasMove = false;
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var node = nodes_1[_i];
                if (!visited[node.toString()]) {
                    path.push(+node);
                    visited[node.toString()] = true;
                    hasMove = true;
                    break;
                }
            }
            if (!hasMove) {
                path.pop();
            }
            else if (path[path.length - 1] === end) {
                break;
            }
        }
        return path;
        var _a;
    };
    Graph.prototype.debug = function (width, height) {
        var vertices = Object.keys(this.vertices).map(Number).sort();
        var rows = [];
        for (var y = 0; y < height; y++) {
            var row = '';
            var nextRow = '';
            for (var x = 0; x < width; x++) {
                var n = y * width + x;
                row += 0;
                if (x < width - 1 && this.edges[n.toString()].hasOwnProperty((n + 1).toString())) {
                    row += '-';
                }
                else {
                    row += ' ';
                }
                if (y < height - 1) {
                    if (this.edges[n.toString()].hasOwnProperty((n + width).toString())) {
                        nextRow += '| ';
                    }
                    else {
                        nextRow += '  ';
                    }
                }
            }
            rows.push(row, nextRow);
        }
        console.log(rows.join('\n'));
    };
    return Graph;
}());



/***/ })

});
//# sourceMappingURL=tower-defense.module.chunk.js.map
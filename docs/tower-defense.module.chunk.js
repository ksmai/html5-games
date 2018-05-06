webpackJsonp(["tower-defense.module"],{

/***/ "./src/app/tower-defense/tower-defense-game/enemy-spawner.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnemySpawner; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/index.ts");


var EnemySpawner = /** @class */ (function () {
    function EnemySpawner(level, isInfinite) {
        if (isInfinite === void 0) { isInfinite = false; }
        var _this = this;
        this.level = level;
        this.numEnemies = 0;
        this.ellapsed = 0;
        this.rate = Math.min(10, Math.sqrt(level + 1));
        this.maxTime = 60000 + this.level * 10000;
        this.maxEnemies = this.rate * (this.maxTime / 1000 + 10);
        if (isInfinite) {
            this.maxTime = -1;
            this.maxEnemies = -1;
        }
        this.rng = new Phaser.Math.RandomDataGenerator([Date.now().toString()]);
        this.cumulativeWeights = EnemySpawner.enemyTypes.map(function (enemyType) {
            return enemyType.weight(_this.level);
        });
        var total = this.cumulativeWeights.reduce(function (s, e) { return s + e; }, 0);
        for (var i = 0; i < this.cumulativeWeights.length; i++) {
            if (i === 0) {
                this.cumulativeWeights[i] /= total;
            }
            else {
                this.cumulativeWeights[i] = this.cumulativeWeights[i] / total + this.cumulativeWeights[i - 1];
            }
        }
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
        var rand = this.rng.frac();
        var i;
        for (i = 0; i < this.cumulativeWeights.length; i++) {
            if (rand < this.cumulativeWeights[i]) {
                break;
            }
        }
        var ctors = EnemySpawner.enemyTypes[i].constructors;
        this.subject.next(ctors[Phaser.Math.Between(0, ctors.length - 1)]);
        this.numEnemies += 1;
    };
    EnemySpawner.enemyTypes = [{
            type: 'minion',
            constructors: [__WEBPACK_IMPORTED_MODULE_1__enemy__["c" /* GreenMinion */], __WEBPACK_IMPORTED_MODULE_1__enemy__["h" /* WhiteMinion */], __WEBPACK_IMPORTED_MODULE_1__enemy__["a" /* BrownMinion */], __WEBPACK_IMPORTED_MODULE_1__enemy__["f" /* GreyMinion */]],
            weight: function (level) {
                return Math.max(5, 100 - level * 10);
            },
        }, {
            type: 'tank',
            constructors: [__WEBPACK_IMPORTED_MODULE_1__enemy__["e" /* GreenTank */], __WEBPACK_IMPORTED_MODULE_1__enemy__["j" /* WhiteTank */]],
            weight: function (level) {
                return Math.min(35, Math.max(0, -5 + level * 15));
            },
        }, {
            type: 'plane',
            constructors: [__WEBPACK_IMPORTED_MODULE_1__enemy__["d" /* GreenPlane */], __WEBPACK_IMPORTED_MODULE_1__enemy__["i" /* WhitePlane */]],
            weight: function (level) {
                return Math.min(20, Math.max(0, -15 + level * 10));
            },
        }, {
            type: 'cannon',
            constructors: [__WEBPACK_IMPORTED_MODULE_1__enemy__["b" /* GreenCannon */], __WEBPACK_IMPORTED_MODULE_1__enemy__["g" /* WhiteCannon */]],
            weight: function (level) {
                return Math.min(40, Math.max(0, -40 + level * 20));
            },
        }];
    return EnemySpawner;
}());



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/brown-minion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrownMinion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var BrownMinion = /** @class */ (function (_super) {
    __extends(BrownMinion, _super);
    function BrownMinion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrownMinion.prototype.setup = function () {
        this.speed = 96;
        this.hp = 200;
        this.damage = 16;
        this.boxWidth = 16;
        this.boxHeight = 26;
        this.frameNumber = 247;
        this.coins = 100;
        this.score = 100;
        _super.prototype.setup.call(this);
    };
    return BrownMinion;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/enemy.ts":
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
    function Enemy(scene, path) {
        var _this = _super.call(this, scene, path[0][0] * 64, path[0][1] * 64, 'spritesheet') || this;
        _this.path = path;
        _this.scene.add.existing(_this);
        _this.scene.physics.add.existing(_this);
        _this.setup();
        return _this;
    }
    Enemy.prototype.setup = function () {
        var _this = this;
        this.setSize(this.boxWidth, this.boxHeight);
        this.setFrame(this.frameNumber);
        this.setDepth(this.path[0][1] * 64 + Math.max(this.boxWidth, this.boxHeight));
        var tweens = this.path.slice(1).map(function (_a, i) {
            var x = _a[0], y = _a[1];
            return ({
                targets: _this,
                duration: (Math.abs(_this.path[i + 1][0] - _this.path[i][0]) + Math.abs(_this.path[i + 1][1] - _this.path[i][1])) * 64 / _this.speed * 1000,
                ease: 'Linear',
                repeat: false,
                props: {
                    x: x * 64,
                    y: y * 64,
                    depth: y * 64 + Math.max(_this.boxWidth, _this.boxHeight),
                },
                onStart: function () {
                    var angle;
                    var _a = _this.path[i], x0 = _a[0], y0 = _a[1];
                    if (x > x0) {
                        angle = 0;
                        _this.setSize(_this.boxWidth, _this.boxHeight);
                    }
                    else if (x < x0) {
                        angle = Math.PI;
                        _this.setSize(_this.boxWidth, _this.boxHeight);
                    }
                    else if (y > y0) {
                        angle = Math.PI / 2;
                        _this.setSize(_this.boxHeight, _this.boxWidth);
                    }
                    else {
                        angle = 3 * Math.PI / 2;
                        _this.setSize(_this.boxHeight, _this.boxWidth);
                    }
                    _this.setRotation(angle);
                },
            });
        });
        this.moveTimeline = this.scene.tweens.timeline({
            tweens: tweens,
        });
    };
    Enemy.prototype.getDamage = function () {
        return this.damage;
    };
    Enemy.prototype.getCoins = function () {
        return this.coins;
    };
    Enemy.prototype.getScore = function () {
        return this.score;
    };
    Enemy.prototype.cleanup = function () {
        this.moveTimeline.destroy();
        if (this.resetTintEvent) {
            this.resetTintEvent.destroy();
        }
    };
    Enemy.prototype.onDamage = function (damage) {
        var _this = this;
        this.hp -= damage;
        if (this.hp <= 0) {
            this.scene.events.emit('enemyDestroyed', this);
        }
        else {
            this.setTint(0xff0000);
            if (this.resetTintEvent) {
                this.resetTintEvent.destroy();
            }
            this.resetTintEvent = this.scene.time.delayedCall(200, function () {
                _this.setTint(0xffffff);
            }, null, this);
        }
    };
    Enemy.prototype.onDestroy = function (group) {
        this.cleanup();
        this.destroy();
        if (group) {
            group.remove(this, true, true);
        }
    };
    return Enemy;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Physics"].Arcade.Sprite));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/green-cannon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GreenCannon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var GreenCannon = /** @class */ (function (_super) {
    __extends(GreenCannon, _super);
    function GreenCannon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreenCannon.prototype.setup = function () {
        this.speed = 96;
        this.hp = 300;
        this.damage = 25;
        this.boxWidth = 47;
        this.boxHeight = 20;
        this.frameNumber = 291;
        this.coins = 100;
        this.score = 200;
        _super.prototype.setup.call(this);
    };
    return GreenCannon;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/green-minion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GreenMinion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var GreenMinion = /** @class */ (function (_super) {
    __extends(GreenMinion, _super);
    function GreenMinion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreenMinion.prototype.setup = function () {
        this.speed = 96;
        this.hp = 200;
        this.damage = 16;
        this.boxWidth = 20;
        this.boxHeight = 25;
        this.frameNumber = 245;
        this.coins = 100;
        this.score = 100;
        _super.prototype.setup.call(this);
    };
    return GreenMinion;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/green-plane.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GreenPlane; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var GreenPlane = /** @class */ (function (_super) {
    __extends(GreenPlane, _super);
    function GreenPlane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreenPlane.prototype.setup = function () {
        this.speed = 192;
        this.hp = 100;
        this.damage = 64;
        this.boxWidth = 43;
        this.boxHeight = 23;
        this.frameNumber = 270;
        this.coins = 100;
        this.score = 1000;
        _super.prototype.setup.call(this);
    };
    return GreenPlane;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/green-tank.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GreenTank; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var GreenTank = /** @class */ (function (_super) {
    __extends(GreenTank, _super);
    function GreenTank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreenTank.prototype.setup = function () {
        this.speed = 64;
        this.hp = 1000;
        this.damage = 48;
        this.boxWidth = 52;
        this.boxHeight = 36;
        this.frameNumber = 268;
        this.coins = 100;
        this.score = 500;
        _super.prototype.setup.call(this);
    };
    return GreenTank;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/grey-minion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GreyMinion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var GreyMinion = /** @class */ (function (_super) {
    __extends(GreyMinion, _super);
    function GreyMinion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreyMinion.prototype.setup = function () {
        this.speed = 96;
        this.hp = 200;
        this.damage = 16;
        this.boxWidth = 16;
        this.boxHeight = 26;
        this.frameNumber = 248;
        this.coins = 100;
        this.score = 100;
        _super.prototype.setup.call(this);
    };
    return GreyMinion;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
/* unused harmony reexport Enemy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__green_minion__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/green-minion.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__green_minion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__white_minion__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/white-minion.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_2__white_minion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__brown_minion__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/brown-minion.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__brown_minion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__grey_minion__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/grey-minion.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__grey_minion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__green_tank__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/green-tank.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__green_tank__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__white_tank__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/white-tank.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_6__white_tank__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__green_plane__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/green-plane.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_7__green_plane__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__white_plane__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/white-plane.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__white_plane__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__green_cannon__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/green-cannon.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_9__green_cannon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__white_cannon__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/white-cannon.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_10__white_cannon__["a"]; });













/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/white-cannon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WhiteCannon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var WhiteCannon = /** @class */ (function (_super) {
    __extends(WhiteCannon, _super);
    function WhiteCannon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WhiteCannon.prototype.setup = function () {
        this.speed = 96;
        this.hp = 300;
        this.damage = 25;
        this.boxWidth = 48;
        this.boxHeight = 20;
        this.frameNumber = 292;
        this.coins = 100;
        this.score = 200;
        _super.prototype.setup.call(this);
    };
    return WhiteCannon;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/white-minion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WhiteMinion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var WhiteMinion = /** @class */ (function (_super) {
    __extends(WhiteMinion, _super);
    function WhiteMinion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WhiteMinion.prototype.setup = function () {
        this.speed = 96;
        this.hp = 200;
        this.damage = 16;
        this.boxWidth = 16;
        this.boxHeight = 26;
        this.frameNumber = 246;
        this.coins = 100;
        this.score = 100;
        _super.prototype.setup.call(this);
    };
    return WhiteMinion;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/white-plane.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WhitePlane; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var WhitePlane = /** @class */ (function (_super) {
    __extends(WhitePlane, _super);
    function WhitePlane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WhitePlane.prototype.setup = function () {
        this.speed = 192;
        this.hp = 100;
        this.damage = 64;
        this.boxWidth = 43;
        this.boxHeight = 23;
        this.frameNumber = 271;
        this.coins = 100;
        this.score = 1000;
        _super.prototype.setup.call(this);
    };
    return WhitePlane;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/enemy/white-tank.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WhiteTank; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy/enemy.ts");
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

var WhiteTank = /** @class */ (function (_super) {
    __extends(WhiteTank, _super);
    function WhiteTank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WhiteTank.prototype.setup = function () {
        this.speed = 64;
        this.hp = 1000;
        this.damage = 48;
        this.boxWidth = 52;
        this.boxHeight = 36;
        this.frameNumber = 269;
        this.coins = 100;
        this.score = 500;
        _super.prototype.setup.call(this);
    };
    return WhiteTank;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/holy-leaf.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HolyLeaf; });
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

var HolyLeaf = /** @class */ (function (_super) {
    __extends(HolyLeaf, _super);
    function HolyLeaf(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'spritesheet') || this;
        _this.maxHP = 100;
        _this.hp = 100;
        _this.frameNumber = 134;
        _this.collisionRadius = 24;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setDepth(y + 32);
        _this.setFrame(_this.frameNumber);
        _this.setCircle(_this.collisionRadius, -_this.collisionRadius + 32, -_this.collisionRadius + 32);
        _this.tween = scene.tweens.add({
            targets: _this,
            rotation: Math.PI * 2,
            loop: -1,
            duration: 6000,
            ease: 'Linear',
        });
        return _this;
    }
    HolyLeaf.prototype.getHit = function (enemy) {
        this.hp -= enemy.getDamage();
        this.setTint(0xff00ff + 0xff00 * this.hp / this.maxHP);
        this.scene.events.emit('enemyDestroyed', enemy);
        if (this.hp <= 0) {
            this.scene.events.emit('leafDestroyed');
            this.cleanup();
            this.destroy();
        }
    };
    HolyLeaf.prototype.cleanup = function () {
        this.tween.stop();
    };
    return HolyLeaf;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Physics"].Arcade.Sprite));



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
    LevelMap.prototype.init = function (hardcodedPath) {
        var _this = this;
        var pathGeneratorWidth = Math.ceil(this.width / 2);
        var pathGeneratorHeight = Math.ceil(this.height / 2);
        var path;
        if (hardcodedPath) {
            path = hardcodedPath;
        }
        else {
            var pathGenerator = new __WEBPACK_IMPORTED_MODULE_0__path_generator__["a" /* PathGenerator */](pathGeneratorWidth, pathGeneratorHeight);
            path = pathGenerator.generate(pathGeneratorWidth + pathGeneratorHeight);
        }
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
    LevelMap.prototype.isEmptySlot = function (x, y) {
        if (y < 0 || x < 0 || y > this.map.length - 1 || x > this.map[y].length - 1) {
            return false;
        }
        return this.map[y][x] === 0;
    };
    LevelMap.prototype.fillSlot = function (x, y) {
        this.map[y][x] = 2;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__holy_leaf__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/holy-leaf.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enemy_spawner__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy-spawner.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tower_shop__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower-shop.ts");
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
    PlayScene.prototype.init = function (_a) {
        var coins = _a.coins, score = _a.score, level = _a.level;
        var mapWidth = this.sys.canvas.width / 64;
        var mapHeight = this.sys.canvas.height / 64;
        this.levelMap = new __WEBPACK_IMPORTED_MODULE_1__level_map__["a" /* LevelMap */](mapWidth, mapHeight, this);
        this.levelMap.init();
        this.enemySpawner = new __WEBPACK_IMPORTED_MODULE_3__enemy_spawner__["a" /* EnemySpawner */](level);
        this.gameover = false;
        this.score = score;
        this.level = level;
        this.coins = coins;
        this.spawningEnded = false;
        this.aoeCircles = [];
    };
    PlayScene.prototype.preload = function () {
        this.load.spritesheet('spritesheet', 'assets/tower-defense/tilesheet/tilesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.atlas('explosion', 'assets/tower-defense/particles/explosion.png', 'assets/tower-defense/particles/explosion.json');
        this.load.audio('music', [
            'assets/tower-defense/sounds/music.ogg',
            'assets/tower-defense/sounds/music.mp3',
        ], undefined, undefined);
        this.load.audio('explode', [
            'assets/tower-defense/sounds/explode.wav',
        ], undefined, undefined);
        this.load.audio('hit', [
            'assets/tower-defense/sounds/hit.wav',
        ], undefined, undefined);
        this.load.audio('coin', [
            'assets/tower-defense/sounds/coin.wav',
        ], undefined, undefined);
        this.load.audio('victory', [
            'assets/tower-defense/sounds/victory.wav',
        ], undefined, undefined);
        this.load.audio('defeat', [
            'assets/tower-defense/sounds/defeat.wav',
        ], undefined, undefined);
        this.load.audio('disallowed', [
            'assets/tower-defense/sounds/disallowed.wav',
        ], undefined, undefined);
    };
    PlayScene.prototype.create = function () {
        var _this = this;
        this.cameras.main.fadeIn(1000, 255, 255, 255);
        this.explodeSound = this.sound.add('explode');
        this.particles = this.add.particles('explosion');
        this.particles.createEmitter({
            frame: ['smoke-puff', 'cloud', 'smoke-puff'],
            lifespan: 2000,
            quantity: 6,
            angle: { min: 0, max: 359 },
            speed: { min: 16, max: 32 },
            scale: { start: 0.5, end: 0.25 },
            alpha: { start: 0.8, end: 0 },
            on: false,
        });
        this.towerShop = new __WEBPACK_IMPORTED_MODULE_4__tower_shop__["a" /* TowerShop */](this);
        this.towerShop.create();
        this.towerShadow = this.add.sprite(0, 0, 'spritesheet');
        this.towerShadow.setAlpha(0.5);
        this.towerShadow.setVisible(false);
        this.rangeIndicator = this.add.graphics();
        this.rangeIndicator.setAlpha(0.5);
        this.rangeIndicator.setVisible(false);
        this.statGroup = this.add.group(null, null);
        this.towerGroup = this.physics.add.group();
        this.enemyGroup = this.physics.add.group();
        this.projectileGroup = this.physics.add.group();
        this.levelMap.create();
        var _a = this.levelMap.getLastPoint(), lastX = _a[0], lastY = _a[1];
        this.holyLeaf = new __WEBPACK_IMPORTED_MODULE_2__holy_leaf__["a" /* HolyLeaf */](this, lastX * 64, lastY * 64);
        this.updateStatGroup();
        this.physics.add.collider(this.holyLeaf, this.enemyGroup, function (holyLeaf, enemy) {
            holyLeaf.getHit(enemy);
            _this.cameras.main.shake(100, 0.01);
        });
        this.physics.add.collider(this.projectileGroup, this.enemyGroup, function (projectile, enemy) {
            if (projectile.isAOE()) {
                _this.aoeCircles.push([
                    new __WEBPACK_IMPORTED_MODULE_0_phaser__["Geom"].Circle(projectile.x, projectile.y, projectile.getAOERadius()),
                    projectile.getDamage(),
                ]);
                _this.explodeSound.stop();
                _this.explodeSound.play();
                _this.particles.emitParticleAt(projectile.x, projectile.y, 6);
            }
            else {
                _this.sound.play('hit', { volume: 0.3 });
                enemy.onDamage(projectile.getDamage());
            }
            projectile.onDestroy(_this.projectileGroup);
        });
        this.physics.add.overlap(this.towerGroup, this.enemyGroup, function (tower, enemy) {
            if (!tower.getTarget()) {
                tower.setTarget(enemy);
            }
        });
        this.events.once('leafDestroyed', function () {
            _this.holyLeaf = null;
            _this.gameover = true;
            _this.tweens.killAll();
            _this.cameras.main.flash();
            _this.cameras.main.fadeOut(1000, 0, 0, 0, function (camera, progress) {
                if (progress < 1) {
                    return;
                }
                _this.onGameover();
                _this.cameras.main.fadeIn(1000, 0, 0, 0);
            }, _this);
        });
        this.events.on('enemyDestroyed', function (enemy) {
            _this.increaseStats({
                coins: enemy.getCoins(),
                score: enemy.getScore(),
            });
            _this.particles.setDepth(enemy.y + 64);
            _this.explodeSound.stop();
            _this.explodeSound.play();
            _this.particles.emitParticleAt(enemy.x, enemy.y, 6);
            enemy.onDestroy(_this.enemyGroup);
        });
        this.events.on('projectilesCreated', function (projectiles) {
            _this.projectileGroup.addMultiple(projectiles);
        });
        this.events.on('projectileExploded', function (projectile) {
            if (projectile.isAOE()) {
                _this.aoeCircles.push([
                    new __WEBPACK_IMPORTED_MODULE_0_phaser__["Geom"].Circle(projectile.x, projectile.y, projectile.getAOERadius()),
                    projectile.getDamage(),
                ]);
                _this.explodeSound.stop();
                _this.explodeSound.play();
                _this.particles.emitParticleAt(projectile.x, projectile.y, 6);
            }
            projectile.onDestroy(_this.projectileGroup);
        });
        this.input.on('pointermove', function (pointer) {
            if (!_this.towerShop.handlePointerMove(pointer)) {
                return;
            }
            var towerConstructor = _this.towerShop.getSelectedTower();
            if (!towerConstructor) {
                return;
            }
            var mapX = Math.floor(pointer.x / 64);
            var mapY = Math.floor(pointer.y / 64);
            if (!_this.levelMap.isEmptySlot(mapX, mapY)) {
                _this.towerShadow.setVisible(false);
                _this.rangeIndicator.setVisible(false);
                return;
            }
            _this.towerShadow.setPosition(mapX * 64 + 32, mapY * 64 + 32);
            _this.towerShadow.setDepth(mapY * 64 + 32);
            _this.towerShadow.setFrame(towerConstructor.frameNumber);
            _this.towerShadow.setVisible(true);
            _this.towerShadow.setTint(_this.coins < towerConstructor.cost ? 0xff9999 : 0xffffff);
            _this.rangeIndicator.clear();
            var circle = new __WEBPACK_IMPORTED_MODULE_0_phaser__["Geom"].Circle(mapX * 64 + 32, mapY * 64 + 32, towerConstructor.radius);
            _this.rangeIndicator.fillStyle(_this.coins < towerConstructor.cost ? 0xff9999 : 0xffffff, 0.5);
            _this.rangeIndicator.fillCircleShape(circle);
            _this.rangeIndicator.setDepth(mapY * 64 + 32);
            _this.rangeIndicator.setVisible(true);
        });
        this.input.on('pointerdown', function (pointer) {
            if (!_this.towerShop.handlePointerDown(pointer)) {
                return;
            }
            var towerConstructor = _this.towerShop.getSelectedTower();
            if (!towerConstructor) {
                return;
            }
            if (_this.coins < towerConstructor.cost) {
                _this.sound.play('disallowed', { volume: 0.5 });
                return;
            }
            var mapX = Math.floor(pointer.x / 64);
            var mapY = Math.floor(pointer.y / 64);
            if (!_this.levelMap.isEmptySlot(mapX, mapY)) {
                return;
            }
            _this.increaseStats({
                coins: -towerConstructor.cost,
            });
            var tower = new towerConstructor(_this, Math.floor(pointer.x / 64) * 64 + 32, Math.floor(pointer.y / 64) * 64 + 32);
            _this.towerGroup.add(tower);
            _this.levelMap.fillSlot(mapX, mapY);
            _this.towerShadow.setVisible(false);
            _this.rangeIndicator.setVisible(false);
            _this.sound.play('coin', { volume: 0.5 });
        });
        this.time.delayedCall(5000, function () {
            _this.subscription = _this.enemySpawner.startSpawn().subscribe(function (ctor) {
                var enemy = new ctor(_this, _this.levelMap.getWholePath());
                _this.enemyGroup.add(enemy);
            }, null, function () { return _this.spawningEnded = true; });
            _this.sound.play('music', { loop: true, volume: 0.5 });
        }, null, this);
    };
    PlayScene.prototype.update = function (t, dt) {
        var _this = this;
        if (this.gameover) {
            return;
        }
        if (this.spawningEnded && !this.enemyGroup.getLength()) {
            this.gameover = true;
            this.tweens.killAll();
            this.cameras.main.fadeOut(1000, 255, 255, 255, function (camera, progress) {
                if (progress < 1) {
                    return;
                }
                _this.onWin();
                _this.cameras.main.fadeIn(1000, 255, 255, 255);
            }, this);
            return;
        }
        this.enemySpawner.update(dt);
        this.towerGroup.getChildren().forEach(function (tower) { return tower.tick(t, dt); });
        this.projectileGroup.getChildren().forEach(function (projectile) { return projectile.tick(t, dt); });
        if (this.aoeCircles.length) {
            var children = this.enemyGroup.getChildren();
            var _loop_1 = function (i) {
                var enemy = children[i];
                var body = enemy.body;
                var bounds = body.getBounds({});
                var x = bounds.x;
                var y = bounds.y;
                var w = bounds.right - x;
                var h = bounds.bottom - y;
                var rect = new __WEBPACK_IMPORTED_MODULE_0_phaser__["Geom"].Rectangle(x, y, w, h);
                this_1.aoeCircles.forEach(function (_a) {
                    var circle = _a[0], damage = _a[1];
                    if (!enemy.active) {
                        return;
                    }
                    if (__WEBPACK_IMPORTED_MODULE_0_phaser__["Geom"].Intersects.CircleToRectangle(circle, rect)) {
                        _this.sound.play('hit', { volume: 0.3 });
                        enemy.onDamage(damage);
                    }
                });
            };
            var this_1 = this;
            for (var i = children.length - 1; i >= 0; i--) {
                _loop_1(i);
            }
            this.aoeCircles = [];
        }
    };
    PlayScene.prototype.cleanup = function () {
        this.sound.stopAll();
        this.input.removeAllListeners();
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    };
    PlayScene.prototype.increaseStats = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.coins, coins = _c === void 0 ? 0 : _c, _d = _b.score, score = _d === void 0 ? 0 : _d;
        this.score += score;
        this.coins += coins;
        this.updateStatGroup();
    };
    PlayScene.prototype.updateStatGroup = function () {
        var _this = this;
        this.statGroup.clear(true, true);
        var y = 16;
        var x = 16;
        var levelIcon = this.statGroup.create(x, y, 'spritesheet', 274, true, true);
        levelIcon.setScale(0.5);
        levelIcon.setAlpha(0.8);
        levelIcon.setDepth(y + 64);
        x += 16;
        (this.level + 1).toString().split('').forEach(function (digit) {
            var num = _this.statGroup.create(x, y, 'spritesheet', 276 + +digit, true, true);
            num.setScale(0.5);
            num.setAlpha(0.8);
            num.setDepth(y + 64);
            x += 16;
        });
        x += 16;
        var scoreIcon = this.statGroup.create(x, y, 'spritesheet', 275, true, true);
        scoreIcon.setScale(0.5);
        scoreIcon.setAlpha(0.8);
        scoreIcon.setDepth(y + 64);
        x += 16;
        (this.score).toString().split('').forEach(function (digit) {
            var num = _this.statGroup.create(x, y, 'spritesheet', 276 + +digit, true, true);
            num.setScale(0.5);
            num.setAlpha(0.8);
            num.setDepth(y + 64);
            x += 16;
        });
        x = this.sys.canvas.width - 16;
        (this.coins).toString().split('').reverse().forEach(function (digit) {
            var num = _this.statGroup.create(x, y, 'spritesheet', 276 + +digit, true, true);
            num.setScale(0.5);
            num.setAlpha(0.8);
            num.setDepth(y + 64);
            x -= 16;
        });
        var coinsIcon = this.statGroup.create(x, y, 'spritesheet', 272, true, true);
        coinsIcon.setScale(0.5);
        coinsIcon.setAlpha(0.8);
        coinsIcon.setDepth(y + 64);
        x -= 16;
    };
    PlayScene.prototype.onWin = function () {
        var _this = this;
        this.increaseStats({
            score: (this.level + 1) * 5000,
            coins: Math.floor(1000 * Math.sqrt(this.level + 1)),
        });
        var winScreen = this.add.graphics();
        winScreen.setDepth(this.sys.canvas.height + 1000);
        winScreen.fillStyle(0x000000, 0.7);
        winScreen.fillRect(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        var innerWidth = this.sys.canvas.width * 2 / 3;
        var innerHeight = this.sys.canvas.height * 2 / 3;
        var innerOffsetX = (this.sys.canvas.width - innerWidth) / 2;
        var innerOffsetY = (this.sys.canvas.height - innerHeight) / 2;
        winScreen.fillRect(innerOffsetX, innerOffsetY, innerWidth, innerHeight);
        var midX = this.sys.canvas.width / 2;
        var midY = this.sys.canvas.height / 2;
        var fontSize = 48;
        var winText = this.add.text(midX, innerOffsetY + fontSize + 64, "LEVEL COMPLETED", { fontSize: fontSize, fontStyle: 'bold' });
        winText.setOrigin(0.5);
        winText.setDepth(winScreen.depth + 1);
        var continueY = midY + 96;
        var continueText = this.add.text(midX, continueY, 'Click to continue', { fontSize: fontSize * 0.7, fontStyle: 'bold' });
        continueText.setOrigin(0.5);
        continueText.setDepth(winScreen.depth + 1);
        this.cleanup();
        this.tweens.add({
            targets: continueText,
            props: {
                alpha: 0.5,
            },
            ease: 'Power',
            duration: 500,
            yoyo: true,
            repeat: -1,
        });
        this.sound.play('victory');
        this.input.once('pointerup', function () {
            _this.cleanup();
            _this.cameras.main.fadeOut(1000, 255, 255, 255, function (camera, progress) {
                if (progress < 1) {
                    return;
                }
                _this.scene.stop('PlayScene');
                _this.scene.start('PlayScene', {
                    level: _this.level + 1,
                    score: _this.score,
                    coins: _this.coins,
                });
            }, _this);
        });
    };
    PlayScene.prototype.onGameover = function () {
        var _this = this;
        var loseScreen = this.add.graphics();
        loseScreen.setDepth(this.sys.canvas.height + 1000);
        loseScreen.fillStyle(0x000000, 0.7);
        loseScreen.fillRect(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        var innerWidth = this.sys.canvas.width * 2 / 3;
        var innerHeight = this.sys.canvas.height * 2 / 3;
        var innerOffsetX = (this.sys.canvas.width - innerWidth) / 2;
        var innerOffsetY = (this.sys.canvas.height - innerHeight) / 2;
        loseScreen.fillRect(innerOffsetX, innerOffsetY, innerWidth, innerHeight);
        var midX = this.sys.canvas.width / 2;
        var midY = this.sys.canvas.height / 2;
        var fontSize = 64;
        var gameoverText = this.add.text(midX, innerOffsetY + fontSize + 16, 'GAME OVER', { fontSize: fontSize, fontStyle: 'bold' });
        gameoverText.setOrigin(0.5);
        gameoverText.setDepth(loseScreen.depth + 1);
        var highscoreY = midY + 32;
        var highscoreText = this.add.text(midX, highscoreY, 'HIGHSCORE', { fontSize: fontSize * 1.1, fontStyle: 'bold' });
        highscoreText.setOrigin(0.5);
        highscoreText.setDepth(loseScreen.depth + 1);
        var scoreY = highscoreY + fontSize + 16;
        var scoreText = this.add.text(midX, scoreY, this.score.toString(), { fontSize: fontSize, fontStyle: 'bold' });
        scoreText.setOrigin(0.5);
        scoreText.setDepth(loseScreen.depth + 1);
        this.cleanup();
        this.sound.play('defeat');
        this.input.once('pointerup', function () {
            _this.cleanup();
            _this.cameras.main.fadeOut(1000, 255, 255, 255, function (camera, progress) {
                if (progress < 1) {
                    return;
                }
                _this.scene.stop('PlayScene');
                _this.scene.start('StartScene');
            }, _this);
        });
    };
    return PlayScene;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Scene"]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/projectile/big-cannon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BigCannon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/projectile.ts");
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

var BigCannon = /** @class */ (function (_super) {
    __extends(BigCannon, _super);
    function BigCannon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigCannon.prototype.setup = function () {
        this.damage = 40;
        this.speed = 384;
        this.aoe = false;
        this.size = 17;
        this.frameNumber = 296;
        this.angularOffset = Math.PI;
        _super.prototype.setup.call(this);
    };
    return BigCannon;
}(__WEBPACK_IMPORTED_MODULE_0__projectile__["a" /* Projectile */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/projectile/big-rocket.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BigRocket; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/projectile.ts");
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

var BigRocket = /** @class */ (function (_super) {
    __extends(BigRocket, _super);
    function BigRocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigRocket.prototype.setup = function () {
        this.damage = 200;
        this.speed = 448;
        this.aoe = true;
        this.aoeRadius = 48;
        this.size = 15;
        this.frameNumber = 252;
        this.angularOffset = 0;
        _super.prototype.setup.call(this);
    };
    return BigRocket;
}(__WEBPACK_IMPORTED_MODULE_0__projectile__["a" /* Projectile */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/projectile/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/projectile.ts");
/* unused harmony reexport Projectile */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__small_cannon__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/small-cannon.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__small_cannon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__big_cannon__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/big-cannon.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__big_cannon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__small_rocket__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/small-rocket.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__small_rocket__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__big_rocket__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/big-rocket.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__big_rocket__["a"]; });







/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/projectile/projectile.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Projectile; });
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

var Projectile = /** @class */ (function (_super) {
    __extends(Projectile, _super);
    function Projectile(scene, x, y, target) {
        var _this = _super.call(this, scene, x, y, 'spritesheet') || this;
        _this.target = target;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setDepth(y);
        _this.setup();
        return _this;
    }
    Projectile.prototype.setup = function () {
        this.setFrame(this.frameNumber);
        this.setCircle(this.size, -this.size + 32, -this.size + 32);
    };
    Projectile.prototype.tick = function (t, dt) {
        var xdiff = this.target.x - this.x;
        var ydiff = this.target.y - this.y;
        var angle;
        if (ydiff === 0) {
            angle = xdiff > 0 ? Math.PI / 2 : -Math.PI / 2;
        }
        else if (ydiff > 0) {
            angle = Math.PI - Math.atan(xdiff / ydiff);
        }
        else {
            angle = -Math.atan(xdiff / ydiff);
        }
        var xspeed = dt / 1000 * this.speed * Math.sin(angle);
        var yspeed = dt / 1000 * this.speed * -Math.cos(angle);
        this.x += xspeed;
        this.y += yspeed;
        this.setRotation(angle + this.angularOffset);
        if (!this.target.active && Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2)) < 32) {
            this.scene.events.emit('projectileExploded', this);
        }
    };
    Projectile.prototype.getDamage = function () {
        return this.damage;
    };
    Projectile.prototype.isAOE = function () {
        return this.aoe;
    };
    Projectile.prototype.getAOERadius = function () {
        return this.aoeRadius;
    };
    Projectile.prototype.onDestroy = function (group) {
        this.destroy();
        group.remove(this, true, true);
    };
    return Projectile;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Physics"].Arcade.Sprite));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/projectile/small-cannon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmallCannon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/projectile.ts");
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

var SmallCannon = /** @class */ (function (_super) {
    __extends(SmallCannon, _super);
    function SmallCannon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmallCannon.prototype.setup = function () {
        this.damage = 40;
        this.speed = 256;
        this.aoe = false;
        this.size = 9;
        this.frameNumber = 295;
        this.angularOffset = Math.PI;
        _super.prototype.setup.call(this);
    };
    return SmallCannon;
}(__WEBPACK_IMPORTED_MODULE_0__projectile__["a" /* Projectile */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/projectile/small-rocket.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmallRocket; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/projectile.ts");
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

var SmallRocket = /** @class */ (function (_super) {
    __extends(SmallRocket, _super);
    function SmallRocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmallRocket.prototype.setup = function () {
        this.damage = 200;
        this.speed = 448;
        this.aoe = true;
        this.aoeRadius = 48;
        this.size = 12;
        this.frameNumber = 251;
        this.angularOffset = 0;
        _super.prototype.setup.call(this);
    };
    return SmallRocket;
}(__WEBPACK_IMPORTED_MODULE_0__projectile__["a" /* Projectile */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/start.scene.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartScene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__("./node_modules/phaser/src/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__level_map__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/level-map.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemy_spawner__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/enemy-spawner.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tower__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/index.ts");
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
        this.load.spritesheet('spritesheet', 'assets/tower-defense/tilesheet/tilesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.atlas('explosion', 'assets/tower-defense/particles/explosion.png', 'assets/tower-defense/particles/explosion.json');
        this.load.audio('music', [
            'assets/tower-defense/sounds/music.ogg',
            'assets/tower-defense/sounds/music.mp3',
        ], undefined, undefined);
        this.load.audio('explode', [
            'assets/tower-defense/sounds/explode.wav',
        ], undefined, undefined);
        this.load.audio('hit', [
            'assets/tower-defense/sounds/hit.wav',
        ], undefined, undefined);
        this.load.audio('coin', [
            'assets/tower-defense/sounds/coin.wav',
        ], undefined, undefined);
        this.load.audio('victory', [
            'assets/tower-defense/sounds/victory.wav',
        ], undefined, undefined);
        this.load.audio('defeat', [
            'assets/tower-defense/sounds/defeat.wav',
        ], undefined, undefined);
        this.load.audio('disallowed', [
            'assets/tower-defense/sounds/disallowed.wav',
        ], undefined, undefined);
    };
    StartScene.prototype.init = function () {
        var mapWidth = this.sys.canvas.width / 64;
        var mapHeight = this.sys.canvas.height / 64;
        this.levelMap = new __WEBPACK_IMPORTED_MODULE_1__level_map__["a" /* LevelMap */](mapWidth, mapHeight, this);
        this.levelMap.init([24, 32, 33, 34, 26, 27, 28, 36, 37, 38, 30, 31]);
        this.enemySpawner = new __WEBPACK_IMPORTED_MODULE_2__enemy_spawner__["a" /* EnemySpawner */](0, true);
    };
    StartScene.prototype.create = function () {
        var _this = this;
        this.cameras.main.fadeIn(1000, 255, 255, 255);
        this.towerGroup = this.physics.add.group();
        this.enemyGroup = this.physics.add.group();
        this.projectileGroup = this.physics.add.group();
        this.towerGroup.add(new __WEBPACK_IMPORTED_MODULE_3__tower__["c" /* SingleCannon */](this, 2 * 64 + 32, 7 * 64 + 32));
        this.towerGroup.add(new __WEBPACK_IMPORTED_MODULE_3__tower__["c" /* SingleCannon */](this, 3 * 64 + 32, 7 * 64 + 32));
        this.towerGroup.add(new __WEBPACK_IMPORTED_MODULE_3__tower__["c" /* SingleCannon */](this, 10 * 64 + 32, 7 * 64 + 32));
        this.towerGroup.add(new __WEBPACK_IMPORTED_MODULE_3__tower__["c" /* SingleCannon */](this, 11 * 64 + 32, 7 * 64 + 32));
        this.towerGroup.add(new __WEBPACK_IMPORTED_MODULE_3__tower__["a" /* DoubleCannon */](this, 6 * 64 + 32, 8 * 64 + 32));
        this.towerGroup.add(new __WEBPACK_IMPORTED_MODULE_3__tower__["a" /* DoubleCannon */](this, 7 * 64 + 32, 8 * 64 + 32));
        this.sound.play('music', { loop: true, volume: 0.5 });
        this.particles = this.add.particles('explosion');
        this.particles.createEmitter({
            frame: ['smoke-puff', 'cloud', 'smoke-puff'],
            lifespan: 2000,
            quantity: 6,
            angle: { min: 0, max: 359 },
            speed: { min: 16, max: 32 },
            scale: { start: 0.5, end: 0.25 },
            alpha: { start: 0.8, end: 0 },
            on: false,
        });
        this.levelMap.create();
        var path = this.levelMap.getWholePath();
        var reversedPath = path.slice().reverse();
        reversedPath.unshift([16, 7]);
        this.subscription = this.enemySpawner.startSpawn().subscribe(function (ctor) {
            var enemy = new ctor(_this, path);
            var enemy2 = new ctor(_this, reversedPath);
            _this.enemyGroup.addMultiple([enemy, enemy2]);
        });
        this.physics.add.collider(this.projectileGroup, this.enemyGroup, function (projectile, enemy) {
            enemy.onDamage(projectile.getDamage());
            projectile.onDestroy(_this.projectileGroup);
        });
        this.physics.add.overlap(this.towerGroup, this.enemyGroup, function (tower, enemy) {
            if (!tower.getTarget()) {
                tower.setTarget(enemy);
            }
        });
        this.events.on('enemyDestroyed', function (enemy) {
            _this.particles.setDepth(enemy.y + 64);
            _this.particles.emitParticleAt(enemy.x, enemy.y, 6);
            enemy.onDestroy(_this.enemyGroup);
        });
        this.events.on('projectilesCreated', function (projectiles) {
            _this.projectileGroup.addMultiple(projectiles);
        });
        this.events.on('projectileExploded', function (projectile) {
            projectile.onDestroy(_this.projectileGroup);
        });
        var title = this.add.text(this.sys.canvas.width / 2, 128, 'TOWER DEFENSE');
        title.setFontSize(96);
        title.setFontStyle('bold');
        title.setOrigin(0.5);
        title.setStroke('#000000', 3);
        var instruction = this.add.text(this.sys.canvas.width / 2, 256, 'Click to start!');
        instruction.setFontSize(48);
        instruction.setFontStyle('bold');
        instruction.setOrigin(0.5);
        instruction.setStroke('#000000', 1);
        this.tweens.add({
            targets: instruction,
            props: {
                alpha: 0.4,
            },
            ease: 'Linear',
            duration: 800,
            yoyo: true,
            repeat: -1,
        });
        this.input.once('pointerup', function () {
            _this.cameras.main.fadeOut(1000, 255, 255, 255, function (camera, progress) {
                if (progress < 1) {
                    return;
                }
                _this.cleanup();
                _this.scene.stop('StartScene');
                _this.scene.start('PlayScene', {
                    score: 0,
                    coins: 1500,
                    level: 0,
                });
            }, _this);
        });
    };
    StartScene.prototype.update = function (t, dt) {
        this.enemySpawner.update(dt);
        this.towerGroup.getChildren().forEach(function (tower) { return tower.tick(t, dt); });
        this.projectileGroup.getChildren().forEach(function (projectile) { return projectile.tick(t, dt); });
    };
    StartScene.prototype.cleanup = function () {
        this.tweens.killAll();
        this.sound.stopAll();
        this.input.removeAllListeners();
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
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
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TowerDefenseGameComponent; });
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
            backgroundColor: '#ffffff',
            scene: [
                __WEBPACK_IMPORTED_MODULE_1__start_scene__["a" /* StartScene */],
                __WEBPACK_IMPORTED_MODULE_2__play_scene__["a" /* PlayScene */],
            ],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 },
                    debug: process.env.NODE_ENV !== 'production',
                },
            },
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


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower-shop.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TowerShop; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tower__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/index.ts");

var TowerShop = /** @class */ (function () {
    function TowerShop(scene) {
        this.scene = scene;
        this.towers = [__WEBPACK_IMPORTED_MODULE_0__tower__["c" /* SingleCannon */], __WEBPACK_IMPORTED_MODULE_0__tower__["a" /* DoubleCannon */], __WEBPACK_IMPORTED_MODULE_0__tower__["d" /* SingleRocket */], __WEBPACK_IMPORTED_MODULE_0__tower__["b" /* DoubleRocket */]];
        this.margin = 24;
        this.width = 48;
        this.height = 48;
        this.y = 8;
        this.groups = [];
    }
    TowerShop.prototype.create = function () {
        var _this = this;
        this.xStart = (this.scene.sys.canvas.width - this.width * this.towers.length - this.margin * (this.towers.length - 1)) / 2;
        this.towers.forEach(function (tower, i) {
            var group = _this.renderButton(_this.xStart + (_this.width + _this.margin) * i, _this.y, tower);
            _this.groups.push(group);
        });
    };
    TowerShop.prototype.handlePointerMove = function (pointer) {
        for (var i = 0; i < this.towers.length; i++) {
            var tower = this.towers[i];
            var x = this.xStart + (this.width + this.margin) * i;
            if (pointer.x > x && pointer.x < x + this.width && pointer.y > this.y && pointer.y < this.y + this.height) {
                this.groups[i].getChildren().forEach(function (child) {
                    child.setAlpha(0.8);
                });
                return true;
            }
            else if (this.selectedTower !== tower) {
                this.groups[i].getChildren().forEach(function (child) {
                    child.setAlpha(0.5);
                });
            }
        }
        return true;
    };
    TowerShop.prototype.handlePointerDown = function (pointer) {
        for (var i = 0; i < this.towers.length; i++) {
            var tower = this.towers[i];
            var x = this.xStart + (this.width + this.margin) * i;
            if (pointer.x > x && pointer.x < x + this.width && pointer.y > this.y && pointer.y < this.y + this.height) {
                if (this.selectedTower === tower) {
                    this.selectedTower = null;
                }
                else {
                    this.selectedTower = tower;
                }
                return false;
            }
        }
        return true;
    };
    TowerShop.prototype.getSelectedTower = function () {
        return this.selectedTower;
    };
    TowerShop.prototype.renderButton = function (x, y, ctor) {
        var _this = this;
        var graphics = this.scene.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.lineStyle(5, 0xffffff);
        graphics.fillRect(x, y, this.width, this.height);
        graphics.strokeRect(x, y, this.width, this.height);
        graphics.setDepth(y + this.height);
        graphics.setAlpha(0.5);
        var sprite = this.scene.add.sprite(x + this.width / 2, y + 16, 'spritesheet', ctor.frameNumber);
        sprite.setDepth(y + this.height);
        sprite.setAlpha(0.5);
        sprite.setScale(0.5);
        var group = this.scene.add.group(null, null);
        group.addMultiple([graphics, sprite]);
        ctor.cost.toString().split('').forEach(function (digit, i) {
            var sprite = _this.scene.add.sprite(x + 8 + i * 10, y + _this.height - 8, 'spritesheet', 276 + +digit);
            sprite.setDepth(y + _this.height);
            sprite.setAlpha(0.5);
            sprite.setScale(0.4);
            sprite.setTint(0xd0d400);
            group.add(sprite);
        });
        return group;
    };
    return TowerShop;
}());



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower/double-cannon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DoubleCannon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tower__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/tower.ts");
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


var DoubleCannon = /** @class */ (function (_super) {
    __extends(DoubleCannon, _super);
    function DoubleCannon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoubleCannon.prototype.setup = function () {
        this.idleFrameNumber = this.frameNumber;
        this.maxCooldown = 300;
        this.currentCooldown = 0;
        this.halfSize = 32;
        this.projectileConstructor = __WEBPACK_IMPORTED_MODULE_0__projectile__["c" /* SmallCannon */];
        _super.prototype.setup.call(this);
    };
    DoubleCannon.prototype.createProjectiles = function (angle) {
        return [new this.projectileConstructor(this.scene, this.x - 10 + this.halfSize * Math.sin(angle), this.y - this.halfSize * Math.cos(angle), this.target), new this.projectileConstructor(this.scene, this.x + 10 + this.halfSize * Math.sin(angle), this.y - this.halfSize * Math.cos(angle), this.target)];
    };
    Object.defineProperty(DoubleCannon.prototype, "frameNumber", {
        get: function () {
            return DoubleCannon.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleCannon.prototype, "radius", {
        get: function () {
            return DoubleCannon.radius;
        },
        enumerable: true,
        configurable: true
    });
    DoubleCannon.radius = 128;
    DoubleCannon.cost = 2000;
    DoubleCannon.frameNumber = 250;
    return DoubleCannon;
}(__WEBPACK_IMPORTED_MODULE_1__tower__["a" /* Tower */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower/double-rocket.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DoubleRocket; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tower__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/tower.ts");
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


var DoubleRocket = /** @class */ (function (_super) {
    __extends(DoubleRocket, _super);
    function DoubleRocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoubleRocket.prototype.setup = function () {
        this.idleFrameNumber = 228;
        this.maxCooldown = 2500;
        this.halfSize = 4;
        this.projectileConstructor = __WEBPACK_IMPORTED_MODULE_0__projectile__["d" /* SmallRocket */];
        _super.prototype.setup.call(this);
    };
    DoubleRocket.prototype.createProjectiles = function (angle) {
        return [new this.projectileConstructor(this.scene, this.x - 8.5 + this.halfSize * Math.sin(angle), this.y - this.halfSize * Math.cos(angle), this.target), new this.projectileConstructor(this.scene, this.x + 8.5 + this.halfSize * Math.sin(angle), this.y - this.halfSize * Math.cos(angle), this.target)];
    };
    Object.defineProperty(DoubleRocket.prototype, "frameNumber", {
        get: function () {
            return DoubleRocket.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRocket.prototype, "radius", {
        get: function () {
            return DoubleRocket.radius;
        },
        enumerable: true,
        configurable: true
    });
    DoubleRocket.radius = 300;
    DoubleRocket.cost = 8000;
    DoubleRocket.frameNumber = 205;
    return DoubleRocket;
}(__WEBPACK_IMPORTED_MODULE_1__tower__["a" /* Tower */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tower__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/tower.ts");
/* unused harmony reexport Tower */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__single_cannon__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/single-cannon.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__single_cannon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__double_cannon__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/double-cannon.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__double_cannon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__single_rocket__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/single-rocket.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__single_rocket__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__double_rocket__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/double-rocket.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__double_rocket__["a"]; });







/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower/single-cannon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleCannon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tower__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/tower.ts");
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


var SingleCannon = /** @class */ (function (_super) {
    __extends(SingleCannon, _super);
    function SingleCannon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleCannon.prototype.setup = function () {
        this.idleFrameNumber = this.frameNumber;
        this.maxCooldown = 250;
        this.halfSize = 32;
        this.projectileConstructor = __WEBPACK_IMPORTED_MODULE_0__projectile__["a" /* BigCannon */];
        _super.prototype.setup.call(this);
    };
    SingleCannon.prototype.createProjectiles = function (angle) {
        return [new this.projectileConstructor(this.scene, this.x + this.halfSize * Math.sin(angle), this.y - this.halfSize * Math.cos(angle), this.target)];
    };
    Object.defineProperty(SingleCannon.prototype, "frameNumber", {
        get: function () {
            return SingleCannon.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SingleCannon.prototype, "radius", {
        get: function () {
            return SingleCannon.radius;
        },
        enumerable: true,
        configurable: true
    });
    SingleCannon.radius = 128;
    SingleCannon.cost = 1000;
    SingleCannon.frameNumber = 249;
    return SingleCannon;
}(__WEBPACK_IMPORTED_MODULE_1__tower__["a" /* Tower */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower/single-rocket.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleRocket; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/projectile/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tower__ = __webpack_require__("./src/app/tower-defense/tower-defense-game/tower/tower.ts");
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


var SingleRocket = /** @class */ (function (_super) {
    __extends(SingleRocket, _super);
    function SingleRocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleRocket.prototype.setup = function () {
        this.idleFrameNumber = 229;
        this.maxCooldown = 2500;
        this.halfSize = 7;
        this.projectileConstructor = __WEBPACK_IMPORTED_MODULE_0__projectile__["b" /* BigRocket */];
        _super.prototype.setup.call(this);
    };
    SingleRocket.prototype.createProjectiles = function (angle) {
        return [new this.projectileConstructor(this.scene, this.x + this.halfSize * Math.sin(angle), this.y - this.halfSize * Math.cos(angle), this.target)];
    };
    Object.defineProperty(SingleRocket.prototype, "frameNumber", {
        get: function () {
            return SingleRocket.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SingleRocket.prototype, "radius", {
        get: function () {
            return SingleRocket.radius;
        },
        enumerable: true,
        configurable: true
    });
    SingleRocket.radius = 300;
    SingleRocket.cost = 4000;
    SingleRocket.frameNumber = 206;
    return SingleRocket;
}(__WEBPACK_IMPORTED_MODULE_1__tower__["a" /* Tower */]));



/***/ }),

/***/ "./src/app/tower-defense/tower-defense-game/tower/tower.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tower; });
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

var Tower = /** @class */ (function (_super) {
    __extends(Tower, _super);
    function Tower(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'spritesheet') || this;
        _this.currentCooldown = 0;
        _this.target = null;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setDepth(y);
        _this.setup();
        return _this;
    }
    Tower.prototype.setup = function () {
        this.setFrame(this.frameNumber);
        this.setCircle(this.radius, -this.radius + 32, -this.radius + 32);
    };
    Tower.prototype.tick = function (t, dt) {
        this.currentCooldown = Math.max(0, this.currentCooldown - dt);
        if (this.currentCooldown <= 500) {
            this.setFrame(this.frameNumber);
        }
        else {
            this.setFrame(this.idleFrameNumber);
        }
        if (this.target) {
            var angle = this.calculateRotation(this.x, this.y, this.target.x, this.target.y);
            this.setRotation(angle);
            if (this.currentCooldown <= 0) {
                var projectiles = this.createProjectiles(angle);
                this.scene.events.emit('projectilesCreated', projectiles);
                this.currentCooldown = this.maxCooldown;
            }
            this.target = null;
        }
    };
    Tower.prototype.getTarget = function () {
        return this.target;
    };
    Tower.prototype.setTarget = function (target) {
        this.target = target;
    };
    Tower.prototype.createProjectiles = function (angle) {
        return [new this.projectileConstructor(this.scene, this.x, this.y, this.target)];
    };
    Object.defineProperty(Tower.prototype, "frameNumber", {
        get: function () {
            return Tower.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tower.prototype, "radius", {
        get: function () {
            return Tower.radius;
        },
        enumerable: true,
        configurable: true
    });
    Tower.prototype.calculateRotation = function (x, y, x2, y2) {
        if (y2 === y) {
            return x2 > x ? Math.PI / 2 : -Math.PI / 2;
        }
        if (y2 > y) {
            return Math.PI - Math.atan((x2 - x) / (y2 - y));
        }
        return -Math.atan((x2 - x) / (y2 - y));
    };
    return Tower;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Physics"].Arcade.Sprite));



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
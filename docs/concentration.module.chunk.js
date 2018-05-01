webpackJsonp(["concentration.module"],{

/***/ "./src/app/concentration/concentration-game/card.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
var Card = /** @class */ (function () {
    function Card(scene, cardFrame, cardBackFrame) {
        this.scene = scene;
        this.cardFrame = cardFrame;
        this.cardBackFrame = cardBackFrame;
        this.flipped = false;
        this.flipping = false;
        this.matched = false;
        this.front = this.scene.add.sprite(0, 0, 'card', cardFrame);
        this.front.setScale(0.2);
        this.front.setVisible(false);
        this.front.setInteractive();
        this.back = this.scene.add.sprite(0, 0, 'cardBack', cardBackFrame);
        this.back.setScale(0.2);
        this.back.setInteractive();
        this.scene.input.on('gameobjectup', this.handleClick, this);
    }
    Card.prototype.setPosition = function (x, y) {
        this.front.setPosition(x, y);
        this.back.setPosition(x, y);
    };
    Card.prototype.isFlipped = function () {
        return this.flipped;
    };
    Card.prototype.isFlipping = function () {
        return this.flipping;
    };
    Card.prototype.flip = function () {
        var _this = this;
        var toHide;
        var toShow;
        if (this.flipped) {
            toHide = this.front;
            toShow = this.back;
        }
        else {
            toShow = this.front;
            toHide = this.back;
        }
        this.flipped = !this.flipped;
        this.flipping = true;
        toShow.setScale(0, 0.22);
        this.scene.tweens.add({
            targets: toHide,
            scaleY: 0.22,
            scaleX: 0,
            onComplete: function () {
                toHide.setVisible(false);
                toShow.setVisible(true);
                _this.scene.tweens.add({
                    targets: toShow,
                    scaleY: 0.2,
                    scaleX: 0.2,
                    onComplete: function () {
                        _this.flipping = false;
                    },
                    ease: 'Linear',
                    duration: 150,
                });
            },
            ease: 'Linear',
            duration: 150,
        });
    };
    Card.prototype.isMatch = function (card) {
        return this.cardFrame === card.cardFrame;
    };
    Card.prototype.match = function () {
        var _this = this;
        this.matched = true;
        this.scene.input.removeListener('gameobjectup', this.handleClick, this, false);
        this.scene.tweens.add({
            targets: this.front,
            alpha: 0,
            duration: 200,
            delay: 300,
            ease: 'Linear',
            repeat: 5,
            onComplete: function () {
                _this.front.destroy();
                _this.back.destroy();
            },
        });
    };
    Card.prototype.changeCardBack = function (frame) {
        this.back.setFrame(frame);
    };
    Card.prototype.handleClick = function (pointer, gameObject) {
        if (this.matched || this.flipping) {
            return;
        }
        if (gameObject === this.front) {
            this.scene.events.emit('clickedFront', this);
        }
        else if (gameObject === this.back) {
            this.scene.events.emit('clickedBack', this);
        }
    };
    return Card;
}());



/***/ }),

/***/ "./src/app/concentration/concentration-game/concentration-game.component.html":
/***/ (function(module, exports) {

module.exports = "<game-phaser-game-container\n  [config]=\"config\"\n  [title]=\"config.title\"\n  [instructions]=\"instructions\"\n></game-phaser-game-container>\n"

/***/ }),

/***/ "./src/app/concentration/concentration-game/concentration-game.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/concentration/concentration-game/concentration-game.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConcentrationGameComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__start_scene__ = __webpack_require__("./src/app/concentration/concentration-game/start.scene.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__play_scene__ = __webpack_require__("./src/app/concentration/concentration-game/play.scene.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__score_scene__ = __webpack_require__("./src/app/concentration/concentration-game/score.scene.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ConcentrationGameComponent = /** @class */ (function () {
    function ConcentrationGameComponent() {
        this.config = {
            title: 'Concentration',
            url: 'https://ksmai.github.io/html5-games/concentration',
            version: '1.0',
            backgroundColor: '#529848',
            scene: [
                __WEBPACK_IMPORTED_MODULE_1__start_scene__["a" /* StartScene */],
                __WEBPACK_IMPORTED_MODULE_2__play_scene__["a" /* PlayScene */],
                __WEBPACK_IMPORTED_MODULE_3__score_scene__["a" /* ScoreScene */],
            ],
        };
        this.instructions = "Eliminate all the cards by flipping the matching pairs";
    }
    ConcentrationGameComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'game-concentration-game',
            template: __webpack_require__("./src/app/concentration/concentration-game/concentration-game.component.html"),
            styles: [__webpack_require__("./src/app/concentration/concentration-game/concentration-game.component.scss")]
        })
    ], ConcentrationGameComponent);
    return ConcentrationGameComponent;
}());



/***/ }),

/***/ "./src/app/concentration/concentration-game/play.scene.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayScene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__("./node_modules/phaser/src/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__card__ = __webpack_require__("./src/app/concentration/concentration-game/card.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_shuffle__ = __webpack_require__("./src/utils/shuffle.ts");
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
        var _this = _super.call(this, { key: 'PlayScene' }) || this;
        _this.active = false;
        return _this;
    }
    PlayScene.prototype.init = function () {
        this.flippedCards = [];
        this.matchCount = 0;
        this.moveCount = 0;
    };
    PlayScene.prototype.preload = function () {
        this.load.spritesheet('card', 'assets/concentration/playingCards.png', { frameWidth: 140, frameHeight: 190 });
        this.load.spritesheet('cardBack', 'assets/concentration/playingCardBacks.png', { frameWidth: 140, frameHeight: 190 });
    };
    PlayScene.prototype.create = function () {
        var _this = this;
        var possibleFrames = Array(68)
            .fill(null)
            .map(function (e, i) { return i; })
            .filter(function (i) { return (i + 1) % 7 > 0 && ((i + 2) % 7 > 0 || i / 7 < 3); });
        var frames = Array(20)
            .fill(null)
            .map(function () {
            var frameIdx = Math.floor(Math.random() * possibleFrames.length);
            var frame = possibleFrames.splice(frameIdx, 1)[0];
            return frame;
        });
        frames.push.apply(frames, frames);
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_shuffle__["a" /* inPlaceFisherYatesShuffle */])(frames);
        this.cards = frames.map(function (frame) { return new __WEBPACK_IMPORTED_MODULE_1__card__["a" /* Card */](_this, frame, Math.floor(Math.random() * 15)); });
        this.cards.forEach(function (card, i) {
            card.setPosition(14.72 + 28.72 * (i % 10), 21 + 40 * Math.floor(i / 10));
        });
        this.cameras.main.fadeIn(1000, 255, 255, 255, function (camera, progress) {
            if (progress < 1) {
                _this.cards.forEach(function (card) { return card.changeCardBack(Math.floor(Math.random() * 15)); });
                return;
            }
            _this.events.on('clickedBack', function onClickedBack(card) {
                var _this = this;
                if (this.flippedCards.length === 2) {
                    this.flippedCards.forEach(function (flippedCard) { return flippedCard.flip(); });
                    this.flippedCards = [];
                }
                card.flip();
                this.flippedCards.push(card);
                if (this.flippedCards.length === 2) {
                    this.moveCount += 1;
                    if (this.flippedCards[0].isMatch(this.flippedCards[1])) {
                        this.flippedCards.forEach(function (flippedCard) { return flippedCard.match(); });
                        this.matchCount += 2;
                        this.flippedCards = [];
                        if (this.matchCount === this.cards.length) {
                            this.events.removeListener('clickedBack', onClickedBack);
                            this.time.delayedCall(2000, function () {
                                _this.cameras.main.fadeOut(1000, 255, 255, 255, function (camera, progress) {
                                    if (progress < 1) {
                                        return;
                                    }
                                    _this.scene.start('ScoreScene', {
                                        moveCount: _this.moveCount,
                                    });
                                }, _this);
                            }, [], this);
                        }
                    }
                }
            }, _this);
        }, this);
    };
    return PlayScene;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Scene"]));



/***/ }),

/***/ "./src/app/concentration/concentration-game/score.scene.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreScene; });
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

var ScoreScene = /** @class */ (function (_super) {
    __extends(ScoreScene, _super);
    function ScoreScene() {
        var _this = _super.call(this, { key: 'ScoreScene' }) || this;
        _this.active = false;
        return _this;
    }
    ScoreScene.prototype.init = function (params) {
        this.moveCount = params.moveCount;
        this.now = Date.now();
    };
    ScoreScene.prototype.create = function () {
        var _this = this;
        this.cameras.main.fadeIn(1000, 255, 255, 255, function (camera, progress) {
            if (progress < 1) {
                return;
            }
            _this.add.text(30, 32, 'Congratulations!')
                .setStroke('#c93f3f', 3)
                .setFontSize(24)
                .setColor('#c93f3f');
            _this.add.text(96, 64, "You won in\n" + _this.moveCount + "\nmoves")
                .setStroke('#c93f3f', 3)
                .setFontSize(16)
                .setAlign('center')
                .setColor('#ffffff');
        }, this);
    };
    ScoreScene.prototype.update = function () {
        if (Date.now() - this.now < 1500) {
            return;
        }
        if (this.input.activePointer.isDown) {
            this.scene.start('PlayScene');
        }
    };
    return ScoreScene;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Scene"]));



/***/ }),

/***/ "./src/app/concentration/concentration-game/start.scene.ts":
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
        var _this = _super.call(this, { key: 'StartScene' }) || this;
        _this.active = true;
        _this.clicked = false;
        return _this;
    }
    StartScene.prototype.preload = function () {
    };
    StartScene.prototype.create = function () {
        this.title = this.add
            .text(48, 32, 'Concentration')
            .setStroke('#c93f3f', 3)
            .setFontSize(24)
            .setColor('#c93f3f');
        this.instruction = this.add
            .text(72, 96, 'Click to start!')
            .setFontSize(16)
            .setColor('#ffffff');
    };
    StartScene.prototype.update = function () {
        var _this = this;
        if (this.clicked) {
            return;
        }
        if (this.input.activePointer.isDown) {
            this.clicked = true;
            this.cameras.main.fadeOut(1000, 255, 255, 255, function (camera, progress) {
                if (progress < 1) {
                    return;
                }
                _this.scene.start('PlayScene');
            }, this);
        }
    };
    return StartScene;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Scene"]));



/***/ }),

/***/ "./src/app/concentration/concentration-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConcentrationRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__concentration_game_concentration_game_component__ = __webpack_require__("./src/app/concentration/concentration-game/concentration-game.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__concentration_game_concentration_game_component__["a" /* ConcentrationGameComponent */] },
];
var ConcentrationRoutingModule = /** @class */ (function () {
    function ConcentrationRoutingModule() {
    }
    ConcentrationRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */],
            ],
        })
    ], ConcentrationRoutingModule);
    return ConcentrationRoutingModule;
}());



/***/ }),

/***/ "./src/app/concentration/concentration.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConcentrationModule", function() { return ConcentrationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__concentration_game_concentration_game_component__ = __webpack_require__("./src/app/concentration/concentration-game/concentration-game.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__concentration_routing_module__ = __webpack_require__("./src/app/concentration/concentration-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__phaser_game_phaser_game_module__ = __webpack_require__("./src/app/phaser-game/phaser-game.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ConcentrationModule = /** @class */ (function () {
    function ConcentrationModule() {
    }
    ConcentrationModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__concentration_routing_module__["a" /* ConcentrationRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_4__phaser_game_phaser_game_module__["a" /* PhaserGameModule */],
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__concentration_game_concentration_game_component__["a" /* ConcentrationGameComponent */]]
        })
    ], ConcentrationModule);
    return ConcentrationModule;
}());



/***/ })

});
//# sourceMappingURL=concentration.module.chunk.js.map
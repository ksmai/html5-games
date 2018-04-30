webpackJsonp(["minesweeper.module"],{

/***/ "./src/app/minesweeper/minesweeper-game/minesweeper-game.component.html":
/***/ (function(module, exports) {

module.exports = "<game-phaser-game-container\n  [config]=\"config\"\n  [title]=\"config.title\"\n  [instructions]=\"instructions\"\n></game-phaser-game-container>\n"

/***/ }),

/***/ "./src/app/minesweeper/minesweeper-game/minesweeper-game.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/minesweeper/minesweeper-game/minesweeper-game.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinesweeperGameComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MinesweeperGameComponent = /** @class */ (function () {
    function MinesweeperGameComponent() {
        this.config = {
            title: 'Minesweeper',
            url: 'https://ksmai.github.io/html5-games/minesweeper',
            version: '1.0',
            backgroundColor: '#ffffff',
            scene: [],
        };
        this.instructions = "Find out all the safety areas!";
    }
    MinesweeperGameComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./src/app/minesweeper/minesweeper-game/minesweeper-game.component.html"),
            styles: [__webpack_require__("./src/app/minesweeper/minesweeper-game/minesweeper-game.component.scss")],
        })
    ], MinesweeperGameComponent);
    return MinesweeperGameComponent;
}());



/***/ }),

/***/ "./src/app/minesweeper/minesweeper-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinesweeperRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__minesweeper_game_minesweeper_game_component__ = __webpack_require__("./src/app/minesweeper/minesweeper-game/minesweeper-game.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__minesweeper_game_minesweeper_game_component__["a" /* MinesweeperGameComponent */] },
];
var MinesweeperRoutingModule = /** @class */ (function () {
    function MinesweeperRoutingModule() {
    }
    MinesweeperRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */],
            ],
        })
    ], MinesweeperRoutingModule);
    return MinesweeperRoutingModule;
}());



/***/ }),

/***/ "./src/app/minesweeper/minesweeper.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinesweeperModule", function() { return MinesweeperModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__minesweeper_game_minesweeper_game_component__ = __webpack_require__("./src/app/minesweeper/minesweeper-game/minesweeper-game.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__minesweeper_routing_module__ = __webpack_require__("./src/app/minesweeper/minesweeper-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__phaser_game_phaser_game_module__ = __webpack_require__("./src/app/phaser-game/phaser-game.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var MinesweeperModule = /** @class */ (function () {
    function MinesweeperModule() {
    }
    MinesweeperModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__minesweeper_routing_module__["a" /* MinesweeperRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_4__phaser_game_phaser_game_module__["a" /* PhaserGameModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__minesweeper_game_minesweeper_game_component__["a" /* MinesweeperGameComponent */],
            ],
        })
    ], MinesweeperModule);
    return MinesweeperModule;
}());



/***/ })

});
//# sourceMappingURL=minesweeper.module.chunk.js.map
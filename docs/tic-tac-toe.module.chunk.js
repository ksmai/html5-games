webpackJsonp(["tic-tac-toe.module"],{

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/ai-player.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AIPlayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/board.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_enum__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/state.enum.ts");


var ROTATED_SLOT = [
    [0, 6, 8, 2],
    [1, 3, 7, 5],
    [2, 0, 6, 8],
    [3, 7, 5, 1],
    [4, 4, 4, 4],
    [5, 1, 3, 7],
    [6, 8, 2, 0],
    [7, 5, 1, 3],
    [8, 2, 0, 6],
];
var AIPlayer = /** @class */ (function () {
    function AIPlayer(state) {
        this.state = state;
        this.defenseMode = false;
        this.winMode = false;
        this.rotation = Math.floor(Math.random() * 4);
    }
    AIPlayer.prototype.getState = function () {
        return this.state;
    };
    AIPlayer.prototype.nextMove = function (board) {
        if (this.defenseMode) {
            return this.defend(board);
        }
        if (this.winMode) {
            return this.win(board);
        }
        var numFilled = board.numFilled();
        switch (numFilled) {
            case 0:
                return this.getRotated(0);
            case 1:
                return board.get(this.getRotated(4)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE ? this.getRotated(4) : this.getRotated(0);
            case 2:
                if (board.get(this.getRotated(4)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    this.winMode = true;
                    return this.win(board);
                }
                else {
                    return this.getRotated(8);
                }
            case 3:
                this.defenseMode = true;
                if (board.get(this.getRotated(4)) !== this.state) {
                    this.defend(board);
                }
                else if (board.get(this.getRotated(0)) === board.get(this.getRotated(8)) && board.get(this.getRotated(0)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(1);
                }
                else if (board.get(this.getRotated(2)) === board.get(this.getRotated(6)) && board.get(this.getRotated(2)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(1);
                }
                else {
                    return this.defend(board);
                }
            case 4:
                this.defenseMode = true;
                if (board.get(this.getRotated(2)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(6);
                }
                else if (board.get(this.getRotated(6)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(2);
                }
                else {
                    return this.defend(board);
                }
            default:
                throw new Error('Should have entered defense mode or win mode by now');
        }
    };
    AIPlayer.prototype.defend = function (board) {
        var _this = this;
        var _loop_1 = function (tuple) {
            var pairs = [
                [tuple[1], tuple[2]],
                [tuple[0], tuple[2]],
                [tuple[0], tuple[1]],
            ];
            var samePair = pairs.findIndex(function (pair, i) {
                return board.get(pair[0]) === board.get(pair[1]) &&
                    board.get(pair[0]) === _this.state &&
                    board.get(tuple[i]) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE;
            });
            if (samePair !== -1) {
                return { value: tuple[samePair] };
            }
        };
        for (var _i = 0, _a = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* Board */].TUPLES; _i < _a.length; _i++) {
            var tuple = _a[_i];
            var state_1 = _loop_1(tuple);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var _loop_2 = function (tuple) {
            var pairs = [
                [tuple[1], tuple[2]],
                [tuple[0], tuple[2]],
                [tuple[0], tuple[1]],
            ];
            var samePair = pairs.findIndex(function (pair, i) {
                return board.get(pair[0]) === board.get(pair[1]) &&
                    board.get(pair[0]) !== _this.state &&
                    board.get(pair[0]) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE &&
                    board.get(tuple[i]) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE;
            });
            if (samePair !== -1) {
                return { value: tuple[samePair] };
            }
        };
        for (var _b = 0, _c = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* Board */].TUPLES; _b < _c.length; _b++) {
            var tuple = _c[_b];
            var state_2 = _loop_2(tuple);
            if (typeof state_2 === "object")
                return state_2.value;
        }
        return board.getMostValuableSlot();
    };
    AIPlayer.prototype.win = function (board) {
        var numFilled = board.numFilled();
        switch (numFilled) {
            case 2:
                if (board.get(this.getRotated(1)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(6);
                }
                else if (board.get(this.getRotated(2)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(6);
                }
                else if (board.get(this.getRotated(3)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(2);
                }
                else if (board.get(this.getRotated(5)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(2);
                }
                else if (board.get(this.getRotated(6)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(2);
                }
                else if (board.get(this.getRotated(7)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                    return this.getRotated(6);
                }
                else {
                    return this.getRotated(6);
                }
            case 4:
                if (board.get(this.getRotated(2)) === this.state) {
                    if (board.get(this.getRotated(1)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(1);
                    }
                    else if (board.get(this.getRotated(5)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(6);
                    }
                    else {
                        return this.getRotated(8);
                    }
                }
                else {
                    if (board.get(this.getRotated(3)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(3);
                    }
                    else if (board.get(this.getRotated(1)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(8);
                    }
                    else if (board.get(this.getRotated(2)) !== __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(8);
                    }
                    else {
                        return this.getRotated(2);
                    }
                }
            case 6:
                if (board.get(this.getRotated(2)) !== this.state) {
                    if (board.get(this.getRotated(7)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(7);
                    }
                    else if (board.get(this.getRotated(3)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(3);
                    }
                    else {
                        return this.getRotated(4);
                    }
                }
                else if (board.get(this.getRotated(6)) !== this.state) {
                    if (board.get(this.getRotated(1)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(1);
                    }
                    else if (board.get(this.getRotated(5)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(5);
                    }
                    else {
                        return this.getRotated(4);
                    }
                }
                else {
                    if (board.get(this.getRotated(1)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(1);
                    }
                    else if (board.get(this.getRotated(3)) === __WEBPACK_IMPORTED_MODULE_1__state_enum__["a" /* State */].NONE) {
                        return this.getRotated(3);
                    }
                    else {
                        return this.getRotated(4);
                    }
                }
            default:
                throw new Error('This is not a winning board for me');
        }
    };
    AIPlayer.prototype.getRotated = function (idx) {
        return ROTATED_SLOT[idx][this.rotation % 4];
    };
    return AIPlayer;
}());



/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/board.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state_enum__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/state.enum.ts");

var Board = /** @class */ (function () {
    function Board() {
        this.states = Array(9).fill(__WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].NONE);
    }
    Board.prototype.checkWinner = function () {
        var _this = this;
        var row = Board.TUPLES.find(function (tuple) {
            return _this.states[tuple[0]] === _this.states[tuple[1]] &&
                _this.states[tuple[1]] === _this.states[tuple[2]] &&
                _this.states[tuple[0]] !== __WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].NONE;
        });
        if (!row) {
            return null;
        }
        return {
            row: row,
            state: this.states[row[0]],
        };
    };
    Board.prototype.get = function (i) {
        i = Math.floor(i);
        if (i < 0 || i > this.states.length) {
            throw new Error("Expected i to be within 0 to 8, got " + i);
        }
        return this.states[i];
    };
    Board.prototype.set = function (i, s) {
        i = Math.floor(i);
        if (i < 0 || i > this.states.length) {
            throw new Error("Expected i to be within 0 to 8, got " + i);
        }
        this.states[i] = s;
    };
    Board.prototype.numFilled = function () {
        return this.states.filter(function (s) { return s !== __WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].NONE; }).length;
    };
    Board.prototype.getEmptySlot = function () {
        return this.states.findIndex(function (spot) { return spot === __WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].NONE; });
    };
    Board.prototype.getMostValuableSlot = function () {
        var _this = this;
        var scores = Array(this.states.length)
            .fill(null)
            .map(function (e, i) { return _this.states[i] === __WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].NONE ? 0 : Number.NEGATIVE_INFINITY; });
        Board.TUPLES.forEach(function (tuple) {
            if (tuple.every(function (idx) { return _this.states[idx] !== __WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].O; })) {
                var inc_1 = tuple.some(function (idx) { return _this.states[idx] === __WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].X; }) ? 3 : 1;
                tuple.forEach(function (i) { return scores[i] += inc_1; });
            }
            if (tuple.every(function (idx) { return _this.states[idx] !== __WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].X; })) {
                var inc_2 = tuple.some(function (idx) { return _this.states[idx] === __WEBPACK_IMPORTED_MODULE_0__state_enum__["a" /* State */].O; }) ? 3 : 1;
                tuple.forEach(function (i) { return scores[i] += inc_2; });
            }
        });
        var max = Math.max.apply(Math, scores);
        if (max < 0) {
            return -1;
        }
        return scores.findIndex(function (score) { return score === max; });
    };
    Board.ROWS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];
    Board.COLS = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];
    Board.DIAGS = [
        [0, 4, 8],
        [2, 4, 6],
    ];
    Board.TUPLES = Board.ROWS.concat(Board.COLS).concat(Board.DIAGS);
    return Board;
}());



/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/o-icon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OIcon; });
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

var OIcon = /** @class */ (function (_super) {
    __extends(OIcon, _super);
    function OIcon(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'icon', 122) || this;
        _this.setTint(0x34ef1f);
        _this.scene.add.existing(_this);
        return _this;
    }
    return OIcon;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["GameObjects"].Sprite));



/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/play.scene.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayScene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__("./node_modules/phaser/src/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__o_icon__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/o-icon.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__x_icon__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/x-icon.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state_enum__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/state.enum.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__board__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/board.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ai_player__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/ai-player.ts");
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
    PlayScene.prototype.init = function (_a) {
        var _this = this;
        var player = _a.player;
        this.player = player;
        this.playerHoverIcon = this.player === __WEBPACK_IMPORTED_MODULE_3__state_enum__["a" /* State */].O ? new __WEBPACK_IMPORTED_MODULE_1__o_icon__["a" /* OIcon */](this, 0, 0) : new __WEBPACK_IMPORTED_MODULE_2__x_icon__["a" /* XIcon */](this, 0, 0);
        this.playerHoverIcon.setAlpha(0.3);
        this.playerHoverIcon.setVisible(false);
        this.board = new __WEBPACK_IMPORTED_MODULE_4__board__["a" /* Board */]();
        this.computer = new __WEBPACK_IMPORTED_MODULE_5__ai_player__["a" /* AIPlayer */](player === __WEBPACK_IMPORTED_MODULE_3__state_enum__["a" /* State */].O ? __WEBPACK_IMPORTED_MODULE_3__state_enum__["a" /* State */].X : __WEBPACK_IMPORTED_MODULE_3__state_enum__["a" /* State */].O);
        if (player === __WEBPACK_IMPORTED_MODULE_3__state_enum__["a" /* State */].X) {
            this.move(this.computer.nextMove(this.board), this.computer.getState());
        }
        this.input.on('pointermove', function (pointer) {
            var position = _this.xyToPosition(pointer.x, pointer.y);
            if (position > -1 && _this.board.get(position) === __WEBPACK_IMPORTED_MODULE_3__state_enum__["a" /* State */].NONE) {
                var _a = _this.positionToXY(position), x = _a[0], y = _a[1];
                _this.playerHoverIcon.x = x;
                _this.playerHoverIcon.y = y;
                _this.playerHoverIcon.setVisible(true);
            }
            else {
                _this.playerHoverIcon.setVisible(false);
            }
        });
        this.input.on('pointerdown', function (pointer) {
            var position = _this.xyToPosition(pointer.x, pointer.y);
            if (position > -1 && _this.board.get(position) === __WEBPACK_IMPORTED_MODULE_3__state_enum__["a" /* State */].NONE) {
                _this.move(position, _this.player);
                var winner = _this.board.checkWinner();
                if (winner) {
                    _this.endGame(winner);
                }
                else if (_this.board.numFilled() < 9) {
                    _this.move(_this.computer.nextMove(_this.board), _this.computer.getState());
                    var winner_1 = _this.board.checkWinner();
                    if (winner_1) {
                        _this.endGame(winner_1);
                    }
                    else if (_this.board.numFilled() === 9) {
                        _this.endGame(null);
                    }
                }
                else {
                    _this.endGame(null);
                }
            }
        });
    };
    PlayScene.prototype.preload = function () {
        this.load.spritesheet('icon', 'assets/tic-tac-toe/spritesheet.png', {
            frameWidth: 50,
            frameHeight: 50,
        });
    };
    PlayScene.prototype.create = function () {
        var graphics = this.add.graphics();
        graphics.lineStyle(4, 0x222222, 1);
        graphics.lineBetween(115, 2, 115, 160);
        graphics.lineBetween(173, 2, 173, 160);
        graphics.lineBetween(57, 54, 231, 54);
        graphics.lineBetween(57, 108, 231, 108);
    };
    PlayScene.prototype.move = function (position, state) {
        this.board.set(position, state);
        var _a = this.positionToXY(position), x = _a[0], y = _a[1];
        if (state === __WEBPACK_IMPORTED_MODULE_3__state_enum__["a" /* State */].O) {
            new __WEBPACK_IMPORTED_MODULE_1__o_icon__["a" /* OIcon */](this, x, y);
        }
        else {
            new __WEBPACK_IMPORTED_MODULE_2__x_icon__["a" /* XIcon */](this, x, y);
        }
    };
    PlayScene.prototype.positionToXY = function (position) {
        var x = 86 + 58 * (position % 3);
        var y = 28 + 53 * Math.floor(position / 3);
        return [x, y];
    };
    PlayScene.prototype.xyToPosition = function (x, y) {
        var row = -1;
        var col = -1;
        if (y > 6 && y < 50) {
            row = 0;
        }
        else if (y > 58 && y < 104) {
            row = 1;
        }
        else if (y > 112 && y < 156) {
            row = 2;
        }
        if (x > 61 && x < 111) {
            col = 0;
        }
        else if (x > 119 && x < 169) {
            col = 1;
        }
        else if (x > 177 && x < 227) {
            col = 2;
        }
        if (row === -1 || col === -1) {
            return -1;
        }
        return row * 3 + col;
    };
    PlayScene.prototype.endGame = function (winner) {
        var _this = this;
        this.input.removeAllListeners();
        var msg;
        if (!winner) {
            msg = 'DRAW';
        }
        else {
            var _a = this.positionToXY(winner.row[0]), x = _a[0], y = _a[1];
            var _b = this.positionToXY(winner.row[2]), x2 = _b[0], y2 = _b[1];
            if (x === x2) {
                y -= 10;
                y2 += 10;
            }
            else if (y === y2) {
                x -= 10;
                x2 += 10;
            }
            else {
                x += x < x2 ? -10 : 10;
                x2 += x2 < x ? -10 : 10;
                y += y < y2 ? -10 : 10;
                y2 += y2 < y ? -10 : 10;
            }
            this.add.graphics().lineStyle(6, 0x222222, 0.6).lineBetween(x, y, x2, y2);
            msg = winner.state === this.player ? 'WIN' : 'LOSE';
        }
        this.add.graphics()
            .fillStyle(0xffffff, 0.9)
            .lineStyle(3, 0x000000, 0.9)
            .fillRect(104, 58.5, 80, 45)
            .strokeRect(104, 58.5, 80, 45);
        var text = this.add.text(144, 81, msg);
        text.setOrigin(0.5, 0.5);
        text.setColor('#000000');
        text.setFontSize(24);
        text.setStroke('#000000', 2);
        this.input.once('pointerdown', function () {
            _this.scene.start('StartScene');
        });
    };
    return PlayScene;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Scene"]));



/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/start.scene.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartScene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__("./node_modules/phaser/src/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__o_icon__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/o-icon.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__x_icon__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/x-icon.ts");
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
        return _this;
    }
    StartScene.prototype.preload = function () {
        this.load.spritesheet('icon', 'assets/tic-tac-toe/spritesheet.png', {
            frameWidth: 50,
            frameHeight: 50,
        });
    };
    StartScene.prototype.create = function () {
        var _this = this;
        var oBox = this.add.graphics();
        oBox.lineStyle(3, 0xb6b7ba, 1);
        oBox.strokeRect(55, 46, 70, 70);
        var xBox = this.add.graphics();
        xBox.lineStyle(3, 0xb6b7ba, 1);
        xBox.strokeRect(163, 46, 70, 70);
        var o = new __WEBPACK_IMPORTED_MODULE_1__o_icon__["a" /* OIcon */](this, 90, 81);
        var x = new __WEBPACK_IMPORTED_MODULE_2__x_icon__["a" /* XIcon */](this, 198, 81);
        oBox.setAlpha(0.7);
        o.setAlpha(0.7);
        xBox.setAlpha(0.7);
        x.setAlpha(0.7);
        this.input.on('pointermove', function (pointer) {
            if (pointer.x > 55 && pointer.x < 55 + 70 && pointer.y > 46 && pointer.y < 46 + 70) {
                oBox.setAlpha(1);
                o.setAlpha(1);
                xBox.setAlpha(0.7);
                x.setAlpha(0.7);
            }
            else if (pointer.x > 163 && pointer.x < 163 + 70 && pointer.y > 46 && pointer.y < 46 + 70) {
                oBox.setAlpha(0.7);
                o.setAlpha(0.7);
                xBox.setAlpha(1);
                x.setAlpha(1);
            }
            else {
                oBox.setAlpha(0.7);
                o.setAlpha(0.7);
                xBox.setAlpha(0.7);
                x.setAlpha(0.7);
            }
        });
        this.input.on('pointerdown', function (pointer) {
            if (pointer.x > 55 && pointer.x < 55 + 70 && pointer.y > 46 && pointer.y < 46 + 70) {
                _this.scene.start('PlayScene', { player: 0 });
                _this.input.removeAllListeners();
            }
            else if (pointer.x > 163 && pointer.x < 163 + 70 && pointer.y > 46 && pointer.y < 46 + 70) {
                _this.scene.start('PlayScene', { player: 1 });
                _this.input.removeAllListeners();
            }
        });
    };
    return StartScene;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["Scene"]));



/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/state.enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return State; });
var State;
(function (State) {
    State[State["NONE"] = -1] = "NONE";
    State[State["O"] = 0] = "O";
    State[State["X"] = 1] = "X";
})(State || (State = {}));


/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/tic-tac-toe-game.component.html":
/***/ (function(module, exports) {

module.exports = "<game-phaser-game-container\n  [config]=\"config\"\n  [title]=\"config.title\"\n  [instructions]=\"instructions\"\n></game-phaser-game-container>\n"

/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/tic-tac-toe-game.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/tic-tac-toe-game.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicTacToeGameComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__start_scene__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/start.scene.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__play_scene__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/play.scene.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TicTacToeGameComponent = /** @class */ (function () {
    function TicTacToeGameComponent() {
        this.config = {
            title: 'Tic Tac Toe',
            url: 'https://ksmai.github.io/html5-games/tic-tac-toe',
            version: '1.0',
            backgroundColor: '#eeeeee',
            scene: [
                __WEBPACK_IMPORTED_MODULE_1__start_scene__["a" /* StartScene */],
                __WEBPACK_IMPORTED_MODULE_2__play_scene__["a" /* PlayScene */],
            ],
        };
        this.instructions = "Obtain victory by lining up 3 symbols in a row, column or diagonal!";
    }
    TicTacToeGameComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/tic-tac-toe-game.component.html"),
            styles: [__webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/tic-tac-toe-game.component.scss")],
        })
    ], TicTacToeGameComponent);
    return TicTacToeGameComponent;
}());



/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-game/x-icon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return XIcon; });
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

var XIcon = /** @class */ (function (_super) {
    __extends(XIcon, _super);
    function XIcon(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'icon', 168) || this;
        _this.setTint(0xe84b33);
        _this.scene.add.existing(_this);
        return _this;
    }
    return XIcon;
}(__WEBPACK_IMPORTED_MODULE_0_phaser__["GameObjects"].Sprite));



/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicTacToeRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tic_tac_toe_game_tic_tac_toe_game_component__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/tic-tac-toe-game.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__tic_tac_toe_game_tic_tac_toe_game_component__["a" /* TicTacToeGameComponent */] },
];
var TicTacToeRoutingModule = /** @class */ (function () {
    function TicTacToeRoutingModule() {
    }
    TicTacToeRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */],
            ],
        })
    ], TicTacToeRoutingModule);
    return TicTacToeRoutingModule;
}());



/***/ }),

/***/ "./src/app/tic-tac-toe/tic-tac-toe.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicTacToeModule", function() { return TicTacToeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__phaser_game_phaser_game_module__ = __webpack_require__("./src/app/phaser-game/phaser-game.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tic_tac_toe_game_tic_tac_toe_game_component__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-game/tic-tac-toe-game.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tic_tac_toe_routing_module__ = __webpack_require__("./src/app/tic-tac-toe/tic-tac-toe-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var TicTacToeModule = /** @class */ (function () {
    function TicTacToeModule() {
    }
    TicTacToeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__phaser_game_phaser_game_module__["a" /* PhaserGameModule */],
                __WEBPACK_IMPORTED_MODULE_4__tic_tac_toe_routing_module__["a" /* TicTacToeRoutingModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__tic_tac_toe_game_tic_tac_toe_game_component__["a" /* TicTacToeGameComponent */],
            ],
        })
    ], TicTacToeModule);
    return TicTacToeModule;
}());



/***/ })

});
//# sourceMappingURL=tic-tac-toe.module.chunk.js.map
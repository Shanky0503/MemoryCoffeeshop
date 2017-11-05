/* global Phaser */

var Cooking = Cooking || {};
var TILE_SIZE = 1600 / 20;
var TOKEN_SIZE = TILE_SIZE * 0.95;
Cooking.Tile = function (state, type, x, y) {
    this.id = type.id;
    this._x = x;
    this._y = y;
    this.state = state;
    Phaser.Group.call(this, state.game);
    this.background = this.create(x * TILE_SIZE + (TILE_SIZE / 2), y * TILE_SIZE + (TILE_SIZE / 2) + 50, "BackTile");

    this.background.width = TOKEN_SIZE;
    this.background.height = TOKEN_SIZE;
    this.background.anchor.setTo(0.5);

    this.tile = this.create(x * TILE_SIZE + (TILE_SIZE / 2), y * TILE_SIZE + (TILE_SIZE / 2) + 50, type.tile);
    this.tile.width = TOKEN_SIZE - 10;
    this.tile.height = TOKEN_SIZE - 10;
    this.tile.anchor.setTo(0.5);
    this.background.inputEnabled = true;
    this.background.input.useHandCursor = true;
    this.background.events.onInputOver.add(function () {
        state.highlightBlock.apply(state, [this._x, this._y]);
    }, this);

    this.background.events.onInputDown.add(function () {
        state.destroyBlock.apply(state, [this._x, this._y]);
    }, this);
    state.game.add.existing(this);

};

Cooking.Tile.prototype = Object.create(Phaser.Group.prototype);
Cooking.Tile.prototype.constructor = Cooking.Tile;

Cooking.Tile.prototype.setHighlight = function (highlight) {
    if (highlight) {
        this.background.loadTexture("BackTileHighlight");
        this.tile.width = TOKEN_SIZE;
        this.tile.height = TOKEN_SIZE;
    } else {
        this.background.loadTexture("BackTile");
        this.tile.width = TOKEN_SIZE - 10;
        this.tile.height = TOKEN_SIZE - 10;
    }
}

Cooking.Tile.prototype.destroy = function () {
    var bgTween = this.state.game.add.tween(this.background);
    bgTween.to({alpha: 0}, 500, Phaser.Easing.Quadratic.Out);
    bgTween.onComplete.add(function () {
        this.background.destroy();
    }, this);
    bgTween.start();


    var tileTween = this.state.game.add.tween(this.tile);
    tileTween.to({alpha: 0}, 500, Phaser.Easing.Quadratic.Out);
    tileTween.onComplete.add(function () {
        this.tile.destroy();
    }, this);
    tileTween.start();
    this.id = -1;
}

Cooking.Tile.prototype.relocate = function (x, y) {

    this._x = x;
    this._y = y;
    if (this.id !== -1) {
        var bgTween = this.state.game.add.tween(this.background);
        bgTween.to({x: x * TILE_SIZE + (TILE_SIZE / 2), y: y * TILE_SIZE + (TILE_SIZE / 2) + 50}, 500, Phaser.Easing.Bounce.Out);
        //this.background.position.setTo(x * TILE_SIZE + (TILE_SIZE / 2), y * TILE_SIZE + (TILE_SIZE / 2) + 50);
        bgTween.start();
        var tileTween = this.state.game.add.tween(this.tile);
        tileTween.to({x: x * TILE_SIZE + (TILE_SIZE / 2), y: y * TILE_SIZE + (TILE_SIZE / 2) + 50}, 500, Phaser.Easing.Bounce.Out);
        tileTween.start();
    }
}






/* global Phaser, FB */

var Cooking = Cooking || {};

Cooking.FBUser = function (state, user, score, x, y) {
    this.user = user;
    this._x = x;
    this._y = y;
    this.state = state;
    this.score = score;
    this.textStyle = {font: "20px 'Passion One'", fill: "#fff", stroke: "white", strokeThickness: 1, boundsAlignH: "center", boundsAlignV: "middle"};
    Phaser.Group.call(this, state.game);
    this.background = this.create(x,y,'FBUserBackground');
    var group = this;
    FB.api(
            "/" + user.id + "/picture?width=50&height=50",
            function (response) {
                if (response && !response.error) {
                    var loader = new Phaser.Loader(state.game);
                    loader.crossOrigin = "anonymous";
                    loader.image(user.id, response.data.url);
                    loader.onLoadComplete.add(function () {
                        group.create(x + 5, y + 5, user.id);
                    });
                    loader.start();
                }
            }
    );
    var nameLabel = state.game.add.text(x + 60, y + 5, user.name, this.textSyle, this);
    var scoreLabel = state.game.add.text(x + 60, y + 30, score, this.textSyle, this);

    state.game.add.existing(this);
},


Cooking.FBUser.prototype = Object.create(Phaser.Group.prototype);
Cooking.FBUser.prototype.constructor = Cooking.FBUser;



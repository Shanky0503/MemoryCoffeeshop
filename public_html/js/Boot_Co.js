var Cooking = Cooking || {};

Cooking.Boot = function () {
};

Cooking.Boot.prototype = {
    preload: function () {
        //Load images in here.
        this.load.image('loadingBar', 'Assets/img/loadingBarWhite.png');
        this.load.image('load_bg','Assets/img/bg_splash_logo.png');
        this.load.image('littleMonkeyLogo','Assets/img/littleMonkeyLogo.png');
    },
    create: function () {
     //   if (this.game.device.desktop) {
            //this.game.stage.backgroundColor = "#c0e4df";
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 240;
            this.game.scale.minHeight = 135;
            this.game.scale.maxWidth = 1600;
            this.game.scale.maxHeight = 900;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            //this.game.scale.setScreenSize(true);


            this.state.start("Load");
       // }
    }
};
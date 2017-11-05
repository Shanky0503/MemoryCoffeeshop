/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Phaser, pic, FB, FBAppID */

var originalPics = [];
var fillPics = [];
var recipe =[];
var recipeList =[];
var userList = [];
var fillers = [];
var centerPic;
var roundNumber = 1;
var noOfGuess;
var roundTimer;
var timer, timerEvent, text;
var timeLimit;
var timeText;
var score = 0;
var rect;
var popUpgroup;
var coffeeCupgroup;
var coffeefillgroup;
var pol;
var draggedItemsNumber;
var iColor ={};



Cooking = Cooking || {};

Cooking.Play = function () {};

Cooking.Play.prototype = 
{
    preload : function ()
    {        
        
        this.bubbleSingle = this.game.add.audio('BubbleSingle');
        this.crackSingle = this.game.add.audio('WoodSingle');
        this.button01 = this.game.add.audio('Button01');
        this.jingles_happy = this.game.add.audio('jingles_Happy');
        this.jingles_sad = this.game.add.audio('jingles_Sad');          
        
        this.scoreTextCreate = false;
        //this.clicksfx = this.add.audio("click");
        recipeList = 
            [
                {name:"ShortBlack",ingredients:['DoubleEspresso'],price:1.99},
                {name:"LongBlack",ingredients:['Espresso','HotWater'],price:2.50},
                {name:"Americano",ingredients:['DoubleEspresso','HotWater'],price:2.99},
                {name:"Macchiato",ingredients:['Espresso','MilkFoam'],price:2.99},
                {name:"FlatWhite",ingredients:['Espresso','SteamedMilk'],price:3.50},
                {name:"CaffeLatte",ingredients:['Espresso','SteamedMilk','MilkFoam'],price:3.50},
                {name:"Moccaccino",ingredients:['Espresso','ChocolateSyrup','SteamedMilk','WhippedCream'],price:3.99},
                {name:"HotChocolate",ingredients:['ChocolateSyrup','HotWater','SteamedMilk','Marshmallows','ChocolatePowder'],price:4.99}               
            ];            
        this.background = this.add.sprite(this.world.centerX,this.world.centerY,'Game_Background');
        this.background.anchor.set(0.5);
        this.background.scale.set(1);
        this.toppingGroup = this.add.group();
        coffeefillgroup = this.game.add.group();
        coffeeCupgroup = this.game.add.group();
        centerPic = this.add.sprite(this.world.centerX,this.world.centerY,'CoffeeCup');
        centerPic.anchor.set(0.5);
//        centerPic.bringToTop();
        coffeeCupgroup.add(centerPic);
        this.game.world.bringToTop(coffeeCupgroup);
        this.countDownTimer();
        
        
        iColor["Espresso"] = {fill:"0x34160d", state:"liquid"};
        iColor["DoubleEspresso"] = {fill:"0x34160d", state:"liquid"};
        iColor["HotWater"] = {fill:"0x2b71c6", state:"liquid"};
        iColor["SteamedMilk"] = {fill:"0xe5e6e8", state:"liquid"};
        iColor["ChocolateSyrup"] = {fill:"0x34160d", state:"liquid"};        
        iColor["ChocolatePowder"] = {state:"topping"};        
        iColor["Marshmallows"] = {state:"topping"};        
        iColor["MilkFoam"] = {state:"topping"};        
        iColor["WhippedCream"] = {state:"topping"}; 
        this.scoreBoard();
        this.scoreTextDisplay();
        this.game.finalTotal = 0;
        
        this.mutebtn = this.add.button(1450, 50, 'mutebutton', this.muteAudio, this);
        //this.endGamebtn = this.add.button(1400, 800, 'restartbutton', this.gameOver, this, 1, 0, 1);
        var state = this;
        FB.api(
            "/" + FBAppID + "/scores",
            function (response) {
//                    console.log(response);
//                    console.log(response.data);
                if (response && !response.error) {
                    for (var i = 0; i < response.data.length && i < 5;i++) {
                        var user = new Cooking.FBUser(state,response.data[i].user,response.data[i].score,i * 320 + 10, 840);
                    }
                } 
            }
        );      
//        
    },    
    
    create : function ()
    {
         
        noOfGuess = roundNumber + 1;
        roundTimer = roundNumber - 0.1;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.position = [Phaser.TOP_LEFT,Phaser.TOP_CENTER,Phaser.TOP_RIGHT,Phaser.BOTTOM_RIGHT,Phaser.BOTTOM_LEFT,Phaser.BOTTOM_CENTER,Phaser.LEFT_CENTER,Phaser.RIGHT_CENTER];
        fillers = ["Espresso","DoubleEspresso","HotWater","MilkFoam","SteamedMilk","ChocolatePowder","ChocolateSyrup","WhippedCream","Marshmallows"];
        this.time.events.add(Phaser.Timer.SECOND * 1,this.recipeDisplay,this);
        this.physics.arcade.enable(centerPic);
        this.order();
        draggedItemsNumber = 0;
    },
    
    muteAudio : function ()
    {
        
        if (!this.game.sound.mute) 
        {
            this.mutebtn.frame = 1;
        } 
        else 
        {
            this.mutebtn.frame = 0;
        }        
        this.game.sound.mute =! this.game.sound.mute;  
    },
    
    
    order : function ()
    {
        this.orderGenerate = this.randomNumber(recipeList.length);
        this.orderName = recipeList[this.orderGenerate].name;
        this.orderNumber = recipeList[this.orderGenerate];
        this.noofSugar = this.randomNumber(4);
        this.ingredientsLength = recipeList[this.orderGenerate].ingredients.length;
//        console.log("orderName Is :  "+ this.orderName);
//        console.log("order Ingrediens are :  "+ recipeList[this.orderGenerate].ingredients);
//        console.log("orderName Is :  "+ this.noofSugar);
//        console.log(this.orderName + "  ingredients length is : "+ this.ingredientsLength);        
    },
    
    scoreBoard : function ()
    {
        this.extendedScoreBoardpic = this.add.image(160,250,'scoreboardextension');
        var scoreboardPic = this.add.image(160,120,'Scoreboard'); 
        this.restartbtn = this.add.button(160, 265, 'restartbutton', this.restart, this, 1, 0, 1);
        this.restartbtn.anchor.set(0.5);
        this.restartbtn.visible = false;
        this.extendedScoreBoardpic.scale.setTo(0.7);
        this.extendedScoreBoardpic.anchor.set(0.5); 
        this.extendedScoreBoardpic.visible = false;
        scoreboardPic.anchor.set(0.5);
        scoreboardPic.scale.setTo(0.2);
        scoreboardPic.inputEnabled = true;
        scoreboardPic.events.onInputDown.add(this.extendScoreBoard,this);        
        scoreboardPic.input.bringToTop = false; 
    },
    
    extendScoreBoard : function ()
    {
        this.extendedScoreBoardpic.visible =! this.extendedScoreBoardpic.visible;
        this.restartbtn.visible =! this.restartbtn.visible;        
    }, 
    
    
    showIngrediants : function ()
    {
        for (var i = 0; i < this.ingredientsLength; i++) 
        {
            var randpos = this.position[Math.floor(Math.random()*this.position.length)];
            var index = this.position.indexOf(randpos);
            this.position.splice(index,1);
            rect = new Phaser.Rectangle(320, 200, 1000,500);
            var ingHolder = recipeList[this.orderGenerate].ingredients[i];
            var indexofName = fillers.indexOf(ingHolder);
            fillers.splice(indexofName,1);
            var ingredients = this.add.sprite(this.world.randomX,this.world.randomY,ingHolder);
            ingredients.alignIn(this.game.world.bounds, Phaser.CENTER);
            ingredients.anchor.set(0.5);
            ingredients.scale.setTo(0.3);
            ingredients.alignTo(rect,randpos); 
            ingredients.inputEnabled = true;
            ingredients.input.enableDrag();
            ingredients.input.bringToTop = false; 
            ingredients.num = i + 1;
            this.physics.arcade.enable(ingredients);
            ingredients.state = this;
            originalPics[i] = ingredients;
            this.createPoly();
            this.emptySprite = this.add.sprite(500,630,'emptysprite');
            pol.alpha = 0;
            this.emptySprite.alpha = 0;
            //console.log("The original ingrediants are : " + recipeList[this.orderGenerate].ingredients);
            //console.log("Spot left for fillers is : "+ this.position.length);            
        }
        
        var fillerslength = this.position.length;
        this.fillRest (fillerslength); 
    },
    
    fillRest : function (len)
    {
        /// Fillers after showing the actual ingrediants
        
        for (var i = 0; i < len; i++) 
        {
            var randpos = this.position[Math.floor(Math.random()*this.position.length)];
            var index = this.position.indexOf(randpos);
            this.position.splice(index,1);
            var localrand = this.randomNumber(fillers.length);
            var fillerPics = this.add.sprite(this.world.randomX,this.world.randomY,fillers[localrand]);
            var ind = fillers.indexOf(fillers[localrand]);
            fillers.splice(ind,1);
            fillerPics.alignIn(this.game.world.bounds, Phaser.CENTER);
            fillerPics.anchor.set(0.5);
            fillerPics.scale.setTo(0.3);
            fillerPics.alignTo(rect,randpos); 
            fillerPics.inputEnabled = true;
            fillerPics.input.enableDrag();
            fillerPics.input.bringToTop = false; 
            fillerPics.num = i + 1;
            this.physics.arcade.enable(fillerPics);
            fillerPics.state = this;
            fillPics[i] = fillerPics; 
        }
    },
    
    randomNumber: function (nu)
    {
        var randNum = Math.floor((Math.random() * nu));
        return  randNum;    
    },

    createList : function (listNum)
    {
        userList.push(listNum);
        if (userList.length === recipeList[this.orderGenerate].ingredients.length) 
        {
            this.arrayChecker(recipeList[this.orderGenerate].ingredients,userList);  
        }   
    },
    
    arrayChecker : function (definedArray,userArray)
    {
        
//        console.log("Entered Array Check");
        var compare = definedArray.every(function(element, index)
        {
                return element === userArray[index];
        });
        
        if (compare)
        {
//            console.log("The Arrays ARE SAME @@##@@ WIN @@##@@");
            //this.scoreMultiplier(this.tScore,roundNumber);
            //console.log("Multiplying : "+ this.tScore);
//            console.log("WELL DONE   + " + recipeList[this.orderGenerate].price);
            this.totalPopup(recipeList[this.orderGenerate].price,"+");
            this.totalPrice(recipeList[this.orderGenerate].price);
            this.jingles_happy.play();             
        }
        else
        {
//            console.log("The Arrays ARE NOT SAME @@##@@ LOOSE @@##@@");
//            console.log("OOOHH      - " + recipeList[this.orderGenerate].price);
            this.totalPopup(recipeList[this.orderGenerate].price,"-");
            this.penalty(recipeList[this.orderGenerate].price);
            this.jingles_sad.play();
        } 
        this.scoreTextDisplay();
    },
    
    totalPrice :function (receivedTotal)
    {
        //console.log("The Total Amount is " + this.total);
        if (this.game.finalTotal === undefined) 
        {
            this.game.finalTotal = 0;
        }
        this.game.finalTotal = this.game.finalTotal + receivedTotal;
        this.game.finalTotal = Math.round(this.game.finalTotal * 100) / 100;
    },
    
    penalty :function (receivedTotal)
    {
        //console.log("The Total Amount is " + this.total);
        if (this.game.finalTotal === undefined) 
        {
            this.game.finalTotal = 0;
        }
        this.game.finalTotal = this.game.finalTotal - receivedTotal;
        this.game.finalTotal = Math.round(this.game.finalTotal * 100) / 100;
    },
    
    totalPopup : function (tot,sign)
    {
//        console.log("Creating popup text");
        var popUpText = this.add.text(this.world.centerX,this.world.centerY,'',{font:"150px Arial",align:"center",fill:"#ffffff"});
        popUpText.anchor.set(0.5);
        popUpText.bringToTop();
        if (sign === '+') 
        {
            popUpText.fill = '#85d123';
        }
        else if (sign === '-') 
        {
            popUpText.fill = '#ed2525';
        }
        popUpText.setText(sign +''+ tot);
        var popupTween = this.add.tween(popUpText).to({y: 250},1500, Phaser.Easing.Linear.None, true);
        var popTween = this.add.tween(popUpText).to({alpha: 0},1500, Phaser.Easing.Linear.None, true);
        //popTween.onComplete.add(this.resetText,this);
        popTween.onComplete.add(this.respawn,this);
    },

    checkCollision  : function (pic)
    {
        this.physics.arcade.overlap(pic,centerPic, function ()
        {
           //this.state.createList(this.num);
//            console.log("The collided pic is : " + pic.key);
            var key = pic.key;            
            this.state.createList(pic.key);
            this.state.noOfLiquidItemsFinder(pic.key);
            draggedItemsNumber ++;
            this.state.collitionAnim(key,draggedItemsNumber);            
            pic.kill();           
        },null,pic);
    },
    
    
    noOfLiquidItemsFinder : function ()
    {
        this.noOfLiquid = 0;
        var rec = recipeList[this.orderGenerate].ingredients;
        for (var i in recipeList[this.orderGenerate].ingredients) 
        {
            if (iColor[rec[i]].state === "liquid") 
            {
                this.noOfLiquid ++;                
            }
        }
//        console.log( "No of Liquid Items is :   "+ this.noOfLiquid);
    },
    
    collitionAnim : function (coPic,dItemsNo)
    {
              
        this.bottom = 640;        
        this.top = 440;        
        this.value = (this.bottom - this.top)/ this.noOfLiquid;        
        this.yPos = this.bottom - this.value * dItemsNo;
//        console.log("The number of items dragged : " + dItemsNo);              
        var currentColor = iColor[coPic];
//        console.log(currentColor); 
        this.completeMask = false;      
        
        if(userList.length > 1)
        {
            this.prevItem = this.lastItemFinder();
            this.prevState = iColor[this.prevItem].state;
            if (currentColor.state === "topping") 
            {      
                this.crackSingle.play();
                this.snapToppings(this.previousYPos,coPic);
//                console.log("the yPosition is : "+this.yPos);
//                console.log("the PreviousyPosition is : "+this.previousYPos);
//                console.log("*************** Created Toppings ********************");
                this.aliveTopping = true;
                this.createTopping = true;
            }
            if (currentColor.state === "liquid") 
            {
                //this.aliveTopping = false;
                this.bubbleSingle.play();
                this.createTopping = false;
                this.previousLiquidColor = "";                
//                console.log(this.prevItem);
//                console.log(this.prevState);
                if (this.prevState === "liquid") 
                {
                    this.previousLiquidColor = iColor[this.prevItem];       
                }
                if (this.previousLiquidColor === "") 
                {
                    var lastSub = currentColor.fill.substring(2,8);                                              
                }
                else
                {
                    lastSub = this.previousLiquidColor.fill.substring(2,8);
                }
//                console.log(this.previousLiquidColor);
                var currentSub = currentColor.fill.substring(2,8);
                var newFill = this.colorAverage(lastSub,currentSub);
                newFill = "0x" + newFill;
                this.maskSprite(this.yPos,newFill);
//                console.log(newFill);
            }
            if (this.prevState === "topping" && this.aliveTopping === true ) 
            {
                this.moveTopping(this.bottom);
            }
            
        }
        else
        {
            if (currentColor.state === "liquid") 
            {
                this.maskSprite(this.yPos,currentColor.fill);
                this.createTopping = false;
                this.bubbleSingle.play();
            }           
            
            if (currentColor.state === "topping") 
            {
                this.crackSingle.play();
                this.snapToppings(this.bottom,coPic);
//                console.log("the yPosition is : "+this.yPos);
//                console.log("@@@@@@@@@@@@@@@@@@@@ Created Toppings @@@@@@@@@@@@@@@@@@@@@@@@@");
                this.previousLiquidColor = "";
                this.aliveTopping = true;
                this.createTopping = true;
            }
        }
        this.previousYPos = this.yPos;
    },
    
    
    lastItemFinder : function ()    
    {
        var lastItem = userList[userList.length - 2];                        
        return lastItem;                 
    },
       
    
    colorAverage : function (c1,c2)
    {
        var c = "";
        for(var i = 0; i<3; i++) 
        {
        var sub1 = c1.substring(2*i, 2+2*i);
        var sub2 = c2.substring(2*i, 2+2*i);
        var v1 = parseInt(sub1, 16);
        var v2 = parseInt(sub2, 16);
        var v = Math.floor((v1 + v2) / 2);
        var sub = v.toString(16).toUpperCase();
        var padsub = ('0'+sub).slice(-2);
        c += padsub; 
        }
//        console.log(c);
        return c;
    },
    
    snapToppings : function (b,name) 
    {
        this.toppingTmage = this.game.add.image(800,640,name+"_coffeecup");
//        this.game.physics.startSystem(Phaser.Physics.ARCADE);
//        console.log("Spawning topping @ : 800, "+b);        
        this.toppingTmage.alpha = 0;
        this.toppingTmage.anchor.set(0.5);        
        this.toppingTmage.scale.setTo(0.3);
        this.toppingTmage.moveUp();
        
        this.toppingGroup.add(this.toppingTmage);
        var startfill = this.game.add.tween(this.toppingTmage).from({y:640},500, Phaser.Easing.Linear.None, true);
        var liquidfill = this.game.add.tween(this.toppingTmage).to({y:b},500, Phaser.Easing.Linear.None, true);
        var alphafill = this.game.add.tween(this.toppingTmage).to({alpha: 1},500, Phaser.Easing.Linear.None, true);
        
    }, 
    
    moveTopping : function (b)
    {
        //this.toppingTmage.y = this.previousYPos;
        var startfill = this.game.add.tween(this.toppingTmage).from({y:640},1500, Phaser.Easing.Linear.None, true);
        var liquidfill = this.game.add.tween(this.toppingTmage).to({y:b},500, Phaser.Easing.Linear.None, true);
        var alphafill = this.game.add.tween(this.toppingTmage).to({alpha: 1},500, Phaser.Easing.Linear.None, true);
    },
    
    
    maskSprite : function (b,fil)
    {
        this.emptySprite.y = b;
//        console.log("Masking Position is "+b);
        var startfill = this.game.add.tween(this.emptySprite).from({y:this.bottom},1500, Phaser.Easing.Linear.None, true);
        var liquidfill = this.game.add.tween(this.emptySprite).to({y:b},1500, Phaser.Easing.Linear.None, true);
        var alphafill = this.game.add.tween(this.emptySprite).to({alpha: 1},1500, Phaser.Easing.Linear.None, true);
        this.time.events.add(Phaser.Timer.SECOND * 2, function() { 
            if (this.aliveTopping === true) 
            {
                this.moveTopping(b);
            } 
        }, this);
        //alphafill.onCompleteCallback(this.setCompleteMaskTrue);
        //this.emptySprite.alpha = 1;
        this.emptySprite.mask = pol;       
        //this.emptySprite.tint = fil;        
        this.tweenTint(this.emptySprite, previousColor, fil, 1000); 
        var previousColor = fil;
    },
    
    setCompleteMaskTrue : function ()
    {
//        console.log("setting complete mask to true");
        if (this.aliveTopping === true) 
        {
            this.completeMask = true;
        }       
    },
    
    tweenTint : function (obj, startColor, endColor, time) 
    {    
        var colorBlend = {step: 0};    
        var colorTween = this.game.add.tween(colorBlend).to({step: 100}, time);        
        colorTween.onUpdateCallback(function() 
        {      
             obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);   
        });       
        obj.tint = startColor;            
        colorTween.start();
    },
    
    createPoly : function()
    {
        var polygon = new Phaser.Polygon();        
        polygon.setTo([new Phaser.Point(700,350),new Phaser.Point(904,350),new Phaser.Point(873,640),new Phaser.Point(730,640)]);
        pol = this.game.add.graphics(0, 0);
        pol.beginFill(0x34160d);
        pol.drawPolygon(polygon.points);
        pol.endFill();
    },
    
    respawn : function ()
    {
        roundNumber ++;
        userList = [];
        recipe = [];
        this.emptySprite.kill();
        
        for (var i = 0; i < originalPics.length; i++) 
        {
            originalPics[i].kill();
        }
        for (var i = 0; i < fillPics.length; i++) 
        {
            fillPics[i].kill();
        }
        
        if (this.aliveTopping === true) 
        {
//            console.log("Killing Topping Image");
            this.toppingTmage.kill();
            this.aliveTopping = false;
        }       
        this.toppingGroup.callAll('kill');
        this.permOrderName.kill();
        this.create();       
    },
    
    recipeDisplay : function ()
    {
        this.numberDisplay(recipe);
    },
    
    numberDisplay : function ()
    {
        this.displayPics = this.add.text(this.world.centerX,this.world.centerY,this.orderName,{font:"150px Arial",align:"center",fill:"#ffffff"});
        this.displayPics.anchor.set(0.5);        
        var setAlphaTween  = this.add.tween(this.displayPics).to({alpha: 0},1500, Phaser.Easing.Linear.None, true);        
        setAlphaTween.onComplete.add(this.orderNamePopUp,this);
        this.time.events.add(Phaser.Timer.SECOND * 2,this.showIngrediants,this);        
    },
    
    orderNamePopUp : function ()
    {
        this.permOrderName = this.add.text(220,163,this.orderName,{font:"20px Arial",align:"left",fill:"#ffffff"});
        this.permOrderName.anchor.set(0.5);
        var resetAlphaTween = this.add.tween(this.displayPics).from({scale: 0},1500, Phaser.Easing.Bounce.In, true);
        var resetAlphaTween = this.add.tween(this.displayPics).to({scale: 1},1500, Phaser.Easing.Bounce.In, true);       
    },
    
    countDownTimer : function ()
    {
        //this.timeLimitSetter(roundNumber);
        timer = this.time.create(); 
        var minute = Phaser.Timer.MINUTE*3;
        var second = Phaser.Timer.SECOND*0;
        timerEvent = timer.add(minute+second, this.endTimer, this);
        timer.start();
        this.timeDisplay();
        this.startTimer = true;
    },   
    
    timeDisplay: function () 
    {
        if (timer.running) 
        {
            timeText = this.add.text( this.world.centerX, 20,"",{font:"35px Arial",align:"center",fill:"#ffffff"});
            timeText.anchor.set(0.5);
            timeText.bringToTop();
        }        
    },
    
    timeUpdater : function ()
    {
        timeText.setText("Time : " + this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)));
        this.tScore = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));       
    },
    
    resetText : function ()
    {
        timeText.destroy();
    },
    
    endTimer : function ()
    {
        timer.stop();
        this.gameOver();
    },
    
    formatTime: function(s) 
    {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2)+ ":" + seconds.substr(-2);
    },   
    
    scoreTextDisplay :function ()
    {       
        if (!this.scoreTextCreate) 
        {
            this.scoreText = this.add.text(210,120,"$ "+"0.00",{font:"20px Arial",align:"center", fill:"#ffffff"});
            this.scoreTextCreate = true;
            this.scoreText.anchor.set(0.5);
            this.scoreText.bringToTop();
            this.scoreText.scale.x = 0.2;
            this.scoreText.scale.y = 0.2;
            this.add.tween(this.scoreText.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);
        }
        else
        {
            this.scoreText.scale.x = 0.2;
            this.scoreText.scale.y = 0.2;
            if (this.game.finalTotal < 0) 
            {
                //console.log("Below Zero");
                this.scoreText.fill = "#e52323";
            }
            else{
                this.scoreText.fill = "#27ae60";
            }
            var tot = this.game.finalTotal;
            this.scoreText.setText("$ "+""+ tot); 
            this.add.tween(this.scoreText.scale).to({x:1, y:1},1500,Phaser.Easing.Elastic.Out,true);            
        } 
    },
    
    restart : function ()
    {
        this.game.buttonAudio.play();
        this.state.start("MainMenu");
    },
    
    gameOver : function ()
    {
        this.state.start("EndGame");
    },
    
    render : function () 
    {
        //this.game.debug.inputInfo(32,32);
    },
    
    
    update : function ()
    {
        for (var i = 0; i < originalPics.length; i++)
        {
            if (originalPics[i].input.isDragged) 
            {
                this.checkCollision(originalPics[i]);   
            }
            
        }
        
        for (var i = 0; i < fillPics.length; i++)
        {
            if (fillPics[i].input.isDragged) 
            {
                //console.log("fillers Dragged");
                this.checkCollision(fillPics[i]);   
            }
            
        }
        if (this.startTimer) 
        {
            this.timeUpdater();       
        }     
        
    }
};




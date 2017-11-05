/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Phaser */

var Cooking = Cooking || {};

Cooking.game = new Phaser.Game({width: 1600, height: 900, renderType: Phaser.AUTO, parent:''});

//TODO: Add game states in here

Cooking.game.state.add('Boot', Cooking.Boot);
Cooking.game.state.add('Load', Cooking.Load);
Cooking.game.state.add('Play', Cooking.Play);
Cooking.game.state.add('Ingredients', Cooking.Ingredients);
Cooking.game.state.add('Howto', Cooking.Howto);
Cooking.game.state.add('EndGame', Cooking.EndGame);
Cooking.game.state.add('MainMenu', Cooking.MainMenu);
Cooking.game.state.start("Boot");

var topScore = 0;

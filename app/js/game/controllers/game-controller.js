'use strict';

module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
  this.gamerLocation = 'start';
  this.gamerHasSwag = false;
  this.gamerHasRubies = false;
  this.command =  '';
  this.gamelog = [];
  this.location = {
    'start': {
      commands: ['Enter ? for available commands at any time.'],
      prompt: 'Welcome to Swag Survivor. You are in a room with the Swag Killer monster.'
    },
    'swagroom': {
      commands: ['pick up swag', 'look for rubies', 'swag talk says <message>', 'walk through the portal'],
      prompt: 'You are in the swag room. There is some sick swag on the ceiling.',
      promptSwag: 'Now you got the swag, go swag on that swag monster!',
      promptRubies: 'Damn dawg, you shinin! Go shine on that swag monster!'
    },
    'monsterroomwithoutswag': {
      commands: ['walk through the portal', 'say <message>', 'swag on the swag monster'],
      prompt: 'You are swagless in a room with the swag monster.',
      promptSwagLessFight: 'Damn dawg, you challenged the swag monster with no swag! He swagged on you mofo! Go get you some swag!'
    },
    'monsterroomwithswag': {
      commands: ['swag out'],
      prompt: 'You are swagged out in a room with the swag monster, swag on that mofo.',
      promptSwag: 'Damn dawg, you swagged on that mofo. Now do your dance!'
    }
  };
}

GameController.prototype.startGame = function() {
  this.gamelog.push({
    src: 'game',
    msg: this.location.start.prompt
  });
  this.location.start.commands.forEach((item) => {
    this.gamelog.push({
      src: 'command',
      msg: item
    });
  });
  this.gamerLocation = 'monsterroomwithoutswag';
};

GameController.prototype.processInput = function() {
  this.gamelog.push({
    src: 'user',
    msg: this.command
  });

  switch (this.command) {
  case '?': {
    this.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;
  }
  case 'walk through the portal': {
    let currentLocation = this.gamerLocation;
    if (currentLocation === 'swagroom') {
      currentLocation = this.gamerLocation = this.gamerHasSwag ? 'monsterroomwithswag' : 'monsterroomwithoutswag';
      this.gamelog.push({
        src: 'game',
        msg: this.location[currentLocation].prompt
      });
    } else {
      this.gamerLocation = 'swagroom';
      this.gamelog.push({
        src: 'game',
        msg: this.location.swagroom.prompt
      });
    }

    this.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;
  }

  case 'pick up swag': {
    this.gamerHasSwag = true;
    this.gamelog.push({
      src: 'game',
      msg: this.location.swagroom.promptSwag
    });
    break;
  }

  case 'look for rubies': {
    this.gamerHasRubies = false;
    this.gamelog.push({
      src: 'game',
      msg: this.location.swagroom.promptRubies
    });
    break;
  }

  case 'swag on the swag monster': {
    this.gamerHasSwag = false;
    this.gamelog.push({
      src: 'game',
      msg: this.location.monsterroomwithoutswag.promptSwagLessFight
    });
    break;
  }

  case 'swag out': {
    this.gamerHasSwag = true;
    this.gamelog.push({
      src: 'game',
      msg: this.location.monsterroomwithswag.promptSwag
    });
    break;
  }

  default: {

    let sayArr = this.command.split(' ');
    if (sayArr[0] === 'say') {
      this.gamelog.push({
        src: 'game',
        msg: sayArr[1] || 'SAY SOMETHING!'
      });
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'BAD COMMAND: Enter ? to see commands'
      });
    }
  }
  }
  this.command = '';
};

GameController.prototype.currentHelpMsg = function() {
  var str = '';
  switch (this.gamerLocation) {

  case 'swagroom':
    this.location.swagroom.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomwithoutswag':
    this.location.monsterroomwithoutswag.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomwithswag':
    this.location.monsterroomwithswag.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;
  }
  return str;
};

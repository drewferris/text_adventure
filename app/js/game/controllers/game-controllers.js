'use strict';

module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
  this.model = {
    gamerLocation: 'start',
    gamerHasSwag: false,
    command: '',
    gamelog: [],
    location: {
      'start': {
        commands: ['Enter ? for available commands at any time.'],
        prompt: 'Welcome to Swag Survivor. You are in a room with the Swag Killer monster.'
      },
      'swagroom': {
        commands: ['pick up swag', 'look for rubies', 'say <message>', 'walk through the portal'],
        prompt: 'You are in the swag room. There is some sick swag on the ceiling.'
      },
      'monsterroomwithoutswag': {
        commands: ['walk through the portal', 'say <message>'],
        prompt: 'You are swagless in a room with the swag monster.'
      },
      'monsterroomwithswag': {
        commands: ['swag out'],
        prompt: 'You are swagged out in a room with the swag monster, swag on that mofo.'
      }
    }
  };
}

GameController.prototype.startGame = function() {
  this.model.gamelog = [];
  this.model.gamerLocation = 'start';
  this.model.gamerHasSwag = false;
  this.model.command = '';
  this.model.gamelog.push({
    src: 'game',
    msg: this.model.location.start.prompt
  });
  this.model.location.start.commands.forEach(function(item) {
    this.model.gamelog.push({
      src: 'command',
      msg: item
    });
  });
  this.model.gamerLocation = 'monsterroomwithoutswag';
};

GameController.prototype.processInput = function() {
  this.model.gamelog.push({
    src: 'user',
    msg: this.model.command
  });

  switch (this.model.command) {
  case '?': {
    this.model.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;
  }
  case 'walk through the portal': {
    let currentLocation = this.model.gamerLocation;
    if (currentLocation === 'swagroom') {
      currentLocation = this.model.gamerLocation = this.model.gamerHasSwag ? 'monsterroomwithswag' : 'monsterroomwithoutswag';
      this.model.gamelog.push({
        src: 'game',
        msg: this.model.location[currentLocation].prompt
      });
    } else {
      this.model.gamerLocation = 'swagroom';
      this.model.gamelog.push({
        src: 'game',
        msg: this.model.location.swagroom.prompt
      });
    }

    this.model.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;
  }

  case 'pick up swag': {
    this.model.gamerHasSwag = true;
    break;
  }

  default: {

    let sayArr = this.model.command.split(' ');
    if (sayArr[0] === 'say') {
      this.model.gamelog.push({
        src: 'game',
        msg: sayArr[1] || 'SAY SOMETHING!'
      });
    } else {
      this.model.gamelog.push({
        src: 'game',
        msg: 'BAD COMMAND: Enter ? to see commands'
      });
    }
  }
  }
  this.model.command = '';
};

GameController.prototype.currentHelpMsg = function() {
  var str = '';
  switch (this.model.gamerLocation) {

  case 'swagroom':
    this.model.location.swagroom.commands.forEach(function (item, index) {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomwithoutswag':
    this.model.location.monsterroomwithoutswag.commands.forEach(function(item, index) {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;
  }
  return str;
};

const angular = require('angular');

require('../app/js/client.js');

require('angular-mocks');

describe('controller tests', () => {
  let drew;

  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(function($controller) {
      drew = new $controller('GameController');
    });
  });

  it('should have a property gamerLocation', () => {
    expect(drew.gamerLocation).toBe('start');
  });

  it('should start a game', () => {
    expect(drew.gamelog.length).toBe(0);
  });

  it('should have a property gamerHasSwag', () => {
    expect(drew.gamerHasSwag).toBe(false);
  });

  it('should have a property gamerHasRubies', () => {
    expect(drew.gamerHasRubies).toBe(false);
  });

  it('should have a property command', () => {
    expect(drew.command).toBe('');
  });

  it('should expect location to be an object', () => {
    expect(typeof drew.location).toBe('object');
  });

  it('should expect start location prompt to be a string', () => {
    expect(typeof drew.location.start.prompt).toBe('string');
  });

  describe('startGame fucntion tests', () => {
    beforeEach(() => {
      drew.startGame();
    });

    it('startGame function should prompt correctly work', () => {
      expect(drew.location.start.prompt).toBe('Welcome to Swag Survivor. You are in a room with the Swag Killer monster.');
    });

    it('gamelog should have things in it', () => {
      expect(drew.gamelog.length).not.toBe(-1);
    });

    it('gamerLocation should be monsterroomwithoutswag', () => {
      expect(drew.gamerLocation).toBe('monsterroomwithoutswag');
    });
  });

  describe('processInput function tests for monsterroomwithoutswag', () => {
    beforeEach(() => {
      drew.startGame();
      drew.gamerLocation = 'monsterroomwithoutswag';
    });

    it('swag on the swag monster command should prompt properly', () => {
      drew.command = 'swag on the swag monster';
      drew.processInput();
      expect(drew.gamelog[3].msg).toBe('Damn dawg, you challenged the swag monster with no swag! He swagged on you mofo! Go get you some swag!');
    });

    it('? command should prompt command options properly', () => {
      drew.command = '?';
      drew.processInput();
      expect(drew.gamelog[3].msg).toBe('walk through the portal | say <message> | swag on the swag monster');
    });

    it('should say something when say<message> command is entered', () => {
      drew.command = 'say hello';
      drew.processInput();
      expect(drew.gamelog[3].msg).toBe('hello');
    });
  });

  describe('processInput function tests for swag room', () => {
    beforeEach(() => {
      drew.startGame();
      drew.command = 'walk through the portal';
      drew.processInput();
    });

    it('should prompt properly upon entering the swag room', () => {
      expect(drew.gamelog[3].msg).toBe('You are in the swag room. There is some sick swag on the ceiling.');
    });

    it('should prompt options properly upon entering the swag room', () => {
      expect(drew.gamelog[4].msg).toBe('pick up swag | look for rubies | swag talk says <message> | walk through the portal');
    });

    it('should pick up swag properly', () => {
      drew.command = 'pick up swag';
      drew.processInput();
      expect(drew.gamelog[6].msg).toBe('Now you got the swag, go swag on that swag monster!');
    });
  });
});

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
  });
});

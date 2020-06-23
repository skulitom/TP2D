module.exports = Object.freeze( new function() {
    this.LOWEST_FREQUENCY= 50;
    this.FREQUENCY_STEP= 10;
    this.MAX_TIME= 100000;
    this.MAX_HEALTH= 100;
    this.LOOT_COEF= 6;
    this.BOSS_ENEMY_COEF= 5;
    this.ENEMY_COEF= 1;
    this.INITIAL_FREQUENCY= 200;
    this.POINTS_ENEMY_KILLED= 2;
    this.POINTS_ENEMY_INJURED= 1;
    this.POINTS_ENEMY_MISSED= -1;
    this.POINTS_ENEMY_MISSED_RESET= -2;
    this.POINTS_NOBODY_HIT= -0.5;
    this.DAMAGE_COEF= 10;
    this.PLAYER_HIT_RADIUS= 40;
    this.RED= {
        r: 255,
        g: 0,
        b: 0,
    };
    this.GREEN= {
        r: 0,
        g: 255,
        b: 0,
    };
    this.BLUE= {
        r: 0,
        g: 0,
        b: 255,
    };
    this.YELLOW= {
        r: 255,
        g: 255,
        b: 0,
    };
    this.EXPLOSION_RADIUS= 100;
    this.GAME_WIDTH= 1920;
    this.GAME_HEIGHT= 1080;
    this.POSITION_SHIFT= 100;
    this.PLAYER_POSITIONS= [
        [Math.floor(this.GAME_WIDTH/2 - this.POSITION_SHIFT), Math.floor(this.GAME_HEIGHT/2 - this.POSITION_SHIFT)],
        [Math.floor(this.GAME_WIDTH/2 - this.POSITION_SHIFT), Math.floor(this.GAME_HEIGHT/2 + this.POSITION_SHIFT)],
        [Math.floor(this.GAME_WIDTH/2 + this.POSITION_SHIFT), Math.floor(this.GAME_HEIGHT/2 - this.POSITION_SHIFT)],
        [Math.floor(this.GAME_WIDTH/2 + this.POSITION_SHIFT), Math.floor(this.GAME_HEIGHT/2 + this.POSITION_SHIFT)]
    ];
    this.PLAYER_SIDE_COLOR = [
        this.RED,
        this.BLUE,
        this.GREEN,
        this.YELLOW
    ];
});
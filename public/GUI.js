class GUI
{

    players = [];

    constructor(players)
    {

        this.players = players;

    }
  
    draw()
    {
  
        let id = 0;

        const startPosX = 50;
        const startPosY = 100;

        const winWidth = 1366;
        const winHeigh = 768;

        for (let [id, pl] of this.players)
        {
        
            const color = pl.getColor();
            const score = pl.getScore();

            stroke(200);
            fill(color.r, color.g, color.b);
            text(score, winWidth * id - startPosX, startPosY);

            id = id + 1;

        }

    }
  
  }
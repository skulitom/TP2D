class GUI
{

    constructor(players)
    {

        this.players = players;

    }
  
    draw()
    {
  

        const startPosX = -20;
        const startPosY = 20;

        const winWidth = 1366;
        const winHeigh = 768;

        let index = 0;
        for (let [id, pl] of this.players)
        {
        
            const color = pl.getColor();
            const score = pl.getScore();
            const strScore = "Player " + (index + 1) + ": " + score;

            //stroke(200);
            textAlign(LEFT, TOP);
//            if (index == 0)
//            {
//                textAlign(LEFT, TOP);
//            }
//            else if (index == 1)
//            {
//                textAlign(RIGHT, TOP);
//            }
            textSize(32);
            fill(0);
            strokeWeight(3);
            text(strScore, - startPosX, startPosY + 30 * index);
            fill(color.r, color.g, color.b);
            strokeWeight(1);
            text(strScore, - startPosX, startPosY + 30 * index);

            index = index + 1;

        }

    }
  
  }
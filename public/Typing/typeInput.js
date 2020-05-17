class TypeInput {
    
    currInput = [];
    side;
    owner;

    typeRenderer;
    
    textColor = { "r": 0, "g": 0, "b": 0 };

    tManager

    setup(inOwner, side, tManager)
    {

        this.tManager = tManager;

        this.owner = inOwner;
        this.side = side;

        if (side == 0)
        {
        
            this.textColor.g = 255;
            
        }
        else if (side == 1)
        {
        
            this.textColor.b = 255;

        }

        this.typeRenderer = new TypeRenderer();
        this.typeRenderer.setup(this.textColor);

    }

    updateInKey(key)
    {

        if (((key >= 'a') && (key <= 'z')) || ((key >= 'A') && (key <= 'Z')) || (key == ' '))
        {

            this.currInput.push(key);
            //console.log("new input");
            //console.log(this.currInput);

            //this.typeRenderer.setText(this.currInput);
            const result = this.tManager.setTyping(this.currInput);
            //console.log(result);
            if ((result == TM_TYPING_FULLMATCH) || (result == TM_TYPING_TYPO_RESET))
            {
                this.currInput = [];
                this.typeRenderer.setText(this.currInput);
            }
            else if ((result == TM_TYPING_TYPO) || (result == TM_TYPING_TYPO_NO_MATCH))
            {
                this.currInput.pop();
            }

        }

    }

    resetInput()
    {
    
        this.currInput = [];
        this.typeRenderer.setText(this.currInput);
        this.tManager.resetTyping();
        //console.log("pop input");
        //console.log(this.currInput);
    
    }
  
    draw()
    {

        if (this.typeRenderer)
        {

            this.typeRenderer.draw();
            
        }
        
    }
  
  }
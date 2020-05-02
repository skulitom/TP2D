class TypeInput {
    
    currInput = [];
    side;
    owner;

    typeRenderer;
    
    textColor = { "r": 0, "g": 0, "b": 0 };

    setup(inOwner, side)
    {

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
            console.log("new input");
            console.log(this.currInput);

            this.typeRenderer.setText(this.currInput);

        }

    }
  
  
    draw()
    {

        if (this.typeRenderer)
        {

            this.typeRenderer.draw();
            
        }
        
    }
  
  }
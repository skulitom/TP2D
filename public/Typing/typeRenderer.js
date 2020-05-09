class TypeRenderer {
    
    textToRender = "";
    side;
    owner;
    
    textColor = { "r": 0, "g": 0, "b": 0 };


    setup(textColor)
    {

        this.textColor = textColor;

    }

    setText(text)
    {

        this.textToRender = join(text, '');
        //console.log("set text");
        //console.log(this.textToRender);

    }

    draw()
    {

        textSize(32);
        fill(this.textColor.r, this.textColor.g, this.textColor.b);
        text(this.textToRender, 10, 30);

    }
  
  }
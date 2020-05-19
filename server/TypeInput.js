const consts = require('./constants/TypingConstants');

class TypeInput {

    currInput = [];
    side;

    textColor = { r: 0, g: 0, b: 0 };

    tManager;

    constructor(side, tManager)
    {

        this.tManager = tManager;

        this.side = side;

        if (side === 0)
        {

            this.textColor.r = 255;

        }
        else if (side === 1)
        {

            this.textColor.b = 255;

        }
        else if (side === 2)
        {
            this.textColor.g = 255;
        }

    }

    updateInKey(key)
    {

        if (((key >= 'a') && (key <= 'z')) || ((key >= 'A') && (key <= 'Z')) || (key == ' '))
        {

            this.currInput.push(key);
            //console.log("new input");
            //console.log(this.currInput);

            const result = this.tManager.setTyping(this.textColor, this.currInput);
            //console.log(result);
            if ((result == consts.TM_TYPING_FULLMATCH) || (result == consts.TM_TYPING_TYPO_RESET))
            {
                this.currInput = [];
            }
            else if ((result == consts.TM_TYPING_TYPO) || (result == consts.TM_TYPING_TYPO_NO_MATCH))
            {
                this.currInput.pop();
            }
            return result;

        }
        return undefined;

    }

    resetInput()
    {

        this.currInput = [];
        this.tManager.resetTyping();
        //console.log("pop input");
        //console.log(this.currInput);

    }

}

module.exports = TypeInput;
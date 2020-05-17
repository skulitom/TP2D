const consts = require('./constants/TypingConstants');

class TypeManager
{

    targetWords;
    currentEnemyId;
    numOfTypos = 0;



    constructor()
    {

        this.targetWords = new Map();

    }

    register(enemy)
    {

        this.targetWords.set(enemy.getId(), enemy);
        //console.log("New enemy registered");
        //console.log(enemy.getId());
        //console.log(enemy);

    }

    resetTyping()
    {

        if (this.currentEnemyId)
        {

            const en = this.targetWords.get(this.currentEnemyId);
            en.setTypedText("");
            this.currentEnemyId = undefined;

        }

    }

    setTyping(text)
    {

        //console.log("typing text");
        //console.log(text);
        let inText = text.join( '');
        //console.log(inText);
        //console.log(this.currentEnemyId);
        for (let [key, enemy] of this.targetWords.entries())
        {

            const enWords = enemy.getWords();

            if ((enWords == inText) && ((this.currentEnemyId == key)))
            {
                console.log("Enemy matched:");
                this.numOfTypos = 0;

                enemy.setTypedText(inText);
                enemy.kill();
                this.currentEnemyId = undefined;
                this.targetWords.delete(key);
                //console.log(text);
                return consts.TM_TYPING_FULLMATCH;
            }
            else if (enWords.startsWith(inText) && ((this.currentEnemyId == key) || (this.currentEnemyId == null)))
            {

                console.log("Partial Enemy matched:");
                this.numOfTypos = 0;

                enemy.setTypedText(inText);
                this.currentEnemyId = enemy.getId();
                return consts.TM_TYPING_PARTMATCH;

            }
            else if (this.currentEnemyId == key)
            {

                this.numOfTypos = this.numOfTypos + 1;
                if (this.numOfTypos >= 3)
                {
                    this.numOfTypos = 0;
                    this.resetTyping();
                    this.currentEnemyId = undefined;
                    return consts.TM_TYPING_TYPO_RESET;
                }
                return consts.TM_TYPING_TYPO;

            }

        }
        console.log("No match");
        return consts.TM_TYPING_TYPO_NO_MATCH;

    }

    logout(enemy)
    {

        //for (let k)

    }

}

module.exports = TypeManager;
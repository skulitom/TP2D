class TypeManager
{

    targetWords;

    constructor()
    {

        this.targetWords = new Map();

    }

    register(enemy)
    {

        this.targetWords.set(enemy.getId(), enemy.getWords());

    }

    setTyping(text)
    {

        for (let [key, enWords] of this.targetWords.entries())
        {
        
            if (enWords == text)
            {
                console.log("Enemy matched:");    
                console.log(text);
            }

        }

    }

    logout(enemy)
    {

        //for (let k)

    }

}
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
        console.log("New enemy registered");
        console.log(enemy.getId());
        console.log(enemy.getWords());

    }

    setTyping(text)
    {

        //console.log("typing text");
        //console.log(text);
        let inText = join(text, '');
        //console.log(inText);

        for (let [key, enWords] of this.targetWords.entries())
        {
        
            if (enWords == inText)
            {
                console.log("Enemy matched:");    
                console.log(text);
                return true;
            }

        }

        return false;

    }

    logout(enemy)
    {

        //for (let k)

    }

}
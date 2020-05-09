class TypeManager
{

    targetWords;
    currentEnemyId;

    constructor()
    {

        this.targetWords = new Map();

    }

    register(enemy)
    {

        this.targetWords.set(enemy.getId(), enemy);
        console.log("New enemy registered");
        console.log(enemy.getId());
        console.log(enemy);

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
        let inText = join(text, '');
        //console.log(inText);

        for (let [key, enemy] of this.targetWords.entries())
        {
        
            const enWords = enemy.getWords();

            if (enWords == inText)
            {
                console.log("Enemy matched:"); 
                enemy.setTypedText(inText);
                enemy.kill();
                this.currentEnemyId = undefined;
                this.targetWords.delete(key);
                //console.log(text);
                return true;
            }
            else if (enWords.includes(inText))
            {
            
                //console.log("Partial Enemy matched:");
                enemy.setTypedText(inText);
                this.currentEnemyId = enemy.getId();
                return false;

            }

        }

        return false;

    }

    logout(enemy)
    {

        //for (let k)

    }

}
const consts = require('./constants/TypingConstants');

class TypeManager {

    targetWords;
    currentEnemyIdList;
    numOfTypos = 0;



    constructor() {
        this.currentEnemyIdList = new Map();
        this.targetWords = new Map();

    }

    register(value) {

        this.targetWords.set(value.getId(), value);
        //console.log("New enemy registered");
        //console.log(enemy.getId());
        //console.log(enemy);

    }

    resetTyping(playerId) {

        if (this.currentEnemyIdList.has(playerId)) {

            const en = this.targetWords.get(this.currentEnemyIdList.get(playerId));
            en.setTypedText("");
            this.currentEnemyIdList.delete(playerId);

        }

    }

    setTyping(rgb, text, playerId) {

        //console.log("typing text");
        //console.log(text);
        let inText = text.join( '').trim();
        //console.log(inText);
        //console.log(this.currentEnemyId);
        if(this.currentEnemyIdList.has(playerId)) {
            const enemy = this.targetWords.get(this.currentEnemyIdList.get(playerId));
            if (enemy == undefined)
            {
                this.numOfTypos = 0;
                this.currentEnemyIdList.delete(playerId);
                return consts.TM_TYPING_TYPO_NO_MATCH;
            }
            const enWords = enemy.getWords();
            const key = enemy.getId();
            if ((enWords === inText) && ((this.currentEnemyIdList.get(playerId) === key))) {
                console.log("Enemy matched:");
                this.numOfTypos = 0;

                enemy.setTypedText(inText);
                enemy.kill();
                this.currentEnemyIdList.delete(playerId);
                this.targetWords.delete(key);
                //console.log(text);
                return consts.TM_TYPING_FULLMATCH;
            } else if (enWords.startsWith(inText) && ((this.currentEnemyIdList.get(playerId) === key))) {

                console.log("Partial Enemy matched:");
                this.numOfTypos = 0;

                enemy.setFillRgb(rgb);
                enemy.setTypedText(inText);
                return consts.TM_TYPING_PARTMATCH;

            } else if (this.currentEnemyIdList.get(playerId) === key) {

                this.numOfTypos = this.numOfTypos + 1;
                if (this.numOfTypos >= 3) {
                    this.numOfTypos = 0;
                    this.resetTyping(playerId);
                    this.currentEnemyIdList.delete(playerId);
                    return consts.TM_TYPING_TYPO_RESET;
                }
                return consts.TM_TYPING_TYPO;

            }

        } else {
            for (let [key, enemy] of this.targetWords.entries()) {
                if(enemy.getWords() === inText) {
                    console.log("Enemy matched:");
                    this.numOfTypos = 0;

                    enemy.setTypedText(inText);
                    enemy.kill();
                    this.currentEnemyIdList.delete(playerId);
                    this.targetWords.delete(key);
                    //console.log(text);
                    return consts.TM_TYPING_FULLMATCH;
                }
                else if (enemy.getWords().startsWith(inText)) {

                    console.log("Partial Enemy matched:");
                    this.numOfTypos = 0;

                    enemy.setFillRgb(rgb);
                    enemy.setTypedText(inText);
                    this.currentEnemyIdList.set(playerId, enemy.getId());
                    return consts.TM_TYPING_PARTMATCH;

                }
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
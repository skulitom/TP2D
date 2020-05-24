const consts = require('./constants/TypingConstants');

class TypeManager {

    constructor() {
        this.playerTypeblesList = new Map();
        this.typebleList = new Map();
        this.playersList = new Map();
        this.numOfTypos = 0;
    }

    registerTypeble(value) {

        this.typebleList.set(value.getId(), value);

    }

    registerPlayer(value) {

        this.playersList.set(value.getId(), value);

    }

    resetTyping(playerId) {

        if (this.playerTypeblesList.has(playerId)) {

            const en = this.typebleList.get(this.playerTypeblesList.get(playerId));
            en.setTypedText("");
            this.playerTypeblesList.delete(playerId);

        }

    }

    setTyping(rgb, text, playerId) {

        //console.log("typing text");
        //console.log(text);
        let inText = text.join('').trim();
        let player = this.playersList.get(playerId);
        //console.log(inText);
        //console.log(this.currentEnemyId);
        if(this.playerTypeblesList.has(playerId)) {
            const enemy = this.typebleList.get(this.playerTypeblesList.get(playerId));
            if (enemy == undefined)
            {
                this.numOfTypos = 0;
                this.playerTypeblesList.delete(playerId);
                return consts.TM_TYPING_TYPO_NO_MATCH;
            }
            const enWords = enemy.getWords();
            const key = enemy.getId();
            if ((enWords === inText) && ((this.playerTypeblesList.get(playerId) === key))) {
                console.log("Enemy matched:");
                this.numOfTypos = 0;

                enemy.setTypedText(inText);
                enemy.kill(player.getColor());
                this.playerTypeblesList.delete(playerId);
                this.typebleList.delete(key);
                //console.log(text);
                return consts.TM_TYPING_FULLMATCH;
            } else if (enWords.startsWith(inText) && ((this.playerTypeblesList.get(playerId) === key))) {

                console.log("Partial Enemy matched:");
                this.numOfTypos = 0;

                enemy.setFillRgb(rgb);
                enemy.setTypedText(inText);
                return consts.TM_TYPING_PARTMATCH;

            } else if (this.playerTypeblesList.get(playerId) === key) {

                this.numOfTypos = this.numOfTypos + 1;
                if (this.numOfTypos >= 3) {
                    this.numOfTypos = 0;
                    this.resetTyping(playerId);
                    this.playerTypeblesList.delete(playerId);
                    return consts.TM_TYPING_TYPO_RESET;
                }
                return consts.TM_TYPING_TYPO;

            }

        } else {
            for (let [key, enemy] of this.typebleList.entries()) {
                if(enemy.getWords() === inText) {
                    console.log("Enemy matched:");
                    this.numOfTypos = 0;

                    enemy.setTypedText(inText);
                    enemy.kill(player.getColor());
                    this.playerTypeblesList.delete(playerId);
                    this.typebleList.delete(key);
                    //console.log(text);
                    return consts.TM_TYPING_FULLMATCH;
                }
                else if (enemy.getWords().startsWith(inText)) {

                    console.log("Partial Enemy matched:");
                    this.numOfTypos = 0;

                    enemy.setFillRgb(rgb);
                    enemy.setTypedText(inText);
                    this.playerTypeblesList.set(playerId, enemy.getId());
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
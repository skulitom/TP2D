const consts = require('./constants/TypingConstants');

class TypeManager {

    constructor() {
        this.playerTypeblesList = new Map();
        this.typebleList = new Map();
        this.playersList = new Map();
        this.numOfTypos = 0;
    }

    registerTypeble = (value) => {
        this.typebleList.set(value.getId(), value);
    };

    registerPlayer = (value) => {
        this.playersList.set(value.getId(), value);
    };

    resetTyping = (playerId) => {
        if (this.playerTypeblesList.has(playerId)) {
            const en = this.typebleList.get(this.playerTypeblesList.get(playerId));
            en.setTypedText("");
            this.playerTypeblesList.delete(playerId);
        }
    };

    //TODO: Break down into smaller functions
    setTyping = (rgb, text, playerId) => {
        let inText = text.join('').trim();
        let player = this.playersList.get(playerId);
        if(this.playerTypeblesList.has(playerId)) {
            const typeble = this.typebleList.get(this.playerTypeblesList.get(playerId));
            if (!typeble) {
                this.numOfTypos = 0;
                this.playerTypeblesList.delete(playerId);
                return consts.TM_TYPING_TYPO_NO_MATCH;
            }
            const enWords = typeble.getWords();
            const key = typeble.getId();
            if ((enWords === inText) && ((this.playerTypeblesList.get(playerId) === key))) {
                this.numOfTypos = 0;

                typeble.setTypedText(inText);
                player.rotate(typeble.x, typeble.y);
                typeble.kill(player);
                this.playerTypeblesList.delete(playerId);
                this.typebleList.delete(key);
                return consts.TM_TYPING_FULLMATCH;
            } else if (enWords.startsWith(inText) && ((this.playerTypeblesList.get(playerId) === key))) {

                this.numOfTypos = 0;
                player.rotate(typeble.x, typeble.y);

                typeble.setFillRgb(rgb);
                typeble.setTypedText(inText);
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
            for (let [key, typeble] of this.typebleList.entries()) {
                if(typeble.getWords() === inText) {
                    this.numOfTypos = 0;

                    typeble.setTypedText(inText);
                    player.rotate(typeble.x, typeble.y);
                    typeble.kill(player);
                    this.playerTypeblesList.delete(playerId);
                    this.typebleList.delete(key);
                    return consts.TM_TYPING_FULLMATCH;
                }
                else if (typeble.getWords().startsWith(inText)) {
                    this.numOfTypos = 0;

                    typeble.setFillRgb(rgb);
                    typeble.setTypedText(inText);
                    player.rotate(typeble.x, typeble.y);
                    this.playerTypeblesList.set(playerId, typeble.getId());
                    return consts.TM_TYPING_PARTMATCH;

                }
            }
        }
        return consts.TM_TYPING_TYPO_NO_MATCH;

    };

    logout = (enemy) => {
        //for (let k)

    }

}

module.exports = TypeManager;
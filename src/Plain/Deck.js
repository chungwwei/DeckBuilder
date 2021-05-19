export class Deck {

    constructor() {

        this.regionCnt = []
        this.followerCnt = 0
        this.championCnt = 0
        this.spellCnt = 0
        this.landmarkCnt = 0

        this.cards = []
        this.cardCnt = {}
    }

    addCard(card) {

        if (this.cardCnt[card.name] >= 3) return false
        if (this.regionCnt.length >= 2) return false
    
        if (card.type === 'Spell') this.spellCnt += 1
        else if (card.type === 'Unit') this.followerCnt += 1
        else if (card.type === 'Champion') this.championCnt += 1
        else if (card.type === 'Landmark') this.landmarkCnt += 1


        this.cards.push(card)
        if (this.cardCnt.hasOwnProperty(card.name)) {
            this.cardCnt[card.name] += 1
        } else {
            this.cardCnt[card.name] = 0
            this.cardCnt[card.name] += 1
        }

        if (this.regionCnt.length === 0) {
            this.regionCnt.push(card.region)
        } else if (this.cardCnt.length === 1) {
            if (this.cardCnt[0] !== card.region) {
                this.regionCnt.push(card.region)
            }
        }
        
    }
}
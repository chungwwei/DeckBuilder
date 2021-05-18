export class GameCard {

    constructor (
        associatedCards,
        associatedCardRef,
        assets,
        region,
        regionRef,
        attack,
        cost,
        health,
        description,
        descriptionRaw,
        levelupDescription,
        levelupDescriptionRaw,
        flavorText,
        artistName,
        name,
        cardCode,
        keywords,
        keywordRefs,
        spellSpeed,
        spellSpeedRef,
        rarity,
        rarityRef,
        subtype,
        subtypes,
        supertype,
        type,
        collectible,
        set
    ) {
        this.associatedCards = associatedCards;
        this.associatedCardRef = associatedCardRef;
        this.assets = assets;
        this.region = region;
        this.regionRef = regionRef;
        this.attack = attack;
        this.cost = cost;
        this.health = health;
        this.description = description;
        this.descriptionRaw = descriptionRaw;
        this.levelupDescription = levelupDescription;
        this.levelupDescriptionRaw = levelupDescriptionRaw;
        this.flavorText = flavorText;
        this.artistName = artistName;
        this.name = name;
        this.cardCode = cardCode;
        this.keywords = keywords;
        this.keywordRefs = keywordRefs;
        this.spellSpeed = spellSpeed;
        this.spellSpeedRef = spellSpeedRef;
        this.rarity = rarity;
        this.rarityRef = rarityRef;
        this.subtype = subtype;
        this.subtypes = subtypes;
        this.supertype = supertype;
        this.type = type;
        this.collectible = collectible;
        this.set = set;
    }
}
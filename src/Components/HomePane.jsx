import { Grid, Paper, AppBar, Toolbar, Button, IconButton, Typography, setRef, Snackbar } from '@material-ui/core'
import { React, useState, useEffect } from 'react'
import { CardPane } from './CardPane'
import { DeckInfoPane } from './DeckInfoPane'
import { LORAppBar } from './LORAppBar'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import dataset1 from '../Data/set1-en_us.json'
import dataset2 from '../Data/set2-en_us.json'
import dataset3 from '../Data/set3-en_us.json'
import dataset4 from '../Data/set4-en_us.json'
import { GameCard } from '../Plain/GameCard'
import { Deck } from '../Plain/Deck'
// import { HomeIcon } from '@material-ui/icons/Home'
const images = require.context('../../public/images', true);
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    homeButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    leftPane: {
        marginTop: 25
    },
    rightPane: {
        marginTop: 35
    }
}));

const set1 = 'set1'
const set2 = 'set2'
const set3 = 'set3'
const set4 = 'set4'
var cards = []

for (const i in dataset1) {
    const c = dataset1[i]
    const n = new GameCard(
        c.associatedCards,
        c.associatedCardRef,
        c.assets,
        c.region,
        c.regionRef,
        c.attack,
        c.cost,
        c.health,
        c.description,
        c.descriptionRaw,
        c.levelupDescription,
        c.levelupDescriptionRaw,
        c.flavorText,
        c.artistName,
        c.name,
        c.cardCode,
        c.keywords,
        c.keywordRefs,
        c.spellSpeed,
        c.spellSpeedRef,
        c.rarity,
        c.rarityRef,
        c.subtype,
        c.subtypes,
        c.supertype,
        c.type,
        c.collectible,
        c.set
    )
    cards.push(n)
}

for (const i in dataset2) {
    const c = dataset2[i]
    const n = new GameCard(
        c.associatedCards,
        c.associatedCardRef,
        c.assets,
        c.region,
        c.regionRef,
        c.attack,
        c.cost,
        c.health,
        c.description,
        c.descriptionRaw,
        c.levelupDescription,
        c.levelupDescriptionRaw,
        c.flavorText,
        c.artistName,
        c.name,
        c.cardCode,
        c.keywords,
        c.keywordRefs,
        c.spellSpeed,
        c.spellSpeedRef,
        c.rarity,
        c.rarityRef,
        c.subtype,
        c.subtypes,
        c.supertype,
        c.type,
        c.collectible,
        c.set
    )
    cards.push(n)
}

for (const i in dataset3) {
    const c = dataset3[i]
    const n = new GameCard(
        c.associatedCards,
        c.associatedCardRef,
        c.assets,
        c.region,
        c.regionRef,
        c.attack,
        c.cost,
        c.health,
        c.description,
        c.descriptionRaw,
        c.levelupDescription,
        c.levelupDescriptionRaw,
        c.flavorText,
        c.artistName,
        c.name,
        c.cardCode,
        c.keywords,
        c.keywordRefs,
        c.spellSpeed,
        c.spellSpeedRef,
        c.rarity,
        c.rarityRef,
        c.subtype,
        c.subtypes,
        c.supertype,
        c.type,
        c.collectible,
        c.set
    )
    cards.push(n)
}

for (const i in dataset4) {
    const c = dataset4[i]
    const n = new GameCard(
        c.associatedCards,
        c.associatedCardRef,
        c.assets,
        c.region,
        c.regionRef,
        c.attack,
        c.cost,
        c.health,
        c.description,
        c.descriptionRaw,
        c.levelupDescription,
        c.levelupDescriptionRaw,
        c.flavorText,
        c.artistName,
        c.name,
        c.cardCode,
        c.keywords,
        c.keywordRefs,
        c.spellSpeed,
        c.spellSpeedRef,
        c.rarity,
        c.rarityRef,
        c.subtype,
        c.subtypes,
        c.supertype,
        c.type,
        c.collectible,
        c.set
    )
    cards.push(n)
}

cards = cards.filter((c) => {
    if (c.rarity === 'None')
        return false
    if (c.supertype === 'Champion' && c.rarity === 'None')
        return false
    for (let i = 0; i < c.keywords.length; i++) {
        if (c.keywords[i] === 'Skill')
            return false
    }
    return true
})

const nameToCard = {}
for (let i = 0; i < cards.length; i++) {
    nameToCard[cards[i].name] = cards[i]
}

cards.sort((a, b) => {
    if (a.cost === b.cost) {
        return a.name.localeCompare(b.name)
    }
    return a.cost - b.cost
})

export const HomePane = (props) => {
    const classes = useStyles()

    const [myDeck, setMyDeck] = useState({
        regionCnt: [],
        followerCnt: 0,
        championCnt: 0,
        spellCnt: 0,
        landmarkCnt: 0,
        cards: [],
        cardCnt: {},
        deckSize: 0
    })
    const [refresh, setRefresh] = useState(false)
    const [searchTextField, setSearchTextField] = useState('')
    const [cardKeywords, setCardKeywords] = useState([])
    const [myList, setMyList] = useState([])
    const [displayCards, setDisplayCards] = useState([...cards])
    const [filterIonia, setFilterIonia] = useState(false)
    const [filterDemacia, setFilterDemacia] = useState(false)
    const [filterFreljord, setFilterFreljord] = useState(false)
    const [filterBilgewater, setFilterBilgewater] = useState(false)
    const [filterShadowIsles, setFilterShadowIsles] = useState(false)
    const [filterTargon, setFilterTargon] = useState(false)
    const [filterShurima, setFilterShurima] = useState(false)
    const [filterPiltoverZaun, setFilterPiltoverZaun] = useState(false)
    const [filterNoxus, setFilterNoxus] = useState(false)

    const [filterSetOne, setFilterSetOne] = useState(false)
    const [filterSetTwo, setFilterSetTwo] = useState(false)
    const [filterSetThree, setFilterSetThree] = useState(false)
    const [filterSetFour, setFilterSetFour] = useState(false)

    const [filterManaZero, setFilterManaZero] = useState(false)
    const [filterManaOne, setFilterManaOne] = useState(false)
    const [filterManaTwo, setFilterManaTwo] = useState(false)
    const [filterManaThree, setFilterManaThree] = useState(false)
    const [filterManaFour, setFilterManaFour] = useState(false)
    const [filterManaFive, setFilterManaFive] = useState(false)
    const [filterManaSix, setFilterManaSix] = useState(false)
    const [filterManaSeven, setFilterManaSeven] = useState(false)

    const [filterChampion, setFilterChampion] = useState(false)
    const [filterSpell, setFilterSpell] = useState(false)
    const [filterFollower, setFilterFollower] = useState(false)
    const [filterLandmark, setFilterLandmark] = useState(false)

    const [filterCommon, setFilterCommon] = useState(false)
    const [filterRare, setFilterRare] = useState(false)
    const [filterEpic, setFilterEpic] = useState(false)

    const [openAddedCard, setOpenAddedCard] = useState(false)

    var original = [...cards]
    useEffect(() => {
        var championFilters = []
        if (filterBilgewater) { championFilters.push((c) => c.regionRef.toLowerCase() === 'bilgewater') }
        if (filterDemacia) { championFilters.push((c) => c.regionRef.toLowerCase() === 'demacia') }
        if (filterFreljord) { championFilters.push((c) => c.regionRef.toLowerCase() === 'freljord') }
        if (filterIonia) { championFilters.push((c) => c.regionRef.toLowerCase() === 'ionia') }
        if (filterTargon) { championFilters.push((c) => c.regionRef.toLowerCase() === 'targon') }
        if (filterNoxus) { championFilters.push((c) => c.regionRef.toLowerCase() === 'noxus') }
        if (filterPiltoverZaun) { championFilters.push((c) => c.regionRef.toLowerCase() === 'piltoverzaun') }
        if (filterShurima) { championFilters.push((c) => c.regionRef.toLowerCase() === 'shurima') }
        if (filterShadowIsles) { championFilters.push((c) => c.regionRef.toLowerCase() === 'shadowisles') }

        if (championFilters.length > 0) {
            original = original.filter((c) => {
                for (const f of championFilters) {
                    if (f(c)) return true
                }
                return false
            })
        }

        var setFilters = []
        if (filterSetOne) { setFilters.push((c) => c.set === 'Set1') }
        if (filterSetTwo) { setFilters.push((c) => c.set === 'Set2') }
        if (filterSetThree) { setFilters.push((c) => c.set === 'Set3') }
        if (filterSetFour) { setFilters.push((c) => c.set === 'Set4') }

        if (setFilters.length > 0) {
            console.log("doing filtering")
            console.log(setFilters)
            original = original.filter((c) => {
                for (const f of setFilters) {
                    if (f(c)) return true
                }
                return false
            })
        }

        var manaFilters = []
        if (filterManaOne) { manaFilters.push((c) => c.cost === 1) }
        if (filterManaTwo) { manaFilters.push((c) => c.cost === 2) }
        if (filterManaThree) { manaFilters.push((c) => c.cost === 3) }
        if (filterManaFour) { manaFilters.push((c) => c.cost === 4) }
        if (filterManaFive) { manaFilters.push((c) => c.cost === 5) }
        if (filterManaSix) { manaFilters.push((c) => c.cost === 6) }
        if (filterManaSeven) { manaFilters.push((c) => c.cost === 7) }

        if (manaFilters.length > 0) {
            original = original.filter((c) => {
                for (const f of manaFilters) {
                    if (f(c)) return true
                }
                return false
            })
        }

        var rarityFilters = []
        if (filterCommon) { rarityFilters.push((c) => c.rarity === 'COMMON') }
        if (filterEpic) { rarityFilters.push((c) => c.rarity === 'EPIC') }
        if (filterRare) { rarityFilters.push((c) => c.rarity === 'RARE') }
        if (filterChampion) { rarityFilters.push((c) => c.rarity === 'Champion') }

        if (rarityFilters.length > 0) {
            original = original.filter((c) => {
                for (const f of rarityFilters) {
                    if (f(c)) return true
                }
                return false
            })
        }


        var typeFilters = []
        if (filterSpell) { typeFilters.push((c) => c.type === 'Spell') }
        if (filterFollower) { typeFilters.push((c) => c.type === 'Unit' && c.supertype !== 'Champion') }
        if (filterLandmark) { typeFilters.push((c) => c.type === 'Landmark') }

        if (typeFilters.length > 0) {
            original = original.filter((c) => {
                for (const f of typeFilters) {
                    if (f(c)) return true
                }
                return false
            })
        }

        // filtering by keywords
        // filterKeywords
        console.log(`filtering keywords are: ${cardKeywords}`)
        if (cardKeywords.length > 0) {
            original = original.filter((c) => {
                for (const k of c.keywords) {
                    for (const target of cardKeywords) {
                        if (k === target) return true
                    }
                }
                return false
            })
        }

        original = original.sort((a, b) => {
            if (a.cost === b.cost) {
                return a.name.localeCompare(b.name)
            }
            return a.cost - b.cost
        })

        if (searchTextField !== '') {
            original = original.filter(c => c.name.toLowerCase() === searchTextField.toLowerCase())
        }

        // padding
        if (original.length % 3 !== 0) {
            let r = 3 - (original.length % 3)
            while (r > 0) {
                original.push(new GameCard(
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    'blank',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null

                ))
                r -= 1
            }
        }

        setDisplayCards(original)

    }, [filterBilgewater, filterDemacia, filterFreljord, filterIonia, filterPiltoverZaun, filterNoxus, filterShadowIsles, filterShurima, filterTargon,
        filterSetOne, filterSetTwo, filterSetThree, filterSetFour,
        filterManaOne, filterManaTwo, filterManaThree, filterManaFour, filterManaFive, filterManaSix, filterManaSeven,
        filterChampion, filterSpell, filterLandmark, filterFollower,
        filterCommon, filterRare, filterEpic,
        searchTextField,
        cardKeywords
    ])

    console.log('rendering')
    return (
        <div>
            <div className={classes.root}>
                <LORAppBar
                    setSearchTextField={setSearchTextField}
                    setCardKeywords={setCardKeywords}
                    setFilterBilgewater={setFilterBilgewater}
                    setFilterDemacia={setFilterDemacia}
                    setFilterFreljord={setFilterFreljord}
                    setFilterIonia={setFilterIonia}
                    setFilterNoxus={setFilterNoxus}
                    setFilterPiltoverZaun={setFilterPiltoverZaun}
                    setFilterShadowIsles={setFilterShadowIsles}
                    setFilterShurima={setFilterShurima}
                    setFilterTargon={setFilterTargon}
                    setFilterSetOne={setFilterSetOne}
                    setFilterSetTwo={setFilterSetTwo}
                    setFilterSetThree={setFilterSetThree}
                    setFilterSetFour={setFilterSetFour}
                    setFilterManaOne={setFilterManaOne}
                    setFilterManaTwo={setFilterManaTwo}
                    setFilterManaThree={setFilterManaThree}
                    setFilterManaFour={setFilterManaFour}
                    setFilterManaFive={setFilterManaFive}
                    setFilterManaSix={setFilterManaSix}
                    setFilterManaSeven={setFilterManaSeven}
                    setFilterCommon={setFilterCommon}
                    setFilterRare={setFilterRare}
                    setFilterEpic={setFilterEpic}
                    setFilterSpell={setFilterSpell}
                    setFilterFollower={setFilterFollower}
                    setFilterLandmark={setFilterLandmark}
                    setFilterChampion={setFilterChampion}
                    filterBilgewater={filterBilgewater}
                    filterDemacia={filterDemacia}
                    filterFreljord={filterFreljord}
                    filterIonia={filterIonia}
                    filterNoxus={filterNoxus}
                    filterShurima={filterShurima}
                    filterPiltoverZaun={filterPiltoverZaun}
                    filterShadowIsles={filterShadowIsles}
                    filterTargon={filterTargon}
                    filterManaOne={filterManaOne}
                    filterManaTwo={filterManaTwo}
                    filterManaThree={filterManaThree}
                    filterManaFour={filterManaFour}
                    filterManaFive={filterManaFive}
                    filterManaSix={filterManaSix}
                    filterCommon={filterCommon}
                    filterRare={filterRare}
                    filterEpic={filterEpic}
                    filterSpell={filterSpell}
                    filterFollower={filterFollower}
                    filterLandmark={filterLandmark}
                    filterChampion={filterChampion}
                    filterSetOne={filterSetOne}
                    filterSetTwo={filterSetTwo}
                    filterSetThree={filterSetThree}
                    filterSetFour={filterSetFour}
                />
            </div>
            <div>
                <Grid container>
                    <Grid item sm={9} className={classes.leftPane}>
                        <Paper>
                            <CardPane
                                cards={displayCards}
                                myDeck={myDeck}
                                setDisplayCards={setDisplayCards}
                                setMyList={setMyList}
                                setMyDeck={setMyDeck}
                                setRefresh={setRefresh}
                                setOpenAddedCard={setOpenAddedCard}
                                nameToCard={nameToCard}
                            ></CardPane>
                        </Paper>
                    </Grid>
                    <Grid item sm={3} className={classes.rightPane}>
                        <Paper>
                            <DeckInfoPane
                                myList={myList}
                                myDeck={myDeck}
                                nameToCard={nameToCard}
                                setMyDeck={setMyDeck}
                                setRefresh={setRefresh}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
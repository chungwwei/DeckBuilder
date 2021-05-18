import { Grid, Paper, AppBar, Toolbar, Button, IconButton, Typography } from '@material-ui/core'
import { React, useState, useEffect } from 'react'
import { CardPane } from './CardPane'
import { DeckInfoPane } from './DeckInfoPane'
import { LORAppBar } from './LORAppBar'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import dataset1 from '../Data/set1-en_us.json'
import { GameCard } from '../Plain/GameCard'
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
const cards = []

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


cards.sort((a, b) => {
    if (a.cost === b.cost) {
        return a.name.localeCompare(b.name)
    }
    return a.cost - b.cost
})

export const HomePane = (props) => {
    const classes = useStyles()

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


    console.log(filterFreljord)
    useEffect(() => {
        let newList = []
        if (filterBilgewater) { newList = newList.concat(cards.filter(c => c.region.toLowerCase() === 'bilgewater')) }
        if (filterDemacia) { newList = newList.concat(cards.filter(c => c.regionRef.toLowerCase() === 'demacia')) }
        if (filterFreljord) { newList = newList.concat(cards.filter(c => c.regionRef.toLowerCase() === 'freljord')) }
        if (filterIonia) { newList = newList.concat(cards.filter(c => c.regionRef.toLowerCase() === 'ionia')) }
        if (filterTargon) { newList = newList.concat(cards.filter(c => c.regionRef.toLowerCase() === 'targon')) }
        if (filterNoxus) { newList = newList.concat(cards.filter(c => c.regionRef.toLowerCase() === 'noxus')) }
        if (filterPiltoverZaun) { newList = newList.concat(cards.filter(c => c.regionRef.toLowerCase() === 'piloverzaun')) }
        if (filterShurima) { newList = newList.concat(cards.filter(c => c.regionRef.toLowerCase() === 'shurima')) }
        if (filterShadowIsles) { newList = newList.concat(cards.filter(c => c.regionRef.toLowerCase() === 'shadowisles')) }

        newList.sort((a, b) => {
            if (a.cost === b.cost) {
                return a.name.localeCompare(b.name)
            }
            return a.cost - b.cost
        })
        setDisplayCards(newList)
    }, [filterBilgewater, filterDemacia, filterFreljord])

    useEffect(() => {
        if (searchTextField === '') {
            setDisplayCards(cards)
        } else {
            const newList = cards.filter(c => c.name.toLowerCase() === searchTextField.toLowerCase())
            newList.sort((a, b) => {
                if (a.cost === b.cost) {
                    return a.name.localeCompare(b.name)
                }
                return a.cost - b.cost
            })
            setDisplayCards(newList)
        }
    }, [searchTextField])

    console.log(`myList: ${myList}`)
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
                />
            </div>
            <div>
                <Grid container>
                    <Grid item sm={9} className={classes.leftPane}>
                        <Paper>
                            <CardPane 
                                cards={displayCards}
                                setMyList={setMyList}
                            ></CardPane>
                        </Paper>
                    </Grid>
                    <Grid item sm={3} className={classes.rightPane}>
                        <Paper>
                            <DeckInfoPane myList={myList}></DeckInfoPane>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}
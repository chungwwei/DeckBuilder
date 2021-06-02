import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { ContactlessOutlined } from '@material-ui/icons';
import { React } from 'react'
import { FixedSizeList } from 'react-window';
import { Card, DeckEncoder } from 'runeterra';

const images = require.context('../../public/images/cards', true);
export const DeckInfoPane = (props) => {

    const {
        myList,
        myDeck,
        setRefresh,
        setMyDeck,
        nameToCard
    } = props

    var displayCards = []
    for (const c in myDeck.cardCnt) {
        if (myDeck.cardCnt[c] > 0) {
            displayCards.push({
                name: c,
                cnt: myDeck.cardCnt[c],
                cardCode: nameToCard[c].cardCode,
                region: nameToCard[c].region,
                cost: nameToCard[c].cost
            })
        }
    }


    displayCards = displayCards.sort((a, b) => {
        if (a.cost === b.cost) {
            return a.name.localeCompare(b.name)
        }
        return a.cost - b.cost
    })

    const spellCnt = myDeck.spellCnt
    const championCnt = myDeck.championCnt
    const landmarkCnt = myDeck.landmarkCnt
    const followerCnt = myDeck.followerCnt
    const deckSize = myDeck.deckSize

    const handleCardClick = (c) => {

        const card = nameToCard[c]
        console.log(`removing card ${card}`)

        const deckClone = JSON.parse(JSON.stringify(myDeck))
        // if (!deckClone.cardCnt.hasOwnProperty(card.name)) {
        //     deckClone.cardCnt[card.name] = 0
        // }
        if (card.type === 'Spell') deckClone.spellCnt -= 1
        else if (card.type === 'Unit' && card.rarity === 'Champion') deckClone.championCnt -= 1
        else if (card.type === 'Unit') deckClone.followerCnt -= 1
        else if (card.type === 'Landmark') deckClone.landmarkCnt -= 1

        deckClone.deckSize -= 1
        deckClone.cardCnt[card.name] -= 1
        setMyDeck(deckClone)

    }

    const handleExportClick = () => {
        let cards = []
        for (const c in myDeck.cardCnt) {
            if (myDeck.cardCnt[c] > 0) {
                let cnt = myDeck.cardCnt[c]
                let cardCode = nameToCard[c].cardCode
                let card = new Card(cardCode, cnt)
                cards.push(card)
            }
        }

        const code = DeckEncoder.encode(cards)
        alert(code)
    }

    const getStripColor = (region) => {
        region = region.toLowerCase()
        console.log(region)
        if (region === 'bilgewater') return '#c74f0e'
        if (region === 'demacia') return '#eadcb5'
        if (region === 'ionia') return '#ffc0cb'
        if (region === 'freljord') return '#add8e6'
        if (region === 'piltover & zaun') return '#e8c309'
        if (region === 'shadow isles') return '#048555'
        if (region === 'shurima') return '#dbd521'
        if (region === 'noxus') return '#b90e0a'
        if (region === 'targon') return '#885eeb'
    }

    const Row = ({ index, style }) => {
        console.log(`index is: ${displayCards[index]}`)

        let c = displayCards[index]
        let imgsrc = images(`./${c.cardCode}-full.png`);
        return (
            <div style={style}>
                <Paper onClick={() => { handleCardClick(c.name) }} style={{ background: getStripColor(c.region), textAlign: 'right' }}>
                    {`${c.name} X${c.cnt}`}
                    <img style={{ width: '40%', height: '80px', objectFit: 'cover' }} src={imgsrc.default} />
                </Paper>
            </div>
        )
    }

    return (
        <Grid container direction='column' spacing={6}>
            <Grid item>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form>
            </Grid>
            <Grid item>
                <Grid container spacing={2} justify='center'>
                    <Grid item>
                        <Typography>
                            {`champs: ${championCnt}/6`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {`spells: ${spellCnt}`}
                    </Grid>
                    <Grid item>
                        {`units: ${followerCnt}`}
                    </Grid>
                    <Grid item>
                        {`landmarks: ${landmarkCnt}`}
                    </Grid>
                    <Grid item>
                        {`total: ${deckSize}/40`}
                    </Grid>
                </Grid>
            </Grid>
            {/* <Grid item>
                This is going to be the chart section
                Temporary place holder
            </Grid> */}

            <Grid item>
                {/* <Grid container direction='column' spacing={1} justify='center'>
                    {
                        displayCards.map((c, idx) => {
                            let imgsrc = images(`./${c.cardCode}-full.png`);
                            if (c.cnt > 0) {
                                return (
                                    <Grid item>
                                        <Paper onClick={()=>{handleCardClick(c.name)}} style={{background: getStripColor(c.region), textAlign: 'right'}}>
                                            {`${c.name} X${c.cnt}`}    
                                            <img style={{width: '40%', height: '80px',objectFit: 'cover'}} src={imgsrc.default} />
                                        </Paper>

                                    </Grid>
                                )
                            }
                        })
                    }
                </Grid> */}
                <FixedSizeList
                    height={450}
                    itemCount={displayCards.length}
                    itemSize={95}
                    width={320}
                >
                    {Row}
                </FixedSizeList>
            </Grid>
            <Grid item>
                <Button onClick={()=>handleExportClick()}>
                    Export
                </Button>
            </Grid>
        </Grid>

    )
}
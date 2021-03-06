import { Button, Grid, Icon, IconButton, Paper, TextField, Typography } from '@material-ui/core'
import { ContactlessOutlined, FunctionsOutlined, BarChartOutlined } from '@material-ui/icons';
import { React, useState } from 'react'
import { FixedSizeList } from 'react-window';
import { Card, DeckEncoder } from 'runeterra';
import { ExportDialog } from './ExportDialog';
import { StatisticDialog } from './StatisticDialog';

const images = require.context('../../public/images/cards', true);
const typeImgs = require.context('../../public/images/cardtype', true);
const manaImgs = require.context('../../public/images/manas', true)
export const DeckInfoPane = (props) => {

    const [openStatisticDialog, setOpenStatisticDialog] = useState(false)
    const [openExportDialog, setOpenExportDialog] = useState(false)
    const [code, setCode] = useState('')

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

    const handleChartButton = () => {
        setOpenStatisticDialog(true)
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
        setOpenExportDialog(true)
        setCode(code)

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
        let manasrc = manaImgs(`./mana${c.cost}.png`)
        return (
            <div style={style}>
                <Paper onClick={() => { handleCardClick(c.name) }} style={{ width: '350px', height: '80px', background: getStripColor(c.region), position: 'relative' }}>
                    <div style={{maxWidth: '200px', wordWrap: true, position: 'absolute', top: 10, left: 10, background: getStripColor(c.region)}}> {`${c.name} X${c.cnt}`} </div>
                    <img style={{ width: '40%', height: '80px', objectFit: 'cover', position: 'absolute', right: 0 }} src={imgsrc.default} />
                    <img style={{ width: '40px', height: '40px', position: 'absolute', bottom: 5, left: 10}} src={manasrc.default}></img>
                </Paper>
            </div>
        )
    }

    const championTypeImg = typeImgs('./champion.svg').default
    const followerTypeImg = typeImgs('./follower.svg').default
    const landmarkTypeImg = typeImgs('./landmark.svg').default
    const spellTypeImg = typeImgs('./spell.svg').default
    return (
        <div>
            <Grid container direction='column' spacing={2} justify='center'>
                <Grid item>
                    {/* <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form> */}
                    <h3> My Deck </h3>
                </Grid>
                <Grid item>
                    <Grid container spacing={3} justify='center'>
                        <Grid item>
                            <img src={championTypeImg}></img>
                            {`${championCnt}/6`}
                        </Grid>
                        <Grid item>
                            <img src={spellTypeImg}></img>
                            {`${spellCnt}`}
                        </Grid>
                        <Grid item>
                            <img src={followerTypeImg}></img>
                            {`${followerCnt}`}
                        </Grid>
                        <Grid item>
                            <img src={landmarkTypeImg} height='25px' width='25px'></img>
                            {`${landmarkCnt}`}
                        </Grid>
                        <Grid item>
                            <FunctionsOutlined />
                            {`${deckSize}/40`}
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item>
                This is going to be the chart section
                Temporary place holder
            </Grid> */}
                <Grid item>
                    <Button variant='outlined' color='primary' onClick={() => handleExportClick()}>
                        Export
                </Button>
                    <IconButton onClick={() => handleChartButton()}>
                        <BarChartOutlined />
                    </IconButton>

                </Grid>
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
                        height={window.innerHeight - 280}
                        itemCount={displayCards.length}
                        itemSize={95}
                        width={345}
                    >
                        {Row}
                    </FixedSizeList>
                </Grid>
            </Grid>
            <StatisticDialog
                myDeck={myDeck}
                openStatisticDialog={openStatisticDialog}
                setOpenStatisticDialog={setOpenStatisticDialog}
                nameToCard={nameToCard}
            >
            </StatisticDialog>
            <ExportDialog
                openExportDialog={openExportDialog}
                setOpenExportDialog={setOpenExportDialog}
                code={code}
            >
            </ExportDialog>
        </div>
    )
}
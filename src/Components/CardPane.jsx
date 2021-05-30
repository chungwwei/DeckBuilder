import { React, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { GameCard } from '../Plain/GameCard';
import { FixedSizeGrid } from 'react-window';
import { Snackbar } from '@material-ui/core';

const images = require.context('../../public/images/cards', true);

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(10),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        card: {
            margin: 20
        }
    }),
);

export const CardPane = (props) => {

    const [open, setOpen] = useState(false)

    const classes = useStyles();
    const {
        cards,
        myDeck,
        setMyList,
        setMyDeck,
        nameToCard,
        setDisplayCards,
        setRefresh,
        setOpenAddedCard
    } = props

    const handleCardClick = (card) => {

        // check if card to be added is in the within same two regions
        var s = new Set()
        for (const c in myDeck.cardCnt) {
            if (myDeck.cardCnt[c] > 0) {
                s.add(nameToCard[c].region)
            }
        }
        for (const region of s) {
            console.log(`region: ${region}`)
        }
        var flag = false
        for (const region of s) {
            if (card.region === region) flag = true
        }

        if (!flag && s.size >= 2) return

        if (card.rarity === 'Champion' && myDeck.championCnt >= 6) return
        if (myDeck.cards.length >= 40) return
        if (myDeck.cardCnt[card.name] >= 3) return

        const deckClone = JSON.parse(JSON.stringify(myDeck))
        if (!deckClone.cardCnt.hasOwnProperty(card.name)) {
            deckClone.cardCnt[card.name] = 0
        }

        if (card.type === 'Spell') deckClone.spellCnt += 1
        else if (card.type === 'Unit' && card.rarity === 'Champion') deckClone.championCnt += 1
        else if (card.type === 'Unit') deckClone.followerCnt += 1
        else if (card.type === 'Landmark') deckClone.landmarkCnt += 1

        deckClone.cardCnt[card.name] += 1
        deckClone.cards.push({ ...card })
        deckClone.deckSize += 1

        if (deckClone.regionCnt.length === 0) {
            deckClone.regionCnt.push(card.region)
        } else if (deckClone.regionCnt.length === 1) {
            if (deckClone.cardCnt[0] !== card.region) {
                deckClone.regionCnt.push(card.region)
            }
        }

        setMyDeck(deckClone)
        setMyList(prev => [...prev, card])
        setOpen(prev => !prev)
    }

    const Row = ({ columnIndex, rowIndex, style }) => {
        if (cards[rowIndex * 3 + columnIndex].cardCode !== 'blank') {
            let imgsrc = images(`./${cards[rowIndex * 3 + columnIndex].cardCode}.png`);
            return (
                <div className={classes.card} style={style}>
                    <Paper onClick={() => { handleCardClick(cards[rowIndex * 3 + columnIndex]) }}>
                        <img src={imgsrc.default}
                            width='300'
                            height='450'
                        ></img>
                    </Paper>
                </div>
            )
        } else {
            return (
                <div className={classes.card} style={style}>
                    <Paper>
                        {/* <img src={}
                            width='300'
                            height='450'
                        ></img> */}
                    </Paper>
                </div>
            )
        }
    }

    return (


        /* <Grid container spacing={2} justify='center'>
            {
                cards.map((c, idx) => {
                    let imgsrc = images(`./${c.cardCode}.png`);
                    return (

                        <Grid item xs={5} spacing={3} marginBottom='25px'>
                            <Paper onClick={() => { handleCardClick(c) }}>
                                <img src={imgsrc.default}
                                    width='300'
                                    height='450'
                                ></img>
                            </Paper>
                        </Grid>

                    )
                })
            }
        </Grid> */
        <div>
            <FixedSizeGrid
                width={1000}
                height={680}
                columnCount={3}
                columnWidth={300}
                rowCount={cards.length / 3}
                rowHeight={450}
            >
                {Row}
            </FixedSizeGrid>
        </div>
    )
}
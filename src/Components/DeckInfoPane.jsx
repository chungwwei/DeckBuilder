import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { React } from 'react'

export const DeckInfoPane = (props) => {

    const { 
        myList,
        myDeck,
        setRefresh,
        setMyDeck,
        nameToCard
     } = props

     const displayCards = []
     for (const c in myDeck.cardCnt) {
         displayCards.push({
            name: c,
            cnt: myDeck.cardCnt[c]
         })
     }
     
     const spellCnt = myDeck.spellCnt
     const championCnt = myDeck.championCnt
     const landmarkCnt = myDeck.landmarkCnt
     const followerCnt = myDeck.followerCnt
     const deckSize = myDeck.deckSize

     const handleCardClick = (c) => {
        console.log(c)
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
                        {`${championCnt}/6`}
                    </Grid>
                    <Grid item>
                        {`${spellCnt}`}
                    </Grid>
                    <Grid item>
                        {`${followerCnt}`}
                    </Grid>
                    <Grid item>
                        {`${landmarkCnt}`}
                    </Grid>
                    <Grid item>
                        {`${deckSize}/40`}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                This is going to be the chart section
                Temporary place holder
            </Grid>

            <Grid item>
                <Grid container direction='column' spacing={1}>
                    {
                        displayCards.map((c, idx) => {
                            if (c.cnt > 0) {
                                return (
                                    <Grid item>
                                        <Paper
                                            onClick={()=>{handleCardClick(c.name)}}
                                        > {`${c.name}, ${c.cnt}`} </Paper>
                                    </Grid>
                                )
                            }
                        })
                    }
                </Grid>
            </Grid>
            <Grid item>
                <Button>
                    Export
                </Button>
            </Grid>
        </Grid>

    )
}
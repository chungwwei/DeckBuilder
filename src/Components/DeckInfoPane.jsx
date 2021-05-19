import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { React } from 'react'

export const DeckInfoPane = (props) => {

    const { 
        myList,
        myDeck,
        setRefresh,
        setMyDeck
     } = props

     const displayCards = []
     for (const c in myDeck.cardCnt) {
         displayCards.push({
            name: c,
            cnt: myDeck.cardCnt[c]
         })
     }
     
     console.log(`cards to display: ${displayCards}`)
     const spellCnt = myDeck.spellCnt
     const championCnt = myDeck.championCnt
     const landmarkCnt = myDeck.landmarkCnt
     const followerCnt = myDeck.followerCnt
     const deckSize = myDeck.cards.length

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
                        displayCards.map((c, idx) => (
                            <Grid item>
                            <Paper
                                onClick={()=>{}}
                            > {`${c.name}, ${c.cnt}`} </Paper>
                        </Grid>

                        ))
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
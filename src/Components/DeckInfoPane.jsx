import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { React } from 'react'

export const DeckInfoPane = (props) => {

    const { myList } = props

    const handleC

    return (
        <Grid container direction='column' spacing={6}>
            <Grid item>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form>
            </Grid>
            <Grid item>
                This is going to be the chart section
                Temporary place holder
            </Grid>

            <Grid item>
                <Grid container direction='column'>
                    {
                        myList.map((c, idx) => (
                            <Grid item>
                            <Paper
                                onClick={()=>{}}
                            > {c.name} </Paper>
                        </Grid>

                        ))
                    }
                </Grid>
            </Grid>
            <Grid item>
                <Button>
                    Save
                </Button>
            </Grid>
        </Grid>

    )
}
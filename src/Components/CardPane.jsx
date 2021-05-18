import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import dataset1 from '../Data/set1-en_us.json'
import { GameCard } from '../Plain/GameCard';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const images = require.context('../../public/images', true);

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
    }),
);


const cards = []
export const CardPane = (props) => {
    const classes = useStyles();
    const { cards, setMyList } = props

    return (

        <div>
            <Grid container spacing={2} justify='center'>
                {
                    cards.map((c, idx) => {
                        let imgsrc = images(`./${c.cardCode}.png`);
                        return (
                            <Grid item xs={5} spacing={3} marginBottom='25px'>
                                <Paper onClick={()=>{setMyList(prev => [...prev, c])}}>
                                    <img src={imgsrc.default}
                                        width='300'
                                        height='450'
                                    ></img>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}
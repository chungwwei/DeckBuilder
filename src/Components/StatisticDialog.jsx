import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { RadialChart, XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, VerticalBarSeries } from 'react-vis';
import { Divider, Paper, Grid } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export const StatisticDialog = (props) => {

    const {
        openStatisticDialog,
        setOpenStatisticDialog,
        myDeck,
        nameToCard
    } = props

    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpenStatisticDialog(false)
    };

    var allCards = []
    const deckSize = myDeck.deckSize
    for (const c in myDeck.cardCnt) {
        if (myDeck.cardCnt[c] > 0) {
            allCards.push(nameToCard[c])
        }
    }

    const manaDataOne = []
    const manaDataTwo = []
    var cand = ''
    if (allCards.length > 0) { cand = allCards[0].region }
    let sevenplusRegionOne = 0
    let sevenplusRegionTwo = 0
    for (let i = 0; i < 16; i++) {
        if (allCards.length > 0) {
            const manaLst = allCards.filter((c) => { return c.cost === i })
            let manaLen = 0
            let region1Len = 0
            let region2Len = 0
            for (let j = 0; j < manaLst.length; j++) {
                let name = manaLst[j].name
                manaLen += myDeck.cardCnt[name]
                if (manaLst[j].region === cand) {
                    region1Len += myDeck.cardCnt[name]
                    if (i >= 7) sevenplusRegionOne += myDeck.cardCnt[name]
                } else {
                    region2Len += myDeck.cardCnt[name]
                    if (i >= 7) sevenplusRegionTwo += myDeck.cardCnt[name]
                }
            }
            if (i <= 6) {
                manaDataOne.push({ x: i, y: region1Len / deckSize })
                manaDataTwo.push({ x: i, y: region2Len / deckSize })
            }
            else if (i === 15) {
                manaDataOne.push({ x: 7, y: sevenplusRegionOne / deckSize })
                manaDataTwo.push({ x: 7, y: sevenplusRegionTwo / deckSize })
            }

        } else {
            manaDataOne.push({ x: i, y: 0 })
            manaDataTwo.push({ x: i, y: 0 })
        }
    }

    const spellLst = allCards.filter((c) => { return c.type === 'Spell' })
    var spellCnt = spellLst.length > 0 ? spellLst.reduce((accumulator, c) => accumulator + myDeck.cardCnt[c.name], 0) : 0
    const landmarkLst = allCards.filter((c) => { return c.type === 'Landmark' })
    var landmarkCnt = landmarkLst.length > 0 ? landmarkLst.reduce((accumulator, c) => accumulator + myDeck.cardCnt[c.name], 0) : 0
    const followerLst = allCards.filter((c) => { return c.type === 'Unit' && c.supertype !== 'Champion' })
    var followerCnt = followerLst.length > 0 ? followerLst.reduce((accumulator, c) => accumulator + myDeck.cardCnt[c.name], 0) : 0

    const commonLst = allCards.filter((c) => { return c.rarity === 'COMMON' })
    var commonCnt = commonLst.length > 0 ? commonLst.reduce((accumulator, c) => accumulator + myDeck.cardCnt[c.name], 0) : 0
    const epicLst = allCards.filter((c) => { return c.rarity === 'EPIC' })
    var epicCnt = epicLst.length > 0 ? epicLst.reduce((accumulator, c) => accumulator + myDeck.cardCnt[c.name], 0) : 0
    const rareLst = allCards.filter((c) => { return c.rarity === 'RARE' })
    var rareCnt = rareLst.length > 0 ? rareLst.reduce((accumulator, c) => accumulator + myDeck.cardCnt[c.name], 0) : 0
    const championLst = allCards.filter((c) => { return c.rarity === 'Champion' })
    var championCnt = championLst.length > 0 ? championLst.reduce((accumulator, c) => accumulator + myDeck.cardCnt[c.name], 0) : 0


    const rarityData = []
    const typeData = []
    if (commonCnt !== 0) rarityData.push({ angle: commonCnt, color: '#4C9A00', name: "Common", label: 'Common' })
    if (rareCnt !== 0) rarityData.push({ angle: rareCnt, color: '#00AEEF', name: "Rare", label: 'Rare' })
    if (epicCnt !== 0) rarityData.push({ angle: epicCnt, color: '#BE00FE', name: "Epic", label: 'Epic' })
    if (championCnt !== 0) rarityData.push({ angle: championCnt, color: '#FFD700', name: "Champion", label: 'Champion' })

    if (spellCnt !== 0) typeData.push({ angle: commonCnt, color: '#d9a5b3', name: "Spell", label: 'Spell' })
    if (landmarkCnt !== 0) typeData.push({ angle: landmarkCnt, color: '#1868ae', name: "Landmark", label: 'Landmark' })
    if (followerCnt !== 0) typeData.push({ angle: followerCnt, color: '#c6d7eb', name: "Follower", label: 'Follower' })
    if (championCnt !== 0) typeData.push({ angle: championCnt, color: '#FFD700', name: "Champion", label: 'Champion' })
    console.log(`spellcnt: ${spellCnt}`)
    console.log(`unitCnt: ${followerCnt}`)
    console.log(`landmarkCnt: ${landmarkCnt}`)
    console.log(`championCnt: ${championCnt}`)
    console.log(`rareCnt: ${rareCnt}`)
    console.log(`epicCnt: ${epicCnt}`)
    console.log(`commonCnt: ${commonCnt}`)


    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openStatisticDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    My Deck Stats
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container justify='center' spacing={2} direction='column'>
                        <Grid item>
                            <Grid container justify='center' spacing={2}>
                                <Grid item>
                                    <Paper>
                                        <Typography>
                                            Type
                                        </Typography>
                                        <RadialChart
                                            width={400}
                                            height={400}
                                            innerRadius={80}
                                            radius={140}
                                            colorType="literal"
                                            data={typeData}
                                            showLabels={true}
                                            labelsAboveChildren={true}
                                            labelsStyle={{ fontSize: 14, color: "#ff0000" }}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper>
                                        <Typography>
                                            Rarity
                                </Typography>
                                        <RadialChart
                                            width={400}
                                            height={400}
                                            innerRadius={80}
                                            radius={140}
                                            colorType='literal'
                                            data={rarityData}
                                            showLabels={true}
                                            labelsStyle={{ fontSize: 14, color: '#ff0000' }}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Paper>
                                <Typography>
                                    Mana
                                </Typography>
                                <XYPlot
                                    width={500}
                                    height={500}

                                    stackBy="y"
                                    xDomain={[
                                        0,
                                        7
                                    ]}
                                    yDoamin={[
                                        0,
                                        1
                                    ]}
                                >
                                    <XAxis />
                                    <VerticalBarSeries
                                        cluster="stack 1"
                                        data={manaDataOne}
                                        style={{}}
                                    />
                                    <VerticalBarSeries
                                        cluster="stack 1"
                                        data={manaDataTwo}
                                        style={{}}
                                    />
                                </XYPlot>
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
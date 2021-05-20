import { React, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home'
import FilterIcon from '@material-ui/icons/FilterList'
import { Grid, Avatar, AvatarGroup, Button, SwipeableDrawer, Divider, FormControl, Input, Select, InputLabel } from '@material-ui/core';


const images = require.context('../../public/images/regions', true);
const setImages = require.context('../../public/images/sets', true);
const useStyles = makeStyles((theme) => ({
  manaOn: {
    background: '#333333'
  },
  manaOff: {
    background: '#539ae0'
  },
  grow: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  }
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const LORAppBar = (props) => {
  const classes = useStyles();
  const {
    setSearchTextField,
    setCardKeywords,
    setFilterBilgewater,
    setFilterDemacia,
    setFilterFreljord,
    setFilterIonia,
    setFilterNoxus,
    setFilterPiltoverZaun,
    setFilterShadowIsles,
    setFilterShurima,
    setFilterTargon,
    setFilterSetOne,
    setFilterSetTwo,
    setFilterSetThree,
    setFilterSetFour,
    setFilterManaOne,
    setFilterManaTwo,
    setFilterManaThree,
    setFilterManaFour,
    setFilterManaFive,
    setFilterManaSix,
    setFilterManaSeven,
    setFilterCommon,
    setFilterRare,
    setFilterEpic
  } = props
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [keywordsList, setKeywordsList] = useState([])

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleToggleDrawer = (open) => {
    // if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'shift')) {
    //   return
    // }
    setToggleDrawer(open)
  }

  const handleChange = (event) => {
    setKeywordsList(event.target.value)
  }

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setKeywordsList(value);
  };

  const handleSearchTextChange = (event) => {
    const text = event.target.value
    setSearchTextField(text)
  }

  const names = ['attune', 'capture', 'burst', 'barrier', 'fast']
  const regions = ['demacia', 'bilgewater', 'ionia', 'freljord', 'piltoverzaun', 'shadowisles', 'shurima', 'noxus', 'targon']
  const rarity = ['Champion', 'epic', 'rare', 'common']
  const cardSets = ['set1', 'set2', 'set3', 'set4']
  const types = ['Champion', 'Cpell', 'Collower', 'Landmark']
  const manacosts = [1, 2, , 3, 4, , 5, 6, 7]

  const regionsOnClickFunctions = (region) => {
    region = region.toLowerCase()
    if (region === 'bilgewater') return setFilterBilgewater
    if (region === 'demacia') return setFilterDemacia
    if (region === 'ionia') return setFilterIonia
    if (region === 'freljord') return setFilterFreljord
    if (region === 'piltoverzaun') return setFilterPiltoverZaun
    if (region === 'shadowisles') return setFilterShadowIsles
    if (region === 'shurima') return setFilterShurima
    if (region === 'noxus') return setFilterNoxus
    if (region === 'targon') return setFilterTargon
  }

  const setsOnClickFunctions = (s) => {
    if (s === 'set1') return setFilterSetOne
    if (s === 'set2') return setFilterSetTwo
    if (s === 'set3') return setFilterSetThree
    if (s === 'set4') return setFilterSetFour
  }

  const manaOnClickFunctions = (m) => {
    if (m === 1) return setFilterManaOne
    if (m === 2) return setFilterManaTwo
    if (m === 3) return setFilterManaThree
    if (m === 4) return setFilterManaFour
    if (m === 5) return setFilterManaFive
    if (m === 6) return setFilterManaSix
    if (m === 7) return setFilterManaSeven
  }

  const rarityClickFunctions = (r) => {
    if (r === 'common') return setFilterCommon
    if (r === 'rare') return setFilterRare
    if (r === 'epic') return setFilterEpic
  }

  const renderDrawer = (
    <SwipeableDrawer
      anchor='right'
      open={toggleDrawer}
      onClose={() => handleToggleDrawer(false)}
      onOpen={() => handleToggleDrawer(true)}
    >
      <Divider></Divider>
      <Grid container>
        {regions.map((region, idx) => {
          let imgsrc = images(`./icon-${region}.png`);
          let func = regionsOnClickFunctions(region);
          return (
            <Grid item>
              <IconButton onClick={() => func(old => !old)}>
                <Avatar src={imgsrc.default} />
              </IconButton>
            </Grid>
          )
        }
        )}
      </Grid>
      <Divider></Divider>
      <Grid container justify='center'>
        {cardSets.map((s, idx) => {
          let imgsrc = setImages(`./${s}.png`);
          let func = setsOnClickFunctions(s);
          return (
            <Grid item>
              <IconButton onClick={() => func(old => !old)}>
                <Avatar src={imgsrc.default} />
              </IconButton>
            </Grid>
          )
        }
        )}
      </Grid>
      <Divider></Divider>
      <Grid container justify='center'>
        {rarity.map((s, idx) => {
          let func = rarityClickFunctions(s);
          return (
            <Grid item>
              <IconButton onClick={() => func(old => !old)}>
                <Button> {s} </Button>
              </IconButton>
            </Grid>
          )
        }
        )}
      </Grid>
      <Divider></Divider>
      <Grid container justify='center'>
        {types.map((s, idx) => {
          return (
            <Grid item>
              <IconButton onClick={() => { }}>
                <Button> {s} </Button>
              </IconButton>
            </Grid>
          )
        }
        )}
      </Grid>
      <Divider></Divider>
      <Grid container justify='center'>
        {manacosts.map((s, idx) => {
          let func = manaOnClickFunctions(s);
          return (
            <Grid item>
              <IconButton onClick={() => func(old => !old)}>
                <Button className={classes.manaOff}> {s} </Button>
              </IconButton>
            </Grid>
          )
        }
        )}
      </Grid>
      <Divider></Divider>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">KEYWORDS</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={keywordsList}
          onChange={handleChange}
          input={<Input />}
        // MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SwipeableDrawer>
  )

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {renderDrawer}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Deck Builder
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchTextChange}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge='end'
              color="inherit"
              onClick={() => { handleToggleDrawer(true) }}>
              <Badge color="secondary">
                <FilterIcon />
              </Badge>
            </IconButton>
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

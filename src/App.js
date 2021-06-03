import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import { CardPane } from './Components/CardPane';
import { DeckInfoPane } from './Components/DeckInfoPane';
import { HomePane } from './Components/HomePane';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(',')
  }
})

function App() {
  return (
    <div className="App">
      <HomePane></HomePane>
      <p> Enjoy the LOR Deck Builder </p>
      <p> Made By ChuangWei Ma</p>
    </div>
  );
}

export default App;

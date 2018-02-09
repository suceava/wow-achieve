import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
//import logo from '../../public/wow-logo.png';
import './App.css';
import wowData from '../data/wow-data.js';
import CharacterSearch from './CharacterSearch.js';
import Nav from './Nav.js';
import Footer from './Footer.js';
import ReputationGridContainer from '../containers/ReputationGridContainer.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      realms: [],
      achievements: [],
      factions: [],
      character_list: []
    };

    //wowData.API_KEY = this.state.apiKey;
    //wowData.LOCALE = this.state.locale;

    this.handleSearchCharacter = this.loadCharacter.bind(this);
    this.handleRemoveCharacter = this.removeCharacter.bind(this);
  }

  componentDidMount() {
    // load factions
    wowData.loadFactions()
      .then(response => this.setState({ factions: response.factions }));
    // load achievements
    wowData.loadAchievements()
      .then(response => this.setState({ achievements: response.achievements }));
    // load realms list
    wowData.loadRealms()
      .then(response => this.setState({ realms: response.realms }));

    this.getLoadedCharacters();
  }

  getLoadedCharacters() {
    // get characters from local storage
    const data = localStorage.getItem('character_list');
    if (data) {
      const char_list = JSON.parse(data);

      this.setState({ character_list: char_list });

      // load the chars
      const charPromises = [];
      char_list.forEach(c => charPromises.push(wowData.loadCharacter(c.realm, c.name)));
      // wait for all to load
      Promise.all(charPromises)
        .then(chars => {
          this.setState({ characters: chars });
        });
    }
  }

  loadCharacter(realm, name) {
    const _realm = realm.toLowerCase();
    const _name = name.toLowerCase();

    // make sure it's not a duplicate
    const char_list = this.state.character_list.slice();
    if (char_list.find(c => c.realm === _realm && c.name === _name)) {
      // char already loaded
      return;
    }

    const self = this;
    wowData.loadCharacter(_realm, _name)
      .then(response => {
        // add character to list
        const chars = self.state.characters.slice();
        chars.push(response);
        self.setState({ characters: chars });

        // store list of chars
        char_list.push({
          realm: _realm,
          name: _name
        });
        self.setState({ character_list: char_list });
        localStorage.setItem('character_list', JSON.stringify(char_list));
      })
      .catch(error => {
        console.dir(error);
        if (error.response && error.response.status && error.response.status === 404) {
          // charater not found
          alert('Character not found');
        }
      });
  }

  removeCharacter(realm, name) {
    const _realm = realm.toLowerCase();
    const _name = name.toLowerCase();

    const char_list = this.state.character_list.slice();
    const i = char_list.findIndex(c => c.realm === _realm && c.name === _name);

    if (i >= 0) {
      // remove from char list
      char_list.splice(i, 1);
      this.setState({ character_list: char_list });
      localStorage.setItem('character_list', JSON.stringify(char_list));

      // remove character from state
      const chars = this.state.characters.slice();
      const j = chars.findIndex(c => c.realm === realm && c.name === name);
      if (j >= 0) {
        chars.splice(j, 1);
        this.setState({ characters: chars });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <CharacterSearch 
          realms={this.state.realms}
          handleSearch={this.handleSearchCharacter}
        />

        <Nav />

        <Switch>
          <Route exact path="/reputation" render={() => 
            <ReputationGridContainer
              factions={this.state.factions}
              characters={this.state.characters}
              handleRemove={this.handleRemoveCharacter}
            />
          }/>

          <Route path="/" render={() =>
            <Redirect to="/reputation"/>
          }/>
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default App;

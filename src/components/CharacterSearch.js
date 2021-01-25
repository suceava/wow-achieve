import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class CharacterSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      realm: '',
      character: '' 
    };
    this.handleSearch = props.handleSearch;
  }

  characterOnChange(e) {
    this.setState({ character: e.target.value });
  }

  loadCharacter() {
    this.handleSearch(this.state.realm, this.state.character);
  }

  render() {
    return(
      <div className="character-search">        
        <div className='character-search-realm'>
          <Select
            name='realms-select'
            options={this.props.realms.map(realm => ({ label: realm.name, value: realm.slug }))}
            value={this.state.realm}
            placeholder='Realm'
            onChange={option => this.setState({ realm: option.value})}
          />
        </div>
        
        <div className='character-search-char'>
          <div>
            <input
              type='text'
              name='character-input'
              placeholder='Character'
              onChange={(e) => this.characterOnChange(e)}
            />
          </div>
        </div>

        <div className='character-search-buttonbar'>
          <div>
            <button onClick={(e) => this.loadCharacter(e)}>Load</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterSearch;
import React, { Component } from 'react';
import ReputationGrid from '../components/ReputationGrid.js';

class ReputationGridContainer extends Component {
  getReputationGridColumns(characters) {
    // first column is always the faction
    const cols = [{ name: 'Faction' }];

    if (characters) {
      // create a column for each character
      characters.forEach(char => {
        cols.push({
          name: char.name,
          realm: char.realm,
          level: char.level,
          class: char.class,
          race: char.race
        });
      });
    }
    return cols;
  }

  getReputationGridRows(factions, characters, rows, depth) {
    // create a row for each faction
    factions.forEach(fac => {
      const row = {
        faction: {
          id: fac.id,
          name: fac.name
        },
        reputations: [],
        depth: depth
      }
      rows.push(row);

      if (!fac.factions) {
        // find character reps
        characters.forEach(char => {
          const r = char.reputation.find(e => e.id === fac.id);
          if (r) {
            row[char.name] = r;
          }
        });
      }
      else {
        // not an actual rep but a rep category

        // recurse into sub-factions
        this.getReputationGridRows(fac.factions, characters, rows, depth + 1);
      }
    });
  }

  getReputationGridData(factions, characters) {
    const data = {
      columns: this.getReputationGridColumns(characters),
      rows: []
    };
    this.getReputationGridRows(factions, characters, data.rows, 1);
    return data;
  }

  render() {
    return(
      <div className='rep-grid-container'>
        <ReputationGrid
          data={this.getReputationGridData(this.props.factions, this.props.characters)}
          handleRemove={this.props.handleRemove}
        />
      </div>
    );
  }
}

export default ReputationGridContainer;
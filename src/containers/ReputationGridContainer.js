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
          race: char.race,
          faction: char.faction === 0 ? 'alliance' : 'horde'
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
          name: fac.name,
          side: fac.side,
          npc: fac.npc,
          hasFactions: false
        },
        depth: depth
      }
      rows.push(row);

      if (fac.id) {
        // find character reps
        characters.forEach(char => {
          let r = char.reputation.find(e => e.id === fac.id);
          if (!r) {
            r = {
              id: fac.id,
              name: fac.name
            };
          }
          row[char.realm + '_' + char.name] = r;
        });
      }

      if (fac.factions) {
        row.faction.hasFactions = true;

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

    data.showAlliance = !!data.columns.find(c => c.faction === 'alliance');
    data.showHorde = !!data.columns.find(c => c.faction === 'horde');

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
import React, { Component } from 'react';
import ReputationGrid from '../components/ReputationGrid.js';
import wowData from '../data/wow-data.js';

class ReputationGridContainer extends Component {
  getReputationGridColumns(characters) {
    // first column is always the faction
    const cols = [{ name: 'Faction' }];

    if (characters) {
      // create a column for each character
      characters.forEach(char => {
        cols.push({
          name: char.name,
          realm: char.realm.name,
          level: char.level,
          achievement_points: char.achievement_points,
          class: {
            name: char.character_class.name,
            id: char.character_class.id
          },
          covenant: {
            name: char.covenant_progress ? char.covenant_progress.chosen_covenant.name : '',
            id: char.covenant_progress ? char.covenant_progress.chosen_covenant.id : 0
          },
          faction: {
            name: char.faction.name,
            type: char.faction.type.toLowerCase()
          },
          ilvl: char.equipped_item_level,
          race: char.race.name,
          spec: char.active_spec.name,
          title: char.active_title.name
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
          let r = char.reputations.reputations.find(e => e.faction.id === fac.id);
          if (!r) {
            r = {
              id: fac.id,
              name: fac.name
            };
          }
          row[char.realm.name + '_' + char.name] = r;
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

    data.showAlliance = !!data.columns.find(c => c.faction && c.faction.type === wowData.FACTIONS.ALLIANCE);
    data.showHorde = !!data.columns.find(c => c.faction && c.faction.type === wowData.FACTIONS.HORDE);

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
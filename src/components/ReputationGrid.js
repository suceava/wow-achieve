import React, { Component } from 'react';
import wowData from '../data/wow-data.js';
import sideAlliance from '../../public/alliance.png';
import sideHorde from '../../public/horde.png';

class ReputationGrid extends Component {
  headerRow(data) {
    const ths = data.columns.map(col => {
      const cls = 'rep-grid-column rep-grid-header-column ' + 
        (col.name === 'Faction' ? 'rep-grid-column-faction' : 'rep-grid-column-rep');
      const nameCls = col.realm ? `class-${col.class.id}` : '';
      const key = (col.realm ? col.realm + '_' : '') + col.name;

      function removeCharacter(e) {
        e.preventDefault();

        const char = e.target.getAttribute('data-char');
        const realm = e.target.getAttribute('data-realm');
        if (this.props.handleRemove) {
          this.props.handleRemove(realm, char);
        }
      }

      return(
        <div className={cls} key={key}>
          <div className='rep-grid-header-column-rep'>
            <div className={nameCls}>
              {col.name}
            </div>
            {col.realm && 
              <div className='rep-grid-header-ilvl'>{col.ilvl} iLvl</div>}
            {col.realm && 
              <div 
                className='rep-grid-header-close' 
                title='Remove character' 
                onClick={removeCharacter.bind(this)} 
                data-char={col.name} 
                data-realm={col.realm}>x</div>}
            {col.realm &&
              <div className='rep-grid-header-column-rep-details'>
                <div className='rep-grid-column-header-faction-icon'>
                  <img src={col.faction.type === wowData.FACTIONS.ALLIANCE ? sideAlliance : sideHorde} alt={col.faction.name} />
                </div>

                <div className={`rep-grid-column-rep-class`}>{col.level} {col.spec} {col.class.name}</div>
                <div className='rep-grid-column-rep-realm'>{col.realm}</div>
              </div>
            }
          </div>
        </div>
      );
    });

    return(
      <div className='rep-grid-header-row'>
        {ths}
      </div>
    );
  }

  bodyRowCols(cols, row) {
    return cols.map(col => {
      const colName = (col.realm ? col.realm + '_' : '' ) + col.name;
      let cls = 'rep-grid-column ';

      if (colName === 'Faction') {
        // first column is the faction name

        // add faction icon
        const sideImg = (row.faction.side ?
          <div className='rep-grid-column-faction-icon'>
            <img src={row.faction.side === wowData.FACTIONS.ALLIANCE ? sideAlliance : sideHorde} alt={row.faction.side} />
          </div>
          : 
          ''
        );

        cls += 'rep-grid-column-faction ' + (!row.faction.hasFactions ? 'rep-grid-faction ' : `rep-grid-faction-category-${row.depth}`);
        return (
          <div className={cls} key={`${row.faction.name}_${colName}`}>
            <div className='rep-grid-column-faction-label'>
              {row.faction.name}
              {sideImg}
            </div>
          </div>
        );
      }
      else {
        // reputation column
        const rep = row[colName];
        // if character has no rep with a faction there will still be a rep object with just rep ID & name, but no other props
        const hasRep = rep && rep.standing;
        const val = (hasRep ? (rep.standing.max > 0 ? `${rep.standing.value} / ${rep.standing.max}` : ' ') : '');
        const width = (hasRep ? 100 * rep.standing.value / rep.standing.max : 0);
        const widthStyle = `${width}%`;
        const standing = hasRep ? rep.standing.name['en_US'] : '';

        cls += `rep-grid-column-rep rep-grid-column-rep-standing-${standing.replace(' ', '-')} ` + (!row.faction.hasFactions ? '' : `rep-grid-rep-category-${row.depth}`);

        const repBar = (val ?
          <div className='rep-grid-rep-container'>
            <div className='rep-grid-rep-bar'>
              <div className='rep-grid-rep-bar-score'>
                {val}
              </div>
              <div className='rep-grid-rep-bar-fill' style={{width: widthStyle}}>
              </div>
            </div>
            <div className='rep-grid-rep-standing'>
              {standing}
            </div>
          </div>
          :
          ''
        );
        return (
          <div className={cls} key={`${row.faction.name}_${colName}`}>
            {repBar}
          </div>
        )
      }
    });
  }

  bodyRows(data) {
    const rows = data.rows
      .filter(row => {
        // filter out side-specific factions if we don't have characters for that faction in our list
        return (row.faction.side !== wowData.FACTIONS.ALLIANCE && row.faction.side !== wowData.FACTIONS.HORDE) ||
          (data.showAlliance && row.faction.side === wowData.FACTIONS.ALLIANCE) ||
          (data.showHorde && row.faction.side === wowData.FACTIONS.HORDE);
      })
      .map(row => {
        // if ((row.faction.side === wowData.FACTIONS.ALLIANCE && !data.showAlliance) ||
        //     (row.faction.side === wowData.FACTIONS.HORDE && !data.showHorde)) 
        // {
        //   // don't show faction-specific rep if we don't have character for that faction
        //   return;
        // }

        return (
          <div className='rep-grid-row' key={row.faction.name}>
            {this.bodyRowCols(data.columns, row)}
          </div>
        );
      });
    return(rows);
  }

  render() {
    return(
      <div className='rep-grid'>
        <div className='rep-grid-header'>
          {this.headerRow(this.props.data)}
        </div>
        <div className='rep-grid-body'>
          {this.bodyRows(this.props.data)}
        </div>
      </div>
    );
  }
}

export default ReputationGrid;
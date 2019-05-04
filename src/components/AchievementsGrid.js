import React, { Component } from 'react';
import wowData from '../data/wow-data.js';
import sideAlliance from '../../public/alliance.png';
import sideHorde from '../../public/horde.png';

class AchievementsGrid extends Component {
  headerRow(data) {
    const ths = data.columns.map(col => {
      const cls = 'rep-grid-column rep-grid-header-column ' + 
        (col.name === 'Faction' ? 'rep-grid-column-faction' : 'rep-grid-column-rep');
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
            <div>
              {col.name}
            </div>
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
                  <img src={col.faction === 'alliance' ? sideAlliance : sideHorde} alt={col.faction} />
                </div>

                <div className='rep-grid-column-points-wrapper'>
                  <div className='rep-grid-column-points-svg-container'>
                    <svg viewBox="0 0 64 64">
                      <g>
                        <path d="M51.492,3.677c-5.941,1.654-14.886,3.906-19.494,3.906c-4.611,0-13.553-2.252-19.495-3.906   C9.566,2.862,6.628,4.932,6.628,7.821v34.684c0,1.336,0.657,2.597,1.778,3.415l20.792,15.176c0.824,0.602,1.814,0.902,2.8,0.904   c0.989,0,1.981-0.3,2.805-0.904L55.594,45.92c1.122-0.818,1.778-2.08,1.778-3.415V7.823C57.37,4.935,54.43,2.862,51.492,3.677z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className='rep-grid-column-points'>
                    {col.achievementPoints}
                  </div>
                </div>
                <div className={`rep-grid-column-rep-class class-${col.class}`}>
                  {col.level} {wowData.CLASSES[col.class]}
                </div>
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
      const colName = (col.realm ? col.realm + '_' : '') + col.name;
      let cls = 'rep-grid-column ';

      if (colName === 'Achievement') {
        // first column is the achievement name

        cls += 'rep-grid-column-faction';
        return (
          <div className={cls} key={`${row.achievement.name}_${colName}`}>
            <div className='rep-grid-column-faction-label'>
              {row.achievement.name}
            </div>
          </div>
        )
      }
      else {
        // character achievement
        const ach = row[colName];
        const percent = Math.round(ach.percent * 100);
        const strokeArray = `${percent} ${100 - percent}`;

        cls += `rep-grid-column-rep`;

        const achieveBox =
          <div className='achieve-grid-svg-container'>
            <svg viewBox='0 0 40 40'>
              <circle className='achieve-grid-svg-outline' cx='20' cy='20' r='15.9155'></circle>
              <circle className='achieve-grid-svg-unfilled' cx='20' cy='20' r='15.9155'></circle>
              <circle className='achieve-grid-svg-filled' cx='20' cy='20' r='15.9155' style={{strokeDasharray: strokeArray}}></circle>
            </svg>
            <div className='achieve-grid-svg-percent'>
              {percent}%
            </div>
          </div>;

        const achievePoints =
          <div className='achieve-grid-points-container'>
            <div className='achieve-grid-points-wrapper'>
              <div className='achieve-grid-points-svg-container'>
                <svg viewBox="0 0 64 64">
                  <g id="achievement-shield">
                    <path d="M51.492,3.677c-5.941,1.654-14.886,3.906-19.494,3.906c-4.611,0-13.553-2.252-19.495-3.906   C9.566,2.862,6.628,4.932,6.628,7.821v34.684c0,1.336,0.657,2.597,1.778,3.415l20.792,15.176c0.824,0.602,1.814,0.902,2.8,0.904   c0.989,0,1.981-0.3,2.805-0.904L55.594,45.92c1.122-0.818,1.778-2.08,1.778-3.415V7.823C57.37,4.935,54.43,2.862,51.492,3.677z"></path>
                  </g>
                </svg>
              </div>
              <div className='achieve-grid-points'>
                {ach.points}
              </div>
            </div>
          </div>;


        return (
          <div className={cls} key={`${row.achievement.name}_${colName}`}>
            {achieveBox}
            {achievePoints}
          </div>
        )
      }
    });
  }

  bodyRows(data) {
    const rows = data.rows
      .filter(row => {
        return true;
      })
      .map(row => {
        return (
          <div className='rep-grid-row' key={row.achievement.name}>
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

export default AchievementsGrid;
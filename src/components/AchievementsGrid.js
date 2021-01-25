import React, { Component } from 'react';
import wowData from '../data/wow-data.js';
import sideAlliance from '../../public/alliance.png';
import sideHorde from '../../public/horde.png';

class AchievementsGrid extends Component {
  headerRow(data) {
    const ths = data.columns.map(col => {
      const cls = 'rep-grid-column rep-grid-header-column ' + 
        (col.name === 'Achievement' ? 'rep-grid-column-faction' : 'rep-grid-column-rep');
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
              <div className='rep-grid-header-ilvl'>
                <svg height='14px' width='14px' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
                  <path xmlns='http://www.w3.org/2000/svg' d='M13.593 18.962l-6.729 7.035c-.135.142-.061.383.128.417l3.932.683a.23.23 0 00.205-.068l3.428-3.584 7.684 7.93 3.927-4.106.346-.362 3.725-3.896-7.684-7.928 3.646-3.814a.252.252 0 00.066-.213l-.654-4.112a.232.232 0 00-.398-.133l-6.853 7.167L7.485 4.401V.428A.42.42 0 007.075 0H.791a.419.419 0 00-.409.428v6.571c0 .236.183.427.409.427h3.512l9.29 11.536zm27.505 15.599l-3.8 3.972-.24.251-3.958 4.139 18.652 19.411L61.562 64l-1.671-9.882-18.793-19.557zM63.209.017h-6.283a.418.418 0 00-.409.428v3.672L45.483 13.83l-6.728-7.034c-.135-.143-.366-.065-.397.132l-.654 4.111a.253.253 0 00.066.214l3.428 3.585L4.002 53.726 2.408 63.983l9.451-1.748 37.336-39.036 3.646 3.812a.23.23 0 00.205.069l3.931-.684c.188-.031.263-.274.128-.415l-6.854-7.166L59.41 7.442h3.799a.418.418 0 00.409-.428V.444a.418.418 0 00-.409-.427z' style={ { fill: 'rgb(250, 192, 30)' } }/>
                </svg>
                {col.ilvl}
              </div>}
              {col.realm && 
              <div className='rep-grid-header-achievement-points'>
                <svg height='14px' width='14px' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
                  <path xmlns='http://www.w3.org/2000/svg' d='M51.492 3.677c-5.941 1.654-14.886 3.906-19.494 3.906-4.611 0-13.553-2.252-19.495-3.906-2.937-.815-5.875 1.255-5.875 4.144v34.684c0 1.336.657 2.597 1.778 3.415l20.792 15.176a4.765 4.765 0 002.8.904c.989 0 1.981-.3 2.805-.904L55.594 45.92c1.122-.818 1.778-2.08 1.778-3.415V7.823c-.002-2.888-2.942-4.961-5.88-4.146z'  style={ { fill: 'rgb(250, 192, 30)' } }/>
                </svg>
                {col.achievementPoints}
              </div>}
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

                <div className={`rep-grid-column-rep-class`}>
                  {col.level} {col.spec} {col.class.name}
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
        let colorCls = 'achieve-grid-svg-filled-';
        if (percent >= 90) {
          colorCls += 'green';
        } else if (percent >= 33) {
          colorCls += 'orange';
        } else {
          colorCls += 'brown';
        }
        const fillCls = `achieve-grid-svg-filled ${colorCls}`;

        cls += `rep-grid-column-rep`;

        const achieveBox =
          <div className='achieve-grid-svg-container'>
            <svg viewBox='0 0 40 40'>
              <circle className='achieve-grid-svg-outline' cx='20' cy='20' r='15.9155'></circle>
              <circle className='achieve-grid-svg-unfilled' cx='20' cy='20' r='15.9155'></circle>
              <circle className={fillCls} cx='20' cy='20' r='15.9155' style={{strokeDasharray: strokeArray}}></circle>
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
    if (!this.props.data.columns || this.props.data.columns.length <= 1) {
      return(
        <div className='rep-grid-placeholder'>
          Please load one or more characters to compare
        </div>
      );
    }

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
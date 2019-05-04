import React, { Component } from 'react';
import _ from 'lodash';
import AchievementsGrid from '../components/AchievementsGrid';

class AchievementsGridContainer extends Component {
  getAchievementsGridColumns(achievements_view, characters) {
    const cols = [];

    cols.push({ name: 'Achievement' });
    if (achievements_view.length > 0) {
      // first column is the achievement
      cols.push({ name: 'Achievement' });
    }
    
    if (characters) {
      // create a column for each character
      characters.forEach(char => {
        cols.push({
          name: char.name,
          realm: char.realm,
          level: char.level,
          achievementPoints: char.achievementPoints,
          class: char.class,
          race: char.race,
          faction: char.faction === 0 ? 'alliance' : 'horde'
        });
      });
    }
    return cols;
  }

  getAchievementsGridRows(achievements_view, achievements, characters) {
    const rows = [];

    if (achievements_view.length <= 0) {
      // top level view => summary level
      achievements.forEach(ach => {
        const row = {
          achievement: {
            id: ach.id,
            name: ach.name,
            count: ach.ids ? ach.ids.length : 0
          }
        };
        rows.push(row);

        characters.forEach(char => {
          const completedForCategory = _.intersection(ach.ids, char.achievements.achievementsCompleted);
          const points = this.getAchievementPoints(ach, completedForCategory);
          const count = completedForCategory ? completedForCategory.length : 0;
          const percent = row.achievement.count > 0 ? count / row.achievement.count : 0;

          row[`${char.realm}_${char.name}`] = {
            count: count,
            percent: percent,
            points: points.completedPoints
          };
        });
      });
    }

    return rows;
  }

  getAchievementPoints(achievements, completedAchievements) {
    // sum up achievement points for completed achievements by recursing through categories
    const points = {
      totalPoints: 0,
      completedPoints: 0
    };

    if (achievements.achievements) {
      // add up top level first
      achievements.achievements.forEach(ach => {
        points.totalPoints += ach.points;
        if (_.includes(completedAchievements, ach.id)) {
          points.completedPoints += ach.points;
        }
      })
    }
    
    if (achievements.categories) {
      // recurse through sub-categories
      achievements.categories.forEach(cat => {
        const catPoints = this.getAchievementPoints(cat, completedAchievements);
        points.totalPoints += catPoints.totalPoints;
        points.completedPoints += catPoints.completedPoints;
      });
    }

    return points;
  }

  getAchievementsGridData(achievements_view, achievements, characters) {
    const data = {
      columns: this.getAchievementsGridColumns(achievements_view, characters),
      rows: this.getAchievementsGridRows(achievements_view, achievements, characters)
    };

    return data;
  }

  render() {
    return(
      <div className='rep-grid-container'>
        <AchievementsGrid
          data={this.getAchievementsGridData(
            this.props.achievements_view, 
            this.props.achievements, 
            this.props.characters)}
          handleRemove={this.props.handleRemove}
        />
      </div>
    )
  }
}

export default AchievementsGridContainer;
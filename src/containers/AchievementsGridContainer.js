import React, { Component } from 'react';
import _ from 'lodash';
import AchievementsGrid from '../components/AchievementsGrid';

class AchievementsGridContainer extends Component {
  getAchievementsGridColumns(achievements_view, characters) {
    const cols = [{ name: 'Achievement' }];

    // NOT SURE WHY THIS WAS WRITTEN THIS WAY
    // cols.push({ name: 'Achievement' });
    // if (achievements_view.length > 0) {
    //   // first column is the achievement
    //   cols.push({ name: 'Achievement' });
    // }
    
    if (characters) {
      // create a column for each character
      characters.forEach(char => {
        cols.push({
          name: char.name,
          realm: char.realm.name,
          level: char.level,
          achievementPoints: char.achievement_points,
          class: {
            name: char.character_class.name,
            id: char.character_class.id
          },
          faction: {
            name: char.faction.name,
            type: char.faction.type.toLowerCase()
          },
          ilvl: char.equipped_item_level,
          race: char.race.name,
          spec: char.active_spec.name,
          title: char.active_title ? char.active_title.name : ''
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
            points: ach.aggregatePoints
          }
        };
        rows.push(row);

        characters.forEach(char => {
          // get progress
          const prog = char.achievements.category_progress.find((c) => c.category.id === ach.id);
          if (!prog) {
            console.error('not found', ach.id);
            return;
          }
          const categoryPoints = row.achievement.points[char.faction.type.toLowerCase()];
          const percent = Math.floor((prog.quantity / categoryPoints.quantity) * 100) / 100;

          row[`${char.realm.name}_${char.name}`] = {
            quantity: prog.quantity,
            points: prog.points,
            percent: percent
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
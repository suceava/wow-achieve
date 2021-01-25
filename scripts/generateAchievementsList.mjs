/*
 * call achievements API and generate the achievements list we need to use in the app
 *
 * - get achievement category index
 */

import fs from 'fs';
import wowData from '../src/data/wow-data.js';

const FILE_NAME = 'wow-achievements.js';

const loadCategoryList = async (categoryList) => {
  const achievements = [];

  for await (const category of categoryList) {
    // we don't want Guild categories right now
    if (category.is_guild_category) continue;

    const cat = await wowData.loadAchievementCategory(category.id);
//console.log(cat);

    // add category
    const ach = {
      id: category.id,
      name: category.name,
      displayOrder: cat.display_order,
      aggregatePoints: cat.aggregates_by_faction
    };
    achievements.push(ach);

    if (cat.achievements) {
      ach.achievements = cat.achievements.map((a) => ({ id: a.id, name: a.name }));
    }
    if (cat.subcategories) {
      ach.categories = await loadCategoryList(cat.subcategories);
    }
  }

  // sort
  achievements.sort((a1, a2) => {
    return a1.displayOrder - a2.displayOrder;
  });

  return achievements;
};

const loadData = async () => {
  // load categories
  const categories = await wowData.loadAchievementCategories();
  const achievementList = await loadCategoryList(categories.root_categories);
  console.log(achievementList);

  // write to file
  const content = 'const WOW_ACHIEVEMENTS = ' +
    JSON.stringify(achievementList, null, 2) +
    '\n' +
    'export default WOW_ACHIEVEMENTS;'
  await fs.writeFile(FILE_NAME, content, (err) => {
    if (err) return console.error(err);
    console.log(`Achievements data written to ${FILE_NAME}`);
  });

  return achievementList;
};

loadData();

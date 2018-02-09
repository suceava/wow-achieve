import 'whatwg-fetch';
import moment from 'moment';
import wow_factions from './wow-factions.js';

const wowData =  {
  API_KEY: process.env.REACT_APP_API_KEY,
  REGION: 'us',
  LOCALE: 'en-US',
  BASE_URL: 'api.battle.net/wow/',
  ICON_URL: 'http://media.blizzard.com/wow/icons/56/',

  REGIONS: [
    { value: 'us', text: 'North America' },
    { value: 'eu', text: 'Europe' }
  ],
  LOCALES: [
    { region: 'us', value: 'en-US' },
    { region: 'eu', value: 'en-GB' }
  ],

  STANDINGS: [
    'Hated',      // 0
    'Hostile',    // 1
    'Unfriendly', // 2
    'Neutral',    // 3
    'Friendly',   // 4
    'Honored',    // 5
    'Revered',    // 6
    'Exalted'     // 7
  ],

  NPC_STANDINGS: [
    'Stranger',     // 0
    'Acquaintance', // 1
    'Pal',          // 2
    'Buddy',        // 3
    'Good Friend',  // 4
    'Best Friend'   // 5
  ],

  CLASSES: [
    '',
    'Warrior',        // 1
    'Paladin',        // 2
    'Hunter',         // 3
    'Rogue',          // 4
    'Priest',         // 5
    'Death Knight',   // 6
    'Shaman',         // 7
    'Mage',           // 8
    'Warlock',        // 9
    'Monk',           // 10
    'Druid',          // 11
    'Demon Hunter'    // 12
  ],

  _DEV_ALWAYS_READ_CACHED_DATA: false,

  _getJson: function(url, expirationDays) {
    expirationDays = expirationDays || 365;

    // check local storage first
    const data = localStorage.getItem(url.toLowerCase());
    if (data) {
      const cachedData = JSON.parse(data);
      // make sure cache is not expired
      if (this._DEV_ALWAYS_READ_CACHED_DATA || 
          (cachedData.expirationDate && 
           moment().isBefore(cachedData.expirationDate))
         ) 
      {
        return Promise.resolve(cachedData);
      }
    }

    const hasParams = url.indexOf('?') > 0;
    const fullUrl = `https://${this.REGION}.${this.BASE_URL}${url}` + (hasParams ? '&' : '?') + `locale=${this.LOCALE}&apikey=${this.API_KEY}`;
    return fetch(fullUrl)
      .then(response => {
        // check status for a 200 code, otherwise throw error
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(response => response.json())
      .then(json => {
        // set expiration date on data
        json.expirationDate = moment().add(expirationDays, 'days');

        // save to local storage (has to be a string)
        localStorage.setItem(url.toLowerCase(), JSON.stringify(json));
        return Promise.resolve(json);
      })
      .catch(error => { throw error; });
  },

  loadCharacter: function(realm, character) {
    return this._getJson(`character/${realm}/${character}?fields=reputation`, 1);
  },

  loadRealms: function() {
    return this._getJson('realm/status', 30);
  },

  loadAchievements: function() {
    return this._getJson('data/character/achievements', 7);
  },

  loadFactions: function() {
    const factions = {
      factions: wow_factions
    };

    return Promise.resolve(factions);
  }
}

export default wowData;
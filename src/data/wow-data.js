import moment from 'moment';
import 'whatwg-fetch';
import wow_factions from './wow-factions.js';

const wowData =  {
  CACHED_TOKEN: null,
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
  REGION: 'us',
  LOCALE: 'en_US',
  BASE_OAUTH_URL: 'battle.net/oauth/token',
  BASE_GAME_API_URL: 'api.blizzard.com/data/wow/',
  BASE_PROFILE_API_URL: 'api.blizzard.com/profile/wow/',
  ICON_URL: 'http://media.blizzard.com/wow/icons/56/',

  REGIONS: [
    { value: 'us', text: 'North America' },
    { value: 'eu', text: 'Europe' }
  ],
  LOCALES: [
    { region: 'us', value: 'en_US' },
    { region: 'eu', value: 'en_GB' }
  ],

  FACTIONS: {
    ALLIANCE: 'alliance',
    HORDE: 'horde'
  },

  _clientCredentials: function(forceFetch = false) {
    if (!forceFetch && this.CACHED_TOKEN) {
      // check expiration
      return this.CACHED_TOKEN;
    }

    const fullUrl = `https://${this.REGION}.${this.BASE_OAUTH_URL}`;
    const encodedCreds = Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64');

  _DEV_ALWAYS_READ_CACHED_DATA: true,

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCreds}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    };

    return fetch(fullUrl, options)
      .then(response => {
        this.CACHED_TOKEN = response.json();
        return this.CACHED_TOKEN;
      });
  },

  _getApiJson: function(url, expirationDays) {
    return this._getJson(`https://${this.REGION}.${this.BASE_GAME_API_URL}${url}&locale=${this.LOCALE}`, expirationDays);
  },
  _getProfileJson: function(url, expirationDays) {
    return this._getJson(`https://${this.REGION}.${this.BASE_PROFILE_API_URL}${url}&locale=${this.LOCALE}`, expirationDays);
  },

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

    // get access token
    return this._clientCredentials()
      .then(token => {
        const options = {
          headers: { 'Authorization': `Bearer ${token.access_token}` }
        };

        return fetch(url, options)
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
      });
  },

  loadCharacterProfile: function(realm, character, loadExtras = ['reputations']) {
    return this._getProfileJson(`character/${realm}/${character}?namespace=profile-us`, 1)
      .then(profile => {
        if (loadExtras) {
          const extra = loadExtras[0];
          if (profile[extra]) {
            return this._getJson(profile[extra].href, 1)
              .then(responseExtra => {
                profile[extra] = responseExtra;
                return profile;
              });
          }
        }

        return profile;
      })
  },

  loadCharacterReputations: function(realm, character) {
    return this._getProfileJson(`character/${realm}/${character}/reputations?namespace=profile-us`, 1);
  },

  loadRealms: function() {
    return this._getApiJson('realm/index?namespace=dynamic-us', 30);
  },

  loadAchievementCategories: function() {
    return this._getApiJson('achievement-category/index?namespace=static-us', 7);
  },

  loadAchievements: function() {
    return this._getApiJson('achievement/index?namespace=static-us', 7);
  },

  loadFactions: function() {
    const factions = {
      factions: wow_factions
    };

    return Promise.resolve(factions);
  }
}

export default wowData;
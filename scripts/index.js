import state from "./constants/state.js";
import { wakePersonalProjects, addEventListeners, lang, loadWaypoints, scrollEffects } from "./core/index.js";
import { getSkills, getProjects, getExperience, getLanguageJSON } from "./shared/services/index.js";


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('current-year').textContent = `©${new Date().getFullYear()}`;
  // @ts-ignore
  document.querySelector('.loader').style.display = 'block';

  getLanguageJSON()
    .then(() => Promise.all([getSkills(), getProjects(), getExperience()]))
    .then(() => {
      loadWaypoints();
      wakePersonalProjects();
      lang(state.englishJson);
      // @ts-ignore
      document.querySelector('.loader').style.display = 'none';
      document.getElementById('see-more').classList.remove('hide');
    })
    .catch((err) => {
      console.log("Error during app initialization:", err);
      lang(state.englishJson);
      loadWaypoints();
      // @ts-ignore
      document.querySelector('.loader').style.display = 'none';
      document.getElementById('see-more').classList.remove('hide');
    });

  // Add event listeners and scroll effects
  addEventListeners();
  scrollEffects();
});
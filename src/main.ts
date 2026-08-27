import './style.css'
import { fetchAsteroids } from './services/asteroidApi'
import { normalizeAsteroid } from './utils/normalizeAsteroid'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <table>
        <thead>
          <tr>
            <th>Designation</th>
            <th>Discovery Date</th>
            <th>Magnitude</th>
            <th>Distance</th>
            <th>Orbital Class</th>
          </tr>
        </thead>
        <tbody id="asteroid-list">
          <td colspan="5">Loading asteroids...</td>
        </tbody>
    </table>
`

fetchAsteroids(1)
  .then((result) => {
    const asteroid = result.data.map(normalizeAsteroid);
    const asteroidList = document.querySelector("#asteroid-list");

    asteroidList!.innerHTML = asteroid.map(e => `
      <tr>
        <td>${e.designation}</td>
        <td>${e.discovery_date}</td>
        <td>${e.magnitude}</td>
        <td>${e.missDistanceAu}</td>
        <td>${e.orbitClass}</td>
      </tr>
    `).join("");
  })
  .catch((error: unknown) => {
    console.error(error);

    const asteroidList = document.querySelector("#asteroid-list");

    if (asteroidList){
      asteroidList.innerHTML = `
        <tr>
          <td colspan="5">Can't load the asteroids.</td>
        </tr>
      ` 
    }
  })
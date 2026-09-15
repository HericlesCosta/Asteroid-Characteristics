import './style.css'
import { fetchAsteroids } from './services/asteroidApi'
import { normalizeAsteroid } from './utils/normalizeAsteroid'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h2 id="show-current-page">Current Page = 1</h2>

  <div id="stats">
    <div class="stat-card">
      <span>Total</span>
      <strong id="total-count">0</strong>
    </div>

    <div class="stat-card">
      <span>Potential Hazardous</span>
      <strong id="hazardous-count">0</strong>
    </div>

    <div class="stat-card">
      <span>Page</span>
      <strong id="page-indicator">1 / 1</strong>
    </div>
  </div>

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
      <tr>
        <td colspan="5">Loading asteroids...</td>
      </tr>
    </tbody>
  </table>

  <div id="pagination">
    <button id="previous-page" type="button">Previous</button>
    <button id="next-page" type="button">Next</button>
  </div>
`

let currentPage = 1
let totalPages = 1

function updatePage() {
  const showCurrentPage = document.querySelector<HTMLHeadingElement>('#show-current-page')

  if (showCurrentPage) {
    showCurrentPage.textContent = `Current Page = ${currentPage}`
  }
}

function updateButtons() {
  const previousButton = document.querySelector<HTMLButtonElement>('#previous-page')
  const nextButton = document.querySelector<HTMLButtonElement>('#next-page')

  if (!previousButton || !nextButton) return

  previousButton.disabled = currentPage === 1
  nextButton.disabled = currentPage >= totalPages
}

function renderAsteroids(asteroids: ReturnType<typeof normalizeAsteroid>[]) {
  const asteroidList = document.querySelector<HTMLTableSectionElement>('#asteroid-list')

  if (!asteroidList) return

  asteroidList.innerHTML = asteroids
    .map((e) => `
      <tr>
        <td>${e.designation}</td>
        <td>${e.discovery_date}</td>
        <td>${e.magnitude}</td>
        <td>${e.missDistanceAu}</td>
        <td>${e.orbitClass}</td>
      </tr>
    `)
    .join('')
}

async function loadPage(page: number) {
  const asteroidList = document.querySelector<HTMLTableSectionElement>('#asteroid-list')

  if (!asteroidList) return

  asteroidList.innerHTML = `
    <tr>
      <td colspan="5">Loading asteroids...</td>
    </tr>
  `

  try {
    const result = await fetchAsteroids(page)
    totalPages = result.total_pages

    const asteroids = result.data.map(normalizeAsteroid)

    const hazardous = asteroids.filter((e) => e.potentiallyHazardous).length

    const totalCount = document.querySelector<HTMLSpanElement>('#total-count')
    const hazardousCount = document.querySelector<HTMLSpanElement>('#hazardous-count')
    const pageIndicator = document.querySelector<HTMLSpanElement>('#page-indicator')

    if (totalCount) {
      totalCount.textContent = String(asteroids.length)
    }

    if (hazardousCount) {
      hazardousCount.textContent = String(hazardous)
    }

    if (pageIndicator) {
      pageIndicator.textContent = `${currentPage} / ${totalPages}`
    }

    renderAsteroids(asteroids)
    updatePage()
    updateButtons()
  } catch (error) {
    console.error(error)

    asteroidList.innerHTML = `
      <tr>
        <td colspan="5">Can't load the asteroids.</td>
      </tr>
    `
  }
}

document.querySelector<HTMLButtonElement>('#next-page')?.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage += 1
    loadPage(currentPage)
  }
})

document.querySelector<HTMLButtonElement>('#previous-page')?.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1
    loadPage(currentPage)
  }
})

loadPage(currentPage)
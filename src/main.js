import './style.css'
import QRCode from 'qrcode'

const chapters = [
  {
    number: '01',
    title: 'The lagoon',
    place: 'Venice, Italy',
    date: '1254',
    region: 'Mediterranean',
    text: 'A merchant family looks east, beyond the edge of every familiar chart.',
    x: 17, y: 67,
    color: '#d96b38',
    glow: 'rgba(217, 107, 56, 0.18)',
  },
  {
    number: '02',
    title: 'The crossing',
    place: 'Acre, Levant',
    date: '1269',
    region: 'Levant',
    text: 'The first long crossing follows old trade routes through a changing world.',
    x: 29, y: 57,
    color: '#7a8d6c',
    glow: 'rgba(122, 141, 108, 0.18)',
  },
  {
    number: '03',
    title: 'The high road',
    place: 'Balkh, Afghanistan',
    date: '1271',
    region: 'Central Asia',
    text: 'Over passes and through deserts, the road narrows to a single thread.',
    x: 53, y: 44,
    color: '#c58a2a',
    glow: 'rgba(197, 138, 42, 0.18)',
  },
  {
    number: '04',
    title: 'The court',
    place: 'Khanbaliq, China',
    date: '1275',
    region: 'Imperial China',
    text: 'At the end of the known world, a new empire opens its doors.',
    x: 82, y: 27,
    color: '#3f7887',
    glow: 'rgba(63, 120, 135, 0.18)',
  },
]

const storageKey = 'marco-polo-pins'
let activeChapter = 0
let zoomLevel = 1
let pinnedStops = loadPinnedStops()

function loadPinnedStops() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function persistPinnedStops() {
  localStorage.setItem(storageKey, JSON.stringify(pinnedStops))
}

function getChapterFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const value = Number(params.get('chapter'))
  if (!Number.isFinite(value) || value < 1 || value > chapters.length) return 0
  return value - 1
}

function generateAudienceUrl(index = activeChapter) {
  const url = new URL(window.location.href)
  url.searchParams.set('chapter', String(index + 1))
  url.hash = 'map'
  return url.toString()
}

function syncFullscreenButton() {
  const shell = document.querySelector('.site-shell')
  const button = document.querySelector('#toggle-fullscreen')

  if (shell) {
    shell.classList.toggle('fullscreen-mode', Boolean(document.fullscreenElement))
  }

  if (button) {
    button.textContent = document.fullscreenElement ? 'Exit full screen' : 'Presentation mode'
  }
}

function toggleFullscreenMode() {
  const app = document.querySelector('.site-shell')
  if (!document.fullscreenElement) {
    app?.requestFullscreen?.().catch(() => {})
  } else {
    document.exitFullscreen?.()
  }
}

function renderTimeline() {
  const timeline = document.querySelector('#journey-timeline')
  if (!timeline) return

  timeline.innerHTML = chapters
    .map((chapter, index) => `
      <button type="button" class="timeline-stop ${index === activeChapter ? 'is-active' : ''}" data-index="${index}" style="--stop-color:${chapter.color}; --stop-glow:${chapter.glow};">
        <span class="timeline-dot"></span>
        <span class="timeline-copy">
          <strong>${chapter.number}</strong>
          <span>${chapter.title}</span>
        </span>
      </button>
    `)
    .join('')

  timeline.querySelectorAll('.timeline-stop').forEach((button) => {
    button.addEventListener('click', () => updateCurrentChapter(Number(button.dataset.index)))
  })
}

function updateCurrentChapter(index) {
  activeChapter = (index + chapters.length) % chapters.length
  const chapter = chapters[activeChapter]

  document.documentElement.style.setProperty('--active-pin', chapter.color)
  const previousButton = document.querySelector('#previous-chapter')
  if (previousButton) {
    previousButton.disabled = false
  }
  document.querySelector('#chapter-number').textContent = chapter.number
  document.querySelector('#story-index').textContent = `${chapter.number} / 04`
  document.querySelector('#story-date').textContent = `CHAPTER ${chapter.number} / ${chapter.date}`
  document.querySelector('#story-title').textContent = chapter.title
  document.querySelector('#story-place').textContent = `${chapter.place} · ${chapter.region}`
  document.querySelector('#story-text').textContent = chapter.text
  document.querySelector('#progress-bar').style.width = `${((activeChapter + 1) / chapters.length) * 100}%`
  document.querySelector('#current-stop').textContent = `${chapter.title} · ${chapter.place}`

  document.querySelectorAll('.map-point').forEach((point, pointIndex) => {
    point.classList.toggle('is-active', pointIndex === activeChapter)
    point.style.setProperty('--pin-color', chapter.color)
  })

  const currentStop = document.querySelector('#current-stop-pill')
  if (currentStop) currentStop.textContent = `${chapter.number} · ${chapter.title}`

  const url = generateAudienceUrl(activeChapter)
  const href = document.querySelector('#share-link')
  if (href) href.value = url
  updateQrCode(url)

  const urlState = new URL(window.location.href)
  urlState.searchParams.set('chapter', String(activeChapter + 1))
  window.history.replaceState({}, '', urlState)

  renderTimeline()
  renderStops()
  renderPinnedMapMarkers()
}

function renderStops() {
  const stopList = document.querySelector('#stop-list')
  if (!stopList) return

  if (pinnedStops.length === 0) {
    stopList.innerHTML = '<li class="empty-state">No marked stops yet</li>'
    return
  }

  stopList.innerHTML = pinnedStops
    .map((stop) => `<li><button type="button" class="route-stop ${stop.chapter === activeChapter ? 'is-active' : ''}" data-stop-index="${stop.chapter}">${stop.label}</button></li>`)
    .join('')

  stopList.querySelectorAll('.route-stop').forEach((button) => {
    button.addEventListener('click', () => updateCurrentChapter(Number(button.dataset.stopIndex)))
  })
}

function renderPinnedMapMarkers() {
  const stage = document.querySelector('#map-stage')
  if (!stage) return

  const currentMarkers = stage.querySelectorAll('.marked-stop')
  currentMarkers.forEach((marker) => marker.remove())

  pinnedStops.forEach((stop) => {
    const marker = document.createElement('button')
    marker.type = 'button'
    marker.className = `marked-stop ${stop.chapter === activeChapter ? 'is-active' : ''}`
    marker.style.left = `${chapters[stop.chapter].x}%`
    marker.style.top = `${chapters[stop.chapter].y}%`
    marker.style.setProperty('--marker-color', chapters[stop.chapter].color)
    marker.setAttribute('aria-label', `${chapters[stop.chapter].title} marked stop`)
    marker.dataset.stopIndex = String(stop.chapter)
    marker.innerHTML = '<span></span>'
    marker.addEventListener('click', () => updateCurrentChapter(stop.chapter))
    stage.appendChild(marker)
  })
}

async function updateQrCode(url = generateAudienceUrl()) {
  const canvas = document.querySelector('#qr-canvas')
  if (!canvas) return

  try {
    await QRCode.toCanvas(canvas, url, {
      width: 180,
      margin: 1,
      color: { dark: '#24312d', light: '#f4f0e6' },
    })
  } catch (error) {
    console.error('QR code generation failed', error)
  }
}

function markCurrentStop() {
  const nextStop = {
    chapter: activeChapter,
    label: chapters[activeChapter].title,
  }

  const existingIndex = pinnedStops.findIndex((stop) => stop.chapter === activeChapter)
  if (existingIndex >= 0) {
    pinnedStops.splice(existingIndex, 1, nextStop)
  } else {
    pinnedStops.push(nextStop)
  }

  persistPinnedStops()
  renderStops()
  renderPinnedMapMarkers()
}

async function copyShareLink() {
  const url = generateAudienceUrl(activeChapter)
  try {
    await navigator.clipboard.writeText(url)
    const button = document.querySelector('#copy-link')
    if (button) {
      const previous = button.textContent
      button.textContent = 'Copied!'
      setTimeout(() => { button.textContent = previous }, 1200)
    }
  } catch {
    const input = document.querySelector('#share-link')
    if (input) {
      input.focus()
      input.select()
    }
  }
}

function toggleViewer() {
  const modal = document.querySelector('#viewer-modal')
  if (!modal) return
  modal.classList.toggle('is-open')
}

function bindControls() {
  document.querySelectorAll('.map-point').forEach((point) => {
    point.addEventListener('click', () => updateCurrentChapter(Number(point.dataset.index)))
  })

  document.querySelector('#previous-chapter').addEventListener('click', () => updateCurrentChapter(activeChapter - 1))
  document.querySelector('#next-chapter').addEventListener('click', () => updateCurrentChapter(activeChapter + 1))
  document.querySelector('#zoom-in').addEventListener('click', () => {
    zoomLevel = Math.min(1.22, zoomLevel + 0.06)
    document.querySelector('#map-stage').style.setProperty('--zoom', zoomLevel)
  })
  document.querySelector('#zoom-out').addEventListener('click', () => {
    zoomLevel = Math.max(0.88, zoomLevel - 0.06)
    document.querySelector('#map-stage').style.setProperty('--zoom', zoomLevel)
  })
  document.querySelector('#reset-map').addEventListener('click', () => {
    zoomLevel = 1
    document.querySelector('#map-stage').style.setProperty('--zoom', zoomLevel)
  })

  document.querySelector('#mark-stop').addEventListener('click', markCurrentStop)
  document.querySelector('#copy-link').addEventListener('click', copyShareLink)
  document.querySelector('#open-viewer').addEventListener('click', toggleViewer)
  document.querySelector('#close-viewer').addEventListener('click', toggleViewer)
  document.querySelector('#toggle-fullscreen').addEventListener('click', toggleFullscreenMode)
  document.addEventListener('fullscreenchange', syncFullscreenButton)
}

function buildApp() {
  const initialChapter = getChapterFromUrl()
  activeChapter = initialChapter

  document.querySelector('#app').innerHTML = `
    <div class="site-shell">
      <header class="topbar">
        <a class="brand" href="#top" aria-label="The Long Way East home"><span class="brand-mark" aria-hidden="true">M</span><span><strong>The Long Way East</strong><small>A Marco Polo story</small></span></a>
        <div class="topbar-actions">
          <div class="topbar-meta"><span class="live-dot"></span> Interactive map</div>
          <button id="toggle-fullscreen" class="toolbar-button" type="button">Presentation mode</button>
          <button id="open-viewer" class="toolbar-button" type="button">Audience view</button>
        </div>
      </header>

      <main id="top">
        <section class="intro-grid">
          <div class="eyebrow">Chapter <span id="chapter-number">${chapters[activeChapter].number}</span> <i></i> ${chapters[activeChapter].date}</div>
          <div class="intro-copy">
            <p class="kicker">A journey in four horizons</p>
            <h1>Beyond the edge<br /><em>of the map.</em></h1>
            <p class="lede">Follow the route together, pause on the places that matter, and keep the audience anchored to the story as you move across the world.</p>
          </div>
          <div class="control-panel">
            <div class="current-stop-pill" id="current-stop-pill">${chapters[activeChapter].number} · ${chapters[activeChapter].title}</div>
            <div class="share-box">
              <canvas id="qr-canvas" width="180" height="180" aria-label="QR code for the current map link"></canvas>
            </div>
            <div class="share-actions">
              <button id="mark-stop" type="button">Mark stop</button>
              <button id="copy-link" type="button">Copy link</button>
            </div>
            <input id="share-link" type="text" value="${generateAudienceUrl(activeChapter)}" readonly />
          </div>
        </section>

        <section class="atlas-section" aria-label="Interactive route map">
          <div class="map-heading"><span>THE ROUTE EAST</span><span class="map-scale">A living map / 1254—1295</span></div>
          <div class="map-stage" id="map-stage">
            <div class="world-map-surface" aria-hidden="true"></div>
            <div class="map-grain"></div>
            <div class="compass" aria-hidden="true"><span>N</span><div class="compass-ring"><b></b></div><small>orient</small></div>
            <div class="map-label label-europe">EUROPA</div>
            <div class="map-label label-asia">ASIA</div>
            <div class="map-label label-desert">THE GREAT<br />DESERTS</div>
            <div class="sea-label sea-west">MARE INTERNUM</div>
            <div class="sea-label sea-east">OCEANUS<br />ORIENTALIS</div>
            <svg class="route-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="route-shadow" d="M17,67 C23,64 24,57 29,57 C38,56 42,48 53,44 C63,40 71,29 82,27" /><path class="route-line" d="M17,67 C23,64 24,57 29,57 C38,56 42,48 53,44 C63,40 71,29 82,27" /></svg>
            <div class="map-points">${chapters.map((chapter, index) => `<button class="map-point ${index === activeChapter ? 'is-active' : ''}" data-index="${index}" style="--pin-color:${chapter.color};--pin-glow:${chapter.glow};left:${chapter.x}%;top:${chapter.y}%" aria-label="${chapter.title}, ${chapter.place}"><span>${chapter.number}</span></button>`).join('')}</div>
            <div class="map-controls" aria-label="Map controls"><button type="button" id="zoom-in" aria-label="Zoom in">+</button><button type="button" id="zoom-out" aria-label="Zoom out">−</button><button type="button" id="reset-map" aria-label="Reset map">⌂</button></div>
            <div class="map-footer"><span>Our journey begins here</span><span>37° 58′ N &nbsp; 23° 43′ E</span></div>
          </div>
        </section>

        <section class="story-section">
          <div class="story-index"><span>NOW READING</span><strong id="story-index">${chapters[activeChapter].number} / 04</strong><div class="progress"><i id="progress-bar"></i></div></div>
          <article class="story-card">
            <p class="kicker" id="story-date">CHAPTER ${chapters[activeChapter].number} / ${chapters[activeChapter].date}</p>
            <h2 id="story-title">${chapters[activeChapter].title}</h2>
            <p id="story-place">${chapters[activeChapter].place} · ${chapters[activeChapter].region}</p>
            <p class="story-text" id="story-text">${chapters[activeChapter].text}</p>
            <div class="story-actions">
              <button class="nav-button" id="previous-chapter" type="button"><span>←</span> Previous</button>
              <button class="next-button" id="next-chapter" type="button">Next chapter <span>→</span></button>
            </div>
          </article>
          <aside class="journey-side">
            <div class="journey-box">
              <p class="journey-label">Journey timeline</p>
              <div class="journey-timeline" id="journey-timeline"></div>
              <div id="current-stop">${chapters[activeChapter].title} · ${chapters[activeChapter].place}</div>
              <ul id="stop-list" class="route-list"></ul>
            </div>
            <div class="quote">
              <span class="quote-mark">“</span>
              <p>There is no telling where a road will lead until you take the first step.</p>
              <small>— a route still being drawn</small>
            </div>
          </aside>
        </section>
      </main>

      <footer><span>© 2026 / The Long Way East</span><span>Built for curious travellers <b>✦</b></span></footer>
    </div>

    <div id="viewer-modal" class="viewer-modal" aria-hidden="true">
      <div class="viewer-dialog" role="dialog" aria-modal="true" aria-label="Audience map viewer">
        <div class="viewer-header">
          <div>
            <p>Audience view</p>
            <h3>Marco Polo route</h3>
          </div>
          <button id="close-viewer" type="button" aria-label="Close audience view">Close</button>
        </div>
        <div class="viewer-map">
          <div class="viewer-badge">Live stop</div>
          <div class="viewer-current">${chapters[activeChapter].title}</div>
          <div class="mini-map" aria-label="Current map focus">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M17,67 C23,64 24,57 29,57 C38,56 42,48 53,44 C63,40 71,29 82,27" /></svg>
            <button class="mini-point is-active" style="left:${chapters[activeChapter].x}%;top:${chapters[activeChapter].y}%" aria-label="Current stop"><span></span></button>
          </div>
        </div>
      </div>
    </div>
  `

  renderStops()
  renderPinnedMapMarkers()
  renderTimeline()
  bindControls()
  updateCurrentChapter(activeChapter)
  updateQrCode(generateAudienceUrl(activeChapter))
  syncFullscreenButton()
}

buildApp()

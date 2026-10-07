import './style.css'
import QRCode from 'qrcode'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const chapters = [
  {
    number: '01',
    title: 'Khotan (Cotan)',
    place: 'Hotan City, Hotan Prefecture, Xinjiang, China',
    date: '1271',
    region: 'Tarim Basin',
    text: 'Marco Polo reaches Khotan, the great oasis city on the southern Silk Road, where caravans and merchants gather in the desert edge.',
    quote: 'The province of Khotan lies towards the east-north-east.',
    translation: '于阗省位于东北偏东方向。它隶属于大汗，城镇众多，棉花、亚麻、大麻和谷物生长丰富；当地人主要从事贸易和手工业，并不以武力为业。',
    reference: 'The passage presents Khotan as a prosperous oasis province under the Great Khan, with vineyards, farms, orchards and active crafts.',
    historicalNote: 'Khotan is generally identified with today’s Hotan in Xinjiang. The English wording is a brief quotation; the Chinese text is a presentation translation and summary.',
    coordinates: [37.111, 79.9209],
    color: '#d96b38',
    glow: 'rgba(217, 107, 56, 0.18)',
  },
  {
    number: '02',
    title: 'Lop',
    place: 'Lop Nor, northern Ruoqiang County, Xinjiang, China',
    date: '1271',
    region: 'Lop Desert',
    text: 'The route continues east toward the Lop region, where the ghostly lake and dry basin mark a harsh and unforgettable step on the journey.',
    quote: 'Lop is a large city to the east-north-east.',
    translation: '罗布是一座位于东北偏东方向的大城市，处在罗布大沙漠的入口。旅行者会在这里休整，并为自己和牲畜准备足够穿越沙漠的食物和水。',
    reference: 'The account describes the desert as immense and barren, with scarce water and dangers that could separate travellers from their companions at night.',
    historicalNote: 'The famous “desert spirits” episode belongs to this desert-crossing description. It is best read as Marco Polo’s travel narrative and warning story, not as a modern geographical claim.',
    coordinates: [40.5, 90.3],
    color: '#7a8d6c',
    glow: 'rgba(122, 141, 108, 0.18)',
  },
  {
    number: '03',
    title: 'Shazhou (Saciu)',
    place: 'Dunhuang City, Jiuquan, Gansu, China',
    date: '1272',
    region: 'Hexi Corridor',
    text: 'At Shazhou, the road reaches the gateway to China, where oasis cities and caravan routes turn toward the heart of the empire.',
    quote: 'he comes to a city called Shazhou, which is subject to the Great Khan.',
    translation: '旅行者穿越沙漠三十天后，来到一座叫沙州的城市。这里隶属于大汗，位于唐古特地区；当地有不同信仰的人群，也有许多寺院和修道院。',
    reference: 'Shazhou is described as a cultural meeting point: the text mentions local idol worshippers alongside Nestorian Christians and Muslims.',
    historicalNote: 'Shazhou is commonly associated with Dunhuang, a major oasis and Buddhist-art centre at the western end of the Hexi Corridor.',
    coordinates: [40.138, 94.663],
    color: '#c58a2a',
    glow: 'rgba(197, 138, 42, 0.18)',
  },
  {
    number: '04',
    title: 'Ganzhou (Campcio)',
    place: 'Zhangye City, Ganzhou District, Gansu, China',
    date: '1272',
    region: 'Gansu Corridor',
    text: 'Ganzhou marks the continuation of the Hexi Corridor, where the Polos spent a full year on business. From here, Marco Polo’s narrative makes a major northward detour to Karakorum before turning east toward Shangdu.',
    quote: 'Ganzhou is a very large and noble city in Tangut itself.',
    translation: '甘州是唐古特境内一座非常大而重要的城市，也是整个地区的首府。书中提到尼科洛、马菲奥和马可曾在这里处理生意并停留一年。',
    reference: 'The description highlights a large, multi-faith city with monasteries, churches and monumental gilded images, before the narrator moves on to other lands.',
    historicalNote: 'Ganzhou is generally identified with Zhangye. In the book’s narrative, it is also the point from which the account moves north toward Karakorum and later returns to the eastbound story.',
    coordinates: [38.925, 100.45],
    color: '#3f7887',
    glow: 'rgba(63, 120, 135, 0.18)',
  },
  {
    number: '05',
    title: 'Karakorum',
    place: 'Kharkhorin, Övörkhangai Province, Mongolia',
    date: '1273',
    region: 'Mongol Steppe',
    text: 'The route now makes a dramatic northward narrative detour from the Hexi Corridor to Karakorum, the great Mongol heartland, before the journey turns east again toward Shangdu.',
    quote: 'Karakorum is a city three miles in circumference.',
    translation: '哈拉和林是一座周长约三英里的城市，周围有用泥土建成的城墙，因为当地缺少石材。它曾是鞑靼人离开故乡后最早的重要都城。',
    reference: 'The Karakorum section opens into a broader account of the Tartars: their origins, customs, conquests and expansion across the world.',
    historicalNote: 'This is a narrative detour rather than a simple straight-line segment of the route. The presentation keeps it as a chapter so the audience can see the Mongol political world behind the journey.',
    coordinates: [47.210, 102.848],
    color: '#6387a8',
    glow: 'rgba(99, 135, 168, 0.18)',
  },
  {
    number: '06',
    title: 'Shangdu (Xanadu)',
    place: 'Yuan Shangdu site, Zhenglan Banner, Inner Mongolia, China',
    date: '1275',
    region: 'Yuan Summer Capital',
    text: [
      'Final destination of Marco Polo’s route',
      'Imperial residence of Khubilai Khan',
      'Famous for a movable cane palace',
      'Marco Polo also describes white mares and a ritual using their milk',
      'Today: Site of Xanadu, Inner Mongolia, China',
    ],
    quote: 'he comes to a city called Shangdu that was built by the Great Khan.',
    translation: '旅行者从前一座城市出发三天后，来到大汗忽必烈建造的上都。书中描写了装饰华丽的大理石宫殿、围合着泉水、河流和草地的园林，以及中央一座可以拆卸和移动的芦苇／竹竿式宫殿。马可·波罗还记述了白色母马的乳汁和与皇族相关的仪式。',
    reference: 'Shangdu is presented as an imperial summer residence: a monumental palace, a walled park and a portable cane palace at its centre.',
    historicalNote: 'Shangdu is the historical site associated with Xanadu in Inner Mongolia. The “portable palace” wording is a concise interpretation of the cane-built structure described in the source.',
    coordinates: [42.358, 116.185],
    color: '#9c5a7b',
    glow: 'rgba(156, 90, 123, 0.18)',
  },
]

const storageKey = 'marco-polo-pins'
const privateNotesKey = 'marco-polo-private-reference'
let activeChapter = 0
let pinnedStops = loadPinnedStops()
let privateNotes = loadPrivateNotes()
let journeyMap
let routeLayer
let chapterMarkers = []
let pinnedLayer
let hasRenderedChapter = false

const routeBounds = L.latLngBounds(chapters.map((chapter) => chapter.coordinates))

function storyTextMarkup(text) {
  if (Array.isArray(text)) {
    return `<ul>${text.map((item) => `<li>${item}</li>`).join('')}</ul>`
  }
  return text
}

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

function loadPrivateNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(privateNotesKey) || '{}')
    return saved && typeof saved === 'object' ? saved : {}
  } catch {
    return {}
  }
}

function savePrivateNote(chapterIndex, value) {
  privateNotes[chapterIndex] = value
  localStorage.setItem(privateNotesKey, JSON.stringify(privateNotes))
}

function getChapterFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const value = Number(params.get('chapter'))
  if (!Number.isFinite(value) || value < 1 || value > chapters.length) return 0
  return value - 1
}

function hasChapterInUrl() {
  return new URLSearchParams(window.location.search).has('chapter')
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

function chapterIcon(chapter, isActive) {
  return L.divIcon({
    className: 'chapter-marker-wrapper',
    html: `<span class="chapter-marker ${isActive ? 'is-active' : ''}" style="--marker-color:${chapter.color};--marker-glow:${chapter.glow}">${chapter.number}</span>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  })
}

function initializeMap() {
  journeyMap = L.map('map-canvas', {
    zoomControl: false,
    attributionControl: true,
    scrollWheelZoom: true,
  })

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri',
  }).addTo(journeyMap)

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Labels &copy; Esri',
    pane: 'overlayPane',
  }).addTo(journeyMap)

  routeLayer = L.polyline(chapters.map((chapter) => chapter.coordinates), {
    color: '#d7a64a',
    weight: 5,
    opacity: 0.96,
    dashArray: '12 9',
    lineCap: 'round',
    lineJoin: 'round',
  }).addTo(journeyMap)

  L.polyline(chapters.map((chapter) => chapter.coordinates), {
    color: '#f5edda',
    weight: 11,
    opacity: 0.82,
    lineCap: 'round',
    lineJoin: 'round',
  }).addTo(journeyMap)

  chapterMarkers = chapters.map((chapter, index) => {
    const marker = L.marker(chapter.coordinates, { icon: chapterIcon(chapter, index === activeChapter) })
      .addTo(journeyMap)
      .on('click', () => updateCurrentChapter(index))
    return marker
  })

  pinnedLayer = L.layerGroup().addTo(journeyMap)
  journeyMap.fitBounds(routeBounds, { padding: [55, 55] })
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
  document.querySelector('#story-index').textContent = `${chapter.number} / ${String(chapters.length).padStart(2, '0')}`
  document.querySelector('#story-date').textContent = `CHAPTER ${chapter.number} / ${chapter.date}`
  document.querySelector('#story-title').textContent = chapter.title
  document.querySelector('#story-place').textContent = `${chapter.place} · ${chapter.region}`
  document.querySelector('#story-text').innerHTML = storyTextMarkup(chapter.text)
  document.querySelector('#route-quote').textContent = chapter.quote
  document.querySelector('#route-quote-source').textContent = `— The Travels, ${chapter.title}`
  document.querySelector('#reference-translation').textContent = chapter.translation
  document.querySelector('#reference-summary').textContent = chapter.reference
  document.querySelector('#historical-note').textContent = chapter.historicalNote
  const privateReference = document.querySelector('#private-reference')
  if (privateReference) privateReference.value = privateNotes[activeChapter] || ''
  document.querySelector('#progress-bar').style.width = `${((activeChapter + 1) / chapters.length) * 100}%`
  document.querySelector('#current-stop').textContent = `${chapter.title} · ${chapter.place}`

  chapterMarkers.forEach((marker, markerIndex) => {
    marker.setIcon(chapterIcon(chapters[markerIndex], markerIndex === activeChapter))
  })

  if (journeyMap && hasRenderedChapter) {
    journeyMap.flyTo(chapter.coordinates, Math.max(journeyMap.getZoom(), 4), { duration: 0.7 })
  }
  hasRenderedChapter = true

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
  if (!pinnedLayer) return
  pinnedLayer.clearLayers()

  pinnedStops.forEach((stop) => {
    const chapter = chapters[stop.chapter]
    L.circleMarker(chapter.coordinates, {
      radius: stop.chapter === activeChapter ? 13 : 9,
      color: chapter.color,
      weight: 3,
      fillColor: chapter.color,
      fillOpacity: 0.72,
    })
      .bindTooltip(`${chapter.number} · ${chapter.title}`, { direction: 'top', offset: [0, -8] })
      .on('click', () => updateCurrentChapter(stop.chapter))
      .addTo(pinnedLayer)
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
  modal.setAttribute('aria-hidden', String(!modal.classList.contains('is-open')))
}

function startJourney() {
  const welcome = document.querySelector('#welcome-screen')
  welcome?.classList.add('is-dismissed')
  updateCurrentChapter(0)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleKeyboardNavigation(event) {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    updateCurrentChapter(activeChapter + 1)
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    updateCurrentChapter(activeChapter - 1)
  } else if (event.key === ' ' && !event.repeat) {
    event.preventDefault()
    toggleFullscreenMode()
  } else if (event.key === 'Escape') {
    document.querySelector('#viewer-modal')?.classList.remove('is-open')
  }
}

function bindControls() {
  document.querySelector('#previous-chapter').addEventListener('click', () => updateCurrentChapter(activeChapter - 1))
  document.querySelector('#next-chapter').addEventListener('click', () => updateCurrentChapter(activeChapter + 1))
  document.querySelector('#zoom-in').addEventListener('click', () => {
    journeyMap?.zoomIn()
  })
  document.querySelector('#zoom-out').addEventListener('click', () => {
    journeyMap?.zoomOut()
  })
  document.querySelector('#reset-map').addEventListener('click', () => {
    journeyMap?.fitBounds(routeBounds, { padding: [55, 55] })
  })

  document.querySelector('#mark-stop').addEventListener('click', markCurrentStop)
  document.querySelector('#copy-link').addEventListener('click', copyShareLink)
  document.querySelector('#open-viewer').addEventListener('click', toggleViewer)
  document.querySelector('#close-viewer').addEventListener('click', toggleViewer)
  document.querySelector('#toggle-fullscreen').addEventListener('click', toggleFullscreenMode)
  document.querySelector('#start-journey')?.addEventListener('click', startJourney)
  document.querySelector('#private-reference')?.addEventListener('input', (event) => {
    savePrivateNote(activeChapter, event.target.value)
  })
  document.addEventListener('fullscreenchange', syncFullscreenButton)
  document.addEventListener('keydown', handleKeyboardNavigation)
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
            <p class="kicker">A journey in six horizons</p>
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
            <div id="map-canvas" aria-label="Real-world interactive Marco Polo route map"></div>
            <div class="map-controls" aria-label="Map controls"><button type="button" id="zoom-in" aria-label="Zoom in">+</button><button type="button" id="zoom-out" aria-label="Zoom out">−</button><button type="button" id="reset-map" aria-label="Reset map">⌂</button></div>
            <div class="map-footer"><span>Satellite imagery / Esri</span><span>Khotan → Shangdu</span></div>
          </div>
        </section>

        <section class="story-section">
          <div class="story-index"><span>NOW READING</span><strong id="story-index">${chapters[activeChapter].number} / ${String(chapters.length).padStart(2, '0')}</strong><div class="progress"><i id="progress-bar"></i></div></div>
          <article class="story-card">
            <p class="kicker" id="story-date">CHAPTER ${chapters[activeChapter].number} / ${chapters[activeChapter].date}</p>
            <h2 id="story-title">${chapters[activeChapter].title}</h2>
            <p id="story-place">${chapters[activeChapter].place} · ${chapters[activeChapter].region}</p>
            <div class="story-text" id="story-text">${storyTextMarkup(chapters[activeChapter].text)}</div>
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
              <p id="route-quote">${chapters[activeChapter].quote}</p>
              <small id="route-quote-source">— The Travels, ${chapters[activeChapter].title}</small>
            </div>
            <div class="reference-card" aria-labelledby="reference-title">
              <p class="journey-label" id="reference-title">Audience reference</p>
              <p class="reference-label">中文翻译 / Presentation translation</p>
              <p id="reference-translation">${chapters[activeChapter].translation}</p>
              <p class="reference-label">What the passage describes</p>
              <p id="reference-summary">${chapters[activeChapter].reference}</p>
              <p class="reference-note" id="historical-note">${chapters[activeChapter].historicalNote}</p>
              <label class="reference-label" for="private-reference">Private reference notes</label>
              <textarea id="private-reference" class="private-reference" rows="8" placeholder="Paste your full source passage here. It stays only in this browser.">${privateNotes[activeChapter] || ''}</textarea>
              <p class="reference-note">Private notes are stored locally in this browser and are not published to GitHub.</p>
            </div>
          </aside>
        </section>

        <section class="sources-section" aria-labelledby="sources-title">
          <div>
            <p class="kicker">Further reading</p>
            <h2 id="sources-title">A route between history and memory.</h2>
          </div>
          <div class="sources-copy">
            <p>This interactive follows Marco Polo’s eastbound route through the Tarim Basin, the Hexi Corridor, the Mongol steppe and the Yuan court.</p>
            <p class="source-note">Primary reference: Nigel Cliff’s 2015 translation of <cite>The Travels of Marco Polo</cite>. Each chapter provides a short quotation plus a presentation translation and summary, rather than reproducing the full copyrighted passage. Place names and present-day locations are historical context, not a claim that every route detail is certain.</p>
          </div>
        </section>
      </main>

      <footer><span>© 2026 / The Long Way East</span><span>Built for curious travellers <b>✦</b></span></footer>
    </div>

    <div id="welcome-screen" class="welcome-screen ${hasChapterInUrl() ? 'is-dismissed' : ''}" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div class="welcome-card">
        <p class="kicker">An interactive historical journey</p>
        <h2 id="welcome-title">The Long Way East</h2>
        <p>Travel from Venice to Shangdu through six stops, following the landscapes, stories and imperial worlds Marco Polo encountered on the road.</p>
        <div class="welcome-meta"><span>1271—1275</span><span>6 chapters</span><span>1 route east</span></div>
        <button id="start-journey" class="welcome-button" type="button">Start the journey <span>→</span></button>
        <small>Tip: use ← → to change chapters · Space for presentation mode</small>
      </div>
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
  initializeMap()
  renderTimeline()
  bindControls()
  updateCurrentChapter(activeChapter)
  updateQrCode(generateAudienceUrl(activeChapter))
  syncFullscreenButton()
}

buildApp()

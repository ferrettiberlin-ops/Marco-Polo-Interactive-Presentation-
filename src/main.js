import './style.css'

const chapters = [
  { number: '01', title: 'The lagoon', place: 'Venice, Italy', date: '1254', text: 'A merchant family looks east, beyond the edge of every familiar chart.', x: 17, y: 67 },
  { number: '02', title: 'The crossing', place: 'Acre, Levant', date: '1269', text: 'The first long crossing follows old trade routes through a changing world.', x: 29, y: 57 },
  { number: '03', title: 'The high road', place: 'Balkh, Afghanistan', date: '1271', text: 'Over passes and through deserts, the road narrows to a single thread.', x: 53, y: 44 },
  { number: '04', title: 'The court', place: 'Khanbaliq, China', date: '1275', text: 'At the end of the known world, a new empire opens its doors.', x: 82, y: 27 },
]

let activeChapter = 0
let zoomLevel = 1

document.querySelector('#app').innerHTML = `
  <div class="site-shell">
    <header class="topbar">
      <a class="brand" href="#top" aria-label="The Long Way East home"><span class="brand-mark" aria-hidden="true">M</span><span><strong>The Long Way East</strong><small>A Marco Polo story</small></span></a>
      <div class="topbar-meta"><span class="live-dot"></span> An interactive cartography</div>
      <button class="menu-button" type="button" aria-label="Open menu"><span></span><span></span></button>
    </header>
    <main id="top">
      <section class="intro-grid"><div class="eyebrow">Chapter <span id="chapter-number">01</span> <i></i> 1271</div><div class="intro-copy"><p class="kicker">A journey in four horizons</p><h1>Beyond the edge<br /><em>of the map.</em></h1><p class="lede">Follow a young Venetian merchant across the world as it was known, imagined, and slowly redrawn.</p></div><div class="scroll-cue"><span>Scroll to travel</span><b>↓</b></div></section>
      <section class="atlas-section" aria-label="Interactive route map"><div class="map-heading"><span>THE ROUTE EAST</span><span class="map-scale">A living map / 1254—1295</span></div><div class="map-stage" id="map-stage"><div class="map-grain"></div><div class="compass" aria-hidden="true"><span>N</span><div class="compass-ring"><b></b></div><small>orient</small></div><div class="map-label label-europe">EUROPA</div><div class="map-label label-asia">ASIA</div><div class="map-label label-desert">THE GREAT<br />DESERTS</div><div class="sea-label sea-west">MARE INTERNUM</div><div class="sea-label sea-east">OCEANUS<br />ORIENTALIS</div><svg class="route-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="route-shadow" d="M17,67 C23,64 24,57 29,57 C38,56 42,48 53,44 C63,40 71,29 82,27" /><path class="route-line" d="M17,67 C23,64 24,57 29,57 C38,56 42,48 53,44 C63,40 71,29 82,27" /></svg><div class="map-points">${chapters.map((chapter, index) => `<button class="map-point ${index === 0 ? 'is-active' : ''}" data-index="${index}" style="left:${chapter.x}%;top:${chapter.y}%" aria-label="${chapter.title}, ${chapter.place}"><span>${chapter.number}</span></button>`).join('')}</div><div class="map-controls" aria-label="Map controls"><button type="button" id="zoom-in" aria-label="Zoom in">+</button><button type="button" id="zoom-out" aria-label="Zoom out">−</button><button type="button" id="reset-map" aria-label="Reset map">⌂</button></div><div class="map-footer"><span>Our journey begins here</span><span>37° 58′ N &nbsp; 23° 43′ E</span></div></div></section>
      <section class="story-section"><div class="story-index"><span>NOW READING</span><strong id="story-index">01 / 04</strong><div class="progress"><i id="progress-bar"></i></div></div><article class="story-card"><p class="kicker" id="story-date">CHAPTER 01 / 1254</p><h2 id="story-title">The lagoon</h2><p id="story-place">Venice, Italy</p><p class="story-text" id="story-text">A merchant family looks east, beyond the edge of every familiar chart.</p><button class="next-button" id="next-chapter" type="button">Next chapter <span>→</span></button></article><aside class="quote"><span class="quote-mark">“</span><p>There is no telling where a road will lead until you take the first step.</p><small>— a route still being drawn</small></aside></section>
    </main>
    <footer><span>© 2026 / The Long Way East</span><span>Built for curious travellers <b>✦</b></span></footer>
  </div>
`

function selectChapter(index) {
  activeChapter = (index + chapters.length) % chapters.length
  const chapter = chapters[activeChapter]
  document.querySelector('#chapter-number').textContent = chapter.number
  document.querySelector('#story-index').textContent = `${chapter.number} / 04`
  document.querySelector('#story-date').textContent = `CHAPTER ${chapter.number} / ${chapter.date}`
  document.querySelector('#story-title').textContent = chapter.title
  document.querySelector('#story-place').textContent = chapter.place
  document.querySelector('#story-text').textContent = chapter.text
  document.querySelector('#progress-bar').style.width = `${((activeChapter + 1) / chapters.length) * 100}%`
  document.querySelectorAll('.map-point').forEach((point, pointIndex) => point.classList.toggle('is-active', pointIndex === activeChapter))
}

document.querySelectorAll('.map-point').forEach((point) => point.addEventListener('click', () => selectChapter(Number(point.dataset.index))))
document.querySelector('#next-chapter').addEventListener('click', () => selectChapter(activeChapter + 1))
document.querySelector('#zoom-in').addEventListener('click', () => { zoomLevel = Math.min(1.22, zoomLevel + 0.06); document.querySelector('#map-stage').style.setProperty('--zoom', zoomLevel) })
document.querySelector('#zoom-out').addEventListener('click', () => { zoomLevel = Math.max(0.88, zoomLevel - 0.06); document.querySelector('#map-stage').style.setProperty('--zoom', zoomLevel) })
document.querySelector('#reset-map').addEventListener('click', () => { zoomLevel = 1; document.querySelector('#map-stage').style.setProperty('--zoom', zoomLevel) })

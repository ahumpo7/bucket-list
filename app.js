/**
 * Our Travel Bucket List - Couple's Trip Tracker & Map
 */

// Initial Seed Data: User's 3 Destinations
const DEFAULT_TRIPS = [
  {
    id: "watkins-glen-ny",
    title: "Watkins Glen State Park",
    location: "Finger Lakes, Watkins Glen, NY",
    category: "State Park",
    status: "wishlist", // 'wishlist', 'planned', 'completed'
    season: "Late Spring - Mid Autumn",
    lat: 42.3732,
    lng: -76.8715,
    special: "19 waterfalls carved into sheer 200-foot shale and limestone cliffs along a 2-mile fairy-tale gorge. The famous stone Rainbow Bridge and Cavern Cascade (where you walk directly behind a thundering sheet of water) feel magical. Located right at the southern tip of Seneca Lake, surrounded by Finger Lakes wineries, cideries, and romantic lakefront dinners.",
    coupleTip: "Arrive before 9:00 AM to explore the gorge trail before crowds and tour buses arrive. Walk the gorge trail uphill, then take the park shuttle back down to avoid backtracking 800 stone stairs!",
    notes: "Plan a romantic weekend: hike the gorge in the morning, do wine tastings along Seneca Lake in the afternoon, and catch sunset over the water.",
    imageUrl: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cherry-springs-pa",
    title: "Cherry Springs State Park",
    location: "Potter County, Coudersport, PA",
    category: "Stargazing",
    status: "wishlist",
    season: "New Moon Weekends (June - Oct)",
    lat: 41.6628,
    lng: -77.8236,
    special: "An official Gold-Tier International Dark Sky Park perched on an isolated 2,300-foot mountain summit surrounded by 262,000 acres of forest. It is one of the darkest places on the entire US Eastern Seaboard! On a clear night with no moon, the Milky Way is so intensely bright that it literally casts visible shadows on the ground.",
    coupleTip: "Strict etiquette: Only RED lights are permitted on the astronomy field (white light ruins night vision for 30 minutes!). Bring zero-gravity reclining camping chairs, heavy thermal blankets (mountain nights get cold even in July!), a thermos of hot cocoa, and an astronomy star-map app.",
    notes: "Check the 'Clear Sky Chart' forecast online before driving out. Target a weekend during a New Moon or during the Perseids meteor shower in mid-August.",
    imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "eternal-flame-falls-ny",
    title: "Eternal Flame Falls",
    location: "Chestnut Ridge Park, Orchard Park, NY",
    category: "Waterfall",
    status: "wishlist",
    season: "Spring or Autumn",
    lat: 42.7019,
    lng: -78.7501,
    special: "A rare geological phenomenon: a natural macro-seep of hydrocarbon gas burning inside a small shale grotto right behind a 35-foot cascading waterfall! It is one of only a handful of natural eternal flames in the world. The flickering fire seen through the veil of falling water feels like pure fantasy.",
    coupleTip: "Bring a long grill lighter with you just in case wind or water spray put the flame out — hikers regularly re-light it! Wear sturdy waterproof hiking boots or trail shoes with strong traction, as the trail leads directly down and through a muddy, slick shale creek bed.",
    notes: "Only 25 minutes south of Buffalo and 45 minutes south of Niagara Falls. Best combined with a scenic Western NY weekend getaway.",
    imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80"
  }
];

// Curated Suggestions that naturally complement the user's three spots
const SUGGESTIONS = [
  {
    id: "sugg-letchworth",
    title: "Letchworth State Park",
    location: "Castile, NY (Between Buffalo & Watkins Glen)",
    category: "State Park",
    lat: 42.5701,
    lng: -78.0435,
    special: "Known as 'The Grand Canyon of the East.' The Genesee River roars through a 550-foot-deep gorge over three magnificent major waterfalls (Upper, Middle, and Lower Falls). In autumn, the foliage is legendary, and sunrise hot air balloon rides fly directly over the gorge!",
    coupleTip: "Have lunch or dinner at the historic Glen Iris Inn overlooking Middle Falls, and stop at Inspiration Point for the signature postcard view.",
    season: "Late May to Late October",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sugg-kinzua-bridge",
    title: "Kinzua Bridge State Park & Skywalk",
    location: "Mt. Jewett, PA (1 hr west of Cherry Springs)",
    category: "Hiking & Canyon",
    lat: 41.7597,
    lng: -78.5866,
    special: "An 1882 engineering marvel once called the 'Eighth Wonder of the World'. Partially toppled by a massive tornado in 2003, the remaining towers were transformed into a breathtaking 600-foot pedestrian skywalk with a glass-bottom floor peering 225 feet straight down into the gorge.",
    coupleTip: "Stand together over the glass floor for a thrilling photo, and hike the trail to the bottom to marvel at the massive twisted steel towers left resting as nature reclaimed them.",
    season: "Summer & Fall Foliage",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sugg-taughannock",
    title: "Taughannock Falls State Park",
    location: "Trumansburg / Ithaca, NY (30m from Watkins Glen)",
    category: "Waterfall",
    lat: 42.5367,
    lng: -76.6006,
    special: "Plunges 215 feet into a colossal limestone amphitheater — 33 feet taller than Niagara Falls! The lower gorge trail is an easy, romantic flat stroll along the creek bed with towering cliffs overhead, opening right up to Cayuga Lake.",
    coupleTip: "Pair with an evening dinner in downtown Ithaca or a visit to the Cornell Botanic Gardens. Great for a relaxed morning walk with coffee.",
    season: "Year-round (Gorge trail is flat & easy)",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sugg-pine-creek",
    title: "Pine Creek Gorge ('PA Grand Canyon')",
    location: "Wellsboro, PA (35m east of Cherry Springs)",
    category: "Hiking & Canyon",
    lat: 41.6983,
    lng: -77.4589,
    special: "A 47-mile deep canyon carved into the Pennsylvania Wilds. Features spectacular overlooks at Leonard Harrison and Colton Point State Parks, plus the scenic 62-mile Pine Creek Rail Trail running along the river floor.",
    coupleTip: "Rent tandem bicycles in the quaint gaslit Victorian town of Wellsboro and pedal down the flat canyon rail trail under the cliff shadows.",
    season: "Spring to Autumn",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sugg-niagara",
    title: "Niagara Falls (Cave of the Winds)",
    location: "Niagara Falls, NY (45m north of Eternal Flame)",
    category: "Waterfall",
    lat: 43.0828,
    lng: -79.0742,
    special: "The Cave of the Winds experience takes wooden walkways down to the 'Hurricane Deck' directly beneath Bridal Veil Falls, where you stand drenched in tropical-storm-force mist and spray. At night, the falls light up with colorful illuminations.",
    coupleTip: "Wear the provided yellow ponchos, hold on tight on the Hurricane Deck, and stroll Goat Island at twilight for the evening illumination light show.",
    season: "May to October (Cave of Winds)",
    imageUrl: "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?auto=format&fit=crop&w=800&q=80"
  }
];

class BucketListApp {
  constructor() {
    this.trips = this.loadTrips();
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.selectedTripId = null;
    this.routeModeActive = false;
    this.markers = {};
    this.routePolyline = null;
    this.routeMarkers = [];
    this.searchAbortController = null;
    this.modalSearchAbortController = null;

    this.initMap();
    this.bindEvents();
    this.render();
  }

  // Storage Management: Separation of Guest vs Authenticated Cloud User
  isUserSignedIn() {
    return window.firebaseService && window.firebaseService.currentUser;
  }

  getCloudStorageKey() {
    const listId = (window.firebaseService && window.firebaseService.coupleListId) || window.DEFAULT_COUPLE_LIST_ID || "our-adventures-bucket-list";
    return `romantic_bucket_list_cloud_${listId}`;
  }

  loadGuestTrips() {
    try {
      const stored = localStorage.getItem('romantic_bucket_list_guest_trips');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading guest trips from localStorage', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_TRIPS));
  }

  loadTrips() {
    if (this.isUserSignedIn()) {
      try {
        const cloudCached = localStorage.getItem(this.getCloudStorageKey());
        if (cloudCached) {
          const parsed = JSON.parse(cloudCached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Error loading cloud cached trips', e);
      }
    }

    return this.loadGuestTrips();
  }

  saveTrips() {
    if (this.isUserSignedIn()) {
      // 1. Save to Cloud Cache for this user/list
      try {
        localStorage.setItem(this.getCloudStorageKey(), JSON.stringify(this.trips));
      } catch (e) {
        console.error('Error saving cloud cache to localStorage', e);
      }

      // 2. Sync to Cloud Firestore in real time
      window.firebaseService.syncTripsToCloud(this.trips).catch(err => {
        console.error("Cloud sync failed:", err);
      });
    } else {
      // Save ONLY to Guest Storage (does not touch signed-in user's cloud account)
      try {
        localStorage.setItem('romantic_bucket_list_guest_trips', JSON.stringify(this.trips));
      } catch (e) {
        console.error('Error saving guest trips to localStorage', e);
      }
    }
  }

  // Initialize Leaflet Map
  initMap() {
    // Center between Western NY and Northern PA
    const defaultCenter = [42.15, -77.8];
    const defaultZoom = 8;

    this.map = L.map('map', {
      zoomControl: true,
      attributionControl: true
    }).setView(defaultCenter, defaultZoom);

    // Tile Layers (OpenStreetMap standard and Esri)
    this.baseLayers = {
      voyager: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }),
      topo: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 18
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP',
        maxZoom: 18
      })
    };

    // Default to OpenStreetMap (reliable, zero auth required, works everywhere)
    this.baseLayers.voyager.addTo(this.map);

    // Map click listener to capture coordinates when adding custom spot
    this.map.on('click', (e) => {
      const modal = document.getElementById('modal-trip');
      if (modal && modal.style.display !== 'none') {
        document.getElementById('form-lat').value = e.latlng.lat.toFixed(5);
        document.getElementById('form-lng').value = e.latlng.lng.toFixed(5);
        this.showToast(`Coordinates selected: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
      }
    });

    // Invalidate size and auto-fit bounds on load
    setTimeout(() => {
      this.map.invalidateSize();
      this.fitMapToBounds();
    }, 250);

    window.addEventListener('resize', () => {
      this.map.invalidateSize();
    });
  }

  // UI Event Bindings
  bindEvents() {
    // Layout View buttons (Split, Map, List)
    const layoutBtns = document.querySelectorAll('.view-btn[data-layout]');
    layoutBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        layoutBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const layout = btn.dataset.layout; // 'split', 'map', 'list'
        
        document.body.classList.remove('layout-split', 'layout-map', 'layout-list');
        document.body.classList.add(`layout-${layout}`);

        setTimeout(() => {
          this.map.invalidateSize();
          if (layout !== 'list') {
            this.fitMapToBounds();
          }
        }, 150);
      });
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('btn-clear-search');

    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      clearBtn.style.display = this.searchQuery ? 'block' : 'none';
      this.renderList();
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      this.searchQuery = '';
      clearBtn.style.display = 'none';
      this.renderList();
      searchInput.focus();
    });

    // Filter tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.renderList();
      });
    });

    // Mobile tabs
    const mobileTabs = document.querySelectorAll('.mobile-tab-btn');
    mobileTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        mobileTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        
        document.body.classList.remove('mobile-view-map');
        if (target === 'map') {
          document.body.classList.add('mobile-view-map');
          setTimeout(() => {
            this.map.invalidateSize();
            this.fitMapToBounds();
          }, 150);
        } else if (target === 'suggestions') {
          this.openSuggestionsModal();
        }
      });
    });

    // Basemap switchers
    const basemapBtns = document.querySelectorAll('.map-btn[data-basemap]');
    basemapBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        basemapBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const basemap = btn.dataset.basemap;
        Object.values(this.baseLayers).forEach(layer => this.map.removeLayer(layer));
        if (this.baseLayers[basemap]) {
          this.baseLayers[basemap].addTo(this.map);
        }
      });
    });

    // Reset Map Bounds
    document.getElementById('btn-fit-bounds').addEventListener('click', () => {
      this.fitMapToBounds();
    });

    // Road Trip Route Button
    const routeBtn = document.getElementById('btn-toggle-route');
    routeBtn.addEventListener('click', () => {
      this.toggleRoadTripRoute();
    });

    document.getElementById('btn-close-route').addEventListener('click', () => {
      this.toggleRoadTripRoute(false);
    });

    // Add Destination Modal
    document.getElementById('btn-add-trip').addEventListener('click', () => {
      this.openTripModal();
    });

    document.getElementById('btn-empty-add').addEventListener('click', () => {
      this.openTripModal();
    });

    document.getElementById('modal-close').addEventListener('click', () => {
      this.closeTripModal();
    });

    document.getElementById('modal-cancel').addEventListener('click', () => {
      this.closeTripModal();
    });

    // Form Submission
    document.getElementById('trip-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveTripForm();
    });

    // Suggestions Modal
    document.getElementById('btn-open-suggestions').addEventListener('click', () => {
      this.openSuggestionsModal();
    });

    document.getElementById('suggestions-close').addEventListener('click', () => {
      this.closeSuggestionsModal();
    });

    // Data Menu Dropdown
    const menuBtn = document.getElementById('btn-menu');
    const dataMenu = document.getElementById('data-menu');
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dataMenu.style.display = dataMenu.style.display === 'none' ? 'flex' : 'none';
    });

    document.addEventListener('click', () => {
      dataMenu.style.display = 'none';
    });

    dataMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Data Export
    document.getElementById('menu-export').addEventListener('click', () => {
      this.exportData();
      dataMenu.style.display = 'none';
    });

    // Data Import
    document.getElementById('menu-import-file').addEventListener('change', (e) => {
      this.importData(e);
      dataMenu.style.display = 'none';
    });

    // Data Reset
    document.getElementById('menu-reset').addEventListener('click', () => {
      if (confirm('Reset your trips list back to Watkins Glen, Cherry Springs, and Eternal Flame Falls?')) {
        this.trips = JSON.parse(JSON.stringify(DEFAULT_TRIPS));
        this.saveTrips();
        this.render();
        this.showToast('Reset to default destinations.');
      }
      dataMenu.style.display = 'none';
    });

    // Initialize Real-World Place Search
    this.initRealPlaceSearch();

    // Initialize Google Auth & Cloud Sync
    this.initFirebaseAuthUI();
  }

  // Rendering
  render() {
    this.updateStats();
    this.renderList();
    this.updateMapMarkers();
  }

  updateStats() {
    const total = this.trips.length;
    const completed = this.trips.filter(t => t.status === 'completed').length;
    const planned = this.trips.filter(t => t.status === 'planned').length;
    const wishlist = this.trips.filter(t => t.status === 'wishlist').length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-completed').textContent = completed;
    document.getElementById('stat-planned').textContent = planned;
    document.getElementById('stat-wishlist').textContent = wishlist;

    document.getElementById('count-all').textContent = total;
    document.getElementById('count-completed').textContent = completed;
    document.getElementById('count-planned').textContent = planned;
    document.getElementById('count-wishlist').textContent = wishlist;
  }

  renderList() {
    const container = document.getElementById('trip-cards-container');
    const emptyState = document.getElementById('empty-state');
    container.innerHTML = '';

    const filtered = this.trips.filter(trip => {
      // Filter by status tab
      if (this.currentFilter !== 'all' && trip.status !== this.currentFilter) {
        return false;
      }
      // Filter by search text
      if (this.searchQuery) {
        const query = this.searchQuery;
        const matchTitle = trip.title.toLowerCase().includes(query);
        const matchLoc = trip.location.toLowerCase().includes(query);
        const matchSpecial = (trip.special || '').toLowerCase().includes(query);
        const matchNotes = (trip.notes || '').toLowerCase().includes(query);
        const matchCat = (trip.category || '').toLowerCase().includes(query);
        return matchTitle || matchLoc || matchSpecial || matchNotes || matchCat;
      }
      return true;
    });

    if (filtered.length === 0) {
      emptyState.style.display = 'flex';
      const emptyTitle = emptyState.querySelector('h3');
      const emptyDesc = emptyState.querySelector('p');
      const emptyBtn = document.getElementById('btn-empty-add');
      
      if (this.searchQuery) {
        emptyTitle.textContent = `No destinations matching "${this.searchQuery}" in your list`;
        emptyDesc.innerHTML = `Would you like to search real places worldwide for "<strong>${this.searchQuery}</strong>"?`;
        emptyBtn.innerHTML = `<i class="fa-solid fa-earth-americas"></i> Search Worldwide for "${this.searchQuery}"`;
        emptyBtn.onclick = () => {
          this.openRealSearchModal(this.searchQuery);
        };
      } else {
        emptyTitle.textContent = 'No destinations found';
        emptyDesc.textContent = 'Try adjusting your search or filters, or add a new place to your bucket list!';
        emptyBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add a Destination`;
        emptyBtn.onclick = () => {
          this.openTripModal();
        };
      }
      return;
    } else {
      emptyState.style.display = 'none';
    }

    filtered.forEach(trip => {
      const card = this.createTripCard(trip);
      container.appendChild(card);
    });
  }

  createTripCard(trip) {
    const card = document.createElement('article');
    card.className = `trip-card ${this.selectedTripId === trip.id ? 'active-selected' : ''}`;
    card.id = `card-${trip.id}`;

    // Category icon helper
    const catIcons = {
      'State Park': 'fa-tree',
      'Waterfall': 'fa-water',
      'Stargazing': 'fa-star',
      'Romantic Getaway': 'fa-champagne-glasses',
      'Hiking & Canyon': 'fa-person-hiking',
      'Scenic Road Trip': 'fa-car-side'
    };
    const catIcon = catIcons[trip.category] || 'fa-location-dot';

    const imageHtml = trip.imageUrl ? `
      <div class="card-image-wrap">
        <img src="${trip.imageUrl}" alt="${trip.title}" loading="lazy" onerror="this.parentElement.style.display='none';">
        <div class="card-badge-category">
          <i class="fa-solid ${catIcon}"></i> ${trip.category || 'Destination'}
        </div>
        <div class="card-status-dropdown">
          <select class="status-select ${trip.status}" data-id="${trip.id}" aria-label="Trip status">
            <option value="wishlist" ${trip.status === 'wishlist' ? 'selected' : ''}>🧭 Wishlist</option>
            <option value="planned" ${trip.status === 'planned' ? 'selected' : ''}>📅 Planned</option>
            <option value="completed" ${trip.status === 'completed' ? 'selected' : ''}>✅ Visited</option>
          </select>
        </div>
      </div>
    ` : `
      <div class="card-image-wrap" style="height: 60px; background: var(--forest-light);">
        <div class="card-badge-category">
          <i class="fa-solid ${catIcon}"></i> ${trip.category || 'Destination'}
        </div>
        <div class="card-status-dropdown">
          <select class="status-select ${trip.status}" data-id="${trip.id}" aria-label="Trip status">
            <option value="wishlist" ${trip.status === 'wishlist' ? 'selected' : ''}>🧭 Wishlist</option>
            <option value="planned" ${trip.status === 'planned' ? 'selected' : ''}>📅 Planned</option>
            <option value="completed" ${trip.status === 'completed' ? 'selected' : ''}>✅ Visited</option>
          </select>
        </div>
      </div>
    `;

    card.innerHTML = `
      ${imageHtml}
      <div class="card-content">
        <div class="card-header-row">
          <div>
            <h3 class="card-title">${trip.title}</h3>
            <div class="card-location"><i class="fa-solid fa-location-dot"></i> ${trip.location}</div>
          </div>
          <div class="card-quick-actions">
            <button class="action-btn edit" title="Edit trip details" data-id="${trip.id}">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="action-btn delete" title="Remove from list" data-id="${trip.id}">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>

        <div class="card-section">
          <div class="card-section-title">
            <i class="fa-solid fa-sparkles"></i> What Makes It Special
          </div>
          <p>${trip.special}</p>
        </div>

        ${trip.coupleTip ? `
          <div class="couple-tip">
            <i class="fa-solid fa-lightbulb"></i>
            <div><strong>Couple's Tip:</strong> ${trip.coupleTip}</div>
          </div>
        ` : ''}

        ${trip.notes ? `
          <details class="personal-notes">
            <summary><i class="fa-regular fa-comment-dots"></i> Our Notes & Memories</summary>
            <p style="margin-top: 0.4rem; color: var(--text-muted); font-size: 0.8rem; line-height: 1.4;">${trip.notes}</p>
          </details>
        ` : ''}

        <div class="card-footer">
          <div class="season-tag">
            <i class="fa-regular fa-calendar"></i> ${trip.season || 'Any season'}
          </div>
          <button class="view-on-map-link" data-id="${trip.id}">
            <span>View on Map</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    // Interactive event listeners on card elements
    // Status Change
    const statusSelect = card.querySelector('.status-select');
    statusSelect.addEventListener('change', (e) => {
      e.stopPropagation();
      this.updateTripStatus(trip.id, e.target.value);
    });

    // Edit button
    card.querySelector('.action-btn.edit').addEventListener('click', (e) => {
      e.stopPropagation();
      this.openTripModal(trip);
    });

    // Delete button
    card.querySelector('.action-btn.delete').addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteTrip(trip.id);
    });

    // View on map
    card.querySelector('.view-on-map-link').addEventListener('click', (e) => {
      e.stopPropagation();
      this.focusTripOnMap(trip);
    });

    // Card click focuses map
    card.addEventListener('click', () => {
      this.focusTripOnMap(trip);
    });

    return card;
  }

  // Map Markers
  updateMapMarkers() {
    // Clear existing markers
    Object.values(this.markers).forEach(marker => this.map.removeLayer(marker));
    this.markers = {};

    this.trips.forEach(trip => {
      if (!trip.lat || !trip.lng) return;

      const marker = this.createCustomMarker(trip);
      marker.addTo(this.map);
      this.markers[trip.id] = marker;
    });

    // Also update route if active
    if (this.routeModeActive) {
      this.drawRoadTripRoute();
    }
  }

  createCustomMarker(trip) {
    const iconClass = trip.status === 'completed' ? 'fa-check' :
                      trip.status === 'planned' ? 'fa-calendar-check' : 'fa-heart';

    const customIcon = L.divIcon({
      className: 'custom-pin-wrapper',
      html: `
        <div class="custom-pin">
          <div class="pin-bubble status-${trip.status}">
            <i class="fa-solid ${iconClass}"></i>
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36]
    });

    const marker = L.marker([trip.lat, trip.lng], { icon: customIcon });

    const popupContent = `
      <div class="map-popup-card">
        ${trip.imageUrl ? `<img src="${trip.imageUrl}" class="map-popup-image" alt="${trip.title}">` : ''}
        <h4 class="map-popup-title">${trip.title}</h4>
        <div class="map-popup-loc"><i class="fa-solid fa-location-dot"></i> ${trip.location}</div>
        <p class="map-popup-desc">${trip.special}</p>
        <button class="map-popup-btn" onclick="window.bucketApp.scrollToCard('${trip.id}')">
          <i class="fa-solid fa-arrow-down"></i> View in List
        </button>
      </div>
    `;

    marker.bindPopup(popupContent);

    marker.on('click', () => {
      this.highlightCard(trip.id);
    });

    return marker;
  }

  focusTripOnMap(trip) {
    if (!trip.lat || !trip.lng) return;

    // Switch to map view on mobile if needed
    if (window.innerWidth <= 820) {
      document.body.classList.add('mobile-view-map');
      document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === 'map');
      });
      setTimeout(() => this.map.invalidateSize(), 150);
    }

    this.map.flyTo([trip.lat, trip.lng], 11, {
      duration: 1.2
    });

    if (this.markers[trip.id]) {
      this.markers[trip.id].openPopup();
    }

    this.highlightCard(trip.id);
  }

  highlightCard(tripId) {
    this.selectedTripId = tripId;
    document.querySelectorAll('.trip-card').forEach(c => c.classList.remove('active-selected'));
    const targetCard = document.getElementById(`card-${tripId}`);
    if (targetCard) {
      targetCard.classList.add('active-selected');
    }
  }

  scrollToCard(tripId) {
    // If on mobile map view, switch back to list
    if (window.innerWidth <= 820) {
      document.body.classList.remove('mobile-view-map');
      document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === 'list');
      });
    }

    const card = document.getElementById(`card-${tripId}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.highlightCard(tripId);
    }
  }

  fitMapToBounds() {
    const latLngs = this.trips
      .filter(t => t.lat && t.lng)
      .map(t => [t.lat, t.lng]);

    if (latLngs.length > 0) {
      this.map.fitBounds(L.latLngBounds(latLngs), {
        padding: [60, 60],
        maxZoom: 12
      });
    }
  }

  // Road Trip Loop Feature
  toggleRoadTripRoute(forceState) {
    this.routeModeActive = forceState !== undefined ? forceState : !this.routeModeActive;
    const btn = document.getElementById('btn-toggle-route');
    const card = document.getElementById('route-info-card');

    if (this.routeModeActive) {
      btn.classList.add('active');
      card.style.display = 'block';
      this.drawRoadTripRoute();
    } else {
      btn.classList.remove('active');
      card.style.display = 'none';
      if (this.routePolyline) {
        this.map.removeLayer(this.routePolyline);
        this.routePolyline = null;
      }
    }
  }

  drawRoadTripRoute() {
    if (this.routePolyline) {
      this.map.removeLayer(this.routePolyline);
      this.routePolyline = null;
    }

    // Sort valid spots in a logical scenic loop:
    // Buffalo/Eternal Flame -> Watkins Glen -> Cherry Springs -> (optional suggestions) -> back
    const pointsWithCoord = this.trips.filter(t => t.lat && t.lng);
    if (pointsWithCoord.length < 2) return;

    // Approximate TSP / natural road trip order (West to East, then South):
    // Sort roughly by longitude / latitude
    const sortedPoints = [...pointsWithCoord].sort((a, b) => {
      // Eternal Flame (~ -78.75) -> Watkins Glen (~ -76.87) -> Cherry Springs (~ -77.82)
      return b.lat - a.lat;
    });

    const routeCoords = sortedPoints.map(p => [p.lat, p.lng]);
    // Close the loop back to start
    routeCoords.push([sortedPoints[0].lat, sortedPoints[0].lng]);

    this.routePolyline = L.polyline(routeCoords, {
      color: '#c95d3b',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.85
    }).addTo(this.map);

    this.map.fitBounds(this.routePolyline.getBounds(), { padding: [50, 50] });

    // Populate route card details
    const container = document.getElementById('route-details-content');
    container.innerHTML = '';

    let totalApproxMiles = 0;

    for (let i = 0; i < sortedPoints.length; i++) {
      const current = sortedPoints[i];
      const next = sortedPoints[(i + 1) % sortedPoints.length];
      const distMiles = Math.round(this.calculateDistance(current.lat, current.lng, next.lat, next.lng));
      totalApproxMiles += distMiles;

      const stepDiv = document.createElement('div');
      stepDiv.className = 'route-step-item';
      stepDiv.innerHTML = `
        <div class="route-step">
          <div class="route-step-num">${i + 1}</div>
          <div><strong>${current.title}</strong></div>
        </div>
        <div class="route-leg-distance">
          <i class="fa-solid fa-car-side"></i> ~${distMiles} miles (~${Math.round(distMiles / 45 * 10) / 10} hrs drive) to <strong>${next.title}</strong>
        </div>
      `;
      container.appendChild(stepDiv);
    }

    const summaryDiv = document.createElement('div');
    summaryDiv.style.marginTop = '0.65rem';
    summaryDiv.style.paddingTop = '0.5rem';
    summaryDiv.style.borderTop = '1px solid var(--border-color)';
    summaryDiv.style.fontWeight = '700';
    summaryDiv.style.color = 'var(--forest)';
    summaryDiv.innerHTML = `<i class="fa-solid fa-gas-pump"></i> Complete Road Trip Loop: ~${totalApproxMiles} miles`;
    container.appendChild(summaryDiv);
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Multiply by ~1.25 to estimate road driving miles vs straight line
    return R * c * 1.25;
  }

  // CRUD Operations
  updateTripStatus(tripId, newStatus) {
    const trip = this.trips.find(t => t.id === tripId);
    if (trip) {
      trip.status = newStatus;
      this.saveTrips();
      this.updateStats();
      this.updateMapMarkers();
      
      const select = document.querySelector(`.status-select[data-id="${tripId}"]`);
      if (select) {
        select.className = `status-select ${newStatus}`;
      }

      this.showToast(`Updated "${trip.title}" to ${newStatus.toUpperCase()}`);
    }
  }

  deleteTrip(tripId) {
    const trip = this.trips.find(t => t.id === tripId);
    if (!trip) return;

    if (confirm(`Remove "${trip.title}" from your bucket list?`)) {
      this.trips = this.trips.filter(t => t.id !== tripId);
      this.saveTrips();
      this.render();
      this.showToast(`Removed "${trip.title}"`);
    }
  }

  openTripModal(trip = null) {
    const modal = document.getElementById('modal-trip');
    const form = document.getElementById('trip-form');
    form.reset();

    const searchInput = document.getElementById('form-search-place');
    if (searchInput) searchInput.value = '';
    const dropdown = document.getElementById('form-search-results');
    if (dropdown) dropdown.style.display = 'none';
    const spinner = document.getElementById('form-search-spinner');
    if (spinner) spinner.style.display = 'none';

    if (trip) {
      document.getElementById('modal-title').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Destination';
      document.getElementById('trip-id').value = trip.id;
      document.getElementById('form-title').value = trip.title;
      document.getElementById('form-location').value = trip.location;
      document.getElementById('form-category').value = trip.category || 'State Park';
      document.getElementById('form-lat').value = trip.lat || '';
      document.getElementById('form-lng').value = trip.lng || '';
      document.getElementById('form-status').value = trip.status;
      document.getElementById('form-season').value = trip.season || '';
      document.getElementById('form-special').value = trip.special || '';
      document.getElementById('form-coupletip').value = trip.coupleTip || '';
      document.getElementById('form-notes').value = trip.notes || '';
      document.getElementById('form-image').value = trip.imageUrl || '';
    } else {
      document.getElementById('modal-title').innerHTML = '<i class="fa-solid fa-location-dot"></i> Add New Destination';
      document.getElementById('trip-id').value = '';
      document.getElementById('form-status').value = 'wishlist';
      document.getElementById('form-category').value = 'State Park';
    }

    modal.style.display = 'flex';
  }

  closeTripModal() {
    document.getElementById('modal-trip').style.display = 'none';
  }

  saveTripForm() {
    const id = document.getElementById('trip-id').value || 'trip-' + Date.now();
    const title = document.getElementById('form-title').value.trim();
    const location = document.getElementById('form-location').value.trim();
    const category = document.getElementById('form-category').value;
    const lat = parseFloat(document.getElementById('form-lat').value) || null;
    const lng = parseFloat(document.getElementById('form-lng').value) || null;
    const status = document.getElementById('form-status').value;
    const season = document.getElementById('form-season').value.trim();
    const special = document.getElementById('form-special').value.trim();
    const coupleTip = document.getElementById('form-coupletip').value.trim();
    const notes = document.getElementById('form-notes').value.trim();
    const imageUrl = document.getElementById('form-image').value.trim();

    const tripData = {
      id,
      title,
      location,
      category,
      lat,
      lng,
      status,
      season,
      special,
      coupleTip,
      notes,
      imageUrl
    };

    const existingIndex = this.trips.findIndex(t => t.id === id);
    if (existingIndex >= 0) {
      this.trips[existingIndex] = tripData;
      this.showToast(`Updated "${title}"`);
    } else {
      this.trips.unshift(tripData);
      this.showToast(`Added "${title}" to your bucket list!`);
    }

    this.saveTrips();
    this.closeTripModal();
    this.render();

    if (lat && lng) {
      this.focusTripOnMap(tripData);
    }
  }

  // Suggestions Modal
  openSuggestionsModal() {
    const modal = document.getElementById('modal-suggestions');
    const grid = document.getElementById('suggestions-grid');
    grid.innerHTML = '';

    SUGGESTIONS.forEach(sugg => {
      const isAlreadyAdded = this.trips.some(t => t.title.toLowerCase() === sugg.title.toLowerCase());
      const card = document.createElement('div');
      card.className = 'suggestion-card';
      card.innerHTML = `
        <img src="${sugg.imageUrl}" alt="${sugg.title}" class="sugg-img" loading="lazy">
        <div class="sugg-content">
          <h4 class="sugg-title">${sugg.title}</h4>
          <div class="sugg-loc"><i class="fa-solid fa-location-dot"></i> ${sugg.location}</div>
          <p class="sugg-desc">${sugg.special}</p>
          <div class="sugg-action">
            ${isAlreadyAdded ? `
              <button class="btn btn-sm btn-secondary" disabled style="width: 100%; opacity: 0.7;">
                <i class="fa-solid fa-check"></i> Already in Bucket List
              </button>
            ` : `
              <button class="btn btn-sm btn-primary add-sugg-btn" data-id="${sugg.id}" style="width: 100%;">
                <i class="fa-solid fa-plus"></i> Add to Our Bucket List
              </button>
            `}
          </div>
        </div>
      `;

      if (!isAlreadyAdded) {
        card.querySelector('.add-sugg-btn').addEventListener('click', () => {
          this.addSuggestionToTrips(sugg);
          this.openSuggestionsModal(); // Re-render suggestion states
        });
      }

      grid.appendChild(card);
    });

    modal.style.display = 'flex';
  }

  closeSuggestionsModal() {
    document.getElementById('modal-suggestions').style.display = 'none';
  }

  addSuggestionToTrips(sugg) {
    const newTrip = {
      id: sugg.id + '-' + Date.now(),
      title: sugg.title,
      location: sugg.location,
      category: sugg.category,
      status: 'wishlist',
      season: sugg.season,
      lat: sugg.lat,
      lng: sugg.lng,
      special: sugg.special,
      coupleTip: sugg.coupleTip || '',
      notes: 'Added from curated road trip suggestions.',
      imageUrl: sugg.imageUrl
    };

    this.trips.push(newTrip);
    this.saveTrips();
    this.render();
    this.showToast(`Added "${sugg.title}" to your bucket list!`);
  }

  // Backup & Restore
  exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.trips, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `couples-travel-bucket-list-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('Bucket list exported to JSON file!');
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          this.trips = imported;
          this.saveTrips();
          this.render();
          this.showToast(`Imported ${imported.length} destinations!`);
        } else {
          alert('Invalid file format. Please upload a valid JSON bucket list backup.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  }

  // Toast Notification
  showToast(message) {
    const existing = document.querySelector('.app-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(30, 61, 52, 0.95);
      color: #ffffff;
      padding: 0.65rem 1.25rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      z-index: 3000;
      pointer-events: none;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // ========================================================
  // Real-World Destination Search (Nominatim / OpenStreetMap)
  // ========================================================

  initRealPlaceSearch() {
    // 1. Autocomplete Search inside Add Destination Modal
    const modalInput = document.getElementById('form-search-place');
    const modalDropdown = document.getElementById('form-search-results');
    const modalSpinner = document.getElementById('form-search-spinner');
    let modalDebounceTimer = null;

    if (modalInput) {
      modalInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(modalDebounceTimer);

        if (query.length < 2) {
          modalDropdown.style.display = 'none';
          modalDropdown.innerHTML = '';
          modalSpinner.style.display = 'none';
          return;
        }

        modalSpinner.style.display = 'block';
        modalDebounceTimer = setTimeout(async () => {
          if (this.modalSearchAbortController) {
            this.modalSearchAbortController.abort();
          }
          this.modalSearchAbortController = new AbortController();

          try {
            const places = await this.searchNominatim(query, this.modalSearchAbortController.signal);
            modalSpinner.style.display = 'none';
            this.renderModalAutocomplete(places);
          } catch (err) {
            if (err.name !== 'AbortError') {
              modalSpinner.style.display = 'none';
            }
          }
        }, 350);
      });

      // Close autocomplete on click outside
      document.addEventListener('click', (e) => {
        if (!modalInput.contains(e.target) && !modalDropdown.contains(e.target)) {
          modalDropdown.style.display = 'none';
        }
      });
    }

    // 2. Full Worldwide Search Modal
    const btnWorldwide = document.getElementById('btn-search-worldwide');
    const btnCloseReal = document.getElementById('real-search-close');
    const realInput = document.getElementById('real-search-input');
    const realSubmit = document.getElementById('btn-real-search-submit');
    let realDebounceTimer = null;

    if (btnWorldwide) {
      btnWorldwide.addEventListener('click', () => {
        this.openRealSearchModal();
      });
    }

    if (btnCloseReal) {
      btnCloseReal.addEventListener('click', () => {
        this.closeRealSearchModal();
      });
    }

    if (realInput) {
      realInput.addEventListener('input', (e) => {
        clearTimeout(realDebounceTimer);
        const q = e.target.value.trim();
        if (q.length >= 3) {
          realDebounceTimer = setTimeout(() => {
            this.executeRealSearch(q);
          }, 450);
        }
      });

      realInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          clearTimeout(realDebounceTimer);
          this.executeRealSearch(realInput.value.trim());
        }
      });
    }

    if (realSubmit) {
      realSubmit.addEventListener('click', () => {
        if (realInput) this.executeRealSearch(realInput.value.trim());
      });
    }

    // Quick tag pills in search modal
    document.querySelectorAll('.sugg-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.search;
        if (realInput) {
          realInput.value = query;
          this.executeRealSearch(query);
        }
      });
    });
  }

  async searchNominatim(query, signal) {
    if (!query) return [];
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=8&accept-language=en`;
    
    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal
      });

      if (!response.ok) return [];
      const data = await response.json();

      return data.map(item => {
        const title = item.name || item.display_name.split(',')[0].trim();
        const location = this.formatLocation(item);
        const category = this.inferCategory(item);
        const imageUrl = this.getPhotoForPlace(title, category);
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);

        return {
          raw: item,
          title,
          location,
          fullAddress: item.display_name,
          category,
          imageUrl,
          lat,
          lng,
          type: item.type || item.class || 'Place'
        };
      });
    } catch (e) {
      if (e.name === 'AbortError') throw e;
      console.error('Nominatim search error:', e);
      return [];
    }
  }

  formatLocation(place) {
    if (place.address) {
      const addr = place.address;
      const parts = [];
      const city = addr.city || addr.town || addr.village || addr.municipality || addr.county;
      const state = addr.state || addr.province || addr.region;
      const country = addr.country;

      if (city) parts.push(city);
      if (state) parts.push(state);
      if (country) parts.push(country);

      if (parts.length > 0) return parts.join(', ');
    }

    const segments = place.display_name.split(',').map(s => s.trim());
    return segments.length > 2 ? segments.slice(1, 4).join(', ') : place.display_name;
  }

  inferCategory(place) {
    const type = (place.type || '').toLowerCase();
    const cls = (place.class || '').toLowerCase();
    const name = (place.name || place.display_name || '').toLowerCase();

    if (name.includes('waterfall') || type.includes('waterfall') || name.includes('falls')) return 'Waterfall';
    if (name.includes('star') || name.includes('dark sky') || name.includes('observatory')) return 'Stargazing';
    if (type === 'nature_reserve' || type === 'national_park' || name.includes('national park') || name.includes('state park')) return 'State Park';
    if (name.includes('canyon') || name.includes('gorge') || name.includes('mountain') || name.includes('peak') || type === 'peak' || type === 'volcano') return 'Hiking & Canyon';
    if (name.includes('beach') || name.includes('coast') || name.includes('island') || name.includes('lake') || name.includes('wine') || name.includes('resort')) return 'Romantic Getaway';
    if (cls === 'natural' || cls === 'leisure') return 'Hiking & Canyon';
    return 'State Park';
  }

  getPhotoForPlace(name, category) {
    const photos = {
      'State Park': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      'Waterfall': 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      'Stargazing': 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
      'Hiking & Canyon': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'Romantic Getaway': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'Scenic Road Trip': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
    };
    return photos[category] || photos['State Park'];
  }

  renderModalAutocomplete(places) {
    const dropdown = document.getElementById('form-search-results');
    dropdown.innerHTML = '';

    if (!places || places.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 0.75rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
          No matching places found. Try another search.
        </div>
      `;
      dropdown.style.display = 'block';
      return;
    }

    places.forEach(place => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.innerHTML = `
        <div class="autocomplete-name">
          <span>${place.title}</span>
          <span class="autocomplete-type-tag">${place.category}</span>
        </div>
        <div class="autocomplete-desc">${place.location} (${place.lat.toFixed(3)}, ${place.lng.toFixed(3)})</div>
      `;

      item.addEventListener('click', () => {
        // Auto-fill the form fields!
        document.getElementById('form-title').value = place.title;
        document.getElementById('form-location').value = place.location;
        document.getElementById('form-lat').value = place.lat;
        document.getElementById('form-lng').value = place.lng;
        document.getElementById('form-category').value = place.category;
        
        const specialField = document.getElementById('form-special');
        if (!specialField.value.trim()) {
          specialField.value = `Incredible real-world destination in ${place.location}. High on our travel wishlist to experience together!`;
        }

        const imgField = document.getElementById('form-image');
        if (!imgField.value.trim()) {
          imgField.value = place.imageUrl;
        }

        dropdown.style.display = 'none';
        this.showToast(`Auto-filled details for "${place.title}"!`);
      });

      dropdown.appendChild(item);
    });

    dropdown.style.display = 'block';
  }

  openRealSearchModal(initialQuery = '') {
    const modal = document.getElementById('modal-real-search');
    const input = document.getElementById('real-search-input');
    const results = document.getElementById('real-search-results-list');
    const status = document.getElementById('real-search-status');

    modal.style.display = 'flex';
    results.innerHTML = '';

    if (initialQuery) {
      input.value = initialQuery;
      this.executeRealSearch(initialQuery);
    } else {
      input.value = '';
      status.style.display = 'block';
      status.innerHTML = `<i class="fa-solid fa-earth-americas"></i> Type any destination above or choose a popular idea below.`;
      setTimeout(() => input.focus(), 100);
    }
  }

  closeRealSearchModal() {
    const modal = document.getElementById('modal-real-search');
    if (modal) modal.style.display = 'none';
  }

  async executeRealSearch(query) {
    if (!query) return;
    const resultsContainer = document.getElementById('real-search-results-list');
    const status = document.getElementById('real-search-status');
    const spinner = document.getElementById('real-search-spinner');

    status.style.display = 'block';
    status.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Searching real places worldwide for "${query}"...`;
    resultsContainer.innerHTML = '';
    if (spinner) spinner.style.display = 'inline-block';

    if (this.searchAbortController) {
      this.searchAbortController.abort();
    }
    this.searchAbortController = new AbortController();

    try {
      const places = await this.searchNominatim(query, this.searchAbortController.signal);
      if (spinner) spinner.style.display = 'none';

      if (!places || places.length === 0) {
        status.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> No real-world places found matching "${query}". Try checking your spelling or search a broader region.`;
        return;
      }

      status.style.display = 'none';
      resultsContainer.innerHTML = '';

      places.forEach(place => {
        const isAdded = this.trips.some(t => t.title.toLowerCase() === place.title.toLowerCase());
        const card = document.createElement('div');
        card.className = 'real-result-card';
        card.innerHTML = `
          <div class="real-result-info">
            <div class="real-result-header">
              <span class="real-result-title">${place.title}</span>
              <span class="real-result-badge">${place.category}</span>
            </div>
            <div class="real-result-location">
              <i class="fa-solid fa-location-dot"></i> ${place.location}
            </div>
            <div class="real-result-coords">
              GPS: ${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}
            </div>
          </div>
          <div class="real-result-actions">
            ${isAdded ? `
              <button class="btn btn-sm btn-secondary" disabled style="opacity: 0.65;">
                <i class="fa-solid fa-check"></i> In Bucket List
              </button>
            ` : `
              <button class="btn btn-sm btn-primary add-quick-btn" title="Add directly to wishlist">
                <i class="fa-solid fa-plus"></i> Add to Wishlist
              </button>
              <button class="btn btn-sm btn-secondary customize-add-btn" title="Customize details first">
                <i class="fa-solid fa-pen"></i> Customize
              </button>
            `}
          </div>
        `;

        if (!isAdded) {
          card.querySelector('.add-quick-btn').addEventListener('click', () => {
            this.addRealPlaceDirectly(place);
          });
          card.querySelector('.customize-add-btn').addEventListener('click', () => {
            this.openTripModalWithPlace(place);
          });
        }

        resultsContainer.appendChild(card);
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        if (spinner) spinner.style.display = 'none';
        status.style.display = 'block';
        status.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Could not reach place search service. Please check your internet connection.`;
      }
    }
  }

  addRealPlaceDirectly(place) {
    const newTrip = {
      id: 'trip-' + Date.now(),
      title: place.title,
      location: place.location,
      category: place.category,
      status: 'wishlist',
      season: 'Spring / Summer',
      lat: place.lat,
      lng: place.lng,
      special: `A breathtaking destination in ${place.location}. Added from worldwide destination search.`,
      coupleTip: '',
      notes: 'Added to our couple wishlist!',
      imageUrl: place.imageUrl
    };

    this.trips.unshift(newTrip);
    this.saveTrips();
    this.closeRealSearchModal();
    this.render();
    this.focusTripOnMap(newTrip);
    this.showToast(`Added "${place.title}" to your bucket list!`);
  }

  openTripModalWithPlace(place) {
    this.closeRealSearchModal();
    this.openTripModal();

    // Populate the form fields with real place data
    document.getElementById('form-title').value = place.title;
    document.getElementById('form-location').value = place.location;
    document.getElementById('form-lat').value = place.lat;
    document.getElementById('form-lng').value = place.lng;
    document.getElementById('form-category').value = place.category;
    document.getElementById('form-image').value = place.imageUrl;
    document.getElementById('form-special').value = `A breathtaking destination in ${place.location}. Added from real-world search.`;
    document.getElementById('form-search-place').value = place.title;

    this.showToast(`Review details and click Save Destination!`);
  }

  // ========================================================
  // Google Authentication & Cloud Firestore Sync
  // ========================================================

  initFirebaseAuthUI() {
    const btnLogin = document.getElementById('btn-google-login');
    const profilePill = document.getElementById('user-profile-pill');
    const userDropdown = document.getElementById('user-dropdown-menu');
    const btnSignout = document.getElementById('btn-google-signout');
    const btnSyncNow = document.getElementById('btn-cloud-sync-now');
    const coupleCodeInput = document.getElementById('input-couple-code');
    const btnSaveCoupleCode = document.getElementById('btn-save-couple-code');
    const btnOpenSetup = document.getElementById('btn-open-cloud-settings');
    const menuSetupTrigger = document.getElementById('menu-cloud-setup-trigger');
    const closeSetupBtn = document.getElementById('cloud-setup-close');
    const cancelSetupBtn = document.getElementById('cloud-setup-cancel');
    const formSetup = document.getElementById('form-firebase-config');

    // Listener for Auth Changes
    const setupAuthWatcher = () => {
      if (!window.firebaseService) return;

      window.firebaseService.onAuthChange((user) => {
        if (user) {
          // User is signed in with Google!
          if (btnLogin) btnLogin.style.display = 'none';
          if (profilePill) profilePill.style.display = 'flex';

          const avatar = document.getElementById('user-avatar');
          const nameSpan = document.getElementById('user-display-name');
          const dropAvatar = document.getElementById('dropdown-user-avatar');
          const dropName = document.getElementById('dropdown-user-name');
          const dropEmail = document.getElementById('dropdown-user-email');

          const userPhoto = user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
          const userName = user.displayName ? user.displayName.split(' ')[0] : 'Google User';

          if (avatar) avatar.src = userPhoto;
          if (nameSpan) nameSpan.textContent = userName;
          if (dropAvatar) dropAvatar.src = userPhoto;
          if (dropName) dropName.textContent = user.displayName || 'Google User';
          if (dropEmail) dropEmail.textContent = user.email || '';
          if (coupleCodeInput) coupleCodeInput.value = window.firebaseService.coupleListId;

          // Subscribe to live Firestore sync for the shared couple bucket list!
          window.firebaseService.subscribeToCoupleTrips((cloudTrips, meta) => {
            if (cloudTrips && Array.isArray(cloudTrips)) {
              this.trips = cloudTrips;
              localStorage.setItem(this.getCloudStorageKey(), JSON.stringify(this.trips));
              this.render();
              const updater = meta && meta.lastUpdatedBy ? meta.lastUpdatedBy.name : 'Cloud';
              this.showToast(`Synced live from ${updater}! ☁️`);
            } else if (cloudTrips === null) {
              // First time in Firestore: save our local starter trips up to the cloud!
              window.firebaseService.syncTripsToCloud(this.trips);
            }
          });
        } else {
          // Signed out: switch back to the local guest trips list!
          if (btnLogin) btnLogin.style.display = 'inline-flex';
          if (profilePill) profilePill.style.display = 'none';
          if (userDropdown) userDropdown.style.display = 'none';

          this.trips = this.loadGuestTrips();
          this.render();
          this.fitMapToBounds();
        }
      });
    };

    if (window.firebaseService) {
      setupAuthWatcher();
    } else {
      window.addEventListener('firebase-service-ready', setupAuthWatcher);
    }

    // Google Sign-in click
    if (btnLogin) {
      btnLogin.addEventListener('click', async () => {
        if (!window.firebaseService || !window.firebaseService.isConfigured) {
          this.openCloudSetupModal();
          return;
        }

        try {
          this.showToast('Signing in with Google...');
          await window.firebaseService.loginWithGoogle();
          this.showToast('Signed in successfully! Loading cloud bucket list...');
        } catch (err) {
          if (err.message === "CONFIG_MISSING") {
            this.openCloudSetupModal();
          } else if (err.code === 'auth/unauthorized-domain') {
            alert('Firebase Notice:\nThe domain "' + window.location.hostname + '" is not authorized in your Firebase project yet.\n\nTo fix:\n1. Open Firebase Console > Authentication > Settings\n2. Under "Authorized domains", click "Add domain" and enter:\n' + window.location.hostname);
          } else if (err.code === 'auth/operation-not-allowed') {
            alert('Firebase Notice:\nGoogle Sign-In is not enabled yet in your Firebase project.\n\nTo fix:\n1. Open Firebase Console > Authentication > Sign-in method\n2. Click "Google" and toggle "Enable" then Save.');
          } else if (err.code !== 'auth/popup-closed-by-user') {
            alert('Google Sign-In notice: ' + (err.message || err));
          }
        }
      });
    }

    // Profile pill toggles dropdown menu
    if (profilePill) {
      profilePill.addEventListener('click', (e) => {
        e.stopPropagation();
        if (userDropdown) {
          userDropdown.style.display = userDropdown.style.display === 'none' ? 'flex' : 'none';
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (userDropdown && !userDropdown.contains(e.target) && !profilePill.contains(e.target)) {
        userDropdown.style.display = 'none';
      }
    });

    // Sign out button
    if (btnSignout) {
      btnSignout.addEventListener('click', async () => {
        if (window.firebaseService) {
          await window.firebaseService.logout();
          this.showToast('Signed out. Your trips are saved safely in the cloud.');
        }
        if (userDropdown) userDropdown.style.display = 'none';
      });
    }

    // Manual sync button
    if (btnSyncNow) {
      btnSyncNow.addEventListener('click', async () => {
        if (window.firebaseService && window.firebaseService.currentUser) {
          try {
            await window.firebaseService.syncTripsToCloud(this.trips);
            this.showToast('All trips synced to Google Cloud! ☁️');
          } catch (e) {
            this.showToast('Sync failed: ' + e.message);
          }
        }
        if (userDropdown) userDropdown.style.display = 'none';
      });
    }

    // Save Couple List Key (e.g. for sharing with girlfriend)
    if (btnSaveCoupleCode && coupleCodeInput) {
      btnSaveCoupleCode.addEventListener('click', () => {
        const val = coupleCodeInput.value.trim();
        if (val && window.firebaseService) {
          window.firebaseService.setCoupleListId(val);
          this.showToast(`Couple key set to "${val}". Re-syncing...`);
          window.firebaseService.subscribeToCoupleTrips((cloudTrips) => {
            if (cloudTrips && Array.isArray(cloudTrips)) {
              this.trips = cloudTrips;
              localStorage.setItem(this.getCloudStorageKey(), JSON.stringify(this.trips));
              this.render();
            }
          });
        }
        if (userDropdown) userDropdown.style.display = 'none';
      });
    }

    // Cloud Setup modal triggers
    if (btnOpenSetup) {
      btnOpenSetup.addEventListener('click', () => {
        if (userDropdown) userDropdown.style.display = 'none';
        this.openCloudSetupModal();
      });
    }
    if (menuSetupTrigger) {
      menuSetupTrigger.addEventListener('click', () => {
        const dataMenu = document.getElementById('data-menu');
        if (dataMenu) dataMenu.style.display = 'none';
        this.openCloudSetupModal();
      });
    }
    if (closeSetupBtn) closeSetupBtn.addEventListener('click', () => this.closeCloudSetupModal());
    if (cancelSetupBtn) cancelSetupBtn.addEventListener('click', () => this.closeCloudSetupModal());

    // Save Firebase Credentials form
    if (formSetup) {
      formSetup.addEventListener('submit', (e) => {
        e.preventDefault();
        const apiKey = document.getElementById('fb-apiKey').value.trim();
        const projectId = document.getElementById('fb-projectId').value.trim();
        const authDomain = document.getElementById('fb-authDomain').value.trim() || `${projectId}.firebaseapp.com`;
        const appId = document.getElementById('fb-appId').value.trim();

        const config = { apiKey, projectId, authDomain, appId };
        localStorage.setItem('custom_firebase_config', JSON.stringify(config));

        if (window.firebaseService) {
          window.firebaseService.init();
        }

        this.closeCloudSetupModal();
        this.showToast('Google Firebase credentials connected! Signing in...');

        setTimeout(() => {
          if (window.firebaseService) {
            window.firebaseService.loginWithGoogle().catch(() => {});
          }
        }, 400);
      });
    }
  }

  openCloudSetupModal() {
    const modal = document.getElementById('modal-cloud-setup');
    if (!modal) return;

    const stored = localStorage.getItem('custom_firebase_config');
    if (stored) {
      try {
        const cfg = JSON.parse(stored);
        if (cfg.apiKey) document.getElementById('fb-apiKey').value = cfg.apiKey;
        if (cfg.projectId) document.getElementById('fb-projectId').value = cfg.projectId;
        if (cfg.authDomain) document.getElementById('fb-authDomain').value = cfg.authDomain;
        if (cfg.appId) document.getElementById('fb-appId').value = cfg.appId;
      } catch (e) {}
    }

    modal.style.display = 'flex';
  }

  closeCloudSetupModal() {
    const modal = document.getElementById('modal-cloud-setup');
    if (modal) modal.style.display = 'none';
  }
}

// Global App Initialization
document.addEventListener('DOMContentLoaded', () => {
  window.bucketApp = new BucketListApp();
});

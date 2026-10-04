# 🌲 Our Travel Bucket List & Couple's Trip Tracker

A clean, responsive, and romantic travel bucket list web app built to track your adventures, visualize them on an interactive map, and plan regional road trips together.

🌐 **Live Website**: [https://ahumpo7.github.io/bucket-list/](https://ahumpo7.github.io/bucket-list/)

---

## 🚀 Quick Start

You can run this website right away without any complicated setup:

### Option 1: Direct in your browser (Easiest)
Simply double-click [`index.html`](file:///c:/Users/Andrew/Desktop/Projects/bucket%20list/index.html) or right-click it and select **Open with > Google Chrome** (or Edge/Brave/Firefox).

### Option 2: Local HTTP Server (Optional)
If you prefer running via a local web server:
- With Node:
  ```powershell
  npx serve .
  ```
- Or with Python:
  ```powershell
  python -m http.server 8000
  ```
  Then open `http://localhost:8000`.

---

## 📍 Included Destinations & What Makes Them Special

### 1. Watkins Glen State Park, NY
- **Region**: Finger Lakes (Watkins Glen, NY)
- **Coordinates**: `[42.3732, -76.8715]`
- **What Makes It Special**: 19 waterfalls tightly packed into 2 miles of sheer 200-ft gorge walls carved over millennia. Features the iconic stone Rainbow Bridge and Cavern Cascade (where you walk directly behind a roaring curtain of falling water). Located at the base of Seneca Lake, surrounded by Finger Lakes wineries, craft cideries, and romantic lakefront dinners.
- **Couple's Tip**: Hike early before 9:00 AM to beat the tour buses. Hike the Gorge Trail uphill, then take the $3 park shuttle back down to avoid backtracking down 800 stone steps.

### 2. Cherry Springs State Park, PA
- **Region**: Potter County / PA Wilds (Coudersport, PA)
- **Coordinates**: `[41.6628, -77.8236]`
- **What Makes It Special**: An official Gold-Tier International Dark Sky Park perched atop an isolated 2,300-ft mountain summit surrounded by 262,000 acres of forest. It is one of the darkest night skies on the entire US East Coast. On clear moonless nights, the Milky Way is so vivid that it literally casts visible shadows on the ground!
- **Couple's Tip**: White flashlights are strictly prohibited on the observation field to protect night vision; use red-light headlamps or red cellophane. Bring reclining camping chairs, heavy thermal blankets (mountain air gets chilly even in July!), hot cocoa in a thermos, and an offline star map app (like Stellarium). Aim for New Moon weekends.

### 3. Eternal Flame Falls, NY
- **Region**: Chestnut Ridge Park (Orchard Park / Buffalo, NY)
- **Coordinates**: `[42.7019, -78.7501]`
- **What Makes It Special**: A natural macro-seep of hydrocarbon gas burning inside a small shale grotto right behind a 35-foot cascading waterfall! It is one of only a handful of natural eternal flames on Earth. The glowing flame flickering behind the curtain of falling water feels like pure fantasy.
- **Couple's Tip**: Bring a long grill lighter with you just in case the flame was snuffed out by wind or heavy spray (hikers routinely re-light it!). Wear waterproof hiking shoes with solid grip because the trail follows directly down and through a shale creek bed.

---

## 🗺️ Curated Suggestions (Perfect for an Epic Loop Road Trip!)

Because all three destinations are situated within the **Western NY / Finger Lakes / PA Wilds** corridor, they naturally form a scenic 3–4 day couple's road trip loop (~250 miles total driving):

1. **Letchworth State Park, NY** ("The Grand Canyon of the East"):
   - Located directly between Buffalo and Watkins Glen.
   - 3 giant waterfalls, 550-ft canyon walls, historic Glen Iris Inn, and sunrise hot air balloon flights over the gorge.
2. **Kinzua Bridge State Park & Skywalk, PA**:
   - 1 hour west of Cherry Springs.
   - An 1882 historic viaduct partially toppled by a tornado, turned into a 600-foot pedestrian skywalk with a glass-bottom viewing floor looking 225 feet down into the canyon.
3. **Taughannock Falls State Park, NY**:
   - 30 minutes from Watkins Glen in Ithaca.
   - Plunges 215 feet (33 feet higher than Niagara Falls!) with an easy flat stroll along the canyon floor to Cayuga Lake.
4. **Pine Creek Gorge ("PA Grand Canyon"), PA**:
   - 35 minutes east of Cherry Springs in Wellsboro.
   - 47 miles of deep canyon, scenic rim overlooks at Colton Point & Leonard Harrison, and tandem biking down the Pine Creek Rail Trail.
5. **Niagara Falls State Park (Cave of the Winds), NY**:
   - 45 minutes north of Eternal Flame Falls.
   - Stand on the Hurricane Deck right in the mist of Bridal Veil Falls, plus evening illumination fireworks.

---

## ✨ Web App Features

- **Interactive Leaflet Map**: Smooth zooming, custom color-coded map pins (Visited = Green, Planned = Blue, Wishlist = Amber, Suggestions = Violet).
- **Real-World Destination Search (Worldwide)**: Search any national park, landmark, waterfall, city, or hiking trail in the world (powered by OpenStreetMap). Add to your list with a single click or customize details with auto-populated GPS coordinates and region!
- **Smart Auto-Fill**: In the "Add Destination" modal, simply type any location into the search box to automatically populate the exact latitude, longitude, region, and category.
- **Road Trip Route Visualizer**: One-click button connects your destinations into an optimal driving loop with distance in miles and estimated drive times.
- **Map Layers**: Switch between Scenic (CartoDB Voyager), Topographic (OpenTopoMap), and Satellite imagery.
- **Couple's Notes & Memories**: Add notes, packing lists, reservation details, or favorite trip memories right on each card.
- **Filter & Search**: Quickly search destinations by name, region, or category, and filter by status (All / Wishlist / Planned / Visited).
- **1-Click Suggestions**: Browse curated natural wonders nearby and add them to your bucket list with one click.
- **Local Storage Persistence**: Everything you add, edit, check off, or write is automatically saved in your browser.
- **JSON Backup & Restore**: Export your bucket list anytime to share or back up.

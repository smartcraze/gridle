# Gridle — ISS Explorer (Expo + React Native)

Gridle is a small Expo app built for exploring historical events around the International Space Station and a few realtime space feeds (ISS location, who is in space, NASA's Astronomy Picture of the Day).

This README explains how to run the project locally, what pages are included, environment variables, and troubleshooting tips (PowerShell-friendly).

## Features

- Timeline of ISS historical events (scrollable, image-backed)
- "Where is ISS?" — a map view showing the current ISS location (Leaflet in a WebView)
- NASA Picture of the Day (APOD) — uses NASA APOD API
- Astronauts in space — pulls live data from Open Notify
- Drawer navigation to switch between pages

## Project layout

- `app/` — Expo/React Native route files and screens
- `assets/` — images and static data (timeline images, timeline JSON)
- `components/` — shared UI (menu-bar, etc.)
- `lib/` — small utilities

## Requirements

- Node.js (recommended v20.x)
- npm
- Expo CLI (optional, but convenient): `npm install -g expo-cli`

Note: the project was developed and tested with Expo and React Native. If you run into environment/tooling mismatches you may see warnings; those usually don't block development but can be addressed by upgrading Node/npm.

## Setup (Windows PowerShell)

1. Install dependencies

   ```powershell
   cd "D:\Hackathons\Eurekathon 2025\gridle"
   npm install
   ```

2. Start Expo

   ```powershell
   npx expo start
   ```

Follow the Expo CLI output to open an Android emulator, iOS simulator, or Expo Go on your phone.

## Environment variables

The project reads a NASA API key from `.env.local` via `react-native-dotenv`.

- Example `.env.local` (already present in your repo):

  ```text
  NASA_API=YOUR_REAL_KEY_HERE
  ```

If the key is not set the app falls back to NASA's `DEMO_KEY` which has strict rate limits.

## Pages / Routes

- `/` — Home
- `/explore` — ISS timeline (uses `assets/json/timeline.json` and images in `assets/images`)
- `/iss-location` — Live ISS location (Leaflet map embedded in a WebView)
- `/nasa-apod` — NASA Astronomy Picture of the Day
- `/astronauts` — People currently in space (Open Notify API)

## How the APIs are used

- ISS location: https://api.wheretheiss.at/v1/satellites/25544 (polled periodically)
- NASA APOD: https://api.nasa.gov/planetary/apod?api_key=NASA_API
- Astronauts: http://api.open-notify.org/astros.json

## Quick developer notes

- Styling uses Tailwind via NativeWind (see `tailwind.config.js`) — you can use className on React Native components.
- The map implementation uses `react-native-webview` to host a Leaflet map (simpler cross-platform approach). If you prefer a native map, swap the WebView out for `react-native-maps`.
- The original Three.js globe was removed because Three.js expects a DOM and `document`, which doesn't exist in React Native.

## Troubleshooting

- Metro bundle errors referencing `InternalBytecode.js` or `document` typically mean a library attempted to use browser-only APIs. To fix: remove the offending library or use a React-Native-compatible alternative (we replaced Three.js with a Leaflet WebView approach).
- If an API call fails, check your `.env.local` and network connectivity.

## Testing

Open the app and navigate via the drawer to each page. The following quick checks are useful:

- Timeline: scroll the events, confirm images show
- "Where is ISS?": confirm the red marker appears on the map and the map recenters
- NASA APOD: confirm the image, title and explanation appear
- Astronauts: confirm the list matches Open Notify's data

## Next improvements (optional)

- Add caching for API responses to reduce network calls
- Add more timeline filters and search
- Replace the Leaflet WebView with a native map component and a lightweight rendering of the globe

## License

This repository doesn't include a license file. Add one if you plan to publish the code.

---

If you'd like I can:

- add a CONTRIBUTING.md with development conventions,
- wire E2E tests for key flows (timeline and APOD), or
- convert the Leaflet WebView into a native map component.

Tell me which one you want next and I'll implement it.

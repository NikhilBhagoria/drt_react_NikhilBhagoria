# Satellite Tracker - Digantara Frontend Assignment

A React-based satellite tracking application built with TypeScript, Tailwind CSS, and virtualization for efficient handling of large datasets.

## Features

### Core Features ✅
- **Search**: Search by satellite name and NORAD Cat ID (triggers on Enter)
- **Filters**: Multi-select object types and orbit codes with Apply Filters button
- **Results Table**: Sortable columns (name, noradCatId, launchDate, countryCode)
- **Virtualized Rendering**: Efficient handling of large datasets using react-virtualized
- **Loading/Error States**: Proper UI feedback during API calls

### Bonus Features ✅
- **Row Selection**: Checkbox selection with 10-item limit
- **Persistence**: Selected items persist in localStorage across page reloads
- **Second Page**: Dedicated page showing selected objects
- **Navigation**: React Router for seamless page transitions

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Virtualization**: react-virtualized
- **State Management**: React hooks + localStorage
- **Build Tool**: Vite

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd drt_react_satellite_tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## Project Structure

src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (API calls)
├── App.tsx            # Main app component
└── main.tsx           # Entry point
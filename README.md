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
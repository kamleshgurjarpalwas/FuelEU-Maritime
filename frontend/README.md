# FuelEU Maritime Frontend

This is the frontend application for the FuelEU Maritime project, built with React, TypeScript, and Tailwind CSS. The application follows a clean architecture pattern with domain-driven design principles.

## Project Structure

```
frontend/
├── src/
│   ├── core/                   # Core business logic
│   │   ├── domain/            # Domain types and constants
│   │   │   ├── types.ts       # TypeScript interfaces/types
│   │   │   └── constants.ts   # Constants and enums
│   │   ├── application/       # Use cases and business rules
│   │   │   └── usecases.ts    # Business logic implementation
│   │   └── ports/            # Port interfaces for adapters
│   ├── adapters/              # Implementation adapters
│   │   ├── infrastructure/    # External services
│   │   │   └── apiClient.ts   # API client implementation
│   │   └── ui/               # User interface components
│   │       ├── components/    # Reusable UI components
│   │       │   ├── Header.tsx
│   │       │   ├── Table.tsx
│   │       │   ├── Tabs.tsx
│   │       │   └── KPI.tsx
│   │       └── pages/        # Page components
│   │           ├── RoutesTab.tsx
│   │           ├── CompareTab.tsx
│   │           ├── BankingTab.tsx
│   │           └── PoolingTab.tsx
│   ├── shared/               # Shared utilities
│   └── styles/              # Global styles and Tailwind config
```

## Features

1. **Routes Management**
   - View all routes with filtering options
   - Set baseline routes for comparison
   - Display route details including GHG intensity

2. **Comparison Analysis**
   - Compare routes against baseline
   - View percentage differences
   - Check compliance status

3. **Banking Operations**
   - View banking records
   - Bank surplus emissions
   - Apply banked emissions

4. **Pooling Management**
   - Create and manage pools
   - Add members to pools
   - View pool statistics

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE=http://localhost:4000/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Technology Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool

### Architecture

The frontend follows a clean architecture pattern with:

1. **Core Layer**
   - Domain types and interfaces
   - Business logic in use cases
   - Port definitions for external dependencies

2. **Adapters Layer**
   - UI components implementing the presentation
   - Infrastructure services like API client
   - Page components organizing the UI

3. **Shared Layer**
   - Common utilities and helpers
   - Shared types and constants

### Components

1. **Header**
   - Application navigation
   - Tab switching

2. **Table**
   - Reusable data table
   - Sorting and filtering
   - Action buttons

3. **Tabs**
   - Navigation between main sections
   - Active tab indication

4. **KPI**
   - Key performance indicators
   - Metric displays

### Pages

1. **RoutesTab**
   - Route listing and management
   - Filtering options
   - Baseline setting

2. **CompareTab**
   - Route comparison interface
   - Compliance checking
   - Difference calculation

3. **BankingTab**
   - Banking operations interface
   - Record viewing
   - Banking actions

4. **PoolingTab**
   - Pool management interface
   - Member addition
   - Pool creation

## API Integration

The application communicates with the backend through the `apiClient.ts` adapter:

```typescript
const api = {
  // Routes
  getRoutes: (filters?) => {...},
  setBaseline: (id) => {...},
  
  // Comparison
  getComparison: () => {...},
  
  // Banking
  getBankRecords: (shipId, year) => {...},
  bank: (shipId, year, amount_g) => {...},
  applyBanked: (shipId, year, amount_g) => {...},
  
  // Pools
  createPool: (year, members) => {...}
};
```

## Error Handling

- API errors are caught and displayed to users
- Loading states are managed for better UX
- Type safety ensures data consistency

## State Management

- React's built-in useState and useEffect for local state
- Props for component communication
- API client for data fetching

## Styling

- Tailwind CSS for utility-first styling
- Custom color scheme in tailwind.config.js
- Responsive design for all screen sizes

## License

This project is private and confidential.

# FuelEU Maritime Backend

This is the backend server for the FuelEU Maritime application, built with Node.js, Express, TypeScript, and PostgreSQL. The server follows a clean architecture pattern with domain-driven design principles.

## Project Structure

```
backend/
├── src/
│   ├── core/                   # Core business logic
│   │   ├── domain/            # Domain entities and value objects
│   │   ├── application/       # Use cases/application services
│   │   └── ports/            # Repository interfaces
│   ├── adapters/              # Implementation of ports
│   │   ├── inbound/          # HTTP controllers/routes
│   │   └── outbound/         # Database repositories
│   ├── infrastructure/        # External concerns
│   │   ├── db/               # Database configuration
│   │   └── server/           # Express server setup
│   └── shared/               # Shared utilities and types
```

## API Endpoints

### Routes

- `GET /api/routes` - Get all routes with optional filters
  - Query params: `vesselType`, `fuelType`, `year`
- `POST /api/routes/:id/baseline` - Set a route as baseline

### Compliance

- `GET /api/compliance/cb` - Compute CB for a route
  - Query params: `routeId`
- `GET /api/compliance/adjusted-cb` - Get adjusted CB
  - Query params: `shipId`, `year`

### Banking

- `GET /api/banking/records` - Get banking records
  - Query params: `shipId`, `year`
- `POST /api/banking/bank` - Bank surplus emissions
  - Body: `{ shipId, year, amount_g }`
- `POST /api/banking/apply` - Apply banked emissions
  - Body: `{ shipId, year, amount_g }`

### Pools

- `POST /api/pools` - Create a new pool
  - Body: `{ year, members: Array<{ ship_id, cb_before_g }> }`

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   PORT=4000
   DATABASE_URL="postgresql://username:password@localhost:5432/fueleu_maritime"
   ```

3. Setup the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The application uses PostgreSQL with Prisma as the ORM. Key tables include:

- `Route` - Stores route information and emissions data
- `ShipCompliance` - Tracks compliance data for ships
- `BankEntry` - Records banked emissions
- `Pool` - Manages pooling arrangements

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests (when implemented)

### Architecture

The backend follows a clean architecture pattern with:

1. **Core Layer**
   - Domain entities and business rules
   - Use cases implementing application logic
   - Port interfaces defining external dependencies

2. **Adapters Layer**
   - HTTP controllers handling REST endpoints
   - PostgreSQL repositories implementing data access

3. **Infrastructure Layer**
   - Express server configuration
   - Database setup and migrations
   - Environment configuration

### Error Handling

The API uses consistent error responses:

```json
{
  "error": "Error message",
  "status": 400,
  "details": { ... }
}
```

## Testing

(To be implemented)
- Unit tests for core business logic
- Integration tests for API endpoints
- E2E tests for critical flows

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is private and confidential.

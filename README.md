# KMRL Induction Planning Application

A comprehensive train management system for Kochi Metro Rail Limited (KMRL) with real-time dashboard, maintenance tracking, and predictive analytics.

## Features

- **Real-time Dashboard**: Live KPIs and fleet status monitoring
- **Train Management**: Complete train lifecycle tracking
- **Job Card System**: Maintenance task management and tracking
- **Certificate Management**: Fitness and safety certificate tracking
- **Cleaning Management**: Automated cleaning schedule management
- **Branding Management**: Advertisement contract and exposure tracking
- **Predictive Analytics**: AI-powered maintenance predictions

## Tech Stack

### Frontend

- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for components
- **Recharts** for data visualization
- **React Hook Form** for form management

### Backend

- **Spring Boot 3.5.5**
- **Spring Data JPA** for data persistence
- **MySQL** database
- **Spring Security** for authentication
- **Maven** for dependency management

## Prerequisites

- Node.js 18+ and npm
- Java 17+
- MySQL 8.0+
- Maven 3.6+

## Installation & Setup

### 1. Backend Setup

```bash
cd newfrontend/backend

# Update database configuration in src/main/resources/application.properties
# The database URL is already configured to: mysql://sih:Sih8080!@13.201.96.108/kmrl

# Build and run the backend
./mvnw clean install
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 2. Frontend Setup

```bash
cd newfrontend/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:9002`

### 3. Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## API Endpoints

### Trains

- `GET /api/trains` - Get all trains
- `GET /api/trains/{id}` - Get train by ID
- `GET /api/trains/available` - Get available trains
- `POST /api/trains` - Create new train
- `PUT /api/trains/{id}` - Update train

### Job Cards

- `GET /api/jobcards` - Get all job cards
- `GET /api/jobcards/open` - Get open job cards
- `POST /api/jobcards` - Create job card
- `PUT /api/jobcards/{id}/complete` - Complete job card

### Certificates

- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/expired` - Get expired certificates
- `POST /api/certificates` - Create certificate

### Cleaning

- `GET /api/cleaning` - Get all cleaning tasks
- `GET /api/cleaning/today` - Get today's cleaning tasks
- `POST /api/cleaning` - Create cleaning task

### Branding

- `GET /api/branding/contracts` - Get all contracts
- `GET /api/branding/assignments` - Get all assignments
- `POST /api/branding/contracts` - Create contract

## Performance Optimizations

- **API Caching**: 5-minute cache for frequently accessed data
- **React.memo**: Optimized component re-rendering
- **Lazy Loading**: Components loaded on demand
- **Error Boundaries**: Graceful error handling
- **Loading States**: Skeleton screens for better UX

## Development

### Running Tests

```bash
# Backend tests
cd backend
./mvnw test

# Frontend tests
cd frontend
npm run test
```

### Building for Production

```bash
# Backend
cd backend
./mvnw clean package

# Frontend
cd frontend
npm run build
npm start
```

## Database Schema

The application uses the following main entities:

- **Trains**: Train information and status
- **JobCards**: Maintenance tasks and assignments
- **Certificates**: Fitness and safety certificates
- **CleaningTasks**: Cleaning schedules and status
- **BrandingContracts**: Advertisement contracts
- **StablingGeometry**: Depot layout and bay assignments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for Kochi Metro Rail Limited.

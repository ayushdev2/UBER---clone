# Uber Clone Frontend

A modern React-based frontend application for an Uber clone service, built with Vite and integrated with OpenStreetMap.

## Features

- **Real-time Map Integration**
  - Live location tracking
  - Dynamic route visualization
  - Address autocomplete
  - Interactive map markers

- **User Features**
  - Authentication (Login/Signup)
  - Book rides
  - Track ride status
  - View ride history
  - Real-time driver location

- **Captain (Driver) Features**
  - Authentication system
  - Accept/Reject rides
  - Navigate to pickup locations
  - Manage ride completions
  - Track earnings

## Tech Stack

- React 19.1.0 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Leaflet/React-Leaflet for maps
- Context API for state management
- Axios for API requests

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Map.jsx
│   │   ├── LocationSearchPanel.jsx
│   │   └── VehiclePanel.jsx
│   ├── pages/           # Route components
│   │   ├── Home.jsx
│   │   └── Riding.jsx
│   ├── context/         # React context providers
│   ├── utils/           # Utility functions
│   └── assets/          # Static assets
```

## Getting Started

1. **Installation**
```bash
npm install
```

2. **Development**
```bash
npm run dev
```

3. **Build**
```bash
npm run build
```

4. **Preview**
```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_backend_api_url
```

## API Status Codes

- **200**: Success
- **201**: Resource created
- **400**: Bad request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not found
- **500**: Server error

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenStreetMap for map data
- React-Leaflet for map integration
- Tailwind CSS for styling
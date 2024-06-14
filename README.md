
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

DEMO [https://open-layers-map-application.vercel.app/](OpenLayers Map Application) hosted on Vercel.

# Geometrical Points Creation

This project revolves around the creation of geometrical points based on selected locations. The process involves the following key steps:

1. **Creating Geometrical Points**: Choose locations and generate geometrical points using one of the available types:
    - **Point**: Generate one or more points for each location.
    - **LineString**: Generate one or more line strings, each composed of multiple points.
    - **Polygon**: Generate a polygon, which is an area enclosed by a border.

2. **Naming and Dating Locations**: Assign names to the chosen locations and record the date of creation.

3. **Sending Data to Database**: Transmit the coordinates, along with their names and creation dates, to a mock database.

Please adhere to the instructions provided in the documentation for each step.


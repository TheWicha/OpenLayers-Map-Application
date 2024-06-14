
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

# DEMO

[Demo](https://open-layers-map-application.vercel.app/) hosted on Vercel.

# Geometrical Points Creation

This project is about creating geometrical points based on selected locations. The process is divided into three main steps:

## 1. Creating Geometrical Points

This is the first step where you will select locations and generate geometrical points. There are three types of geometrical points that you can create:

- **Point**: This allows you to generate one or more points for each location.
- **LineString**: This allows you to generate one or more line strings. Each line string is composed of multiple points.
- **Polygon**: This allows you to generate a polygon. A polygon is an area that is enclosed by a border.

## 2. Naming and Dating Locations

In this step, you will assign names to the chosen locations. You will also record the date of creation for each location.

## 3. Sending Data to Database

In this last step, you'll send the coordinates details and their names and creation dates, to a database. After you submit, you should see a success message on your screen.


# The Wild Oasis

A modern hotel management application built with React and Vite, designed to streamline operations for "The Wild Oasis" resort. This app provides a comprehensive dashboard for managing cabins, bookings, guests, and staff activities.

## Features

- **Authentication**: Secure login and signup for staff members
- **Dashboard**: Overview of key metrics, sales charts, and recent activities
- **Cabin Management**: Add, edit, delete, and view cabin details with image uploads
- **Booking Management**: Handle reservations, check-ins, check-outs, and booking details
- **Guest Management**: Manage guest information and profiles
- **Settings**: Update application settings like breakfast price and minimum nights
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop and mobile devices

## Technologies Used

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-000000?style=for-the-badge&logo=react&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![date-fns](https://img.shields.io/badge/date--fns-000000?style=for-the-badge&logo=date-fns&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-000000?style=for-the-badge&logo=react&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-000000?style=for-the-badge&logo=recharts&logoColor=white)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Asmaa-204/the-wild-oasis.git
   cd the-wild-oasis
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Acknowledgments

- Built as part of jonas schmedtmann React course project
- Uses Supabase for backend services

# Movie Explorer

A modern movie search and discovery web application built with Next.js, TypeScript, Redux Toolkit, and TMDB API. Features internationalization support, theme switching, and comprehensive movie browsing capabilities.

## 🎬 Features

- **Search Movies**: Search for movies using TMDB API with real-time results and debounced input
- **Browse Multiple Categories**: Discover movies across different categories:
  - Trending This Week
  - Popular Movies
  - Now Playing
  - Top Rated
  - Upcoming Movies
- **Movie Details**: View comprehensive movie information including:
  - Overview, rating, genres
  - Cast and crew information (clickable cast members)
  - Production details (companies, countries)
  - Release date, runtime, budget, revenue, and more
- **Actor/Person Details**: View detailed information about actors and crew members:
  - Biography and personal information
  - Filmography (as actor and crew)
  - Profile photos and career highlights
- **Internationalization (i18n)**: Full support for Turkish and English languages
  - Language preference stored in localStorage and cookies
  - Dynamic API calls based on selected locale
  - Seamless language switching
- **Theme Support**: Light and dark theme options
  - Theme preference persisted in localStorage
  - System preference detection
  - Smooth theme transitions
- **Responsive Design**: Fully responsive UI that works on all devices
  - Mobile-first approach
  - Hamburger menu for mobile navigation
  - Optimized layouts for all screen sizes
- **Modern UI**: Clean interface with smooth animations
  - Loading states and skeleton loaders
  - Page transition loaders
  - Uniform movie card heights
  - Maximum 5 movie cards per row on large screens

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: TailwindCSS + SCSS Modules
- **Internationalization**: next-intl
- **API**: TMDB (The Movie Database) API v3 (Bearer Token Authentication)

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- TMDB Access Token ([Get one here](https://www.themoviedb.org/settings/api))

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd movie-app
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_ACCESS_TOKEN_HERE
```

Replace `YOUR_TMDB_ACCESS_TOKEN_HERE` with your actual TMDB access token (Bearer token). You can get your access token from [TMDB Settings](https://www.themoviedb.org/settings/api).

**Note**: This application uses Bearer token authentication. Make sure you're using an access token, not an API key.

4. **Run the development server**

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 📁 Project Structure

```
movie-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with i18n
│   │   ├── page.tsx            # Home page (all categories)
│   │   ├── providers.tsx       # Redux & Theme providers
│   │   ├── search/             # Search page
│   │   ├── trending/           # Trending movies page
│   │   ├── popular/            # Popular movies page
│   │   ├── now-playing/        # Now playing movies page
│   │   ├── top-rated/          # Top rated movies page
│   │   ├── upcoming/           # Upcoming movies page
│   │   ├── movie/[id]/         # Movie detail page
│   │   └── person/[id]/        # Actor/person detail page
│   ├── components/
│   │   ├── layout/             # Layout components (Header, Footer, MainLayout)
│   │   ├── movies/             # Movie-related components
│   │   └── ui/                 # Reusable UI components
│   ├── features/               # Redux store and slices
│   │   ├── movies/             # Movies API and slice
│   │   └── store.ts            # Redux store configuration
│   ├── contexts/               # React contexts
│   │   └── ThemeContext.tsx    # Theme management
│   ├── lib/                    # Utility functions
│   │   ├── locales.ts         # Locale definitions
│   │   ├── locale.ts           # Locale management (localStorage/cookies)
│   │   ├── tmdbLanguage.ts     # TMDB language mapping
│   │   ├── tmdbImage.ts        # TMDB image URL helpers
│   │   └── formatters.ts       # Date, currency formatters
│   ├── styles/                 # Global styles and SCSS modules
│   ├── types/                  # TypeScript type definitions
│   ├── i18n.ts                 # next-intl configuration
│   └── middleware.ts           # Next.js middleware
├── messages/                   # Translation files
│   ├── en.json                 # English translations
│   └── tr.json                 # Turkish translations
├── public/                     # Static assets
└── package.json
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔑 TMDB API Integration

This app uses the TMDB (The Movie Database) API v3 with Bearer token authentication. The following endpoints are used:

### Movie Endpoints
- `/movie/popular` - Get popular movies
- `/trending/movie/week` - Get trending movies
- `/movie/now_playing` - Get now playing movies
- `/movie/top_rated` - Get top rated movies
- `/movie/upcoming` - Get upcoming movies
- `/search/movie` - Search movies
- `/movie/{id}` - Get movie details
- `/movie/{id}/credits` - Get movie credits

### Person Endpoints
- `/person/{id}` - Get person details
- `/person/{id}/movie_credits` - Get person's movie credits

### Authentication
All API requests automatically include your Bearer token in the `Authorization` header:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Language Support
API calls dynamically include the `language` parameter based on the user's selected locale:
- English: `en-US`
- Turkish: `tr-TR`

## 🎨 Styling

- **TailwindCSS**: Utility-first CSS framework for rapid UI development
  - Dark mode support via `dark:` prefix
  - Responsive breakpoints (sm, md, lg, xl)
  - Custom color palette with primary colors
- **SCSS Modules**: Component-scoped styles for complex styling needs
  - Movie card uniform heights
  - Custom animations and transitions

## 📝 Code Quality

- TypeScript strict mode enabled
- ESLint configured for Next.js
- Clean, maintainable code structure
- Proper error handling and loading states
- Comprehensive fallback UI for missing API data
- Optimized performance with RTK Query caching
- Accessible UI components with proper ARIA labels

## 🤝 Contributing

This is a portfolio project. Feel free to fork and modify as needed.

## 📄 License

This project is open source and available under the MIT License.

## 🌐 Internationalization

The application supports multiple languages:
- **English (en)**: Default language
- **Turkish (tr)**: Full translation support

Language preference is stored in:
- `localStorage` (client-side persistence)
- Cookies (server-side detection)

The locale is managed without URL prefixes for a cleaner user experience.

## 🎨 Theme System

The application supports both light and dark themes:
- Theme preference is stored in `localStorage`
- System preference detection on first visit
- Smooth theme transitions
- Theme switcher in header (desktop) and hamburger menu (mobile)

## 📱 Responsive Design

- **Mobile-first approach**: Optimized for small screens
- **Hamburger menu**: Navigation menu for screens < 1024px
- **Flexible layouts**: Movie grids adapt to screen size
- **Touch-friendly**: Large tap targets and smooth scrolling
- **Uniform card heights**: Consistent movie card appearance

## 🚀 Performance Optimizations

- **RTK Query caching**: Reduces unnecessary API calls
- **Skeleton loaders**: Better perceived performance
- **Page transition loaders**: Smooth navigation experience
- **Image optimization**: Next.js Image component with proper sizing
- **Code splitting**: Automatic route-based code splitting

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [next-intl](https://next-intl-docs.vercel.app/) for internationalization
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling

---

**Note**: Make sure to never commit your `.env.local` file with your actual access token.


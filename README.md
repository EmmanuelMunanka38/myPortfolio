# Emmanuel Munanka Portfolio

A modern, responsive portfolio website built with Next.js 16, showcasing full-stack development capabilities with a clean green and white design.

## 🚀 Features

- **Modern Design**: Clean, responsive UI with green and white color scheme
- **Project Showcase**: Filterable portfolio with detailed project cards
- **Blog System**: Full-featured blog with markdown support
- **About Section**: Professional bio with experience timeline and skills
- **Admin Dashboard**: Content management for projects and blog posts
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **File-Based**: JSON-based content management (no database required)
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Animation**: Framer Motion for smooth interactions
- **Icons**: Lucide React Icons & React Icons
- **Markdown**: React Markdown with remark-gfm
- **Styling**: Tailwind CSS with custom design system

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── about/             # Professional about section
│   ├── admin/              # Content management dashboard
│   ├── blog/               # Blog listing and posts
│   ├── contacts/           # Contact form
│   ├── projects/           # Project showcase
│   └── skills/             # Skills display
├── Components/             # Reusable React components
│   ├── About/              # About section components
│   ├── Blog/               # Blog components
│   ├── Header/             # Navigation component
│   ├── Hero/               # Landing hero section
│   └── Projects/           # Project showcase components
├── data/                   # Content data (JSON files)
│   ├── projects.json       # Project portfolio data
│   ├── blog.json          # Blog posts data
│   └── about.json         # About page data
└── lib/                    # Utility functions
    ├── data.ts            # Data loading functions
    └── utils.ts           # Helper utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd myPortfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

The application will be available at `http://localhost:3000`.

## 📝 Content Management

### Adding New Projects

1. Navigate to `/admin` in your browser
2. Click "Add New Project" button
3. Fill in the project details:
   - Title and description
   - Technologies used
   - Live URL and GitHub link
   - Client information
   - Completion date
   - Featured status
4. Click "Save" to add the project

### Managing Blog Posts

1. Go to `/admin` and select the "Blog" tab
2. Add new blog posts with markdown content
3. Include tags, featured status, and cover images
4. Posts are automatically converted to static pages

## 🎨 Customization

### Colors

The portfolio uses a green and white color scheme throughout:
- Primary green: `emerald-600` (#059669)
- Backgrounds: White with green accents
- Consistent use across all components

### Adding New Content

Content is managed through JSON files in the `/data` directory:
- `projects.json` - Portfolio projects
- `blog.json` - Blog posts
- `about.json` - About page content

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop breakpoints
- Touch-friendly navigation
- Optimized images and performance

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The application builds to static files and can be deployed to any static hosting platform.

## 📊 Performance

- **Build Size**: Optimized with Next.js 16 features
- **Images**: Next.js Image optimization
- **Code Splitting**: Automatic route-based splitting
- **SEO**: Meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js 16 and modern web technologies.

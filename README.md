# AI Resume Builder

A production-ready, frontend-only AI Resume Builder built with React, JavaScript, and Tailwind CSS. Create professional, ATS-friendly resumes with AI-powered enhancements, multiple templates, and PDF export.

## Features

### Core Features
- **User Resume Form**: Complete form with personal info, skills, experience, education, and projects
- **AI Resume Enhancement**: Mock AI that improves summary, optimizes skills for ATS, and enhances experience descriptions
- **Live Resume Preview**: Real-time preview that updates as you type
- **Resume Templates**: 3 modern, professional templates
  - Modern Minimal: Clean single-column layout
  - Two-Column Classic: Traditional format with sidebar
  - Creative Modern: Bold header with card-based sections
- **Export & Download**: Download resume as PDF with one click
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop

### Bonus Features
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Resume Completion Progress Bar**: Visual indicator of completion percentage
- **Character Counter**: For summary and description fields
- **LocalStorage Auto-Save**: Automatic saving and restoration of resume data

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Or connect your Git repository for automatic deployments

## Project Structure

```
ai-resume-builder/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── landing/          # Landing page
│   │   ├── form/              # Form components
│   │   ├── preview/           # Preview component
│   │   ├── templates/         # Resume templates
│   │   ├── common/            # Shared components
│   │   └── layout/            # Layout components
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── App.js                 # Main app component
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Usage

1. **Start Building**: Click "Start Building" on the landing page
2. **Fill Your Information**: Complete all form sections
3. **Enhance with AI**: Use the AI enhancement buttons to improve your content
4. **Choose Template**: Select from 3 professional templates
5. **Preview**: See your resume update in real-time
6. **Export**: Download your resume as PDF

## AI Enhancement

The AI enhancement feature uses mock functions that simulate AI-powered improvements:

- **Summary Enhancement**: Improves professional wording and structure
- **Experience Enhancement**: Converts descriptions to professional bullet points
- **Skills Optimization**: Optimizes skills for ATS (Applicant Tracking System) compatibility

The structure is API-ready - simply replace the mock functions in `src/utils/aiEnhancement.js` with actual API calls.

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette.

### Templates
Modify templates in `src/components/templates/` to create custom designs.

### Styling
All styles use Tailwind CSS utility classes. Custom styles can be added in `src/index.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for portfolio use.

## Credits

Built as a portfolio project demonstrating modern React development, clean code architecture, and professional UI/UX design.




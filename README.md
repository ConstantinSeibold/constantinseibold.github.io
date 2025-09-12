# Constantin Seibold - Personal Website

A modern, professional personal website built for GitHub Pages with a JSON-driven content management system.

## Architecture

This website uses a clean separation between content and presentation:
- **Content**: All content is stored in JSON files in the `content/` directory
- **Templates**: HTML files serve as pure templates that dynamically load content
- **Styling**: Modern CSS with CSS custom properties for consistent theming
- **JavaScript**: Dynamic content loading and interactive features

## Content Structure

All content files are located in the `content/` directory. Each page has a corresponding JSON file that defines its content structure.

### Main Content Files

#### `content/about.json`
Defines the about page content including career timeline, awards, and grants.

```json
{
  "page_info": {
    "title": "About Dr. Constantin Seibold"
  },
  "career_timeline": {
    "entries": [
      {
        "position": "Position Title",
        "grade": "Optional Grade/Level",
        "organization": "Organization Name",
        "period": "Time Period",
        "description": "Optional description",
        "dissertation": {
          "title": "Dissertation Title",
          "advisors": ["Advisor 1", "Advisor 2"],
          "link": "URL to thesis",
          "award": "Award received"
        },
        "link": "Optional learn more link"
      }
    ]
  },
  "awards": {
    "entries": [
      {
        "title": "Award Title",
        "organization": "Awarding Organization",
        "year": "Year"
      }
    ]
  },
  "grants": {
    "entries": [
      {
        "title": "Grant Title",
        "grant_id": "Grant ID/Number",
        "project_name": "Project Name",
        "description": "Project description"
      }
    ]
  }
}
```

#### `content/index.json`
Defines the homepage content including hero section, navigation slides, and featured work.

```json
{
  "hero": {
    "title": "Dr. Constantin Seibold",
    "subtitle": "Machine Learning Researcher & Computer Vision Expert",
    "description": "Brief description of expertise and focus areas",
    "cta": {
      "text": "Explore My Research",
      "link": "research.html"
    }
  },
  "navigation_slides": [
    {
      "title": "Section Title",
      "description": "Section description",
      "link": "target-page.html",
      "icon": "font-awesome-icon-class",
      "background_image": "path/to/background-image.jpg"
    }
  ],
  "news": [
    {
      "date": "YYYY-MM-DD",
      "title": "News headline",
      "description": "News description",
      "link": "Optional external link",
      "type": "news|publication|award|presentation"
    }
  ],
  "featured_work": [
    {
      "title": "Project/Paper Title",
      "description": "Brief description",
      "image": "path/to/image.jpg",
      "links": {
        "paper": "URL to paper",
        "code": "URL to code",
        "demo": "URL to demo"
      },
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

#### `content/teaching.json`
Defines teaching experience, courses, and student supervision data.

```json
{
  "page_info": {
    "title": "Teaching & Supervision"
  },
  "teaching_experience": [
    {
      "position": "Teaching Position",
      "organization": "Institution",
      "period": "Time Period",
      "courses": ["Course 1", "Course 2"],
      "description": "Optional description"
    }
  ],
  "courses": [
    {
      "title": "Course Title",
      "code": "Course Code",
      "level": "undergraduate|graduate",
      "semester": "Semester/Year",
      "description": "Course description",
      "materials": {
        "slides": "URL to slides",
        "exercises": "URL to exercises"
      }
    }
  ],
  "supervision": {
    "phd_students": [
      {
        "name": "Student Name",
        "topic": "Research Topic",
        "status": "current|graduated",
        "year": "Start Year",
        "thesis_title": "Optional thesis title if graduated"
      }
    ],
    "master_students": [
      {
        "name": "Student Name",
        "thesis_title": "Thesis Title",
        "year": "Year",
        "status": "current|completed"
      }
    ]
  }
}
```

#### `content/paxray.json`
Defines project-specific content for special pages like PAXRay.

```json
{
  "project": {
    "title": "Project Title",
    "subtitle": "Project Subtitle",
    "description": "Detailed project description",
    "hero_image": "path/to/hero-image.jpg",
    "links": {
      "paper": "URL to paper",
      "code": "URL to code repository",
      "demo": "URL to demo",
      "dataset": "URL to dataset"
    }
  },
  "features": [
    {
      "title": "Feature Title",
      "description": "Feature description",
      "icon": "font-awesome-icon-class"
    }
  ],
  "results": {
    "images": [
      {
        "src": "path/to/result-image.jpg",
        "caption": "Image caption",
        "alt": "Alt text"
      }
    ],
    "metrics": [
      {
        "name": "Metric Name",
        "value": "Metric Value",
        "description": "What this metric represents"
      }
    ]
  }
}
```

#### `content/publications.json`
Defines research publications with filtering capabilities.

```json
{
  "publications": [
    {
      "title": "Paper Title",
      "authors": ["Author 1", "Author 2", "Constantin Seibold"],
      "venue": "Publication Venue",
      "date": "YYYY",
      "abstract": "Paper abstract",
      "tags": ["tag1", "tag2"],
      "paperLink": "URL to paper",
      "arxivLink": "URL to arXiv",
      "codeLink": "URL to code",
      "dataLink": "URL to dataset",
      "award": "Optional award received"
    }
  ]
}
```

#### `content/datasets.json`
Defines dataset information with visual representations.

```json
{
  "datasets": [
    {
      "title": "Dataset Name",
      "short_description": "Brief description",
      "dataset_icon": "path/to/dataset-icon.jpg",
      "url": "URL to dataset page",
      "explore_url": "URL to exploration tool",
      "publications": ["URL1", "URL2"]
    }
  ]
}
```

#### `content/software.json`
Defines software projects and tools.

```json
{
  "software": [
    {
      "title": "Software Name",
      "short_description": "Brief description",
      "software_icon": "path/to/software-icon.jpg",
      "url": "URL to GitHub repository",
      "explore_url": "URL to demo/documentation",
      "publications": ["URL1", "URL2"]
    }
  ]
}
```

## Styling System

The website uses a modern CSS design system with CSS custom properties defined in `css/modern-styles.css`:

### Color Palette
- **Primary**: `#2563eb` (Professional blue)
- **Secondary**: `#64748b` (Neutral gray)
- **Success**: `#059669` (Green for positive actions)
- **Background**: `#ffffff` / `#f8fafc` (Clean whites/light grays)

### Typography
- **Font Family**: Inter (fallback to system fonts)
- **Responsive scaling**: Using clamp() for fluid typography

### Components
- Modern cards with subtle shadows and hover effects
- Professional buttons with consistent styling
- Responsive navigation with active states
- Publication links with hover animations

## JavaScript Architecture

Each page has dedicated JavaScript files for dynamic content loading:

- `js/about.js` - Loads about page content from `content/about.json`
- `js/publication.js` - Handles publication filtering and display
- `js/dataset_vis.js` - Creates dataset visualization cards
- `js/software_vis.js` - Displays software projects
- `js/scripts.js` - Core functionality and navigation

## Adding Content

### Adding a New Publication
1. Edit `content/publications.json`
2. Add new publication object with all required fields
3. The research page will automatically display the new publication

### Adding a News Item
1. Edit `content/index.json`
2. Add new item to the `news` array
3. Homepage will automatically display the update

### Adding a Dataset
1. Edit `content/datasets.json`
2. Add new dataset object with required fields
3. Add corresponding dataset icon image to `assets/img/datasets/`

### Adding Software Project
1. Edit `content/software.json`
2. Add new software object with required fields  
3. Add corresponding software icon to `assets/img/software/`

## Asset Organization

```
assets/
├── img/
│   ├── profile/          # Profile images
│   ├── datasets/         # Dataset thumbnails
│   ├── software/         # Software project icons
│   ├── projects/         # Project images
│   └── backgrounds/      # Background images
├── content/              # PDF files and documents
└── favicon/             # Favicon files
```

## Development

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. Edit JSON files in the `content/` directory to update content
4. Modify CSS in `css/modern-styles.css` for styling changes

### Deployment
The site is designed for GitHub Pages and will automatically deploy when pushed to the main branch.

## Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Font Awesome 6.0 for icons
- Bootstrap 5.2.3 for base functionality

## Performance Considerations
- All content is loaded dynamically via fetch API
- Images should be optimized for web (WebP preferred where supported)
- CSS uses efficient selectors and minimal specificity conflicts
- JavaScript uses modern ES6+ features for better performance
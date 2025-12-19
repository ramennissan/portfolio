# Assets Folder

This folder is for storing static assets used in your portfolio:

## Images
- `profile.jpg` - Your profile picture
- `project1.png`, `project2.jpg` - Project screenshots/thumbnails
- `logo.svg` - Personal logo or branding

## Usage
Import images in your React components like this:

```tsx
import profileImg from '../assets/profile.jpg'

// Then use in JSX:
<img src={profileImg} alt="Profile" />
```

## Tips
- Use `.jpg` for photos, `.png` for graphics with transparency
- Optimize images for web (compress before adding)
- Consider using descriptive filenames

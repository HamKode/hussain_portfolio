# Image Update Instructions

## How to Add Your Images

### 1. Image Folder Structure
```
My_Portfolio/
├── images/
│   ├── logo.png (Your logo)
│   ├── your-photo.jpg (Your profile photo)
│   ├── project1.jpg (Project screenshot 1)
│   ├── project2.jpg (Project screenshot 2)
│   └── project3.jpg (Project screenshot 3)
```

### 2. Required Images

**Logo (logo.png)**
- Size: 200x200px recommended
- Format: PNG (transparent background preferred)
- Used in: Navigation bar

**Profile Photo (your-photo.jpg)**
- Size: 400x400px recommended
- Format: JPG or PNG
- Shape: Will be displayed as circle
- Used in: About section

**Project Screenshots (project1.jpg, project2.jpg, project3.jpg)**
- Size: 600x400px recommended
- Format: JPG or PNG
- Used in: Projects section

### 3. How to Replace Images

1. **Save your images** in the `images/` folder
2. **Rename them** to match the filenames above, OR
3. **Update the HTML** file to use your custom filenames

### 4. Custom Filenames (Optional)

If you want to use different filenames, update these lines in `index.html`:

```html
<!-- Logo -->
<img src="images/YOUR_LOGO_NAME.png" alt="Logo" class="logo-image">

<!-- Profile Photo -->
<img src="images/YOUR_PHOTO_NAME.jpg" alt="Your Name" class="profile-image">

<!-- Project Images -->
<img src="images/YOUR_PROJECT1_NAME.jpg" alt="Project 1" class="project-img">
<img src="images/YOUR_PROJECT2_NAME.jpg" alt="Project 2" class="project-img">
<img src="images/YOUR_PROJECT3_NAME.jpg" alt="Project 3" class="project-img">
```

### 5. Image Optimization Tips

- **Compress images** before uploading (use tools like TinyPNG)
- **Use appropriate formats**: PNG for logos, JPG for photos
- **Keep file sizes under 500KB** for faster loading
- **Use descriptive alt text** for better SEO

### 6. Fallback System

If an image fails to load, the website will automatically show:
- Logo: Text "AJ" instead of logo image
- Profile: Icon placeholder instead of photo
- Projects: Gradient background instead of screenshot

This ensures your website always looks professional even if images are missing.
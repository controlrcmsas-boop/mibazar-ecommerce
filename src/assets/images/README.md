# Project Images

This directory is for all images used in the MiBazar project.

## Structure

- `/public/images`: Use this for images that should be accessible via a direct URL (e.g., product images stored locally, or external links).
- `/src/assets/images`: Use this for images that are part of the application's source code and should be bundled by Vite (e.g., logos, icons, hero sections).

## Usage

### src/assets/images
```javascript
import logo from '../assets/images/logo.png';
```

### public/images
```javascript
<img src="/images/product-1.jpg" alt="Product" />
```

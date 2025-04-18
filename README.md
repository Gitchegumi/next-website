<div align="center">

# Next.js Static Site Scaffold

<img src="https://api.dicebear.com/9.x/icons/svg?seed=Midnight&backgroundColor[]&icon=lightbulb" height="100" alt="Demo icon"/>

**Live Demo:** [View Static Site](https://gitchegumi.github.io/next-website/)

</div>

---

## 🌟 Overview

This project is a fully static website built using **Next.js** with the App Router, configured for deployment to **GitHub Pages**. It serves as a technical demonstration of how I structure, build, and deploy modern static sites using the Next.js framework.

Originally created as the scaffolding for a government site (currently being transitioned to Adobe AEM), this version has been stripped of any proprietary content and refocused as a template for portfolio and professional use cases.

---

## 🛠️ Key Features

- **Next.js App Router** with TypeScript
- **Static export (`output: 'export'`)** for lightweight hosting (e.g., GitHub Pages)
- **Tailwind CSS** for utility-first styling
- **Modular layout and content architecture**
- **Custom components** for markdown rendering, PDF embedding, testimonials, and more
- **Markdown + JSON content** for flexibility and CMS-like behavior without a backend
- **Optimized static assets** including custom fonts, images, and PDFs

---

## 📁 Project Structure

The project is organized around clean separation of concerns:

- `app/`: Page routing and layout logic using Next.js App Router
- `components/`: Shared UI components and utilities
- `public/`: Fonts, images, and downloadable assets
- `content/`: Markdown and JSON content for pages
- `lib/` and `utils/`: Helper functions for rendering and data management

---

## 🚀 Get Started Locally

```bash
git clone https://github.com/Gitchegumi/next-website.git
cd next-website
npm install
npm run dev
```

To build and export the site:

```bash
npm run build
```

To preview the static output locally:

```bash
npx serve out
```

---

## 🌍 Deployment

The site is deployed to GitHub Pages using a GitHub Actions workflow. Static export (`next export`) is configured in `next.config.mjs`, including a `basePath` and `assetPrefix` to match the deployed path.

This structure can easily be repurposed for deployment on platforms like Netlify, Vercel, or AWS S3.

---

## 💡 Use Case

If you're evaluating alternatives to WordPress or need a clean, fast, and portable front-end scaffold for marketing pages, documentation sites, or campaign microsites — this setup is a strong starting point.

While the original content is being migrated to a CMS platform (AEM), this repo remains a clean example of what’s possible with **Next.js as a static site generator**.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).



# Cassandra Miranda — Portfolio

Plain HTML/CSS/JS site. No build step, no framework — works as-is on GitHub Pages or Vercel.

## Files
```
index.html        → all the content/sections
style.css          → all the styling (colors, fonts, layout)
script.js          → mobile menu, gallery filters, footer year
assets/            → all images (posters and thumbnails) go here
```

## 1. Add your real images
In `index.html`, each gallery item looks like this:
```html
<img src="assets/c1.png" alt="Solo concert poster" ...>
```
Just drop your file into `assets/` using the matching filename (`c1.png`, `c2.png`,
`thumb-01.jpg`, etc.), or change the `src` path to whatever you name your file. Until a
real image is added, that card shows an "Add [filename]" placeholder automatically —
nothing breaks.

To add more gallery items, copy one `<figure class="card" data-cat="poster">...</figure>`
block and paste it, changing the image path, category (`poster` or `thumbnail`), and caption.

## 2. Push to GitHub
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
(Create the empty repo on GitHub first if you haven't — no README/license, just an empty repo — then run the commands above.)

## 3. Connect to Vercel
- Go to vercel.com → **Add New Project** → import the GitHub repo.
- Framework preset: **Other** (it's static HTML, no build command needed).
- Root directory: leave as `/` (or point to this `portfolio` folder if it's nested in a bigger repo).
- Click **Deploy**. Every future push to `main` auto-deploys.

## 4. After it's live
- Add your custom domain (if any) under Vercel → Project → Settings → Domains.
- To update content, just edit the files and `git push` — Vercel redeploys automatically.

## Notes
- Colors, fonts, and layout all live in `style.css` under the `:root` section at the top —
  change the hex values there to retheme the whole site at once.
- The Instagram and LinkedIn links open in a new tab; email opens the visitor's mail app.

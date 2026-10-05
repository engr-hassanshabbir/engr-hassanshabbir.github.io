# Hassan Shabbir — personal website

Planning & Contracts Engineer · Civil Engineer (PEC registered) · Based in Riyadh, Saudi Arabia · Open to Gulf & international roles
Live at **https://engr-hassanshabbir.github.io/**

A static website (plain HTML, CSS and JavaScript). No server, database, build step or paid service is needed. It runs on GitHub Pages for free, and also opens directly by double-clicking `index.html`.

---

## How to put this website live (no coding needed)

You only need a web browser and your GitHub login. It takes about 5 minutes.

1. **Unzip the download.** On Windows, right-click the ZIP file and choose **Extract All**. On a Mac, double-click it.
2. **Open your website's repository.** Go to **https://github.com/engr-hassanshabbir/engr-hassanshabbir.github.io** and sign in.
3. **Start an upload.** Click **Add file** (near the top right of the file list), then **Upload files**.
4. **Drag everything in.** Open the unzipped folder, select **everything inside it** (Ctrl + A on Windows, Cmd + A on Mac) — the files and the `logos`, `images` and `photos` folders — and drag it onto the GitHub page. Drag the contents, not the outer folder itself.
5. **Save.** Type `New website design` in the box, keep **Commit directly to the main branch** selected, and click the green **Commit changes** button.
6. **Wait 1–3 minutes**, then open **https://engr-hassanshabbir.github.io/**. If you still see the old design, press **Ctrl + F5** (Windows) or **Cmd + Shift + R** (Mac), or open the link in a private window.

You do not need to delete anything first — files with the same name are replaced automatically. Files from earlier versions that are no longer used can be deleted from GitHub, but leaving them does no harm: `portrait.webp`, `profile-cutout.webp`, `profile-card.webp`, and inside `images`: `islamabad-faisal.webp`, `punjab-ohr.webp`, `punjab-canal.webp`, `lahore-jilani-park.webp`, `uet-gate.webp`, `uet-civil-environmental.webp`, `uet-transportation.webp`, `uet-library.webp`, `riyadh-kafd.webp`.

---

## Everyday updates

**Replace your CV.** Name the new PDF exactly `Hassan_Shabbir_CV.pdf` and upload it the same way. Every "Download CV" button picks it up automatically.

**Change some text.** Open `index.html` on GitHub, click the pencil icon (Edit), press Ctrl + F to find the sentence, change it, then click **Commit changes**.

**Add your PEC registration number.** Open `index.html`, search for `<p class="ccard__org">Pakistan Engineering Council</p>`, and add your number inside it (for example `Pakistan Engineering Council · Reg. No. CIVIL/12345`).

**Company logos.** All logos are inside the `logos` folder: FirstFix KSA, SaudConsult, Asian Consulting Engineers, JERS Consultancy and Imarat Builders, plus the World Bank, SFD, Diriyah, UET Taxila, PEC, FIDIC, LDA and the software logos. To swap one for a better version, upload a file with exactly the same name (the list is in `logos/README.txt`).

**Use your own project photos.** Naval Anchorage Karachi and DHA Bahawalpur show the developers' own published photos of their main gates (labelled "Project photo"). The other project cards show a licensed photo labelled "Area photo" (the place, for example Diriyah or Karachi) or "Representative photo" (the type of work, for example a water treatment plant). To show a real photo of your project instead, upload a JPG into the `photos` folder with the same name as the placeholder already there (for example `six-senses.jpg` or `naval-anchorage.jpg`; the full list is in `photos/README.txt`). The label changes to "Project photo" automatically. Only use photos you are allowed to share — giga-project and defence sites often restrict photography.

---

## What each file does

| File / folder | Purpose |
|---|---|
| `index.html` | All page content, plus SEO and social-sharing information |
| `style.css` | Visual design, layout and animation |
| `script.js` | Interactions: menu, Primavera-style career schedule, project pop-ups, counters, copy buttons |
| `logos/` | Company, funder, credential and software logos |
| `images/` | Licensed area and representative photographs used on the project cards |
| `photos/` | Optional: your own project photos (names in `photos/README.txt`) |
| `profile-photo.jpg` | Your photo |
| `favicon.svg`, `apple-touch-icon.png` | "HS" monogram for browser tabs and phone home screens |
| `og-image.jpg` | Preview image when the link is shared on LinkedIn, WhatsApp, X, etc. |
| `Hassan_Shabbir_CV.pdf` | The CV downloaded by every "Download CV" button |
| `hassan-shabbir.vcf` | "Save contact to phone" card for recruiters |
| `archivo.woff2`, `archivo-license.txt` | The website's typeface and its free open licence |
| `robots.txt`, `sitemap.xml` | Help Google find and index the site |

---

## Notes

- **Facts.** Professional details come from your CV. Facts about universities, companies and projects (for example UET Taxila's founding and QS ranking, FirstFix's Class 1 status, SaudConsult's founding in 1965, SFD's funding of the hospital) come from those organisations' own websites or reputable sources.
- **Logos and photos.** Logos belong to their owners and are shown only to identify organisations in your work history. The Naval Anchorage and DHA Bahawalpur photos are the developers' own published images; the other project photos come from Wikimedia Commons under free licences. Credits are listed in the website footer ("Photo & logo credits").
- **Naval Anchorage Karachi and DHA Bahawalpur** are not in the CV PDF; their details on the site (Asian Consulting Engineers; planning & contracts, coordination and project management on infrastructure design assignments) come from you. Consider adding them to your CV too.
- **No fake functionality.** Contact buttons use your real WhatsApp, phone, email, LinkedIn and CV.
- **Self-updating.** The "data date" in the career schedule and the footer revision date move to today's date automatically.
- **Custom domain later?** Replace `https://engr-hassanshabbir.github.io/` with the new address in `index.html`, `robots.txt` and `sitemap.xml`.

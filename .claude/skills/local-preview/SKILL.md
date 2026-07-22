---
name: local-preview
description: Spin up a local HTTP server so a static website (HTML/CSS/JS) is viewable at http://localhost. Use PROACTIVELY whenever you build, scaffold, or finish a static site/landing page/prototype in a folder, or when the user wants to see/preview/open the site locally, run it in a browser, or "check how it looks". Triggers include "preview", "serve", "run locally", "open in browser", "локальний перегляд", "запусти сайт", "покажи в браузері", "хочу подивитись". Do NOT use for framework dev servers (Next/Vite/CRA) — those have their own; this is for plain static files.
---

# Local Preview — auto-serve a static site

Goal: after building or when asked to preview a **static** site (plain `.html/.css/.js`), immediately start a zero-dependency local HTTP server and hand the user a `http://localhost:<port>` URL. Serving over HTTP (not `file://`) makes inter-page links, `fetch`, media, and MIME types all work correctly.

## Steps

1. **Pick the folder** that contains `index.html` (the project root the user is working in).

2. **Ensure a server file exists.** Write `server.js` into that folder (zero deps, correct MIME + no-cache) unless one already exists:

   ```js
   // Minimal zero-dependency static server
   const http = require('http'), fs = require('fs'), path = require('path');
   const ROOT = path.resolve(process.argv[2] || '.');
   const PORT = parseInt(process.argv[3] || '8080', 10);
   const MIME = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
     '.js':'text/javascript; charset=utf-8', '.json':'application/json', '.svg':'image/svg+xml',
     '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif',
     '.ico':'image/x-icon', '.mp4':'video/mp4', '.webp':'image/webp', '.woff2':'font/woff2', '.woff':'font/woff' };
   http.createServer((req, res) => {
     let p = decodeURIComponent(req.url.split('?')[0]);
     if (p === '/') p = '/index.html';
     const fp = path.join(ROOT, p);
     if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
     fs.readFile(fp, (e, d) => {
       if (e) { res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
         return res.end('<h1>404</h1><p>Not found: ' + p + '</p>'); }
       res.writeHead(200, { 'Content-Type': MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream',
         'Cache-Control': 'no-cache' });
       res.end(d);
     });
   }).listen(PORT, () => console.log('serving ' + ROOT + ' at http://localhost:' + PORT));
   ```

3. **Locate Node.js** (it is often NOT on PATH in a fresh shell). Try in order and use the first that exists:
   - `command -v node` (bash) / `(Get-Command node).Source` (PowerShell)
   - Windows winget install: `ls /c/Users/*/AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS*/node*/node.exe`
   - `C:\Program Files\nodejs\node.exe`, nvm dirs
   - If Node is genuinely absent: offer `winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements --scope user`, then re-detect (PATH change needs a fresh shell — call node by full path meanwhile). As a last resort a real Python (`py`/`python`, not the Windows Store stub) can run `python -m http.server <port>`.

4. **Start it in the background** (use the Bash/PowerShell tool with `run_in_background: true`) on port 8080, falling back to 8081/3000 if busy:
   ```bash
   NODE="<detected node path>"
   "$NODE" "<folder>/server.js" "<folder>" 8080
   ```

5. **Verify** before reporting success:
   ```bash
   curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/
   ```
   Expect `200`. If `000`, the server did not bind — check the background task's output file, try another port.

6. **Report** the URL plainly, e.g. `http://localhost:8080`, and list the reachable pages. Tell the user to hard-refresh (Ctrl+F5) after edits — the server serves fresh files, but browsers cache.

## Notes & gotchas
- The server is a **background process**: it dies when the Claude Code session/process ends. If the user later says localhost is down, that is expected — use the **[[localhost-up]]** skill to restart it.
- Do not fight the built-in preview pane for `file://` — a real HTTP server is more reliable and is what the user actually opens.
- Never commit `server.js` unless asked; it's a local convenience. Mention it was added.

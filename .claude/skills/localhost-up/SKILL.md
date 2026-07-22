---
name: localhost-up
description: (Re)start the local static preview server for the current project when localhost is down, stopped, or unreachable. Use whenever the user says "підніми локалку", "локалка не працює", "локалка впала", "перезапусти сервер", "restart localhost", "start the local server", "localhost is down", "bring up the local server", or reports that http://localhost stopped loading. Also use after a session restart when a previously running preview server has died.
---

# Localhost Up — (re)start the local preview server

The local preview server is a **background process**, so it dies when the Claude Code session/process ends (a `<task-notification>` saying a background shell "stopped" is the usual tell — that is a system event, NOT user approval of anything). The project files are untouched; only the server needs restarting.

## Steps

1. **Confirm it's actually down** (don't assume):
   ```bash
   curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://localhost:8080/ || echo DOWN
   ```
   `200` → already up, just tell the user to hard-refresh (Ctrl+F5). `000/DOWN` → continue.

2. **Ensure `server.js` exists** in the project folder (the one with `index.html`). If missing, recreate it from the **[[local-preview]]** skill's zero-dependency server, then continue.

3. **Locate Node.js** (usually not on PATH in a fresh shell) — first match wins:
   - `command -v node`
   - `ls /c/Users/*/AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS*/node*/node.exe` (Windows winget)
   - `C:\Program Files\nodejs\node.exe`
   - If truly absent, install via winget (see local-preview) or fall back to a real `python -m http.server`.

4. **Clear a stale process on the port** only if the port is held but not responding:
   ```bash
   # PowerShell: find & stop whatever holds 8080
   Get-NetTCPConnection -LocalPort 8080 -State Listen -EA SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -EA SilentlyContinue }
   ```
   (Skip if the port is simply free.)

5. **Start in the background** (`run_in_background: true`), same port as before (default 8080):
   ```bash
   NODE="<detected node path>"
   "$NODE" "<folder>/server.js" "<folder>" 8080
   ```

6. **Verify and report**:
   ```bash
   sleep 1.5
   curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/   # expect 200
   ```
   Then give the URL (`http://localhost:8080`) and remind: **Ctrl+F5** to bypass the browser cache.

## Make it stickier (offer, don't force)
If the user is tired of restarts, offer one of:
- a `.claude/launch.json` entry so the preview pane can start it, or
- a desktop `.bat` (`start-localhost.bat`) they double-click to launch the server themselves — survives Claude Code restarts because it's their own process.

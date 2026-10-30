# Haunted Thales Academy - Mac Terminal and Offline iPad Setup

## Step 1: Retrieve the app without ChatGPT downloads
In Terminal on your Mac, run:

```bash
cd "$HOME/Projects" || exit 1
gh auth status || gh auth login
gh repo clone owenreagan-cyber/grade-4-energy-hub haunted-thales-offline-transfer -- --branch haunted-thales-v4-offline-transfer --single-branch
cd "$HOME/Projects/haunted-thales-offline-transfer/haunted-thales-v4-offline-transfer/web" || exit 1
```

If you have already cloned it, use `cd "$HOME/Projects/haunted-thales-offline-transfer"` then `git pull --ff-only` instead of cloning again.
The files live on a separate transfer branch in an existing PRIVATE repository. The repository main branch is unaffected.

## Step 2: Start a local setup server
Run in Terminal tab 1:

```bash
cd "$HOME/Projects/haunted-thales-offline-transfer/haunted-thales-v4-offline-transfer/web" || exit 1
caffeinate -i python3 -m http.server 8765 --bind 127.0.0.1
```

Keep tab 1 open while installing. This server is local to the Mac.

## Step 3: Create a temporary HTTPS address
Use Terminal tab 2:

```bash
brew install cloudflared qrencode
cloudflared tunnel --url http://127.0.0.1:8765
```

The cloudflared command displays a temporary HTTPS URL ending in `.trycloudflare.com`.
This URL is a temporary publicly reachable access path. Do not use it for confidential teacher files.
It changes each time you run a new quick tunnel. Do not stop the tunnel until installation is confirmed on every iPad.
If Cloudflare is blocked by the school network, use an approved HTTPS hosting service instead.

## Step 4: Generate the exact QR image
In Terminal tab 3, replace the URL below with the actual HTTPS address printed by cloudflared:

```bash
URL="https://REPLACE-WITH-YOUR-ACTUAL-TUNNEL.trycloudflare.com/index.html"
cd "$HOME/Projects/haunted-thales-offline-transfer/haunted-thales-v4-offline-transfer" || exit 1
qrencode -o install-energy-elixir-qr.png -s 12 -m 3 "$URL"
echo "QR saved to: $PWD/install-energy-elixir-qr.png"
```

Use the QR only for teacher-supervised installation; it points to a temporary web tunnel.
A made-up QR address will not work. QR codes cannot make an app offline by themselves.

## Step 5: Install each iPad while online
1. Connect each iPad to Wi-Fi, scan QR with Camera, and open the URL in Safari.
2. Wait for the entire game screen to appear. The app should register its service worker, caching all its assets.
3. Share > Add to Home Screen > Open as Web App > Add.
4. Launch FROM THE NEW HOME SCREEN ICON. Assign Ravens, Bats, Owls, Foxes to the four iPads using the teacher PIN from your existing private teacher key.
5. Reopen the Home Screen app once while still online.
6. Enable Airplane Mode and make sure Wi-Fi is off; close and relaunch the Home Screen app.
7. Verify the assigned team survives, keypad works and unlocked clues survive a relaunch. Also verify the 30-second wrong-code lockout.
8. Only once all four iPads pass, stop the tunnel and local server.

IMPORTANT: The isolated browser here blocks localhost navigation, so actual Safari service-worker caching and offline storage ARE NOT YET CERTIFIED. Do not claim all systems go without the device tests.
The app's teacher PIN and lock answers are readable by someone inspecting public web-source code. The PIN is a classroom checkpoint, not a security boundary.

## Day-of-class
Open the installed Home Screen app. No QR, internet, school Wi-Fi or Mac required after successful offline tests. Use physical printed packets for problems and suspect records. Do not distribute teacher key.

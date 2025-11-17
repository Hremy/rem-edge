# Environment Setup for Acerbis OEM EDS

Your system needs Node.js and the AEM CLI to run the local dev server.

---

## Step 1: Install Node.js

### Option A: Using Homebrew (Recommended)

```bash
# Install Homebrew first (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

### Option B: Direct Download

1. Visit: https://nodejs.org/
2. Download LTS version (18.x or 20.x)
3. Run installer
4. Verify:
   ```bash
   node --version
   npm --version
   ```

---

## Step 2: Install AEM CLI

```bash
npm install -g @adobe/aem-cli
```

Verify:
```bash
aem --version
```

---

## Step 3: Start Local Dev Server

```bash
cd "/Users/Remy/WORKSPACE/CodeLand Projects/EDGE/rem-edge"
aem up
```

You should see:
```
✓ Listening on http://localhost:3000
```

---

## Step 4: Create Google Docs

While `aem up` is running:

1. **Open Google Drive**: https://drive.google.com/drive/folders/1KcRM48-YYJall7YnzW_Qg66PPLWQLAns
2. **Follow `CREATE_DOCS_MANUAL.md`** to create:
   - `nav` doc
   - `footer` doc
   - `index` doc (homepage)
3. **Share** each with helix@adobe.com (Editor)
4. **Publish** via Sidekick

---

## Step 5: Test Homepage

1. **Visit**: http://localhost:3000/
2. **You should see**: Homepage with all Phase 1 blocks
3. **Check**: Navigation, footer, hero, cards, columns

---

## Troubleshooting

### "aem up" not found
```bash
# Reinstall AEM CLI
npm uninstall -g @adobe/aem-cli
npm install -g @adobe/aem-cli
```

### Port 3000 already in use
```bash
# Use different port
aem up --port 3001
# Visit: http://localhost:3001/
```

### Changes not reflecting
```bash
# Hard refresh browser
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows/Linux)
```

### Google Docs not showing
1. Verify docs are published via Sidekick
2. Check fstab.yaml has correct folder ID
3. Verify helix@adobe.com has Editor access
4. Wait 30 seconds for cache to clear

---

## Next Commands

Once everything is running:

```bash
# Stop server
Ctrl+C

# Start again
aem up

# View logs
aem up --verbose
```

---

## Ready?

1. Install Node.js
2. Install AEM CLI: `npm install -g @adobe/aem-cli`
3. Run: `aem up`
4. Create Google Docs
5. Visit: http://localhost:3000/

Let me know when you're ready!

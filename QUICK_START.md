# Quick Start: Create Sample Documents (5 minutes)

## Three Documents to Create

### 1️⃣ NAV Document

**Create**: New Google Doc named `nav`

**Paste this**:
```
Acerbis
Chi siamo
R&D e Qualità
Sostenibilità

Settori
Motorcycle
Agricoltura
Movimento terra
Material handling
Altri settori

Tecnologie
Stampaggio rotazionale
Stampaggio a iniezione

Engineering
Project Management
Engineering Capability

Lavora con noi
Contatti
Mondo Acerbis
```

**Format**: Bullet list, indent sub-items with Tab  
**Share**: helix@adobe.com (Editor)  
**Publish**: Via Sidekick

---

### 2️⃣ FOOTER Document

**Create**: New Google Doc named `footer`

**Paste this**:
```
Acerbis
Chi siamo
R&D e Qualità
Sostenibilità

Settori
Motorcycle
Agricoltura
Movimento terra
Material handling
Altri settori

Tecnologie
Stampaggio rotazionale
Stampaggio a iniezione

Engineering
Project Management
Engineering Capability

© 2024 ACERBIS ITALIA SPA
Società soggetta all'attività di direzione e coordinamento di Yellow Holding S.r.l.
P.IVA 00862020161

Privacy & Cookie Policy
Contatti
Lavora con noi
```

**Format**: Bullet list (same as nav), copyright as regular text  
**Share**: helix@adobe.com (Editor)  
**Publish**: Via Sidekick

---

### 3️⃣ INDEX Document (Homepage)

**Create**: New Google Doc named `index`

**Add these blocks** (see `SAMPLE_DOCUMENTS_SETUP.md` for full content):

1. **HERO** (2-row table)
   - Row 1: Background image
   - Row 2: Title + text + video link

2. **COLUMNS** (1-row, 2-column table)
   - Company image + description

3. **CARDS** (2-row, 2-column table) - Add class: `two-column`
   - Rotomolding card
   - Injection Molding card

4. **CARDS** (5-row, 2-column table) - Add class: `five-column`
   - Motorcycle, Agriculture, Earthmoving, Material Handling, Other

5. **CARDS** (3-row, 2-column table) - Add class: `three-column`
   - Project Management, Engineering, Quality Control

6. **COLUMNS** (1-row, 2-column table)
   - PA6 material image + description

7. **METADATA** (at end)
   - Title, Description

**Share**: helix@adobe.com (Editor)  
**Publish**: Via Sidekick

---

## How to Add Block Classes

After creating a table in Google Docs:

1. Click on the table
2. Open Sidekick (Chrome extension)
3. Look for "Block" section
4. Add class name (e.g., `two-column`, `five-column`, `three-column`)
5. Save

---

## Test It

```bash
# Terminal
aem up

# Browser
http://localhost:3000/
```

---

## See Full Details

Open: `SAMPLE_DOCUMENTS_SETUP.md` in this repo

---

## Done? ✅

Once all three docs are created, shared, and published:

1. Run `aem up`
2. Visit http://localhost:3000/
3. See your homepage with all Phase 1 blocks!

Then we can move to **Phase 2** (content infrastructure, query-index, redirects).

#!/usr/bin/env python3
"""Generate a nav-bullets.docx file with the correct Acerbis navigation structure.

Usage (from rem-edge folder):

    python3 create-nav-bullets-docx.py

Then upload nav-bullets.docx to Google Drive and convert it to a Google Doc.
"""

from docx import Document

NAV_ITEMS = [
    ("Acerbis", 0),
    ("Chi siamo", 1),
    ("R&D e Qualità", 1),
    ("Sostenibilità", 1),
    ("Settori", 0),
    ("Motorcycle", 1),
    ("Agricoltura", 1),
    ("Movimento terra", 1),
    ("Material handling", 1),
    ("Altri settori", 1),
    ("Tecnologie", 0),
    ("Stampaggio rotazionale", 1),
    ("Stampaggio a iniezione", 1),
    ("Engineering", 0),
    ("Project Management", 1),
    ("Engineering Capability", 1),
    ("Lavora con noi", 0),
    ("Contatti", 0),
    ("Mondo Acerbis", 0),
]


def build_nav_doc() -> Document:
    doc = Document()

    for i, (text, indent) in enumerate(NAV_ITEMS):
        # Always create a new paragraph for each item
        p = doc.add_paragraph()
        p.text = text
        # Use built-in bullet list styles; Google Docs preserves these as bullets.
        if indent == 0:
            p.style = "List Bullet"
        else:
            p.style = "List Bullet 2"  # visually indented / child item
    return doc


def main() -> None:
    doc = build_nav_doc()
    out_name = "nav-bullets.docx"
    doc.save(out_name)
    print(f"✅ Created {out_name} in current folder.")
    print("\nNext steps:")
    print("1. In Google Drive, upload nav-bullets.docx to your EDGE-ACADEMY folder.")
    print("2. In Drive, right-click nav-bullets.docx → Open with → Google Docs (this converts it).")
    print("3. In the new Google Doc, rename it to exactly: nav")
    print("4. Delete or ignore the old nav doc if it still exists.")
    print("5. Share with helix@adobe.com (Editor) if needed.")
    print("6. Sidekick → Preview → Publish.")
    print("7. Refresh http://localhost:3000/ and https://main--rem-edge--hremy.aem.page/.")


if __name__ == "__main__":
    main()

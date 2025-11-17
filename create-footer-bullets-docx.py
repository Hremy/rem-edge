#!/usr/bin/env python3
"""Generate a footer-bullets.docx file with the correct Acerbis footer structure.

Usage (from rem-edge folder):

    python3 create-footer-bullets-docx.py

Then upload footer-bullets.docx to Google Drive and convert it to a Google Doc.
"""

from docx import Document

FOOTER_ITEMS = [
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
    ("© 2024 ACERBIS ITALIA SPA", 0),
    ("Società soggetta all'attività di direzione e coordinamento di Yellow Holding S.r.l.", 1),
    ("P.IVA 00862020161", 1),
    ("Privacy & Cookie Policy", 1),
    ("Contatti", 1),
    ("Lavora con noi", 1),
]


def build_footer_doc() -> Document:
    doc = Document()

    for text, indent in FOOTER_ITEMS:
        p = doc.add_paragraph()
        p.text = text
        if indent == 0:
            p.style = "List Bullet"
        else:
            p.style = "List Bullet 2"
    return doc


def main() -> None:
    doc = build_footer_doc()
    out_name = "footer-bullets.docx"
    doc.save(out_name)
    print(f"✅ Created {out_name} in current folder.")
    print("\nNext steps:")
    print("1. In Google Drive, upload footer-bullets.docx to your EDGE-ACADEMY folder.")
    print("2. In Drive, right-click footer-bullets.docx → Open with → Google Docs (this converts it).")
    print("3. In the new Google Doc, rename it to exactly: footer")
    print("4. Delete or ignore the old footer doc if it still exists.")
    print("5. Share with helix@adobe.com (Editor) if needed.")
    print("6. Sidekick → Preview → Publish.")
    print("7. Refresh http://localhost:3000/ and https://main--rem-edge--hremy.aem.page/.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Create sample Google Docs for Acerbis OEM EDS project.
Requires: Google Drive API credentials

Setup:
1. Install: pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client
2. Get credentials: https://developers.google.com/docs/api/quickstart/python
3. Place credentials.json in this directory
4. Run: python3 create-google-docs.py
"""

from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from google.colab import auth
import googleapiclient.discovery
import os

# Try to authenticate
try:
    auth.authenticate_user()
    drive_service = googleapiclient.discovery.build('drive', 'v3')
    docs_service = googleapiclient.discovery.build('docs', 'v1')
except Exception as e:
    print(f"Authentication failed: {e}")
    print("\nTo set up authentication:")
    print("1. Visit: https://developers.google.com/docs/api/quickstart/python")
    print("2. Click 'Enable the Google Docs API'")
    print("3. Download credentials.json")
    print("4. Place it in this directory")
    print("5. Run this script again")
    exit(1)

# Get your Google Drive folder ID
FOLDER_ID = "1KcRM48-YYJall7YnzW_Qg66PPLWQLAns"  # Replace with your folder ID

def create_doc(title, content):
    """Create a Google Doc with the given title and content."""
    try:
        # Create document
        doc = {
            'title': title
        }
        doc = docs_service.documents().create(body=doc).execute()
        doc_id = doc.get('documentId')
        print(f"✅ Created document: {title} (ID: {doc_id})")
        
        # Add content
        requests = [
            {
                'insertText': {
                    'text': content
                }
            }
        ]
        docs_service.documents().batchUpdate(
            documentId=doc_id,
            body={'requests': requests}
        ).execute()
        print(f"✅ Added content to: {title}")
        
        # Move to folder
        drive_service.files().update(
            fileId=doc_id,
            addParents=FOLDER_ID,
            fields='id, parents'
        ).execute()
        print(f"✅ Moved to folder: {title}")
        
        # Share with helix@adobe.com
        drive_service.permissions().create(
            fileId=doc_id,
            body={
                'type': 'user',
                'role': 'editor',
                'emailAddress': 'helix@adobe.com'
            }
        ).execute()
        print(f"✅ Shared with helix@adobe.com: {title}")
        
        return doc_id
    except Exception as e:
        print(f"❌ Error creating {title}: {e}")
        return None

# Read content files
nav_content = open('docs-content/nav-content.txt', 'r').read()
footer_content = open('docs-content/footer-content.txt', 'r').read()

# Create documents
print("\n🚀 Creating sample Google Docs...\n")
nav_id = create_doc('nav', nav_content)
print()
footer_id = create_doc('footer', footer_content)

print("\n✅ Done! Documents created and shared.\n")
print(f"Nav doc ID: {nav_id}")
print(f"Footer doc ID: {footer_id}")
print("\nNext: Create 'index' doc manually with block tables")

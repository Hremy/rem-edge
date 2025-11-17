#!/usr/bin/env python3
"""
Create nav and footer Google Docs directly using Google Drive API.
Requires: pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client
"""

import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# Google Drive folder ID
FOLDER_ID = '1KcRM48-YYJall7YnzW_Qg66PPLWQLAns'

# Scopes
SCOPES = ['https://www.googleapis.com/auth/drive']

def get_credentials():
    """Get or refresh Google credentials."""
    creds = None
    
    # Load existing token
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    # Refresh or create new credentials
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            # You need to create credentials.json from Google Cloud Console
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save token for next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    
    return creds

def create_google_doc(service, title, content_html):
    """Create a Google Doc with HTML content."""
    
    # Create document
    doc = {
        'title': title,
        'mimeType': 'application/vnd.google-apps.document',
        'parents': [FOLDER_ID]
    }
    
    file = service.files().create(body=doc, fields='id').execute()
    doc_id = file.get('id')
    print(f'✅ Created document: {title} (ID: {doc_id})')
    
    # Add content using Docs API
    docs_service = build('docs', 'v1', http=service._http)
    
    requests = [
        {
            'insertText': {
                'text': content_html,
                'location': {'index': 1}
            }
        }
    ]
    
    docs_service.documents().batchUpdate(
        documentId=doc_id,
        body={'requests': requests}
    ).execute()
    
    return doc_id

def main():
    """Main function."""
    print('🔐 Authenticating with Google Drive...')
    creds = get_credentials()
    service = build('drive', 'v3', credentials=creds)
    
    # NAV content
    nav_content = """Acerbis

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
Mondo Acerbis"""
    
    # FOOTER content
    footer_content = """Acerbis
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
Lavora con noi"""
    
    print('\n📝 Creating Google Docs...')
    
    # Create nav doc
    nav_id = create_google_doc(service, 'nav', nav_content)
    
    # Create footer doc
    footer_id = create_google_doc(service, 'footer', footer_content)
    
    print('\n✅ Done!')
    print(f'\nNav Doc: https://docs.google.com/document/d/{nav_id}/edit')
    print(f'Footer Doc: https://docs.google.com/document/d/{footer_id}/edit')
    print('\nNext steps:')
    print('1. Open each doc')
    print('2. Format as bullet lists (select all → bullet icon)')
    print('3. Share with helix@adobe.com (Editor)')
    print('4. Publish via Sidekick')

if __name__ == '__main__':
    main()

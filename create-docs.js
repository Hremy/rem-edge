#!/usr/bin/env node

/**
 * Create sample Google Docs for Acerbis OEM EDS project
 * 
 * Setup:
 * 1. npm install googleapis google-auth-library
 * 2. Get OAuth credentials from Google Cloud Console
 * 3. Set GOOGLE_DRIVE_FOLDER_ID and HELIX_EMAIL in .env
 * 4. node create-docs.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const FOLDER_ID = '1KcRM48-YYJall7YnzW_Qg66PPLWQLAns'; // Your Google Drive folder
const HELIX_EMAIL = 'helix@adobe.com';

// Read content files
const navContent = fs.readFileSync(path.join(__dirname, 'docs-content/nav-content.txt'), 'utf8');
const footerContent = fs.readFileSync(path.join(__dirname, 'docs-content/footer-content.txt'), 'utf8');

async function createGoogleDoc(auth, title, content) {
  const docs = google.docs({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });

  try {
    // Create document
    console.log(`📝 Creating document: ${title}...`);
    const doc = await docs.documents.create({
      requestBody: {
        title: title,
      },
    });

    const docId = doc.data.documentId;
    console.log(`✅ Document created: ${title} (${docId})`);

    // Add content
    console.log(`📝 Adding content to ${title}...`);
    await docs.documents.batchUpdate({
      documentId: docId,
      requestBody: {
        requests: [
          {
            insertText: {
              text: content,
            },
          },
        ],
      },
    });
    console.log(`✅ Content added to ${title}`);

    // Move to folder
    console.log(`📁 Moving ${title} to folder...`);
    await drive.files.update({
      fileId: docId,
      addParents: FOLDER_ID,
      fields: 'id, parents',
    });
    console.log(`✅ ${title} moved to folder`);

    // Share with helix@adobe.com
    console.log(`👥 Sharing ${title} with ${HELIX_EMAIL}...`);
    await drive.permissions.create({
      fileId: docId,
      requestBody: {
        type: 'user',
        role: 'editor',
        emailAddress: HELIX_EMAIL,
      },
    });
    console.log(`✅ ${title} shared with ${HELIX_EMAIL}`);

    return docId;
  } catch (error) {
    console.error(`❌ Error creating ${title}:`, error.message);
    return null;
  }
}

async function main() {
  try {
    // Load credentials (you need to set up OAuth first)
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'credentials.json'),
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/documents',
      ],
    });

    console.log('\n🚀 Creating sample Google Docs for Acerbis OEM...\n');

    const navId = await createGoogleDoc(auth, 'nav', navContent);
    console.log();
    const footerId = await createGoogleDoc(auth, 'footer', footerContent);

    console.log('\n✅ Done! Documents created and shared.\n');
    console.log(`📄 Nav doc ID: ${navId}`);
    console.log(`📄 Footer doc ID: ${footerId}`);
    console.log('\n📋 Next steps:');
    console.log('1. Create "index" doc manually in Google Drive');
    console.log('2. Add block tables using SAMPLE_BLOCKS_MARKDOWN.md');
    console.log('3. Run: aem up');
    console.log('4. Visit: http://localhost:3000/');
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.log('\n📖 Setup instructions:');
    console.log('1. Visit: https://console.cloud.google.com');
    console.log('2. Create a new project');
    console.log('3. Enable Google Drive API and Google Docs API');
    console.log('4. Create OAuth 2.0 credentials (Service Account)');
    console.log('5. Download JSON key and save as credentials.json');
    console.log('6. Run: node create-docs.js');
  }
}

main();

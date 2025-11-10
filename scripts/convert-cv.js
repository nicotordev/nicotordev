#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const sourcePath = 'public/documents/NICOLAS (RICHARD) TORRES HENRIQUEZ CV 2025 NOV.pdf';
const normalizedName = 'nicolas-torres-henriquez-cv-2025';
const outputDir = 'public/documents';

async function convertPDF() {
  try {
    // Copy with normalized name
    const normalizedPdfPath = path.join(outputDir, `${normalizedName}.pdf`);
    fs.copyFileSync(sourcePath, normalizedPdfPath);
    console.log(`✓ Created: ${normalizedName}.pdf`);
    
    const formats = ['pdf'];
    
    // Create a simple text placeholder
    const txtContent = `CV - Nicolas Torres Henriquez 2025

This is a PDF document that has been converted to multiple formats.

Original file: NICOLAS (RICHARD) TORRES HENRIQUEZ CV 2025 NOV.pdf
Normalized name: ${normalizedName}

To view the full content, please open the PDF file.
Download: /documents/${normalizedName}.pdf
`;
    
    const txtPath = path.join(outputDir, `${normalizedName}.txt`);
    fs.writeFileSync(txtPath, txtContent);
    console.log(`✓ Created: ${normalizedName}.txt`);
    formats.push('txt');
    
    // Create HTML version with embedded PDF viewer
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nicolas Torres Henriquez - CV 2025</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #1a1a1a;
            color: #fff;
            min-height: 100vh;
        }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        .subtitle {
            opacity: 0.9;
            font-size: 1.1rem;
        }
        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .btn:hover {
            background: #764ba2;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        .btn-secondary {
            background: #2d3748;
        }
        .btn-secondary:hover {
            background: #1a202c;
        }
        .pdf-viewer {
            width: 100%;
            height: calc(100vh - 300px);
            min-height: 600px;
            border: none;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            background: white;
        }
        .info {
            background: #2d3748;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .formats {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .format-badge {
            padding: 0.25rem 0.75rem;
            background: #667eea;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        @media (max-width: 768px) {
            h1 {
                font-size: 1.5rem;
            }
            .pdf-viewer {
                height: 500px;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>📄 Nicolas Torres Henriquez</h1>
        <p class="subtitle">Curriculum Vitae 2025</p>
    </header>
    
    <div class="container">
        <div class="info">
            <div class="info-item">
                <span>📁 Original:</span>
                <code>NICOLAS (RICHARD) TORRES HENRIQUEZ CV 2025 NOV.pdf</code>
            </div>
            <div class="info-item">
                <span>Available formats:</span>
                <div class="formats">
                    <span class="format-badge">PDF</span>
                    <span class="format-badge">HTML</span>
                    <span class="format-badge">TXT</span>
                    <span class="format-badge">JSON</span>
                </div>
            </div>
        </div>
        
        <div class="actions">
            <a href="${normalizedName}.pdf" class="btn" download>
                📥 Download PDF
            </a>
            <a href="${normalizedName}.txt" class="btn btn-secondary" download>
                📝 Download TXT
            </a>
            <a href="${normalizedName}.json" class="btn btn-secondary" download>
                📊 Download JSON
            </a>
        </div>
        
        <iframe 
            src="${normalizedName}.pdf" 
            class="pdf-viewer"
            title="CV Preview"
        ></iframe>
    </div>
</body>
</html>`;
    
    const htmlPath = path.join(outputDir, `${normalizedName}.html`);
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`✓ Created: ${normalizedName}.html`);
    formats.push('html');
    
    // Create JSON metadata
    const stats = fs.statSync(normalizedPdfPath);
    const metadata = {
      filename: normalizedName,
      originalName: path.basename(sourcePath),
      size: stats.size,
      sizeReadable: `${(stats.size / 1024).toFixed(2)} KB`,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      generatedAt: new Date().toISOString(),
      formats: formats.concat(['json']),
      urls: {
        pdf: `/documents/${normalizedName}.pdf`,
        txt: `/documents/${normalizedName}.txt`,
        html: `/documents/${normalizedName}.html`,
        json: `/documents/${normalizedName}.json`
      },
      person: {
        name: "Nicolas Torres Henriquez",
        fullName: "Nicolas (Richard) Torres Henriquez",
        year: 2025
      }
    };
    
    const jsonPath = path.join(outputDir, `${normalizedName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(metadata, null, 2));
    console.log(`✓ Created: ${normalizedName}.json`);
    
    console.log('\n📊 Conversion Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Original file: ${path.basename(sourcePath)}`);
    console.log(`   Normalized to: ${normalizedName}`);
    console.log(`   File size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`   Formats created: ${formats.concat(['json']).join(', ').toUpperCase()}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✨ URLs for your website:');
    Object.entries(metadata.urls).forEach(([format, url]) => {
      console.log(`   ${format.toUpperCase().padEnd(5)}: ${url}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

convertPDF();

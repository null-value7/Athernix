import puppeteer from 'puppeteer';
import path from 'path';

async function test() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(`
    <html>
      <head>
        <style>
          body { color: white; background: transparent; font-family: sans-serif; }
          h1 { color: #FF6B35; }
        </style>
      </head>
      <body>
        <h1>Test Page 1</h1>
        <p>This is a test to see if the background covers the margins.</p>
        <div style="page-break-before: always;"></div>
        <h1>Test Page 2</h1>
        <p>This is page 2.</p>
      </body>
    </html>
  `);

  await page.pdf({
    path: path.resolve('test-bg.pdf'),
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="background-color: #08000a; width: 100%; height: 100%; position: absolute; top: 0; left: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact;"></div>`,
    footerTemplate: `<div></div>`,
    margin: {
      top: '2.5cm',
      bottom: '3cm',
      left: '2cm',
      right: '2cm',
    }
  });
  
  await browser.close();
  console.log('Test done');
}
test();

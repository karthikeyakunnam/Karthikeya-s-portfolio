const { chromium } = require('playwright');

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  page.on('pageerror', exception => {
    consoleLogs.push(`[UNCAUGHT] ${exception.toString()}`);
  });

  try {
    console.log('Setting desktop viewport...');
    await page.setViewportSize({ width: 1280, height: 800 });
    
    console.log('Navigating to http://localhost:3002/...');
    await page.goto('http://localhost:3002/', { waitUntil: 'networkidle', timeout: 8000 });
    
    console.log('Waiting for preloader to finish (5 seconds)...');
    await page.waitForTimeout(5000);
    
    console.log('Taking desktop screenshot...');
    await page.screenshot({ path: '/Users/karthikeyaunnam/.gemini/antigravity-ide/scratch/screenshot.png', fullPage: true });
    
    console.log('Setting mobile viewport (390x844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000);
    
    console.log('Taking mobile screenshot...');
    await page.screenshot({ path: '/Users/karthikeyaunnam/.gemini/antigravity-ide/scratch/mobile-screenshot.png', fullPage: true });
    
    console.log('--- BROWSER LOGS ---');
    consoleLogs.forEach(log => console.log(log));
  } catch (err) {
    console.error('Error during browser execution:', err);
  } finally {
    await browser.close();
  }
})();

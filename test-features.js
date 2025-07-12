import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🧪 Testing Volks-Typo features...\n');

  // Navigate to the home page
  await page.goto('http://localhost:4321');
  console.log('✅ Loaded homepage');

  // Test 1: Dark mode toggle
  console.log('\n📋 Testing dark mode...');
  
  // Check initial theme
  const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`  Initial theme: ${initialTheme || 'light'}`);
  
  // Click theme toggle
  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  
  // Check theme changed
  const newTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`  Theme after toggle: ${newTheme}`);
  
  // Check localStorage
  const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
  console.log(`  Stored in localStorage: ${storedTheme}`);
  
  // Test 2: Navigate to a blog post
  console.log('\n📋 Testing blog post features...');
  await page.goto('http://localhost:4321/blog');
  await page.waitForSelector('.post-item');
  
  // Check if reading time is displayed
  const readingTimeExists = await page.locator('.post-reading-time').first().isVisible();
  console.log(`  Reading time displayed: ${readingTimeExists ? '✅' : '❌'}`);
  
  // Click first blog post
  await page.click('.post-title a');
  await page.waitForLoadState('networkidle');
  
  // Test 3: Table of Contents
  console.log('\n📋 Testing table of contents...');
  const tocExists = await page.locator('.table-of-contents').isVisible();
  console.log(`  TOC displayed: ${tocExists ? '✅' : '❌'}`);
  
  if (tocExists) {
    // Count TOC items
    const tocItems = await page.locator('.toc-item').count();
    console.log(`  TOC items found: ${tocItems}`);
    
    // Test smooth scrolling
    const firstTocLink = await page.locator('.toc-link').first();
    if (firstTocLink) {
      const href = await firstTocLink.getAttribute('href');
      console.log(`  Testing scroll to: ${href}`);
      
      await firstTocLink.click();
      await page.waitForTimeout(1000);
      
      // Check if URL updated
      const currentUrl = page.url();
      console.log(`  URL updated: ${currentUrl.includes(href) ? '✅' : '❌'}`);
    }
  }
  
  // Test 4: Take screenshots
  console.log('\n📸 Taking screenshots...');
  
  // Light mode screenshot
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot-light.png', fullPage: true });
  console.log('  Saved: screenshot-light.png');
  
  // Dark mode screenshot
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot-dark.png', fullPage: true });
  console.log('  Saved: screenshot-dark.png');

  console.log('\n✨ Testing complete!');
  
  await browser.close();
})();
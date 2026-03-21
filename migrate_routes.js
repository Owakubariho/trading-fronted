const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'django', 'src', 'App.js');
const nextAppDir = path.join(__dirname, 'trading-frontend-next', 'src', 'app');

if (!fs.existsSync(appJsPath)) {
    console.error("App.js not found!");
    process.exit(1);
}

const content = fs.readFileSync(appJsPath, 'utf8');

// We want to find imports to know where components come from
// e.g. import Nzd1 from "./pages/cot/cot_chart1/Nzd1";
const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"]([^'"]+)['"]/g;
let imports = {};
let match;
while ((match = importRegex.exec(content)) !== null) {
    const compName = match[1];
    let compPath = match[2];

    // We need to resolve the path relative to src/
    // The original App.js is in src/. 
    // Wait, if it's NextJS, we can just use the @/ alias!
    // E.g. "./pages/cot/..." -> "@/pages_legacy/cot/..." 
    // since we moved pages to pages_legacy
    if (compPath.startsWith('./pages/')) {
        compPath = compPath.replace('./pages/', '@/pages_legacy/');
    } else if (compPath.startsWith('./')) {
        compPath = compPath.replace('./', '@/');
    }

    imports[compName] = compPath;
}

// Now parse the Routes
// <Route path="/xyz" element={<Component />} />
// or element={<PrivateRoute><Component /></PrivateRoute>}
// We'll use a regex to grab the path and the component inside element
const routeRegex = /<Route\s+path=['"]([^'"]+)['"]\s+element=\{[\s\S]*?<([A-Za-z0-9_]+)[\s>]/g;
let generatedCount = 0;

while ((match = routeRegex.exec(content)) !== null) {
    let routePath = match[1];
    const compName = match[2];

    // Skip the root since we already did it
    if (routePath === '/' || routePath === '/login' || routePath === '/signup' || routePath === '/about' || routePath === '/contact') {
        continue;
    }

    // Clean up routePath
    if (routePath.startsWith('/')) routePath = routePath.substring(1);

    // Clean up paths like /currency*1
    routePath = routePath.replace(/\*/g, '');

    // Convert React Router dynamic parameter (e.g., :assetName) to Next.js catch-all (e.g., [assetName])
    routePath = routePath.replace(/:([^\/]+)/g, '[$1]');

    if (!imports[compName] || compName === 'PrivateRoute') {
        // Note: If the regex caught PrivateRoute, it means it didn't dig deep enough. Let's fix that.
        continue;
    }

    const routeDir = path.join(nextAppDir, routePath.replace(/\//g, path.sep));
    if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
    }

    const pageJsPath = path.join(routeDir, 'page.js');

    // Create Next.js page
    const pageContent = `"use client";
import ${compName} from "${imports[compName]}";

export default function GeneratedPage() {
  return <${compName} />;
}
`;

    fs.writeFileSync(pageJsPath, pageContent);
    generatedCount++;
}

// Let's do a second pass for PrivateRoute since the regex might have failed on nested components
const routeRegexPrivate = /<Route\s+path=['"]([^'"]+)['"]\s+element=\{[\s\S]*?<PrivateRoute>[\s\S]*?<([A-Za-z0-9_]+)[\s>]/g;

while ((match = routeRegexPrivate.exec(content)) !== null) {
    let routePath = match[1];
    const compName = match[2];

    if (routePath === '/' || routePath === '/login' || routePath === '/signup' || routePath === '/about' || routePath === '/contact') {
        continue;
    }

    if (routePath.startsWith('/')) routePath = routePath.substring(1);
    routePath = routePath.replace(/\*/g, '');

    // Convert React Router dynamic parameter (e.g., :assetName) to Next.js catch-all (e.g., [assetName])
    routePath = routePath.replace(/:([^\/]+)/g, '[$1]');

    if (!imports[compName]) continue;

    const routeDir = path.join(nextAppDir, routePath.replace(/\//g, path.sep));
    if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
    }

    const pageJsPath = path.join(routeDir, 'page.js');

    // Create Next.js page
    const pageContent = `"use client";
import ${compName} from "${imports[compName]}";

export default function GeneratedPage() {
  return <${compName} />;
}
`;

    fs.writeFileSync(pageJsPath, pageContent);
    generatedCount++;
}


console.log(`Successfully generated ${generatedCount} Next.js route wrappers!`);

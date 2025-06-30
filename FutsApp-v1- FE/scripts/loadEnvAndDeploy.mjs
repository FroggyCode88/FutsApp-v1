import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Determine __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.deploy
dotenv.config({ path: path.resolve(__dirname, '../.env.deploy') });

// Import and execute deploy
import deploy from './deploy.mjs';

(async () => {
  try {
    await deploy();
    console.log('✅ Deploy completed successfully');
  } catch (err) {
    console.error('❌ Deploy failed:', err);
    process.exit(1);
  }
})();
/**
 * Base Vite config used for both development and production.
 * Extended by adapter configurations for specific deployment environments.
 */
import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

type PkgDep = Record<string, string>;
const { dependencies = {}, devDependencies = {} } = pkg as {
  dependencies: PkgDep;
  devDependencies: PkgDep;
  [key: string]: unknown;
};

// Check for duplicate dependencies in both `dependencies` and `devDependencies`
errorOnDuplicatesPkgDeps(devDependencies, dependencies);

/**
 * Default Vite configuration. Entry is `src/entry.ssr.tsx` due to QwikCity's plugin.
 */
export default defineConfig((): UserConfig => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],

    optimizeDeps: {
      // Specify dependencies that may break Vite's pre-bundling process (e.g., with native modules).
      exclude: [], // Add problematic deps like 'better-sqlite3' here.
    },

    ssr: {
      // Ensures devDependencies are bundled, excluding any issues in production environments.
      noExternal: Object.keys(devDependencies),
      external: [
        ...Object.keys(dependencies), // Include external dependencies required for SSR.
        'fs', 'buffer', 'stream', 'events', 'assert', 'tls', 'net', 'util', 
        'path', 'querystring', 'crypto', 'child_process', 'os', 'url', 'https', 
        'zlib', 'http2', 'http'
      ],
    },

    server: {
      headers: {
        // Avoids caching responses during development
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        // Caches responses for up to 10 minutes during the preview mode.
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

/**
 * Helper function to throw an error if duplicates exist in dependencies and devDependencies.
 * @param {Object} devDependencies - List of development dependencies.
 * @param {Object} dependencies - List of production dependencies.
 */
function errorOnDuplicatesPkgDeps(
  devDependencies: PkgDep,
  dependencies: PkgDep
) {
  const duplicateDeps = Object.keys(devDependencies).filter(dep => dependencies[dep]);
  const qwikPkg = Object.keys(dependencies).filter(dep => /qwik/i.test(dep));

  // If any Qwik packages are found in production dependencies, throw an error
  if (qwikPkg.length > 0) {
    throw new Error(`Move Qwik packages ${qwikPkg.join(", ")} to devDependencies`);
  }

  // Warn the user if there are duplicate dependencies
  if (duplicateDeps.length > 0) {
    throw new Error(`
      Warning: The dependencies "${duplicateDeps.join(", ")}" are listed in both "devDependencies" and "dependencies".
      Please move the duplicated dependencies to "devDependencies" and remove them from "dependencies".
    `);
  }
}

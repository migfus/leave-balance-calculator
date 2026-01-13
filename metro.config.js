const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

const config = getDefaultConfig(__dirname)

// Expo web bundles run as a classic script (not an ES module). Some libraries
// (e.g. zustand) ship ESM builds that contain `import.meta`, which will crash
// at runtime if Metro selects them. Disabling package exports makes Metro fall
// back to the CommonJS entrypoints.
config.resolver.unstable_enablePackageExports = false

module.exports = withNativeWind(config, { input: "./app/global.css" })

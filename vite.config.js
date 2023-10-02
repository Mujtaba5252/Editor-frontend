import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      // Add any CSS-related options here if needed
    },
    include: ["path/to/react-quill/dist/quill.snow.css"],
  },
});

# Inspire Me - Motivational Wallpaper Generator

<p align="center">
  <img src="public/preview.png" alt="Inspire Me Preview" width="600"/>
</p>

A modern, open-source wallpaper generator that creates beautiful motivational wallpapers with customizable quotes, fonts, and backgrounds. Built with Next.js 14, React, and Tailwind CSS.

## ✨ Features

- 🖼️ Create custom wallpapers with inspiring quotes
- 🎨 Multiple background options (images, solid colors, gradients)
- 🔤 Customizable fonts, sizes, and text effects
- 📱 Responsive design with custom size presets
- 🎯 Precise text positioning control
- 🖌️ Gradient text support
- 🌓 Dark mode support
- 📥 High-quality PNG export

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- bun

### Installation

1. Clone the repository
2. Run `bun install` to install the dependencies
3. Run `bun dev` to start the development server

## 📦 Building Desktop App

### Development

1. To run the desktop app in development mode:
```bash
bun dev
```

2. In a separate terminal, run the Electron app:
```bash
bun electron-dev
```

### Publishing Desktop App

To create distributable packages for the desktop app:

1. Build the Next.js application:
```bash
bun build
```
2. Package the Electron app:
```bash
bun electron-build
```
This will create platform-specific distributables in the `dist` directory:
- Windows: `.exe` installer
- macOS: `.dmg` file
- Linux: `.AppImage` and `.deb` packages

#### Publishing Options

You can customize the build settings in `electron-builder.yml` or through the `electron-builder` configuration in `package.json`. Some common options include:

- `--win`: Build for Windows
- `--mac`: Build for macOS
- `--linux`: Build for Linux
- `--x64`: Build for x64 architecture
- `--arm64`: Build for ARM64 architecture

Example:
```bash
bun electron-build --win --mac
```

This addition to the README provides clear instructions for both development and publishing of the Electron app. It covers:
1. How to run the app in development mode
2. How to build distributable packages
3. Platform-specific build options
4. Common build configurations

Make sure you have the corresponding scripts in your `package.json` and the necessary electron-builder configuration set up to support these commands.
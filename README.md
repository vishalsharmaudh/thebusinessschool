# 🎓 The Business School

A modern, cross-platform mobile application for The Business School - providing quality business education and professional development courses on the go.

## 🌟 Features

- **Cross-Platform** - Runs seamlessly on both iOS and Android
- **Modern UI/UX** - Clean and intuitive mobile interface
- **Course Catalog** - Browse through various business courses and programs
- **Responsive Design** - Adapts to different screen sizes and orientations
- **Smooth Navigation** - Intuitive navigation with React Navigation


## 🛠️ Built With

- **React Native** - Framework for building native apps
- **Expo** - Development platform for React Native
- **JavaScript** - Programming language
- **Expo CLI** - Command-line interface for Expo

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn** - Package manager
- **Expo CLI** - Install globally
  ```bash
  npm install -g expo-cli
  ```
- **Expo Go App** - Install on your phone from [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 💾 Installation

1. Clone the repository
```bash
git clone https://github.com/vishalsharmaudh/thebusinessschool.git
```

2. Navigate to the project directory
```bash
cd thebusinessschool
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npx expo start
# or
expo start
```

5. Run on your device
   - **Scan the QR code** with Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator (Mac only)


## 🎨 Customization

### Changing Theme Colors
Edit the color scheme in your theme configuration file:
```javascript
const theme = {
  primaryColor: '#your-color',
  secondaryColor: '#your-color',
  backgroundColor: '#your-color',
};
```

### Adding New Screens
1. Create a new screen component in `screens/`
2. Add the route in your navigation configuration
3. Style using StyleSheet or your preferred styling method

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Start with cleared cache
npm start -- --clear

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## 📱 Building for Production

### Android (APK/AAB)
```bash
# Build APK
eas build --platform android

# Build AAB for Google Play
eas build --platform android --profile production
```

### iOS (IPA)
```bash
eas build --platform ios
```

> **Note:** You'll need an [Expo Application Services (EAS)](https://expo.dev/eas) account for production builds.

## 🔧 Future Enhancements

- [ ] User authentication and profiles
- [ ] Video streaming for course lectures
- [ ] Progress tracking and certificates
- [ ] In-app purchases for premium courses
- [ ] Push notifications for course updates
- [ ] Offline mode for downloaded courses
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Social sharing features

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Vishal Sharma**

- GitHub: [@vishalsharmaudh](https://github.com/vishalsharmaudh)
- Location: Jammu, India

## 🐛 Known Issues

- List any known bugs or limitations here

## 📞 Support

If you encounter any issues or have questions:
- Open an issue in the repository
- Contact: [vishalsharmaudh12@gmail.com]

## 🙏 Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- Powered by [Expo](https://expo.dev/)
- Thanks to the open-source community

---

### ⭐ If you found this project helpful, please give it a star!

**Made with ❤️ and React Native by Vishal Sharma**

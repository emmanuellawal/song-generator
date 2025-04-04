# Song Generator Mobile App

A React Native mobile application that generates songs based on user input themes and genres using the Suno API.

## Features

- Create songs based on custom themes
- Choose from multiple music genres
- View generated lyrics
- Listen to generated audio (when available)
- Modern and intuitive user interface

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd song-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```
SUNO_API_KEY=your_suno_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Running the App

1. Start the development server:
```bash
npm start
```

2. Run on iOS:
```bash
npm run ios
```

3. Run on Android:
```bash
npm run android
```

## Project Structure

```
song-generator/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── GenerateScreen.tsx
│   │   └── ResultScreen.tsx
│   └── services/
│       └── songService.ts
├── App.tsx
├── package.json
└── README.md
```

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Paper
- Axios

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
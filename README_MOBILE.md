# VNIT Safety App - Mobile Setup

This project uses Capacitor to wrap the Next.js application as a mobile app.

## Prerequisites
- Node.js installed
- Android Studio installed (for Android)
- Java/JDK 17+

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Initialize Capacitor** (Already done)
    ```bash
    npx cap sync
    ```

3.  **Run on Android**
    ```bash
    npx cap open android
    ```
    This will open Android Studio. Wait for Gradle sync to finish, then click the "Run" button (Play icon) to deploy to an emulator or connected device.

## Development Workflow

The app is currently configured to point to your local development server.

1.  Start the Next.js server:
    ```bash
    npm run dev
    ```

2.  Ensure your Android device/emulator can reach the server.
    - **Emulator**: `http://10.0.2.2:3000` is usually mapped to `localhost:3000`.
    - **Physical Device**: Connect via USB and use `chrome://inspect` to port forward, or ensure both are on the same Wi-Fi and use your PC's IP address (e.g., `http://192.168.1.5:3000`).

3.  Update `capacitor.config.ts` if needed:
    ```typescript
    server: {
      url: 'http://10.0.2.2:3000', // For Android Emulator
      cleartext: true
    }
    ```

## Building for Production

To build a standalone app (offline capable, but API routes won't work unless hosted externally):

1.  Run `npm run build`
2.  Run `npx cap sync`
3.  Run `npx cap open android` and build the APK.

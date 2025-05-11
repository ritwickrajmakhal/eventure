# Event Scanner

Event Scanner is a Flutter application designed to scan and manage event-related QR codes. This app allows users to log in, scan QR codes, and view event details.

## Features

- User authentication with email and password.
- QR code scanning functionality.
- Display of event details based on scanned QR codes.
- Secure storage of user session data.

## Getting Started

To get started with the Event Scanner project, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ritwickrajmakhal/eventure.git
   cd eventure/event_scanner
   ```

2. **Install Dependencies:**
   Ensure you have Flutter and Dart installed on your machine. Then run:
   ```bash
   flutter pub get
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory of the project with the following content:
   ```
   BASE_URL=https://your-api-endpoint.com
   ```

4. **Run the Application:**
   Connect your device or start an emulator, then run:
   ```bash
   flutter run
   ```

## Project Structure

- `lib/`: Contains the main source code of the application.
  - `screens/`: Manages different screens such as authentication, scanning, and splash.
  - `services/`: Handles backend communication and user session management.
  - `main.dart`: Entry point of the application.

- `assets/`: Stores static assets like images and fonts.

- `test/`: Contains unit tests for the application.

## Contributing

Contributions to the Event Scanner project are welcome. Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with descriptive messages.
4. Push your branch to your forked repository.
5. Submit a pull request detailing your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

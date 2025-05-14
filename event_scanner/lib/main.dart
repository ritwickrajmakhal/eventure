import 'package:event_scanner/screens/auth.dart';
import 'package:event_scanner/screens/splash.dart';
import 'package:event_scanner/screens/event_selection.dart';
import 'package:event_scanner/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  Widget _currentScreen = const SplashScreen();
  final AuthService _authService = AuthService();

  @override
  void initState() {
    super.initState();
    _checkAuthStatus();
  }

  Future<void> _checkAuthStatus() async {
    final bool isLoggedIn = await _authService.isLoggedIn();

    setState(() {
      if (isLoggedIn) {
        _currentScreen = const EventSelectionScreen();
      } else {
        _currentScreen = const AuthScreen();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Event Scanner',
      theme: ThemeData().copyWith(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 3, 6, 23),
        ),
      ),
      home: _currentScreen,
    );
  }
}

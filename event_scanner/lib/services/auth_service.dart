import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class AuthService {
  final Dio _dio = Dio();
  final String? _baseUrl = dotenv.env['BASE_URL'];
  static const String _tokenKey = 'auth_token';
  static const String _userKey = 'user_data';

  // Login with email and password
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _dio.post(
        '$_baseUrl/api/auth/local',
        data: {
          'identifier': email,
          'password': password,
        },
      );
      if (response.statusCode == 200) {
        final token = response.data['jwt'];
        final user = response.data['user'];

        // Save token and user data locally
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString(_tokenKey, token);
        await prefs.setString(_userKey, user.toString());

        return {'success': true, 'user': user};
      } else {
        return {'success': false, 'message': 'Authentication failed'};
      }
    } catch (error) {
      return {
        'success': false,
        'message': error is DioException
            ? error.response?.data['error']['message'] ??
                'Authentication failed'
            : error.toString()
      };
    }
  }

  // Check if user is logged in
  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(_tokenKey);
    return token != null;
  }

  // Get current user
  Future<Map<String, dynamic>?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userString = prefs.getString(_userKey);
    return userString != null ? {'user': userString} : null;
  }

  // Logout
  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove(_userKey);
  }
}

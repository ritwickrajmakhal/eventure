import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';

class EventService {
  final Dio _dio = Dio();
  final String? _baseUrl = dotenv.env['BASE_URL'];
  static const String _eventKey = 'selected_event';

  // Get auth token
  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  } // Fetch events for the user

  Future<Map<String, dynamic>> fetchEvents() async {
    try {
      final token = await _getToken();
      if (token == null) {
        return {'success': false, 'message': 'Not authenticated'};
      }

      // Add audience to the populate parameter to fetch audience data with events
      final response = await _dio.get(
        '$_baseUrl/api/events?populate=scanners,schedules,audience',
        options: Options(
          headers: {'Authorization': 'Bearer $token'},
        ),
      );

      if (response.statusCode == 200) {
        final data = response.data;
        return {'success': true, 'events': data['data']};
      } else {
        return {'success': false, 'message': 'Failed to fetch events'};
      }
    } catch (error) {
      return {
        'success': false,
        'message': error is DioException
            ? error.response?.data['error']['message'] ??
                'Failed to fetch events'
            : error.toString()
      };
    }
  }

  // Fetch detailed information about a specific event, including audience data
  Future<Map<String, dynamic>> fetchEventDetails(int eventId) async {
    try {
      final token = await _getToken();
      if (token == null) {
        return {'success': false, 'message': 'Not authenticated'};
      }

      final response = await _dio.get(
        '$_baseUrl/api/events/$eventId?populate=*',
        options: Options(
          headers: {'Authorization': 'Bearer $token'},
        ),
      );

      if (response.statusCode == 200) {
        final data = response.data;
        return {'success': true, 'event': data['data']};
      } else {
        return {'success': false, 'message': 'Failed to fetch event details'};
      }
    } catch (error) {
      return {
        'success': false,
        'message': error is DioException
            ? error.response?.data['error']['message'] ??
                'Failed to fetch event details'
            : error.toString()
      };
    }
  } // Save selected event

  Future<void> saveSelectedEvent(int eventId, String eventName,
      {List<dynamic>? audience}) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_eventKey, eventId);
    await prefs.setString('event_name', eventName);

    // Save audience data if provided
    if (audience != null) {
      // Convert audience list to JSON string for storage
      final audienceJson = jsonEncode(audience);
      await prefs.setString('event_audience', audienceJson);
    }
  }

  // Get selected event
  Future<Map<String, dynamic>?> getSelectedEvent() async {
    final prefs = await SharedPreferences.getInstance();
    final eventId = prefs.getInt(_eventKey);
    final eventName = prefs.getString('event_name');
    final audienceString = prefs.getString('event_audience');

    if (eventId != null && eventName != null) {
      final result = {'id': eventId, 'name': eventName};
      if (audienceString != null) {
        try {
          final audienceData = jsonDecode(audienceString);
          result['audience'] = audienceData;
        } catch (e) {
          print('Error parsing audience data: $e');
        }
      }
      return result;
    }
    return null;
  }

  // Clear selected event
  Future<void> clearSelectedEvent() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_eventKey);
    await prefs.remove('event_name');
  }
}

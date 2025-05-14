import 'package:flutter/material.dart';
import 'package:event_scanner/services/event_service.dart';
import 'package:event_scanner/services/auth_service.dart';
import 'package:event_scanner/screens/scan.dart';
import 'package:event_scanner/screens/auth.dart';

class EventSelectionScreen extends StatefulWidget {
  const EventSelectionScreen({super.key});

  @override
  State<EventSelectionScreen> createState() => _EventSelectionScreenState();
}

class _EventSelectionScreenState extends State<EventSelectionScreen> {
  final EventService _eventService = EventService();
  final AuthService _authService = AuthService();
  bool _isLoading = true;
  List<dynamic> _events = [];
  String _errorMessage = '';

  @override
  void initState() {
    super.initState();
    _fetchEvents();
  }

  Future<void> _fetchEvents() async {
    setState(() {
      _isLoading = true;
    });

    final result = await _eventService.fetchEvents();

    setState(() {
      _isLoading = false;
      if (result['success']) {
        _events = result['events'];
      } else {
        _errorMessage = result['message'];
      }
    });
  }

  Future<void> _selectEvent(dynamic event) async {
    final id = event['id'];
    final attributes = event['attributes'];
    final name = attributes['name'] ?? 'Unknown Event';
    final audience = attributes['audience'];

    await _eventService.saveSelectedEvent(id, name, audience: audience);

    // Navigate to scan screen
    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (ctx) => const ScanScreen()),
      );
    }
  }

  Future<void> _logout() async {
    await _authService.logout();
    await _eventService.clearSelectedEvent();

    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (ctx) => const AuthScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget content = const Center(child: CircularProgressIndicator());

    if (!_isLoading) {
      if (_errorMessage.isNotEmpty) {
        content = Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Error: $_errorMessage',
                style: TextStyle(color: Theme.of(context).colorScheme.error),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _fetchEvents,
                child: const Text('Retry'),
              ),
            ],
          ),
        );
      } else if (_events.isEmpty) {
        content = const Center(
          child: Text(
            'No events found for your account.',
            textAlign: TextAlign.center,
          ),
        );
      } else {
        content = ListView.builder(
          itemCount: _events.length,
          itemBuilder: (ctx, index) {
            final event = _events[index];
            final attributes = event['attributes'];
            final name = attributes['name'] ?? 'Unknown Event';
            final schedules = attributes['schedules'];
            final schedulesData = schedules != null ? schedules['data'] : null;
            final date = schedulesData != null &&
                    schedulesData.isNotEmpty &&
                    schedulesData[0]['attributes']['start'] != null
                ? DateTime.parse(schedulesData[0]['attributes']['start'])
                : null;
            final formattedDate = date != null
                ? '${date.day}/${date.month}/${date.year}'
                : 'Date not specified';

            return Card(
              margin: const EdgeInsets.symmetric(
                vertical: 8,
                horizontal: 16,
              ),
              child: ListTile(
                title: Text(
                  name,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                subtitle: Text(formattedDate),
                trailing: const Icon(Icons.arrow_forward_ios),
                onTap: () => _selectEvent(event),
              ),
            );
          },
        );
      }
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Event'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchEvents,
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: _logout,
          ),
        ],
      ),
      body: content,
    );
  }
}

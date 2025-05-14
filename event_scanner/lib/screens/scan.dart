import 'package:flutter/material.dart';
import 'package:event_scanner/services/auth_service.dart';
import 'package:event_scanner/services/event_service.dart';
import 'package:event_scanner/screens/auth.dart';
import 'package:event_scanner/screens/event_selection.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:convert';

class ScanScreen extends StatefulWidget {
  const ScanScreen({super.key});

  @override
  State<StatefulWidget> createState() => _ScanScreenState();
}

class _ScanScreenState extends State<ScanScreen> {
  final AuthService _authService = AuthService();
  final EventService _eventService = EventService();
  final MobileScannerController _scannerController = MobileScannerController();
  bool _hasPermission = false;
  bool _isProcessing = false;
  String _scanResult = '';
  Map<String, dynamic>? _selectedEvent;
  List<dynamic>? _audience;

  @override
  void initState() {
    super.initState();
    _checkPermission();
    _checkEventSelection();
  }

  @override
  void dispose() {
    _scannerController.dispose();
    super.dispose();
  }

  Future<void> _checkEventSelection() async {
    final event = await _eventService.getSelectedEvent();
    if (event == null) {
      // Navigate back to event selection if no event is selected
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (ctx) => const EventSelectionScreen()),
        );
      }
    } else {
      setState(() {
        _selectedEvent = event;
        _audience = event['audience'];
      });
    }
  }

  Future<void> _checkPermission() async {
    final status = await Permission.camera.status;
    if (status.isGranted) {
      setState(() {
        _hasPermission = true;
      });
    } else {
      final result = await Permission.camera.request();
      setState(() {
        _hasPermission = result.isGranted;
      });
    }
  }

  void _onDetect(BarcodeCapture capture) {
    if (_isProcessing) return;

    final List<Barcode> barcodes = capture.barcodes;
    if (barcodes.isNotEmpty) {
      setState(() {
        _isProcessing = true;
      });

      // Get the first barcode detected
      final barcode = barcodes.first;
      final rawValue = barcode.rawValue;

      if (rawValue != null) {
        _processQrCode(rawValue);
      } else {
        setState(() {
          _scanResult = 'Invalid QR code detected';
          _isProcessing = false;
        });
      }
    }
  }

  Future<void> _processQrCode(String data) async {
    // Parse the QR code JSON data
    String resultMessage = '';
    bool isValidAttendee = false;
    Map<String, dynamic>? attendeeInfo;
    Map<String, dynamic> qrData = {};

    try {
      // Parse the JSON data from QR code
      qrData = Map<String, dynamic>.from(jsonDecode(data));

      // Normalize keys to lowercase for consistent access
      qrData = qrData.map((key, value) => MapEntry(key.toLowerCase(), value));

      // Validate required fields
      if (!qrData.containsKey('email') ||
          !qrData.containsKey('name') ||
          !qrData.containsKey('eventid')) {
        resultMessage = 'Invalid QR code: Missing required fields';
      } else {
        final qrEmail = qrData['email'];
        final qrName = qrData['name'];
        final qrEventId = qrData['eventid'];

        resultMessage = 'QR Code scanned for: $qrName';

        // Verify that the QR code is for the current event
        if (_selectedEvent != null &&
            qrEventId.toString() == _selectedEvent!['id'].toString()) {
          // Check against audience list
          if (_audience != null && _audience!.isNotEmpty) {
            for (var person in _audience!) {
              // Normalize keys in audience data to lowercase
              final normalizedPerson = person
                  .map((key, value) => MapEntry(key.toLowerCase(), value));

              if (normalizedPerson['email'].toString().toLowerCase() ==
                  qrEmail.toString().toLowerCase()) {
                isValidAttendee = true;
                attendeeInfo = Map<String, dynamic>.from(normalizedPerson);
                resultMessage = 'Valid ticket for: ${normalizedPerson['name']}';
                break;
              }
            }

            if (!isValidAttendee) {
              resultMessage = 'Attendee not found in event\'s audience list!';
            }
          } else {
            resultMessage = 'No audience data available for verification.';
          }
        } else {
          resultMessage = 'This ticket is for a different event!';
          if (_selectedEvent != null) {
            resultMessage +=
                '\nTicket event ID: $qrEventId\nCurrent event ID: ${_selectedEvent!['id']}';
          }
        }
      }
    } catch (e) {
      resultMessage = 'Invalid QR code format: ${e.toString()}';
    }

    setState(() {
      _scanResult = resultMessage;
      _isProcessing = false;
    });

    // Show a result dialog
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(isValidAttendee ? 'Valid Attendee' : 'Scan Result'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(_scanResult),
              if (qrData.isNotEmpty &&
                  qrData.containsKey('email') &&
                  !isValidAttendee) ...[
                const SizedBox(height: 16),
                const Text('QR Code Details:',
                    style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Text('Name: ${qrData['name'] ?? 'Not provided'}'),
                Text('Email: ${qrData['email'] ?? 'Not provided'}'),
                Text('Event ID: ${qrData['eventid'] ?? 'Not provided'}'),
              ],
              if (isValidAttendee && attendeeInfo != null) ...[
                const SizedBox(height: 16),
                const Text('Attendee Details:',
                    style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Text('Name: ${attendeeInfo['name']}'),
                Text('Email: ${attendeeInfo['email']}'),
              ],
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              // Reset scan result and allow scanning again
              setState(() {
                _scanResult = '';
              });
            },
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  Widget _buildScannerView() {
    if (!_hasPermission) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Camera permission is required',
              style: TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _checkPermission,
              child: const Text('Request Permission'),
            ),
          ],
        ),
      );
    }

    return Stack(
      alignment: Alignment.center,
      children: [
        MobileScanner(
          controller: _scannerController,
          onDetect: _onDetect,
        ),
        Positioned(
          bottom: 20,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.black54,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Text(
              'Align QR code within the frame',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ),
        // Overlay a scanning frame
        Container(
          width: 250,
          height: 250,
          decoration: BoxDecoration(
            border: Border.all(
              color: Theme.of(context).colorScheme.primary,
              width: 3,
            ),
            borderRadius: BorderRadius.circular(16),
          ),
        ),
        if (_isProcessing)
          Container(
            color: Colors.black54,
            child: const Center(
              child: CircularProgressIndicator(),
            ),
          ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_selectedEvent != null
            ? 'Scanning: ${_selectedEvent!['name']}'
            : 'Scan QR Code'),
        actions: [
          IconButton(
            icon: const Icon(Icons.event),
            onPressed: () {
              // Navigate to event selection screen
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(
                    builder: (ctx) => const EventSelectionScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await _authService.logout();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (ctx) => const AuthScreen()),
              );
            },
          ),
        ],
      ),
      body: _buildScannerView(),
    );
  }
}

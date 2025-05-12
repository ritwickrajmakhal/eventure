import 'package:flutter/material.dart';
import 'package:event_scanner/services/auth_service.dart';
import 'package:event_scanner/screens/auth.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:permission_handler/permission_handler.dart';

class ScanScreen extends StatefulWidget {
  const ScanScreen({super.key});

  @override
  State<StatefulWidget> createState() => _ScanScreenState();
}

class _ScanScreenState extends State<ScanScreen> {
  final AuthService _authService = AuthService();
  final MobileScannerController _scannerController = MobileScannerController();
  bool _hasPermission = false;
  bool _isProcessing = false;
  String _scanResult = '';

  @override
  void initState() {
    super.initState();
    _checkPermission();
  }

  @override
  void dispose() {
    _scannerController.dispose();
    super.dispose();
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
    // Here you would implement the logic to process the QR code
    // For example, validate it against your Strapi backend

    setState(() {
      _scanResult = 'QR Code scanned: $data';
      _isProcessing = false;
    });

    // Show a success dialog
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Scan Result'),
        content: Text(_scanResult),
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
        title: const Text('Scan QR Code'),
        actions: [
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

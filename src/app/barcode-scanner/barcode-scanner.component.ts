import { Component, EventEmitter, Output } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent {
  availableDevices: MediaDeviceInfo[] = []
  currentDevice: MediaDeviceInfo | undefined

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ]

  hasDevices: boolean = false;
  hasPermission: boolean = false;

  @Output() codeEvent: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.codeEvent.emit(resultString)
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  ngOnDestroy(): void {
    this.codeEvent.complete()
  }
}

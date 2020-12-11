import { Injectable } from '@angular/core';

@Injectable()
export class ModuleThemeService {
  
  private fontSize: number = 12;

  constructor() { }

  setFontSize(fontSize: number): void {
    console.log('Inside module font size setter');
    this.fontSize = fontSize;
  }

  getFontSize(): number {
    return this.fontSize;
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class LocalThemeService {
  
  private fontSize: number = 12;

  constructor() { }

  setFontSize(fontSize: number): void {
    console.log('Inside local font size setter');
    this.fontSize = fontSize;
  }

  getFontSize(): number {
    return this.fontSize;
  }
}

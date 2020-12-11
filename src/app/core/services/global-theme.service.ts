import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalThemeService {

  private fontSize: number = 12;

  constructor() { }

  setFontSize(fontSize: number): void {
    this.fontSize = fontSize;
  }

  getFontSize(): number {
    return this.fontSize;
  }
}

import { Component, OnInit } from '@angular/core';
import { GlobalThemeService } from '../../../../core/services/global-theme.service';
import { LocalThemeService } from '../local-theme.service';
import { ModuleThemeService } from '../module-theme.service';

@Component({
  selector: 'app-test-di-two',
  templateUrl: './test-di-two.component.html',
  styleUrls: ['./test-di-two.component.scss'],
  providers: [LocalThemeService]
})
export class TestDiTwoComponent implements OnInit {

  constructor(
    private localThemeService: LocalThemeService,
    private moduleThemeService: ModuleThemeService,
    private globalThemeService: GlobalThemeService
  ) { }

  ngOnInit(): void { }

  setLocalFontSize(selectedFontSize: string): void {
    this.localThemeService.setFontSize(+selectedFontSize);
  }

  getLocalFontSize(): number {
    return this.localThemeService.getFontSize();
  }

  setModuleFontSize(selectedFontSize: string): void {
    this.moduleThemeService.setFontSize(+selectedFontSize);
  }

  getModuleFontSize(): number {
    return this.moduleThemeService.getFontSize();
  }

  setGlobalFontSize(selectedFontSize: string): void {
    this.globalThemeService.setFontSize(+selectedFontSize);
  }

  getGlobalFontSize(): number {
    return this.globalThemeService.getFontSize();
  }
}

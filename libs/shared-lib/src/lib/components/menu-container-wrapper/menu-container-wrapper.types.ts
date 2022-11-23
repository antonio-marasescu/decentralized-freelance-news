import { ThemePalette } from '@angular/material/core/common-behaviors/color';

export enum MenuContainerWrapperType {
  Flat = 'Flat',
  Stroked = 'Stroked',
  Raised = 'Raised',
}

export interface MenuContainerWrapperItem {
  id: string;
  description: string;
  type: MenuContainerWrapperType;
  color: ThemePalette;
  zIndex: number;
}

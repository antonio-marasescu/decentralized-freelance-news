import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'dfn-identity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'File',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [{ label: 'Project' }, { label: 'Other' }],
        },
        { label: 'Open' },
        { label: 'Quit' },
      ],
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        { label: 'Delete', icon: 'pi pi-fw pi-trash' },
        { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
      ],
    },
  ];
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}

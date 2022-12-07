import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dfn-main-support-value-modal',
  templateUrl: 'support-value-modal.component.html',
  styleUrls: ['support-value-modal.component.scss'],
})
export class SupportValueModalComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<SupportValueModalComponent>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      supportValue: new FormControl(null, [Validators.required]),
    });
  }

  async onUpload(): Promise<void> {
    const value = parseFloat(this.form.value.supportValue);
    this.dialogRef.close(value);
  }

  async onCancel(): Promise<void> {
    this.dialogRef.close(null);
  }
}

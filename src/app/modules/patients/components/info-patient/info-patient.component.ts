import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '@core/models/patient';

@Component({
  selector: 'app-info-patient',
  templateUrl: './info-patient.component.html',
  styleUrls: ['./info-patient.component.css', '../../../../shared/styles/info-dialog.css']
})
export class InfoPatientComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<InfoPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly patient: Patient
  ) { }

  ngOnInit(): void {
  }

}

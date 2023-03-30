import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AttachmentModel } from '@core/models/attachment.model';
import { AttachmentsService } from '@core/services/attachments.service';

@Component({
  selector: 'app-attachments-dialog',
  templateUrl: './attachments-dialog.component.html',
  styleUrls: ['./attachments-dialog.component.css']
})
export class AttachmentsDialogComponent implements OnInit {

  dataSource: AttachmentModel[] = [];
  items: AttachmentModel[] = [];
  selected: AttachmentModel | null = null;

  constructor(
    private readonly attachmentsService: AttachmentsService,
    private readonly dialogRef: MatDialogRef<AttachmentsDialogComponent>
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems (): void {
    this.attachmentsService.find()
    .subscribe(
      res => {
        this.items = res;
        this.dataSource = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  selectItem (item: AttachmentModel): void {
    this.selected = item;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const cpy_data = [...this.items];
    this.dataSource = cpy_data.filter((item) =>  item.title.trim().toLowerCase().includes(filterValue.trim().toLowerCase()));
  }

  exit (): void {
    this.dialogRef.close();
  }

}

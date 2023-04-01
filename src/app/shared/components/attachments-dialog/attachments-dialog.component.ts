import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AttachmentModel } from '@core/models/attachment.model';
import { AttachmentsService } from '@core/services/attachments.service';
import { DialogService } from '@core/services/dialog.service';
import { LoaderService } from '@core/services/loader.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize } from 'rxjs';
import { URL_ATTACHMENTS } from 'src/app/constants/app.constants';

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
    private readonly dialogRef: MatDialogRef<AttachmentsDialogComponent>,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService,
    private readonly dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems (): void {
    this.attachmentsService.find()
    .subscribe(
      res => {
        console.log(res);
        this.items = res;
        this.dataSource = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  selectItem (item: AttachmentModel): void {
    if (item._id == this.selected?._id) {
      this.selected = null;
    } else {
      this.selected = item;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const cpy_data = [...this.items];
    this.dataSource = cpy_data.filter((item) =>  item.title.trim().toLowerCase().includes(filterValue.trim().toLowerCase()));
  }

  exit (): void {
    this.dialogRef.close();
  }

  showPDF (event: MouseEvent, attachment: AttachmentModel): void {
    event.stopPropagation();
    window.open(URL_ATTACHMENTS + attachment.filename);
  }

  deletePDF (event: MouseEvent, attachment: AttachmentModel): void {
    event.stopPropagation();
    this.dialogService.openConfirmDialog('Eliminar pdf', 'Seguro que quieres eliminar el pdf?')
    .subscribe(
      res => {
        if (res) {
          if (attachment._id == this.selected?._id) this.selected = null;
          this.loaderService.isLoading.next(true);
          this.attachmentsService.remove(attachment._id)
          .pipe(finalize(() => this.loaderService.isLoading.next(false)))
          .subscribe(
            res => {
              this.loadItems();
            },
            err => {
              this.snackerService.showError(err.error);
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutineModel } from '@core/models/routine.model';
import { LoaderService } from '@core/services/loader.service';
import { RoutinesService } from '@core/services/routines.service';
import { RouterService } from '@core/services/router.service';
import { finalize } from 'rxjs/operators';
import { SnackerService } from '@core/services/snacker.service';
import { RoutineRequestModel } from '@core/models/routine-request.model';
import { OptionalPipe } from '../../../../shared/pipes/optional.pipe';
import { LinkStructure } from '@shared/components/links-input/interfaces/link-structure';
import { AttachmentModel } from '@core/models/attachment.model';
import { AttachmentsService } from '@core/services/attachments.service';

@Component({
  selector: 'app-add-routine-page',
  templateUrl: './add-routine-page.component.html',
  styleUrls: ['./add-routine-page.component.css', '../../../../../assets/styles/form.css']
})
export class AddRoutinePageComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  routine: RoutineModel | null = null;

  links: Array<LinkStructure> = [];
  attachment: AttachmentModel | null = null;

  buttonClear = {
    title: false,
    description: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly routinesService: RoutinesService,
    private readonly attachmentsService: AttachmentsService,
    private readonly optionalPipe: OptionalPipe,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService,
    private readonly routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoading.next(true);
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.routinesService.getRoutine(params['id'])
      .pipe(finalize(() => {
        this.loaderService.isLoading.next(false);
      }))
      .subscribe(
        res => {
          this.edit = true;
          this.routine = res;
          this.initForm();
        },
        err => {
          this.exit();
          this.snackerService.showError("Algo no ha sucedido como se esperaba");
        }
      );
    } else {
      this.initForm();
      this.loaderService.isLoading.next(false);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      title: [this.edit ? this.routine!.title : null, [Validators.required]],
      description: [this.edit ? this.routine!.description : null],
    });
    if (this.edit) {
      this.links = this.routine!.links.map((url, id) => {
        return {id, url};
      });
      if (this.routine?.attachment) {
        this.loaderService.isLoading.next(true);
        this.attachmentsService.getAttachment(this.routine!.attachment)
        .pipe(finalize(() => this.loaderService.isLoading.next(false)))
        .subscribe(
          res => {
            this.attachment = res;
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.attachment = null;
      }
    }
  }

  get title (): string | null {
    return this.form.value.title;
  }

  get description (): string | null {
    return this.form.value.description;
  } 

  clearField (field: string): void {
    this.form.value[field] = null;
    this.form.reset(this.form.value);
  }

  exit(): void {
    this.routerService.goToRoutines();
  }

  addRoutine (): void {
    this.loaderService.isLoading.next(true);
    const routine = this.getRoutineRequest();
    this.routinesService.createRoutine(routine)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Rutina creada con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  editRoutine (): void {
    this.loaderService.isLoading.next(true);
    const routine = this.getRoutineRequest(true);
    this.routinesService.updateRoutine(this.routine!._id, routine)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Rutina editada con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  getRoutineRequest (edit:boolean = false): RoutineRequestModel {
    const request = {
      title: this.title,
      description: this.description,
      links: this.links.map(link => {return link.url}),
      attachment: this.attachment ? this.attachment._id : null
    };
    return edit ? request : this.optionalPipe.transform(request);
  }

}

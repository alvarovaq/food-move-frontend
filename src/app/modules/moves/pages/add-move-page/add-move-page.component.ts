import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MoveRequestModel } from '@core/models/move-request.model';
import { LoaderService } from '@core/services/loader.service';
import { MovesService } from '@core/services/moves.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { OptionalPipe } from '@shared/pipes/optional.pipe';
import { finalize } from 'rxjs';
import { MoveModel } from '../../../../core/models/move.model';
import { PatientModel } from '../../../../core/models/patient.model';
import { ViewPatientService } from '../../../../core/services/view-patient.service';
import { MatDialog } from '@angular/material/dialog';
import { RoutineModel } from '@core/models/routine.model';
import { ImportRoutineComponent } from '@modules/moves/components/import-routine/import-routine.component';

@Component({
  selector: 'app-add-move-page',
  templateUrl: './add-move-page.component.html',
  styleUrls: ['./add-move-page.component.css', '../../../../../assets/styles/form.css']
})
export class AddMovePageComponent implements OnInit {

  patient: PatientModel | null = null;

  date = new Date();

  form!: FormGroup;
  edit: boolean = false;
  move: MoveModel | null = null;

  links: Array<{id: number, url: string}> = [];

  buttonClear = {
    title: false,
    description: false,
    comments: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly movesService: MovesService,
    private readonly optionalPipe: OptionalPipe,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService,
    private readonly routerService: RouterService,
    private readonly viewPatientService: ViewPatientService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        const params = this.activatedRoute.snapshot.params;
        if (params["date"]) this.date = new Date(params["date"]);
        if (params["id"]) {
          this.edit = true;
          this.loaderService.isLoading.next(true);
          this.movesService.getMove(params['id'])
          .pipe(finalize(() => {
            this.loaderService.isLoading.next(false);
          }))
          .subscribe(
            res => {
              this.move = res;
              this.date = this.move.date;
              this.initForm();
            },
            err => {
              this.exit();
              this.snackerService.showError("Algo no ha sucedido como se esperaba");
            }
          );
        } else {
          this.initForm();
        }
      },
      err => {
        console.log(err);
        this.routerService.goToHome();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    )
  }

  initForm(): void {
    this.form = this.fb.group({
      title: [this.edit ? this.move!.title : null, [Validators.required]],
      description: [this.edit ? this.move!.description : null],
      comments: [this.edit ? this.move!.comments : null]
    });
    if (this.edit) {
      this.links = this.move!.links.map((url, id) => {
        return {id, url};
      });
    }
  }

  get title (): string | null {
    return this.form.value.title;
  }

  get description (): string | null {
    return this.form.value.description;
  } 

  get comments (): string | null {
    return this.form.value.comments;
  }

  clearField (field: string): void {
    this.form.value[field] = null;
    this.form.reset(this.form.value);
  }

  exit(): void {
    this.routerService.goToMoves(this.date);
  }

  addLink(url: string): void {
    const id = this.links.length > 0 ? Math.max(...this.links.map(link => {return link.id})) + 1 : 0;
    const link = {id, url};
    this.links.push(link);
  }

  removeLink(id: number): void {
    this.links = this.links.filter(link => {
      return link.id != id;
    });
  }

  importRoutine (): void {
    const dialogRef = this.dialog.open(ImportRoutineComponent, {
      width: '800px'
    });
    dialogRef.afterClosed()
    .subscribe(
      res => {
        if (res) {
          const routine = res as RoutineModel;
          this.form.setValue({title: routine.title, description: routine.description ? routine.description : '', comments: this.comments});
          this.links = routine.links.map((url, id) => {
            return {id, url};
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  addMove (): void {
    this.loaderService.isLoading.next(true);
    const move = this.getMoveRequest();
    this.movesService.createMove(move)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Ejercicio creado con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  editMove (): void {
    this.loaderService.isLoading.next(true);
    const move = this.getMoveRequest(true);
    this.movesService.updateMove(this.move!._id, move)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Ejercicio editada con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  getMoveRequest (edit:boolean = false): MoveRequestModel {
    const request = {
      patient: this.patient?._id,
      date: this.date,
      title: this.title,
      description: this.description,
      comments: this.comments,
      links: this.links.map(link => {return link.url})
    };
    return edit ? request : this.optionalPipe.transform(request);
  }

}

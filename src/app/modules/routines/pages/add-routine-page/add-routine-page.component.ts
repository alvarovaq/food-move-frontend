import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Routine } from '@core/models/routine';
import { LoaderService } from '@core/services/loader.service';
import { RoutinesService } from '@core/services/routines.service';
import { RouterService } from '@core/services/router.service';
import { finalize } from 'rxjs/operators';
import { SnackerService } from '@core/services/snacker.service';
import { RoutineRequest } from '@core/models/routine-request';

interface Link {
  id: number;
  url: string;
}

@Component({
  selector: 'app-add-routine-page',
  templateUrl: './add-routine-page.component.html',
  styleUrls: ['./add-routine-page.component.css', '../../../../shared/styles/form.css']
})
export class AddRoutinePageComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  routine: Routine | null = null;

  links: Link[] = [];

  buttonClear = {
    title: false,
    description: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly routinesService: RoutinesService,
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
      title: [this.edit ? this.routine!.title : '', [Validators.required]],
      description: [this.edit ? this.routine!.description : ''],
    });
    if (this.edit) {
      this.links = this.routine!.links.map((url, id) => {
        return {id, url};
      });
    }
  }

  get title (): string {
    return this.form.value.title;
  }

  get description (): string {
    return this.form.value.description;
  } 

  clearField (field: string): void {
    this.form.value[field] = '';
    this.form.reset(this.form.value);
  }

  exit(): void {
    this.routerService.goToRoutines();
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
    const routine = this.getRoutineRequest();
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

  getRoutineRequest (): RoutineRequest {
    return {
      title: this.title,
      description: this.description,
      links: this.links.map(link => {return link.url})
    };
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Routine } from 'src/app/core/models/routine';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RoutinesService } from 'src/app/core/services/routines.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { finalize } from 'rxjs/operators';
import { SnackerService } from 'src/app/core/services/snacker.service';
import { RoutineRequest } from 'src/app/core/models/routine-request';

interface Link {
  id: number;
  url: string;
}

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.css', '../../../../shared/styles/form.css']
})
export class AddRoutineComponent implements OnInit {

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
    private readonly routingService: RoutingService
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
    this.routingService.goToRoutines();
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

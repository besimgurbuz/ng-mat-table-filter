import {
  InjectionToken,
  Type,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {MatColumnDef} from '@angular/material/table';
import {Observable, Subject} from 'rxjs';
import {MatTableFilterButtonComponent} from './mat-table-filter-button/mat-table-filter-button.component';
import {MatTableFilterSelection} from './models';
import {MatTableHeaderType} from './models/header-type';

export class MatTableFilterTriggerer<T extends MatTableFilterSelection> {
  protected matColumnDef = inject(MatColumnDef);
  protected selectedFilterSubject = new Subject<T>();

  public headerType: MatTableHeaderType = 'string';
  public parentHovered: WritableSignal<boolean> = signal(false);

  public get columnKey() {
    return this.matColumnDef.name;
  }

  public get selectedFilter$(): Observable<T> {
    return this.selectedFilterSubject.asObservable();
  }
}

export const MAT_TABLE_FILTER_TRIGGERER_TYPE = new InjectionToken<
  Type<MatTableFilterTriggerer<MatTableFilterSelection>>
>('Component type for MatTableFilter to use in headers', {
  providedIn: 'root',
  factory: () => MatTableFilterButtonComponent,
});

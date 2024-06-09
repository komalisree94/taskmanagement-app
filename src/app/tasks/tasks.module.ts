import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './data/tasks.reducer';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './data/tasks.effects';
import { AddComponent } from './add/add.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { EditComponent } from './edit/edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    StoreModule.forFeature("mytasks", taskReducer),
    EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksModule { }

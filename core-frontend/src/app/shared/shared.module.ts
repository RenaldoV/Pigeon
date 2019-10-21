import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatExpansionModule,
  MatTooltipModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatFormFieldModule,
  MatChipsModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatAutocompleteModule,
  MatStepperModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTooltipModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatChipsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatStepperModule,
    DragDropModule
  ],
  exports: [
    MatTooltipModule,
    MatExpansionModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatChipsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatStepperModule,
    DragDropModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue:  {duration: 4000}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue:  {maxWidth: '400px', minWidth: '500px'}}
  ]
})
export class SharedModule { }

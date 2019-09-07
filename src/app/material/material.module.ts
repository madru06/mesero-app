import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTableModule, MatIcon, MatPaginatorModule, MatSortModule, MatIconModule, MatFormField, MatInputModule, MatSnackBar, MatSnackBarModule, MatSidenavModule, MatDividerModule, MatMenuModule, MatToolbarModule, MatDialogModule, MatAutocompleteModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatListModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ], 
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class MaterialModule { }

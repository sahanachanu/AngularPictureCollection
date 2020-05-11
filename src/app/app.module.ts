import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import { AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ImagesComponent } from './images/images.component';
import { ImageListComponent } from './image-list/image-list.component';
import { environment } from '../environments/environment';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { EditImageComponent } from './edit-image/edit-image.component';
import { CircleDialogComponent } from './circle-dialog/circle-dialog.component';
import { NewEditImageComponent } from './new-edit-image/new-edit-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ImagesComponent,
    ImageListComponent,
    ImageDisplayComponent,
    EditImageComponent,
    CircleDialogComponent,
    NewEditImageComponent
  ],

  entryComponents:[ImagesComponent, ImageDisplayComponent, CircleDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

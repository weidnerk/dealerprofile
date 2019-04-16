import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatFormFieldModule, MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DlrprofileComponent } from './dlrprofile/dlrprofile.component';
import { DealerdbService } from './_services/dealerdb.service'
import { CookieModule } from 'ngx-cookie';

@NgModule({
  declarations: [
    AppComponent,
    DlrprofileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    MatCardModule, 
    MatFormFieldModule,
    HttpClientModule,
    MatTabsModule,
    CookieModule.forRoot()
  ],
  providers: [DealerdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

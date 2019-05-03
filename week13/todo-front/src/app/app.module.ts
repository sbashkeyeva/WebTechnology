
import { BrowserModule } from "@angular/platform-browser";
import { ClassProvider, NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { ProviderService } from "./shared/services/provider.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./AuthInterceptor";
// import * as $ from "jquery";
@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [FormsModule, BrowserModule, HttpClientModule],
  providers: [
    ProviderService,
    <ClassProvider>{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
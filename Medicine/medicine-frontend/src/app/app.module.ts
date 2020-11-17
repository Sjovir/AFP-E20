import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CreateOrdinationComponent } from './components/create-ordination/create-ordination.component';
import { EditOrdinationComponent } from './components/edit-ordination/edit-ordination.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ModalsModule } from './modals/modals.module';

export function tokenGetter() {
  return localStorage.getItem('access-token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ModalsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [
          `${environment.host}:7100`,
          `${environment.host}:7200`,
        ],
      },
    }),
  ],
  providers: [DatePipe],
  bootstrap: [environment.bootstrap ? AppComponent : []],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const injector: Injector = this.injector;

    const microMedicineOverview = createCustomElement(OverviewComponent, {
      injector,
    });
    const microCreateOrdination = createCustomElement(
      CreateOrdinationComponent,
      {
        injector,
      }
    );
    const microEditOrdination = createCustomElement(EditOrdinationComponent, {
      injector,
    });

    customElements.define('micro-medicine-overview', microMedicineOverview);
    customElements.define('micro-create-ordination', microCreateOrdination);
    customElements.define('micro-edit-ordination', microEditOrdination);
  }
}

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
// import { provideCharts } from 'ngx-echarts/providers';
import * as echarts from 'echarts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // provideCharts();
    // 👈 Add this line
    importProvidersFrom(
      NgxEchartsModule.forRoot({ echarts }) // Pass the ECharts object here
    ),
  ]
};


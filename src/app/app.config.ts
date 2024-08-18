import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAmb4kcC9K6Bie38HuJw2wMl-vAhtfoHEo',
  authDomain: 'informatic-mit.firebaseapp.com',
  databaseURL: 'https://informatic-mit-default-rtdb.firebaseio.com',
  projectId: 'informatic-mit',
  storageBucket: 'informatic-mit.appspot.com',
  messagingSenderId: '632930275903',
  appId: '1:632930275903:web:20c782b3747bd1d7f4de8a',
  measurementId: 'G-2N8TDR58Z1',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
};

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NgxWebstorageModule,
  LocalStorageService,
} from 'ngx-webstorage';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService, TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        TranslateTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [HomeComponent],
      providers: [LocalStorageService, TranslateService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

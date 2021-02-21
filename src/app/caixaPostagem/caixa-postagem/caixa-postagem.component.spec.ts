import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaPostagemComponent } from './caixa-postagem.component';

describe('CaixaPostagemComponent', () => {
  let component: CaixaPostagemComponent;
  let fixture: ComponentFixture<CaixaPostagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaixaPostagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaPostagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

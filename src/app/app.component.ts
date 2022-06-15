import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturaService } from '../services/factura-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'factura';

  productForm: FormGroup;
  ItemForm: FormGroup;

  Items: any = [];

  valorNeto: number;
  valorTotal: number;
  valorIVA: number;


  constructor(
    public fb: FormBuilder,
    public facturaService: FacturaService
  ) { };


  ngOnInit(): void {

    //formulario para la factura
    this.productForm = this.fb.group({
      razonSocialEmisor: ['', Validators.required],
      nitEmisor: ['', Validators.required],
      razonSocialReceptor: ['', Validators.required],
      nitReceptor: ['', Validators.required],
    });

    //formulario para los items
    this.ItemForm = this.fb.group({
      descripcionItem: ['', Validators.required],
      cantidadItem: ['', Validators.min(1)],
      valorUnitarioItem: ['', Validators.min(1)],
    });


    this.valorNeto = 0;
    this.valorTotal = 0;
    this.valorIVA = 0;

  }

  submitForm() {
    this.productForm.value.items = this.Items;
    console.log(this.productForm.value);
    this.facturaService.save(this.productForm.value)
      .subscribe(resp => { console.log(resp) }, error => { console.log(error)})

  }

  delete(item) {
    this.Items.pop(item);
    this.valorNeto = this.valorNeto - (  item.cantidadItem *item.valorUnitarioItem);
    this.valorIVA = this.valorNeto* (16/100);
    this.valorTotal = this.valorNeto - this.valorIVA;
  }

  addItem() {
    this.Items.push (this.ItemForm.value);
    this.valorNeto = this.valorNeto + (  this.ItemForm.value.cantidadItem * this.ItemForm.value.valorUnitarioItem);
    this.valorIVA = this.valorNeto * (16/100);
    this.valorTotal = this.valorNeto + this.valorIVA;
    this.ItemForm.reset();
  }

}

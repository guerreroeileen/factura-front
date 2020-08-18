import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { FacturaService } from


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
  ) { };


  ngOnInit(): void {

    //formulario para la factura
    this.productForm = this.fb.group({
      razonSocialEmisor: [''],
      NITEmisor: [''],
      razonSocialReceptor: [''],
      NITReceptor: [''],
    });

    //formulario para los items
    this.ItemForm = this.fb.group({
      descripcionItem: [''],
      cantidadItem: [''],
      valorUnitarioItem: [''],
    });


    this.valorNeto = 0;
    this.valorTotal = 0;
    this.valorIVA = 0;

  }

  submitForm() {
    console.log(this.productForm);

  }

  delete(item) {
    this.Items.pop(item);
    this.valorNeto = this.valorNeto - (  item.cantidadItem *item.valorUnitarioItem);
    this.valorIVA = this.valorNeto* (16/100);
    this.valorTotal = this.valorNeto - this.valorIVA;
  }

  addItem() {
    this.Items.push (this.ItemForm.value);
    this.valorNeto = this.valorNeto + (  this.ItemForm.value.cantidadItem *this.ItemForm.value.valorUnitarioItem);
    this.valorIVA = this.valorNeto* (16/100);
    this.valorTotal = this.valorNeto + this.valorIVA;

    this.ItemForm.reset;

  }

}

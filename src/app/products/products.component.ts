import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { debounceTime, tap } from 'rxjs';
import { DataView } from 'primeng/dataview';

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  type: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: Product[] = [];

  sortOrder!: number ;
  sortField!: string;
  sortOptions: SelectItem[] = [];


  rating = 5;
  formGroup: FormGroup = this.formBuilder.group({
    search: [],
    sort: [],
  })

  @ViewChild('dv') dataView!: DataView;
  constructor(private readonly httpClient: HttpClient,
    private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.httpClient.get<any>('assets/products.json').pipe(tap((products: any)=> {this.products = products.data;})).subscribe();
    this.formGroup.get('search')?.valueChanges.pipe(debounceTime(300)).subscribe((e)=>{this.dataView.filter(e);});
  }

  onSortChange(event: any) {
    // this.sortOrder = event.order;
    // this.sortField = event.field;
    console.log(event);
  }
}

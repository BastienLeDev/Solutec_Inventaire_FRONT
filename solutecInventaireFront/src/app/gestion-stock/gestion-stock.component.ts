import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  idProduct: number;
  nameProduct: string;
  refProduct: string;
  owner: string;
  entryDate: Date;
  exitDate: Date;
  delete: any;
}


@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.css']
})
export class GestionStockComponent implements OnInit {
  listProducts: any;
  lengthDataSource: any;

  displayedColumns: string[] = ['nameProduct', 'refProduct', 'owner', 'entryDate', 'exitDate', 'star'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  delete: Object;
  constructor(private http: HttpClient) {

  };


  ngOnInit(): void {
    this.getListProducts();

  }


  getListProducts() {
    this.http.get('http://localhost:8301/liste').subscribe({
      next: (data) => {
        console.log(data)
        this.listProducts = data;
        this.dataSource = new MatTableDataSource<Product>(this.listProducts);
        console.log(this.dataSource)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.lengthDataSource = this.listProducts.length;
      },
      error: (err) => { console.log(err) },
    })
  };


  DeleteProduct(val: any) {
    console.log(val)
    this.http.delete('http://localhost:8301/delete/' + val).subscribe({
      next: (data) => {
        console.log(data)
        this.delete = data;
        this.ngOnInit();
      },
      error: (err) => { console.log(err) },
    })
  };

}

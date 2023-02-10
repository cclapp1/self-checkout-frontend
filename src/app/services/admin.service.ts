import { transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Department, Product } from '../models/adminModel';
import { Transaction, TransactionProduct } from '../models/checkoutModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string = 'http://localhost:5090/admin'

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/getDepartments`).pipe(map((departments: any[]) => {
      return departments.map(department => new Department(department.deptName, department.id))
    }))
  }

  getProductsFromDepartment(department: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getProducts/${department}`).pipe(map((products: any[]) => {
      return products.map((product: any) => {
        return new Product(product.upc, product.departmentName, product.departmentId, product.productName, product.price, product.saleModifier, product.discontinued, product.quantity, product.taxedTf)
      })
    }))
  }

  getProduct(UPC: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/getProduct/${UPC}`).pipe(map((product: any) => {
      return new Product(product.upc, product.departmentName, product.departmentId, product.productName, product.price, product.saleModifier, product.discontinued, product.quantity, product.taxedTf)
    }))
  }

  updateProduct(editedProduct: Product): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/updateProduct/${editedProduct.upc}`, editedProduct).pipe(map(obj => true))
  }

  addProduct(newProduct: Product): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/addProduct`, newProduct).pipe(map(obj => true))
  }

  deleteProduct(UPC: number): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/removeProduct/${UPC}`, {}).pipe(map(obj => true))
  }

  addDepartment(newName: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/addDepartment/${newName}`, {}).pipe(map(obj => true))
  }

  deleteDepartment(name: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/removeDepartment/${name}`, {}).pipe(map(obj => true))
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/getTransactions`).pipe(map((transactions: any[]) => {
      return transactions.map((t: any) => {
        let newTransaction: Transaction = new Transaction(t.cost,
          t.paymentCard,
          t.products.map((product: any) => {
            return new TransactionProduct(product.upc, product.quantity)
          })
        )
        newTransaction.transactionID = t.transactionID
        return newTransaction
      })
    }))
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}/getAllProducts`).pipe(map((products: any) => products))
  }

  constructor(private http: HttpClient) { }
}
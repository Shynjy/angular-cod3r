import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(
    private productServide: ProductService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productServide.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    this.productServide.delete(this.product.id).subscribe(() => {
    this.productServide.showMessage('Produto excluido com sucesso!')
    this.router.navigate(['/products']);
  })
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
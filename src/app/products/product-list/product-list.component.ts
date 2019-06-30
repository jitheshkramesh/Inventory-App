import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/interface/product';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // For the FormControl - Adding products
  insertForm: FormGroup;
  name: FormControl;
  price: FormControl;
  description: FormControl;
  imageUrl: FormControl;

  // Updating the Product
  updateForm: FormGroup;
  _name: FormControl;
  _price: FormControl;
  _description: FormControl;
  _imageUrl: FormControl;
  _id: FormControl;

  // Add Modal
  @ViewChild('template') modal: TemplateRef<any>;

  // Update Modal
  @ViewChild('editTemplate') editmodal: TemplateRef<any>;

  // Modal properties
  modalMessage: string;
  modalRef: BsModalRef;
  selectedProduct: Product;
  products$: Observable<Product[]>;
  products: Product[] = [];
  userRoleStatus: string;

  // Datatables Properties
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;



  constructor(private acct: AccountService,
    private productservice: ProductService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private chRef: ChangeDetectorRef,
    private router: Router) { }

  /// Load Add New product Modal
  onAddProduct() {
    this.modalRef = this.modalService.show(this.modal);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.products$ = this.productservice.getProducts();

    this.products$.subscribe(result => {
      this.products = result;

      //this.chRef.detectChanges();

      this.dtTrigger.next();
    });

    this.acct.currentUserRole.subscribe(result => {
      this.userRoleStatus = result;
      this.dtTrigger.next();
    });

    this.acct.currentUserRole.subscribe(result => {this.userRoleStatus = result});


    // Modal Message
    this.modalMessage = "All Fields Are Mandatory";

    // Initializing Add product properties

    let validateImageUrl: string = '^(https?:\/\/.*\.(?:png|jpg))$';

    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this.description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this.imageUrl = new FormControl('', [Validators.pattern(validateImageUrl)]);
    
    this.insertForm = this.fb.group({

            'name' : this.name,
            'price' : this.price,
            'description' : this.description,
            'imageUrl' : this.imageUrl,
            'outOfStock' : true,
    
            });

    // Initializing Update Product properties
    this._name = new FormControl('',[Validators.required, Validators.maxLength(50)]); 
    this._price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this._description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this._imageUrl = new FormControl('', [Validators.pattern(validateImageUrl)]);
    this._id = new FormControl();

    this.updateForm = this.fb.group(
        {
            'id' : this._id,
            'name' : this._name,
            'price' : this._price,
            'description' : this._description,
            'imageUrl' : this._imageUrl,
            'outOfStock' : true

        });

  }



}

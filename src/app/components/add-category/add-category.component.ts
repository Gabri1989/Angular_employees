import { Component } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { AddCategory } from 'src/app/models/add-category-model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  model:AddCategory;

  constructor(private categService:CategoryService) {
    this.model={
      name:'',
      UrlHandle:''
    }
    
  }
  submitForm(){
   this.categService.addCategory(this.model)
   .subscribe({
    next:(Response)=>{
      console.log('Success')
    }
    
   
   })
  }
}

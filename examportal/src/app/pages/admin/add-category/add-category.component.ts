import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category={
    title:'',
    description:''
  }
  constructor(private categorys:CategoryService) { }

  ngOnInit(): void {
  }
  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      Swal.fire("Sorry !!","Title is required !!",'error');
      return;
    }
    if(this.category.description.trim()=='' || this.category.description==null)
    {
      Swal.fire("Sorry !!","Description is required !!",'error');
      return;
    }
    //all done
    this.categorys.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!",'Category submit successfully !!','success');
      }
      ,
      (error)=>
      {
         console.log(error);
         Swal.fire('Error !!','Something went wrong !!','error');
      }
    )
  }
}

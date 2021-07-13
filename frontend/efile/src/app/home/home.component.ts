import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact } from './contact.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contacts:Contact[] = [];
  constructor(private contactService:ContactsService) { }
  page = 1;
  items_length = 0;
  ngOnInit(): void {
    // for get all contacts
    this.contactService.get_contacts().subscribe(res=>{
      this.items_length = res.contacts.length;
      console.log(this.items_length)
      if(this.page){
      this.contacts = res.contacts.slice(5*(this.page-1),5*this.page);
      }
    })

    // for add contact
    // this.contactService.add_contact({name:"woka2",phone:"123",address:"sdf",notes:"wo"}).subscribe(res=>{
    //   console.log(res)
    // })
    // for update contact
    // this.contactService.update_contact({name:"worrrk"},"60ed5acc465ff71414f9061e").subscribe(res=>{
    //   console.log(res)
    // })


    }
    deleteContact(_contact_id: any){
      // for delete contact
      if (window.confirm("Are You Sure you want delete this contact"))
      this.contactService.delete_contact(_contact_id).subscribe(res=>{
       this.contacts =  this.contacts.filter((item)=>{
          return item._id !==_contact_id;
        })
        console.log(this.contacts)
      })

  }

  previous(){
    if (this.page < 1){
      this.page = 1
    }else{

      this.page -=1;
    }
    this.ngOnInit()
  }
  next(){
    if(this.page*5 < this.items_length){
      this.page +=1
    }else{
      console.log(this.page)
      console.log(this.items_length)
      this.page =this.page;
    }

    this.ngOnInit()
  }


}

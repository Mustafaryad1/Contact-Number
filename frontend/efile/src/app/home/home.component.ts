import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private contactService:ContactsService) { }

  ngOnInit(): void {

    // for get all contacts
    // this.contactService.get_contacts().subscribe(res=>{
    //   console.log(res)
    // })
    // for add contact
    // this.contactService.add_contact({name:"woka2",phone:"123",address:"sdf",notes:"wo"}).subscribe(res=>{
    //   console.log(res)
    // })
    // for update contact
    // this.contactService.update_contact({name:"worrrk"},"60ed5acc465ff71414f9061e").subscribe(res=>{
    //   console.log(res)
    // })
    // for delete contact
    // this.contactService.delete_contact("60ed5acc465ff71414f9061e").subscribe(res=>{
    //   console.log(res)
    // })

  }


}

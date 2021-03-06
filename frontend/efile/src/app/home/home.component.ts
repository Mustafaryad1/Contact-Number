import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';
import { SocketioService } from '../services/socketio.service';
import { Contact } from './contact.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contacts:Contact[] = [];
  constructor(private contactService:ContactsService, private _socket:SocketioService) { }
  page = 1;
  search_name = "";
  items_length = 0;
  add = false;
  name = "";
  phone = "";
  address = "";
  notes = "";
  id = "";
  is_edit = false;
  contactSocket:any;

  ngOnInit(): void {
    // for get all contacts
    this.contactService.get_contacts().subscribe(res=>{
      this.items_length = res.contacts.length;
      console.log(this.items_length)
      if(this.page){
      this.contacts = res.contacts.slice(5*(this.page-1),5*this.page);
      }
      this._socket.connect()
      this._socket.socket?.on("blockEdit",(contact_id)=>{
        res.contacts.map((item: any)=>{
          if(item._id===contact_id){
            item['blocked'] = true
          }
        })
      })
    })
  }


  // for update contact



  inital_contact_values(){
    this.name ="";
    this.phone ="";
    this.address ="";
    this.notes ="";
  }

    // Toggle add form
    isAdd(){
      this.is_edit = false;
      this.add = !this.add;
      this.inital_contact_values()
    }
    edit(contact:any){
      this._socket.socket?.emit("edit", contact._id)
      this.name = contact.name;
      this.phone = contact.phone;
      this.address = contact.address;
      this.notes = contact.notes;
      this.is_edit =true;
      this.id = contact._id;
      this.add = true;

    }

    editContact(){
      const user = {name:this.name, phone:this.phone, address:this.address, notes:this.notes}
      this.contactService.update_contact(user, this.id).subscribe(res=>{
        this.add = false;
        this.is_edit = false;
        this.inital_contact_values();
        const new_contact = res.contact;
        this.contacts.map((item)=>{
          if(item._id === new_contact._id){
            item.name = new_contact.name;
            item.phone = new_contact.phone;
            item.address = new_contact.address;
            item.notes = new_contact.notes;
          }
        })
       },(err)=>{
         alert("Something Wrong")
       })
    }

    // Add Contact
    addContact(){
        this.contactService.add_contact({name:this.name,
                                        phone:this.phone,
                                        address:this.address,
                                        notes:this.notes}).subscribe(res=>{
        this.inital_contact_values()
        this.add = false;

    },(err)=>{
      alert("Please add valid data")
    })
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

    serachByName(){
      this.contactService.search_by_name(this.search_name).subscribe(res=>{
        this.contacts = res.contacts;
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

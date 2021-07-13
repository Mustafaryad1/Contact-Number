import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts_url = 'http://127.0.0.1:3000/contacts'
  constructor(private http: HttpClient) { }

  get_contacts(){
    return this.http.get<any>(this.contacts_url+'/list')
  }

  add_contact(contact:any){
    return this.http.post<any>(this.contacts_url+'/add',contact)
  }

  update_contact(contact:any,id:any){
    return this.http.put<any>(this.contacts_url+`/update/${id}`,contact)
  }

  delete_contact(id:any){
    return this.http.delete<any>(this.contacts_url+`/delete/${id}`)
  }

}

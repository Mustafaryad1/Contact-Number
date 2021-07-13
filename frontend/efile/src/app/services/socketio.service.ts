import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket:Socket | undefined;
  constructor() { }
  connect(){
    this.socket = io('http://localhost:3000')
  }
}

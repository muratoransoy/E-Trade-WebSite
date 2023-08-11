import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // message(message: string, messageType: MessageType,
  //positionType: PositionType, 
  //delay: number = 3,dismissOthers: boolean = false)
  message(message: string, options: Partial<AlertifyOptions>){
    alertify.get('notifier','delay', options.delay);
    alertify.set('notifier','position', options.positionType);
    const msj = alertify[options.messageType](message);
    if(options.dismissOthers)
    msj.dismissOthers();
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Message; 
  positionType: PositionType = PositionType.BottomLeft;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Nofity = "nofity",
  Success = "success",
  Warning = "warning"
  
}

export enum PositionType {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
  
}


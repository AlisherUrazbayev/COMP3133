import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  firstname:string

  constructor() { }

  ngOnInit(): void {
  }

  btnClick():void{
    //console.log("Someone click me...")
    alert("Someone click me...")
  }

  // btnClick(event):void{
  //   console.log("Someone click me...")
  //   console.log(event)
  // }

}

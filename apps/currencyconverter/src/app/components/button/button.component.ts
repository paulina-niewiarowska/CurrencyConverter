import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'currencyconverter-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttontext!: string;
  @Output() buttonclick = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onClick(){
      this.buttonclick.emit();
  }

}

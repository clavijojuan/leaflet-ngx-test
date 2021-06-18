import { Component, ElementRef, EventEmitter, Input, OnChanges, SimpleChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modalprueba',
  templateUrl: './modalprueba.component.html',
  styleUrls: ['./modalprueba.component.scss']
})
export class ModalpruebaComponent implements OnInit, OnChanges {

  @Input() display: boolean;
  @Input() coords: any;
  @Input() onClose: () => void;
  @Input() data: any;
  test: any;
  @Output() saveData = new EventEmitter<any>();
  closable=false;

  @ViewChild('contentHTML') contentHTML: ElementRef;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void{
    if (changes.display && changes.display.currentValue && (this.data && this.data.length != 0)) {
      this.test = this.data[0].test
    }
  }

  saveDialog(): void {
    this.onClose();
    this.saveData.emit({'test': this.test, 'coords': this.coords});
    this.test ="";
    this.data=[];
  }

}

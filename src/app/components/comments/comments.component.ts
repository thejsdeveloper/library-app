import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  value = `
    Life before Death. 
    Strength before weakness. 
    Journey before Destination !!
    ~ Storm Light Archive By Brandon Sanderson
  `;
  constructor() {}

  ngOnInit() {}

  onChange(val: string) {
    this.value = val;
  }
}

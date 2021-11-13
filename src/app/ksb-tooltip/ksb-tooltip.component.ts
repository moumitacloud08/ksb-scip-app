import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksb-tooltip',
  templateUrl: './ksb-tooltip.component.html',
  styleUrls: ['./ksb-tooltip.component.css']
})
export class KsbTooltipComponent implements OnInit {
  @Input() tooltipText: string;
  @Input() showTooltip: false;
  crossImg = 'assets/images/warning-cross-icon.png';
  constructor() { }

  ngOnInit(): void {
  }

}

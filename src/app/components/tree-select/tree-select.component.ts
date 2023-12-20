import { Component, Input } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrl: './tree-select.component.scss'
})
export class TreeSelectComponent {
  @Input() formGroupItem:FormGroup; 
  expandKeys = ['0-0'];
  value?: string;
  nodes = [
    {
      title: 'Công ty cổ phần Orenda',
      value: '1',
      key: '0-0',
      children: [
        {
          title: '-- Khối văn phòng',
          value: '2',
          key: '0-0-1',
          children: [
            {
              title: '---- Phòng CNTT',
              value: '3',
              key: '0-0-1'
            },
            {
              title: '---- Phòng hành chính nhân sự',
              value: '4',
              key: '0-0-2'
            }
          ]
        },
        {
          title: '-- Khối kinh doanh và Marketing',
          value: '5',
          key: '0-0-2',
          children: [
            {
              title: '---- Phòng kinh doanh',
              value: '6',
              key: '0-0-1'
            },
            {
              title: '---- Phòng CMD',
              value: '7',
              key: '0-0-2'
            }
          ]
        }
      ]
    },
  
  ];

  onExpandChange(e: NzFormatEmitEvent): void {
    const node = e.node;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
      this.loadNode().then(data => {
        node.addChildren(data);
      });
    }
  }

  loadNode(): Promise<NzTreeNodeOptions[]> {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve([
            { title: 'Child Node', key: `${new Date().getTime()}-0` },
            { title: 'Child Node', key: `${new Date().getTime()}-1` }
          ]),
        1000
      );
    });
  }
}

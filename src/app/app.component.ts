import { Component } from '@angular/core';
import { ProcessDataFromClipboardParams } from 'ag-grid-community/dist/lib/entities/gridOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  private gridApi;
  private gridColumnApi;

  dataAdded: string[] = [];
  constructor() {
    this.processDataFromClipboard = this.processDataFromClipboard.bind(this);
  }
  defaultColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
    columnDefs = [
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ];
 columnIndexMapping = {
   0: 'make',
   1: 'model',
   2: 'price'
 }
    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];

    refresh() {

    }

    add() {

    }
    onCellValueChanged(){

    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.setSuppressClipboardPaste(false);
    }
    
    processDataFromClipboard(params: ProcessDataFromClipboardParams) {
     if (params.data.length > 0) {
      var rows = []; 

      params.data.forEach(item => {
        let i = 0;
        let row ={};
        item.forEach(element => {
          row[this.columnIndexMapping[i]] = element;  
          i++;
        });
        
        rows.push(row);
        
       })
       
      }

      this.rowData = this.rowData.concat(rows);
      return rows;
    }

     onPasteStart(params) {
      console.log('Callback onPasteStart:', params);
    }
    
     onPasteEnd(params) {
      console.log('Callback onPasteEnd:', params);
    }
    
}
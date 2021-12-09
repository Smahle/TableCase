import { Component} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { TableUnits } from '../tableUnit';
import { TableUnitService } from '../tableUnitService';

/* name og age blir rød når en submitter selv om dataen går gjennom */

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  tableUnits: TableUnits[] = [];
  dataForm: FormGroup;
  control = new FormControl;

  /* validerer for heltall */
  constructor(private tableService: TableUnitService, public fb: FormBuilder) {
    this.dataForm = this.fb.group({
      name: [''],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      lutefiskElsker: [''],
      birthDay: ['']
    })
  }

  add(form: any): void {
    this.tableService.addTableUnit(form as TableUnits)
      .subscribe(tableUnit => {
        this.tableUnits.push(tableUnit);
      })
  }


}

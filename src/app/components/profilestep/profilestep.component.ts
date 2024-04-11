import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';


@Component({
  selector: 'app-profilestep',
  templateUrl: './profilestep.component.html',
  styleUrls: ['./profilestep.component.css'],
})
export class ProfilestepComponent implements OnInit {

  states: string[] = [];
  districts: string[] = [];
  state: string = '';
  form: FormGroup

  constructor(private service: StepperService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      state: ['', Validators.required],
      district: ['', Validators.required],
      phone: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.service.getStates().subscribe(
      states => {
        this.states = states;
      },
      error => {
        console.error('Error fetching states', error);
      }
    );
  }
  currentStep = 1;

  submit() {
    console.log(this.form.value);
  }

  selectState(e: any) {
    this.state = e.target.value;
    console.log(e.target.value);
    this.service.getDistrictsByState(e.target.value).subscribe(
      districts => {
        console.log("districts are", districts);
        this.districts = districts;
      },
      error => {
        console.error('Error fetching states', error);
      }
    );
  }

  selectDistrict(e: any) {
    {
      console.log(e.target.value);
    }

  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}

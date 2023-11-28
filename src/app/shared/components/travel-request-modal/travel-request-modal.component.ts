import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-travel-request-modal',
  templateUrl: './travel-request-modal.component.html',
  styleUrls: ['./travel-request-modal.component.scss'],
})
export class TravelRequestModalComponent  implements OnInit {
  travelRequestForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {}

  ngOnInit() {
    this.travelRequestForm = this.formBuilder.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureTime: ['', Validators.required],
      costPerPerson: ['', [Validators.required, Validators.min(1)]],
      maxCost: ['', [Validators.required, Validators.min(1)]]
    });
  }

  submitRequest() {
    if (this.travelRequestForm.valid) {
      console.log(this.travelRequestForm.value);

      this.dismissModal();    
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}

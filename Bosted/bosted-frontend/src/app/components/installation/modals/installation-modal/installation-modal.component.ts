import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Installation } from 'src/app/models/installation.model';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'app-installation-modal',
  templateUrl: './installation-modal.component.html',
  styleUrls: ['./installation-modal.component.scss'],
})
export class InstallationModalComponent implements OnInit {
  @Input() installation?: Installation;

  public createInstallationForm: FormGroup;
  public installations: Installation[];

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private installationService: InstallationService
  ) {}

  ngOnInit(): void {
    this.createInstallationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.updateInstallationList();
  }

  public createInstallation() {
    this.installationService
      .create(this.createInstallationForm.value)
      .subscribe((response) => {
        this.updateInstallationList();
      });
  }

  public chooseInstallation(installationId: string) {
    this.installation = this.installations.find(
      (installation: Installation) => {
        return installation.id === installationId;
      }
    );

    this.close();
  }

  public dismiss() {
    this.activeModal.dismiss('Cancel click');
  }

  private close() {
    this.activeModal.close(this.installation);
  }

  private updateInstallationList(): void {
    this.installationService
      .getAll()
      .subscribe((installations: Installation[]) => {
        this.installations = installations;
      });
  }

  public get nameControl(): AbstractControl {
    return this.createInstallationForm.get('name');
  }

  public get addressControl(): AbstractControl {
    return this.createInstallationForm.get('address');
  }
}

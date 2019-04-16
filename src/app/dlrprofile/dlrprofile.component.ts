import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from '../../environments/environment';

import { DealerdbService } from '../_services/dealerdb.service';
import { IDealer } from '../_models/dealer';
import { CookieService } from 'ngx-cookie';

const PHONE_REGEX = /^[0-9]+$/;

@Component({
  selector: 'app-taxinfo',
  templateUrl: './dlrprofile.component.html',
  styleUrls: ['./dlrprofile.component.css']
})
export class DlrprofileComponent implements OnInit {

  dlrForm: FormGroup;
  errorMessage: string;
  dealerId: number;
  updatedBy: number;
  dealer: IDealer;
  loading = false;

  constructor(private fb: FormBuilder,
              private dealerService: DealerdbService,
              private cookieService: CookieService) { }

  ngOnInit() {
    if (!environment.production) {
      this.cookieService.put(environment.COOKIE_PROFILE_DEALER_ID, '14927');
      this.cookieService.put(environment.COOKIE_PROFILE_USER_ID, '288');
    }

    this.dealerId = +this.cookieService.get(environment.COOKIE_PROFILE_DEALER_ID);
    this.updatedBy = +this.cookieService.get(environment.COOKIE_PROFILE_USER_ID);
    this.cookieService.remove(environment.COOKIE_PROFILE_DEALER_ID);
    this.cookieService.remove(environment.COOKIE_PROFILE_USER_ID);

    this.buildForm();

    this.loading = true;
    this.dealerService.getDealer(this.dealerId).subscribe(
      dealer => {
        this.dealer = dealer;
        this.loading = false;
        if (this.dealer.DlrPhone) { this.dealer.DlrPhone = this.replaceAll(this.dealer.DlrPhone, '-', ''); }
        if (this.dealer.DlrFax) { this.dealer.DlrFax = this.replaceAll(this.dealer.DlrFax, '-', ''); }
        this.dlrForm.patchValue({
          stateSalesTax: dealer.DlrSaleTaxPer,
          countyTax: dealer.DlrCntyTaxPer,
          specialRule: dealer.DlrSpecialRule,
          specialRuleDescr: dealer.DlrSpecialRuleDescr,
          phone: dealer.DlrPhone,
          fax: dealer.DlrFax,
          firstName: dealer.DlrContactFirstName,
          lastName: dealer.DlrContactLastName,
          email: dealer.DlrContactEmail
        });
      },
      error => {
        this.loading = false;
        this.errorMessage = error;
      });
  }

  buildForm(): void {

    this.dlrForm = this.fb.group({
      firstName: [null, [Validators.max(20)]],
      lastName: [null, [Validators.max(20)]],
      stateSalesTax: [null, [Validators.max(10), Validators.min(0)]],
      countyTax: [null, [Validators.max(10), Validators.min(0)]],
      specialRule: [null, [Validators.max(5000), Validators.min(0)]],
      specialRuleDescr: [null],
      phone: [null, this.validatePhone.bind(this)],
      fax: [null, this.validatePhone.bind(this)],
      email: [null, Validators.email]
    });
  }

  onSubmit(dealerForm) {
    // let d = new Dealer();
    const d = {} as IDealer;
    d.ID = +this.dealerId;
    d.DlrSaleTaxPer = dealerForm.stateSalesTax;
    d.DlrCntyTaxPer = dealerForm.countyTax;
    d.DlrSpecialRule = dealerForm.specialRule;
    d.DlrSpecialRuleDescr = dealerForm.specialRuleDescr;
    d.DlrPhone = dealerForm.phone;
    d.DlrFax = dealerForm.fax;
    d.DlrContactFirstName = dealerForm.firstName;
    d.DlrContactLastName = dealerForm.lastName;
    d.DlrUpdatedBy = this.updatedBy;
    d.DlrContactEmail = dealerForm.email;

    this.loading = true;
    this.dealerService.putDealer(d).subscribe(
      dealer => {
        this.loading = false;
        window.close();
      },
      error => {
        this.loading = false;
        this.errorMessage = error.errMsg;
      });
  }

  // if all fields are blank, return false
  isFormValid(): boolean {
    if (!this.salesTax
      && !this.countyTax
      && !this.specialRule
      && !this.phone
      && !this.fax) {
      return false;
    } else { return true; }
  }

  get f() { return this.dlrForm.controls; }
  get salesTax(): string {
    return this.dlrForm.get('stateSalesTax').value;
  }
  get countyTax(): string {
    return this.dlrForm.get('countyTax').value;
  }
  get specialRule(): string {
     return this.dlrForm.get('specialRule').value;
  }
  get phone(): string {
     return this.dlrForm.get('phone').value;
  }
  get fax(): string {
    return this.dlrForm.get('fax').value;
  }

  // Without a mask control, we require a 10 digit number.
  // The API will add the hyphens (xxx-xxx-xxxx) since that is how phone numbers are stored in the db.
  validatePhone(c: AbstractControl): { [key: string]: boolean | null } {

    if (!c.value) {
      return null;
    }
    if (c.value !== undefined) {
      const strLength: number = (c.value as string).length;
      if (strLength !== 10) {
        return { error: true };
      }

      if (isNaN(c.value)) {
        return { error: true };
      }

      return null;
    }
    return null;
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

}

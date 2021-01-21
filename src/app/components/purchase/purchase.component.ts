import { Component,OnChanges, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import {MenuItem} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Purchase } from 'src/app/models/Purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit,OnChanges {
  items: MenuItem[];
  itemsPremium : MenuItem[];
  active: number = 0;
  date1: Date;
  expirationDate ="";
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  purchaseForm: FormGroup;
  confForm: FormGroup;
  user: User;
  returnUrl: string;
  submitted = false;
  loading = false;
  purchase : Purchase = new Purchase();
  es: any;
  credit: any;
  isDisabled: boolean = true;
  wrongCode: boolean = true;
  errorMessage = "Code is incorrect, please try again!"

  invalidDates: Array<Date>
  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private purchaseService : PurchaseService,
    private auth : AuthenticationService,
    private messageService: MessageService) {
      this.user = this.auth.currentUserValue;
    }

  ngOnInit() {

    this.purchaseForm = this.formBuilder.group({
      cardno: ['', [Validators.required, Validators.maxLength(16)]],
      name: ['', Validators.required],
      date: ['', Validators.required],
      cvc: ['', [Validators.required, Validators.maxLength(3)]]
    });

    this.confForm = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.items = [{
            label: 'Premium Administrator',
            visible: false
        },
        {
            label: 'Payment Information',
            visible: true
        },
        {
            label: 'Mail Confirmation',
            visible:true,
        },
        {
            label: 'Confirmation',
            visible:true,
        },

    ];

    this.itemsPremium = [{
      label: 'Take Credit',
      visible: false
  },
  {
      label: 'Credit Selection',
      visible: true
  },
  {
      label: 'Mail Confirmation',
      visible:true,
  },
  {
      label: 'Confirmation',
      visible:true,
  },

];

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];
  }
  get f_purchase() { return this.purchaseForm.controls; }
  get f_conf() { return this.confForm.controls; }

  ngOnChanges(){
      this.items = [{
        label: 'Premium Administrator',
        visible: false
    },
    {
        label: 'Payment Information',
        visible: true
    },
    {
      label: 'Confirmation',
      visible:true,
    },
    {
        label: 'Confirmation',
        visible:true,
    },
    ];
}
  // onChangeDate(){

  //   this.expirationDate = this.datepipe.transform(this.date1, 'DD/MM/YY');
  //   console.log("date1", this.expirationDate)
  // }

  nextPage(index : number){

      if(index == 2){
        this.purchaseService.postUser().subscribe(
          item => {
          }
        );
      }

      if(index == 3 && (this.confForm.invalid || !this.wrongCode))
        return;

      if(index == 2 && this.purchaseForm.invalid)
        return;

      this.items[index].visible = false;
      this.items[index - 1].visible = true;
      this.active = index;

  }

  onSubmitCon() {
    this.submitted = true;

    this.purchaseService.postPurchase(this.f_conf.code.value,this.purchase).subscribe(
      data => {

        if(data && data["error"])
        {
            this.wrongCode = false
            this.nextPage(2)

         }
        else
        {
            this.wrongCode = true
            this.nextPage(3)
            this.auth.logout()
        }
      }
    );
  }

  onSubmitPurchase() {
    this.submitted = true;
    this.purchase.cardno = this.f_purchase.cardno.value;
    this.purchase.name = this.f_purchase.name.value;
    this.purchase.date = this.f_purchase.date.value;
    this.purchase.cvc = this.f_purchase.cvc.value;
  }

  selectCredit(index, credit){

    if(index == 2){
      this.purchaseService.postCredit(credit).subscribe(
        item => {
        }
      );
    }

    if(index == 3 && (this.confForm.invalid || !this.wrongCode))
        return;



    this.itemsPremium[index].visible = false;
    this.itemsPremium[index - 1].visible = true;
    this.active = index;

  }

  onSubmitPremium(){

    this.submitted = true;

    this.purchaseService.premiumPurchase(this.f_conf.code.value,this.credit).subscribe(
      data => {

        if(data && data["error"])
        {
            this.wrongCode = false
            this.selectCredit(2,this.credit)

         }
        else
        {
            this.wrongCode = true
            this.selectCredit(3,this.credit)
        }
      }
    );

  }
}

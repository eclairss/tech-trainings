import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";
import {
  MSG_ADD_RECORD,
  MSG_ADD_TITLE,
  MSG_CANCEL,
  MSG_CANCEL_UPDATEADD,
  MSG_DELETE_RECORD,
  MSG_DELETE_TITLE,
  MSG_UPDATE_RECORD,
  MSG_UPDATE_TITLE,
} from "src/app/global/constants/constants";
import { ConfirmationModalHelper } from "src/app/global/helpers/confirmation-modal-helper";
import { ValidationHelper } from "src/app/global/helpers/validation-helper";
import { LaunchPlan } from "src/app/models/launchplan";
import { Rocket } from "src/app/models/rocket";
import { SpaceXService } from "src/app/services/api/space-x.service";
import { LaunchPlanService } from "src/app/services/launch-plan.service";
import { CustomValidators } from "./../../global/Validators/customValidators";

@Component({
  selector: "app-form-launcher",
  templateUrl: "./form-launcher.component.html",
  styleUrls: ["./form-launcher.component.css"],
})
export class FormLauncherComponent implements OnInit {
  launches: Observable<LaunchPlan[]>;
  ddlRockets: Rocket[];
  ddlShips: string[];
  ddlLaunchStatus = ["Success", "Fail"];

  public launchPlan = new LaunchPlan(0, "", "", "", new Date(), 1);
  public launchPlanFormGroup: FormGroup;
  public isCreatingNewLaunch: boolean = true;

  currentDate: NgbDateStruct;
  state$: Observable<object>;

  get currentDatePlaceHolder(): string {
    return `${this.currentDate.year}/${this.currentDate.month}/${this.currentDate.day}`;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private launchPlanService: LaunchPlanService,
    private spacexService: SpaceXService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.launches = this.launchPlanService.launchPlans$;
    const id = this.route.snapshot.params["id"];
    this.initializeLaunchFormValue(id);
    console.log(this.ddlLaunchStatus);

    // this.createForm();
  }

  initializeLaunchFormValue(id: number) {
    if (id > 0) {
      this.launchPlanService.GetByID(id).subscribe(
        (data) => {
          if (data) {
            this.launchPlan = data;
            this.createForm();
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      const nextFlightNumber =
        this.launchPlanService.launchPlans[
          this.launchPlanService.launchPlans.length - 1
        ]?.id + 1;
      this.launchPlan = new LaunchPlan(
        nextFlightNumber,
        "",
        "",
        "",
        new Date(),
        0
      );

      const date: Date = new Date();
      this.launchPlan.LaunchDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      this.createForm();
    }
  }

  createForm() {
    this.preLoadDropDownMenus();

    if (this.launchPlan.id > 0) {
      const date: Date = new Date(this.launchPlan.LaunchDate);
      this.currentDate = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    } else {
      const date: Date = new Date();
      this.currentDate = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    }

    this.launchPlanFormGroup = this.formBuilder.group({
      // flightnumber: [this.launchPlan.FlightNumber || 0, [Validators.required, Validators.min(1)]], //--removing as this should be auto-incremented
      missionname: [
        this.launchPlan.MissionName || "",
        [Validators.required, Validators.maxLength(50)],
      ],
      missionid: [
        this.launchPlan.MissionID || Guid.create(),
        [Validators.required],
      ],
      details: [
        this.launchPlan.Details || "",
        [Validators.required, Validators.maxLength(500)],
      ],
      launchdate: [
        this.currentDate,
        [Validators.required, CustomValidators.launchDateValidate()],
      ],
      launchWindow: [
        this.launchPlan.LaunchedWindow,
        [Validators.required, Validators.min(1)],
      ],
      launchSuccess: [this.launchPlan.LaunchSuccess || null],
      // launchSite: [this.launchPlan.LaunchSite, [Validators.required]],
      // launchStatusDetails -- to set during launching
      rocket: [this.launchPlan.Rocket],
      ships: [this.launchPlan.Ships],
      payloads: [this.launchPlan.Payloads],
    });
  }

  preLoadDropDownMenus() {
    this.ddlRockets = this.spacexService.rockets;
  }

  deleteRecord() {
    if (this.launchPlan.id) {
      ConfirmationModalHelper.openConfirmationModal(
        this.modalService,
        MSG_DELETE_TITLE,
        MSG_DELETE_RECORD
      ).then((response) => {
        if (response == "YES") {
          this.launchPlanService.Delete(this.launchPlan);
        }
      });
    }
  }

  cancelChanges() {
    ConfirmationModalHelper.openConfirmationModal(
      this.modalService,
      MSG_CANCEL,
      MSG_CANCEL_UPDATEADD
    ).then((response) => {
      if (response == "YES") {
        this.router.navigate([""]);
      }
    });
  }

  onFormSubmit() {
    if (this.launchPlanFormGroup.valid) {
      const modalTitle = this.launchPlan.id ? MSG_UPDATE_TITLE : MSG_ADD_TITLE;
      const modalMessage = this.launchPlan.id
        ? MSG_UPDATE_RECORD
        : MSG_ADD_RECORD;
      ConfirmationModalHelper.openConfirmationModal(
        this.modalService,
        modalTitle,
        modalMessage
      ).then((response) => {
        debugger;
        if (response == "YES") {
          const formValue = this.launchPlanFormGroup.value;

          let objLaunchDate = formValue.launchdate;

          if (this.launchPlan.id) {
            // UPDATE
            this.launchPlan.FlightNumber = formValue.flightnumber;
            this.launchPlan.MissionName = formValue.missionname;
            this.launchPlan.Details = formValue.details;
            this.launchPlan.LaunchSuccess = formValue.launchSuccess;
            this.launchPlan.LaunchDate = new Date(
              objLaunchDate["year"],
              objLaunchDate["month"],
              objLaunchDate["day"]
            );

            this.launchPlanService.Update(this.launchPlan).subscribe((data) => {
              console.log(data);
              this.router.navigate([""]);
            });
          } else {
            // NEW
            const newLaunchPlan = new LaunchPlan(
              formValue.flightnumber,
              formValue.missionname,
              formValue.missionid.value,
              formValue.details,
              new Date(
                objLaunchDate["year"],
                objLaunchDate["month"],
                objLaunchDate["day"]
              ),
              1
            );

            newLaunchPlan.LaunchSuccess = null; //set to NULL for PENDING
            this.launchPlanService.Create(newLaunchPlan).subscribe((data) => {
              this.router.navigate([""]);
            });
          }
          this.launchPlanFormGroup.reset();
        }
      });
    } else {
      ValidationHelper.validateAllFormFields(this.launchPlanFormGroup);
    }
  }
}

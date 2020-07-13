import { Component, OnInit, Input } from '@angular/core';
import { LaunchPlan } from 'src/app/models/launchplan';
import { LaunchPlanService } from 'src/app/services/launch-plan.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'launch-plan-item',
  templateUrl: './launch-plan-item.component.html',
  styleUrls: ['./launch-plan-item.component.css']
})
export class LaunchPlanItemComponent implements OnInit {

  @Input("model") model: LaunchPlan;

  imgSrc: string = "";

  constructor(private route: Router, private launchPlanService: LaunchPlanService) { }

  ngOnInit() {
    this.loadImage();
  }


  enableDelete()
  {
    let today: Date = new Date(Date.now());
    return new Date(this.model.LaunchDate) > today;
  }

  loadImage() {
    if(this.model.Rocket !== undefined)
    {
      if(this.model.Payloads.length > 0)
        this.imgSrc = "../assets/images/SpaceX/rocket-payload--img.png";
        else
        this.imgSrc = "../assets/images/SpaceX/rocket--img.png"
    } else {
      this.imgSrc = "../assets/images/SpaceX/ship--img.png";
    }
  }

  deletePlan()
  {
    //todo -- prompt to confirm
    if(confirm("Are you sure you want to delete this launch plan?"))
    {
      console.log("plan deleted", this.model);
      this.launchPlanService.Delete(this.model);
    }
  }

  loadDetails()
  {
    console.log()
    this.route.navigate(['launchplan', this.model.id]);
  }
}

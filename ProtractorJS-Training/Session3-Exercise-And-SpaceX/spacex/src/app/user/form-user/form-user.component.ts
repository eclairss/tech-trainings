import { LaunchSite } from './../../models/launchsite';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ValidationHelper } from 'src/app/global/helpers/validation-helper';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/app/models/enums/userrole';

@Component({
  selector: 'form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  @Input() currentUser: User;
  @Output() saveUser = new EventEmitter<User>();
  userRoles = UserRoles.userRoles;

  myForm: FormGroup
  userId: number;
  users: User[];
  formUser: User;
  userCount: number;
  user: Observable<User>;

  constructor(private fb: FormBuilder, private _currentUser: UserService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.myForm = this.fb.group({
      id: [this.currentUser.id || 0],
      FirstName: [this.currentUser.FirstName || '', [Validators.required, Validators.maxLength(50)]],
      LastName: [this.currentUser.LastName || '', [Validators.required, Validators.maxLength(50)]],
      UserName: [this.currentUser.Username || '', [Validators.required, Validators.maxLength(20)]],
      Password: [this.currentUser.Password || '', [Validators.required, Validators.maxLength(50)]],
      EmailAddress: [this.currentUser.EmailAddress || '', [Validators.required, Validators.email]],
      Role: [this.currentUser.id ? null : this.currentUser.UserRole]
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;

      this.currentUser.FirstName = formValue.FirstName;
      this.currentUser.LastName = formValue.LastName;
      this.currentUser.Username = formValue.UserName;
      this.currentUser.Password = formValue.Password;
      this.currentUser.EmailAddress = formValue.EmailAddress;
      this.currentUser.UserRole = formValue.Role ? formValue.Role : 1;

      this.saveUser.emit(this.currentUser);
    } else {
      ValidationHelper.validateAllFormFields(this.myForm);
    }
  }
}

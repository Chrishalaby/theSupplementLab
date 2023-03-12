import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Contact {
  placeholder: string;
  name: string;
  phoneNumber: number;
  email: string;
  message: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contact!: Contact;
  contactForm!: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      placeHolder: 'Contact Form',
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    console.log(this.contactForm.value);
    const url = 'https://formspree.io/f/xrgvlkjl';
    this.http.post(url, this.contactForm.value).subscribe(() => alert('Message sent!'));
  }

}

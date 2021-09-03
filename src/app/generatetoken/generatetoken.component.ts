import { Component, OnInit } from '@angular/core';
import { AppComponent } from '.././app.component';
import { GeneratetokenService } from '.././generatetoken.service';
import { Message } from '.././message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generatetoken',
  templateUrl: './generatetoken.component.html',
  styleUrls: ['./generatetoken.component.css'],
})
export class GeneratetokenComponent implements OnInit {
  constructor(
    public appComponent: AppComponent,
    private generatetokenService: GeneratetokenService,
    private router: Router
  ) {
    appComponent.isLoggenIn = false;
    appComponent.isGenerateTokenPage = true;
  }
  imageSrc = 'assets/Image/MaskGroup2.png';
  imageAlt = 'Token';
  iconSrc = 'assets/Image/Image 14.png';
  iconAlt = 'KSB';
  isGenerated: boolean = false;
  response: any;
  message: string = '';
  responseCode: string='';

  generateToken() {
    // this.router.navigateByUrl('/login');
    this.generatetokenService.generateToken().subscribe(
      (response) => {
        this.response = JSON.parse(JSON.stringify(response));
        console.log(this.response);
        this.responseCode = this.response.code;
        if (this.response.code == 200) {
          this.isGenerated = true;
          this.message = this.response.message;
          this.router.navigateByUrl('/login');
        } else if (this.response.code == 400) {
          this.isGenerated = false;
          this.message = 'Login Failed';
        } else {
          this.isGenerated = false;
          this.message = 'Login Failed';
        }
      },
      (err) => {}
    );
  }
  ngOnInit(): void {}
}

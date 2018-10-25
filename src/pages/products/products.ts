import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaserestProvider } from '../../providers/firebaserest/firebaserest';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  validations_form: FormGroup;
  errorMessage: string = '';
  validation_messages = {
    'email': [
      { type: 'required', message: 'Se requiere un correo.' },
      { type: 'pattern', message: 'Ingresar un correo Valido.' }
    ],
    'password': [
      { type: 'required', message: 'Se requiere contraseña.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
    ]
  };

  constructor(
    public navCtrl: NavController,
    private authService: FirebaserestProvider,
    private formBuilder: FormBuilder
    ) {
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }*/

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.navCtrl.push(HomePage);
    }, err => {
      this.errorMessage = err.message;
    })
  }
    goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}



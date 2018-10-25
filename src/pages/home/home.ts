import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
//import { FirebaserestProvider } from '../../providers/firebaserest/firebaserest';
import { ProductsPage } from '../products/products';
import { DetailsPage } from '../details/details';
import { TaskModalPage } from '../task-modal/task-modal';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  items: Array<any>;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     /*private firebaseService: FirebaserestProvider*/
     private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  /*ionViewWillEnter(){
    this.getData();
  }
  getData(){
    this.firebaseService.getTasks()
    .then(tasks => {
      this.items = tasks;
    })
  }*/
  viewDetails(id, item){
    let data = {
      title: item.title,
      description: item.description,
      image: item.image,
      id: id
    }
    this.navCtrl.push(DetailsPage, {
      data: data
    })
  }
  /*openNewUserModal(){
    let modal = this.modalCtrl.create(TaskModalPage);
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }

  logout(){
    this.firebaseService.doLogout()
    .then(res => {
      this.navCtrl.push(ProductsPage);
    })
  }*/

  /*ionViewWillLoad() {
    console.log("Entro");
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toast.create({
          message: 'Bienvenido ${data.email} a esta APP',
          duration: 2000
        }).present();
      }else{
        this.toast.create({
          message: 'Fallo en la autenticacion',
          duration: 2000
        }).present();
      }
    });
  }

  async cerrarSesion(){
    if(this.afAuth.auth.currentUser){
      await this.afAuth.auth.signOut()
          .then(() => {
            this.navCtrl.setRoot("LoginPage");
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }

  agregarProducto(){
    this.navCtrl.push("AgregarProductoPage");
  }

  /*createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afAuth.auth.collection('people').doc(currentUser.uid).collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }*/
}

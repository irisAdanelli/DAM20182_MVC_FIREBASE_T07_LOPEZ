import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//import { of } from 'rxjs';
//import { map, take } from 'rxjs/operators';
//import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database'
import 'firebase/storage'
/*
Generated class for the FirebaserestProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class FirebaserestProvider {
private snapshotChangesSubscription: any;
  constructor(
    public http: HttpClient,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,) {
      console.log('Hello FirebaserestProvider Provider');
    }


    /*doRegister(value){
      return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
        });
      }

      doLogin(value){
        return new Promise<any>((resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(
            res => resolve(res),
            err => reject(err))
          });
        }*/

        doLogout(){
          return new Promise((resolve, reject) => {
            if(firebase.auth().currentUser){
              firebase.auth().signOut()
              .then(() => {
                this.unsubscribeOnLogOut();
                resolve();
              }).catch((error) => {
                reject();
              });
            }
          });
        }

        /* API REST*/
        getTasks(){
          return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.snapshotChangesSubscription = this.afs.collection('user').doc(currentUser.uid).collection('tareas').snapshotChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            })
          });
        }

        unsubscribeOnLogOut(){
          this.snapshotChangesSubscription.unsubscribe();
        }

        updateTask(taskKey, value){
          return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('user').doc(currentUser.uid).collection('tareas').doc(taskKey).set(value)
            .then(
              res => resolve(res),
              err => reject(err)
            )
          })
        }

        deleteTask(taskKey){
          return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('user').doc(currentUser.uid).collection('tareas').doc(taskKey).delete()
            .then(
              res => resolve(res),
              err => reject(err)
            )
          })
        }

        createTask(value){
          return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('user').doc(currentUser.uid).collection('tareas').add({
              title: value.title,
              description: value.description,
              image: value.image
            })
            .then(
              res => resolve(res),
              err => reject(err)
            )
          })
        }

        encodeImageUri(imageUri, callback) {
          var c = document.createElement('canvas');
          var ctx = c.getContext("2d");
          var img = new Image();
          img.onload = function () {
            var aux:any = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL);
          };
          img.src = imageUri;
        };

        uploadImage(imageURI, randomId){
          return new Promise<any>((resolve, reject) => {
            let storageRef = firebase.storage().ref();
            let imageRef = storageRef.child('image').child(randomId);
            this.encodeImageUri(imageURI, function(image64){
              imageRef.putString(image64, 'data_url')
              .then(snapshot => {
                snapshot.ref.getDownloadURL()
                .then(res => resolve(res))
              }, err => {
                reject(err);
              })
            })
          })
        }
      }

import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { isNgContent } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  title = "Grocery"
  public alertButtons = ['Add', 'Cancel'];
  public alertInputs = [{placeholder: 'Name'}, {placeholder: 'Quantity'}];


  items = [
    { name: "Milk", quantity: 2 },
    { name: "Eggs", quantity: 3 },
    { name: "Bread", quantity: 2 },
    { name: "Cereal", quantity: 1 },
  ];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) { }

  async removeItem(item, i) {
    console.log("Removing item")
    const toast = this.toastCtrl.create({
      message: "Removing item - " + i + "...",
      duration: 3000
    });
    (await toast).present();
    this.items.splice(i, 1)
  }


  async editItem(item, i) {
    console.log("Editing item")
    const toast = this.toastCtrl.create({
      message: "Editing item - " + i + "...",
      duration: 3000
    });
    (await toast).present();
    this.showEditItemPrompt(item, i)
  }

  async addItem() {
    console.log("Adding item")
    this.showAddItemPrompt();

  }
  async showAddItemPrompt() {
    const prompt = await this.alertCtrl.create({
      header: 'Add Item',
      message: "Enter an item to add",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name' // Corrected placeholder to 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Canceling item');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Adding item', item);
            this.items.push(item)
            // Here, you can access the input values using data.Name and data.Quantity
          }
        },
      ]
    });
  






    await prompt.present();
  }


  async showEditItemPrompt(item, index) {
    const prompt = await this.alertCtrl.create({
      header: 'Edit Item',
      message: "Enter an item to edit",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name', // Corrected placeholder to 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Canceling item');
          }
        },
        {
          text: 'Add',
          handler: item => {
            console.log('Editing item', item);
            this.items[index] = item      
                  // Here, you can access the input values using data.Name and data.Quantity
          }
        },
      ]
    });
    await prompt.present();

  }
}

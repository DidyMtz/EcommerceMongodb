import { ProduitService } from './../../services/produit.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  produitForm!: FormGroup;
  allergeneForm!: FormGroup;
  categories : any[] = [];
  allergenes : any[] = [];
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };


  isLinear = false;

  constructor(private builder: FormBuilder, private produitservice: ProduitService) { }

  ngOnInit(): void {
    this.initForm();
    this.categories = this.produitservice.categorie;
    this.allergenes = this.produitservice.allergene;

    console.warn(this.allergeneForm.value);
    
    
  }

  initForm(){
    this.produitForm = new FormGroup({

      name        :new FormControl(),
      prix        :new FormControl(),
      description :new FormControl(),
      favori      :new FormControl(),
      categorie   :new FormControl(),
      discount    :new FormControl()
    });

    this.produitForm = this.builder.group({
      name : ['',[Validators.minLength(4),Validators.required]],
      prix : ['',Validators.required],     
      favori : ['',Validators.required],
      categorie : ['',Validators.required],
      description : ['',[Validators.minLength(10),Validators.maxLength(50), Validators.required]],
      discount : ['',Validators.required]
    });


    this.allergeneForm = this.builder.group({

     celeri : false,
     cereale : false,
     sesame  : false,
     noix   : false,
     oeuf   : false,
     anhydride: false,
     lait   : false,
     soja   : false,
     crustace : false,
     arachide : false,
     moutarde : false,
     poisson  : false,
     lupin    :false,
     mollusque   : false,




    })
                                     



  }
  

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  onSubmit(){

    console.warn(this.produitForm.value);
    
  }

 









}

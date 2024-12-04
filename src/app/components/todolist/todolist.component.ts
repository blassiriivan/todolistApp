import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {

  constructor() {
    this.load()
  }

  taskArray = [
    {
      taskName: "acheter du pain",
      isCompleted: false,
    }
  ]

  private save() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('task', JSON.stringify(this.taskArray));

    }
	}

  private load() {
    if (typeof localStorage !== 'undefined') {
      const taskData = localStorage.getItem('task');
      if (taskData) {
        this.taskArray = JSON.parse(taskData);
      } else {
        this.save(); // Sauvegarde initiale si aucune donnée n'est trouvée
      }
    }

  }



  onSubmit(form: NgForm) {
    console.log(form);
    this.taskArray.push({
      taskName: form.controls['tache'].value,
      isCompleted: false,
    })
    this.save();
    form.reset()

  }

  onDelete(id: number) {
    console.log(id);
    this.taskArray.splice(id, 1)
    this.save();
  }

  onCheck(id: number) {

    this.taskArray[id].isCompleted = !this.taskArray[id].isCompleted
    this.save();
    console.log(this.taskArray[id].isCompleted);

  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  user = {
    name: "", // Inicialize com uma string vazia
  };

  ngOnInit() {
      // Verifique se há um valor no Local Storage
      const userData = localStorage.getItem("user");
      if (userData) {
        // Parse do JSON armazenado no Local Storage para um objeto JavaScript
        const userObject = JSON.parse(userData);
        // Defina o nome do usuário e unidade com base nos dados do Local Storage
        this.user.name = userObject.nome_usuario;
      }
  }

}

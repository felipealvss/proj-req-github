
import api from './api'

class App{

   constructor(){

        this._repositories = [];
        this._FormElement = document.querySelector('#repo-form')
        this._listDocument = document.querySelector('#repo-list')
        this._inputElement = document.querySelector('input[name=repository]')
        this.registEvents()
    }

    registEvents(){

        this._FormElement.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event){
                
        event.preventDefault();

        try {

        const repositoryInput = this._inputElement.value;

        if(repositoryInput.lenght === 0)
            return;

        const response = await api.get(`/users/${repositoryInput}`)
        // console.log(response)
        const { name, bio, html_url, avatar_url } = response.data;

        this._repositories.push({

            name,
            bio,
            avatar_url,
            html_url
        })

        this._inputElement.value = '';

        this.render();
        
        } catch {

            alert('Repositório incorreto!')
        }
    }

    render(){

        this._listDocument.innerHTML = '';

        this._repositories.forEach( rep => {

            // Itens
            let imageDoc = document.createElement('img')
            imageDoc.setAttribute('src', rep.avatar_url)

            let nameDoc = document.createElement('strong')
            nameDoc.appendChild(document.createTextNode(rep.name))

            let bioDoc = document.createElement('p')
            bioDoc.appendChild(document.createTextNode(rep.bio))

            let htmlDoc = document.createElement('a')
            htmlDoc.setAttribute('href', rep.html_url)
            htmlDoc.setAttribute('target', '_blank')
            htmlDoc.appendChild(document.createTextNode('Acessar'))

            // LI
            let listItemElement = document.createElement('li')
            listItemElement.appendChild(imageDoc)
            listItemElement.appendChild(nameDoc)
            listItemElement.appendChild(bioDoc)
            listItemElement.appendChild(htmlDoc)

            // UL
            this._listDocument.appendChild(listItemElement)
        } )
    }
}

new App();

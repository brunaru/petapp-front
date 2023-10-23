const api = 'http://localhost:3000/'

function getClients() {
    document.getElementById('div-form-pet').classList.remove('show')
    document.getElementById('div-form-pet').classList.add('hide')
    axios.get(api + 'clients')
    .then(function(response) {
        const clients = response.data
        for(let client of clients) {
            addClient(client)
        }
        console.log(clients)
    })
    .catch(
        function (error) { 
            console.error(error) 
        })
}

function addClient(client) {
    const div = document.getElementById('div-clients')
    const container = document.createElement('div')
    container.classList.add('client-list')
    container.id = client.id

    const c = document.createElement('p')
    c.innerText = client.name + ', ' + client.document

    const view = document.createElement('spam')
    view.classList.add('material-symbols-outlined')
    view.innerText = 'pageview'
    view.setAttribute('onclick','getPets(' + client.id + ', "' + client.name + '")')
    const trash = document.createElement('spam')
    trash.classList.add('material-symbols-outlined')
    trash.innerText = 'delete'
    trash.setAttribute('onclick','deleteClient(' + client.id + ')')

    container.appendChild(c)
    container.appendChild(view)
    container.appendChild(trash)
    div.appendChild(container)
}

function postClient() {
    const name = document.getElementById('name').value
    const doc = document.getElementById('document').value
    axios.post(api + 'clients', {
        name: name,
        document: doc
      })
      .then(function (response) {
        console.log(response)
        addClient(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
}

function deleteClient(id) {
    axios.delete(api + 'clients/' + id
    ).then(function (response) {
        document.getElementById(id).remove()
    }).catch(function (error) {
        console.error(error)
    })
}

function getPets(clientId, clientName) {
    axios.get(api + 'clients/' + clientId + '/pets').then(function (response) {
        const pets = response.data

        const div = document.getElementById('div-client-pets')
        div.innerHTML = ''
        document.getElementById('div-form-pet').classList.remove('hide')
        document.getElementById('div-form-pet').classList.add('show')
        const h2 = document.createElement('h2')
        h2.innerText = 'Pets of ' + clientName
        div.appendChild(h2)
        const submit = document.getElementById('submit-pet')
        submit.setAttribute('onclick','postPet(' + clientId + ')')

        for (let pet of pets) {
            addPet(pet, div)
        }
        console.log(pets)
    }).catch(function (error) {
        console.error(error)
    })
}

function addPet(pet) {
    const div = document.getElementById('div-client-pets')
    const container = document.createElement('div')
    container.classList.add('pets-list')
    container.id = pet.id

    const p = document.createElement('p')
    p.innerText = pet.name + ', ' + pet.type + ', ' + pet.breed + ', ' + pet.birth

    container.appendChild(p)
    div.appendChild(container)
}

function postPet(clientId) {
    const name = document.getElementById('petname').value
    const type = document.getElementById('type').value
    const breed = document.getElementById('breed').value
    const birth = document.getElementById('birth').value
    console.log(clientId)
    axios.post(api + 'pets', {
        name: name,
        type: type,
        breed: breed,
        birth: birth,
        ClientId: clientId
      })
      .then(function (response) {
        console.log(response)
        addPet(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
}
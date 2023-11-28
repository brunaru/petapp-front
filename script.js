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
    const clientItem = document.createElement('p')
    clientItem.innerText = client.name + ', ' + client.document

    const viewButton = document.createElement('button')
    viewButton.innerText = 'Open'
    viewButton.setAttribute('onclick','getPets(' + client.id + ', "' + client.name + '")')

    const trashButton = document.createElement('button')
    trashButton.innerText = 'Delete'
    trashButton.setAttribute('onclick','deleteClient(' + client.id + ')')

    const container = document.createElement('div')
    container.classList.add('client-list')
    container.id = client.id
    container.appendChild(clientItem)
    container.appendChild(viewButton)
    container.appendChild(trashButton)

    const divClients = document.getElementById('div-clients')
    divClients.appendChild(container)
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
        document.getElementsByTagName('form')[0].reset()
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
    document.getElementById('div-form-pet').classList.remove('hide')
    document.getElementById('div-form-pet').classList.add('show')
    document.getElementById('submit-pet').setAttribute('onclick','postPet(' + clientId + ')')

    const divPets = document.getElementById('div-client-pets')
    divPets.innerHTML = ''

    axios.get(api + 'clients/' + clientId + '/pets').then(function (response) {
        const h2 = document.createElement('h2')
        h2.innerText = 'Pets of ' + clientName
        divPets.appendChild(h2)

        const pets = response.data
        for (let pet of pets) {
            addPet(pet)
        }
    }).catch(function (error) {
        console.error(error)
    })
}

function addPet(pet) {
    const p = document.createElement('p')
    p.innerText = pet.name + ', ' + pet.type + ', ' + pet.breed + ', ' + pet.birth
    const container = document.createElement('div')
    container.classList.add('pets-list')
    container.id = pet.id
    container.appendChild(p)
    document.getElementById('div-client-pets').appendChild(container)
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
        document.getElementsByTagName('form')[1].reset()
      })
      .catch(function (error) {
        console.log(error)
      })
}
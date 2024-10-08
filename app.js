let id = null

const apiUrl = "https://apilite.onrender.com"

async function getData() {
    const response = await fetch(`${apiUrl}/usuarios`)
    const data = await response.json()
    showData(data)
}

getData()

function showData(data) {
    const tbody = document.querySelector("tbody")
    tbody.innerHTML=""
    data.forEach((item) => {
        const tr = document.createElement("tr")

        const tdNome = document.createElement("td")
        tdNome.innerHTML = item.nome
        tr.appendChild(tdNome)

        const tdEmail = document.createElement("td")
        tdEmail.innerHTML = item.email
        tr.appendChild(tdEmail)

        const tddataNascimento = document.createElement("td")
        tddataNascimento.innerHTML = formatDate(item.dataNascimento)
        tr.appendChild(tddataNascimento)

        const tdAcoes = document.createElement("td")
        const imgDeletar = document.createElement("img")
        imgDeletar.src = "images/botao-apagar.png"
        imgDeletar.onclick = ()=>deleteData(item.id)
        tdAcoes.appendChild(imgDeletar)
        
        const imgEdit = document.createElement("img")
        imgEdit.src = "images/editar.png"
        imgEdit.onclick = ()=>handleEdit(item)
        tdAcoes.appendChild(imgEdit)

        tr.appendChild(tdAcoes)

        tbody.appendChild(tr)

    })
}

function formatDate(data) {
    const onlyDate = data.split("T")[0]
    const arrDate = onlyDate.split("-").reverse()
    const finalDate = arrDate.join("/")
    return finalDate
}

function handleSend(event){
    event.preventDefault()
    if(id){
        editData()
    }else{
        sendData()
    }
}

async function sendData(){
    const email = document.getElementById("email")
    const nome = document.getElementById("nome")
    const data = document.getElementById("data")
    const body = {
        nome:nome.value, 
        email:email.value,
        dataNascimento:data.value
    }
    const response = await fetch(`${apiUrl}/usuarios`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body)

    })
    if(response.status===200){
        nome.value = ""
        email.value = ""
        data.value = ""
        getData()
    } 
}
async function deleteData(id){
    const response = await fetch(`${apiUrl}/usuarios/${id}`,{
        method: "DELETE"
    })
    if(response.status===200){
        getData()
    }
}

function handleEdit(data){
    id=data.id
    const email = document.getElementById("email")
    const nome = document.getElementById("nome")
    const dataNascimento = document.getElementById("data")
    email.value = data.email
    nome.value = data.nome
    dataNascimento.value = formatDate(data.dataNascimento)

}

async function editData(){
    const email = document.getElementById("email")
    const nome = document.getElementById("nome")
    const data = document.getElementById("data")
    const body = {
        nome:nome.value, 
        email:email.value,
        dataNascimento:data.value
    }
    const response = await fetch(`${apiUrl}/usuarios/${id}`,{
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body)
    })
    if(response.status===200){
        nome.value = ""
        email.value = ""
        data.value = ""
        id=null
        getData()
    }
}



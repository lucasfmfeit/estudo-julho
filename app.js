async function getData() {
    const response = await fetch("http://localhost:3000/usuarios")
    const data = await response.json()
    showData(data)
}

getData()

function showData(data) {
    const tbody = document.querySelector("tbody")
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

        tbody.appendChild(tr)

    })
}

function formatDate(data) {
    const onlyDate = data.split("T")[0]
    const arrDate = onlyDate.split("-").reverse()
    const finalDate = arrDate.join("/")
    return finalDate
}

async function sendData(event){
    event.preventDefault()
    const email = document.getElementById("email").value
    const nome = document.getElementById("nome").value
    const data = document.getElementById("data").value
    const body = {
        nome:nome, 
        email:email,
        dataNascimento:data
    }
    const response = await fetch("http://localhost:3000/usuarios",{
        method: "POST",
        body: JSON.stringify(body)
    })
}


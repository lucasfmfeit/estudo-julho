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
        tddataNascimento.innerHTML = item.dataNascimento
        tr.appendChild(tddataNascimento)

        tbody.appendChild(tr)

    })
}

console.log('Funcionado');

const ul = document.querySelector('ul');

const pedirBlogs = async () => {
    const resp = await fetch('http://localhost:8080/api/articules');
    const data = await resp.json();
    console.log(data);

    data.articules.forEach(element => {
        const li = document.createElement('li');
        li.className = 'list-group-item'
        li.innerHTML = `
        <h4>${element.titel}</h4>
        <p>${element.content}</p>
        `;
        ul.appendChild(li)
    });
}

pedirBlogs();
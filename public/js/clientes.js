window.addEventListener('load', async () => {
  const resposta = await fetch('/clientes');
  const clientes = await resposta.json();

  if (clientes.auth === false) {
    window.location.href = '/index.html';
    return;
  }

  const divClientes = document.querySelector('#clientes');
  const tabela = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  let headerRow = document.createElement('tr');
  ['ID', 'Nome', 'Email', 'CPF', 'Data nascimento'].forEach(text => {
    let th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });

  clientes.forEach(cliente => {
    let row = document.createElement('tr');
    ['id', 'nome', 'email', 'cpf'].forEach(field => {
      let td = document.createElement('td');
      td.textContent = cliente[field];
      row.appendChild(td);
    });

    let td = document.createElement('td');
    td.textContent = new Date(cliente['data_nascimento']).toLocaleDateString();
    row.appendChild(td);

    tbody.appendChild(row);
  });

  thead.appendChild(headerRow);
  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  divClientes.appendChild(tabela);
})
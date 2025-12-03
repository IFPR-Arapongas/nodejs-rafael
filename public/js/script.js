const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const login = form.elements.email.value;
  const password = form.elements.password.value;

  const header = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: login, senha: password })
  }

  const resposta = await fetch('/login', header);
  const resultado = await resposta.json();

  if (resultado.auth) {
    window.location.href = '/clientes.html';
  } else {
    const divMensagem = document.querySelector('#mensagem');
    divMensagem.textContent = resultado.mensagem;
    divMensagem.style.display = 'block';
  }
})
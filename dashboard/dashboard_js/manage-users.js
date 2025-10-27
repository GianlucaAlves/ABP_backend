const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

// Carrega lista de usuários
async function loadUsers() {
  const res = await fetch("http://localhost:3000/admin/list", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 403) {
    alert("Acesso negado — apenas admins podem acessar esta página.");
    window.location.href = "dashboard.html";
    return;
  }

  const users = await res.json();
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${new Date(user.created_at).toLocaleDateString()}</td>
      <td><button onclick="deleteUser(${user.id})">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteUser(id) {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

  await fetch(`http://localhost:3000/admin/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  loadUsers();
}

document
  .getElementById("createUserForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    await fetch("http://localhost:3000/admin/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    e.target.reset();
    loadUsers();
  });

// Botão de sair
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

loadUsers();
const apiUrl = "http://localhost:3000/api/news";
const form = document.getElementById("newsForm");
const tableBody = document.getElementById("newsTableBody");
const idField = document.getElementById("newsId");
const titleField = document.getElementById("title");
const contentField = document.getElementById("content");
const imageField = document.getElementById("image_url");

// 🧭 Listar notícias
async function fetchNews() {
    tableBody.innerHTML = "";
    const res = await fetch(apiUrl);
    const news = await res.json();

    news.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
  <td>${item.id}</td>
  <td>${item.title}</td>
  <td>${item.content}</td>
  <td>${item.image_url ? `<img src="${item.image_url}" />` : "-"}</td>
  <td>
    <button class="edit-btn" data-id="${item.id}" data-title="${item.title}" data-content="${item.content}" data-image="${item.image_url || ""}">Editar</button>
    <button class="delete-btn" data-id="${item.id}">Excluir</button>
  </td>
`;

        tableBody.appendChild(row);
        // Adiciona eventos aos botões após criar a linha
        row.querySelector(".edit-btn").addEventListener("click", (e) => {
            const btn = e.target;
            editNews(
                btn.dataset.id,
                btn.dataset.title,
                btn.dataset.content,
                btn.dataset.image
            );
        });

        row.querySelector(".delete-btn").addEventListener("click", (e) => {
            const btn = e.target;
            deleteNews(btn.dataset.id);
        });

    });
}

// ✏️ Editar
function editNews(id, title, content, image_url) {
    idField.value = id;
    titleField.value = title;
    contentField.value = content;
    imageField.value = image_url;
    form.scrollIntoView({ behavior: "smooth" });
}

// 🗑️ Excluir
async function deleteNews(id) {
    if (!confirm("Deseja realmente excluir esta notícia?")) return;

    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (res.ok) {
        alert("Notícia excluída com sucesso!");
        fetchNews();
    } else {
        alert("Erro ao excluir notícia.");
    }
}

// 💾 Criar / Atualizar
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: titleField.value,
        content: contentField.value,
        image_url: imageField.value,
    };

    const id = idField.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        alert(id ? "Notícia atualizada!" : "Notícia criada!");
        form.reset();
        idField.value = "";
        fetchNews();
    } else {
        alert("Erro ao salvar notícia.");
    }
});

fetchNews();

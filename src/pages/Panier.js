function recupPanier() {
  try {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = 0;
    panier.forEach((produit) => {
      total += parseFloat(produit.prix) * produit.quantite;
    });
    return { panier, total: total.toFixed(2) };
  } catch (e) {
    console.error("Erreur lors de la récupération du panier", e);
    return { panier: [], total: 0 };
  }
}

const SupprimerPanier = () => {
  localStorage.removeItem("panier");
};

const AjouterProduit = (produitId) => {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let produitPanier = panier.find((p) => p.id === produitId);
  if (produitPanier) {
    produitPanier.quantite++;
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};

const EnleverProduit = (produitId) => {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let produitPanier = panier.find((p) => p.id === produitId);
  if (produitPanier) {
    produitPanier.quantite--;
    if (produitPanier.quantite === 0) {
      panier = panier.filter((p) => p.id !== produitId);
    }
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};

export const Panier = (element) => {
  let { panier, total } = recupPanier();
  element.innerHTML = `
<h1 class="Panier mb-4 text-center text-uppercase text-primary">Panier</h1>
<div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
  <table class="table table-hover table-bordered align-middle">
    <thead class="table-primary">
      <tr>
        <th scope="col" class="Panier">Article</th>
        <th scope="col" class="Panier">Prix unitaire</th>
        <th scope="col" class="Panier">Quantité</th>
        <th scope="col" class="Panier">Prix total (TTC)</th>
        <th scope="col" class="Panier">Actions</th>
      </tr>
    </thead>
    <tbody>
      ${panier
        .map(
          (produit) => `
        <tr>
          <td class="Panier align-middle">${produit.name}</td>
          <td class="Panier align-middle text-success">${produit.prix} €</td>
          <td class="Panier align-middle">
            <input type="number" class="form-control form-control-sm text-center" value="${produit.quantite}" min="1" data-id="${produit.id}">
          </td>
          <td class="Panier align-middle text-success">${(
            produit.prix * produit.quantite
          ).toFixed(2)} €</td>
          <td class="Panier align-middle">
            <button class="btn btn-sm btn-primary ajouterProduit" data-id="${
              produit.id
            }">+</button>
            <button class="btn btn-sm btn-danger enleverProduit" data-id="${
              produit.id
            }">-</button>
          </td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
</div>
<p id="Total" class="fs-4 mt-3 text-center">Total : <span class="fw-bold text-success">${total}</span> €</p>
<div class="text-center">
  <button id="supprimerPanier" class="btn btn-danger mt-3">
    Supprimer le Panier
  </button>
</div>

	`;

  document.querySelector("#supprimerPanier").addEventListener("click", () => {
    SupprimerPanier();
    Panier(element); // Permet de mettre automatiquement à jour la page
  });

  document.querySelectorAll(".ajouterProduit").forEach((button) => {
    button.addEventListener("click", () => {
      const produitId = parseInt(button.getAttribute("data-id"));
      AjouterProduit(produitId);
      Panier(element); // Met à jour la page après modification
    });
  });

  document.querySelectorAll(".enleverProduit").forEach((button) => {
    button.addEventListener("click", () => {
      const produitId = parseInt(button.getAttribute("data-id"));
      EnleverProduit(produitId);
      Panier(element); // Met à jour la page après modification
    });
  });
};

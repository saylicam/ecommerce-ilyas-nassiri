import { CategorieBadge } from "./CategorieBadge";

/**
 * @typedef {Object} Produit
 * @property {number} id - L'identifiant du Produit.
 * @property {string} name - Le nom du Produit.
 * @property {string} photo - La photo du produit.
 * @property {string} categorie - La categorie du produit.
 */

/**
 * Affiche une carte du Produit
 *
 * @param {Produit} produit
 * @returns {string} HTML string
 */
export const ProduitCard = (produit) => {
  return `
   <div class="col-md-4 col-lg-3 mb-4">
  <div class="card h-100 shadow-lg border-0 rounded-lg overflow-hidden">
    <a class="card-link" href="/produit?id=${produit.id}">
      <img src="${produit.photo}" class="card-img-top img-fluid" alt="${produit.name}" style="object-fit: cover; height: 200px;">
    </a>
    <div class="card-body text-center bg-light">
      <h5 class="card-title font-weight-bold text-primary">${produit.name}</h5>
      <p class="card-text text-muted">${produit.description}</p>
      <p class="card-text prix font-weight-bold text-success display-4">${produit.prix} €</p>
      ${CategorieBadge(produit.categorie)}
    </div>
    <div class="card-footer bg-primary text-white text-center py-3">
      <a href="/produit?id=${produit.id}" class="btn btn-light">Voir le produit</a>
    </div>
  </div>
</div>


  `;
};

/**
 * Badge de categorie produit
 *
 * @param {string} categorie
 * @returns {string} HTML string
 */
export const CategorieBadge = (categorie) => {
  const categories = {
    Fitness: "text-bg-success", // Vert
    Electronics: "text-bg-primary", // Bleu foncé
    Kitchen: "text-bg-danger", // Rouge
    Finance: "text-bg-info", // Bleu clair
    Health: "text-bg-warning", // Jaune
    Transportation: "text-bg-secondary", // Gris
    Outdoors: "text-bg-dark", // Noir
    Pets: "text-bg-light" // Blanc
};


  const categorieBadge = categories[categorie] || "text-bg-secondary";

  return `
      <span class="badge ${categorieBadge}">${categorie}</span>
    `;
};

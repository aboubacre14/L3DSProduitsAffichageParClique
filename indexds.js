// indexds.js
import { produits } from './Datads.mjs';

const idform = document.getElementById('idform');
const stockOnlyCheckbox = document.getElementById('stockOnly');
const categorieInput = document.getElementById('categorie');

idform.addEventListener('input', chercher);

async function chercher() {
    const recherche = categorieInput.value.toLowerCase();
    const stockOnly = stockOnlyCheckbox.checked;

    const produitsFiltres = produits.filter(produit => 
        (stockOnly ? produit.stocke : true) &&
        (produit.categorie.toLowerCase().includes(recherche) || produit.nom.toLowerCase().includes(recherche))
    );

    const resultatDiv = document.getElementById('resultat');
    resultatDiv.innerHTML = ''; // Vider le contenu précédent

    const fruits = produitsFiltres.filter(produit => produit.categorie === 'Fruits');
    const legumes = produitsFiltres.filter(produit => produit.categorie === 'Légumes');

    const maxPrixFruits = Math.max(...fruits.map(p => parseFloat(p.prix)));
    const maxPrixLegumes = Math.max(...legumes.map(p => parseFloat(p.prix)));

    const createTable = (produits, maxPrix, categorie) => {
        const categorieRow = document.createElement('tr');
        const categorieCell = document.createElement('td');
        categorieCell.colSpan = 2;
        categorieCell.innerHTML = `<strong>${categorie}</strong>`;
        categorieRow.appendChild(categorieCell);
        table.appendChild(categorieRow);

        produits.forEach(produit => {
            const row = document.createElement('tr');
            const nomCell = document.createElement('td');
            nomCell.textContent = produit.nom;
            const prixCell = document.createElement('td');
            prixCell.textContent = produit.prix;

            if (parseFloat(produit.prix) === maxPrix && produits.filter(p => parseFloat(p.prix) === maxPrix).length === 1) {
                row.style.color = 'red';
            }

            row.appendChild(nomCell);
            row.appendChild(prixCell);
            table.appendChild(row);
        });
    };

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const nomHeader = document.createElement('th');
    nomHeader.textContent = 'Nom';
    const prixHeader = document.createElement('th');
    prixHeader.textContent = 'Prix';
    headerRow.appendChild(nomHeader);
    headerRow.appendChild(prixHeader);
    table.appendChild(headerRow);

    if (fruits.length > 0) {
        createTable(fruits, maxPrixFruits, 'Fruits');
    }

    if (legumes.length > 0) {
        createTable(legumes, maxPrixLegumes, 'Légumes');
    }

    resultatDiv.appendChild(table);
}
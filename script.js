let panier = [];

function ajouterAuPanier(nom, prix) {
    panier.push({
        nom: nom,
        prix: prix,
        quantite: 1
    });

    afficherPanier();
}

function supprimerDuPanier(index) {
    panier.splice(index, 1);
    afficherPanier();
}

function modifierQuantite(index, changement) {
    panier[index].quantite += changement;

    if (panier[index].quantite <= 0) {
        panier.splice(index, 1);
    }

    afficherPanier();
}

function afficherPanier() {
    const zonePanier = document.getElementById("panier");
    const zoneTotal = document.getElementById("total");

    zonePanier.innerHTML = "";

    let total = 0;

    panier.forEach(function(produit, index) {
        let sousTotal = produit.prix * produit.quantite;
        total += sousTotal;

        zonePanier.innerHTML += `
            <div>
                <strong>${produit.nom}</strong>
                - ${sousTotal.toLocaleString()} FCFA

                <button onclick="modifierQuantite(${index}, -1)">−</button>
                ${produit.quantite}
                <button onclick="modifierQuantite(${index}, 1)">+</button>

                <button onclick="supprimerDuPanier(${index})">
                    🗑️ Supprimer
                </button>
            </div>
        `;
    });

    if (panier.length === 0) {
        zonePanier.innerHTML = "<p>Votre panier est vide.</p>";
    }

    zoneTotal.textContent = total.toLocaleString() + " FCFA";
}
function payer() {
    const methode = document.getElementById("methode").value;
    const total = document.getElementById("total").textContent;
    const message = document.getElementById("messagePaiement");

    if (methode === "") {
        message.textContent = "Veuillez choisir un mode de paiement.";
        return;
    }

    if (methode === "Livraison") {
        message.textContent =
            "Commande confirmée. Vous paierez à la livraison. Total : " + total;
        return;
    }

    message.textContent =
        "Vous avez choisi " + methode + ". Total à payer : " + total;
}
function commanderWhatsApp() {
    if (panier.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    let nom = document.getElementById("nom").value;
    let telephone = document.getElementById("telephone").value;
    let adresse = document.getElementById("adresse").value;

    if (nom === "" || telephone === "" || adresse === "") {
        alert("Veuillez remplir toutes les informations.");
        return;
    }

    let message = "Bonjour PAPEZOO SHOP 👋\n\n";

    message += "👤 Nom : " + nom + "\n";
    message += "📞 Téléphone : " + telephone + "\n";
    message += "📍 Adresse : " + adresse + "\n\n";

    message += "🛍️ Commande :\n";

    let total = 0;

    panier.forEach(function(produit) {
        let sousTotal = produit.prix * produit.quantite;

        message += "- " + produit.nom +
                   " x" + produit.quantite +
                   " : " + sousTotal.toLocaleString() +
                   " FCFA\n";

        total += sousTotal;
    });

    message += "\n💰 Total : " +
               total.toLocaleString() + " FCFA";

    let numero = "221769480812";

    let url = "https://wa.me/" + numero +
              "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
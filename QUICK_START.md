# 🚀 B&G Shop - Guide de Démarrage Rapide

## 📋 Résumé de ce qui a été créé

Un site e-commerce complet avec:
✅ **Système d'authentification** (Login/Register)
✅ **Tableau de bord administrateur**
✅ **Formulaire pour ajouter des articles** (Admin)
✅ **Système de catégories** (7 catégories)
✅ **Listing des produits** avec filtrage par catégorie
✅ **Page de détails du produit** avec image grande
✅ **Boutons de contact**: Appeler, WhatsApp
✅ **Formulaire de commande** avec validation
✅ **Système de notification des commandes** (Admin)
✅ **Articles en tendance** sur la page d'accueil
✅ **Design moderne et responsive**
✅ **Tout en français**

---

## 🗄️ Base de données Supabase

Le site possède maintenant un schéma PostgreSQL prêt pour Supabase dans [`supabase/schema.sql`](supabase/schema.sql). Il couvre les utilisateurs, produits, commandes, lignes de commande, messages, vidéos, vues, likes, favoris, panier, réglages et notifications.

1. Créez un projet sur [Supabase](https://supabase.com/).
2. Ouvrez **SQL Editor**, collez le contenu de `supabase/schema.sql`, puis exécutez-le.
3. Dans **Authentication > Users**, créez le compte administrateur avec l’adresse de votre choix.
4. Dans le **SQL Editor**, attribuez le rôle `admin` à ce compte et vérifiez que son adresse email correspond exactement à celle de **Authentication > Users**.
5. Récupérez l’URL du projet et la clé publique dans **Project Settings > API** pour connecter les pages à Supabase.

Si le compte existe déjà dans **Authentication > Users** mais n'apparaît pas dans `profiles`, exécutez d'abord `supabase/complete-migration.sql`. Pour donner les droits administrateur à une adresse précise, exécutez ensuite cette requête dans **SQL Editor** en remplaçant l'adresse :

```sql
update public.profiles
set role = 'admin'
where lower(email) = lower('votre-adresse@example.com');
```

La connexion admin utilise ensuite exactement la même page `login.html` que les autres comptes. L'accès à `admin.html` est accordé uniquement si la ligne correspondante contient `role = 'admin'`.

Le schéma active la sécurité RLS : les produits et vidéos sont consultables publiquement, tandis que les commandes, messages, paniers et réglages restent limités à leur propriétaire ou à un administrateur. Les rôles administrateur ne doivent être attribués que depuis le SQL Editor ou un environnement de confiance.

Si vous avez déjà exécuté l’ancien schéma, exécutez [`supabase/complete-migration.sql`](supabase/complete-migration.sql) dans Supabase SQL Editor. Cette migration recrée les profils Auth manquants, ajoute les favoris vidéo, le paiement et la localisation des articles, puis applique les contrôles de rôle, messagerie et commandes ainsi que les statistiques vidéo agrégées.

Pour vider le catalogue de démonstration avant de publier vos vrais articles, exécutez ensuite [`supabase/clear-demo-products.sql`](supabase/clear-demo-products.sql) dans Supabase SQL Editor.

### Connecter le site

Dans [js/supabase-client.js](js/supabase-client.js), remplacez `YOUR_PROJECT_REF` par l’identifiant de votre projet et `YOUR_SUPABASE_ANON_KEY` par la clé **anon public** copiée dans **Project Settings > API**. Ne mettez jamais la clé `service_role` dans ce fichier.

Le site charge les données depuis Supabase et utilise Supabase Auth pour les connexions et inscriptions. `localStorage` sert de cache d’affichage ; en mode local sans Supabase, les données ne sont pas protégées et ne doivent pas être utilisées en production.

### Confirmation email et limite d'envoi

Pour un test sans email de confirmation, ouvrez **Authentication > Providers > Email** dans Supabase et désactivez **Confirm email**, puis réessayez avec une adresse qui n'a pas déjà été créée. Cela évite la limite du service d'emails intégré.

Pour un site en production, gardez la confirmation email activée et configurez un fournisseur SMTP dans **Project Settings > Authentication > SMTP Settings**. Le fournisseur email intégré de Supabase est limité et peut afficher `email rate limit exceeded` après plusieurs essais rapprochés. Attendez la remise à zéro de la limite avant de renvoyer une inscription.

### QR code du site

Le QR code du site est disponible dans [images/bgshop-qr.png](images/bgshop-qr.png). Il ouvre directement : `https://bandgshop.github.io/B-G-Shop/`.

## 🏃 Démarrage Immédiat

### Pour les Utilisateurs Visiteurs

1. **Ouvrir le site**: `index.html`
2. **Parcourir les produits**: Cliquez sur "Catégories"
3. **Voir les détails**: Cliquez sur un produit
4. **Créer un compte**: Cliquez sur "Inscription"
   - Remplissez: Nom, Email, Mot de passe
5. **Passer une commande**: Cliquez sur "Passer la commande"
   - Remplissez: Nom, Téléphone, Adresse

### Pour les Administrateurs

1. **Ouvrir login.html**
2. **Connectez-vous avec les identifiants du compte administrateur créé dans Supabase.**
3. **Accédez au tableau de bord** (`admin.html`)
4. **Ajouter des articles:**
   - Titre, Catégorie, Prix, URL Image, Description
   - Marquer en tendance (optionnel)
5. **Gérer les commandes:**
   - Voir les commandes des clients
   - Changer le statut (En attente → Complétée)

---

## 📁 Fichiers du Projet

```
Site web/
├── index.html              ← Accueil (articles en tendance)
├── login.html              ← Connexion/Inscription
├── categories.html         ← Listing des produits
├── product-detail.html     ← Détails du produit
├── admin.html              ← Tableau de bord admin
├── styles.css              ← Feuille de style
├── js/
│   └── app.js              ← Logique JavaScript
├── README.md               ← Documentation complète
└── QUICK_START.md          ← Ce fichier
```

---

## 🛒 Flux Complet d'Utilisation

### Utilisateur Final

```
Accueil → Catégories → Détails Produit → Passer Commande → Confirmation
```

### Administrateur

```
Connexion → Admin → Ajouter Article → Gérer Articles → Gérer Commandes
```

---

## 📊 Catégories Disponibles

| Catégorie | Description |
|-----------|------------|
| **Voitures** | Vente et location |
| **Animaux** | Chiens et compagnie |
| **Vêtements** | Tenues et habits |
| **Chaussures** | Tous types |
| **Accessoires de beauté** | Montres, bracelets, etc. |
| **Cosmétiques** | Parfums, soins |
| **Électronique** | Téléphones, écouteurs, etc. |

---

## 🎯 Points Clés

### Authentification Requise Pour:
- ✓ Appeler le support
- ✓ Contacter via WhatsApp
- ✓ Passer une commande

### Admin Peut:
- ✓ Poster des articles
- ✓ Marquer les articles en tendance
- ✓ Gérer les articles (supprimer)
- ✓ Voir et gérer les commandes

### Utilisateur Peut:
- ✓ Créer un compte
- ✓ Parcourir les produits
- ✓ Filtrer par catégorie
- ✓ Voir les détails des produits
- ✓ Passer une commande
- ✓ Contacter le support

---

## 💾 Données Stockées Localement

Le navigateur conserve un cache local pour l’affichage hors ligne. Les comptes, articles et commandes de production sont stockés dans Supabase.

**Important** : vider le cache local ne supprime pas les données Supabase, mais les pages devront se reconnecter pour les recharger.

---

## 🔧 Customisation

Pour remplacer les images placeholder par les vôtres:
1. Allez dans Admin
2. Ajoutez un article
3. Mettez l'URL complète de votre image (ex: `https://img.exemple.com/photo.jpg`)

---

## 🧪 Test Complet

### Scénario 1: Créer un compte et passer commande
1. Inscrivez-vous
2. Naviguez vers un produit
3. Cliquez "Passer la commande"
4. Remplissez le formulaire
5. Vérifiez la confirmation

### Scénario 2: Ajouter un article en tant qu'admin
1. Connectez-vous avec les identifiants de votre compte administrateur Supabase
2. Allez dans "Ajouter un article"
3. Remplissez tous les champs
4. Cliquez "Ajouter l'article"
5. Vérifiez que l'article apparaît sur le site

---

## ❓ Foire Aux Questions

**Q: Comment ajouter d'autres administrateurs?**
A: Créez leur compte Supabase Auth, puis attribuez le rôle `admin` depuis Supabase SQL Editor avec un compte de confiance.

**Q: Comment faire un lien WhatsApp réel?**
A: Remplacez `1234567890` par votre numéro WhatsApp business dans `product-detail.html`.

**Q: Les données persistent-elles?**
A: Oui, tant que vous ne videz pas le cache du navigateur.

**Q: Puis-je migrer vers une vraie base de données?**
A: Le site utilise déjà Supabase en production. Configurez ses identifiants dans `js/supabase-client.js` et exécutez les migrations SQL.

---

## 📞 Informations de Contact

À mettre à jour dans le code:
- **Numéro d'appel**: Modifier dans `product-detail.html`
- **Lien WhatsApp**: Modifier le numéro dans `product-detail.html`
- **Email de support**: Utiliser dans les notifications

---

**Créé le**: 27 Juillet 2026
**Version**: 1.0
**Statut**: ✅ Prêt à l'emploi

---

**Pour toute question ou assistance**, consultez le fichier `README.md` pour la documentation complète.

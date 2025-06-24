"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>

      <p className="mb-6">
        Chez <strong>HROPS Consulting</strong>, la protection de vos données personnelles est une priorité. 
        Cette politique explique comment nous recueillons, utilisons, stockons et protégeons vos informations 
        lorsque vous utilisez notre site web ou nos services.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">1. Données que nous collectons</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Nom et prénom</li>
        <li>Adresse courriel</li>
        <li>Numéro de téléphone</li>
        <li>Adresse IP et informations de navigation</li>
        <li>Messages envoyés via les formulaires de contact</li>
        <li>Données de connexion (si compte utilisateur)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-4">2. Finalités de la collecte</h2>
      <p className="mb-6">
        Nous utilisons vos données personnelles pour :
      </p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Fournir les services demandés</li>
        <li>Répondre à vos demandes de contact ou de support</li>
        <li>Analyser et améliorer nos services et notre site</li>
        <li>Vous envoyer des communications pertinentes (avec votre consentement)</li>
        <li>Respecter nos obligations légales</li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-4">3. Partage des données</h2>
      <p className="mb-6">
        Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec :
      </p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Nos prestataires de services (hébergement, analyse web, envoi d’emails)</li>
        <li>Les autorités compétentes si la loi l’exige</li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-4">4. Utilisation des cookies</h2>
      <p className="mb-6">
        Nous utilisons des cookies pour :
      </p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Améliorer la performance et l’expérience utilisateur</li>
        <li>Analyser le trafic du site (Google Analytics, etc.)</li>
        <li>Proposer un contenu personnalisé</li>
      </ul>
      <p className="mb-6">
        Vous pouvez configurer votre navigateur pour refuser tout ou partie des cookies.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">5. Sécurité des données</h2>
      <p className="mb-6">
        Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos 
        données contre tout accès non autorisé, perte ou divulgation.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">6. Conservation des données</h2>
      <p className="mb-6">
        Vos données sont conservées uniquement pendant la durée nécessaire à la finalité 
        pour laquelle elles ont été collectées, conformément aux exigences légales applicables.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">7. Vos droits</h2>
      <p className="mb-6">
        Conformément aux lois applicables, vous disposez des droits suivants :
      </p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Accès à vos données personnelles</li>
        <li>Rectification ou suppression</li>
        <li>Limitation ou opposition au traitement</li>
        <li>Portabilité des données</li>
      </ul>
      <p className="mb-6">
        Pour exercer vos droits, contactez-nous à
        <a href="mailto:info@hrops-consulting.com" className="text-primary underline ml-1">
          info@hrops-consulting.com
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">8. Modifications de cette politique</h2>
      <p className="mb-6">
        HROPS Consulting se réserve le droit de modifier cette politique de confidentialité à tout moment. 
        Toute modification sera publiée sur cette page, accompagnée de la date de mise à jour.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">9. Contact</h2>
      <p className="mb-6">
        Pour toute question relative à notre politique de confidentialité ou à vos données, 
        vous pouvez nous contacter à :
      </p>
      <p className="mb-6">
        <strong>HROPS Consulting</strong><br />
        📍 Montréal, QC, Canada<br />
        📧 contact@hrops-consulting.com<br />
        📞 +1(438)321-4864
      </p>

      <p className="mt-10 text-sm text-muted-foreground">
        Dernière mise à jour : 25 mai 2025.
      </p>
    </div>
  );
}

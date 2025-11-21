// -------------------------------------------------------------
// HROps – Digital HR Maturity Assessment Brain
// Rich Model (Themes + Questions + Scoring + Maturity Engine)
// -------------------------------------------------------------

export type LevelOption = {
  label: string;
  score: 1 | 2 | 3;
};

export type Question = {
  id: string;
  themeId: string;
  question: string;
  options: LevelOption[];
};

export type Theme = {
  id: string;
  title: string;
  maxScore: number; // Always 12
};

export const themes: Theme[] = [
  { id: "organisation_vision", title: "Organisation & Vision RH Digitale", maxScore: 12 },
  { id: "outils_rh", title: "Outils RH (SIRH) & Technologies", maxScore: 12 },
  { id: "processus_rh", title: "Méthodes de Travail RH (Processus)", maxScore: 12 },
  { id: "donnees_rh", title: "Données RH & Suivi", maxScore: 12 },
  { id: "experience_employe", title: "Expérience Employé", maxScore: 12 },
  { id: "competences_culture", title: "Compétences RH & Culture Numérique", maxScore: 12 },
  { id: "securite_loi25", title: "Sécurité & Protection des Données (Loi 25)", maxScore: 12 },
  { id: "collaboration_changement", title: "Collaboration Interne & Accompagnement au Changement", maxScore: 12 },
];

// -------------------------------------------------------------
// QUESTIONS – FULL 32 ITEMS
// -------------------------------------------------------------

export const questions: Question[] = [
  // -----------------------------
  // 1. ORGANISATION & VISION RH
  // -----------------------------
  {
    id: "vision_1",
    themeId: "organisation_vision",
    question: "Avez-vous une idée claire de ce que vous voulez améliorer en RH grâce au numérique ?",
    options: [
      { label: "Pas encore de vision ou de plan.", score: 1 },
      { label: "Une idée ou une intention, mais pas encore structurée.", score: 2 },
      { label: "Une vision claire et partagée avec l’équipe RH.", score: 3 },
    ],
  },
  {
    id: "vision_2",
    themeId: "organisation_vision",
    question: "Avez-vous un plan ou une feuille de route RH pour les mois à venir ?",
    options: [
      { label: "Non, rien de formel.", score: 1 },
      { label: "Quelques grandes étapes.", score: 2 },
      { label: "Un plan détaillé avec objectifs, budget et échéancier.", score: 3 },
    ],
  },
  {
    id: "vision_3",
    themeId: "organisation_vision",
    question: "Avez-vous désigné une personne ou un comité responsable du numérique RH ?",
    options: [
      { label: "Non, personne d’attitré.", score: 1 },
      { label: "Une personne s’en occupe parfois.", score: 2 },
      { label: "Un comité RH digital actif avec responsabilités claires.", score: 3 },
    ],
  },
  {
    id: "vision_4",
    themeId: "organisation_vision",
    question: "Vos projets RH numériques sont-ils organisés ?",
    options: [
      { label: "Non, on agit selon les urgences.", score: 1 },
      { label: "Planification partielle.", score: 2 },
      { label: "Projets priorisés et suivis avec rigueur.", score: 3 },
    ],
  },

  // -----------------------------
  // 2. OUTILS RH (SIRH)
  // -----------------------------
  {
    id: "outils_1",
    themeId: "outils_rh",
    question: "Quels outils utilisez-vous pour gérer les RH ?",
    options: [
      { label: "Excel, formulaires papier, courriels.", score: 1 },
      { label: "Un ou deux logiciels RH (paie, présence…).", score: 2 },
      { label: "Une plateforme RH complète (Recrutement, Paie, Temps…).", score: 3 },
    ],
  },
  {
    id: "outils_2",
    themeId: "outils_rh",
    question: "Vos outils RH sont-ils capables de se parler (intégrés) ?",
    options: [
      { label: "Non, tout est séparé.", score: 1 },
      { label: "Certains échanges manuels ou fichiers Excel.", score: 2 },
      { label: "Intégration automatisée entre les logiciels RH.", score: 3 },
    ],
  },
  {
    id: "outils_3",
    themeId: "outils_rh",
    question: "Est-ce facile pour les bonnes personnes d’accéder aux informations RH ?",
    options: [
      { label: "Non, trop dispersées.", score: 1 },
      { label: "Assez facile avec de l’aide.", score: 2 },
      { label: "Accès sécurisé via un portail centralisé.", score: 3 },
    ],
  },
  {
    id: "outils_4",
    themeId: "outils_rh",
    question: "Avez-vous automatisé certaines tâches RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Un peu (absences, relevés).", score: 2 },
      { label: "Oui, plusieurs processus automatisés.", score: 3 },
    ],
  },

  // -----------------------------
  // 3. PROCESSUS RH
  // -----------------------------
  {
    id: "processus_1",
    themeId: "processus_rh",
    question: "Avez-vous encore beaucoup de tâches RH faites à la main ?",
    options: [
      { label: "Oui, presque tout.", score: 1 },
      { label: "En partie automatisé.", score: 2 },
      { label: "La majorité est gérée par des processus numériques.", score: 3 },
    ],
  },
  {
    id: "processus_2",
    themeId: "processus_rh",
    question: "Avez-vous mis en place des circuits ou approbations automatiques ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Quelques démarches.", score: 2 },
      { label: "Plusieurs démarches automatisées.", score: 3 },
    ],
  },
  {
    id: "processus_3",
    themeId: "processus_rh",
    question: "Vos procédures RH sont-elles documentées ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "De façon informelle.", score: 2 },
      { label: "Oui, claires et accessibles.", score: 3 },
    ],
  },
  {
    id: "processus_4",
    themeId: "processus_rh",
    question: "Utilisez-vous des rappels automatiques pour les suivis RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Alertes manuelles.", score: 2 },
      { label: "Rappels intégrés aux outils.", score: 3 },
    ],
  },

  // -----------------------------
  // 4. DONNÉES RH & SUIVI
  // -----------------------------
  {
    id: "donnees_1",
    themeId: "donnees_rh",
    question: "Disposez-vous d’un système pour centraliser vos données RH ?",
    options: [
      { label: "Non ou dispersées.", score: 1 },
      { label: "Centralisation en cours.", score: 2 },
      { label: "Oui, solution unique sécurisée.", score: 3 },
    ],
  },
  {
    id: "donnees_2",
    themeId: "donnees_rh",
    question: "Suivez-vous des indicateurs RH utiles ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Quelques indicateurs manuels.", score: 2 },
      { label: "Oui, tableaux de bord à jour.", score: 3 },
    ],
  },
  {
    id: "donnees_3",
    themeId: "donnees_rh",
    question: "Les gestionnaires ont-ils accès à ces indicateurs ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Sur demande.", score: 2 },
      { label: "Accès direct sécurisé.", score: 3 },
    ],
  },
  {
    id: "donnees_4",
    themeId: "donnees_rh",
    question: "Pouvez-vous faire des analyses RH prévisionnelles ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "En réflexion.", score: 2 },
      { label: "Oui, début d’analyses prévisionnelles.", score: 3 },
    ],
  },

  // -----------------------------
  // 5. EXPÉRIENCE EMPLOYÉ
  // -----------------------------
  {
    id: "exp_1",
    themeId: "experience_employe",
    question: "Vos employés peuvent-ils gérer eux-mêmes certaines démarches RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Quelques démarches.", score: 2 },
      { label: "Oui, portail ou application.", score: 3 },
    ],
  },
  {
    id: "exp_2",
    themeId: "experience_employe",
    question: "Avez-vous une plateforme RH conviviale ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Interface minimale.", score: 2 },
      { label: "Interface agréable et adaptée.", score: 3 },
    ],
  },
  {
    id: "exp_3",
    themeId: "experience_employe",
    question: "Sollicitez-vous l’avis des employés sur vos outils RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "À l’occasion.", score: 2 },
      { label: "Oui, retours intégrés.", score: 3 },
    ],
  },
  {
    id: "exp_4",
    themeId: "experience_employe",
    question: "Favorisez-vous l’autonomie RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Très partiellement.", score: 2 },
      { label: "Oui, pratique courante.", score: 3 },
    ],
  },

  // -----------------------------
  // 6. COMPÉTENCES & CULTURE
  // -----------------------------
  {
    id: "comp_1",
    themeId: "competences_culture",
    question: "Vos employés RH sont-ils à l’aise avec les outils numériques ?",
    options: [
      { label: "Peu ou pas.", score: 1 },
      { label: "Acceptable, besoin de soutien.", score: 2 },
      { label: "Oui, compétents et formés.", score: 3 },
    ],
  },
  {
    id: "comp_2",
    themeId: "competences_culture",
    question: "Offrez-vous des formations continues sur le numérique RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Ponctuellement.", score: 2 },
      { label: "Oui, intégrées au plan RH.", score: 3 },
    ],
  },
  {
    id: "comp_3",
    themeId: "competences_culture",
    question: "Utilisez-vous des outils collaboratifs ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Parfois.", score: 2 },
      { label: "Oui, régulièrement.", score: 3 },
    ],
  },
  {
    id: "comp_4",
    themeId: "competences_culture",
    question: "Encouragez-vous l’amélioration continue en RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Occasionnellement.", score: 2 },
      { label: "Oui, démarche structurée.", score: 3 },
    ],
  },

  // -----------------------------
  // 7. SÉCURITÉ & LOI 25
  // -----------------------------
  {
    id: "secu_1",
    themeId: "securite_loi25",
    question: "Vos données RH sont-elles protégées selon les lois du Québec ?",
    options: [
      { label: "Non / Je ne sais pas.", score: 1 },
      { label: "Partiellement.", score: 2 },
      { label: "Oui, conformité active.", score: 3 },
    ],
  },
  {
    id: "secu_2",
    themeId: "securite_loi25",
    question: "Avez-vous désigné une personne responsable de la vie privée ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Pas formellement.", score: 2 },
      { label: "Oui, un responsable déclaré.", score: 3 },
    ],
  },
  {
    id: "secu_3",
    themeId: "securite_loi25",
    question: "Faites-vous des vérifications de sécurité sur vos systèmes RH ?",
    options: [
      { label: "Jamais.", score: 1 },
      { label: "De temps en temps.", score: 2 },
      { label: "Oui, régulièrement.", score: 3 },
    ],
  },
  {
    id: "secu_4",
    themeId: "securite_loi25",
    question: "Disposez-vous d’un plan en cas de fuite ou cyberattaque ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "En réflexion.", score: 2 },
      { label: "Oui, plan d’urgence établi.", score: 3 },
    ],
  },

  // -----------------------------
  // 8. COLLABORATION & CHANGEMENT
  // -----------------------------
  {
    id: "collab_1",
    themeId: "collaboration_changement",
    question: "RH travaille-t-elle avec les autres services pour les projets numériques ?",
    options: [
      { label: "Rarement.", score: 1 },
      { label: "Parfois.", score: 2 },
      { label: "Oui, collaboration étroite.", score: 3 },
    ],
  },
  {
    id: "collab_2",
    themeId: "collaboration_changement",
    question: "Planifiez-vous des actions pour accompagner vos équipes dans les changements ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Parfois.", score: 2 },
      { label: "Accompagnement structuré.", score: 3 },
    ],
  },
  {
    id: "collab_3",
    themeId: "collaboration_changement",
    question: "Communiquez-vous sur les changements RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "De temps en temps.", score: 2 },
      { label: "Plan de communication actif.", score: 3 },
    ],
  },
  {
    id: "collab_4",
    themeId: "collaboration_changement",
    question: "Évaluez-vous l’adhésion et l’utilisation des nouveaux outils RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "À vue d’œil.", score: 2 },
      { label: "Données ou sondages.", score: 3 },
    ],
  },
];

// -------------------------------------------------------------
// SCORING ENGINE
// -------------------------------------------------------------

export function calculateThemeScore(themeId: string, answers: Record<string, number>) {
  const themeQuestions = questions.filter(q => q.themeId === themeId);
  return themeQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
}

export function calculateGlobalScore(answers: Record<string, number>) {
  return questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
}

// -------------------------------------------------------------
// MATURITY INTERPRETATION
// -------------------------------------------------------------

export function getMaturityLevel(score: number) {
  if (score < 32) return "Débutant";
  if (score < 64) return "En progrès";
  return "Avancé";
}

export function getHROpsProfile(score: number) {
  if (score < 32) return "Starter";
  if (score < 64) return "Optimizer";
  return "Leader";
}

// -------------------------------------------------------------
// EXPORT
// -------------------------------------------------------------

export default {
  themes,
  questions,
  calculateThemeScore,
  calculateGlobalScore,
  getMaturityLevel,
  getHROpsProfile,
};

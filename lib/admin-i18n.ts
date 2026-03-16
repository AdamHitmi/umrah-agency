export type AdminLocale = "ar" | "fr";

export function normalizeAdminLocale(value?: string | null): AdminLocale {
  return value === "fr" ? "fr" : "ar";
}

export function getAdminDictionary(locale: AdminLocale) {
  return adminDictionaries[locale];
}

export const adminDictionaries = {
  ar: {
    shell: {
      dashboardTitle: "لوحة التحكم",
      dashboardSubtitle: "إدارة المحتوى والحجوزات من مكان واحد",
      sidebarTitle: "الإدارة",
      sidebarSubtitle: "مؤسسة الأجنحة الحديثة"
    },
    switcher: {
      ariaLabel: "تغيير لغة الإدارة",
      arabic: "AR",
      french: "FR"
    },
    nav: {
      overview: "نظرة عامة",
      packages: "البرامج",
      bookings: "الحجوزات",
      contacts: "الرسائل",
      testimonials: "التقييمات",
      faqs: "الأسئلة",
      settings: "الإعدادات"
    },
    common: {
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      phone: "الهاتف",
      city: "المدينة",
      name: "الاسم",
      subject: "الموضوع",
      message: "الرسالة",
      package: "البرنامج",
      dates: "التواريخ",
      status: "الحالة",
      actions: "الإجراءات",
      startingPrice: "السعر الابتدائي",
      travelers: "عدد المسافرين",
      active: "نشط",
      inactive: "غير نشط",
      featured: "مميز",
      sortOrder: "الترتيب",
      save: "حفظ",
      create: "إنشاء",
      cancel: "إلغاء",
      remove: "حذف",
      delete: "حذف"
    },
    login: {
      title: "تسجيل دخول الإدارة",
      subtitle: "استخدم بيانات التجربة الموجودة في README للدخول إلى لوحة الإدارة.",
      secureAccessTitle: "دخول آمن لإدارة المكتب الخلفي.",
      secureAccessHint: "بيانات التجربة مملوءة مسبقاً للتطوير المحلي",
      signIn: "تسجيل الدخول",
      signingIn: "جار تسجيل الدخول...",
      loginFailed: "فشل تسجيل الدخول",
      unavailable: "تعذر تسجيل الدخول حالياً"
    },
    dashboard: {
      packages: "البرامج",
      bookings: "الحجوزات",
      contacts: "الرسائل",
      pendingBookings: "الحجوزات المعلقة",
      featuredPackage: "البرنامج المميز",
      noFeaturedPackage: "لا يوجد برنامج مميز حالياً."
    },
    packagesPage: {
      title: "البرامج",
      subtitle: "إدارة البرامج والأسعار.",
      newPackage: "برنامج جديد",
      titleColumn: "العنوان",
      datesColumn: "التواريخ",
      priceColumn: "السعر الابتدائي",
      statusColumn: "الحالة",
      actionsColumn: "الإجراءات",
      edit: "تعديل"
    },
    bookingsPage: {
      title: "طلبات الحجز",
      subtitle: "تتبع الطلبات وتحديث حالتها.",
      nameColumn: "الاسم",
      packageColumn: "البرنامج",
      phoneColumn: "الهاتف",
      travelersColumn: "المسافرون",
      statusColumn: "الحالة"
    },
    contactsPage: {
      title: "رسائل التواصل",
      subtitle: "جميع الرسائل القادمة من صفحة الاتصال.",
      nameColumn: "الاسم",
      subjectColumn: "الموضوع",
      phoneColumn: "الهاتف",
      messageColumn: "الرسالة"
    },
    faqsPage: {
      title: "الأسئلة الشائعة",
      subtitle: "إدارة الأسئلة المتكررة."
    },
    testimonialsPage: {
      title: "التقييمات",
      subtitle: "إضافة وتعديل شهادات العملاء."
    },
    settingsPage: {
      title: "إعدادات الموقع",
      subtitle: "تحديث بيانات الوكالة والمحتوى الرئيسي."
    },
    bookingStatus: {
      PENDING: "قيد المعالجة",
      CONTACTED: "تم التواصل",
      CONFIRMED: "مؤكد",
      CANCELLED: "ملغي"
    },
    deleteAction: {
      confirm: "هل أنت متأكد من حذف هذا العنصر؟"
    },
    logout: {
      label: "تسجيل الخروج"
    },
    faqForm: {
      questionAr: "السؤال بالعربية",
      questionFr: "السؤال بالفرنسية",
      answerAr: "الجواب بالعربية",
      answerFr: "الجواب بالفرنسية",
      active: "نشط",
      create: "إنشاء سؤال",
      save: "حفظ السؤال",
      unable: "تعذر حفظ السؤال"
    },
    testimonialForm: {
      name: "الاسم",
      city: "المدينة",
      rating: "التقييم",
      contentAr: "النص بالعربية",
      contentFr: "النص بالفرنسية",
      active: "نشط",
      create: "إنشاء تقييم",
      save: "حفظ التقييم",
      unable: "تعذر حفظ التقييم"
    },
    settingsForm: {
      agencyNameAr: "اسم الوكالة بالعربية",
      agencyNameFr: "اسم الوكالة بالفرنسية",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      whatsapp: "واتساب",
      cityAr: "المدينة بالعربية",
      cityFr: "المدينة بالفرنسية",
      facebookUrl: "رابط فيسبوك",
      instagramUrl: "رابط إنستغرام",
      tiktokUrl: "رابط تيك توك",
      addressAr: "العنوان بالعربية",
      addressFr: "العنوان بالفرنسية",
      officeHoursAr: "ساعات العمل بالعربية",
      officeHoursFr: "ساعات العمل بالفرنسية",
      heroTitleAr: "عنوان البطل بالعربية",
      heroTitleFr: "عنوان البطل بالفرنسية",
      heroSubtitleAr: "النص التعريفي بالعربية",
      heroSubtitleFr: "النص التعريفي بالفرنسية",
      aboutIntroAr: "مقدمة من نحن بالعربية",
      aboutIntroFr: "مقدمة من نحن بالفرنسية",
      promiseAr: "وعد الخدمة بالعربية",
      promiseFr: "وعد الخدمة بالفرنسية",
      whyChooseTitleAr: "عنوان لماذا نحن بالعربية",
      whyChooseTitleFr: "عنوان لماذا نحن بالفرنسية",
      whyChooseTextAr: "نص لماذا نحن بالعربية",
      whyChooseTextFr: "نص لماذا نحن بالفرنسية",
      save: "حفظ الإعدادات",
      success: "تم تحديث الإعدادات بنجاح.",
      unable: "تعذر تحديث الإعدادات"
    },
    packageForm: {
      titleCreate: "إنشاء برنامج",
      titleEdit: "تعديل البرنامج",
      basics: "البيانات الأساسية",
      destinations: "المحطات",
      pricingGroups: "مجموعات الأسعار",
      inclusions: "ماذا يشمل البرنامج",
      notes: "الملاحظات",
      hotels: "الفنادق",
      slug: "المعرف",
      heroImage: "صورة الواجهة",
      titleAr: "العنوان بالعربية",
      titleFr: "العنوان بالفرنسية",
      shortDescriptionAr: "الوصف القصير بالعربية",
      shortDescriptionFr: "الوصف القصير بالفرنسية",
      descriptionAr: "الوصف بالعربية",
      descriptionFr: "الوصف بالفرنسية",
      startDate: "تاريخ البداية",
      endDate: "تاريخ النهاية",
      durationDays: "عدد الأيام",
      countryAr: "البلد بالعربية",
      countryFr: "البلد بالفرنسية",
      originCityAr: "مدينة الانطلاق بالعربية",
      originCityFr: "مدينة الانطلاق بالفرنسية",
      directFlight: "رحلة مباشرة",
      featuredPackage: "برنامج مميز",
      active: "نشط",
      visaIncluded: "التأشيرة مشمولة",
      addDestination: "إضافة محطة",
      addPriceGroup: "إضافة مجموعة سعر",
      addTier: "إضافة فئة سعر",
      addInclusion: "إضافة عنصر",
      addNote: "إضافة ملاحظة",
      addHotel: "إضافة فندق",
      destinationNameAr: "الاسم بالعربية",
      destinationNameFr: "الاسم بالفرنسية",
      airportCode: "رمز المطار",
      roomTypeAr: "نوع الغرفة بالعربية",
      roomTypeFr: "نوع الغرفة بالفرنسية",
      labelAr: "التسمية بالعربية",
      labelFr: "التسمية بالفرنسية",
      amountMad: "المبلغ بالدرهم",
      textAr: "النص بالعربية",
      textFr: "النص بالفرنسية",
      hotelName: "اسم الفندق",
      hotelCity: "المدينة",
      stars: "عدد النجوم",
      priceGroup: "مجموعة السعر",
      create: "إنشاء البرنامج",
      save: "حفظ البرنامج",
      unable: "تعذر حفظ البرنامج"
    }
  },
  fr: {
    shell: {
      dashboardTitle: "Tableau de bord",
      dashboardSubtitle: "Gerer le contenu et les demandes depuis un seul espace",
      sidebarTitle: "Administration",
      sidebarSubtitle: "Al Ajniha Al Haditha"
    },
    switcher: {
      ariaLabel: "Changer la langue de l'administration",
      arabic: "AR",
      french: "FR"
    },
    nav: {
      overview: "Vue d'ensemble",
      packages: "Forfaits",
      bookings: "Reservations",
      contacts: "Messages",
      testimonials: "Avis",
      faqs: "FAQs",
      settings: "Parametres"
    },
    common: {
      email: "E-mail",
      password: "Mot de passe",
      phone: "Telephone",
      city: "Ville",
      name: "Nom",
      subject: "Sujet",
      message: "Message",
      package: "Forfait",
      dates: "Dates",
      status: "Statut",
      actions: "Actions",
      startingPrice: "Prix de depart",
      travelers: "Voyageurs",
      active: "Actif",
      inactive: "Inactif",
      featured: "Mis en avant",
      sortOrder: "Ordre",
      save: "Enregistrer",
      create: "Creer",
      cancel: "Annuler",
      remove: "Retirer",
      delete: "Supprimer"
    },
    login: {
      title: "Connexion admin",
      subtitle: "Utilisez les identifiants de demonstration du README pour acceder au back-office.",
      secureAccessTitle: "Acces securise pour la gestion du back-office.",
      secureAccessHint: "Les identifiants de demo sont pre-remplis pour le developpement local",
      signIn: "Se connecter",
      signingIn: "Connexion...",
      loginFailed: "Connexion echouee",
      unavailable: "Connexion impossible pour le moment"
    },
    dashboard: {
      packages: "Forfaits",
      bookings: "Reservations",
      contacts: "Messages",
      pendingBookings: "Reservations en attente",
      featuredPackage: "Forfait mis en avant",
      noFeaturedPackage: "Aucun forfait n'est actuellement mis en avant."
    },
    packagesPage: {
      title: "Forfaits",
      subtitle: "Gerer les forfaits et les tarifs.",
      newPackage: "Nouveau forfait",
      titleColumn: "Titre",
      datesColumn: "Dates",
      priceColumn: "Prix de depart",
      statusColumn: "Statut",
      actionsColumn: "Actions",
      edit: "Modifier"
    },
    bookingsPage: {
      title: "Demandes de reservation",
      subtitle: "Suivre et mettre a jour les statuts.",
      nameColumn: "Nom",
      packageColumn: "Forfait",
      phoneColumn: "Telephone",
      travelersColumn: "Voyageurs",
      statusColumn: "Statut"
    },
    contactsPage: {
      title: "Messages de contact",
      subtitle: "Tous les messages envoyes depuis la page contact.",
      nameColumn: "Nom",
      subjectColumn: "Sujet",
      phoneColumn: "Telephone",
      messageColumn: "Message"
    },
    faqsPage: {
      title: "FAQs",
      subtitle: "Gerer les questions frequentes."
    },
    testimonialsPage: {
      title: "Avis",
      subtitle: "Creer et modifier les retours clients."
    },
    settingsPage: {
      title: "Parametres du site",
      subtitle: "Mettre a jour les informations de l'agence et le contenu principal."
    },
    bookingStatus: {
      PENDING: "En attente",
      CONTACTED: "Contacte",
      CONFIRMED: "Confirme",
      CANCELLED: "Annule"
    },
    deleteAction: {
      confirm: "Voulez-vous vraiment supprimer cet element ?"
    },
    logout: {
      label: "Se deconnecter"
    },
    faqForm: {
      questionAr: "Question AR",
      questionFr: "Question FR",
      answerAr: "Reponse AR",
      answerFr: "Reponse FR",
      active: "Actif",
      create: "Creer la FAQ",
      save: "Enregistrer la FAQ",
      unable: "Impossible d'enregistrer la FAQ"
    },
    testimonialForm: {
      name: "Nom",
      city: "Ville",
      rating: "Note",
      contentAr: "Contenu AR",
      contentFr: "Contenu FR",
      active: "Actif",
      create: "Creer l'avis",
      save: "Enregistrer l'avis",
      unable: "Impossible d'enregistrer l'avis"
    },
    settingsForm: {
      agencyNameAr: "Nom de l'agence AR",
      agencyNameFr: "Nom de l'agence FR",
      email: "E-mail",
      phone: "Telephone",
      whatsapp: "WhatsApp",
      cityAr: "Ville AR",
      cityFr: "Ville FR",
      facebookUrl: "URL Facebook",
      instagramUrl: "URL Instagram",
      tiktokUrl: "URL TikTok",
      addressAr: "Adresse AR",
      addressFr: "Adresse FR",
      officeHoursAr: "Horaires AR",
      officeHoursFr: "Horaires FR",
      heroTitleAr: "Titre hero AR",
      heroTitleFr: "Titre hero FR",
      heroSubtitleAr: "Sous-titre hero AR",
      heroSubtitleFr: "Sous-titre hero FR",
      aboutIntroAr: "Introduction a propos AR",
      aboutIntroFr: "Introduction a propos FR",
      promiseAr: "Promesse AR",
      promiseFr: "Promesse FR",
      whyChooseTitleAr: "Titre pourquoi nous AR",
      whyChooseTitleFr: "Titre pourquoi nous FR",
      whyChooseTextAr: "Texte pourquoi nous AR",
      whyChooseTextFr: "Texte pourquoi nous FR",
      save: "Enregistrer les parametres",
      success: "Parametres mis a jour avec succes.",
      unable: "Impossible de mettre a jour les parametres"
    },
    packageForm: {
      titleCreate: "Creer un forfait",
      titleEdit: "Modifier le forfait",
      basics: "Informations principales",
      destinations: "Destinations",
      pricingGroups: "Groupes tarifaires",
      inclusions: "Prestations incluses",
      notes: "Notes",
      hotels: "Hotels",
      slug: "Slug",
      heroImage: "Image hero",
      titleAr: "Titre AR",
      titleFr: "Titre FR",
      shortDescriptionAr: "Description courte AR",
      shortDescriptionFr: "Description courte FR",
      descriptionAr: "Description AR",
      descriptionFr: "Description FR",
      startDate: "Date de debut",
      endDate: "Date de fin",
      durationDays: "Duree en jours",
      countryAr: "Pays AR",
      countryFr: "Pays FR",
      originCityAr: "Ville de depart AR",
      originCityFr: "Ville de depart FR",
      directFlight: "Vol direct",
      featuredPackage: "Forfait mis en avant",
      active: "Actif",
      visaIncluded: "Visa inclus",
      addDestination: "Ajouter une destination",
      addPriceGroup: "Ajouter un groupe tarifaire",
      addTier: "Ajouter un palier",
      addInclusion: "Ajouter une prestation",
      addNote: "Ajouter une note",
      addHotel: "Ajouter un hotel",
      destinationNameAr: "Nom AR",
      destinationNameFr: "Nom FR",
      airportCode: "Code aeroport",
      roomTypeAr: "Type de chambre AR",
      roomTypeFr: "Type de chambre FR",
      labelAr: "Libelle AR",
      labelFr: "Libelle FR",
      amountMad: "Montant MAD",
      textAr: "Texte AR",
      textFr: "Texte FR",
      hotelName: "Nom de l'hotel",
      hotelCity: "Ville",
      stars: "Etoiles",
      priceGroup: "Groupe tarifaire",
      create: "Creer le forfait",
      save: "Enregistrer le forfait",
      unable: "Impossible d'enregistrer le forfait"
    }
  }
} as const;

export type AdminDictionary = (typeof adminDictionaries)[AdminLocale];

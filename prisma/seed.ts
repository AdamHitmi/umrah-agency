import {AdminRole} from "@prisma/client";

import {hashPassword} from "@/lib/auth/password";
import {prisma} from "@/lib/db";

async function main() {
  const passwordHash = await hashPassword("ChangeMe123!");

  await prisma.bookingRequest.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.packagePriceTier.deleteMany();
  await prisma.packagePriceGroup.deleteMany();
  await prisma.packageDestination.deleteMany();
  await prisma.packageInclusion.deleteMany();
  await prisma.packageNote.deleteMany();
  await prisma.hotelOption.deleteMany();
  await prisma.package.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.adminUser.deleteMany();

  await prisma.adminUser.create({
    data: {
      email: "admin@example.com",
      passwordHash,
      name: "Agency Admin",
      role: AdminRole.SUPER_ADMIN
    }
  });

  await prisma.siteSetting.create({
    data: {
      agencyNameAr: "مؤسسة الأجنحة الحديثة",
      agencyNameFr: "Al Ajniha Al Haditha",
      email: "hitmiadam96@gmail.com",
      phone: "+212649898456",
      whatsapp: "+212649898456",
      cityAr: "الدار البيضاء",
      cityFr: "Casablanca",
      addressAr: "حي الأعمال، الدار البيضاء، المغرب",
      addressFr: "Quartier d'affaires, Casablanca, Maroc",
      officeHoursAr: "من الإثنين إلى السبت، 09:00 - 19:00",
      officeHoursFr: "Du lundi au samedi, 09:00 - 19:00",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      tiktokUrl: "https://tiktok.com",
      heroTitleAr: "عمرة يناير الفاخرة برحلة مباشرة من الدار البيضاء",
      heroTitleFr: "Omra de janvier en vol direct depuis Casablanca",
      heroSubtitleAr:
        "برنامج راق ومطمئن مع تأشيرة عمرة، تذكرة ذهاب وإياب، وإقامة مختارة بعناية لخدمة المعتمرين من المغرب.",
      heroSubtitleFr:
        "Une formule haut de gamme avec visa Omra, billet aller-retour et hebergement soigneusement selectionne pour les voyageurs marocains.",
      aboutIntroAr:
        "نصمم رحلات عمرة تجمع بين الراحة والتنظيم الدقيق والرفقة الموثوقة من الانطلاق حتى العودة.",
      aboutIntroFr:
        "Nous concevons des voyages Omra qui allient confort, organisation precise et accompagnement fiable du depart au retour.",
      promiseAr:
        "التزامنا هو تقديم تجربة روحية راقية، بخدمة إنسانية واضحة وأسعار شفافة وإشراف مهني في كل مرحلة.",
      promiseFr:
        "Notre promesse est de proposer une experience spirituelle premium avec un service humain, des tarifs transparents et un suivi professionnel a chaque etape.",
      whyChooseTitleAr: "لماذا يختارنا المعتمرون؟",
      whyChooseTitleFr: "Pourquoi les voyageurs nous choisissent-ils ?",
      whyChooseTextAr:
        "لأننا نجمع بين الجودة الفندقية، الانطلاقة المريحة، والتواصل الواضح قبل الرحلة وأثناءها.",
      whyChooseTextFr:
        "Parce que nous reunissons qualite hoteliere, depart confortable et communication claire avant et pendant le voyage."
    }
  });

  const packageRecord = await prisma.package.create({
    data: {
      slug: "omra-janvier",
      titleAr: "عمرة يناير",
      titleFr: "Omra Janvier",
      shortDescriptionAr:
        "رحلة مباشرة من الدار البيضاء مع إقامة مريحة وخدمات أساسية متكاملة.",
      shortDescriptionFr:
        "Vol direct depuis Casablanca avec hebergement confortable et services essentiels inclus.",
      descriptionAr:
        "باقة عمرة يناير صممت للمسافرين الباحثين عن الراحة والتنظيم مع انطلاقة مباشرة من الدار البيضاء ومسار يمر عبر المدينة المنورة وجدة ومكة المكرمة. يشمل البرنامج تذكرة ذهابا وإيابا، سكن بفنادق مختارة، ومواكبة عملية تساعد على تجربة روحانية هادئة وواضحة.",
      descriptionFr:
        "La formule Omra Janvier est pensee pour les voyageurs en quete de confort et d'organisation, avec un depart direct de Casablanca et un itineraire passant par Medine, Djeddah et La Mecque. Le programme inclut le billet aller-retour, l'hebergement dans des hotels selectionnes et un accompagnement pour une experience spirituelle sereine.",
      startDate: new Date("2027-01-13T00:00:00.000Z"),
      endDate: new Date("2027-01-26T00:00:00.000Z"),
      durationDays: 14,
      isDirectFlight: true,
      countryAr: "المملكة العربية السعودية",
      countryFr: "Arabie saoudite",
      originCityAr: "الدار البيضاء",
      originCityFr: "Casablanca",
      featured: true,
      active: true,
      visaIncluded: true,
      heroImage: "/images/umrah-hero.svg",
      destinations: {
        create: [
          {
            nameAr: "الدار البيضاء",
            nameFr: "Casablanca",
            airportCode: "CMN",
            sortOrder: 0
          },
          {
            nameAr: "المدينة المنورة",
            nameFr: "Medine",
            airportCode: "MED",
            sortOrder: 1
          },
          {
            nameAr: "جدة",
            nameFr: "Djeddah",
            airportCode: "JED",
            sortOrder: 2
          },
          {
            nameAr: "مكة المكرمة",
            nameFr: "La Mecque",
            airportCode: null,
            sortOrder: 3
          }
        ]
      },
      priceGroups: {
        create: [
          {
            roomTypeAr: "رباعية",
            roomTypeFr: "Quadruple",
            sortOrder: 0,
            tiers: {
              create: [13500, 16200, 21500, 23500].map((amount, index) => ({
                labelAr: `الخيار ${index + 1}`,
                labelFr: `Option ${index + 1}`,
                amountMad: amount,
                sortOrder: index
              }))
            }
          },
          {
            roomTypeAr: "ثلاثية",
            roomTypeFr: "Triple",
            sortOrder: 1,
            tiers: {
              create: [14500, 17200, 22500, 25000].map((amount, index) => ({
                labelAr: `الخيار ${index + 1}`,
                labelFr: `Option ${index + 1}`,
                amountMad: amount,
                sortOrder: index
              }))
            }
          },
          {
            roomTypeAr: "ثنائية",
            roomTypeFr: "Double",
            sortOrder: 2,
            tiers: {
              create: [21500, 24000, 26500, 28500].map((amount, index) => ({
                labelAr: `الخيار ${index + 1}`,
                labelFr: `Option ${index + 1}`,
                amountMad: amount,
                sortOrder: index
              }))
            }
          }
        ]
      },
      inclusions: {
        create: [
          {
            textAr: "تذكرة الطائرة ذهابا وإيابا",
            textFr: "Billet d'avion aller-retour",
            sortOrder: 0
          },
          {
            textAr: "السكن بالفنادق المذكورة باللائحة أو ما يعادلها",
            textFr: "Hebergement dans les hotels mentionnes ou equivalent",
            sortOrder: 1
          },
          {
            textAr: "خدمة تأشيرة العمرة",
            textFr: "Assistance visa Omra",
            sortOrder: 2
          }
        ]
      },
      notes: {
        create: [
          {
            textAr: "تاريخ السفر قابل للتغيير في حالة إصدار قوانين طارئة",
            textFr:
              "La date de voyage peut etre modifiee en cas de nouvelles reglementations d'urgence",
            sortOrder: 0
          }
        ]
      },
      hotels: {
        create: [
          {
            name: "Premium Haram Stay",
            city: "Makkah",
            stars: 5,
            descriptionAr: "فندق قريب من الحرم مع خدمات استقبال وراحة عالية.",
            descriptionFr: "Hotel proche du Haram avec accueil soigne et excellent confort.",
            sortOrder: 0
          },
          {
            name: "Rawda Serenity Suites",
            city: "Medina",
            stars: 4,
            descriptionAr: "إقامة هادئة في المدينة المنورة مع غرف رحبة وخدمة موثوقة.",
            descriptionFr: "Sejour paisible a Medine avec chambres spacieuses et service fiable.",
            sortOrder: 1
          }
        ]
      }
    }
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "سعاد المريني",
        city: "الدار البيضاء",
        rating: 5,
        contentAr:
          "تنظيم ممتاز من أول اتصال حتى العودة. الرحلة كانت مريحة والفريق حاضر معنا في كل التفاصيل.",
        contentFr:
          "Une organisation remarquable du premier appel jusqu'au retour. Le voyage etait confortable et l'equipe presente a chaque etape.",
        active: true,
        sortOrder: 0
      },
      {
        name: "Youssef El Idrissi",
        city: "Rabat",
        rating: 5,
        contentAr:
          "أعجبتني الشفافية في الأسعار وجودة الفنادق، وكان التواصل عبر واتساب سريعاً جداً.",
        contentFr:
          "J'ai apprecie la transparence des tarifs, la qualite des hotels et la rapidite de communication sur WhatsApp.",
        active: true,
        sortOrder: 1
      },
      {
        name: "خديجة بنجلون",
        city: "طنجة",
        rating: 4,
        contentAr:
          "خدمة محترفة ومريحة خاصة للمرة الأولى في العمرة. أوصي بهذه الوكالة بثقة.",
        contentFr:
          "Un service professionnel et rassurant, surtout pour une premiere Omra. Je recommande cette agence en toute confiance.",
        active: true,
        sortOrder: 2
      }
    ]
  });

  await prisma.fAQ.createMany({
    data: [
      {
        questionAr: "ما هي الوثائق المطلوبة لطلب العمرة؟",
        questionFr: "Quels documents sont necessaires pour la Omra ?",
        answerAr:
          "غالباً نحتاج إلى جواز سفر صالح وصور شخصية والوثائق الإدارية المطلوبة وقت تقديم الملف. فريقنا يؤكد لك اللائحة النهائية قبل الانطلاق.",
        answerFr:
          "En general, nous demandons un passeport valide, des photos d'identite et les pieces administratives requises au moment du depot. Notre equipe confirme la liste finale avant le depart.",
        sortOrder: 0,
        active: true
      },
      {
        questionAr: "هل الرحلة مباشرة من الدار البيضاء؟",
        questionFr: "Le depart se fait-il en vol direct depuis Casablanca ?",
        answerAr:
          "نعم، الباقة الحالية تعتمد رحلة مباشرة، ويتم تأكيد التفاصيل النهائية مع تذاكر السفر.",
        answerFr:
          "Oui, la formule actuelle repose sur un vol direct, avec confirmation finale dans les billets emis.",
        sortOrder: 1,
        active: true
      },
      {
        questionAr: "هل يمكن أن تتغير تواريخ السفر؟",
        questionFr: "Les dates de voyage peuvent-elles changer ?",
        answerAr:
          "نعم، قد تتغير المواعيد إذا صدرت قوانين طارئة أو تعليمات تنظيمية جديدة مرتبطة بالسفر أو التأشيرات.",
        answerFr:
          "Oui, les dates peuvent changer en cas de nouvelles regles d'urgence ou d'instructions liees au voyage et aux visas.",
        sortOrder: 2,
        active: true
      },
      {
        questionAr: "كيف يتم الحجز والدفع؟",
        questionFr: "Comment se passent la reservation et le paiement ?",
        answerAr:
          "يمكن إرسال طلب الحجز عبر الموقع أو واتساب، ثم يتواصل معك فريقنا لتأكيد المقاعد وخطوات الدفع والمستندات.",
        answerFr:
          "Vous pouvez envoyer une demande via le site ou WhatsApp, puis notre equipe vous contacte pour confirmer les places, les etapes de paiement et les documents.",
        sortOrder: 3,
        active: true
      }
    ]
  });

  console.log(`Seed completed for package ${packageRecord.titleAr}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

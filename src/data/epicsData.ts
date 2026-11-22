import {
  AvatarStage,
  DifficultyLevel,
  EpicCategory,
  KandaStage,
  ParvaGroup,
  QuizQuestion,
  StudyLesson,
} from '../types';

export const ARCHIVE_IMAGES = {
  hero: '/src/assets/images/hero_itihasa_manuscript_1795328088450.jpg',
  Ramayana: '/src/assets/images/epic_ramayana_forest_1795328088255.jpg',
  Mahabharata: '/src/assets/images/epic_mahabharata_chariot_1795328088619.jpg',
  Puranas: '/src/assets/images/epic_puranas_cosmos_1795328089269.jpg',
} as const;

export const DIFFICULTY_META: Record<
  DifficultyLevel,
  { sanskritTitle: string; label: string; description: string }
> = {
  Easy: {
    sanskritTitle: 'Jijnasu',
    label: 'Seeker',
    description: 'Foundational stories, central heroes, and widely known events across the epics.',
  },
  Medium: {
    sanskritTitle: 'Sadhaka',
    label: 'Practitioner',
    description: 'Specific Kandas and Parvas, divine weapons, boons, and supporting characters.',
  },
  Hard: {
    sanskritTitle: 'Vidwan',
    label: 'Scholar',
    description: 'Intricate lineages, lesser-known sages, Upanishadic dialogues, and scriptural details.',
  },
};

export const EPIC_DESCRIPTIONS: Record<
  EpicCategory,
  { subtitle: string; scope: string; caption: string }
> = {
  Ramayana: {
    subtitle: 'Adikavya · Valmiki',
    scope: '7 Kandas · 24,000 Verses',
    caption: 'Fig. 2 · Panchavati forest and the golden deer',
  },
  Mahabharata: {
    subtitle: 'Fifth Veda · Vyasa',
    scope: '18 Parvas · Bhagavad Gita',
    caption: 'Fig. 3 · Kurukshetra war chariot at dawn',
  },
  Puranas: {
    subtitle: 'Cosmic Lore · Upanishads',
    scope: '18 Mahapuranas · Dashavatara',
    caption: 'Fig. 4 · Churning of the Cosmic Ocean',
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ========================
  // EASY — RAMAYANA (5)
  // ========================
  {
    id: 'ram-e1',
    epic: 'Ramayana',
    difficulty: 'Easy',
    sourceRef: 'Bala Kanda',
    question: 'Who composed the original Sanskrit Ramayana, revered as the Adikavya (First Poem)?',
    options: ['Sage Vyasa', 'Sage Valmiki', 'Goswami Tulsidas', 'Sage Vishwamitra'],
    correctIndex: 1,
    explanation:
      'Maharishi Valmiki composed the original 24,000-verse Sanskrit Ramayana. Centuries later, Goswami Tulsidas authored the Ramcharitmanas in Awadhi.',
  },
  {
    id: 'ram-e2',
    epic: 'Ramayana',
    difficulty: 'Easy',
    sourceRef: 'Ayodhya Kanda',
    question: 'For how many years was Prince Rama exiled to the forest under Queen Kaikeyi’s boon?',
    options: ['10 years', '12 years', '14 years', '16 years'],
    correctIndex: 2,
    explanation:
      'Queen Kaikeyi invoked two boons earlier promised by King Dasharatha: crowning her son Bharata as king and sending Rama into a 14-year forest exile.',
  },
  {
    id: 'ram-e3',
    epic: 'Ramayana',
    difficulty: 'Easy',
    sourceRef: 'Aranya Kanda',
    question: 'Which aged eagle-king fought Ravana in mid-air while trying to rescue Sita?',
    options: ['Garuda', 'Jatayu', 'Sampati', 'Kakabhushundi'],
    correctIndex: 1,
    explanation:
      'Jatayu, a devoted friend of King Dasharatha, intercepted Ravana’s chariot despite his advanced age and lived just long enough to tell Rama which direction Sita had been taken.',
  },
  {
    id: 'ram-e4',
    epic: 'Ramayana',
    difficulty: 'Easy',
    sourceRef: 'Sundara Kanda',
    question: 'Where in Lanka was Sita kept captive while guarded by Rakshasis?',
    options: ['Panchavati Grove', 'Ashoka Vatika', 'Chitrakoot Hill', 'Dandaka Forest'],
    correctIndex: 1,
    explanation:
      'Ravana confined Sita in the serene Ashoka Vatika garden, where Hanuman eventually found her seated beneath a Simsupa tree and presented Rama’s signet ring.',
  },
  {
    id: 'ram-e5',
    epic: 'Ramayana',
    difficulty: 'Easy',
    sourceRef: 'Ayodhya Kanda',
    question: 'What did Bharata place upon the throne of Ayodhya while ruling as regent during Rama’s exile?',
    options: ['Rama’s golden crown', 'Rama’s bow Kodanda', 'Rama’s wooden sandals (Padukas)', 'A portrait of Rama'],
    correctIndex: 2,
    explanation:
      'Refusing to usurp his elder brother’s rightful throne, Bharata brought Rama’s Padukas from Chitrakoot, placed them on the royal seat, and governed Ayodhya from Nandigrama as a humble custodian.',
  },

  // ========================
  // EASY — MAHABHARATA (5)
  // ========================
  {
    id: 'mah-e1',
    epic: 'Mahabharata',
    difficulty: 'Easy',
    sourceRef: 'Adi Parva',
    question: 'Who served as the scribe who wrote down the Mahabharata as Sage Vyasa recited it?',
    options: ['Narada Muni', 'Lord Ganesha', 'Lord Brahma', 'Shukadeva'],
    correctIndex: 1,
    explanation:
      'Lord Ganesha agreed to transcribe Vyasa’s verses without pausing, provided Vyasa never stopped dictating; Vyasa countered by asking Ganesha to understand every verse before writing it.',
  },
  {
    id: 'mah-e2',
    epic: 'Mahabharata',
    difficulty: 'Easy',
    sourceRef: 'Bhishma Parva',
    question: 'For how many days was the great war of Kurukshetra fought?',
    options: ['10 days', '14 days', '18 days', '21 days'],
    correctIndex: 2,
    explanation:
      'The Kurukshetra war lasted 18 days—mirroring the 18 Parvas (books) of the Mahabharata and the 18 chapters of the Bhagavad Gita.',
  },
  {
    id: 'mah-e3',
    epic: 'Mahabharata',
    difficulty: 'Easy',
    sourceRef: 'Bhishma Parva',
    question: 'Who acted as Arjuna’s charioteer and delivered the teachings of the Bhagavad Gita?',
    options: ['Bhishma', 'Dronacharya', 'Lord Krishna', 'Vidura'],
    correctIndex: 2,
    explanation:
      'Seeing Arjuna overcome with grief at facing his own elders and kinsmen, Lord Krishna imparted the 700-verse Bhagavad Gita on duty, detachment, and spiritual wisdom.',
  },
  {
    id: 'mah-e4',
    epic: 'Mahabharata',
    difficulty: 'Easy',
    sourceRef: 'Adi Parva',
    question: 'Which Pandava brother was the son of Vayu (the wind deity) and renowned for his mastery of the mace?',
    options: ['Yudhishthira', 'Bhima', 'Nakula', 'Sahadeva'],
    correctIndex: 1,
    explanation:
      'Bhima, the second Pandava, possessed extraordinary physical strength and fought the climactic mace duel against Duryodhana.',
  },
  {
    id: 'mah-e5',
    epic: 'Mahabharata',
    difficulty: 'Easy',
    sourceRef: 'Sabha Parva',
    question: 'What was the name of the magnificent palace built by the Maya Danava for the Pandavas in Indraprastha?',
    options: ['Maya Sabha', 'Amaravati', 'Hastina Bhavan', 'Vaikuntha'],
    correctIndex: 0,
    explanation:
      'The Maya Sabha (Hall of Illusions) featured crystal floors that looked like water and pools that looked like solid stone, sparking Duryodhana’s bitter envy.',
  },

  // ========================
  // EASY — PURANAS (5)
  // ========================
  {
    id: 'pur-e1',
    epic: 'Puranas',
    difficulty: 'Easy',
    sourceRef: 'Bhagavata Purana',
    question: 'In the Samudra Manthan (Churning of the Ocean), which mountain served as the churning rod?',
    options: ['Mount Kailash', 'Mount Mandara', 'Mount Meru', 'Mount Govardhana'],
    correctIndex: 1,
    explanation:
      'Devas and Asuras used Mount Mandara as the churning rod, the serpent king Vasuki as the rope, and Lord Vishnu in his Kurma (tortoise) avatar as the steady pivot beneath.',
  },
  {
    id: 'pur-e2',
    epic: 'Puranas',
    difficulty: 'Easy',
    sourceRef: 'Narasimha Purana',
    question: 'Which young devotee of Vishnu was protected from King Hiranyakashipu by the Narasimha avatar?',
    options: ['Dhruva', 'Prahlada', 'Nachiketa', 'Markandeya'],
    correctIndex: 1,
    explanation:
      'Prahlada remained steadfast in devotion despite severe persecution. Vishnu emerged from a palace pillar as Narasimha (half-man, half-lion) to honor Brahma’s intricate boon conditions while defending Prahlada.',
  },
  {
    id: 'pur-e3',
    epic: 'Puranas',
    difficulty: 'Easy',
    sourceRef: 'Garuda Purana',
    question: 'What is the traditional count of Lord Vishnu’s primary avatars known as the Dashavatara?',
    options: ['Seven', 'Eight', 'Ten', 'Twelve'],
    correctIndex: 2,
    explanation:
      'Dashavatara literally translates to “Ten Avatars”—beginning with Matsya (Fish) and culminating in Kalki at the close of the Kali Yuga.',
  },
  {
    id: 'pur-e4',
    epic: 'Puranas',
    difficulty: 'Easy',
    sourceRef: 'Vishnu Purana',
    question: 'Which king’s relentless penance brought the sacred river Ganga down from heaven to earth?',
    options: ['King Sagar', 'King Bhagiratha', 'King Harishchandra', 'King Dilipa'],
    correctIndex: 1,
    explanation:
      'To liberate the souls of his 60,000 ancestors, King Bhagiratha performed severe austerities until Ganga agreed to descend, cushioned gently in Lord Shiva’s matted locks.',
  },
  {
    id: 'pur-e5',
    epic: 'Puranas',
    difficulty: 'Easy',
    sourceRef: 'Devi Mahatmya',
    question: 'Which powerful buffalo demon was vanquished by Goddess Durga after nine nights of fierce cosmic battle?',
    options: ['Raktabija', 'Shumbha', 'Mahishasura', 'Tarakasura'],
    correctIndex: 2,
    explanation:
      'Goddess Durga (Mahishasuramardini) defeated Mahishasura, an event celebrated during Navaratri and Vijayadashami as the triumph of inner clarity over delusion.',
  },

  // ========================
  // MEDIUM — RAMAYANA (5)
  // ========================
  {
    id: 'ram-m1',
    epic: 'Ramayana',
    difficulty: 'Medium',
    sourceRef: 'Ayodhya Kanda',
    question: 'Who was Lakshmana’s wife, celebrated in regional traditions for taking on fourteen years of sleep so Lakshmana could stay awake guarding Rama?',
    options: ['Mandavi', 'Urmila', 'Shrutakirti', 'Sulochana'],
    correctIndex: 1,
    explanation:
      'Urmila, sister of Sita and daughter of King Janaka, accepted Nidra Devi’s slumber on Lakshmana’s behalf so he could remain tirelessly vigilant throughout the exile.',
  },
  {
    id: 'ram-m2',
    epic: 'Ramayana',
    difficulty: 'Medium',
    sourceRef: 'Sundara Kanda',
    question: 'Which book (Kanda) of Valmiki’s Ramayana is dedicated primarily to Hanuman’s leap across the ocean and discovery of Sita?',
    options: ['Aranya Kanda', 'Kishkindha Kanda', 'Sundara Kanda', 'Yuddha Kanda'],
    correctIndex: 2,
    explanation:
      'Sundara Kanda (“The Beautiful Book”) is the fifth of the seven Kandas and centers on Hanuman’s courage, discernment, and selfless devotion.',
  },
  {
    id: 'ram-m3',
    epic: 'Ramayana',
    difficulty: 'Medium',
    sourceRef: 'Bala Kanda',
    question: 'What was the name of Lord Shiva’s mighty bow strung and broken by Rama at Sita’s Swayamvara in Mithila?',
    options: ['Gandiva', 'Pinaka', 'Sharanga', 'Vijaya'],
    correctIndex: 1,
    explanation:
      'Pinaka (also called Haradhanu) was Shiva’s bow preserved in King Janaka’s court. Gandiva belonged to Arjuna, Sharanga to Vishnu, and Vijaya to Karna.',
  },
  {
    id: 'ram-m4',
    epic: 'Ramayana',
    difficulty: 'Medium',
    sourceRef: 'Aranya Kanda',
    question: 'Which elderly tribal devotee at Sage Matanga’s hermitage tasted berries before offering the sweetest ones to Rama?',
    options: ['Shabari', 'Anasuya', 'Ahalya', 'Trijata'],
    correctIndex: 0,
    explanation:
      'Shabari waited faithfully for decades on her guru Matanga’s assurance that Rama would visit. Her simple offering of berries is remembered as an emblem of pure Bhakti.',
  },
  {
    id: 'ram-m5',
    epic: 'Ramayana',
    difficulty: 'Medium',
    sourceRef: 'Yuddha Kanda',
    question: 'Which two Vanara architects, sons of Vishwakarma, engineered the floating stone bridge (Rama Setu) to Lanka?',
    options: ['Vali and Sugriva', 'Nala and Nila', 'Angada and Tara', 'Mainda and Dvivida'],
    correctIndex: 1,
    explanation:
      'Nala and Nila possessed the blessing that stones cast into the sea by their hands would remain buoyant, enabling Rama’s army to construct the causeway across the ocean.',
  },

  // ========================
  // MEDIUM — MAHABHARATA (5)
  // ========================
  {
    id: 'mah-m1',
    epic: 'Mahabharata',
    difficulty: 'Medium',
    sourceRef: 'Bhishma Parva',
    question: 'Within which of the eighteen Parvas of the Mahabharata does the Bhagavad Gita appear?',
    options: ['Vana Parva', 'Udyoga Parva', 'Bhishma Parva', 'Shanti Parva'],
    correctIndex: 2,
    explanation:
      'The Bhagavad Gita comprises chapters 23 to 40 of the Bhishma Parva, the sixth book of the Mahabharata, delivered right before the first day’s battle.',
  },
  {
    id: 'mah-m2',
    epic: 'Mahabharata',
    difficulty: 'Medium',
    sourceRef: 'Adi Parva',
    question: 'What was Bhishma’s given name before he took his vow of lifelong celibacy and renunciation of the throne?',
    options: ['Devavrata', 'Chitrangada', 'Vichitravirya', 'Pratipa'],
    correctIndex: 0,
    explanation:
      'Born as Devavrata to King Shantanu and Goddess Ganga, he became known as Bhishma (“He of the Terrible Vow”) when he renounced kingship and marriage for his father’s happiness.',
  },
  {
    id: 'mah-m3',
    epic: 'Mahabharata',
    difficulty: 'Medium',
    sourceRef: 'Drona Parva',
    question: 'On the 13th day of the Kurukshetra war, which young hero breached the Chakravyuha formation but could not exit it?',
    options: ['Ghatotkacha', 'Abhimanyu', 'Iravan', 'Upapandava'],
    correctIndex: 1,
    explanation:
      'Abhimanyu, son of Arjuna and Subhadra, had overheard how to enter the spinning lotus-disc formation while in the womb, yet never heard the method of escape.',
  },
  {
    id: 'mah-m4',
    epic: 'Mahabharata',
    difficulty: 'Medium',
    sourceRef: 'Vana Parva',
    question: 'In the Yaksha Prashna episode, how did Yudhishthira revive his four fallen brothers by the enchanted lake?',
    options: [
      'By defeating the Yaksha in archery',
      'By answering the Yaksha’s philosophical riddles wisely',
      'By offering royal gold to the forest spirits',
      'By performing a fire sacrifice',
    ],
    correctIndex: 1,
    explanation:
      'Yudhishthira patiently heeded the Yaksha’s warning and answered every question on Dharma, courage, and human delusion—earning back the lives of all four brothers.',
  },
  {
    id: 'mah-m5',
    epic: 'Mahabharata',
    difficulty: 'Medium',
    sourceRef: 'Adi Parva',
    question: 'Why did Ekalavya sever his own right thumb and offer it to Guru Dronacharya?',
    options: [
      'As atonement for breaking a vow of silence',
      'As Gurudakshina after Drona asked for it',
      'To prove loyalty to the Pandava brothers',
      'Because he lost an archery contest to Arjuna',
    ],
    correctIndex: 1,
    explanation:
      'Though Drona had declined to teach him, Ekalavya mastered archery before a clay image of Drona. When Drona saw his skill and requested his right thumb as Gurudakshina, Ekalavya complied without hesitation.',
  },

  // ========================
  // MEDIUM — PURANAS (5)
  // ========================
  {
    id: 'pur-m1',
    epic: 'Puranas',
    difficulty: 'Medium',
    sourceRef: 'Katha Upanishad',
    question: 'In the Katha Upanishad, which young boy engages Yama (Lord of Death) in a dialogue on the eternal Self?',
    options: ['Satyakama', 'Nachiketa', 'Shvetaketu', 'Uddalaka'],
    correctIndex: 1,
    explanation:
      'Nachiketa waited three days at Yama’s abode without food or water, then declined every material blessing in favor of understanding what endures beyond physical death.',
  },
  {
    id: 'pur-m2',
    epic: 'Puranas',
    difficulty: 'Medium',
    sourceRef: 'Shiva & Devi Puranas',
    question: 'Which sage willingly gave up his mortal body so that Indra could forge the invincible Vajra weapon from his spine to defeat Vritrasura?',
    options: ['Sage Durvasa', 'Sage Dadhichi', 'Sage Kashyapa', 'Sage Bhrigu'],
    correctIndex: 1,
    explanation:
      'Sage Dadhichi entered deep yogic samadhi and relinquished his body so Vishwakarma could craft the thunderbolt Vajra from his bones for cosmic welfare.',
  },
  {
    id: 'pur-m3',
    epic: 'Puranas',
    difficulty: 'Medium',
    sourceRef: 'Matsya Purana',
    question: 'Which virtuous king was guided through the great cosmic deluge by Vishnu’s Matsya (Fish) avatar and became the progenitor of humanity in the present Manvantara?',
    options: ['Vaivasvata Manu', 'King Yayati', 'King Ikshvaku', 'King Pururavas'],
    correctIndex: 0,
    explanation:
      'Vaivasvata Manu sheltered the seven sages and seeds of life in a great vessel towed by Matsya until the floodwaters receded.',
  },
  {
    id: 'pur-m4',
    epic: 'Puranas',
    difficulty: 'Medium',
    sourceRef: 'Bhagavata Purana',
    question: 'During the Samudra Manthan, what emerged first from the ocean before any divine treasures appeared, forcing Lord Shiva to swallow it?',
    options: ['Kamdhenu the wish-fulfilling cow', 'Halahala deadly poison', 'Parijata the celestial tree', 'Panchajanya conch'],
    correctIndex: 1,
    explanation:
      'Before treasures like Lakshmi and Amrita surfaced, the lethal Halahala poison threatened to consume all worlds. Shiva held it in his throat, earning the name Neelakantha.',
  },
  {
    id: 'pur-m5',
    epic: 'Puranas',
    difficulty: 'Medium',
    sourceRef: 'Vamana Purana',
    question: 'In his Vamana (Dwarf) avatar, from which generous Asura king did Lord Vishnu ask for just three paces of land?',
    options: ['King Virochana', 'King Mahabali', 'King Banasura', 'King Kalanemi'],
    correctIndex: 1,
    explanation:
      'King Mahabali honored his word even after recognizing Vamana’s cosmic stature—offering his own head for the third step after Vamana covered earth and heaven in two.',
  },

  // ========================
  // HARD — RAMAYANA (5)
  // ========================
  {
    id: 'ram-h1',
    epic: 'Ramayana',
    difficulty: 'Hard',
    sourceRef: 'Kishkindha Kanda',
    question: 'Who was Jatayu’s elder brother whose wings were scorched shielding Jatayu from the sun, and who used his distant vision to spot Sita in Lanka?',
    options: ['Suparshva', 'Sampati', 'Aruna', 'Matali'],
    correctIndex: 1,
    explanation:
      'Sampati lost his wings in youth while protecting his younger brother Jatayu near the sun’s path. Resting in the Vindhya hills, he spotted Sita across the ocean and guided Hanuman’s search party.',
  },
  {
    id: 'ram-h2',
    epic: 'Ramayana',
    difficulty: 'Hard',
    sourceRef: 'Yuddha Kanda',
    question: 'On the battlefield of Lanka, which sage appeared before an exhausted Rama and taught him the sacred Aditya Hridayam hymn?',
    options: ['Sage Vishwamitra', 'Sage Agastya', 'Sage Vashistha', 'Sage Bharadwaja'],
    correctIndex: 1,
    explanation:
      'Seeing Rama fatigued during the fierce final confrontation with Ravana, Sage Agastya imparted the 31-verse Aditya Hridayam stotra in praise of Surya, renewing Rama’s inner resolve.',
  },
  {
    id: 'ram-h3',
    epic: 'Ramayana',
    difficulty: 'Hard',
    sourceRef: 'Uttara Kanda',
    question: 'Why did Ravana’s brother Kumbhakarna fall into six-month periods of slumber when requesting a boon from Brahma?',
    options: [
      'A curse placed by Sage Narada',
      'Saraswati caused his tongue to slip from “Indrasana” to “Nidrasana”',
      'He drank an enchanted potion brewed by Maya',
      'He volunteered to sleep to conserve Lanka’s food stores',
    ],
    correctIndex: 1,
    explanation:
      'Alarmed that Kumbhakarna intended to ask for Indrasana (Indra’s throne), Goddess Saraswati altered his speech so he uttered “Nidrasana” (bed of sleep), which Brahma later moderated to six-month intervals.',
  },
  {
    id: 'ram-h4',
    epic: 'Ramayana',
    difficulty: 'Hard',
    sourceRef: 'Uttara Kanda',
    question: 'Which demon of Madhuvana, who wielded Lord Shiva’s invincible trident, was slain by Rama’s youngest brother Shatrughna?',
    options: ['Subahu', 'Viradha', 'Lavanasura', 'Kabandha'],
    correctIndex: 2,
    explanation:
      'Lavanasura could not be defeated while holding his ancestral trident. Shatrughna waited patiently until Lavanasura ventured out to hunt unarmed, vanquished him, and founded the city of Mathura.',
  },
  {
    id: 'ram-h5',
    epic: 'Ramayana',
    difficulty: 'Hard',
    sourceRef: 'Yuddha Kanda',
    question: 'Which celestial charioteer of Indra was dispatched to drive Rama’s divine chariot during the decisive duel with Ravana?',
    options: ['Chitraratha', 'Matali', 'Daruka', 'Sumantra'],
    correctIndex: 1,
    explanation:
      'Recognizing that Ravana fought from a chariot while Rama stood barefoot on the ground, Indra sent his own charioteer Matali along with celestial armor and a golden chariot.',
  },

  // ========================
  // HARD — MAHABHARATA (5)
  // ========================
  {
    id: 'mah-h1',
    epic: 'Mahabharata',
    difficulty: 'Hard',
    sourceRef: 'Vana & Karna Parvas',
    question: 'What was the name of the single-use divine dart Indra gave Karna in exchange for his natural golden armor and earrings?',
    options: ['Pashupatastra', 'Vasavi Shakti', 'Narayanastra', 'Brahmashirsha'],
    correctIndex: 1,
    explanation:
      'Indra gifted Karna the infallible Vasavi Shakti spear, usable only once. Krishna later maneuvered Ghatotkacha’s night assault so Karna had to expend the spear on Ghatotkacha rather than Arjuna.',
  },
  {
    id: 'mah-h2',
    epic: 'Mahabharata',
    difficulty: 'Hard',
    sourceRef: 'Bhishma Parva',
    question: 'Which son of Dhritarashtra chose to leave the Kaurava ranks and fight on the Pandava side right before the war began?',
    options: ['Vikarna', 'Yuyutsu', 'Chitrasena', 'Durmukha'],
    correctIndex: 1,
    explanation:
      'When Yudhishthira invited anyone wishing to join the side of Dharma before the first clash, Yuyutsu—Dhritarashtra’s son by a Vaishya attendant—crossed over to the Pandavas and was the only Kaurava brother to survive.',
  },
  {
    id: 'mah-h3',
    epic: 'Mahabharata',
    difficulty: 'Hard',
    sourceRef: 'Vana Parva',
    question: 'Which king briefly replaced Indra in heaven, grew arrogant, kicked Sage Agastya, and was cursed to become a giant python until freed by Yudhishthira?',
    options: ['King Nahusha', 'King Trishanku', 'King Mandhata', 'King Nala'],
    correctIndex: 0,
    explanation:
      'King Nahusha forced the Saptarishis to carry his palanquin and struck Agastya while shouting “Sarpa!” (Move faster). Cursed to live as a serpent (sarpa), he later regained liberation after conversing with Yudhishthira on Dharma.',
  },
  {
    id: 'mah-h4',
    epic: 'Mahabharata',
    difficulty: 'Hard',
    sourceRef: 'Adi & Sauptika Parvas',
    question: 'Who was Ashwatthama’s maternal uncle and one of the royal preceptors of Hastinapura who is counted among the Chiranjivis?',
    options: ['Shalya', 'Kripacharya', 'Kritavarma', 'Somadatta'],
    correctIndex: 1,
    explanation:
      'Kripacharya was the twin brother of Kripi (Dronacharya’s wife and Ashwatthama’s mother). He survived the war and is revered among the immortals.',
  },
  {
    id: 'mah-h5',
    epic: 'Mahabharata',
    difficulty: 'Hard',
    sourceRef: 'Vana & Shalya Parvas',
    question: 'Which elder brother of Krishna did not fight for either side at Kurukshetra and instead went on a pilgrimage along the Saraswati river?',
    options: ['Satyaki', 'Balarama', 'Uddhava', 'Pradyumna'],
    correctIndex: 1,
    explanation:
      'Loving both Duryodhana and the Pandavas as his kinsmen and disciples, Balarama refused to take sides and departed on a tirtha-yatra, returning only on the 18th day to witness the mace duel.',
  },

  // ========================
  // HARD — PURANAS (5)
  // ========================
  {
    id: 'pur-h1',
    epic: 'Puranas',
    difficulty: 'Hard',
    sourceRef: 'Puranic Canon',
    question: 'How many major Puranas (Mahapuranas) are traditionally enumerated in Hindu scriptural classification?',
    options: ['12 Mahapuranas', '18 Mahapuranas', '24 Mahapuranas', '36 Mahapuranas'],
    correctIndex: 1,
    explanation:
      'Classical tradition enumerates 18 Mahapuranas (including Bhagavata, Vishnu, Shiva, Markandeya, Padma, and Skanda) alongside 18 Upapuranas.',
  },
  {
    id: 'pur-h2',
    epic: 'Puranas',
    difficulty: 'Hard',
    sourceRef: 'Agastya Lore / Mahabharata',
    question: 'Which sage once drank the entire ocean dry in a single sip so the Devas could defeat the Kalakeya demons hiding on the seabed?',
    options: ['Sage Vishwamitra', 'Sage Agastya', 'Sage Jamadagni', 'Sage Chyavana'],
    correctIndex: 1,
    explanation:
      'When the Kalakeya asuras hid beneath the ocean by day, Sage Agastya absorbed the waters to expose their stronghold, enabling the Devas to overcome them.',
  },
  {
    id: 'pur-h3',
    epic: 'Puranas',
    difficulty: 'Hard',
    sourceRef: 'Chiranjivi Tradition',
    question: 'Which revered epic hero is NOT traditionally listed among the Ashta Chiranjivis (Eight Immortals)?',
    options: ['Hanuman', 'Vibhishana', 'Parashurama', 'Bhishma'],
    correctIndex: 3,
    explanation:
      'Bhishma held the boon of Iccha Mrityu (choosing the time of his death) and departed after Uttarayana arrived. The eight Chiranjivis are Ashwatthama, Mahabali, Vyasa, Hanuman, Vibhishana, Kripacharya, Parashurama, and Markandeya.',
  },
  {
    id: 'pur-h4',
    epic: 'Puranas',
    difficulty: 'Hard',
    sourceRef: 'Bhagavata Purana (Canto 8)',
    question: 'In the Gajendra Moksha episode, what did the elephant king Gajendra offer to Lord Vishnu in his final prayer while gripped by a crocodile?',
    options: ['A golden crown', 'A blooming lotus flower', 'Sacred Tulasi leaves', 'Drops of river water'],
    correctIndex: 1,
    explanation:
      'Exhausted after a thousand-year struggle, Gajendra plucked a lotus from the lake with his trunk and offered it upward, reciting a hymn of surrender until Vishnu descended on Garuda to liberate him.',
  },
  {
    id: 'pur-h5',
    epic: 'Puranas',
    difficulty: 'Hard',
    sourceRef: 'Brihadaranyaka Upanishad',
    question: 'In the Brihadaranyaka Upanishad, which renowned woman philosopher challenged Sage Yajnavalkya in King Janaka’s court with penetrating questions on Brahman?',
    options: ['Lopamudra', 'Gargi Vachaknavi', 'Sulabha', 'Apala'],
    correctIndex: 1,
    explanation:
      'Gargi Vachaknavi engaged Yajnavalkya in a celebrated metaphysical inquiry into the cosmic fabric (“that upon which all worlds are woven like warp and woof”), earning deep admiration among the assembled scholars.',
  },
];

export const STUDY_LESSONS: StudyLesson[] = [
  // RAMAYANA (4)
  {
    id: 'lesson-ram-kandas',
    epic: 'Ramayana',
    subtopic: 'Structure · 7 Kandas',
    readingMinutes: 3,
    title: 'Architecture of the Seven Kandas',
    sanskritTerm: {
      term: 'आदिकाव्य',
      transliteration: 'Adikavya',
      meaning: 'The First Poem — honorific title of Valmiki’s Ramayana',
    },
    leadParagraph:
      'Composed by Sage Valmiki in 24,000 Sanskrit shlokas, the Ramayana unfolds across seven progressive books called Kandas. Each Kanda shifts the geographic and moral landscape—from the royal courtyards of Ayodhya and Mithila to the wilds of Dandakaranya, the monkey kingdom of Kishkindha, and the island citadel of Lanka.',
    details: [
      'Bala Kanda & Ayodhya Kanda chronicle Rama’s birth, training under Vishwamitra, marriage to Sita, and the painful acceptance of a fourteen-year exile.',
      'Aranya & Kishkindha Kandas trace life in Panchavati, Sita’s abduction by Ravana, Jatayu’s sacrifice, and the alliance forged with Sugriva and Hanuman.',
      'Sundara Kanda stands as the spiritual heart of the epic—focusing entirely on Hanuman’s leap across the ocean, discovery of Sita, and message of unbreakable hope.',
      'Yuddha & Uttara Kandas recount the bridge across the sea, Ravana’s defeat, the return to Ayodhya, and later reflections on kingship and renunciation.',
    ],
    keyTakeaway:
      'While every Kanda advances the narrative, Sundara Kanda is traditionally recited independently for courage, clarity, and reassurance in adversity.',
    flashcardPrompt: 'Which Kanda of the Ramayana focuses on Hanuman crossing the ocean and locating Sita in Ashoka Vatika?',
    flashcardAnswer: 'Sundara Kanda (the fifth book of Valmiki’s Ramayana).',
  },
  {
    id: 'lesson-ram-dharma',
    epic: 'Ramayana',
    subtopic: 'Characters · Ideals',
    readingMinutes: 3,
    title: 'Maryada & Quiet Sacrifice in Ayodhya',
    sanskritTerm: {
      term: 'मर्यादा',
      transliteration: 'Maryada',
      meaning: 'Righteous restraint, dignity, and honorable conduct within duty',
    },
    leadParagraph:
      'The Ramayana examines Dharma not as an abstract theory, but through human relationships under immense pressure. Rather than clinging to royal entitlement, its central figures willingly absorb hardship to preserve spoken promises and family integrity.',
    details: [
      'Rama accepts exile calmly so his father Dasharatha’s word to Kaikeyi remains unbroken, demonstrating composure in both triumph and loss.',
      'Bharata refuses the crown offered to him, placing Rama’s wooden Padukas on the throne and living ascetically outside Ayodhya for fourteen years.',
      'Lakshmana accompanies Rama to guard him tirelessly, while his wife Urmila stays behind in Ayodhya—honored in lore for bearing fourteen years of sleep on his behalf.',
      'Sita exemplifies moral fortitude and inner autonomy throughout her captivity in Lanka, refusing every threat and temptation.',
    ],
    keyTakeaway:
      'In the Ramayana, greatness is measured not by who seizes power, but by who refuses to compromise integrity when power is handed to them.',
    flashcardPrompt: 'What did Bharata place on Ayodhya’s throne while governing as Rama’s regent?',
    flashcardAnswer: 'Rama’s wooden sandals (Padukas), ruling humbly from Nandigrama.',
  },
  {
    id: 'lesson-ram-hanuman',
    epic: 'Ramayana',
    subtopic: 'Devotion · Strength',
    readingMinutes: 2,
    title: 'Hanuman: Power Awakened Through Service',
    sanskritTerm: {
      term: 'दास्य भक्ति',
      transliteration: 'Dasya Bhakti',
      meaning: 'Devotion expressed through selfless, fearless service',
    },
    leadParagraph:
      'Born to Anjana and blessed by Vayu (the wind deity), Hanuman spent his youth unaware of his boundless strength due to a sage’s playful restraint. Only when the Vanara search party reached the southern ocean in despair did the elder bear Jambavan remind Hanuman of who he truly was.',
    details: [
      'Hanuman combines extraordinary physical might with keen diplomacy, linguistic mastery, and humility.',
      'In Lanka, he alters his scale at will—shrinking to slip unseen into Ashoka Vatika and growing towering when confronting adversaries.',
      'When Lakshmana falls wounded in battle, Hanuman flies north to bring the Sanjeevani herb, carrying an entire Himalayan peak when time runs short.',
    ],
    keyTakeaway:
      'Strength without ego becomes unstoppable when awakened in service of a noble purpose.',
    flashcardPrompt: 'Who reminded Hanuman of his forgotten divine abilities at the edge of the southern ocean?',
    flashcardAnswer: 'Jambavan, the wise king of bears, in the Kishkindha Kanda.',
  },
  {
    id: 'lesson-ram-retellings',
    epic: 'Ramayana',
    subtopic: 'Traditions · Literature',
    readingMinutes: 3,
    title: 'Living Retellings Across Regions',
    sanskritTerm: {
      term: 'कथा',
      transliteration: 'Katha',
      meaning: 'Sacred narrative passed down through living storytelling traditions',
    },
    leadParagraph:
      'Rather than remaining locked in a single classical manuscript, the Ramayana blossomed into dozens of beloved regional epics across India and Southeast Asia, each reflecting local poetry, devotion, and philosophical nuance.',
    details: [
      'Valmiki’s Sanskrit Ramayana portrays Rama primarily as the ideal human exemplar upholding Dharma.',
      'Goswami Tulsidas’s 16th-century Ramcharitmanas (in Awadhi) emphasizes Bhakti and devotional surrender.',
      'Kamban’s Tamil Iramavataram (Kamba Ramayanam) and Krittibas Ojha’s Bengali Ramayana enriched regional meters and poetic imagery.',
      'Across Southeast Asia, adaptations such as Thailand’s Ramakien and Indonesia’s Kakawin Ramayana shaped dance, shadow puppetry, and royal heritage.',
    ],
    keyTakeaway:
      'The Ramayana endures as a living cultural dialogue across languages, centuries, and art forms.',
    flashcardPrompt: 'Who composed the famous Awadhi retelling known as the Ramcharitmanas?',
    flashcardAnswer: 'Goswami Tulsidas in the 16th century CE.',
  },

  // MAHABHARATA (4)
  {
    id: 'lesson-mah-parvas',
    epic: 'Mahabharata',
    subtopic: 'Structure · 18 Parvas',
    readingMinutes: 3,
    title: 'The Fifth Veda: Eighteen Parvas of Vyasa',
    sanskritTerm: {
      term: 'इतिहास',
      transliteration: 'Itihasa',
      meaning: '“Thus indeed it happened” — epic history carrying universal ethics',
    },
    leadParagraph:
      'Spanning roughly 100,000 verses across eighteen Parvas (books), the Mahabharata is the longest epic poem in world literature. Recited by Sage Vyasa and scribed by Lord Ganesha, it weaves dynastic rivalry with encyclopedic reflections on ethics, statecraft, and liberation.',
    details: [
      'Early Parvas (Adi through Udyoga) establish the Kuru lineage, the Pandava-Kaurava rivalry, the Maya Sabha, the dice game, thirteen years of exile, and failed peace missions.',
      'The four War Parvas (Bhishma, Drona, Karna, Shalya) chronicle the eighteen-day Kurukshetra conflict led sequentially by four Kaurava commanders.',
      'Post-war books—especially the monumental Shanti Parva—feature Bhishma’s deathbed discourses on governance, justice, and inner peace.',
    ],
    keyTakeaway:
      'As the epic itself declares: “What is found here regarding Dharma, Artha, Kama, and Moksha may be found elsewhere; what is not here is nowhere else.”',
    flashcardPrompt: 'How many Parvas (books) make up the Mahabharata, and who acted as Vyasa’s scribe?',
    flashcardAnswer: '18 Parvas, scribed by Lord Ganesha.',
  },
  {
    id: 'lesson-mah-gita',
    epic: 'Mahabharata',
    subtopic: 'Philosophy · Bhagavad Gita',
    readingMinutes: 4,
    title: 'Three Yogas of the Bhagavad Gita',
    sanskritTerm: {
      term: 'निष्काम कर्म',
      transliteration: 'Nishkama Karma',
      meaning: 'Action performed wholeheartedly without selfish attachment to outcomes',
    },
    leadParagraph:
      'Embedded inside the sixth book (Bhishma Parva), the 700-verse Bhagavad Gita opens in a moment of acute moral paralysis. Faced with fighting revered teachers and relatives, Arjuna drops his Gandiva bow—prompting Krishna to harmonize action, wisdom, and devotion.',
    details: [
      'Karma Yoga teaches selfless engagement in one’s rightful duty without anxiety over reward or failure (Gita 2.47).',
      'Jnana Yoga distinguishes the perishable physical body from the indestructible, witnessing Self (Atman).',
      'Bhakti Yoga offers a direct, accessible path of loving surrender and seeing the Divine within all beings equally.',
      'Raja / Dhyana Yoga trains mental steadiness through equanimity (Samatva) amid praise and blame.',
    ],
    keyTakeaway:
      'The Gita does not advocate fleeing responsibility; it teaches how to act decisively in the world with an unshakeable, detached mind.',
    flashcardPrompt: 'Which Parva of the Mahabharata contains the 700-verse Bhagavad Gita?',
    flashcardAnswer: 'Bhishma Parva (Chapters 23–40).',
  },
  {
    id: 'lesson-mah-complexity',
    epic: 'Mahabharata',
    subtopic: 'Character · Moral Nuance',
    readingMinutes: 3,
    title: 'Human Ambiguity: No Pure Villains or Saints',
    sanskritTerm: {
      term: 'सूक्ष्म धर्म',
      transliteration: 'Sukshma Dharma',
      meaning: 'The subtle, layered nature of righteousness in difficult dilemmas',
    },
    leadParagraph:
      'Unlike simple allegories of spotless heroes versus caricatured villains, the Mahabharata portrays deeply flawed, fiercely human characters. Even noble elders are compromised by rigid vows, while adversaries exhibit remarkable generosity and loyalty.',
    details: [
      'Bhishma’s vow of celibacy and loyalty to the throne forces him to stand silently through injustice and later fight for a cause he knows is flawed.',
      'Karna is celebrated as Danaveera (champion of charity), yet wounded pride binds him to Duryodhana’s ambitions.',
      'Yudhishthira is called Dharmaraja, yet his weakness for the dice game triggers catastrophe—requiring painful growth before his eventual wisdom.',
    ],
    keyTakeaway:
      'Dharma in the Mahabharata is rarely mechanical; blind adherence to rules without compassion or discernment can itself produce tragedy.',
    flashcardPrompt: 'Which Kaurava brother crossed over to join the Pandavas right before the Kurukshetra battle began?',
    flashcardAnswer: 'Yuyutsu, who heeded Yudhishthira’s call to stand on the side of Dharma.',
  },
  {
    id: 'lesson-mah-dialogues',
    epic: 'Mahabharata',
    subtopic: 'Wisdom · Dialogues',
    readingMinutes: 3,
    title: 'Vidura Niti & the Yaksha’s Riddles',
    sanskritTerm: {
      term: 'विवेक',
      transliteration: 'Viveka',
      meaning: 'Clear ethical discernment between the enduring and the fleeting',
    },
    leadParagraph:
      'Beyond battles, the Mahabharata shines brightest in its philosophical dialogues—most notably prime minister Vidura’s sleepless counsel to King Dhritarashtra (Vidura Niti) and Yudhishthira’s exchange with a forest Yaksha (Yaksha Prashna).',
    details: [
      'In Vidura Niti (Udyoga Parva), Vidura outlines the marks of a wise ruler: self-restraint, welcoming honest critique, and placing collective welfare above family bias.',
      'In Yaksha Prashna (Vana Parva), a crane-turned-Yaksha strikes down four Pandavas who ignore his warning and drink from a lake without answering his questions.',
      'Asked what the greatest wonder in the world is, Yudhishthira replies: “Every day countless creatures depart for Yama’s abode, yet those who remain act as though they will live forever.”',
    ],
    keyTakeaway:
      'True heroism in the Mahabharata belongs as much to composure, listening, and moral clarity as to martial prowess.',
    flashcardPrompt: 'What did Yudhishthira tell the Yaksha is the greatest wonder in the world?',
    flashcardAnswer: 'That people witness death every day, yet live as though they themselves are immortal.',
  },

  // PURANAS & UPANISHADS (4)
  {
    id: 'lesson-pur-dashavatara',
    epic: 'Puranas',
    subtopic: 'Puranas · Avatars',
    readingMinutes: 3,
    title: 'Dashavatara: Ten Descents of Preservation',
    sanskritTerm: {
      term: 'अवतार',
      transliteration: 'Avatara',
      meaning: '“Descent” — the manifestation of cosmic order to restore balance',
    },
    leadParagraph:
      'Across the Vishnu, Bhagavata, and Garuda Puranas, Lord Vishnu appears in ten classic forms—Dashavatara—whenever cosmic and moral order (Dharma) faces collapse. Each descent responds precisely to the crisis of its age.',
    details: [
      'Aquatic & Amphibious Ages: Matsya (Fish) saves Manu and the Vedas from the deluge; Kurma (Tortoise) supports Mount Mandara during the ocean churning.',
      'Terrestrial & Transitional Forms: Varaha (Boar) rescues the Earth from cosmic depths; Narasimha (Man-Lion) defends Prahlada beyond every loophole of tyranny.',
      'Human & Ethical Teachers: Vamana teaches humility to King Mahabali; Parashurama checks arrogant rulers; Rama models civic Dharma; Krishna teaches integrated wisdom.',
      'Buddha (compassion and non-harm) and the future Kalki complete the classical ten.',
    ],
    keyTakeaway:
      'Many thinkers observe that the Dashavatara sequence echoes both the evolution of biological forms and the maturation of human ethics.',
    flashcardPrompt: 'Which avatar supported Mount Mandara on its back during the Samudra Manthan?',
    flashcardAnswer: 'Kurma (the Tortoise avatar of Lord Vishnu).',
  },
  {
    id: 'lesson-pur-samudra',
    epic: 'Puranas',
    subtopic: 'Symbolism · Cosmic Myth',
    readingMinutes: 3,
    title: 'Samudra Manthan: Poison Before Nectar',
    sanskritTerm: {
      term: 'अमृत',
      transliteration: 'Amrita',
      meaning: 'Immortal nectar of wisdom and spiritual renewal',
    },
    leadParagraph:
      'When the Devas lost their vitality, they partnered temporarily with the Asuras to churn the Ocean of Milk (Kshira Sagara) using Mount Mandara and the serpent Vasuki. Their goal was Amrita, the nectar of immortality—yet the ocean yielded something startling first.',
    details: [
      'Before any jewel surfaced, the churning released Halahala—a scorching poison threatening all existence. Lord Shiva swallowed it and held it in his throat, becoming Neelakantha.',
      'Only after the poison was contained did fourteen treasures emerge: Kamadhenu, Uchchaihshravas, Airavata, Kaustubha gem, Goddess Lakshmi, and finally Dhanvantari bearing the pot of Amrita.',
      'Psychologically, the myth mirrors inner discipline: churning the mind surfaces buried turmoil (“poison”) before clarity and peace (“nectar”) arise.',
    ],
    keyTakeaway:
      'Transformation demands patience—confronting the Halahala of difficulty before attaining the Amrita of clarity.',
    flashcardPrompt: 'Why is Lord Shiva also called Neelakantha (“The Blue-Throated One”)?',
    flashcardAnswer: 'Because he swallowed and held the deadly Halahala poison in his throat during the Samudra Manthan.',
  },
  {
    id: 'lesson-pur-philosophy',
    epic: 'Puranas',
    subtopic: 'Upanishads · Core Concepts',
    readingMinutes: 3,
    title: 'Dharma, Karma, Samsara & Moksha',
    sanskritTerm: {
      term: 'मोक्ष',
      transliteration: 'Moksha',
      meaning: 'Liberation from ignorance and the cycle of conditioned rebirth',
    },
    leadParagraph:
      'Every story in the Ramayana, Mahabharata, and Puranas rests on four foundational concepts refined in the Upanishads. Understanding these four pillars illuminates why characters make choices that might otherwise seem puzzling.',
    details: [
      'Dharma is not mere ritual law; it is cosmic coherence, truthfulness, and fulfilling one’s duty harmoniously.',
      'Karma signifies intentional action and its moral resonance—not rigid fatalism, since present mindful choices continually reshape the future.',
      'Samsara describes the cyclical journey of existence through repeated births driven by desire and ignorance.',
      'Moksha is the ultimate freedom realized when one awakens to the unity of the inner Self (Atman) and infinite Reality (Brahman).',
    ],
    keyTakeaway:
      'The epics serve as vivid case studies demonstrating how Dharma and Karma operate in everyday human dilemmas.',
    flashcardPrompt: 'In Upanishadic philosophy, how do Atman and Brahman relate?',
    flashcardAnswer: 'Atman (the innermost witnessing Self) is ultimately non-different from Brahman (infinite cosmic Reality).',
  },
  {
    id: 'lesson-pur-sages',
    epic: 'Puranas',
    subtopic: 'Upanishads · Seekers & Sages',
    readingMinutes: 3,
    title: 'Nachiketa, Gargi & the Eight Chiranjivis',
    sanskritTerm: {
      term: 'चिरञ्जीवी',
      transliteration: 'Chiranjivi',
      meaning: '“Long-lived” — immortal figures said to endure through the age',
    },
    leadParagraph:
      'Beyond kings and warriors, Hindu lore places fearless seekers of truth at its center—from young Nachiketa questioning Death in the Katha Upanishad to philosopher Gargi Vachaknavi debating in King Janaka’s assembly.',
    details: [
      'In the Katha Upanishad, Nachiketa rejects wealth and long life from Yama, insisting instead on learning the mystery of the indestructible Self.',
      'In the Brihadaranyaka Upanishad, Gargi Vachaknavi presses Sage Yajnavalkya through rigorous metaphysical questioning on the substratum of all existence.',
      'Meanwhile, Puranic tradition celebrates the Ashta Chiranjivis—Ashwatthama, Mahabali, Vyasa, Hanuman, Vibhishana, Kripacharya, Parashurama, and Markandeya—each representing either enduring devotion or a cosmic lesson.',
    ],
    keyTakeaway:
      'Scriptural tradition prizes fearless questioning just as highly as devotion.',
    flashcardPrompt: 'Name at least four of the traditional Ashta Chiranjivis (Immortals).',
    flashcardAnswer: 'Hanuman, Vyasa, Vibhishana, Parashurama (along with Ashwatthama, Mahabali, Kripacharya, and Markandeya).',
  },
];

export const RAMAYANA_KANDAS: KandaStage[] = [
  {
    number: 1,
    name: 'Bala Kanda',
    meaning: 'Book of Youth',
    keyLocation: 'Ayodhya & Mithila',
    centralFigures: 'Rama, Vishwamitra, Janaka, Sita',
    summary:
      'Birth of the four sons of Dasharatha; Rama and Lakshmana protect Sage Vishwamitra’s yajna, liberate Ahalya, and travel to Mithila where Rama strings Shiva’s bow Pinaka to wed Sita.',
    lesson: 'Inner discipline and mentorship prepare youth for life’s larger responsibilities.',
  },
  {
    number: 2,
    name: 'Ayodhya Kanda',
    meaning: 'Book of Ayodhya',
    keyLocation: 'Ayodhya & Chitrakoot',
    centralFigures: 'Dasharatha, Kaikeyi, Rama, Bharata',
    summary:
      'On the eve of coronation, Kaikeyi invokes two boons sending Rama into 14 years of exile. Sita and Lakshmana join him; Dasharatha passes away in grief; Bharata places Rama’s Padukas on the throne.',
    lesson: 'Integrity means honoring promises even when they cost everything.',
  },
  {
    number: 3,
    name: 'Aranya Kanda',
    meaning: 'Book of the Forest',
    keyLocation: 'Dandakaranya & Panchavati',
    centralFigures: 'Rama, Sita, Lakshmana, Jatayu, Ravana',
    summary:
      'Ten years of quiet forest life culminate in Panchavati. Ravana uses the golden deer illusion (Maricha) to abduct Sita, mortally wounding the brave eagle Jatayu along the way.',
    lesson: 'Attachment to illusions leaves vigilance unguarded.',
  },
  {
    number: 4,
    name: 'Kishkindha Kanda',
    meaning: 'Book of Kishkindha',
    keyLocation: 'Rishyamukha & Kishkindha',
    centralFigures: 'Rama, Sugriva, Vali, Hanuman, Jambavan',
    summary:
      'Rama allies with exiled Vanara prince Sugriva, helps restore Kishkindha, and dispatches search parties southward—ending on the seashore where Jambavan awakens Hanuman’s power.',
    lesson: 'True friendship shares burdens equally in both exile and triumph.',
  },
  {
    number: 5,
    name: 'Sundara Kanda',
    meaning: 'The Beautiful Book',
    keyLocation: 'Mahendragiri & Lanka',
    centralFigures: 'Hanuman, Sita, Trijata, Ravana',
    summary:
      'Hanuman leaps across the ocean, overcomes obstacles, discovers Sita in Ashoka Vatika, delivers Rama’s ring, and returns with Sita’s Chudamani crest-jewel as proof she lives.',
    lesson: 'Courage anchored in humility turns impossible barriers into stepping stones.',
  },
  {
    number: 6,
    name: 'Yuddha Kanda',
    meaning: 'Book of War',
    keyLocation: 'Rama Setu & Lanka Battlefield',
    centralFigures: 'Rama, Vibhishana, Lakshmana, Ravana',
    summary:
      'Vibhishana seeks refuge with Rama; Nala and Nila bridge the ocean; after fierce battles against Kumbhakarna, Indrajit, and Ravana, Rama restores Dharma and returns to Ayodhya.',
    lesson: 'Even formidable intellect falls when blinded by arrogance.',
  },
  {
    number: 7,
    name: 'Uttara Kanda',
    meaning: 'The Later Book',
    keyLocation: 'Ayodhya & Valmiki Ashram',
    centralFigures: 'Rama, Sita, Lava, Kusha, Valmiki',
    summary:
      'Chronicles Rama’s rule (Rama Rajya), Sita’s life at Valmiki’s hermitage, the birth of twin sons Lava and Kusha who recite the Ramayana, and the epic’s serene conclusion.',
    lesson: 'Public duty and personal sorrow demand deep spiritual equanimity.',
  },
];

export const MAHABHARATA_PHASES: ParvaGroup[] = [
  {
    phase: 'Phase I · Origins & Rivalry',
    range: 'Parvas 1–5',
    summary:
      'Establishes the Kuru dynasty, childhood rivalries, the Maya Sabha, the fateful dice game, thirteen years of exile, and Krishna’s final peace mission.',
    parvas: [
      { number: 1, name: 'Adi Parva', focus: 'Origins of Kuru lineage, Pandavas & Kauravas' },
      { number: 2, name: 'Sabha Parva', focus: 'Maya Sabha, Rajasuya & the game of dice' },
      { number: 3, name: 'Vana Parva', focus: '12 years of forest exile & Yaksha Prashna' },
      { number: 4, name: 'Virata Parva', focus: '13th year spent in incognito disguise' },
      { number: 5, name: 'Udyoga Parva', focus: 'Vidura Niti & Krishna’s peace embassy' },
    ],
  },
  {
    phase: 'Phase II · The 18-Day War',
    range: 'Parvas 6–10',
    summary:
      'Chronicles the Kurukshetra conflict across consecutive Kaurava commanders—opening with the Bhagavad Gita and closing with the tragic night raid.',
    parvas: [
      { number: 6, name: 'Bhishma Parva', focus: 'Bhagavad Gita & first 10 days under Bhishma' },
      { number: 7, name: 'Drona Parva', focus: 'Chakravyuha, Abhimanyu & days 11–15' },
      { number: 8, name: 'Karna Parva', focus: 'Karna’s command & duel with Arjuna' },
      { number: 9, name: 'Shalya Parva', focus: 'Final day & Bhima-Duryodhana mace duel' },
      { number: 10, name: 'Sauptika Parva', focus: 'Ashwatthama’s nocturnal raid' },
    ],
  },
  {
    phase: 'Phase III · Grief & Statecraft',
    range: 'Parvas 11–13',
    summary:
      'Turns inward from military victory to the human cost of war and Bhishma’s encyclopedic teachings on ethics, law, and liberation.',
    parvas: [
      { number: 11, name: 'Stri Parva', focus: 'Lamentations of the women on the battlefield' },
      { number: 12, name: 'Shanti Parva', focus: 'Bhishma’s discourses on Rajadharma & Moksha' },
      { number: 13, name: 'Anushasana Parva', focus: 'Final ethical instructions & Bhishma’s departure' },
    ],
  },
  {
    phase: 'Phase IV · Closure & Ascent',
    range: 'Parvas 14–18',
    summary:
      'Traces the Ashwamedha renewal, the elders’ retirement to the forest, the passing of Krishna’s clan, and Yudhishthira’s final journey.',
    parvas: [
      { number: 14, name: 'Ashwamedhika Parva', focus: 'Horse sacrifice & Anugita teachings' },
      { number: 15, name: 'Ashramavasika Parva', focus: 'Dhritarashtra, Gandhari & Kunti retire' },
      { number: 16, name: 'Mausala Parva', focus: 'Decline of the Yadavas & Krishna’s departure' },
      { number: 17, name: 'Mahaprasthanika Parva', focus: 'Pandavas’ great Himalayan ascent' },
      { number: 18, name: 'Svargarohana Parva', focus: 'Final test of loyalty & heavenly reunion' },
    ],
  },
];

export const DASHAVATARA_STAGES: AvatarStage[] = [
  {
    order: 1,
    name: 'Matsya',
    form: 'Horned Golden Fish',
    yuga: 'Satya Yuga',
    purpose: 'Saved Vaivasvata Manu, the seven sages, and sacred knowledge from the cosmic deluge.',
    significance: 'Preservation of life and wisdom at the dawn of the cycle.',
  },
  {
    order: 2,
    name: 'Kurma',
    form: 'Cosmic Tortoise',
    yuga: 'Satya Yuga',
    purpose: 'Supported Mount Mandara as the stable pivot during the Samudra Manthan.',
    significance: 'Unshakable inner steadiness required for transformative effort.',
  },
  {
    order: 3,
    name: 'Varaha',
    form: 'Great Boar',
    yuga: 'Satya Yuga',
    purpose: 'Lifted Bhudevi (the Earth) from the cosmic abyss after defeating Hiranyaksha.',
    significance: 'Restoration of ecological and foundational stability.',
  },
  {
    order: 4,
    name: 'Narasimha',
    form: 'Half-Man, Half-Lion',
    yuga: 'Satya Yuga',
    purpose: 'Protected child devotee Prahlada and vanquished tyrant Hiranyakashipu at twilight.',
    significance: 'Divine justice transcends every cunning loophole of ego.',
  },
  {
    order: 5,
    name: 'Vamana',
    form: 'Young Ascetic Dwarf',
    yuga: 'Treta Yuga',
    purpose: 'Checked King Mahabali’s pride with three cosmic strides measuring earth, sky, and head.',
    significance: 'Humility outweighs empire and material grandeur.',
  },
  {
    order: 6,
    name: 'Parashurama',
    form: 'Warrior Sage with Axe',
    yuga: 'Treta Yuga',
    purpose: 'Curbed tyrannical rulers who abused royal power against sages and citizens.',
    significance: 'Power must remain accountable to moral law.',
  },
  {
    order: 7,
    name: 'Rama',
    form: 'Prince of Ayodhya',
    yuga: 'Treta Yuga',
    purpose: 'Defeated Ravana and embodied Maryada—integrity in family, friendship, and kingship.',
    significance: 'Ideal conduct lived out amid human trials.',
  },
  {
    order: 8,
    name: 'Krishna',
    form: 'Statesman & Teacher of the Gita',
    yuga: 'Dvapara Yuga',
    purpose: 'Guided the Pandavas, vanquished tyrants, and delivered the Bhagavad Gita.',
    significance: 'Harmony of action, devotion, and philosophical insight.',
  },
  {
    order: 9,
    name: 'Buddha',
    form: 'Awakened Sage',
    yuga: 'Kali Yuga',
    purpose: 'Emphasized compassion (Karuna), non-violence (Ahimsa), and awakening beyond ritual excess.',
    significance: 'Reorientation toward inner awareness and kindness to all beings.',
  },
  {
    order: 10,
    name: 'Kalki',
    form: 'Future Rider on White Steed',
    yuga: 'End of Kali Yuga',
    purpose: 'Foretold to appear at the close of the dark age to dispel decay and renew Satya Yuga.',
    significance: 'Enduring hope that moral order always renews itself.',
  },
];

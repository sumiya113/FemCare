import { Product, BlogArticle, QuizQuestion, UserProfile, Order, ContactMessage } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Smart Herbal Heating Pad & Massager',
    price: 49.99,
    description: 'Cordless electric waist belt with rapid heating, 3-mode gentle vibration, and natural mugwort herbal inserts to ease period cramps and provide immediate lower-back relief.',
    rating: 4.8,
    reviews: [
      { name: 'Chloe Sanders', rating: 5, comment: 'Life changer for severe cramps! The vibration is so soothing.', date: '2026-05-12' },
      { name: 'Maya Harris', rating: 4.5, comment: 'Very soft, heats up in seconds.', date: '2026-05-20' }
    ],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
    category: 'Menstrual Care',
    inStock: true
  },
  {
    id: 'p2',
    name: 'Organic Medical-Grade Menstrual Cup',
    price: 24.99,
    description: '100% hypoallergenic, medical-grade silicone cup providing 12-hour leak-proof protection. Extremely flexible, reusable for up to 10 years, and includes a cute canvas storage pouch.',
    rating: 4.7,
    reviews: [
      { name: 'Sarah Miller', rating: 5, comment: 'The best investment! Saves money, highly eco-friendly.', date: '2026-04-30' }
    ],
    image: 'https://images.unsplash.com/photo-1583449850616-5626cc9aaeab?auto=format&fit=crop&q=80&w=400',
    category: 'Menstrual Care',
    inStock: true
  },
  {
    id: 'p3',
    name: 'CrampHaven Magnesium Soothing Balm',
    price: 18.50,
    description: 'Organic shea butter base infused with high-absorption pure magnesium chloride, lavender oil, and peppermint to calm muscle spasms, cramping, and local soreness.',
    rating: 4.6,
    reviews: [
      { name: 'Emilia Rose', rating: 4, comment: 'Applies smoothly. Really helps with my heavy flow day aches.', date: '2026-05-02' }
    ],
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400',
    category: 'Menstrual Care',
    inStock: true
  },
  {
    id: 'p4',
    name: 'PCOS Premium Inositol Balance Blend',
    price: 39.99,
    description: 'Clinically formulated powder featuring Myo-Inositol and D-Chiro-Inositol in the ideal 40:1 ratio, bolstered with Folate and Vitamin D3 to support ovarian function, insulin sensitivity, and regular cycles.',
    rating: 4.9,
    reviews: [
      { name: 'Rebecca Wood', rating: 5, comment: 'My cycles went from 60 days to a steady 31 days with this powder. Overjoyed!', date: '2026-05-18' }
    ],
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
    category: 'PCOS Support',
    inStock: true
  },
  {
    id: 'p5',
    name: 'PCOS Comprehensive Wellness Tracker & Journal',
    price: 14.99,
    description: 'An elegant hard-cover planner designed specifically for tracking ovulation, BBT temperatures, dietary triggers, acne patterns, exercise regimens, and overall hormonal trends.',
    rating: 4.5,
    reviews: [
      { name: 'Jessica Vance', rating: 5, comment: 'Excellent prompt designs. Helps me stay consistent before seeing my doctor.', date: '2026-03-15' }
    ],
    image: 'https://images.unsplash.com/photo-1531346878377-a5ec20888e57?auto=format&fit=crop&q=80&w=400',
    category: 'PCOS Support',
    inStock: true
  },
  {
    id: 'p6',
    name: 'CycleSync Guided Mindfulness & Intimacy Journal',
    price: 19.99,
    description: 'A beautiful 90-day journal offering daily gratitude prompts, mood logs, follicular-to-luteal phase trackers, and cycle-syncing tips to align your work and fitness with your menstrual cycles.',
    rating: 4.8,
    reviews: [
      { name: 'Aria Bennett', rating: 5, comment: 'Syncing my workouts with my cycles based on this journal has boosted my energy levels!', date: '2026-04-22' }
    ],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400',
    category: 'Hormonal Wellness',
    inStock: true
  },
  {
    id: 'p7',
    name: 'SereneBalance Organic Caffeine-Free Teal Blend',
    price: 12.50,
    description: 'Expertly sourced herbal dynamic tea featuring Red Raspberry Leaf, Spearmint, Nettle, Ginger, and Chamomile to calm bloating and combat excessive androgen dominance.',
    rating: 4.7,
    reviews: [
      { name: 'Nathalie Gomez', rating: 5, comment: 'Love the spearmint undertones, perfect nightly ritual.', date: '2026-05-25' }
    ],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    category: 'Hormonal Wellness',
    inStock: true
  },
  {
    id: 'p8',
    name: 'CycleSync Insulated smart Hydration Bottle',
    price: 34.99,
    description: 'BPA-free vacuum sealed stainless steel hydration tracker bottle with dynamic hourly temperature readings, reminders, and physical hydration cycle milestones.',
    rating: 4.4,
    reviews: [
      { name: 'Katarina P.', rating: 4, comment: 'The digital sensor keeps my beverage temp perfect and makes logging water effortless.', date: '2026-05-10' }
    ],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400',
    category: 'Nutrition & Fitness',
    inStock: true
  },
  {
    id: 'p9',
    name: 'EstroHarmony Pure Essential Oil Roller Set',
    price: 16.00,
    description: 'Travel-size roll-on blends of wild lavender, organic clary sage, sweet marjoram, and ylang-ylang to rub on temples and pulse points during intense hormonal mood shifts.',
    rating: 4.6,
    reviews: [
      { name: 'Sophia Lane', rating: 5, comment: 'Instantly brings down my stress levels. Keeps an elegant floral scent too!', date: '2026-02-14' }
    ],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400',
    category: 'Hormonal Wellness',
    inStock: true
  }
];

export const INITIAL_BLOGS: BlogArticle[] = [
  {
    id: 'b1',
    title: 'Understanding Irregular Periods: Primary Causes and Lifestyle Remedies',
    excerpt: 'Your menstrual cycle is a key health indicator. Learn what defines an irregular period, when stress or high cortisol is the culprit, and scientific ways to rebuild cycle rhythm.',
    content: `An irregular menstrual cycle is one of the most common signs that your body is navigating some form of physical or mental imbalance. Although an occasional late period is common during life transitions, chronic irregularity should always warrant closer attention.

### What is Considered "Irregular"?
A typical menstrual cycle lasts between 21 and 35 days, with bleeding duration ranging from 3 to 7 days. Your periods are generally classified as irregular if:
1. The time between each period keeps shifting.
2. You lose or skip periods entirely (amenorrhea).
3. Your cycles are consistently shorter than 21 days or longer than 35 days.
4. You notice heavy flow or unexpected spotting mid-cycle.

### Common Underlying Causes
* **Chronic High-Stress & Cortisol**: High stress stimulates the release of hormone-disrupting chemicals (CRH & cortisol) that suppress GnRH (gonadotropin-releasing hormone), leading to delayed ovulation or missed periods.
* **Rapid Weight Swings**: Excess body fat can promote excess estrogen, while extreme calorie restriction or over-exercising can trigger Hypothalamic Amenorrhea, where the brain turns off fertility hormones to save energy.
* **Polycystic Ovary Syndrome (PCOS)**: Small follicles line the ovaries, but hormonal imbalances prevent them from maturing and releasing eggs naturally.
* **Thyroid Irregularities**: Both hyperthyroidism and hypothyroidism affect cellular energy, heavily interrupting normal ovulation.

### Holistic Lifestyle Adjustments
1. **Prioritize Cycle Syncing Nutrition**: Eat protein-rich foods, leafy greens, avocados, complex carbs, and zinc-rich foods during the phases your energy needs spike.
2. **Support Sleep Quality**: Maintain at least 7.5 to 8 hours of sleep on a dark, cool, and device-free routine. This naturally resets melatonin and your central endocrine clock.
3. **Gentle exercise**: Avoid high-intensity training if you are already excessively fatigued or missing periods. Trade high-intensity workouts for yoga, brisk walking, or lightweight training.

*Disclaimer: This article is for general educational purposes only and should not replace professional clinical evaluation or advice. Always consult with a licensed OB-GYN regarding severe irregular cycles.*`,
    category: "Women's Health",
    author: 'Dr. Rebecca Sterling, OB-GYN',
    date: '2026-05-10',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500',
    tags: ['Menstrual Cycle', 'Irregular Periods', 'Hormonal Balance'],
    readTime: '5 min read'
  },
  {
    id: 'b2',
    title: 'A Comprehensive Natural Guide to Managing PCOS and Insulin Sensitivity',
    excerpt: 'PCOS affects 1 in 10 women of childbearing age. Unpack the relationship between hyperandrogenism, insulin resistance, and dietary changes to regain control.',
    content: `Polycystic Ovary Syndrome (PCOS) is a complex metabolic and endocrine syndrome that affects millions globally. Although symptoms can present physical and emotional challenges, understanding the underlying mechanisms enables highly effective management.

### The Role of Insulin Resistance in PCOS
Over 70% of individuals with PCOS suffer from insulin resistance. When body cells fail to clear glucose efficiently from the bloodstream, the pancreas compensates by secreting higher levels of insulin. 
Excess insulin has a double effect:
1. It directs the ovaries to produce higher amounts of male hormones (androgens), resulting in cysts, acne, and facial hair.
2. It blocks standard follicle maturation, causing cycles to extend or freeze.

### Proven Strategies for PCOS Support
* **The 40:1 Ratio Inositol Rule**: Natural compounds like Myo-Inositol combined with D-Chiro-Inositol mimic natural cell signaling, significantly improving egg quality and reducing systemic insulin levels.
* **Blood Sugar Balancing Plates**: Never eat simple carbohydrates alone. Always pair fiber (vegetables), healthy fats (pumpkin seeds, nuts, olive oil), and high-quality protein to suppress rapid glucose spikes.
* **Stress reduction**: Elevated stress triggers DHEA-S (an adrenal androgen hormone), fueling PCOS breakouts. Engage in regular deep-breathing exercises.

### Helpful Herbs
Integrating spearmint tea has been clinically observed to reduce high testosterone levels. Milk thistle or dandelion root tea assists the liver in filtering and clearing spent hormones.

*Disclaimer: This guide is for educational awareness. Always consult a specialist to formulate a tailored medical protocol.*`,
    category: 'PCOS',
    author: 'Sarah Jenkins, Certified Wellness Coach',
    date: '2026-05-18',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500',
    tags: ['PCOS Management', 'Insulin Resistance', 'Nutrition'],
    readTime: '6 min read'
  },
  {
    id: 'b3',
    title: 'Thyroid Health and Women: Signs You Need to Watch For',
    excerpt: 'Thyroid hormones govern every single cell in your body. Explore the intersection of hypo/hyperthyroidism, menstrual cycles, and trace mineral support.',
    content: `The thyroid, a small butterfly-shaped gland located in the neck, acts as the master conductor of your metabolic thermostat. Women are up to ten times more susceptible to thyroid changes than men, heavily impacting reproductive cycles.

### Recognizing Hypothyroidism vs. Hyperthyroidism
When the thyroid runs too slow (**Hypothyroidism**), energy drops:
* Unexplained weight gain
* Dry skin and brittle nails
* Heavy, painful, or prolonged periods
* Severe fatigue and cold sensitivity

When the thyroid runs too fast (**Hyperthyroidism**), systems accelerate:
* Unexplained weight loss with increased hunger
* Nervousness, anxiety, and rapid heart rhythms
* Extremely light, infrequent, or absent periods
* Heat sensitivity and tremors

### Nutrients Essential for Thyroid Efficiency
1. **Selenium**: Found in Brazil nuts. Selenium shields the thyroid from oxidative damage and converts inactive thyroid hormones (T4) into active ones (T3).
2. **Zinc**: Plays an analogous role in endocrine communication and cellular health.
3. **Iodine**: The basic raw material for thyroid hormones. (Warning: consult a physician before supplementing, as high levels can trigger thyroid inflammation).

*Disclaimer: A basic blood test (checking TSH, Free T3, Free T4, and Thyroid Antibodies) is necessary to rule out thyroid imbalances. Always seek guidance from an endocrinologist.*`,
    category: 'Nutrition',
    author: 'Dr. Evelyn Thomas, Endocrinologist',
    date: '2026-04-28',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500',
    tags: ['Thyroid Care', 'Metabolism', 'Endocrine Health'],
    readTime: '4 min read'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'How regular have your menstrual cycles been over the past 6 months?',
    options: [
      { text: 'Very regular (consistently 26 to 32 days apart)', score: 10 },
      { text: 'Slightly irregular (occasionally early or delayed by a few days)', score: 7 },
      { text: 'Highly unpredictable (cycles range from missing months to bleeding multiple times a month)', score: 4 },
      { text: 'Completely irregular/absent (no cycle or heavily delayed for months)', score: 2 }
    ],
    category: 'menstrual'
  },
  {
    id: 2,
    text: 'How would you rate your average sleep quality and duration?',
    options: [
      { text: 'Excellent: 7.5 to 9 hours of deep, restful, uninterrupted sleep', score: 10 },
      { text: 'Moderate: 6 to 7 hours, but occasionally wake up tired or restlessly', score: 7 },
      { text: 'Poor: Frequently sleep under 5 hours, struggle to drift off, or wake up frequently', score: 4 }
    ],
    category: 'sleep'
  },
  {
    id: 3,
    text: 'How operates your stress or mood profile during the average week?',
    options: [
      { text: 'Highly grounded: Feel calm, handle minor changes easily', score: 10 },
      { text: 'Moderate: Experience spikes during pressure, retrieve stability within a day', score: 7 },
      { text: 'Overwhelming: Regular anxiety waves, brain fog, sudden irritability, or intense luteal phase mood swings', score: 4 }
    ],
    category: 'stress'
  },
  {
    id: 4,
    text: 'What does your regular physical movement and exercise look like?',
    options: [
      { text: 'Active & balanced: Move at least 150 mins per week (mix of weights, walking, yoga)', score: 10 },
      { text: 'Inconsistent: Moderate walking, occasional gym visits, but mostly sedentary at work', score: 6 },
      { text: 'Strenuous/Intense: Overtraining daily without proper rest days or recovery fuel', score: 4 },
      { text: 'Very sedentary: Struggle to incorporate movement due to pain or low energy', score: 3 }
    ],
    category: 'exercise'
  },
  {
    id: 5,
    text: 'What is your regular hydration and whole foods nutrition pattern?',
    options: [
      { text: 'Balanced: Diverse diet rich in fiber, greens, lean protein, and over 2L water', score: 10 },
      { text: 'Progressive: Eat greens but consume high sugar, processed food, or multiple caffeinated cups daily', score: 6 },
      { text: 'Difficult: Skip meals, eat low calorie diets, or skip water logging', score: 3 }
    ],
    category: 'lifestyle'
  }
];

export const EXCEL_SUCCESS_STORIES = [
  {
    name: 'Maya Henderson',
    age: 28,
    diagnosed: 'Irregular Cycles & PCOS',
    story: 'After using the FemCare Wellness tracking tools, cycle syncing guides, and inositol recommendations, my cycle returned to a steady 29-day rhythm. Tracking symptoms allowed me to bring comprehensive logs to my OB-GYN, who commended my detailed data.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Eleanor Sterling',
    age: 34,
    diagnosed: 'Hormonal Fatigue & Sleep Imbalances',
    story: 'The Health Assessment Quiz pinpointed high stress and poor sleep during my luteal phase. Adapting my workouts to light yoga during those weeks and using the relaxation balm transformed my morning energy limits!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Kira Malhotra',
    age: 41,
    diagnosed: 'Early Perimenopause Symptoms',
    story: 'Finding a medically responsible, supportive community that doesnâ€™t just dump scare stories was a breath of fresh air. The resources on nutrition during nutritional support helped me manage heavy night sweats effectively.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
  }
];

export const HOME_FAQS = [
  {
    question: 'How do I know if my period irregularity is normal or requires a doctor?',
    answer: 'An occasional irregular cycle can happen due to high stress, extreme fatigue, or sudden weight modifications. However, if your cycles are consistently irregular for over 3 months, or you miss periods entirely for 90+ days (when not pregnant), you should consult your licensed OB-GYN for thorough biomarker tests.'
  },
  {
    question: 'What is the relationship between insulin levels and PCOS/PCOD?',
    answer: 'Insulin resistance is one of the key drivers of PCOS. When your cells are resistant to clearing blood sugar, the body pumps out extra insulin. This excess insulin signals your ovaries to secrete surplus male hormones (androgens), triggering skipped periods, acne, and ovarian cysts.'
  },
  {
    question: 'How can lifestyle adjustments help balance hormones naturally?',
    answer: 'While serious endocrine conditions may require prescription therapies, standard lifestyle choices form the vital framework. Strategic nutritional plates (balancing fiber, protein, and healthy fats), targeted premium supplements (like high-quality Inositol), high environmental sleep quality, and phase-aware workout structures (gentle movement during your luteal/menstrual phase) reduce systemic cortisol and inflammation.'
  },
  {
    question: 'Are there risks in self-diagnosing hormonal issues?',
    answer: 'Yes. Many different conditions share overlapping symptoms. For instance, both PCOS and thyroid dysfunction can cause irregular cycles and sudden weight gain, but require completely independent clinical solutions. Always use our materials and trackers purely to gather personal observations, and review them under licensed medical consultation.'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Chloe Bennett',
  email: 'chloe.bennett@sync.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
  role: 'user',
  savedArticles: [],
  wishlist: []
};

export const SYSTEM_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Peterson',
    email: 'sarah.peterson@care.com',
    subject: 'Query on Myo-Inositol dosage rules',
    message: 'Hello! I purchased your PCOS Support Supplement Bundle but I needed coordinates on how many capsules to ingest with meals for optimal cycle support.',
    date: 'June 01, 2026',
    replied: false
  },
  {
    id: 'msg-2',
    name: 'Melissa Reed',
    email: 'melissa.reed@gmail.com',
    subject: 'Tracking coordination for Smart Belt support',
    message: 'Greetings! I ordered my heating massage belt last Tuesday, but my dashboard order status still says shipped without tracing numbers.',
    date: 'May 30, 2026',
    replied: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8834',
    date: 'May 28, 2026',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      }
    ],
    total: 56.98,
    status: 'Delivered'
  }
];

// Fertilizer Recommendation Database
const FERTILIZER_DATA = {
  crops: {
    tomato: {
      id: 'tomato',
      name: 'Tomato',
      category: 'vegetables',
      icon: '🍅',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
      description: 'Popular vegetable crop, susceptible to various diseases',
      diseases: ['tomato_early_blight', 'tomato_late_blight', 'tomato_bacterial_spot', 'tomato_leaf_mold', 'tomato_septoria']
    },
    potato: {
      id: 'potato',
      name: 'Potato',
      category: 'vegetables',
      icon: '🥔',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      description: 'Staple crop, requires careful disease management',
      diseases: ['potato_early_blight', 'potato_late_blight']
    },
    pepper: {
      id: 'pepper',
      name: 'Bell Pepper',
      category: 'vegetables',
      icon: '🫑',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
      description: 'Colorful vegetable, needs proper nutrition',
      diseases: ['pepper_bacterial_spot']
    },
    wheat: {
      id: 'wheat',
      name: 'Wheat',
      category: 'vegetables',
      icon: '🌾',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      description: 'Major cereal crop, requires disease management',
      diseases: ['wheat_rust', 'wheat_powdery_mildew', 'wheat_leaf_blight', 'wheat_smut']
    },
    sugarcane: {
      id: 'sugarcane',
      name: 'Sugarcane',
      category: 'vegetables',
      icon: '🌿',
      image: 'https://t3.ftcdn.net/jpg/03/17/68/54/240_F_317685441_KPojhbRZoKnnc0a27dMAMS1sgqVwGvCR.jpg',
      description: 'Cash crop, needs proper nutrition and disease control',
      diseases: ['sugarcane_red_rot', 'sugarcane_smut', 'sugarcane_rust']
    },
    cotton: {
      id: 'cotton',
      name: 'Cotton',
      category: 'vegetables',
      icon: '☁️',
      image: 'https://images.unsplash.com/photo-1616431101491-554c0932ea40?w=400&h=300&fit=crop',
      description: 'Fiber crop, susceptible to various pests and diseases',
      diseases: ['cotton_leaf_curl', 'cotton_bacterial_blight', 'cotton_fusarium_wilt', 'cotton_root_rot']
    },
    rose: {
      id: 'rose',
      name: 'Rose',
      category: 'flowers',
      icon: '🌹',
      image: 'https://t4.ftcdn.net/jpg/04/43/93/45/240_F_443934565_5tlYb1wQLluatYmTgTNoqpI368VPgPnk.jpg',
      description: 'Beautiful flowering plant, prone to fungal diseases',
      diseases: ['rose_black_spot', 'rose_powdery_mildew', 'rose_rust']
    },
    marigold: {
      id: 'marigold',
      name: 'Marigold',
      category: 'flowers',
      icon: '🌼',
      image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=400&h=300&fit=crop',
      description: 'Hardy flowering plant, natural pest repellent',
      diseases: ['marigold_leaf_spot', 'marigold_root_rot']
    },
    mango: {
      id: 'mango',
      name: 'Mango',
      category: 'fruits',
      icon: '🥭',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
      description: 'Tropical fruit tree, requires seasonal care',
      diseases: ['mango_anthracnose', 'mango_powdery_mildew', 'mango_bacterial_canker']
    },
    apple: {
      id: 'apple',
      name: 'Apple',
      category: 'fruits',
      icon: '🍎',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
      description: 'Popular fruit tree, needs regular maintenance',
      diseases: ['apple_scab', 'apple_fire_blight']
    },
    neem: {
      id: 'neem',
      name: 'Neem Tree',
      category: 'trees',
      icon: '🌳',
      image: 'https://t4.ftcdn.net/jpg/03/64/10/19/240_F_364101952_xQz6BLFgG3H0zvpFvYLKzJQj3Hq0QQHK.jpg',
      description: 'Medicinal tree, naturally pest-resistant',
      diseases: ['neem_leaf_spot']
    }
  },

  diseases: {
    // Tomato Diseases
    tomato_early_blight: {
      name: 'Early Blight',
      crop: 'Tomato',
      icon: '🍂',
      severity: 'medium',
      description: 'Fungal disease causing brown spots with concentric rings on leaves',
      fertilizers: ['fert_mancozeb']
    },
    tomato_late_blight: {
      name: 'Late Blight',
      crop: 'Tomato',
      icon: '⚠️',
      severity: 'high',
      description: 'Destructive disease causing rapid plant death in wet conditions',
      fertilizers: ['fert_metalaxyl']
    },
    tomato_bacterial_spot: {
      name: 'Bacterial Spot',
      crop: 'Tomato',
      icon: '🦠',
      severity: 'medium',
      description: 'Bacterial infection causing dark spots on leaves and fruits',
      fertilizers: ['fert_copper_oxy']
    },
    tomato_leaf_mold: {
      name: 'Leaf Mold',
      crop: 'Tomato',
      icon: '🍄',
      severity: 'low',
      description: 'Fungal disease thriving in high humidity conditions',
      fertilizers: ['fert_azoxystrobin']
    },
    tomato_septoria: {
      name: 'Septoria Leaf Spot',
      crop: 'Tomato',
      icon: '🔴',
      severity: 'medium',
      description: 'Fungal disease with circular spots and black centers',
      fertilizers: ['fert_chlorothalonil']
    },

    // Potato Diseases
    potato_early_blight: {
      name: 'Early Blight',
      crop: 'Potato',
      icon: '🍂',
      severity: 'medium',
      description: 'Target-pattern spots on older leaves',
      fertilizers: ['fert_mancozeb']
    },
    potato_late_blight: {
      name: 'Late Blight',
      crop: 'Potato',
      icon: '⚠️',
      severity: 'high',
      description: 'Highly destructive disease affecting leaves and tubers',
      fertilizers: ['fert_metalaxyl']
    },

    // Pepper Diseases
    pepper_bacterial_spot: {
      name: 'Bacterial Spot',
      crop: 'Bell Pepper',
      icon: '🦠',
      severity: 'medium',
      description: 'Bacterial disease causing leaf and fruit spots',
      fertilizers: ['fert_copper_hydrox']
    },

    // Wheat Diseases
    wheat_rust: {
      name: 'Rust (Yellow/Brown/Black)',
      crop: 'Wheat',
      icon: '🟠',
      severity: 'high',
      description: 'Fungal disease causing rust-colored pustules on leaves and stems',
      fertilizers: ['fert_propiconazole']
    },
    wheat_powdery_mildew: {
      name: 'Powdery Mildew',
      crop: 'Wheat',
      icon: '☁️',
      severity: 'medium',
      description: 'White powdery growth on leaves reducing photosynthesis',
      fertilizers: ['fert_sulfur']
    },
    wheat_leaf_blight: {
      name: 'Leaf Blight',
      crop: 'Wheat',
      icon: '🍂',
      severity: 'medium',
      description: 'Brown lesions on leaves causing premature drying',
      fertilizers: ['fert_mancozeb']
    },
    wheat_smut: {
      name: 'Loose Smut',
      crop: 'Wheat',
      icon: '⚫',
      severity: 'high',
      description: 'Seed-borne disease destroying grain heads',
      fertilizers: ['fert_carboxin']
    },

    // Sugarcane Diseases
    sugarcane_red_rot: {
      name: 'Red Rot',
      crop: 'Sugarcane',
      icon: '🔴',
      severity: 'high',
      description: 'Destructive fungal disease causing red discoloration of stalks',
      fertilizers: ['fert_carbendazim']
    },
    sugarcane_smut: {
      name: 'Smut',
      crop: 'Sugarcane',
      icon: '⚫',
      severity: 'high',
      description: 'Black whip-like growth from shoot tips',
      fertilizers: ['fert_propiconazole']
    },
    sugarcane_rust: {
      name: 'Rust',
      crop: 'Sugarcane',
      icon: '🟤',
      severity: 'medium',
      description: 'Orange-brown pustules on leaf surfaces',
      fertilizers: ['fert_mancozeb']
    },

    // Cotton Diseases
    cotton_leaf_curl: {
      name: 'Leaf Curl Virus',
      crop: 'Cotton',
      icon: '🍀',
      severity: 'high',
      description: 'Viral disease causing leaf curling and stunted growth',
      fertilizers: ['fert_imidacloprid']
    },
    cotton_bacterial_blight: {
      name: 'Bacterial Blight',
      crop: 'Cotton',
      icon: '🦠',
      severity: 'high',
      description: 'Bacterial disease causing angular leaf spots and boll rot',
      fertilizers: ['fert_copper_oxy']
    },
    cotton_fusarium_wilt: {
      name: 'Fusarium Wilt',
      crop: 'Cotton',
      icon: '🍂',
      severity: 'high',
      description: 'Soil-borne fungal disease causing wilting and plant death',
      fertilizers: ['fert_carbendazim']
    },
    cotton_root_rot: {
      name: 'Root Rot',
      crop: 'Cotton',
      icon: '🌱',
      severity: 'high',
      description: 'Fungal disease affecting root system',
      fertilizers: ['fert_fosetyl_al']
    },

    // Rose Diseases
    rose_black_spot: {
      name: 'Black Spot',
      crop: 'Rose',
      icon: '⚫',
      severity: 'medium',
      description: 'Fungal disease causing black spots on leaves',
      fertilizers: ['fert_tebuconazole']
    },
    rose_powdery_mildew: {
      name: 'Powdery Mildew',
      crop: 'Rose',
      icon: '☁️',
      severity: 'low',
      description: 'White powdery coating on leaves and buds',
      fertilizers: ['fert_sulfur']
    },
    rose_rust: {
      name: 'Rust',
      crop: 'Rose',
      icon: '🟠',
      severity: 'medium',
      description: 'Orange-brown pustules on leaf undersides',
      fertilizers: ['fert_myclobutanil']
    },

    // Marigold Diseases
    marigold_leaf_spot: {
      name: 'Leaf Spot',
      crop: 'Marigold',
      icon: '🔴',
      severity: 'low',
      description: 'Brown spots on leaves affecting plant aesthetics',
      fertilizers: ['fert_chlorothalonil']
    },
    marigold_root_rot: {
      name: 'Root Rot',
      crop: 'Marigold',
      icon: '🌱',
      severity: 'high',
      description: 'Fungal disease affecting roots in waterlogged soil',
      fertilizers: ['fert_fosetyl_al']
    },

    // Mango Diseases
    mango_anthracnose: {
      name: 'Anthracnose',
      crop: 'Mango',
      icon: '🟤',
      severity: 'high',
      description: 'Black spots on fruits and leaves',
      fertilizers: ['fert_carbendazim']
    },
    mango_powdery_mildew: {
      name: 'Powdery Mildew',
      crop: 'Mango',
      icon: '☁️',
      severity: 'medium',
      description: 'White powder on flowers and young fruits',
      fertilizers: ['fert_sulfur']
    },
    mango_bacterial_canker: {
      name: 'Bacterial Canker',
      crop: 'Mango',
      icon: '🦠',
      severity: 'high',
      description: 'Bacterial infection causing cankers on branches',
      fertilizers: ['fert_streptocycline']
    },

    // Apple Diseases
    apple_scab: {
      name: 'Apple Scab',
      crop: 'Apple',
      icon: '🍎',
      severity: 'high',
      description: 'Fungal disease causing dark scabby lesions',
      fertilizers: ['fert_captan']
    },
    apple_fire_blight: {
      name: 'Fire Blight',
      crop: 'Apple',
      icon: '🔥',
      severity: 'high',
      description: 'Bacterial disease causing branch dieback',
      fertilizers: ['fert_streptomycin']
    },

    // Neem Diseases
    neem_leaf_spot: {
      name: 'Leaf Spot',
      crop: 'Neem Tree',
      icon: '🍃',
      severity: 'low',
      description: 'Minor fungal spots on leaves',
      fertilizers: ['fert_copper_oxy']
    }
  },

  fertilizers: {
    fert_mancozeb: {
      name: 'Mancozeb 75% WP',
      type: 'Fungicide',
      image: 'https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F4617423771770372819.webp&w=1080&q=90',
      dosage: '2.5 grams per liter',
      frequency: 'Every 7-14 days',
      coverage: '1 kg per acre',
      instructions: [
        'Mix 2.5 grams of Mancozeb in 1 liter of clean water',
        'Stir thoroughly until completely dissolved',
        'Apply as foliar spray covering both leaf surfaces',
        'Spray early morning or evening for best results',
        'Reapply after heavy rain (>1 inch)'
      ],
      safety: 'Wear protective gloves and mask during application. Avoid spraying during windy conditions. Wash hands thoroughly after use.',
      expectedResults: 'Disease progression stops within 5-7 days. Continue treatment for 3-4 weeks. New growth should be symptom-free.'
    },
    fert_metalaxyl: {
      name: 'Metalaxyl 8% + Mancozeb 64% WP',
      type: 'Systemic Fungicide',
      dosage: '2.5 grams per liter',
      frequency: 'Every 5-7 days',
      coverage: '1.5 kg per acre',
      instructions: [
        'Dissolve 2.5 grams in 1 liter of water',
        'Apply as complete coverage spray including stems',
        'Use high volume spray for thorough coverage',
        'Alternate with other fungicide groups to prevent resistance',
        'Apply preventively during disease-favorable weather'
      ],
      safety: 'Use protective equipment (gloves, mask, goggles). Avoid contact with skin and eyes. Do not contaminate water sources.',
      expectedResults: 'Act within 24-48 hours for best results. Infected plants may not recover fully. Focus on protecting healthy plants.'
    },
    fert_copper_oxy: {
      name: 'Copper Oxychloride 50% WP',
      type: 'Bactericide/Fungicide',
      dosage: '3 grams per liter',
      frequency: 'Weekly for 3-4 weeks',
      coverage: '2 kg per acre',
      instructions: [
        'Mix 3 grams in 1 liter of water',
        'Spray to runoff covering all plant parts',
        'Apply when plants are dry',
        'Do not apply during flowering to avoid fruit marking',
        'Best applied as preventive measure'
      ],
      safety: 'Wear protective clothing and respirator. Avoid inhalation of dust or spray mist. Do not apply near water bodies.',
      expectedResults: '2-4 weeks depending on severity. Early detection is crucial. New growth should be symptom-free within 2 weeks.'
    },
    fert_copper_hydrox: {
      name: 'Copper Hydroxide 53.8% WP',
      type: 'Bactericide',
      dosage: '2-3 grams per liter',
      frequency: 'Every 7-10 days',
      coverage: '1.5 kg per acre',
      instructions: [
        'Dissolve 2-3 grams in 1 liter of water',
        'Apply as foliar spray covering upper and lower leaf surfaces',
        'Spray early morning or evening',
        'Mix with sticker for better adhesion',
        'Avoid overhead watering after application'
      ],
      safety: 'Use protective gear during mixing and application. Avoid breathing spray mist. Store in original container only.',
      expectedResults: '2-3 weeks with consistent treatment. New growth should appear healthy. Continue monitoring for 4-6 weeks.'
    },
    fert_azoxystrobin: {
      name: 'Azoxystrobin 23% SC',
      type: 'Systemic Fungicide',
      dosage: '1 ml per liter',
      frequency: 'Every 10-14 days',
      coverage: '500 ml per acre',
      instructions: [
        'Add 1 ml to 1 liter of water',
        'Spray focusing on leaf undersides',
        'Best applied preventively before disease appears',
        'Rotate with other fungicide groups every 2-3 applications',
        'Ensure good coverage for maximum effectiveness'
      ],
      safety: 'Wear gloves and protective clothing. Avoid spray drift to non-target areas. Do not apply near beehives.',
      expectedResults: '2-3 weeks if humidity is controlled. Disease stops spreading quickly when conditions improve.'
    },
    fert_chlorothalonil: {
      name: 'Chlorothalonil 75% WP',
      type: 'Broad Spectrum Fungicide',
      dosage: '2 grams per liter',
      frequency: 'Every 7-10 days',
      coverage: '1.5 kg per acre',
      instructions: [
        'Mix 2 grams in 1 liter of water',
        'Apply thorough spray coverage of foliage',
        'Begin when plants are established',
        'Increase frequency during wet weather',
        'Reapply after rain if needed'
      ],
      safety: 'Use respirator and protective clothing. Avoid contact with eyes and skin. Do not apply during bloom period.',
      expectedResults: '3-4 weeks with consistent treatment. Disease can be managed but not cured. Continue treatment until harvest.'
    },
    fert_tebuconazole: {
      name: 'Tebuconazole 25.9% EC',
      type: 'Systemic Fungicide',
      dosage: '1 ml per liter',
      frequency: 'Every 10-14 days',
      coverage: '400 ml per acre',
      instructions: [
        'Add 1 ml to 1 liter of water',
        'Apply complete coverage spray of all plant parts',
        'Begin at first sign of disease or preventively',
        'Do not exceed label rates',
        'Avoid application during extreme heat'
      ],
      safety: 'Wear protective equipment during handling. Avoid contamination of water sources. Store in locked facility.',
      expectedResults: '2-3 weeks with proper application. Prevents spread to healthy tissue. Continue monitoring throughout season.'
    },
    fert_sulfur: {
      name: 'Wettable Sulfur 80% WP',
      type: 'Organic Fungicide',
      dosage: '3 grams per liter',
      frequency: 'Every 7-10 days',
      coverage: '2 kg per acre',
      instructions: [
        'Mix 3 grams in 1 liter of water',
        'Apply as fine spray covering all surfaces',
        'Do not apply when temperature exceeds 32°C',
        'Best used as preventive treatment',
        'Can be used in organic farming'
      ],
      safety: 'Wear dust mask during mixing. Generally safe for beneficial insects. Store in cool, dry place.',
      expectedResults: '1-2 weeks for visible improvement. Safe for repeated applications. Effective when applied early.'
    },
    fert_myclobutanil: {
      name: 'Myclobutanil 10% WP',
      type: 'Systemic Fungicide',
      dosage: '0.5 grams per liter',
      frequency: 'Every 14 days',
      coverage: '300 grams per acre',
      instructions: [
        'Dissolve 0.5 grams in 1 liter of water',
        'Apply as thorough foliar spray',
        'Provides both curative and preventive action',
        'Rotate with other fungicide groups',
        'Apply before disease becomes severe'
      ],
      safety: 'Use protective gloves and mask. Avoid spray drift. Toxic to aquatic organisms.',
      expectedResults: '2-3 weeks for complete control. Systemic action provides long-lasting protection.'
    },
    fert_fosetyl_al: {
      name: 'Fosetyl-Al 80% WP',
      type: 'Systemic Fungicide',
      dosage: '2.5 grams per liter',
      frequency: 'Every 15-20 days',
      coverage: '1.5 kg per acre',
      instructions: [
        'Mix 2.5 grams in 1 liter of water',
        'Apply as soil drench or foliar spray',
        'Effective against root and foliar diseases',
        'Can be tank-mixed with other fungicides',
        'Apply when disease pressure is high'
      ],
      safety: 'Wear protective equipment. Avoid contact with skin and eyes. Do not contaminate water sources.',
      expectedResults: '3-4 weeks for root disease control. Improves plant vigor. Continue treatment as preventive measure.'
    },
    fert_carbendazim: {
      name: 'Carbendazim 50% WP',
      type: 'Systemic Fungicide',
      dosage: '1 gram per liter',
      frequency: 'Every 10-15 days',
      coverage: '500 grams per acre',
      instructions: [
        'Dissolve 1 gram in 1 liter of water',
        'Apply as foliar spray or fruit dip',
        'Effective for pre and post-harvest treatment',
        'Provides systemic and contact action',
        'Best applied before fruit maturity'
      ],
      safety: 'Use protective clothing and gloves. Follow pre-harvest interval (7-10 days). Store in original container.',
      expectedResults: '2-3 weeks for disease control. Reduces post-harvest losses. Safe for consumption after waiting period.'
    },
    fert_streptocycline: {
      name: 'Streptocycline 90% SP',
      type: 'Antibiotic Bactericide',
      dosage: '0.5 grams per liter',
      frequency: 'Every 7-10 days',
      coverage: '200 grams per acre',
      instructions: [
        'Mix 0.5 grams in 1 liter of water',
        'Apply as foliar spray or trunk injection',
        'Most effective when applied early',
        'Combine with copper fungicide for better results',
        'Apply during cool hours of the day'
      ],
      safety: 'Wear gloves during handling. Antibiotic - use judiciously. Follow resistance management practices.',
      expectedResults: '2-4 weeks for bacterial disease control. Prevents spread to healthy tissue. May require multiple applications.'
    },
    fert_captan: {
      name: 'Captan 50% WP',
      type: 'Protective Fungicide',
      dosage: '2 grams per liter',
      frequency: 'Every 7-10 days',
      coverage: '1.5 kg per acre',
      instructions: [
        'Mix 2 grams in 1 liter of water',
        'Apply as protective spray before disease appears',
        'Provides excellent coverage on leaf surfaces',
        'Reapply after rain or irrigation',
        'Start applications at bud break'
      ],
      safety: 'Wear protective equipment. Avoid breathing dust or spray. Harmful if swallowed.',
      expectedResults: '3-4 weeks for disease prevention. Most effective as preventive treatment. Continue throughout growing season.'
    },
    fert_streptomycin: {
      name: 'Streptomycin Sulfate 90% SP',
      type: 'Antibiotic Bactericide',
      dosage: '0.5 grams per liter',
      frequency: 'Every 5-7 days',
      coverage: '200 grams per acre',
      instructions: [
        'Dissolve 0.5 grams in 1 liter of water',
        'Apply as foliar spray during bloom period',
        'Most effective when applied preventively',
        'Rotate with copper products',
        'Apply during dry weather for best results'
      ],
      safety: 'Use protective gloves and mask. Do not apply near beehives during bloom. Use only when necessary to prevent resistance.',
      expectedResults: '1-2 weeks for bacterial disease control. Prevents blossom infection. Critical to apply before symptoms appear.'
    },
    fert_propiconazole: {
      name: 'Propiconazole 25% EC',
      type: 'Systemic Fungicide',
      dosage: '1 ml per liter',
      frequency: 'Every 10-15 days',
      coverage: '500 ml per acre',
      instructions: [
        'Mix 1 ml in 1 liter of water',
        'Apply as foliar spray at first sign of disease',
        'Provides both preventive and curative action',
        'Best applied during early growth stages',
        'Ensure complete coverage of plant canopy'
      ],
      safety: 'Wear protective gloves, mask, and clothing. Avoid contact with skin and eyes. Toxic to aquatic life - observe buffer zones.',
      expectedResults: '2-3 weeks for rust control. Stops disease progression quickly. Continue monitoring for re-infection throughout season.'
    },
    fert_carboxin: {
      name: 'Carboxin 75% WP',
      type: 'Seed Treatment Fungicide',
      dosage: '2 grams per kg seed',
      frequency: 'One-time seed treatment',
      coverage: '2 kg per ton of seed',
      instructions: [
        'Mix 2 grams with 1 kg of seed',
        'Add small amount of water to make slurry',
        'Coat seeds uniformly and dry in shade',
        'Sow treated seeds within 24 hours',
        'Do not use treated seeds for food or feed'
      ],
      safety: 'Wear gloves during seed treatment. Avoid inhalation of dust. Keep treated seeds away from children and animals.',
      expectedResults: 'Prevents seed-borne diseases. Protects seedlings for 30-45 days. Ensures healthy crop establishment.'
    },
    fert_imidacloprid: {
      name: 'Imidacloprid 17.8% SL',
      type: 'Systemic Insecticide',
      dosage: '0.5 ml per liter',
      frequency: 'Every 15-20 days',
      coverage: '250 ml per acre',
      instructions: [
        'Mix 0.5 ml in 1 liter of water',
        'Apply as foliar spray or soil drench',
        'Controls whitefly vectors spreading viral diseases',
        'Most effective when applied early',
        'Rotate with other insecticide groups'
      ],
      safety: 'Highly toxic to bees - do not apply during flowering. Wear protective equipment. Follow pre-harvest interval strictly.',
      expectedResults: 'Controls vector insects within 3-5 days. Prevents virus spread. Continue monitoring and treatment as needed.'
    }
  }
};

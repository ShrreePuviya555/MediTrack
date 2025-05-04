export interface Medicine {
  id: string
  name: string
  description?: string
  price?: number
  category: string
  inStock: boolean
  dosage?: string
  manufacturer?: string
  imageUrl?: string
}

export const medicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol",
    description:
      "A pain reliever and fever reducer used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.",
    price: 5.99,
    category: "Pain Relief",
    inStock: true,
    dosage: "500mg",
    manufacturer: "MedPharm",
  },
  {
    id: "2",
    name: "Ibuprofen",
    description:
      "A nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever.",
    price: 7.49,
    category: "Pain Relief",
    inStock: true,
    dosage: "200mg",
    manufacturer: "HealthCare",
  },
  {
    id: "3",
    name: "Amoxicillin",
    description:
      "An antibiotic used to treat a number of bacterial infections including middle ear infection, strep throat, pneumonia, skin infections, and urinary tract infections.",
    price: 12.99,
    category: "Antibiotics",
    inStock: false,
    dosage: "250mg",
    manufacturer: "MediLabs",
  },
  {
    id: "4",
    name: "Loratadine",
    description:
      "An antihistamine that reduces the effects of natural chemical histamine in the body, used to treat sneezing, runny nose, watery eyes, hives, skin rash, itching, and other cold or allergy symptoms.",
    price: 8.99,
    category: "Allergy",
    inStock: true,
    dosage: "10mg",
    manufacturer: "AllerCare",
  },
  {
    id: "5",
    name: "Omeprazole",
    description:
      "A proton pump inhibitor that decreases the amount of acid produced in the stomach, used to treat symptoms of gastroesophageal reflux disease (GERD) and other conditions caused by excess stomach acid.",
    price: 15.49,
    category: "Digestive Health",
    inStock: true,
    dosage: "20mg",
    manufacturer: "GastroHealth",
  },
  {
    id: "6",
    name: "Simvastatin",
    description:
      "A statin medication used to lower cholesterol and triglycerides in the blood, reducing the risk of heart disease and helping prevent strokes and heart attacks.",
    price: 22.99,
    category: "Cardiovascular",
    inStock: true,
    dosage: "40mg",
    manufacturer: "HeartWell",
  },
  {
    id: "7",
    name: "Metformin",
    description: "An oral diabetes medicine that helps control blood sugar levels, used to treat type 2 diabetes.",
    price: 9.99,
    category: "Diabetes",
    inStock: true,
    dosage: "500mg",
    manufacturer: "DiabeCare",
  },
  {
    id: "8",
    name: "Salbutamol Inhaler",
    description:
      "A bronchodilator that relaxes muscles in the airways and increases air flow to the lungs, used to treat asthma and chronic obstructive pulmonary disease (COPD).",
    price: 25.99,
    category: "Respiratory",
    inStock: true,
    dosage: "100mcg",
    manufacturer: "BreathEasy",
  },
  {
    id: "9",
    name: "Cetirizine",
    description:
      "An antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching.",
    price: 6.99,
    category: "Allergy",
    inStock: true,
    dosage: "10mg",
    manufacturer: "AllerCare",
  },
  {
    id: "10",
    name: "Aspirin",
    description:
      "A salicylate that reduces substances in the body that cause pain, fever, and inflammation. Also used as a blood thinner to prevent blood clots.",
    price: 4.99,
    category: "Pain Relief",
    inStock: true,
    dosage: "325mg",
    manufacturer: "HeartWell",
  },
]

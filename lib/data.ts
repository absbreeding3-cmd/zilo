interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  dosage?: string;
}

export const data: Product[] = [
  {
    id: "med-1",
    name: "Paracetamol 500mg",
    description: "Effective relief from fever and mild to moderate pain.",
    price: 4.99,
    originalPrice: 6.99,
    image: "https://picsum.photos/seed/paracetamol/400/300",
    category: "Tablets",
    inStock: true,
    dosage: "1-2 tablets every 4-6 hours as needed."
  },
  {
    id: "med-2",
    name: "Cough Syrup Relief Extra",
    description: "Soothes dry coughs and relieves chest congestion quickly.",
    price: 12.50,
    image: "https://picsum.photos/seed/coughsyrup/400/300",
    category: "Syrups",
    inStock: true,
    dosage: "10ml up to 4 times a day."
  },
  {
    id: "med-3",
    name: "Vitamin C 1000mg Effervescent",
    description: "Boosts immunity, formulated with Vitamin C and Zinc.",
    price: 8.25,
    originalPrice: 10.00,
    image: "https://picsum.photos/seed/vitaminc/400/300",
    category: "Healthcare Products",
    inStock: true,
    dosage: "1 tablet dissolved in water daily."
  },
  {
    id: "med-4",
    name: "Baby Diaper Cream",
    description: "Gentle protection against diaper rash for babies.",
    price: 15.00,
    image: "https://picsum.photos/seed/diapercream/400/300",
    category: "Baby Care",
    inStock: true,
  },
  {
    id: "med-5",
    name: "Ibuprofen 400mg",
    description: "Strong pain relief and anti-inflammatory action.",
    price: 6.50,
    originalPrice: 8.00,
    image: "https://picsum.photos/seed/ibuprofen/400/300",
    category: "Tablets",
    inStock: true,
    dosage: "1 tablet every 6-8 hours with food."
  },
  {
    id: "med-6",
    name: "First Aid Kit Pro",
    description: "Complete essential medical pack for home and travel.",
    price: 29.99,
    image: "https://picsum.photos/seed/firstaid/400/300",
    category: "Healthcare Products",
    inStock: false,
  }
];

export const getProducts = () => data;
export const getProductById = (id: string) => data.find(p => p.id === id);
export const getCategories = () => Array.from(new Set(data.map(p => p.category)));

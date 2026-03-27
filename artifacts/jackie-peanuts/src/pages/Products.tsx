import { useListProducts } from "@workspace/api-client-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/store/use-cart";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

// Fallback data reflecting the exact brief requirements in case API is empty
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Smooth Peanut Butter",
    description: "Creamy, rich, and perfectly spreadable natural peanut butter.",
    category: "Peanut Butter",
    imageUrl: "https://files.catbox.moe/pttz8c.jpg",
    price: 300,
    weight: "500G",
    inStock: true,
    featured: true,
    variants: []
  },
  {
    id: 2,
    name: "Crunchy Peanut Butter",
    description: "Natural peanut butter with real peanut chunks for the perfect crunch.",
    category: "Peanut Butter",
    imageUrl: "https://files.catbox.moe/i5f5ax.jpg",
    price: 550,
    weight: "1KG",
    inStock: true,
    featured: true,
    variants: [
      { id: 101, productId: 2, weight: "1KG", price: 550, imageUrl: "https://files.catbox.moe/i5f5ax.jpg" },
      { id: 102, productId: 2, weight: "500G", price: 300, imageUrl: "https://files.catbox.moe/c2goss.jpg" },
      { id: 103, productId: 2, weight: "250G", price: 200, imageUrl: "https://files.catbox.moe/e71dmk.jpg" },
    ]
  },
  {
    id: 3,
    name: "Roasted Packaged Peanuts",
    description: "Premium perfectly roasted peanuts for a quick, healthy snack.",
    category: "Snacks",
    imageUrl: "https://files.catbox.moe/i5f5ax.jpg",
    price: 50,
    weight: "Small",
    inStock: true,
    featured: true,
    variants: [
      { id: 201, productId: 3, weight: "Pack A", price: 50 },
      { id: 202, productId: 3, weight: "Pack B", price: 100 },
      { id: 203, productId: 3, weight: "Pack C", price: 150 },
      { id: 204, productId: 3, weight: "Pack D", price: 200 },
    ]
  }
];

export default function Products() {
  const { data: apiProducts, isLoading } = useListProducts();
  const products = apiProducts?.length ? apiProducts : FALLBACK_PRODUCTS;
  const addItem = useCart(s => s.addItem);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Our Products</h1>
            <p className="text-lg text-muted-foreground">Discover our range of premium, all-natural peanut products.</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product as any} onAdd={addItem} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: any }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentImage = selectedVariant?.imageUrl || product.imageUrl;
  const currentWeight = selectedVariant ? selectedVariant.weight : product.weight;

  return (
    <div className="group bg-card rounded-3xl overflow-hidden shadow-lg shadow-primary/5 border border-border/50 hover:shadow-xl hover:border-accent/30 transition-all duration-300 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img 
          src={currentImage} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2 text-xs font-bold text-accent uppercase tracking-wider">{product.category}</div>
        <h3 className="font-display text-xl font-bold text-primary mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-6 flex-1">{product.description}</p>
        
        {product.variants && product.variants.length > 0 && (
          <div className="mb-6">
            <label className="text-xs font-semibold text-primary mb-2 block">Select Size:</label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v: any) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                    selectedVariant?.id === v.id 
                      ? 'border-accent bg-accent/10 text-accent font-bold' 
                      : 'border-border hover:border-primary/30 text-muted-foreground'
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">{currentWeight}</span>
            <span className="font-display text-2xl font-bold text-primary">KES {currentPrice}</span>
          </div>
          <button
            onClick={() => onAdd(product, selectedVariant, 1)}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 transition-all"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

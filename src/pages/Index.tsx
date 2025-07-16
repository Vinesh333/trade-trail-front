import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard, Product } from "@/components/ProductCard";
import { ShoppingCart, CartItem } from "@/components/ShoppingCart";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import product images
import headphonesImg from "@/assets/product-headphones.jpg";
import smartwatchImg from "@/assets/product-smartwatch.jpg";
import laptopImg from "@/assets/product-laptop.jpg";
import smartphoneImg from "@/assets/product-smartphone.jpg";

const Index = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample products data
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 129.99,
      originalPrice: 179.99,
      image: headphonesImg,
      rating: 4.8,
      reviewCount: 324,
      category: "Audio",
      inStock: true,
    },
    {
      id: "2", 
      name: "Smart Fitness Watch",
      price: 299.99,
      originalPrice: 399.99,
      image: smartwatchImg,
      rating: 4.6,
      reviewCount: 156,
      category: "Wearables",
      inStock: true,
    },
    {
      id: "3",
      name: "Ultra Performance Laptop",
      price: 1299.99,
      originalPrice: 1599.99,
      image: laptopImg,
      rating: 4.9,
      reviewCount: 89,
      category: "Computers",
      inStock: true,
    },
    {
      id: "4",
      name: "Latest Smartphone Pro",
      price: 899.99,
      originalPrice: 1099.99,
      image: smartphoneImg,
      rating: 4.7,
      reviewCount: 203,
      category: "Mobile",
      inStock: false,
    },
    {
      id: "5",
      name: "Wireless Gaming Headset",
      price: 89.99,
      originalPrice: 129.99,
      image: headphonesImg,
      rating: 4.5,
      reviewCount: 445,
      category: "Gaming",
      inStock: true,
    },
    {
      id: "6",
      name: "Professional Laptop Stand",
      price: 79.99,
      image: laptopImg,
      rating: 4.4,
      reviewCount: 167,
      category: "Accessories",
      inStock: true,
    },
  ]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Updated cart",
          description: `Increased quantity of ${product.name}`,
        });
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    if (item) {
      toast({
        title: "Removed from cart",
        description: `${item.name} has been removed from your cart`,
      });
    }
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthOpen(true);
      toast({
        title: "Please sign in",
        description: "You need to be logged in to checkout",
      });
      return;
    }
    
    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment page...",
    });
    
    // Here you would integrate with Stripe or other payment processor
    setIsCartOpen(false);
  };

  const handleLogin = (email: string, password: string) => {
    setUser({ name: email.split('@')[0], email });
    toast({
      title: "Welcome back!",
      description: "You have been successfully logged in",
    });
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setUser({ name, email });
    toast({
      title: "Account created!",
      description: "Welcome to TechStore",
    });
  };

  const handleProductClick = (product: Product) => {
    toast({
      title: "Product details",
      description: `Viewing ${product.name}`,
    });
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
      />
      
      <HeroSection onShopNow={scrollToProducts} />
      
      {/* Products Section */}
      <section id="products-section" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium electronics and tech accessories
            </p>
          </div>

          {/* Filters and View Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort by
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-6 h-6 bg-primary" />
                </div>
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground text-sm">
                  All products are tested and certified for the highest quality standards
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-6 h-6 bg-accent" />
                </div>
                <h3 className="font-semibold mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  Free shipping on orders over $50 with express delivery options
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-6 h-6 bg-success" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground text-sm">
                  Our customer service team is available around the clock to help you
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TechStore</h3>
              <p className="text-primary-foreground/80 text-sm">
                Your trusted partner for premium electronics and tech accessories.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">About Us</div>
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">Contact</div>
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">Support</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">Audio</div>
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">Computers</div>
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">Mobile</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">Twitter</div>
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">Instagram</div>
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">Facebook</div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
            <p>&copy; 2024 TechStore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default Index;

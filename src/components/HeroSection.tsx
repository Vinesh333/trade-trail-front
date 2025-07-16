import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  onShopNow: () => void;
}

export const HeroSection = ({ onShopNow }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-white/80">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Trending Tech Store</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover the Latest
              <span className="block text-accent-foreground">Tech Innovations</span>
            </h1>
            
            <p className="text-lg text-white/90 max-w-lg">
              Shop premium electronics with unbeatable prices. From smartphones to laptops, 
              find everything you need with fast shipping and excellent customer service.
            </p>
            
            <div className="flex items-center gap-6">
              <Button 
                variant="secondary" 
                size="xl"
                onClick={onShopNow}
                className="bg-white text-primary hover:bg-white/90 shadow-xl"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
              
              <div className="flex items-center gap-2 text-white/90">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm">4.8/5 from 2,500+ reviews</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-white/70">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/70">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-white/70">Support</div>
              </div>
            </div>
          </div>
          
          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <ShoppingBag className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2">Free Shipping</h3>
                  <p className="text-sm text-white/70">On orders over $50</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <Star className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2">Premium Quality</h3>
                  <p className="text-sm text-white/70">Certified products only</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2">Best Prices</h3>
                  <p className="text-sm text-white/70">Competitive pricing</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mb-3">
                    <span className="text-xs font-bold text-accent-foreground">24</span>
                  </div>
                  <h3 className="font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-sm text-white/70">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
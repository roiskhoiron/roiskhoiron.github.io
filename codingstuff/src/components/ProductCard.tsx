import { ExternalLink } from "lucide-react";
import type { ProductItem } from "../types/product";

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-2xl border-none bg-card p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="shrink-0">
        <img
          src={product.cover}
          alt={product.name}
          className="h-24 w-24 rounded-xl border border-border object-cover md:h-28 md:w-28 bg-card"
          loading="lazy"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="font-heading font-semibold text-foreground line-clamp-2 text-base md:text-lg">
              {product.name}
            </h3>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </a>
  );
};

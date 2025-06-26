"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

import React from "react"

// Dummy Star and Badge components for illustration
const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12,2 15,8.5 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 9,8.5" /></svg>
)
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={className}>{children}</span>
)
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
)

type Product = {
  id: number
  title: string
  images: string[]
  rating: number
  reviewCount: number
  sold: number
  price: number
  originalPrice: number
  discount: number
  shipping: string
  fullDescription: string
  inStock: boolean
  buyNowLink: string
}

interface ProductDetailsPageProps {
  productsData: Product[]
  selectedProductId: number | null
  selectedImageIndex: number
  setSelectedImageIndex: (index: number) => void
  navigateToHome: () => void
  toggleWishlist: (id: number) => void
  wishlist: number[]
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productsData,
  selectedProductId,
  selectedImageIndex,
  setSelectedImageIndex,
  navigateToHome,
  toggleWishlist,
  wishlist,
}) => {
  const product = productsData.find((p) => p.id === selectedProductId)
  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" onClick={navigateToHome} className="mb-4 hover:bg-gray-100">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="mb-4">
            <img
              src={product.images[selectedImageIndex] || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg border"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden ${
                    selectedImageIndex === index ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-normal mb-4 text-gray-800">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews) | {product.sold} sold
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-3xl font-bold text-red-500">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
              )}
              {product.discount && <Badge className="bg-red-100 text-red-600">-{product.discount}%</Badge>}
            </div>
            <div className="text-sm text-gray-600">{product.shipping}</div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{product.fullDescription}</p>
          </div>

          <div className="flex space-x-4 mb-6">
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 py-3"
              disabled={!product.inStock}
              onClick={() => window.open(product.buyNowLink, "_blank")}
            >
              {product.inStock ? "Buy Now" : "Out of Stock"}
            </Button>
            <Button variant="outline" className="px-6">
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => toggleWishlist(product.id)}
              className={wishlist.includes(product.id) ? "border-red-500 text-red-500" : ""}
            >
              <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage


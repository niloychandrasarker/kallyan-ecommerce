"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Menu,
  X,
  Star,
  Filter,
  ArrowLeft,
  Heart,
  ChevronDown,
  Globe,
  Trash2,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductDetailsPage from "./pages/ProductDetailsPage"

// Dummy product data (keeping the same data structure)
const productsData = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB",
    price: 1299,
    originalPrice: 1499,
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    fullDescription:
      "The iPhone 15 Pro Max represents the pinnacle of smartphone technology. Featuring the revolutionary A17 Pro chip built on 3-nanometer technology, this device delivers unprecedented performance and efficiency. The titanium design makes it both lighter and more durable than ever before. The advanced camera system includes a 48MP main camera, ultra-wide, and telephoto lenses with up to 5x optical zoom. The 6.7-inch Super Retina XDR display with ProMotion technology provides stunning visuals with 120Hz refresh rate.",
    images: [
      "/mobile.jpg?height=500&width=500",
      "/mobile.jpg?height=500&width=500",
      "/mobile.jpg?height=500&width=500",
    ],
    category: "Electronics",
    subcategory: "Smartphones",
    stock: 15,
    rating: 4.8,
    reviewCount: 234,
    buyNowLink: "https://apple.com",
    inStock: true,
    featured: true,
    brand: "Apple",
    sold: 1234,
    shipping: "Free shipping",
    discount: 13,
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    price: 1199,
    originalPrice: 1399,
    description: "Flagship Android phone with S Pen, AI features, and 200MP camera",
    fullDescription:
      "The Samsung Galaxy S24 Ultra is the ultimate Android flagship smartphone. It features the powerful Snapdragon 8 Gen 3 processor, built-in S Pen for productivity, and an incredible 200MP main camera with advanced AI photography features. The 6.8-inch Dynamic AMOLED 2X display delivers vibrant colors and sharp details. With up to 1TB of storage and 12GB RAM, this phone handles any task with ease.",
    images: [
    "/mobile.jpg?height=500&width=500",
      "/mobile.jpg?height=500&width=500",
      "/mobile.jpg?height=500&width=500",
    ],
    category: "Electronics",
    subcategory: "Smartphones",
    stock: 8,
    rating: 4.7,
    reviewCount: 189,
    buyNowLink: "https://samsung.com",
    inStock: true,
    featured: true,
    brand: "Samsung",
    sold: 892,
    shipping: "Free shipping",
    discount: 14,
  },
  {
    id: 3,
    title: "Nike Air Max 270 React",
    price: 150,
    originalPrice: 180,
    description: "Comfortable running shoes with Air Max technology and React foam",
    fullDescription:
      "The Nike Air Max 270 React combines the comfort of React foam with the iconic Air Max 270 unit for all-day comfort. The engineered mesh upper provides breathability while the rubber outsole offers durable traction. Perfect for running, training, or casual wear. Available in multiple colorways to match your style.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Shoes",
    stock: 0,
    rating: 4.5,
    reviewCount: 456,
    buyNowLink: "https://nike.com",
    inStock: false,
    featured: false,
    brand: "Nike",
    sold: 567,
    shipping: "$5.99 shipping",
    discount: 17,
  },
  {
    id: 4,
    title: "Wireless Bluetooth Earbuds Pro",
    price: 29.99,
    originalPrice: 59.99,
    description: "TWS Bluetooth 5.0 Earphones with Charging Case",
    fullDescription:
      "High-quality wireless earbuds with noise cancellation, waterproof design, and long battery life. Perfect for sports, work, and daily use.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Audio",
    stock: 156,
    rating: 4.3,
    reviewCount: 2847,
    buyNowLink: "https://example.com",
    inStock: true,
    featured: true,
    brand: "Generic",
    sold: 15234,
    shipping: "Free shipping",
    discount: 50,
  },
  {
    id: 5,
    title: "Smart Watch Fitness Tracker",
    price: 45.99,
    originalPrice: 89.99,
    description: "1.4 inch HD Touch Screen, Heart Rate Monitor, Sleep Tracker",
    fullDescription:
      "Advanced fitness tracker with multiple sport modes, health monitoring, and smartphone connectivity.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Wearables",
    stock: 89,
    rating: 4.4,
    reviewCount: 1567,
    buyNowLink: "https://example.com",
    inStock: true,
    featured: false,
    brand: "Generic",
    sold: 8934,
    shipping: "Free shipping",
    discount: 49,
  },
  {
    id: 6,
    title: "Gaming Mechanical Keyboard RGB",
    price: 89.99,
    originalPrice: 129.99,
    description: "RGB Backlit Gaming Keyboard with Blue Switches",
    fullDescription:
      "Professional gaming keyboard with mechanical blue switches, RGB backlighting, and anti-ghosting technology.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Gaming",
    stock: 45,
    rating: 4.6,
    reviewCount: 892,
    buyNowLink: "https://example.com",
    inStock: true,
    featured: false,
    brand: "Generic",
    sold: 3456,
    shipping: "Free shipping",
    discount: 31,
  },
  {
    id: 7,
    title: "Adidas Ultraboost 22 Running Shoes",
    price: 180,
    originalPrice: 220,
    description: "Premium running shoes with Boost midsole and Primeknit upper",
    fullDescription:
      "Experience ultimate comfort with Adidas Ultraboost 22. Features responsive Boost midsole, adaptive Primeknit upper, and Continental rubber outsole for superior grip.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Shoes",
    stock: 67,
    rating: 4.7,
    reviewCount: 1234,
    buyNowLink: "https://adidas.com",
    inStock: true,
    featured: true,
    brand: "Adidas",
    sold: 2345,
    shipping: "Free shipping",
    discount: 18,
  },
  {
    id: 8,
    title: "Sony WH-1000XM5 Headphones",
    price: 349.99,
    originalPrice: 399.99,
    description: "Industry-leading noise canceling wireless headphones",
    fullDescription:
      "Sony's flagship headphones with industry-leading noise cancellation, 30-hour battery life, and premium sound quality. Perfect for travel and daily use.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Audio",
    stock: 23,
    rating: 4.8,
    reviewCount: 567,
    buyNowLink: "https://sony.com",
    inStock: true,
    featured: true,
    brand: "Sony",
    sold: 1567,
    shipping: "Free shipping",
    discount: 13,
  },
  {
    id: 9,
    title: "MacBook Air M2 13-inch",
    price: 1099,
    originalPrice: 1199,
    description: "Supercharged by M2 chip, 13.6-inch Liquid Retina display",
    fullDescription:
      "The redesigned MacBook Air with M2 chip delivers incredible performance and up to 18 hours of battery life. Features a stunning 13.6-inch Liquid Retina display and advanced camera.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Laptops",
    stock: 12,
    rating: 4.9,
    reviewCount: 345,
    buyNowLink: "https://apple.com",
    inStock: true,
    featured: true,
    brand: "Apple",
    sold: 789,
    shipping: "Free shipping",
    discount: 8,
  },
  {
    id: 10,
    title: "Levi's 501 Original Jeans",
    price: 59.99,
    originalPrice: 79.99,
    description: "Classic straight fit jeans, the original blue jean since 1873",
    fullDescription:
      "The iconic Levi's 501 Original jeans with classic straight fit, button fly, and timeless style. Made from premium denim for durability and comfort.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Clothing",
    stock: 156,
    rating: 4.4,
    reviewCount: 2134,
    buyNowLink: "https://levi.com",
    inStock: true,
    featured: false,
    brand: "Levi's",
    sold: 5678,
    shipping: "$4.99 shipping",
    discount: 25,
  },
  {
    id: 11,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 79.99,
    originalPrice: 119.99,
    description: "7-in-1 multi-cooker: pressure cooker, slow cooker, rice cooker, and more",
    fullDescription:
      "The Instant Pot Duo combines 7 kitchen appliances in one. Pressure cook, slow cook, rice cook, steam, sauté, yogurt make, and warm. 6-quart capacity perfect for families.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Kitchen",
    stock: 89,
    rating: 4.6,
    reviewCount: 12456,
    buyNowLink: "https://example.com",
    inStock: true,
    featured: true,
    brand: "Instant Pot",
    sold: 23456,
    shipping: "Free shipping",
    discount: 33,
  },
  {
    id: 12,
    title: "Nintendo Switch OLED Console",
    price: 349.99,
    originalPrice: 349.99,
    description: "Gaming console with 7-inch OLED screen and enhanced audio",
    fullDescription:
      "Nintendo Switch OLED model features a vibrant 7-inch OLED screen, enhanced audio, and 64GB internal storage. Play at home or on the go.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Gaming",
    stock: 34,
    rating: 4.8,
    reviewCount: 1789,
    buyNowLink: "https://nintendo.com",
    inStock: true,
    featured: true,
    brand: "Nintendo",
    sold: 4567,
    shipping: "Free shipping",
    discount: 0,
  },
  {
    id: 13,
    title: "Dyson V15 Detect Cordless Vacuum",
    price: 649.99,
    originalPrice: 749.99,
    description: "Powerful cordless vacuum with laser dust detection",
    fullDescription:
      "Dyson's most powerful cordless vacuum with laser dust detection, LCD screen showing particle count, and up to 60 minutes of run time.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Appliances",
    stock: 18,
    rating: 4.7,
    reviewCount: 456,
    buyNowLink: "https://dyson.com",
    inStock: true,
    featured: true,
    brand: "Dyson",
    sold: 1234,
    shipping: "Free shipping",
    discount: 13,
  },
  {
    id: 14,
    title: "Canon EOS R6 Mark II Camera",
    price: 2499,
    originalPrice: 2699,
    description: "Full-frame mirrorless camera with 24.2MP sensor",
    fullDescription:
      "Professional mirrorless camera with 24.2MP full-frame sensor, 4K video recording, and advanced autofocus system. Perfect for photography enthusiasts.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Cameras",
    stock: 7,
    rating: 4.9,
    reviewCount: 123,
    buyNowLink: "https://canon.com",
    inStock: true,
    featured: true,
    brand: "Canon",
    sold: 234,
    shipping: "Free shipping",
    discount: 7,
  },
  {
    id: 15,
    title: "The North Face Venture 2 Jacket",
    price: 99.99,
    originalPrice: 129.99,
    description: "Waterproof, breathable rain jacket for outdoor adventures",
    fullDescription:
      "Lightweight and packable rain jacket with DryVent technology. Perfect for hiking, camping, and everyday wear. Available in multiple colors.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Outerwear",
    stock: 78,
    rating: 4.5,
    reviewCount: 789,
    buyNowLink: "https://thenorthface.com",
    inStock: true,
    featured: false,
    brand: "The North Face",
    sold: 2345,
    shipping: "$6.99 shipping",
    discount: 23,
  },
  {
    id: 16,
    title: "iPad Pro 12.9-inch M2",
    price: 1099,
    originalPrice: 1199,
    description: "Most advanced iPad with M2 chip and Liquid Retina XDR display",
    fullDescription:
      "The ultimate iPad experience with M2 chip, stunning 12.9-inch Liquid Retina XDR display, and all-day battery life. Perfect for creative professionals.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Tablets",
    stock: 25,
    rating: 4.8,
    reviewCount: 567,
    buyNowLink: "https://apple.com",
    inStock: true,
    featured: true,
    brand: "Apple",
    sold: 1456,
    shipping: "Free shipping",
    discount: 8,
  },
  {
    id: 17,
    title: "Fitbit Charge 5 Fitness Tracker",
    price: 149.99,
    originalPrice: 199.99,
    description: "Advanced fitness tracker with built-in GPS and health metrics",
    fullDescription:
      "Track your fitness goals with built-in GPS, heart rate monitoring, stress management tools, and 6+ day battery life.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Wearables",
    stock: 67,
    rating: 4.3,
    reviewCount: 1234,
    buyNowLink: "https://fitbit.com",
    inStock: true,
    featured: false,
    brand: "Fitbit",
    sold: 3456,
    shipping: "Free shipping",
    discount: 25,
  },
  {
    id: 18,
    title: "KitchenAid Stand Mixer",
    price: 379.99,
    originalPrice: 449.99,
    description: "5-quart tilt-head stand mixer with 10 speeds",
    fullDescription:
      "Professional-grade stand mixer with 5-quart stainless steel bowl, 10 speeds, and planetary mixing action. Includes dough hook, flat beater, and wire whip.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Kitchen",
    stock: 23,
    rating: 4.8,
    reviewCount: 2345,
    buyNowLink: "https://kitchenaid.com",
    inStock: true,
    featured: true,
    brand: "KitchenAid",
    sold: 4567,
    shipping: "Free shipping",
    discount: 16,
  },
  {
    id: 19,
    title: "Patagonia Better Sweater Fleece Jacket",
    price: 119.99,
    originalPrice: 149.99,
    description: "Classic fleece jacket made from recycled polyester",
    fullDescription:
      "Warm and comfortable fleece jacket made from 100% recycled polyester. Perfect for layering and outdoor activities. Fair Trade Certified sewn.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Outerwear",
    stock: 45,
    rating: 4.6,
    reviewCount: 678,
    buyNowLink: "https://patagonia.com",
    inStock: true,
    featured: false,
    brand: "Patagonia",
    sold: 1789,
    shipping: "$7.99 shipping",
    discount: 20,
  },
  {
    id: 20,
    title: "Roomba i7+ Robot Vacuum",
    price: 599.99,
    originalPrice: 799.99,
    description: "Smart robot vacuum with automatic dirt disposal",
    fullDescription:
      "Advanced robot vacuum that learns your home's layout, empties itself for up to 60 days, and can be controlled via smartphone app.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Appliances",
    stock: 15,
    rating: 4.4,
    reviewCount: 1567,
    buyNowLink: "https://irobot.com",
    inStock: true,
    featured: true,
    brand: "iRobot",
    sold: 2345,
    shipping: "Free shipping",
    discount: 25,
  },
  {
    id: 21,
    title: "Dell XPS 13 Laptop",
    price: 999.99,
    originalPrice: 1199.99,
    description: "Ultra-thin laptop with 13.4-inch InfinityEdge display",
    fullDescription:
      "Premium ultrabook with Intel Core i7 processor, 16GB RAM, 512GB SSD, and stunning 13.4-inch display. Perfect for professionals and students.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Laptops",
    stock: 19,
    rating: 4.6,
    reviewCount: 456,
    buyNowLink: "https://dell.com",
    inStock: true,
    featured: true,
    brand: "Dell",
    sold: 1234,
    shipping: "Free shipping",
    discount: 17,
  },
  {
    id: 22,
    title: "Yeti Rambler 20oz Tumbler",
    price: 34.99,
    originalPrice: 39.99,
    description: "Insulated stainless steel tumbler with MagSlider lid",
    fullDescription:
      "Double-wall vacuum insulated tumbler keeps drinks hot or cold for hours. Dishwasher safe and built to last with 18/8 stainless steel construction.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Kitchen",
    stock: 234,
    rating: 4.7,
    reviewCount: 3456,
    buyNowLink: "https://yeti.com",
    inStock: true,
    featured: false,
    brand: "Yeti",
    sold: 12345,
    shipping: "$4.99 shipping",
    discount: 13,
  },
  {
    id: 23,
    title: "Bose QuietComfort Earbuds",
    price: 279.99,
    originalPrice: 329.99,
    description: "Noise cancelling true wireless earbuds",
    fullDescription:
      "World-class noise cancellation in a true wireless design. Comfortable, secure fit with up to 6 hours of battery life plus 12 hours with charging case.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Audio",
    stock: 45,
    rating: 4.5,
    reviewCount: 789,
    buyNowLink: "https://bose.com",
    inStock: true,
    featured: true,
    brand: "Bose",
    sold: 2345,
    shipping: "Free shipping",
    discount: 15,
  },
  {
    id: 24,
    title: "Allbirds Tree Runners",
    price: 98,
    originalPrice: 98,
    description: "Sustainable running shoes made from eucalyptus tree fiber",
    fullDescription:
      "Comfortable and sustainable running shoes made from eucalyptus tree fiber. Naturally moisture-wicking, odor-resistant, and machine washable.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Shoes",
    stock: 67,
    rating: 4.3,
    reviewCount: 1234,
    buyNowLink: "https://allbirds.com",
    inStock: true,
    featured: false,
    brand: "Allbirds",
    sold: 3456,
    shipping: "Free shipping",
    discount: 0,
  },
  {
    id: 25,
    title: "Hydro Flask Water Bottle 32oz",
    price: 44.95,
    originalPrice: 49.95,
    description: "Insulated stainless steel water bottle",
    fullDescription:
      "TempShield double-wall vacuum insulation keeps beverages cold up to 24 hours and hot up to 12 hours. BPA-free and made from 18/8 pro-grade stainless steel.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Sports & Entertainment",
    subcategory: "Outdoor",
    stock: 156,
    rating: 4.6,
    reviewCount: 2345,
    buyNowLink: "https://hydroflask.com",
    inStock: true,
    featured: false,
    brand: "Hydro Flask",
    sold: 5678,
    shipping: "$5.99 shipping",
    discount: 10,
  },
  {
    id: 26,
    title: "Kindle Paperwhite E-reader",
    price: 139.99,
    originalPrice: 159.99,
    description: "Waterproof e-reader with 6.8-inch display and adjustable warm light",
    fullDescription:
      "Read comfortably with adjustable warm light, waterproof design (IPX8), and weeks of battery life. Access millions of books with Kindle Unlimited.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Electronics",
    subcategory: "E-readers",
    stock: 89,
    rating: 4.7,
    reviewCount: 4567,
    buyNowLink: "https://amazon.com",
    inStock: true,
    featured: true,
    brand: "Amazon",
    sold: 8901,
    shipping: "Free shipping",
    discount: 13,
  },
  {
    id: 27,
    title: "Lululemon Align High-Rise Pant",
    price: 128,
    originalPrice: 128,
    description: "Buttery-soft yoga pants with four-way stretch",
    fullDescription:
      "Ultra-soft Nulu fabric feels weightless and moves with you. High-rise design with no-dig waistband for ultimate comfort during yoga and everyday wear.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Activewear",
    stock: 78,
    rating: 4.8,
    reviewCount: 1567,
    buyNowLink: "https://lululemon.com",
    inStock: true,
    featured: true,
    brand: "Lululemon",
    sold: 3456,
    shipping: "Free shipping",
    discount: 0,
  },
  {
    id: 28,
    title: "Ninja Foodi Personal Blender",
    price: 79.99,
    originalPrice: 99.99,
    description: "Personal blender with Auto-iQ technology",
    fullDescription:
      "Powerful personal blender with Auto-iQ programs for smoothies and extractions. Includes two 24oz cups with spout lids for on-the-go convenience.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Kitchen",
    stock: 123,
    rating: 4.4,
    reviewCount: 2345,
    buyNowLink: "https://ninjakitchen.com",
    inStock: true,
    featured: false,
    brand: "Ninja",
    sold: 4567,
    shipping: "Free shipping",
    discount: 20,
  },
  {
    id: 29,
    title: "Ray-Ban Aviator Classic Sunglasses",
    price: 154,
    originalPrice: 154,
    description: "Iconic aviator sunglasses with crystal lenses",
    fullDescription:
      "The original pilot sunglasses with teardrop-shaped lenses and thin metal frames. 100% UV protection with crystal lenses for optimal clarity.",
    images: ["/mobile.jpg?height=500&width=500", "/mobile.jpg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Accessories",
    stock: 67,
    rating: 4.6,
    reviewCount: 1234,
    buyNowLink: "https://ray-ban.com",
    inStock: true,
    featured: false,
    brand: "Ray-Ban",
    sold: 2345,
    shipping: "$6.99 shipping",
    discount: 0,
  },
  {
    id: 30,
    title: "Philips Sonicare Electric Toothbrush",
    price: 199.99,
    originalPrice: 249.99,
    description: "Smart electric toothbrush with app connectivity",
    fullDescription:
      "Advanced sonic technology removes up to 10x more plaque. Smart sensor technology and app connectivity help improve your brushing technique.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Beauty & Health",
    subcategory: "Personal Care",
    stock: 45,
    rating: 4.5,
    reviewCount: 789,
    buyNowLink: "https://philips.com",
    inStock: true,
    featured: true,
    brand: "Philips",
    sold: 1567,
    shipping: "Free shipping",
    discount: 20,
  },
  {
    id: 31,
    title: "Carhartt Insulated Work Gloves",
    price: 24.99,
    originalPrice: 29.99,
    description: "Waterproof insulated work gloves with grip palm",
    fullDescription:
      "Durable work gloves with waterproof insert, 40g 3M Thinsulate insulation, and synthetic leather grip palm. Perfect for cold weather work.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Accessories",
    stock: 234,
    rating: 4.7,
    reviewCount: 567,
    buyNowLink: "https://carhartt.com",
    inStock: true,
    featured: false,
    brand: "Carhartt",
    sold: 1234,
    shipping: "$4.99 shipping",
    discount: 17,
  },
  {
    id: 32,
    title: "Vitamix A3500 Blender",
    price: 549.99,
    originalPrice: 599.99,
    description: "Professional-grade blender with smart technology",
    fullDescription:
      "High-performance blender with built-in wireless connectivity, self-detect containers, and variable speed control. Perfect for smoothies, soups, and more.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Kitchen",
    stock: 12,
    rating: 4.8,
    reviewCount: 345,
    buyNowLink: "https://vitamix.com",
    inStock: true,
    featured: true,
    brand: "Vitamix",
    sold: 789,
    shipping: "Free shipping",
    discount: 8,
  },
  {
    id: 33,
    title: "Champion Powerblend Fleece Hoodie",
    price: 39.99,
    originalPrice: 49.99,
    description: "Classic pullover hoodie with kangaroo pocket",
    fullDescription:
      "Comfortable fleece hoodie made from cotton/polyester blend. Features drawstring hood, kangaroo pocket, and ribbed cuffs and hem.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Clothing",
    stock: 156,
    rating: 4.3,
    reviewCount: 1234,
    buyNowLink: "https://champion.com",
    inStock: true,
    featured: false,
    brand: "Champion",
    sold: 3456,
    shipping: "$5.99 shipping",
    discount: 20,
  },
  {
    id: 34,
    title: "Anker PowerCore 10000 Portable Charger",
    price: 29.99,
    originalPrice: 39.99,
    description: "Ultra-compact portable charger with PowerIQ technology",
    fullDescription:
      "High-speed charging portable battery with PowerIQ and VoltageBoost technology. Compact size with 10000mAh capacity charges most phones 2-3 times.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Accessories",
    stock: 234,
    rating: 4.6,
    reviewCount: 5678,
    buyNowLink: "https://anker.com",
    inStock: true,
    featured: true,
    brand: "Anker",
    sold: 12345,
    shipping: "Free shipping",
    discount: 25,
  },
  {
    id: 35,
    title: "Osprey Daylite Plus Backpack",
    price: 65,
    originalPrice: 75,
    description: "Versatile daypack with laptop sleeve and organization",
    fullDescription:
      "Durable daypack with padded laptop sleeve, front panel organization, and comfortable shoulder straps. Perfect for work, school, or hiking.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Sports & Entertainment",
    subcategory: "Outdoor",
    stock: 89,
    rating: 4.5,
    reviewCount: 789,
    buyNowLink: "https://osprey.com",
    inStock: true,
    featured: false,
    brand: "Osprey",
    sold: 1567,
    shipping: "$6.99 shipping",
    discount: 13,
  },
  {
    id: 36,
    title: "Lodge Cast Iron Skillet 12-inch",
    price: 34.99,
    originalPrice: 39.99,
    description: "Pre-seasoned cast iron skillet for versatile cooking",
    fullDescription:
      "Versatile cast iron skillet that's perfect for searing, sautéing, baking, and frying. Pre-seasoned and ready to use with superior heat retention.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Kitchen",
    stock: 123,
    rating: 4.7,
    reviewCount: 2345,
    buyNowLink: "https://lodgecastiron.com",
    inStock: true,
    featured: false,
    brand: "Lodge",
    sold: 4567,
    shipping: "$7.99 shipping",
    discount: 13,
  },
  {
    id: 37,
    title: "Beats Studio3 Wireless Headphones",
    price: 199.99,
    originalPrice: 349.99,
    description: "Over-ear headphones with Pure ANC and Apple W1 chip",
    fullDescription:
      "Premium over-ear headphones with Pure Adaptive Noise Canceling, Apple W1 chip for seamless connectivity, and up to 40 hours of battery life.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Audio",
    stock: 34,
    rating: 4.4,
    reviewCount: 1234,
    buyNowLink: "https://beats.com",
    inStock: true,
    featured: true,
    brand: "Beats",
    sold: 2345,
    shipping: "Free shipping",
    discount: 43,
  },
  {
    id: 38,
    title: "Patagonia Houdini Jacket",
    price: 119,
    originalPrice: 119,
    description: "Ultra-lightweight windbreaker for outdoor activities",
    fullDescription:
      "Featherweight windbreaker that packs into its own pocket. Made from 100% recycled nylon with DWR finish for light weather protection.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Outerwear",
    stock: 45,
    rating: 4.6,
    reviewCount: 456,
    buyNowLink: "https://patagonia.com",
    inStock: true,
    featured: false,
    brand: "Patagonia",
    sold: 789,
    shipping: "$8.99 shipping",
    discount: 0,
  },
  {
    id: 39,
    title: "Tile Mate Bluetooth Tracker",
    price: 24.99,
    originalPrice: 29.99,
    description: "Bluetooth tracker to find your things",
    fullDescription:
      "Small Bluetooth tracker that helps you find your keys, wallet, or anything else. 200 ft range with replaceable battery lasting up to 1 year.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Electronics",
    subcategory: "Accessories",
    stock: 234,
    rating: 4.2,
    reviewCount: 1567,
    buyNowLink: "https://tile.com",
    inStock: true,
    featured: false,
    brand: "Tile",
    sold: 3456,
    shipping: "$4.99 shipping",
    discount: 17,
  },
  {
    id: 40,
    title: "Smartwool Merino Wool Socks",
    price: 21.95,
    originalPrice: 24.95,
    description: "Cushioned crew socks made from merino wool",
    fullDescription:
      "Comfortable merino wool socks with medium cushioning, moisture-wicking properties, and natural odor resistance. Perfect for hiking or everyday wear.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Accessories",
    stock: 345,
    rating: 4.5,
    reviewCount: 789,
    buyNowLink: "https://smartwool.com",
    inStock: true,
    featured: false,
    brand: "Smartwool",
    sold: 1234,
    shipping: "$5.99 shipping",
    discount: 12,
  },
  {
    id: 41,
    title: "Nespresso VertuoPlus Coffee Maker",
    price: 179.99,
    originalPrice: 199.99,
    description: "Single-serve coffee and espresso maker with Centrifusion technology",
    fullDescription:
      "Revolutionary coffee maker that brews both coffee and espresso with Centrifusion technology. Includes Aeroccino milk frother for café-quality drinks.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Home & Garden",
    subcategory: "Kitchen",
    stock: 56,
    rating: 4.6,
    reviewCount: 1234,
    buyNowLink: "https://nespresso.com",
    inStock: true,
    featured: true,
    brand: "Nespresso",
    sold: 2345,
    shipping: "Free shipping",
    discount: 10,
  },
  {
    id: 42,
    title: "Under Armour HeatGear T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    description: "Moisture-wicking athletic t-shirt with anti-odor technology",
    fullDescription:
      "Lightweight athletic shirt with HeatGear fabric that wicks sweat and dries fast. Anti-odor technology prevents the growth of odor-causing microbes.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Fashion",
    subcategory: "Activewear",
    stock: 234,
    rating: 4.4,
    reviewCount: 1567,
    buyNowLink: "https://underarmour.com",
    inStock: true,
    featured: false,
    brand: "Under Armour",
    sold: 3456,
    shipping: "$5.99 shipping",
    discount: 17,
  },
  {
    id: 43,
    title: "Logitech MX Master 3 Wireless Mouse",
    price: 99.99,
    originalPrice: 119.99,
    description: "Advanced wireless mouse for productivity and precision",
    fullDescription:
      "Premium wireless mouse with MagSpeed electromagnetic scrolling, customizable buttons, and multi-device connectivity. Works on any surface including glass.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Computer & Office",
    subcategory: "Accessories",
    stock: 78,
    rating: 4.7,
    reviewCount: 2345,
    buyNowLink: "https://logitech.com",
    inStock: true,
    featured: true,
    brand: "Logitech",
    sold: 4567,
    shipping: "Free shipping",
    discount: 17,
  },
  {
    id: 44,
    title: "Crayola 64-Count Crayon Box",
    price: 4.99,
    originalPrice: 6.99,
    description: "Classic crayons with built-in sharpener",
    fullDescription:
      "The classic 64-count crayon box with built-in sharpener. Features a wide variety of colors for creative expression and artistic projects.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Toys & Hobbies",
    subcategory: "Art Supplies",
    stock: 456,
    rating: 4.8,
    reviewCount: 3456,
    buyNowLink: "https://crayola.com",
    inStock: true,
    featured: false,
    brand: "Crayola",
    sold: 12345,
    shipping: "$3.99 shipping",
    discount: 29,
  },
  {
    id: 45,
    title: "LEGO Creator 3-in-1 Deep Sea Creatures",
    price: 79.99,
    originalPrice: 89.99,
    description: "Build a shark, squid, or angler fish with this 3-in-1 set",
    fullDescription:
      "Creative building set that transforms into three different sea creatures. Includes 230 pieces and detailed instructions for hours of building fun.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Toys & Hobbies",
    subcategory: "Building Sets",
    stock: 67,
    rating: 4.6,
    reviewCount: 789,
    buyNowLink: "https://lego.com",
    inStock: true,
    featured: true,
    brand: "LEGO",
    sold: 1567,
    shipping: "Free shipping",
    discount: 11,
  },
  {
    id: 46,
    title: "Tesla Model Y Floor Mats",
    price: 149.99,
    originalPrice: 179.99,
    description: "All-weather floor mats designed for Tesla Model Y",
    fullDescription:
      "Custom-fit all-weather floor mats designed specifically for Tesla Model Y. Made from durable TPE material with raised edges for maximum protection.",
    images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
    category: "Automobiles & Motorcycles",
    subcategory: "Accessories",
    stock: 23,
    rating: 4.5,
    reviewCount: 234,
    buyNowLink: "https://tesla.com",
    inStock: true,
    featured: false,
    brand: "Tesla",
    sold: 456,
    shipping: "Free shipping",
    discount: 17,
  },
]

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Entertainment",
  "Automobiles & Motorcycles",
  "Beauty & Health",
  "Toys & Hobbies",
  "Computer & Office",
  "Consumer Electronics",
]

const brands = ["All", "Apple", "Samsung", "Nike", "Adidas", "Sony", "Generic", "Xiaomi", "Huawei"]

const bannerSlides = [
  {
    id: 1,
    title: "Super Sale",
    subtitle: "Up to 70% Off",
    description: "Limited time offer on electronics",
    image: "/placeholder.svg?height=300&width=800",
    bgColor: "bg-gradient-to-r from-red-500 to-orange-500",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Latest Products",
    description: "Discover trending items",
    image: "/placeholder.svg?height=300&width=800",
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "Worldwide Delivery",
    description: "On orders over $50",
    image: "/placeholder.svg?height=300&width=800",
    bgColor: "bg-gradient-to-r from-green-500 to-teal-500",
  },
]

export default function AliExpressApp() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [showWishlistNotification, setShowWishlistNotification] = useState<false | "added" | "removed">(false)
  const [selectedWishlistItems, setSelectedWishlistItems] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    const isAdding = !wishlist.includes(productId)
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))

    // Show notification
    setShowWishlistNotification(isAdding ? "added" : "removed")
    setTimeout(() => setShowWishlistNotification(false), 2000)
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
    setSelectedWishlistItems((prev) => prev.filter((id) => id !== productId))
    setShowWishlistNotification("removed")
    setTimeout(() => setShowWishlistNotification(false), 2000)
  }

  const toggleSelectWishlistItem = (productId: number) => {
    setSelectedWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const selectAllWishlistItems = () => {
    setSelectedWishlistItems(wishlist.length === selectedWishlistItems.length ? [] : [...wishlist])
  }

  const removeSelectedItems = () => {
    setWishlist((prev) => prev.filter((id) => !selectedWishlistItems.includes(id)))
    setSelectedWishlistItems([])
    setShowWishlistNotification("removed")
    setTimeout(() => setShowWishlistNotification(false), 2000)
  }

  // Auto-rotate banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Filter products
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesStock = !showInStockOnly || product.inStock

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock
  })

  // Get wishlist products
  const wishlistProducts = productsData.filter((product) => wishlist.includes(product.id))

  const navigateToProduct = (productId: number) => {
    setSelectedProductId(productId)
    setCurrentPage("product")
    setSelectedImageIndex(0)
  }

  const navigateToHome = () => {
    setCurrentPage("home")
    setSelectedProductId(null)
  }

  const navigateToWishlist = () => {
    setCurrentPage("wishlist")
  }

  // AliExpress-style Header
  const Header = () => (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-100 text-xs">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Globe className="h-3 w-3" />
                <span>Ship to</span>
                <ChevronDown className="h-3 w-3" />
              </div>
              <span>Language</span>
              <span>Currency: USD</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>Buyer Protection</span>
              <span>Help</span>
              <span>Customer Service</span>
              <span>Disputes & Reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={navigateToHome}
            className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
          >
            KallyanShop
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-3xl mx-8 hidden md:block">
            <div className="relative">
              <div className="flex">
                <Select defaultValue="All Categories">
                  <SelectTrigger className="w-40 rounded-r-none border-r-0 bg-gray-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="phone case"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 rounded-none border-l-0 border-r-0 focus:z-10"
                />
                <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600 px-8">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center space-x-1"
              onClick={navigateToWishlist}
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist ({wishlist.length})</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <span className="hidden md:inline"></span>
            </Button>
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-2"
            />
            <Button size="sm" className="absolute right-1 top-1 bg-orange-500 hover:bg-orange-600">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 border-t pt-3">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" onClick={navigateToWishlist}>
                <Heart className="h-4 w-4 mr-2" />
                Wishlist ({wishlist.length})
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Category navigation */}
      <div className="border-t bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-2 text-sm overflow-x-auto">
            {categories.slice(1, 8).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap hover:text-orange-500 transition-colors ${
                  selectedCategory === category ? "text-orange-500 font-medium" : "text-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )

  // Wishlist Page Component
  const WishlistPage = () => (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={navigateToHome} className="hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
          <Badge variant="secondary" className="text-sm">
            {wishlist.length} items
          </Badge>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={selectAllWishlistItems} className="text-sm">
              {selectedWishlistItems.length === wishlist.length ? "Deselect All" : "Select All"}
            </Button>
            {selectedWishlistItems.length > 0 && (
              <Button variant="destructive" size="sm" onClick={removeSelectedItems} className="text-sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Remove Selected ({selectedWishlistItems.length})
              </Button>
            )}
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love by clicking the heart icon</p>
            <Button onClick={navigateToHome} className="bg-orange-500 hover:bg-orange-600">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 border-gray-200">
              <div className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <Checkbox
                    checked={selectedWishlistItems.includes(product.id)}
                    onCheckedChange={() => toggleSelectWishlistItem(product.id)}
                    className="bg-white border-2"
                  />
                </div>

                {product.discount && (
                  <Badge className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs px-1 py-0.5">
                    -{product.discount}%
                  </Badge>
                )}

                <div className="cursor-pointer" onClick={() => navigateToProduct(product.id)}>
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <div className="absolute top-2 right-10">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3
                  className="text-sm font-normal mb-2 line-clamp-2 text-gray-800 hover:text-orange-600 transition-colors cursor-pointer"
                  onClick={() => navigateToProduct(product.id)}
                >
                  {product.title}
                </h3>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-red-500">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  <div>{product.shipping}</div>
                  <div className="flex items-center justify-between">
                    <span>{product.sold} sold</span>
                    {product.inStock ? (
                      <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 border-red-600 text-xs">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs py-1.5"
                    disabled={!product.inStock}
                    onClick={() => window.open(product.buyNowLink, "_blank")}
                  >
                    {product.inStock ? "Buy Now" : "Out of Stock"}
                  </Button>
                  <Button size="sm" variant="outline" className="px-3">
                    <ShoppingCart className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {wishlist.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Wishlist Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Total items: {wishlist.length}</div>
            <div>Total value: ${wishlistProducts.reduce((sum, product) => sum + product.price, 0).toFixed(2)}</div>
            <div>
              You could save: $
              {wishlistProducts.reduce((sum, product) => sum + (product.originalPrice - product.price), 0).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // AliExpress-style Banner
  const Banner = () => (
    <div className="relative h-64 md:h-80 overflow-hidden mb-6">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          } ${slide.bgColor}`}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-lg">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">{slide.subtitle}</h3>
              <p className="text-lg mb-6">{slide.description}</p>
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 font-semibold">Shop Now</Button>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )

  // AliExpress-style Filter Panel
  const FilterPanel = () => (
    <div className="bg-white rounded-lg border">
      <div className={`p-4 ${isFilterOpen ? "block" : "hidden"} md:block`}>
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h3 className="font-semibold">Filters</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-sm text-gray-700">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer text-sm">
                <Checkbox
                  checked={selectedCategory === category}
                  onCheckedChange={() => setSelectedCategory(category)}
                />
                <span className="text-gray-600 hover:text-gray-900">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-sm text-gray-700">Price Range</h4>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={2000} min={0} step={10} className="mb-4" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-sm text-gray-700">Brand</h4>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer text-sm">
                <Checkbox checked={selectedBrand === brand} onCheckedChange={() => setSelectedBrand(brand)} />
                <span className="text-gray-600 hover:text-gray-900">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Shipping */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-sm text-gray-700">Shipping</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer text-sm">
              <Checkbox />
              <span className="text-gray-600">Free shipping</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer text-sm">
              <Checkbox
                checked={showInStockOnly}
                onCheckedChange={(checked) => setShowInStockOnly(checked === true)}
              />
              <span className="text-gray-600">In stock only</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  // AliExpress-style Product Card
  type Product = typeof productsData[number];

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200">
      <div className="relative overflow-hidden" onClick={() => navigateToProduct(product.id)}>
        {product.discount && (
          <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-1 py-0.5">
            -{product.discount}%
          </Badge>
        )}

        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product.id)
            }}
          >
            <Heart
              className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </Button>
        </div>
      </div>

      <CardContent className="p-3">
        <h3 className="text-sm font-normal mb-2 line-clamp-2 text-gray-800 group-hover:text-orange-600 transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>

        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-red-500">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-2">
          <div>{product.shipping}</div>
          <div>{product.sold} sold</div>
        </div>

        <Button
          size="sm"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-1.5"
          disabled={!product.inStock}
          onClick={(e) => {
            e.stopPropagation()
            window.open(product.buyNowLink, "_blank")
          }}
        >
          {product.inStock ? "Buy Now" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  )

  // Product List Component
  const ProductList = () => (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-800">{filteredProducts.length} results</h2>
          <Button variant="outline" size="sm" className="md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )

  // Product Page (keeping similar structure but with AliExpress styling)
  // const ProductPage = () => {
  //   const product = productsData.find((p) => p.id === selectedProductId)
  //   if (!product) return <div>Product not found</div>

  //   return (
  //     <div className="container mx-auto px-4 py-6">
  //       <Button variant="ghost" onClick={navigateToHome} className="mb-4 hover:bg-gray-100">
  //         <ArrowLeft className="h-4 w-4 mr-2" />
  //         Back
  //       </Button>

  //       <div className="grid lg:grid-cols-2 gap-8 mb-8">
  //         <div>
  //           <div className="mb-4">
  //             <img
  //               src={product.images[selectedImageIndex] || "/placeholder.svg"}
  //               alt={product.title}
  //               className="w-full h-96 object-cover rounded-lg border"
  //             />
  //           </div>
  //           {product.images.length > 1 && (
  //             <div className="flex space-x-2">
  //               {product.images.map((image, index) => (
  //                 <button
  //                   key={index}
  //                   onClick={() => setSelectedImageIndex(index)}
  //                   className={`w-16 h-16 rounded border-2 overflow-hidden ${
  //                     selectedImageIndex === index ? "border-orange-500" : "border-gray-200"
  //                   }`}
  //                 >
  //                   <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
  //                 </button>
  //               ))}
  //             </div>
  //           )}
  //         </div>

  //         <div>
  //           <h1 className="text-2xl font-normal mb-4 text-gray-800">{product.title}</h1>

  //           <div className="flex items-center mb-4">
  //             <div className="flex items-center">
  //               {[...Array(5)].map((_, i) => (
  //                 <Star
  //                   key={i}
  //                   className={`h-4 w-4 ${
  //                     i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
  //                   }`}
  //                 />
  //               ))}
  //             </div>
  //             <span className="ml-2 text-sm text-gray-600">
  //               {product.rating} ({product.reviewCount} reviews) | {product.sold} sold
  //             </span>
  //           </div>

  //           <div className="mb-6">
  //             <div className="flex items-center space-x-4 mb-2">
  //               <span className="text-3xl font-bold text-red-500">${product.price}</span>
  //               {product.originalPrice > product.price && (
  //                 <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
  //               )}
  //               {product.discount && <Badge className="bg-red-100 text-red-600">-{product.discount}%</Badge>}
  //             </div>
  //             <div className="text-sm text-gray-600">{product.shipping}</div>
  //           </div>

  //           <div className="mb-6">
  //             <p className="text-gray-700">{product.fullDescription}</p>
  //           </div>

  //           <div className="flex space-x-4 mb-6">
  //             <Button
  //               className="flex-1 bg-orange-500 hover:bg-orange-600 py-3"
  //               disabled={!product.inStock}
  //               onClick={() => window.open(product.buyNowLink, "_blank")}
  //             >
  //               {product.inStock ? "Buy Now" : "Out of Stock"}
  //             </Button>
  //             <Button variant="outline" className="px-6">
  //               Add to Cart
  //             </Button>
  //             <Button
  //               variant="outline"
  //               size="lg"
  //               onClick={() => toggleWishlist(product.id)}
  //               className={wishlist.includes(product.id) ? "border-red-500 text-red-500" : ""}
  //             >
  //               <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // AliExpress-style Footer
  const Footer = () => (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-3">Customer Service</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Disputes & Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Buyer Protection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Report IPR infringement
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Shopping with us</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Making payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Delivery options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Buyer guarantee
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Collaborate with us</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Affiliate program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  DS Center
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Pay with</h4>
            <div className="flex flex-wrap gap-2">
              <div className="bg-white border rounded px-2 py-1 text-xs">Visa</div>
              <div className="bg-white border rounded px-2 py-1 text-xs">Mastercard</div>
              <div className="bg-white border rounded px-2 py-1 text-xs">PayPal</div>
            </div>
          </div>
        </div>
        <div className="border-t mt-6 pt-6 text-center text-xs text-gray-500">
          <p>© 2024 AliExpress Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {currentPage === "home" ? (
        <>
          <Banner />
          <main className="container mx-auto px-4 pb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/5">
                <FilterPanel />
              </div>
              <div className="lg:w-4/5">
                <ProductList />
              </div>
            </div>
          </main>
        </>
      ) : currentPage === "wishlist" ? (
        <WishlistPage />
      ) : (
        <ProductDetailsPage productsData={productsData}
    selectedProductId={selectedProductId}
    selectedImageIndex={selectedImageIndex}
    setSelectedImageIndex={setSelectedImageIndex}
    navigateToHome={navigateToHome}
    toggleWishlist={toggleWishlist}
    wishlist={wishlist} />
      )}

      {showWishlistNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all">
          {showWishlistNotification === "added" ? "Added to wishlist!" : "Removed from wishlist!"}
        </div>
      )}

      <Footer />
    </div>
  )
}

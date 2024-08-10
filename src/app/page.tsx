"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Navbar from "@/components/navbar";
// import { Icons } from "@/components/icons"
// Define TypeScript types in the same file
import heroImage from '/public/apple airpods max, png.png'
import product from '/public/products.json'
import Link from "next/link";
interface KnowledgePanel {
  description: {
    text: string;
    url: string;
  };
  image: {
    url: string;
    width: number;
    height: number;
    page_url: string;
  };
  info: Array<{
    label: string;
    name: string;
  }>;
  label: string;
  name: string;
}

interface Result {
  position: number;
  url: string;
  title: string;
  description: string;
}

interface RelatedKeywords {
  keywords: Array<{
    keyword: string;
  }>;
}

interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  storage: Array< string | string | string >;
  colors: Array< string | string >;
  images: Image[];
}

interface ApiResponse {
  search_term: string;
  knowledge_panel: KnowledgePanel;
  results: Result[];
  related_keywords: RelatedKeywords;
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://google-search74.p.rapidapi.com/',
      params: {
        query: search,
        limit: '10',
        related_keywords: 'true'
      },
      headers: {
        'x-rapidapi-key': 'c3ec9fb0f9msh792b94e0f413f7ap164d83jsna12945eb17dc',
        'x-rapidapi-host': 'google-search74.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request<ApiResponse>(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setData(null); // Clear data on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="text-center w-full px-3 mx-auto flex flex-col gap-10">
      <Navbar/>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 max-w-[700px] m-0 mx-auto">
      {product.map((data) => (
         <Card className="text-left px-3 py-4" key={data.id}>
          <CardHeader>
            {data.images.map((image, index) => (
              <div className="w-full h-30 flex items-center justify-center bg-primary-foreground rounded-sm" key={index}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  layout="responsive"
                />
              </div>
            ))}
            <CardTitle className="text-lg capitalize" >{data.name}</CardTitle>
            {/* <CardDescription>{data.description}</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="flex flex-row items-center capitalize justify-between w-full">
              <ul className="">
                {data.colors[0]}
              </ul>
                <Button>Buy</Button>
          </CardFooter>
        </Card>
      ))}
      </div>
    </main>
  );
}

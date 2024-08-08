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

// Define TypeScript types in the same file
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
      <h1 className="text-2xl p-2">Google Search API</h1>
      <div className="flex items-center justify-center gap-2 max-w-[500px] mx-auto">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="placeholder:capitalize"
          placeholder="What would you like to search for?"
        />
        <Button
          variant={"default"}
          size={"sm"}
          className="capitalize"
          onClick={fetchData}
        >
          Search
        </Button>
      </div>
        <div className="w-full flex flex-col">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {data && data.results.map((result) => (
                <Card key={result.position} className="flex flex-col px-4 py-4 text-left gap-3">
                  <CardHeader className="text-left">
                    <CardTitle>{result.title}</CardTitle>
                    <CardDescription>{result.description}</CardDescription>
                    {data.knowledge_panel?.image && (
                      <Image
                        src={data.knowledge_panel.image.url}
                        alt="Knowledge Panel Image"
                        width={data.knowledge_panel.image.width}
                        height={data.knowledge_panel.image.height}
                        layout="fixed"
                      />
                    )}
                  </CardHeader>
                  <CardContent>
                    <p>{data.knowledge_panel?.description.text || 'No description available'}</p>
                  </CardContent>
                  <CardFooter>
                    <a href={data.knowledge_panel?.description.url || '#'}>{data.knowledge_panel?.description.url || 'No description available'}</a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
    </main>
  );
}

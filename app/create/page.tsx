'use client'

import Tiptap from "@/components/TipTap";
import TopBar from "@/components/TopBar";

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { uiStateAtom } from '@/components/editor/atoms';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const setUiState = useSetAtom(uiStateAtom);

  useEffect(() => {
    setUiState(prevState => ({ ...prevState, isInserting: true }));
    return () => {
      setUiState(prevState => ({ ...prevState, isInserting: false }));
    };
  }, [setUiState]);
  return (
    <main className="max-w-3xl mx-auto p-4">
      <TopBar />
      <Tiptap />
    </main>
  );
}

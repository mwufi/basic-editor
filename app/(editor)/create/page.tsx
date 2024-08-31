'use client'

import Tiptap from "@/components/TipTap";
import TopBar from "@/components/TopBar";

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { resetNoteAtom, uiStateAtom } from '@/components/editor/atoms';

export default function Home() {
  const setUiState = useSetAtom(uiStateAtom);
  const resetNote = useSetAtom(resetNoteAtom);

  useEffect(() => {
    resetNote();
  }, []);

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

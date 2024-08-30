'use client'

import Tiptap from "@/components/TipTap";
import TopBar from "@/components/TopBar";

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { uiStateAtom } from '@/components/editor/atoms';

export default function Home() {
  const setUiState = useSetAtom(uiStateAtom);

  useEffect(() => {
    setUiState(prevState => ({ ...prevState, isInserting: true }));
    return () => {
      setUiState(prevState => ({ ...prevState, isInserting: false }));
    };
  }, [setUiState]);
  return (
    <>
      {/* <CommandPalette /> */}
      <TopBar />
      <Tiptap wordcount={true} />
    </>
  );
}

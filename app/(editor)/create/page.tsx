'use client'

import Tiptap from "@/components/TipTap";

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { resetNoteAtom, uiStateAtom } from '@/components/editor/atoms';

/*
The purpose of this page is to reset the note and tell the other UI elements that
we are writing. 
*/
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
    <Tiptap />
  );
}

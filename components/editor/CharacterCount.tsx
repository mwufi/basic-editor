import { useState, useEffect } from "react";
import CharacterCountMarker from "../CharacterCountMarker";
import { useEditor } from "./EditorContext";

export default function EditorCharacterCount(props: { limit: number, display: 'characters' | 'words' | 'both' }) {
    const { editor } = useEditor();

    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
        if (editor) {
            const updateCharacterCount = () => {
                setCharacterCount(editor.storage.characterCount.words());
            };
            editor.on('update', updateCharacterCount);
            updateCharacterCount();
            return () => {
                editor.off('update', updateCharacterCount);
            };
        }
    }, [editor]);

    return (
        <CharacterCountMarker
            current={characterCount}
            limit={props.limit}
            display={props.display}
        />
    )
}
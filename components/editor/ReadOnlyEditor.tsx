import Editor from './Editor'

const ReadOnlyEditor = ({ initialContent, font = 'serif' }) => {
    return (
        <Editor initialContent={initialContent} font={font} editable={false} />
    )
}

export default ReadOnlyEditor

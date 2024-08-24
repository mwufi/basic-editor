import Editor from './Editor'

const ReadOnlyEditor = ({ content, font = 'serif' }) => {
    return (
        <Editor content={content} font={font} editable={false} />
    )
}

export default ReadOnlyEditor

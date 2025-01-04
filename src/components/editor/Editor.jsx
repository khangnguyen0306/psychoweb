import { useCallback, useState } from 'react';
import RichTextEditor, {
    Attachment,
    BaseKit,
    Blockquote,
    Bold,
    BulletList,
    Clear,
    Code,
    CodeBlock,
    Color,
    ColumnActionButton,
    Emoji,
    Excalidraw,
    ExportPdf,
    ExportWord,
    FontFamily,
    FontSize,
    FormatPainter,
    Heading,
    Highlight,
    History,
    HorizontalRule,
    Iframe,
    Image,
    ImageGif,
    ImportWord,
    Indent,
    Italic,
    Katex,
    LineHeight,
    Link,
    Mention,
    Mermaid,
    MoreMark,
    OrderedList,
    SearchAndReplace,
    SlashCommand,
    Strike,
    Table,
    TableOfContents,
    TaskList,
    TextAlign,
    TextDirection,
    Twitter,
    Underline,
    Video,
} from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';
import 'katex/dist/katex.min.css';

function convertBase64ToBlob(base64) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

const extensions = [
    BaseKit.configure({
        // placeholder: {
        //     showOnlyCurrent: true,
        // },
        // characterCount: {
        //     limit: 50000,
        // },
    }),
    History,
    SearchAndReplace,
    // TableOfContents,
    FormatPainter.configure({ spacer: true }),
    Clear,
    FontFamily,
    Heading.configure({ spacer: true }),
    FontSize,
    Bold,
    Italic,
    Underline,
    Strike,
    MoreMark,
    Katex,
    Emoji,
    Color.configure({ spacer: true }),
    Highlight,
    BulletList,
    OrderedList,
    TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
    Indent,
    LineHeight,
    TaskList.configure({
        spacer: true,
        taskItem: {
            nested: true,
        },
    }),
    Link,
    Image.configure({
        upload: (files) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(URL.createObjectURL(files));
                }, 500);
            }),
    }),
    Video.configure({
        upload: (files) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(URL.createObjectURL(files));
                }, 500);
            }),
    }),
    ImageGif.configure({
        GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY,
    }),
    // Blockquote,
    SlashCommand,
    HorizontalRule,
    Code.configure({
        toolbar: false,
    }),
    // CodeBlock.configure({ defaultTheme: 'dracula' }),
    ColumnActionButton,
    Table,
    Iframe,
    ExportPdf.configure({ spacer: true }),
    ImportWord.configure({
        upload: (files) => {
            const f = files.map((file) => ({
                src: URL.createObjectURL(file),
                alt: file.name,
            }));
            return Promise.resolve(f);
        },
    }),
    ExportWord,
    Excalidraw,
    TextDirection,
    Mention,
    Attachment.configure({
        upload: (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                setTimeout(() => {
                    const blob = convertBase64ToBlob(reader.result);
                    resolve(URL.createObjectURL(blob));
                }, 300);
            });
        },
    }),
    // Mermaid.configure({
    //     upload: (file) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         return new Promise((resolve) => {
    //             setTimeout(() => {
    //                 const blob = convertBase64ToBlob(reader.result);
    //                 resolve(URL.createObjectURL(blob));
    //             }, 300);
    //         });
    //     },
    // }),
    // Twitter,
];

const DEFAULT = ''

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const Editor = () => {
    const [content, setContent] = useState(DEFAULT);
    const [theme, setTheme] = useState('light');
    const [disable, setDisable] = useState(false);

    const onValueChange = useCallback(
        debounce((value) => {
            setContent(value);
        }, 0),
        []
    );
    // const onValueChange = (value) =>{
    //     setContent(value);
    // }
     


    return (
        <div
            className="p-[24px] flex flex-col w-full max-w-screen-lg gap-[24px] mx-[auto] my-0"
            style={{
                maxWidth: 1024,
                margin: '40px auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '100px',
                    marginBottom: 10,
                }}
            >
                {/* <button type="button" onClick={() => locale.setLang('vi')}>
                    Vietnamese
                </button>
                <button type="button" onClick={() => locale.setLang('en')}>
                    English
                </button>
                <button type="button" onClick={() => locale.setLang('zh_CN')}>
                    Chinese
                </button>
                <button type="button" onClick={() => locale.setLang('pt_BR')}>
                    Português
                </button>
                <button type="button" onClick={() => locale.setLang('hu_HU')}>
                    Hungarian
                </button> */}
                <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
                <button type="button" onClick={() => setDisable(!disable)}>
                    {disable ? 'Editable' : 'Readonly'}
                </button>
            </div>

            <RichTextEditor
                output="html"
                content={content}
                onChangeContent={onValueChange}
                extensions={extensions}
                dark={theme === 'dark'}
                disabled={disable}
            />

            {/* {typeof content === 'string' && (
                <textarea
                    style={{
                        marginTop: 20,
                        height: 500,
                    }}
                    readOnly
                    value={content}
                />
            )} */}
        </div>
    );
}
export default Editor


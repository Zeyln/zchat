import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
    content: string;
};

export default function MarkdownRender({ content }: Props) {
    return (
        <div
            className="
                prose prose-invert max-w-none break-words
                prose-headings:text-white
                prose-p:text-gray-300
                prose-strong:text-white
                prose-a:text-blue-400 hover:prose-a:text-blue-300
                prose-code:text-pink-400
                prose-pre:bg-gray-900
            "
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-2xl font-bold mt-4 mb-2 text-white">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-xl font-semibold mt-3 mb-2 text-gray-100">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-lg font-semibold mt-2 mb-1 text-gray-200">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => (
                        <p className="text-gray-300 mb-2 leading-relaxed">
                            {children}
                        </p>
                    ),
                    a: ({ children, ...props }) => (
                        <a
                            {...props}
                            className="text-blue-400 underline hover:text-blue-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                    code({ inline, children }) {
                        return inline ? (
                            <code className="bg-gray-800 px-1 py-0.5 rounded text-pink-400">
                                {children}
                            </code>
                        ) : (
                            <pre className="bg-gray-800 p-4 rounded-sm overflow-x-auto border-1 border-gray-700 text-amber-100">
                                <code>{children}</code>
                            </pre>
                        );
                    },
                    ul: ({ children }) => (
                        <ul className="list-disc pl-5 text-gray-300 mb-2">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-5 text-gray-300 mb-2">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400 my-2">
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

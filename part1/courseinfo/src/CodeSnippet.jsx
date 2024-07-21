import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';

const CodeSnippet = ({ code, language }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
    };

    return (
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <CopyToClipboard text={code} onCopy={handleCopy}>
                <button
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        padding: '0.5rem 1rem',
                        backgroundColor: isCopied ? '#4caf50' : '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                >
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </CopyToClipboard>
            <SyntaxHighlighter
                language={language}
                style={{
                    pre: {
                        backgroundColor: '#2d2d2d',
                        color: '#ccc',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        overflowX: 'auto',
                    },
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeSnippet;


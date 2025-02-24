import { useState, useRef, useEffect, useMemo, ReactElement } from 'react';
import Tree from 'react-d3-tree';

interface TreeNode {
    name: string;
    children?: TreeNode[];
}

export default function HtmlDomTree(): ReactElement {
    const [html, setHtml] = useState<string>('');
    const [attribute, setAttribute] = useState<string>('data-testid');
    const [treeData, setTreeData] = useState<TreeNode | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const treeContainerRef = useRef<HTMLDivElement | null>(null);

    const parseHtmlToTree = (): void => {
        setSubmitted(true);
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const rootElement = doc.querySelector(`[${attribute}]`);

            if (!rootElement) {
                setTreeData(null);
                return;
            }

            const buildTree = (node: Element): TreeNode => ({
                name: `${node.tagName.toLowerCase()} (ID: ${node.getAttribute('data-id') || 'N/A'})`,
                children: Array.from(node.children).map(buildTree),
            });

            setTreeData(buildTree(rootElement));
        } catch (error) {
            console.error('Error parsing HTML:', error);
            setTreeData(null);
        }
    };

    useEffect(() => {
        if (treeContainerRef.current) {
            treeContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [treeData]);

    const memoizedTree = useMemo(() => {
        return treeData ? (
            <div className="p-4 mt-4 w-full" ref={treeContainerRef}>
                <div style={{ width: '100%', height: '500px' }}>
                    <Tree
                        data={treeData}
                        orientation="vertical"
                        collapsible
                        translate={{ x: 200, y: 100 }}
                        zoomable
                    />
                </div>
            </div>
        ) : null;
    }, [treeData]);

    return (
        <div className="p-6 mx-auto bg-dark rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
                Generate DOM Tree from HTML
            </h2>
            <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-80 p-3 border bg-[#1E1E1E] text-white rounded-xl focus:outline-none resize-none placeholder-gray-400"
                rows={6}
                placeholder="Paste HTML content here..."
            />

            <div className="flex items-end gap-4 mt-4">
                <div className="flex-1">
                    <label
                        htmlFor="attributeInput"
                        className="text-white block mb-1"
                    >
                        data-attribute:
                    </label>
                    <input
                        id="attributeInput"
                        type="text"
                        placeholder="Enter attribute (e.g. data-testid)"
                        value={attribute}
                        onChange={(e) => {
                            setAttribute(e.target.value);
                            setSubmitted(false);
                        }}
                        className="w-full px-4 py-2 bg-light border border-secondary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button
                    className="px-4 py-2 text-white bg-[#1FBFBF] text-[#121212] font-semibold rounded-lg shadow-md hover:bg-[#17A2A2] transition"
                    onClick={parseHtmlToTree}
                >
                    Generate Tree
                </button>
                <button
                    className="px-4 py-2 bg-[#904BBE] text-white font-semibold rounded-lg shadow-md hover:bg-[#7C3EA4] transition"
                    onClick={() => {
                        setTreeData(null);
                        setSubmitted(false);
                        setHtml('');
                        setAttribute('data-testid');
                    }}
                >
                    Clear Tree
                </button>
            </div>

            {submitted && !treeData && (
                <p className="text-red-500 text-sm mt-2">
                    No valid element found with attribute:{' '}
                    <strong>{attribute}</strong>
                </p>
            )}

            <div className="w-full">{memoizedTree}</div>
        </div>
    );
}

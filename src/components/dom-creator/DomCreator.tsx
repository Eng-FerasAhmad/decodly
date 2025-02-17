import { useState, useRef, useEffect, useMemo, ReactElement } from 'react';
import Tree from 'react-d3-tree';

interface TreeNode {
    name: string;
    children?: TreeNode[];
}

export default function HtmlDomTree(): ReactElement {
    const [html, setHtml] = useState<string>(
        `<div data-testid='root'><p data-id='1'><span data-id='3'>Nested</span></p><span data-id='2'>World</span></div>`
    );
    const [attribute, setAttribute] = useState<string>('data-testid');
    const [treeData, setTreeData] = useState<TreeNode | null>(null);
    const treeContainerRef = useRef<HTMLDivElement | null>(null);

    const parseHtmlToTree = (): void => {
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
        ) : (
            <p className="text-red-500 w-full text-center">
                No valid element found with attribute: {attribute}
            </p>
        );
    }, [treeData, attribute]);

    return (
        <div className="p-6 mx-auto bg-dark rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
                Generate DOM Tree from HTML
            </h2>
            <textarea
                placeholder="Enter HTML here"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-80 p-3 border  bg-[#1E1E1E] text-white rounded-xl focus:outline-none resize-none placeholder-gray-400"
                rows={6}
            />

            <div className="flex justify-between items-center gap-4 mt-4">
                <input
                    type="text"
                    placeholder="Enter attribute (e.g. data-testid)"
                    value={attribute}
                    onChange={(e) => setAttribute(e.target.value)}
                    className="w-3xl mt-1 px-4 py-2 bg-light border border-secondary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 text-white  bg-[#1FBFBF] text-[#121212] font-semibold rounded-lg shadow-md hover:bg-[#17A2A2] transition"
                        onClick={parseHtmlToTree}
                    >
                        Generate Tree
                    </button>
                    <button
                        className="px-4 py-2 bg-[#904BBE] text-white font-semibold rounded-lg shadow-md hover:bg-[#7C3EA4] transition"
                        onClick={() => setTreeData(null)}
                    >
                        Clear Tree
                    </button>
                </div>
            </div>

            <div className="w-full">{memoizedTree}</div>
        </div>
    );
}

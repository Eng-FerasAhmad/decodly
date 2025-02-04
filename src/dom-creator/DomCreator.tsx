import { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';

export default function HtmlDomTree() {
    const [html, setHtml] = useState(
        "<div data-testid='root'><p data-id='1'><span data-id='3'>Nested</span></p><span data-id='2'>World</span></div>"
    );
    const [attribute, setAttribute] = useState('data-testid');
    const [treeData, setTreeData] = useState(null);
    const treeContainerRef = useRef(null);

    const parseHtmlToTree = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rootElement = doc.querySelector(`[${attribute}]`);
        if (!rootElement) return;

        const buildTree = (node) => {
            return {
                name: `${node.tagName.toLowerCase()} (ID: ${node.getAttribute('data-id') || 'N/A'})`,
                children: Array.from(node.children).map(buildTree),
            };
        };

        setTreeData(buildTree(rootElement));
    };

    useEffect(() => {
        if (treeContainerRef.current) {
            treeContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [treeData]);

    return (
        <div className="p-4 space-y-4" style={{ height: '100%' }}>
            <input
                type="text"
                placeholder="Enter attribute (e.g. data-testid)"
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
            />
            <textarea
                placeholder="Enter HTML here"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
            />
            <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={parseHtmlToTree}
            >
                Generate Tree
            </button>
            {treeData && (
                <div className="p-4 mt-4" ref={treeContainerRef}>
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
            )}
        </div>
    );
}

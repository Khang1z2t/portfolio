import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Đặt ở đây — ngoài function component
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const defaultScale = 1;
const minScale = 0.8;
const maxScale = 1.8;
const scaleStep = 0.1;

type CvPdfViewerProps = {
  fileUrl: string;
  missingLabel: string;
};

export function CvPdfViewer({ fileUrl, missingLabel }: CvPdfViewerProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(defaultScale);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) {
      return;
    }

    const updateWidth = () => {
      setContainerWidth(node.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setScale(defaultScale);
  }, []);

  const pageWidth =
    containerWidth > 0 ? Math.round(containerWidth * scale) : undefined;

  return (
    <div className="cv-document-shell">
      <div className="cv-toolbar">
        <div className="cv-zoom-controls">
          <button
            aria-label="Zoom out"
            className="cv-zoom-button"
            disabled={scale <= minScale}
            onClick={() => {
              setScale((value) =>
                Math.max(minScale, Number((value - scaleStep).toFixed(2))),
              );
            }}
            type="button"
          >
            -
          </button>
          <span className="cv-zoom-value">{Math.round(scale * 100)}%</span>
          <button
            aria-label="Zoom in"
            className="cv-zoom-button"
            disabled={scale >= maxScale}
            onClick={() => {
              setScale((value) =>
                Math.min(maxScale, Number((value + scaleStep).toFixed(2))),
              );
            }}
            type="button"
          >
            +
          </button>
          <button
            className="cv-fit-button"
            onClick={() => {
              setScale(defaultScale);
            }}
            type="button"
          >
            Fit
          </button>
        </div>
      </div>

      <div className="cv-document-viewport" ref={viewportRef}>
        <Document
          file={fileUrl}
          onLoadSuccess={onLoadSuccess}
          onError={(error) => console.error("PDF error:", error)}
          loading={
            <div className="cv-empty-state">
              <p>Loading CV...</p>
            </div>
          }
          error={
            <div className="cv-empty-state">
              <p>{missingLabel}</p>
            </div>
          }
        >
          <Page pageNumber={pageNumber} scale={1} width={pageWidth} />
        </Document>

        {numPages > 1 && (
          <div className="cv-pagination">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => p - 1)}
              type="button"
            >
              ← Trước
            </button>
            <span>
              {pageNumber} / {numPages}
            </span>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber((p) => p + 1)}
              type="button"
            >
              Sau →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

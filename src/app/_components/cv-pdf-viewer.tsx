import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Đặt ở đây — ngoài function component
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const getDefaultScale = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  if (window.innerWidth <= 430) {
    return 1.45;
  }

  if (window.innerWidth <= 767) {
    return 1.2;
  }

  return 1;
};

const minScale = 0.8;
const maxScale = 1.8;
const scaleStep = 0.1;

type CvPdfViewerProps = {
  fileUrl: string;
  missingLabel: string;
};

export function CvPdfViewer({ fileUrl, missingLabel }: CvPdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(getDefaultScale);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setScale(getDefaultScale());
  }, []);

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
              setScale(getDefaultScale());
            }}
            type="button"
          >
            Fit
          </button>
        </div>
      </div>

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
        <Page pageNumber={pageNumber} scale={scale} />
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
  );
}

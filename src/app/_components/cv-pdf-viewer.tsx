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
const wheelScaleStep = 0.05;
const renderScaleThreshold = 0.04;

type CvPdfViewerProps = {
  fileUrl: string;
  missingLabel: string;
};

export function CvPdfViewer({ fileUrl, missingLabel }: CvPdfViewerProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(defaultScale);
  const [renderScale, setRenderScale] = useState(defaultScale);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) {
      return;
    }

    let rafId = 0;
    let wheelDelta = 0;

    const updateWidth = () => {
      setContainerWidth(node.clientWidth);
    };

    const flushZoom = () => {
      rafId = 0;
      if (wheelDelta === 0) return;
      const direction = wheelDelta < 0 ? 1 : -1;
      wheelDelta = 0;
      setScale((value) => {
        const next = Number((value + direction * wheelScaleStep).toFixed(2));
        return Math.min(maxScale, Math.max(minScale, next));
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      wheelDelta += event.deltaY;
      if (rafId) return;
      rafId = window.requestAnimationFrame(flushZoom);
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(node);
    node.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      observer.disconnect();
      node.removeEventListener("wheel", handleWheel);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setScale(defaultScale);
  }, []);

  useEffect(() => {
    if (Math.abs(scale - renderScale) < renderScaleThreshold) return;
    const timer = window.setTimeout(() => {
      setRenderScale(scale);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [scale, renderScale]);

  const pageWidth =
    containerWidth > 0 ? Math.round(containerWidth * renderScale) : undefined;

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

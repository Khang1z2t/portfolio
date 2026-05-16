import { Cross2Icon, DownloadIcon } from "@radix-ui/react-icons";

type CvModalProps = {
  isCvOpen: boolean;
  isCvPrimed: boolean;
  cvPath: string;
  cvTitle: string;
  viewCvLabel: string;
  closeLabel: string;
  cvMissingLabel: string;
  downloadLabel: string;
  onClose: () => void;
  onDownload: () => void;
  CvPdfViewer: React.ComponentType<{ fileUrl: string; missingLabel: string }>;
};

export function CvModal({
  isCvOpen,
  isCvPrimed,
  cvPath,
  cvTitle,
  viewCvLabel,
  closeLabel,
  cvMissingLabel,
  downloadLabel,
  onClose,
  onDownload,
  CvPdfViewer,
}: CvModalProps) {
  if (!isCvOpen && !isCvPrimed) {
    return null;
  }

  return (
    <div
      aria-hidden={!isCvOpen}
      className={`cv-modal-overlay ${isCvOpen ? "is-open" : "is-preloaded"}`}
      onClick={onClose}
    >
      <div
        aria-label={cvTitle}
        aria-modal="true"
        className="cv-modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.stopPropagation();
          }
        }}
        role="dialog"
        tabIndex={-1}
      >
        <div className="cv-modal-header">
          <div>
            <p className="cv-modal-eyebrow">{viewCvLabel}</p>
            <h3>{cvTitle}</h3>
          </div>

          <button
            aria-label={closeLabel}
            className="cv-close-button"
            onClick={onClose}
            type="button"
          >
            <Cross2Icon />
          </button>
        </div>

        <div className="cv-modal-body">
          <CvPdfViewer fileUrl={cvPath} missingLabel={cvMissingLabel} />
        </div>

        <div className="cv-modal-footer">
          <button
            className="cv-download-button"
            onClick={onDownload}
            type="button"
          >
            <DownloadIcon />
            <span>{downloadLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export default function AllPages(props) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { pdf } = props;

  return (
    <Document
      file={`data:application/pdf;base64,${pdf}`}
    //   options={{ workerSrc: "/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page width={750} key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
// LazyExpandedRowContent.tsx
import React, { lazy, Suspense } from "react";
import { Spin } from "antd";
import { EventData } from "./types";

const ExpandedRowContent = lazy(() => import("./index"));

const LoadingPlaceholder = () => (
  <div className="p-4 flex justify-center">
    <Spin size="large" />
  </div>
);

interface LazyExpandedRowContentProps {
  record: EventData;
}

const LazyExpandedRowContent: React.FC<LazyExpandedRowContentProps> = ({
  record,
}) => (
  <Suspense fallback={<LoadingPlaceholder />}>
    <ExpandedRowContent record={record} />
  </Suspense>
);

export default LazyExpandedRowContent;

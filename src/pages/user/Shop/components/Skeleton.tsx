import React from "react";
import "./Skeleton.css";
interface SkeletonProps {
  height?: number | string;
  width?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ height = 20, width = "100%" }) => {
  const skeletonStyle: React.CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
    width: width,
  };

  return <div className="skeleton-item" style={skeletonStyle}></div>;
};

export default Skeleton;

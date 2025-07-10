import { notFound } from "next/navigation";
import { FunctionComponent } from "react";

const CatchAllPage: FunctionComponent = () => {
  notFound();
};

export default CatchAllPage;

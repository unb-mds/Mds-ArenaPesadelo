import { HTMLAttributes, ReactNode } from "react";

export interface ITable extends HTMLAttributes<HTMLDivElement> {
  data: Array<ReactNode>;
  className?: string;
}

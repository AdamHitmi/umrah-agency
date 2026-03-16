import {ReactNode} from "react";

import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  actions?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  actions
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4",
        align === "center" && "items-center text-center"
      )}
    >
      {eyebrow ? <Badge variant="gold">{eyebrow}</Badge> : null}
      <div className="space-y-3">
        <h2 className="text-balance font-display text-3xl text-sand-50 sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-sand-100/70 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}

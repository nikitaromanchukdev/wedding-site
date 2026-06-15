import { forwardRef, type ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, children, className = "", fullHeight = true },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`section px-3 py-16 sm:px-8 md:px-12 lg:px-16 ${
        fullHeight ? "min-h-[100dvh] flex flex-col justify-center" : ""
      } ${className}`}
    >
      <div className="section__inner mx-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl">
        {children}
      </div>
    </section>
  );
});

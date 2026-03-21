import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  children: string;
  type?: "chars" | "words" | "lines";
  className?: string;
}

const SplitText = forwardRef<HTMLSpanElement, SplitTextProps>(
  ({ children, type = "chars", className }, ref) => {
    if (type === "lines") {
      const lines = children.split("\n");
      return (
        <span ref={ref} className={cn("split-text", className)}>
          {lines.map((line, i) => (
            <span
              key={i}
              data-line={line}
              style={{ display: "inline-block" }}
              className="split-line"
            >
              {line}
            </span>
          ))}
        </span>
      );
    }

    if (type === "words") {
      const words = children.split(" ");
      return (
        <span ref={ref} className={cn("split-text", className)}>
          {words.map((word, i) => (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
              <span
                data-word={word}
                style={{ display: "inline-block" }}
                className="split-word"
              >
                {word}
              </span>
              {i < words.length - 1 && (
                <span style={{ display: "inline-block" }}>&nbsp;</span>
              )}
            </span>
          ))}
        </span>
      );
    }

    // type === "chars"
    const words = children.split(" ");
    return (
      <span ref={ref} className={cn("split-text", className)}>
        {words.map((word, wi) => (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "pre" }}>
            {word.split("").map((char, ci) => (
              <span
                key={ci}
                data-char={char}
                style={{ display: "inline-block" }}
                className="split-char"
              >
                {char}
              </span>
            ))}
            {wi < words.length - 1 && (
              <span style={{ display: "inline-block" }}>&nbsp;</span>
            )}
          </span>
        ))}
      </span>
    );
  }
);

SplitText.displayName = "SplitText";
export default SplitText;

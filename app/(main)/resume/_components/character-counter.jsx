"use client";

export function CharacterCounter({ current, limit, className = "" }) {
  const percentage = (current / limit) * 100;
  const isWarning = percentage >= 80 && percentage < 100;
  const isError = percentage >= 100;

  return (
    <div className={`flex items-center justify-between text-xs mt-1 ${className}`}>
      <span
        className={`font-medium ${
          isError
            ? "text-red-600"
            : isWarning
            ? "text-orange-500"
            : "text-gray-500"
        }`}
      >
        {current} / {limit} characters
      </span>
      {isError && (
        <span className="text-red-600 font-semibold">
          Character limit reached to keep your resume one-page.
        </span>
      )}
    </div>
  );
}

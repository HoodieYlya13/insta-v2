"use client";

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function AuthHeader({
  title = "InstaV2",
  subtitle = "Login to see posts",
  className = "text-center mb-8",
}: AuthHeaderProps) {
  return (
    <div className={className}>
      <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-muted-foreground mt-2">{subtitle}</p>
    </div>
  );
}

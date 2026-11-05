export function CoffeeMark({ className = "h-7 w-7" }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M8 14h20v12.5A7.5 7.5 0 0 1 20.5 34h-5A7.5 7.5 0 0 1 8 26.5V14Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M28 17h3a4 4 0 0 1 0 8h-3M13 7c-2 2 2 3 0 5m7-7c-2 2 2 3 0 5m7-5c-2 2 2 3 0 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>;
}

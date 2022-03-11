import { Component } from "solid-js";

const Spinner: Component = () => (
  <div className="animate-pulse">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="animate-spin h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        stroke="currentColor"
        class="opacity-25"
        stroke-width="4"
        cx="12"
        cy="12"
        r="10"
      />

      <path
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        class="opacity-75"
        fill="currentColor"
      />
    </svg>
  </div>
);

export default Spinner;

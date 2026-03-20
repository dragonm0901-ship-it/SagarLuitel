import { type SVGProps } from "react";

// Official Brand Logos (Industry-Grade)
export const ReactIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const ViteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 410 404" {...props}>
    <defs>
      <linearGradient id="viteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#41D1FF" />
        <stop offset="100%" stopColor="#BD34FE" />
      </linearGradient>
    </defs>
    <path d="M407.5 59.8L211.4 397c-3 5.3-10.7 5.3-13.7 0L1.6 59.8c-2.4-4.2-1.3-9.5 2.6-12.4L45 18c3.8-2.8 9.1-2.4 12.4 1l49.9 50.8c3.2 3.2 8.3 3.5 11.8.8l101-76.3c3.4-2.6 8.2-2.6 11.5 0l101.1 76.3c3.5 2.6 8.6 2.4 11.8-.8l50-50.8c3.3-3.4 8.6-3.8 12.4-1l40.7 30.1c4 2.3 5 7.6 2.6 11.9z" fill="url(#viteGradient)" />
    <path d="M213.3 394c-1.3 2.2-4.5 2.2-5.8 0L92 189.2c-1.8-3.1 1.2-6.7 4.5-5.9l84.4 20.6c3 .7 6 .7 9 0l84.4-20.6c3.3-.8 6.3 2.8 4.5 5.9L213.3 394z" fill="#FFC517" />
  </svg>
);

export const TailwindIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#38BDF8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

export const FramerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#0055FF" d="M12 24l-6-6h6zM12 12l6 6H6zM6 0h12v6h-6zM6 6h6v6H6zM12 6h6l-6 6z" />
  </svg>
);

export const FigmaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 38 57" {...props}>
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0AC17E" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
  </svg>
);

export const NodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props}>
    <path fill="#339933" d="M117.4 33.2L68.3 4.8c-2.7-1.5-6-1.5-8.7 0L10.6 33.2c-2.7 1.5-4.3 4.4-4.3 7.5v56.6c0 3.1 1.7 6 4.3 7.5l49.1 28.4c1.3.8 2.8 1.1 4.3 1.1s3-.4 4.3-1.1l49.1-28.4c2.7-1.5 4.3-4.4 4.3-7.5V40.7c0-3.1-1.6-6-4.3-7.5zm-53.4 82L20 90.6v-53l44 25.4v52.2zm48-25.4l-44 25.4V63l44-25.4v52.2z" />
  </svg>
);

export const JsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" {...props}>
    <path fill="#F7DF1E" d="M0 0h512v512H0z" />
    <path d="m309.8 414c11 20.3 30.2 38.3 53.8 38.3 22.9 0 35.1-12.7 35.1-28.5 0-21.6-17.3-28.6-43.5-40l-14.7-6.2c-41.5-18.1-68.5-41.1-68.5-88.3 0-50.6 37.1-85.3 91.2-85.3 43.3 0 71.1 18.6 86.8 52.8l-52 30.6c-8.7-18.1-23-26.9-38.4-26.9-18.6 0-27.6 9-27.6 22.2 0 15.1 10.3 21.8 32.7 31.1l14.7 6.4c52.2 22.1 82.1 44.9 82.1 94.6 0 63.8-43.9 98-107.4 98-63.5 0-101.4-31.1-118-63.1zm-152.1-4c12.3 21.2 28.5 36.3 49.3 42.4V202.4h55.2V448h.2c-35.1 0-71.1-12.7-88.3-40.4z" />
  </svg>
);

export const HtmlIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props}>
    <path fill="#E34F26" d="M14.4 2.4l10.2 114.3 39.4 10.9 39.4-10.9 10.2-114.3H14.4z" />
    <path fill="#EF652A" d="M64 116.8l31.5-8.7 8.3-93.3H64l-.1 102z" />
    <path fill="#FFF" d="M104.4 23.3h-81l7.4 82.4 33.1 9.2 33.1-9.2 7.4-82.4z" opacity="0.1" />
    <path fill="#FFF" d="M64 88.3l-20.9-5.8-.8-10.8h-11.2l1.3 18.2 31.6 8.7V88.3zM64 12.8v101.2l20.9-5.8 2.8-31.4h-35v-11.2h46.2l.4-4.2 1.1-12.5.4-4.5H64v-11h43.3l.8-8.8 1.1-12.5.4-5.3H64z" />
  </svg>
);

export const CssIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props}>
    <path fill="#1572B6" d="M14.4 2.4l10.2 114.3 39.4 10.9 39.4-10.9 10.2-114.3H14.4z" />
    <path fill="#33A9DC" d="M64 116.8l31.5-8.7 8.3-93.3H64l-.1 102z" />
    <path fill="#FFF" d="M104.4 23.3h-81l7.4 82.4 33.1 9.2 33.1-9.2 7.4-82.4z" opacity="0.1" />
    <path fill="#FFF" d="M64 88.3l-20.9-5.8-.8-10.8h-11.2l1.3 18.2 31.6 8.7V88.3zM64 12.8v101.2l20.9-5.8 2.8-31.4h-35v-11.2h46.2l.4-4.2 1.1-12.5.4-4.5H64v-11h43.3l.8-8.8 1.1-12.5.4-5.3H64z" />
  </svg>
);

export const GsapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <circle cx="50" cy="50" r="48" fill="#88ce02" />
    <path d="M50 15c-19.3 0-35 15.7-35 35s15.7 35 35 35 35-15.7 35-35-15.7-35-35-35zm0 60c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z" fill="#fff" />
    <path d="M50 35c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15z" fill="#fff" opacity="0.6" />
    <path d="M50 45c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z" fill="#fff" />
  </svg>
);

export const LenisIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#4A90E2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path fill="#4A90E2" d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

export const CreativeDeveloperIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const InfrastructureIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

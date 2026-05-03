import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';
import TextReveal from '@/components/ui/TextReveal';
import { DarkModeTerminal } from '@/components/ui/DarkModeTerminal';

gsap.registerPlugin(ScrollTrigger);

interface TechIconProps {
  icon: React.ElementType;
  color: string;
  delay: number;
  x: string;
  y: string;
  mx?: string;
  my?: string;
  size?: number;
  mSize?: number;
}

const TechIcon = ({ icon: Icon, color, delay, x, y, mx, my, size = 33, mSize = 18 }: TechIconProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-close effect on mobile after clear interaction
  useEffect(() => {
    if (!isMobile || !isPressed) return;
    const timeout = setTimeout(() => setIsPressed(false), 2000);
    return () => clearTimeout(timeout);
  }, [isPressed, isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: isPressed ? 1.4 : 1,
        zIndex: isPressed ? 50 : 40 
      }}
      transition={{
        opacity: { duration: 0.8, delay, ease: "easeOut" },
        scale: { duration: 0.8, delay, type: "spring", stiffness: 120 },
        zIndex: { duration: 0 }
      }}
      whileHover={!isMobile ? { 
        scale: 1.4,
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.3 }
      } : {}}
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
      onClick={() => isMobile && setIsPressed(!isPressed)}
      className="absolute cursor-pointer pointer-events-auto group"
      style={{ 
        left: isMobile ? (mx ?? x) : x, 
        top: isMobile ? (my ?? y) : y 
      }}
    >
      <div className={`relative p-1.5 md:p-2 rounded-[4px] bg-[#383838] dark:bg-[#E2E2E2] text-white dark:text-[#212121] shadow-sm transition-all duration-300 
        ${(isPressed || isHovering) ? 'shadow-[0_0_25px_var(--shadow-color)]' : ''} 
        group-hover:shadow-[0_0_25px_var(--shadow-color)]`}
           style={{ '--shadow-color': color } as React.CSSProperties}>
        <Icon className="transition-colors duration-300" style={{ width: isMobile ? mSize : size, height: isMobile ? mSize : size, color }} />
      </div>
    </motion.div>
  );
};

// Official Brand SVG Icons (Source: Simple Icons)
const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
  </svg>
);

const ViteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z"/>
  </svg>
);

const TailwindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
  </svg>
);

const FramerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
  </svg>
);

const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 300" {...props}>
    <path fill="#0acf83" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"/>
    <path fill="#a259ff" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"/>
    <path fill="#f24e1e" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"/>
    <path fill="#ff7262" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"/>
    <path fill="#1abcfe" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"/>
  </svg>
);

const NodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
  </svg>
);

const JsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0V0z" fill="currentColor" />
    <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#212121" />
  </svg>
);

const HtmlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
  </svg>
);

const CssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.002l5.379-1.443.744-8.157v-.009H18.59z"/>
  </svg>
);

const GsapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 82 30" {...props} fill="currentColor">
    <path d="M23.81 14.013v.013l-1.075 4.665c-.058.264-.322.458-.626.458H20.81a.218.218 0 0 0-.208.155c-1.198 4.064-2.82 6.858-4.962 8.535-1.822 1.428-4.068 2.093-7.069 2.093-2.696 0-4.514-.867-6.056-2.578C.478 25.09-.364 21.388.146 16.926 1.065 8.549 5.41.096 13.776.096c2.545-.023 4.543.762 5.933 2.33 1.47 1.657 2.216 4.154 2.22 7.421a.55.55 0 0 1-.549.536h-6.13a.42.42 0 0 1-.407-.41c-.05-2.259-.72-3.36-2.052-3.36-2.35 0-3.736 3.19-4.471 4.959-1.027 2.47-1.55 5.152-1.447 7.824.049 1.244.249 2.994 1.43 3.718 1.047.643 2.541.217 3.446-.495.904-.711 1.632-1.942 1.938-3.065.043-.156.046-.277.005-.332-.043-.055-.162-.068-.253-.068h-1.574a.572.572 0 0 1-.438-.202.42.42 0 0 1-.087-.362l1.076-4.674c.053-.24.27-.42.537-.453v-.011h10.33c.024 0 .049 0 .072.005.268.034.457.284.452.556h.002Z"/>
    <path d="M41.594 8.65a.548.548 0 0 1-.548.531H35.4c-.37 0-.679-.3-.679-.665 0-1.648-.57-2.45-1.736-2.45s-1.918.717-1.94 1.968c-.025 1.395.764 2.662 3.01 4.84 2.957 2.774 4.142 5.232 4.085 8.48C38.047 26.605 34.476 30 29.042 30c-2.775 0-4.895-.743-6.305-2.207-1.431-1.486-2.087-3.668-1.95-6.485a.548.548 0 0 1 .549-.53h5.84a.55.55 0 0 1 .422.209.48.48 0 0 1 .106.384c-.065 1.016.112 1.775.512 2.195.256.272.613.41 1.058.41 1.079 0 1.711-.763 1.735-2.09.02-1.148-.343-2.155-2.321-4.19-2.555-2.496-4.846-5.075-4.775-9.13.042-2.351.976-4.502 2.631-6.056C28.294.868 30.687 0 33.465 0c2.783.02 4.892.813 6.269 2.359 1.304 1.466 1.932 3.582 1.862 6.29h-.002Z"/>
    <path d="m59.096 29.012.037-27.932a.525.525 0 0 0-.529-.533h-8.738c-.294 0-.423.252-.507.42L36.707 28.842v.005l-.005.006c-.14.343.126.71.497.71h6.108c.33 0 .548-.1.656-.308l1.213-2.915c.149-.388.177-.424.601-.424h5.836c.406 0 .415.008.408.405l-.131 2.71a.525.525 0 0 0 .529.532h6.17a.522.522 0 0 0 .403-.182.458.458 0 0 0 .104-.369Zm-10.81-9.326c-.057 0-.102-.001-.138-.005a.146.146 0 0 1-.13-.183c.012-.041.029-.095.053-.163l4.377-10.827c.038-.107.086-.212.136-.314.071-.145.157-.155.184-.047.023.09-.502 11.118-.502 11.118-.041.413-.06.43-.467.464l-3.509-.041h-.008l.003-.002Z"/>
    <path d="M71.545.547h-4.639c-.245 0-.52.13-.585.422l-6.455 28.029a.423.423 0 0 0 .088.364.572.572 0 0 0 .437.202h5.798c.311 0 .525-.153.583-.418 0 0 .703-3.168.704-3.178.05-.247-.036-.439-.258-.555-.105-.054-.209-.108-.312-.163l-1.005-.522-1-.522-.387-.201a.186.186 0 0 1-.102-.17.199.199 0 0 1 .198-.194l3.178.014c.95.005 1.901-.062 2.836-.234 6.58-1.215 10.95-6.485 11.076-13.656.107-6.12-3.309-9.221-10.15-9.221l-.005.003Zm-1.579 16.68h-.124c-.278 0-.328-.03-.337-.04-.004-.007 1.833-8.073 1.834-8.084.047-.233.045-.367-.099-.446-.184-.102-2.866-1.516-2.866-1.516a.188.188 0 0 1-.101-.172.197.197 0 0 1 .197-.192h4.241c1.32.04 2.056 1.221 2.021 3.237-.061 3.492-1.721 7.09-4.766 7.214Z"/>
  </svg>
);

const NextJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/>
  </svg>
);

const LenisIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 219 234" {...props} fill="currentColor">
    <path d="M217.909 86.5209L111.492 192.841H90.1304C89.4361 192.841 88.7572 192.635 88.1793 192.249C87.6022 191.863 87.1526 191.315 86.887 190.674C86.6221 190.033 86.5531 189.328 86.689 188.647C86.8249 187.967 87.1602 187.342 87.6524 186.852L117.726 156.784C120.091 154.416 121.419 151.208 121.419 147.862V58.7888C121.419 58.3275 121.51 57.8707 121.687 57.4446C121.864 57.0186 122.123 56.6316 122.45 56.306L138.702 40.0692C142.038 40.0933 145.228 41.434 147.578 43.799C149.928 46.164 151.247 49.3614 151.247 52.6939V78.0482C151.248 79.1541 151.03 80.2489 150.607 81.2706C150.185 82.2922 149.564 83.2206 148.782 84.0033L146.473 86.3106L146.902 86.8719L186.333 47.4968V0.00702069H185.631V17.4361C185.628 17.887 185.48 18.3251 185.21 18.6859C184.939 19.0465 184.559 19.3108 184.127 19.4397C183.694 19.5686 183.232 19.5551 182.807 19.4015C182.383 19.2479 182.019 18.9621 181.77 18.5863C179.221 14.6661 175.732 11.4445 171.62 9.21395C167.508 6.98343 162.903 5.81484 158.225 5.81438H125.231L96.3781 34.7459L85.1457 45.9678C84.655 46.4571 84.0297 46.79 83.3487 46.9244C82.6684 47.0589 81.963 46.9889 81.3224 46.7232C80.6818 46.4576 80.1346 46.0082 79.7491 45.4318C79.3636 44.8554 79.158 44.1779 79.158 43.4849V0H78.4561V20.1153C78.4568 20.5946 78.2936 21.0599 77.9932 21.434C77.6935 21.8081 77.2745 22.0686 76.8061 22.1725C76.3377 22.2764 75.8484 22.2174 75.4183 22.0053C74.9875 21.7932 74.6431 21.4407 74.4403 21.0061C68.8244 8.96351 60.2249 5.80034 60.2249 5.80034L19.9649 45.561L20.4565 46.0589L22.2324 44.3055C29.6316 37.0183 42.2256 41.2545 43.6226 51.5436C43.9229 53.8059 44.0682 56.086 44.0577 58.3679V188.514L0 232.532L0.498395 233.03L2.2253 231.304C4.58816 228.937 7.79458 227.603 11.1409 227.594H138.52L207.933 157.822C210.301 155.456 211.632 152.247 211.633 148.901V98.9139C211.634 95.5682 212.965 92.3591 215.333 89.9926L218.316 87.0119L217.909 86.5209ZM79.2354 89.6423V52.8832L92.0675 40.0622H129.225C129.92 40.0609 130.6 40.266 131.178 40.6512C131.757 41.0365 132.208 41.5846 132.473 42.2263C132.74 42.8678 132.809 43.5739 132.673 44.2549C132.537 44.936 132.202 45.5615 131.71 46.052L85.2161 92.504C84.7254 92.9956 84.0994 93.3306 83.4177 93.4664C82.736 93.6022 82.0292 93.5326 81.3872 93.2665C80.7452 93.0005 80.1959 92.5499 79.8104 91.9726C79.425 91.3945 79.22 90.7155 79.2214 90.0205L79.2354 89.6423ZM79.2354 99.4613L86.3391 92.3563V146.32L79.2214 153.432L79.2354 99.4613ZM80.6392 192.82H49.2666C48.5715 192.822 47.8916 192.617 47.3133 192.231C46.7349 191.846 46.2841 191.298 46.0179 190.657C45.7517 190.015 45.6821 189.309 45.8181 188.628C45.954 187.947 46.2894 187.321 46.7816 186.831L80.3444 153.306C80.8351 152.814 81.4604 152.479 82.1414 152.343C82.8224 152.207 83.5286 152.276 84.1705 152.541C84.8125 152.806 85.3611 153.256 85.7473 153.832C86.1328 154.409 86.3391 155.087 86.3391 155.781V187.083L80.6392 192.82ZM176.617 187.315C176.617 187.873 176.394 188.407 176 188.802L172.602 192.203C172.207 192.598 171.672 192.82 171.113 192.82H120.934C120.239 192.822 119.56 192.617 118.981 192.231C118.402 191.846 117.951 191.298 117.685 190.657C117.419 190.015 117.35 189.309 117.486 188.628C117.622 187.947 117.957 187.321 118.449 186.831L170.629 134.705C171.12 134.216 171.746 133.883 172.427 133.749C173.107 133.614 173.812 133.684 174.452 133.95C175.093 134.215 175.641 134.664 176.026 135.241C176.412 135.818 176.617 136.495 176.617 137.188V187.315Z"/>
  </svg>
);

const CreativeDeveloperBadge = ({ isMobile }: { isMobile: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const codeSnippet = `console.log("Hello World");\nconsole.log("I am Sagar");`;

  useEffect(() => {
    if (isHovered) {
      let i = 0;
      setDisplayText(""); // Reset to start typing
      const interval = setInterval(() => {
        setDisplayText(codeSnippet.slice(0, i));
        i++;
        if (i > codeSnippet.length) {
          clearInterval(interval);
          // Auto-disappear on mobile after 1 seconds
          if (isMobile) {
            const timeout = setTimeout(() => {
              setIsHovered(false);
            }, 1000);
            return () => clearTimeout(timeout);
          }
        }
      }, 25);
      return () => clearInterval(interval);
    } else {
      setDisplayText("");
    }
  }, [isHovered, isMobile, codeSnippet]);

  return (
    <div className="relative mb-3 flex flex-col items-center group"
         onMouseEnter={() => !isMobile && setIsHovered(true)}
         onMouseLeave={() => !isMobile && setIsHovered(false)}
         onClick={() => setIsHovered(!isHovered)}
    >
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: isMobile ? 0.6 : 0.8, x: "-50%", y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: isMobile ? 0.8 : 1, 
              x: "-50%", 
              y: isMobile ? -130 : -95 
            }}
            exit={{ opacity: 0, scale: isMobile ? 0.6 : 0.8, x: "-50%", y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute left-1/2 w-[220px] sm:w-[260px] bg-[#0A0A0A] border border-white/10 rounded-[4px] p-2.5 shadow-2xl z-[120] backdrop-blur-xl"
            style={{ originY: 1 }}
          >
            {/* Header / Traffic Lights */}
            <div className="flex gap-1.5 mb-2 px-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]/80" />
              <div className="ml-auto text-[6px] font-mono text-gray-500 tracking-tighter uppercase opacity-50">sh — 80x24</div>
            </div>

            {/* Typing Code Area */}
            <div className="max-h-[60px] overflow-hidden">
              <pre className="text-[10px] font-mono leading-relaxed tracking-tight break-all whitespace-pre-wrap">
                {displayText.split("\n").map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600 select-none text-right pr-1 border-r border-white/5">{idx + 1}</span>
                    <span className="text-gray-300">
                      {line.startsWith('console') ? (
                        <>
                          <span className="text-[#BD93F9]">console</span>
                          <span className="text-gray-400">.</span>
                          <span className="text-[#50FA7B]">log</span>
                          <span className="text-gray-400">(</span>
                          <span className="text-[#F1FA8C]">{line.includes('"') ? line.split('"')[1] ? `"${line.split('"')[1]}"` : '"' : ''}</span>
                          <span className="text-gray-400">)</span>
                          <span className="text-gray-400">;</span>
                        </>
                      ) : line}
                    </span>
                  </div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="inline-block w-1 h-3 ml-0.5 bg-white/50 align-middle"
                />
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="inline-flex items-center gap-2 bg-brand-secondary text-white px-3 py-1.5 rounded-[4px] text-[9px] font-mono font-bold uppercase tracking-widest shadow-xl transition-all duration-300 hover:bg-black cursor-pointer active:scale-95 group-hover:scale-110">
        <Code className="w-3.5 h-3.5 text-brand-third dark:text-brand-primary" />
        Creative Developer
      </span>
    </div>
  );
};

const colors = ['#0f7bff', '#ff930f', '#151517'];

export function HeroSection({ isIntroDone }: { isIntroDone: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textBgRef = useRef<HTMLDivElement>(null);
  const textFgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalRevealed, setTerminalRevealed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [isHovered, setIsHovered] = useState(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleDarkModeSuccess = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem('theme', nextMode ? 'dark' : 'light');
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark-mode");
    setTimeout(() => {
      setShowTerminal(false);
      setTerminalRevealed(true);
      // reset terminalRevealed after a while so they can toggle back again!
      setTimeout(() => setTerminalRevealed(false), 500);
    }, 1000);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isIntroDone) return;

    // Kill any lingering ScrollTriggers from previous mount
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === sectionRef.current) st.kill();
    });

    // Reset to known state — use specific props instead of clearProps:'all'
    // to avoid stripping GPU compositing hints
    const refs = [textBgRef, textFgRef, imageRef, contentRef];
    refs.forEach(ref => {
      if (ref.current) {
        gsap.set(ref.current, { y: 0, opacity: 0, scale: 1, force3D: true, willChange: 'transform, opacity' });
      }
    });

    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Parallax scroll — entrance is fully done
          // force3D: true ensures transform string format stays as translate3d
          // so there's zero visual recalculation when the new tween takes over
          gsap.to(textBgRef.current, {
            y: 80,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            }
          });

          gsap.to(imageRef.current, {
            y: -150,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            }
          });

          gsap.to(textFgRef.current, {
            y: 120,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            }
          });
        }
      });

      tl.fromTo(textBgRef.current, 
        { y: -150, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out', force3D: true }
      )
      .fromTo(textFgRef.current, 
        { y: -200, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out', force3D: true }, '<'
      )
      .fromTo(imageRef.current, 
        { y: 150, opacity: 0, scale: 0.8 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out', force3D: true }, '-=1.2'
      )
      .fromTo(contentRef.current, 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', force3D: true }, '-=0.8'
      );

    }, sectionRef);

    // Cloudy background animation
    gsap.utils.toArray<HTMLElement>('.hero-cloud-blob').forEach((blob, i) => {
      gsap.to(blob, {
        x: 'random(-20%, 20%)',
        y: 'random(-20%, 20%)',
        scale: 'random(0.8, 1.4)',
        rotation: 'random(-20, 20)',
        duration: 20 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * -2,
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;

      gsap.to('.hero-cloud-blob', {
        xPercent: x * 30,
        yPercent: y * 30,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.08
      });
    };

    const animateBlobColor = (blob: HTMLElement) => {
      if (!isHoveringRef.current) return;
      const nextColor = colors[Math.floor(Math.random() * colors.length)] + '44';
      gsap.to(blob, {
        backgroundColor: nextColor,
        duration: gsap.utils.random(3, 5),
        ease: 'sine.inOut',
        onComplete: () => animateBlobColor(blob)
      });
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      gsap.utils.toArray<HTMLElement>('.hero-cloud-blob').forEach((blob) => {
        animateBlobColor(blob);
      });
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      gsap.to('.hero-cloud-blob', {
        backgroundColor: (i: number) => (i % 2 === 0 ? '#0f7bff' : '#ff930f') + '33',
        duration: 2,
        ease: 'power2.out'
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
      refs.forEach(ref => {
        if (ref.current) ref.current.style.willChange = '';
      });
    };
  }, [isIntroDone]);


  return (
    <section ref={sectionRef} className="relative pt-[72px] min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-700 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Dynamic Cloudy Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-50 blur-[100px]">
        <div className="hero-cloud-blob absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-brand-primary/20 rounded-full" />
        <div className="hero-cloud-blob absolute bottom-[-10%] right-[-10%] w-[65%] h-[65%] bg-brand-third/20 rounded-full" />
        <div className="hero-cloud-blob absolute top-[20%] right-[10%] w-[55%] h-[55%] bg-brand-primary/15 rounded-full" />
        <div className="hero-cloud-blob absolute bottom-[10%] left-[20%] w-[60%] h-[60%] bg-brand-third/15 rounded-full" />
        <div className="hero-cloud-blob absolute top-[40%] left-[40%] w-[50%] h-[50%] bg-brand-secondary/10 rounded-full" />
        <div className="hero-cloud-blob absolute top-[10%] right-[30%] w-[45%] h-[45%] bg-brand-primary/10 rounded-full" />
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 z-[150] pointer-events-none pb-32 md:pb-24 -translate-y-16 md:translate-y-0 text-center">
        {/* All icons stacked below image/text on mobile (y > 60%) */}
        {/* Clustered Left Side */}
        <TechIcon icon={ReactIcon} color="#61DAFB" x="28%" y="25%" mx="20%" my="60%" delay={0.2} />
        <TechIcon icon={TailwindIcon} color="#38B2AC" x="24%" y="45%" mx="35%" my="62%" delay={0.4} />
        <TechIcon icon={FramerIcon} color="currentColor" x="30%" y="65%" mx="50%" my="64%" delay={0.6} />
        <TechIcon icon={NodeIcon} color="#8CC84B" x="22%" y="82%" mx="65%" my="62%" delay={0.8} />
        <TechIcon icon={HtmlIcon} color="#E34F26" x="32%" y="78%" mx="80%" my="60%" delay={1.0} />

        {/* Clustered Right Side */}
        <TechIcon icon={ViteIcon} color="#F5C518" x="72%" y="22%" mx="25%" my="68%" delay={0.3} />
        <TechIcon icon={FigmaIcon} color="#FF6B9D" x="76%" y="42%" mx="40%" my="70%" delay={0.5} />
        <TechIcon icon={JsIcon} color="#F7DF1E" x="70%" y="60%" mx="55%" my="68%" delay={0.7} />
        <TechIcon icon={GsapIcon} color="#0ae448" x="78%" y="76%" mx="70%" my="70%" delay={0.9} />
        <TechIcon icon={CssIcon} color="#1572B6" x="68%" y="85%" mx="30%" my="75%" delay={1.1} />
        
        {/* Extra Icons close to center bottom/top */}
        <TechIcon icon={NextJsIcon} color="currentColor" x="35%" y="15%" mx="48%" my="78%" delay={1.3} />
        <TechIcon icon={LenisIcon} color="#FF98A3" x="65%" y="15%" mx="65%" my="75%" delay={1.7} />
      </div>

      {/* Background Text Layer (Behind Image) */}
      <div 
        className="absolute inset-0 flex flex-col justify-center pb-32 md:pb-24 items-center z-10 pointer-events-none select-none"
      >
        <div ref={textBgRef} className="flex flex-col justify-center items-center w-full">
          <h1 className="text-[14vw] md:text-[11vw] lg:text-[9vw] xl:text-[10.5vw] leading-[0.85] font-serif font-black text-brand-secondary dark:text-gray-300 transition-colors duration-700 whitespace-nowrap tracking-tighter mix-blend-multiply dark:mix-blend-normal uppercase">
            FRONT END
          </h1>
          <h1 className="text-[14vw] md:text-[11vw] lg:text-[9vw] xl:text-[10.5vw] leading-[0.85] font-serif font-black text-brand-secondary dark:text-gray-300 transition-colors duration-700 whitespace-nowrap tracking-tighter mix-blend-multiply dark:mix-blend-normal uppercase">
            MAGICIAN
          </h1>
        </div>
      </div>

      {/* Hero Image Layer */}
      <div 
        className="absolute inset-0 pb-32 md:pb-24 pointer-events-none flex justify-center items-center z-10"
      >
        <div ref={imageRef} className="relative flex flex-col items-center">
          {/* Theme Toggle Button - Desktop (Terminal Trigger) */}
          {!isMobile && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute -top-12 lg:-top-16 pointer-events-auto cursor-pointer z-[150] px-4 py-2 text-center"
              onClick={() => !terminalRevealed && setShowTerminal(true)}
            >
              <div 
                className={`text-[11px] md:text-[13px] font-mono font-bold uppercase tracking-widest select-none px-6 py-2 rounded-[4px] border transition-all duration-500 shadow-xl
                  ${isDarkMode 
                    ? 'bg-brand-primary text-white border-brand-primary hover:shadow-brand-primary/20' 
                    : 'bg-brand-third text-black border-brand-third hover:shadow-brand-third/20'
                  }`}
              >
                {isDarkMode ? 'light was better, right?' : 'do you like it dark?'}
              </div>
            </motion.div>
          )}

          {/* Theme Toggle Button - Mobile (Instant Trigger) */}
          {isMobile && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute -top-16 pointer-events-auto cursor-pointer z-[150] px-4 py-2 text-center"
              onClick={() => {
                const nextMode = !isDarkMode;
                setIsDarkMode(nextMode);
                localStorage.setItem('theme', nextMode ? 'dark' : 'light');
                document.documentElement.classList.toggle("dark");
                document.body.classList.toggle("dark-mode");
              }}
            >
              <div 
                className={`w-[55vw] sm:w-[50vw] text-[9px] font-mono font-bold uppercase tracking-widest select-none px-4 py-3 rounded-[4px] border transition-all duration-500 shadow-xl whitespace-nowrap flex items-center justify-center
                  ${isDarkMode 
                    ? 'bg-brand-primary text-white border-brand-primary' 
                    : 'bg-brand-third text-black border-brand-third'
                  }`}
              >
                {isDarkMode ? 'light was better, right?' : 'do you like it dark?'}
              </div>
            </motion.div>
          )}

          <div
               className="w-[60vw] sm:w-[54vw] md:w-[42vw] lg:w-[30vw] xl:w-[27vw] 2xl:w-[24vw] max-w-[450px] max-h-[40vh] lg:max-h-[46vh] xl:max-h-none relative p-1 md:p-1.5 rounded-[4px] shadow-2xl overflow-hidden group/frame pointer-events-auto h-auto cursor-pointer transition-all duration-500 bg-brand-secondary"
               onMouseEnter={() => !isMobile && setIsHovered(true)}
               onMouseLeave={() => !isMobile && setIsHovered(false)}
               onClick={() => isMobile && setIsHovered(!isHovered)}
          >
            {/* Soft Glow Background */}
            <div className="absolute -inset-2 bg-brand-primary opacity-30 blur-2xl group-hover/frame:opacity-50 transition-opacity duration-700" />
            
            {/* Modern Frame */}
            <div 
              data-cursor-hidden
              className="relative z-10 w-full h-auto overflow-hidden rounded-[4px] group/frame cursor-none"
            >
              <img
                src="/images/hero-portrait.png"
                alt="Sagar Luitel"
                className={`relative z-10 w-full h-auto object-contain transition-opacity duration-700 brightness-95 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
              />
              <img
                src="/images/hero-portrait-wizard.png"
                alt="Magician Sagar Luitel"
                className={`absolute inset-0 z-0 w-full h-full object-contain transition-opacity duration-700 brightness-110 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Foreground Text Layer (In front of Image, with Stroke) */}
      <div 
        className="absolute inset-0 flex flex-col justify-center pb-32 md:pb-24 items-center z-20 pointer-events-none select-none"
      >
        <div ref={textFgRef} className="flex flex-col justify-center items-center w-full relative">
            <h1 
            className="text-[14vw] md:text-[11vw] lg:text-[9vw] xl:text-[10.5vw] leading-[0.85] font-serif font-black text-transparent whitespace-nowrap tracking-tighter relative"
            style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.45)' }}
          >
            FRONT END
          </h1>
          <h1 
            className="text-[14vw] md:text-[11vw] lg:text-[9vw] xl:text-[10.5vw] leading-[0.85] font-serif font-black text-transparent whitespace-nowrap tracking-tighter"
            style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.45)' }}
          >
            MAGICIAN
          </h1>
        </div>
      </div>

      {/* Bottom Content Layer */}
      <div ref={contentRef} className="absolute bottom-4 lg:bottom-10 left-0 right-0 z-[155] px-6 pointer-events-none transition-all duration-500">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[140px] pointer-events-none">
          <AnimatePresence mode="wait">
            {(!showTerminal || isMobile) ? (
              <motion.div 
                key="creative-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center pointer-events-none"
              >
                <Magnetic strength={0.2}>
                  <div className="inline-block pointer-events-auto">
                    <CreativeDeveloperBadge isMobile={isMobile} />
                  </div>
                </Magnetic>
                <div className="mt-4 pointer-events-auto">
                  <TextReveal 
                    text="Crafting immersive digital experiences that blur the line between code and art using cutting-edge React & GSAP."
                    triggerOnInit={isIntroDone}
                    delay={0.5}
                    className="text-gray-600 dark:text-gray-300 font-medium text-[11px] md:text-xs max-w-[240px] md:max-w-xs bg-white/40 dark:bg-black/20 backdrop-blur-md p-3 rounded-[4px] border border-white/20 dark:border-white/10 shadow-sm leading-relaxed justify-center transition-colors duration-700"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="terminal-mode"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 30 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full flex justify-center relative scale-[0.8] lg:scale-[0.75] xl:scale-[0.85] transition-transform duration-500 origin-top pointer-events-none"
              >
                <DarkModeTerminal 
                  inline={true}
                  isDarkMode={isDarkMode}
                  onSuccess={handleDarkModeSuccess} 
                  onClose={() => {
                    setShowTerminal(false);
                    setIsDarkMode(false);
                    document.documentElement.classList.remove("dark");
                    document.body.classList.remove("dark-mode");
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

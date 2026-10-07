www.vapestore.co.uk
light
deterministic
6890 elements · 5.8s
10 viewports · 12 sections · 8 overlays · 24 breakpoints · 96 vars
Tailwind CSS · Shopify · Google Fonts
Preview
Raw
#ffffff
#000000
#2563eb
#3f3f46
#111f2a
#eef5fa
#e5e7eb
#6b7280
content
→
content
→
content
→
content
→
content
→
content
→
logos
→
cta
→
testimonials
→
content
→
faq
→
content
Copy design.md
.md
ai-prompt
tokens.json
Vapestore | UK's #1 Online Vape Shop for E-Liquid, Vape Kits & Coils — Style Reference
Extracted 2026-10-04 from https://www.vapestore.co.uk/
Theme: light

Vapestore | UK's #1 Online Vape Shop for E-Liquid, Vape Kits & Coils (www.vapestore.co.uk) reads as a light, layered interface built on a Plus Jakarta Sans/Helvetica type pairing. Structurally it relies on fully-rounded pill shapes as its signature geometry, and soft shadows lift key surfaces off the canvas — while brand accent (#111f2a) carries the interactive energy. Motion is measured and smooth, averaging 344ms on interactive transitions. Typography runs from 13px up to 42px across 8 steps, and the spacing system sits on a 4-unit base with 8px container padding.

Contents
Tokens — Colors
Tokens — Typography
Iconography
Tokens — Spacing & Shapes
Effects & Treatments
Tokens — Motion
Design Token System
Scroll & Reveal Motion
Micro-interactions
Component State Matrix
Overlays & Portals
Components
Component Census
Component API Sketch
Do's and Don'ts
Surfaces
Elevation
Imagery
Assets & Media
Layout
Page Blueprint
Grid & Composition
Landing Page Anatomy
Hero & Conversion
Signature Devices
Content & Copy
Accessibility Profile
Responsive
Responsive Behaviour
Agent Prompt Guide
Quick Start
Rebuild Checklist
Extraction Coverage
Known Gaps
Tokens — Colors
Name	Value	Token	Role
Canvas	#ffffff	--color-bg-canvas	Page background — the base layer every other surface floats on · 7.32% of usage
Primary Text	#000000	--color-text-primary	Primary copy, headings, high-emphasis UI labels — 21.0:1 against canvas · 54.57% of usage
Secondary Text	#2563eb	--color-text-secondary	Supporting copy and descriptions — 5.2:1 against canvas · 1.72% of usage
Muted Text	#3f3f46	--color-text-muted	Captions, placeholders, low-emphasis meta — 10.4:1 against canvas · 0.82% of usage
Brand Accent	#111f2a	--color-accent	Primary interactive color — buttons, links, key fills carry the brand energy · 20.75% of usage
Surface	#eef5fa	--color-bg-surface	Elevated container fill — cards, nav bars, panels sitting on the canvas · 2.68% of usage
Border	#e5e7eb	--color-border	Hairline separators and card outlines · 4.21% of usage
Border Strong	#6b7280	--color-border-strong	Higher-emphasis outlines · 1.61% of usage
Gray Dark	#a1a1aa	--color-gray-dark	Supporting text or icon color · 1.68% of usage
Green Light	#d3fdc7	--color-green-light	Supporting surface / fill color · 1.53% of usage
Gray Near-black	#18181b	--color-gray-deep	Supporting text or icon color · 1.2% of usage
Green Dark	#5eb047	--color-green-dark	Supporting text or icon color · 0.77% of usage
Blue Light	#bbd6ed	--color-blue-light	Supporting text or icon color · 0.58% of usage
Gradients in use:

url("https://www.vapestore.co.uk/cdn/shop/files/SMOK-Arco-E1---gradient-purple-s (1 uses)
Theming: dark mode is available (prefers-color-scheme rules (1)); currently rendering dark. Capture the other mode in a separate scan if you need both palettes.

Tokens — Typography
Plus Jakarta Sans — display+body family
Weights: 400, 700, 800
Sizes: 42px, 30px, 26px, 22px, 20px, 17px, 16px, 15px
Role: Workhorse family — used for both display headlines and body/UI text across weights 400/700/800.
Helvetica — supporting family
Weights: 400
Sizes: 15px
Role: Supporting family for accents and specialized text.
Type Scale
Role	Size	Line Height	Letter Spacing	Weight	Family
display	42px	0.48	—	700	Plus Jakarta Sans
heading-lg	30px	1.33	—	700	Plus Jakarta Sans
heading	26px	3	—	800	Plus Jakarta Sans
heading-sm	22px	1.41	—	800	Plus Jakarta Sans
subheading	20px	1.55	—	700	Plus Jakarta Sans
body	17px	1.38	—	400	Plus Jakarta Sans
small	15px	1.57	—	700	Plus Jakarta Sans
caption	13px	1.69	—	400	Plus Jakarta Sans
Iconography
Style: outline, 1.5px strokes
Size scale: 15 / 17 / 22px (384 icons measured)
Delivery: inline SVG
Illustration: 9 larger vector graphics present (spot/ambient illustration is part of the language)
Tokens — Spacing & Shapes
Density: compact

Border Radius
Context	Value	Usage
other	8px	430 elements
input	100px	189 elements
card	12px	104 elements
button	8px	102 elements
tag	8px	94 elements
image	8px	4 elements
Shadows
Name	Value	Token
sm	rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161, 161, 170) 0px 2px 2px 0px, rgb(244, 244, 245) 0px 0px 0px 4px	--shadow-sm
md	rgb(145, 249, 116) 0px 0px 0px 0px, rgb(94, 176, 71) 0px 0px 0px 0px, rgb(233, 254, 227) 0px 0px 0px 0px	--shadow-md
lg	rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgb	--shadow-lg
xl	rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161, 161, 170) 0px 1px 1px 0px, rgb(244, 244, 245) 0px 0px 0px 2px	--shadow-xl
shadow-4	rgb(161, 161, 170) 0px 2px 2px 0px	--shadow-4
Layout
Page max-width: 1000px
Section gap: not detected
Card padding: 8px
Element gap: 8px
Spacing base unit: 4px
Effects & Treatments
Masks & shapes: 0 masked elements, 50 clip-paths
Tokens — Motion
Duration scale
Token	Value	Use
--duration-fast	150ms	hover/color transitions (3 observed)
--duration-base	300ms	default UI transitions (5 observed)
--duration-moderate	500ms	panels, accordions, toasts (3 observed)
--duration-slow	6000ms	hero reveals, page-level (2 observed)
Easing
Token	Value	Character
--ease-custom-1	ease	used 198×
--ease-in-out-standard	cubic-bezier(0.40, 0.00, 0.20, 1.00)	used 55×
--ease-custom-3	ease-in-out	used 6×
--ease-custom-4	linear	used 2×
--ease-custom-5	cubic-bezier(0.55, 0.06, 0.68, 0.19)	used 1×
Animation recipes (paste-ready)
/* transition: transform — trigger: state change; 6000ms linear; target: div#swiper-wrapper-bf2c7d23c0ffdfed.swiper-wrapper */
Reduced motion: no prefers-reduced-motion handling detected; add one when rebuilding.

Design Token System
Naming fingerprint: the 73 custom properties name like Tailwind CSS (57% confidence) — evidence: --tw-ring-color, --tw-ring-offset-color, --tw-ring-opacity.

Scopes captured: :root → dark (71 vars).

Variable groups
Group	Kind	Count	Examples
--primary-button	color	6	--primary-button-…: #d3fdc7 --primary-bu…
--secondary-button	color	6	--secondary-butto…: #7fc4f9 --secondary-…
--base-alt	color	2	--base-alt-colour: #A1A1AA --base-alt-tx…
--body-xs	mixed	2	--body-xs-font-si…: 14px --body-xs-line-…
--dark-alt	color	2	--dark-alt-colour: #18181B --dark-alt-tx…
--dull-alt	color	2	--dull-alt-colour: #3F3F46 --dull-alt-tx…
--body-lg	mixed	2	--body-lg-font-si…: 16px --body-lg-line-…
--body-sm	mixed	2	--body-sm-font-si…: 14px --body-sm-line-…
--jdgm-write	color	2	--jdgm-write-revi…: #000000 --jdgm-write…
(ungrouped)	mixed	47	--base-colour: #223D54 --base-txt-colour…
Tokenised coverage: 95% of the page's most-used colours resolve to a variable — this design is genuinely tokenised, so rebuild against the variables rather than the hex values.

Paste-ready token block
:root {
  /* color */
  --jdgm-primary-color: #000;
  --dark-colour: #080F15;
  --base-alt-txt-colour: #91F974;
  --primary-button-hover-background: #91f974;
  --primary-button-hover-text: #111f2a;
  --base-colour: #223D54;
  --dull-colour: #111F2A;
  --jdgm-secondary-color: rgba(0,0,0,0.1);
  --primary-button-background: #d3fdc7;
  --primary-button-text: #111f2a;
  --secondary-button-background: #7fc4f9;
  --secondary-button-hover-background: #add9fc;
  --secondary-button-hover-text: #111f2a;
  --secondary-button-text: #111F2A;
  --base-alt-colour: #A1A1AA;
  --dark-alt-colour: #18181B;
  --dull-alt-colour: #3F3F46;
  --light-colour: #eef5fa;
  --mute-colour: #E4E4E7;
  --pale-colour: #BBD6ED;
  --primary-button-border: #5eb047;
  --primary-button-hover-border: #5eb047;
  --secondary-button-border: #42abfc;
  --secondary-button-hover-border: #42abfc;
  --soft-alt-txt-colour: #DEFDD5;
  --soft-colour: #F4F4F5;
  --base-txt-colour: #5499D2;
  --dark-alt-txt-colour: #2B671A;
  --dark-txt-colour: #111F2A;
  --dull-alt-txt-colour: #5EB047;
  --dull-txt-colour: #325C7E;
  --mute-alt-txt-colour: #BDFBAC;
  --mute-txt-colour: #98C2E4;
  --soft-txt-colour: #DDEBF6;
  --swiper-theme-color: #007aff;
  --jdgm-paginate-color: #000;
  --jdgm-reviewer-name-color: #000000;
  /* radius */
  --jdgm-border-radius: 0;
  /* size */
  --header-size: 135.66px;
  --promo-height: 254px;
  --body-xs-font-size: 14px;
  --h4-font-size: 20px;
  --swiper-navigation-size: 44px;
  --h2-font-size: 22px;
  --body-font-size: 14px;
  --h3-font-size: 22px;
  --h5-font-size: 20px;
  --h6-font-size: 15px;
  /* font */
  --body-line-height: 25px;
  --body-xs-line-height: 22px;
  --font-body-family: "Plus Jakarta Sans", sans-serif;
  --h5-line-height: 26px;
  --body-lg-line-height: 29px;
  --body-sm-line-height: 22px;
  --font-heading-family: "Plus Jakarta Sans", sans-serif;
  --h1-line-height: 42px;
  --h2-line-height: 26px;
  --h3-line-height: 42px;
  --h4-line-height: 30px;
  --h6-line-height: 21px;
}
Dark theme override
@media (prefers-color-scheme: dark) {
  .dark\:ring-offset-gray-800 {
    /* color */
    --tw-ring-color: rgb(37 99 235 / var(--tw-ring-opacity, 1));
    --tw-ring-offset-color: #1f2937;
    /* opacity */
    --tw-ring-opacity: 1;
  }
}
Caveats: 6 component/width-scoped var blocks skipped

Scroll & Reveal Motion
The page reveals content as it scrolls. Measured over a full end-to-end scroll pass:

slide up — 1 element (100% of 1 reveals)
Reveal inventory
Animation	Properties	Duration	Easing	Target
transform	transform	6000ms	linear	div#swiper-wrapper-bf2c… ×1
Paste-ready reveal CSS
.reveal {
  opacity: 0;
}
.reveal.is-visible {
  animation: transform 6000ms linear both;
}
How to wire it
Observe with a single IntersectionObserver at threshold: 0.15 and rootMargin: "0px 0px -10% 0px", add is-visible, then unobserve — every measured reveal fired once on entry, none replayed on scroll-back.
The page declares no prefers-reduced-motion handling. Add the guard above anyway — it costs nothing and the original is worse for the omission.
1 in-page anchor link navigate between bands, so scroll-margin on section targets matters.
Micro-interactions
Declared transitions
Properties	Duration	Easing	Applies to
all	500ms	ease	button (155 elements)
left	500ms	ease	element (42 elements)
color, background-color, border-color, text-decoration-color	150ms	cubic-bezier(0.4, 0, 0.2, 1)	element (40 elements)
all	700ms	cubic-bezier(0.4, 0, 0.2, 1)	element (9 elements)
max-height	500ms	ease-in-out	element (5 elements)
opacity	300ms	cubic-bezier(0.4, 0, 0.2, 1)	button (3 elements)
all	300ms	cubic-bezier(0.4, 0, 0.2, 1)	element (2 elements)
opacity, filter	150ms	linear	button
Hover states (from live stylesheets)
[type="radio"]:checked:hover (3 elements) → background-color: currentcolor; border-bottom-color: transparent; border-top-color: transparent
a.button.primary__button:hover (2 elements) → background-color: var(--primary-button-hover-background); color: var(--primary-button-hover-text)
button.button.primary__button:hover (69 elements) → background-color: var(--primary-button-hover-background); color: var(--primary-button-hover-text)
a.button.secondary__button:hover (2 elements) → background-color: var(--secondary-button-hover-background); color: var(--secondary-button-hover-text); outline-color: transparent; outline-width: 2px
a.button.alt__button:hover (5 elements) → background-color: var(--primary-button-hover-background); color: var(--primary-button-hover-text)
a.button.alt__button:hover svg path (5 elements) → stroke: var(--primary-button-hover-text)
.hover\:scale-105:hover (9 elements) → transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(-
.hover\:bg-\[\#E9FEE3\]:hover (378 elements) → background-color: rgb(233 254 227 / var(--tw-bg-opacity, 1))
Active / pressed states
.product-swatch__swatch input:active → border-bottom-color: rgb(155, 219, 137); border-top-color: rgb(155, 219, 137); opacity: 1
.jm-mfp-counter .jdgm-branding-footer:active → color: white; opacity: 0.8
Interaction patterns
Sticky regions: 1 sticky elements (headers or section rails)
Scroll-snap: snap-paged carousels or sections
Hover language: predominantly *tint* (55% of 60 hover rules)
Cursor language: pointer, default, text
Component State Matrix
Actions
Primary button — 1 instance · exemplar a.button · measured 148×42px

State	Background	Text	Other
Base	#d6ca09	#000000	radius 8px · padding 9px 16px 9px 20…
Hover	#add9fc	#111f2a	outline outline-width:2px
Transition recipe: transition: all 0.5s ease

Primary button — 1 instance · exemplar a.button · measured 148×42px

State	Background	Text	Other
Base	#6200e0	#ffffff	radius 8px · padding 9px 16px 9px 20…
Hover	#add9fc	#111f2a	outline outline-width:2px
Transition recipe: transition: all 0.5s ease

Icon button — 5 instances · exemplar a.button · measured 45×42px

State	Background	Text
Base	#00000000	#ffffff
Hover	#91f974	#111f2a
Transition recipe: transition: all 0.5s ease

Form controls
Text input — 1 instance · exemplar input.w-full · measured 654×46px

State	Border	Shadow	Other
Base	0.8px solid	none	radius 8px · padding 4px 4px 4px 40px
Focus	border-…	0 0 #0000,0 0 #0000,0 0 #0000	outline outline-offs…
_+2 further archetypes were measured but not tabled._

Interaction language
Hover language: dominantly *color*. Of the 3 of 14 archetypes that respond to hover, 100% shift color (one archetype can move several at once); 11 archetypes change nothing on hover.
Focus policy: a mix of mechanisms on 1 of 14 archetypes, ring colour #00000000.
Warning: 1 rules set outline: none — the design relies on its replacement ring existing. Never port the suppression without the ring.
Tap targets: median 133×41px over 12 interactive elements; 7 (58%) fall under the 44px guidance — smallest: a#icon-user-mobile.md… 20×20px, button#close-drawer-b… 20×20px.
Cursor language: Chip / badge → grab, Ghost button → pointer, Icon button → pointer, Link → pointer, Nav item → pointer. 37 non-interactive elements also carry cursor: pointer — the page signals clickability broadly.
Overlays & Portals
These surfaces are display:none at rest; they were temporarily forced measurable off-screen and restored. Every value below is real, not inferred.

Kind	Background	Radius	Shadow	Padding	Width
Drawer	#000000b3	0px	none	0px 0px	0px
Tooltip — MTL (Mouth-to-Lung)…	#232b34	6px	none	8px 8px	163px
Tooltip — This kit includes p…	#232b34	6px	none	8px 8px	163px
Tooltip — MTL (Mouth-to-Lung)…	#232b34	6px	none	8px 8px	163px
Tooltip — RDL (Restricted-Dir…	#232b34	6px	none	8px 8px	163px
Tooltip — Nicotine Strength P…	#232b34	6px	none	8px 8px	163px
Tooltip — MTL (Mouth-to-Lung)…	#232b34	6px	none	8px 8px	163px
Tooltip — MTL (Mouth-to-Lung)…	#232b34	6px	none	8px 8px	163px
Layer, backdrop & entry
Drawer — text #000000, 16px type, transitions opacity over 0.3s.
Tooltip — z-index 10, 0.8px solid border, text #ffffff, 10px type, transitions opacity over 0.3s.
Tooltip — z-index 10, 0.8px solid border, text #ffffff, 10px type, transitions opacity over 0.3s.
Tooltip — z-index 10, 0.8px solid border, text #ffffff, 10px type, transitions opacity over 0.3s.
Tooltip — z-index 10, 0.8px solid border, text #ffffff, 10px type, transitions opacity over 0.3s.
Tooltip — z-index 10, 0.8px solid border, text #ffffff, 10px type, transitions opacity over 0.3s.
Tooltip — z-index 10, 0.8px solid border, text #ffffff, 10px type, transitions opacity over 0.3s.
Tooltip — z-index 10, 0.8px solid border, text #ffffff, 10px type, transitions opacity over 0.3s.
Scrim: modal surfaces sit on a full-screen backdrop — fill #00000080, 50% opaque, at z-index 10. The page behind is dimmed, not hidden; keep it in the DOM and inert.

Components
Ghost / outline button
Role: primary action

#00000000 background, #000000 text, border-radius 0px, padding 0px 0px, Plus Jakarta Sans 400 16px. Transitions: opacity, filter 0.15s.

Filled #d3fdc7 button
Role: secondary variant (71 instances)

#d3fdc7 background, #111f2a text, border-radius 8px, padding 11px 11px, Plus Jakarta Sans 700 16px, 0.8px solid rgb(94, 176, 71) border. Transitions: all 0.5s.

Filled #e4e4e7 button
Role: secondary variant (41 instances)

#e4e4e7 background, #000000 text, border-radius 0px, padding 16px 20px, Plus Jakarta Sans 400 13px. Transitions: all 0s.

Card — .child-links (42 instances)
#ffffff background, border-radius 0px, padding 0px 0px, no shadow.

Card — .menu-item__back-button (41 instances)
#f4f4f5 background, border-radius 0px, padding 0px 0px, no shadow.

Card — .block (18 instances)
#eef5fa background, border-radius 8px, padding 8px 8px, no shadow.

Card — .flex (17 instances)
#ffffff background, border-radius 4px, padding 8px 8px, 0.8px solid rgb(229, 231, 235) border, no shadow.

Input — input[radio] (159 instances)
#00000000 background, 2.4px solid rgb(155, 219, 137) border, border-radius 100%, 0px tall, Plus Jakarta Sans 16px.

Input — input[number] (27 instances)
#ffffff background, 0.8px solid rgb(230, 230, 232) border, border-radius 8px, 0px tall, Plus Jakarta Sans 16px.

Input — input[search] (2 instances)
#ffffff background, 0.8px solid rgb(107, 114, 128) border, border-radius 4px, 0px tall, Plus Jakarta Sans 16px. Placeholder: "Search...".

Text link (431 instances)
#111f2a text, no underline by default, Plus Jakarta Sans 400 13px. Hover transition: all 0s.

Heading stack
Level	Sample	Font	Size	Line Height	Tracking
H1	Vapestore - Online Vape Shop	Plus Jakarta Sans 800	26px	78px	normal
H2	Prefilled Pod Kits	Plus Jakarta Sans 700	15px	31px	normal
H3	Five Flavours Join the Elux Le	Plus Jakarta Sans 800	16px	52px	normal
H4	Your Bag	Plus Jakarta Sans 800	20px	30px	normal
H5	Frequently Bought	Plus Jakarta Sans 800	20px	31px	normal
H6	Ways to pay	Plus Jakarta Sans 800	15px	20px	normal
Component Census
Additional UI inventory detected on the page, with a measured exemplar per category:

Component	Count	Measured exemplar
Accordions / disclosures	8	structural
Alerts / live regions	2	structural
Tooltips	32	structural
Badges / chips	84	structural
Carousels	21	structural
Component API Sketch
Props, from the measured variants
// Every union member below was measured on this page. Nothing is invented.
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';  // measured heights: 22 / 24 / 26 / 42px

interface ButtonProps {
  variant?: ButtonVariant;   // "primary" is the default — 129 instances
  size?: ButtonSize;
  iconOnly?: boolean;      // a square icon-only variant was measured
  children: React.ReactNode;
}

type CardVariant = 'child-links' | 'menu-item__back-button' | 'block' | 'flex';
interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
}

interface FieldProps {
  type: 'input[radio]' | 'input[number]' | 'input[search]';
  // a measured :focus state exists — see the state matrix for the exact ring
  label: string;
  placeholder?: string;
}
React + Tailwind, using the measured values
// Primary button — measured: #00000000 fill, #000000 text, 0px radius, 0px 0px padding, Plus Jakarta Sans 400 16px
export function Button({ children, ...props }) {
  return (
    <button
      className="inline-flex items-center justify-center font-normal text-base rounded-none px-0 py-0 bg-[#00000000] text-[#000000] transition-colors duration-[500ms] hover:bg-[#add9fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00000000]"
      {...props}
    >
      {children}
    </button>
  );
}

// Card — measured: #ffffff surface, 0px radius, 0px 0px padding, flat, 42 instances
export function Card({ children }) {
  return <div className="bg-[#ffffff] rounded-none px-0 py-0">{children}</div>;
}
_Arbitrary values (px-[18px], bg-[#4f46e5]) appear wherever the measured number has no Tailwind scale token — that is deliberate; rounding them to the nearest token changes the design._

Do's and Don'ts
Do
Use #ffffff as the canvas and build every surface from the token table above — never invent intermediate grays
Use #111f2a exclusively for interactive moments (buttons, links, key fills) — it is the energy of the system
Snap all spacing to the 4px base unit grid
Use fully-rounded (pill, 9999px) radii for buttons and tags
Default interactive transitions to 300ms with the extracted easing tokens
Don't
Do not introduce colors outside the 13-token palette extracted above
Do not add springy/bounce motion — the source uses the timing functions listed under Tokens — Motion
Do not stack multiple shadows — keep elevation minimal and let whitespace separate content
Surfaces
Level	Name	Value	Purpose
0	Canvas	#ffffff	Page background — the base layer
1	Surface	#eef5fa	Cards, nav bars, panels floating on the canvas
2	Accent fill	#111f2a	Filled CTAs, highlight containers, brand moments
Elevation
Low: rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161, 161, 170) 0px 2px 2px 0px, rgb(244, 244, 245) 0px 0px 0px 4px (113 uses)
Mid: rgb(145, 249, 116) 0px 0px 0px 0px, rgb(94, 176, 71) 0px 0px 0px 0px, rgb(233, 254, 227) 0px 0px 0px 0px (45 uses)
High: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgb (28 uses)
Highest: rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161, 161, 170) 0px 1px 1px 0px, rgb(244, 244, 245) 0px 0px 0px 2px (27 uses)
Level 4: rgb(161, 161, 170) 0px 2px 2px 0px (4 uses)
Imagery
137 raster images and 0 inline SVGs were found. Dominant aspect ratios: 0.88:1, 1.14:1, 1:1, 1.83:1. Media is rounded at ~8px or more. Photography or rendered imagery carries the visual weight.

Assets & Media
Image inventory
Role	Rendered	Aspect	Fit	Loading	Alt
Content	343×439px @2.4x · webp	0.78:1	cover	—	missing
Thumbnail	270×439px @2.3x · webp	0.62:1	cover	—	missing
Thumbnail	313×192px @3.4x · webp	1.63:1	cover	—	missing
Thumbnail	209×238px @2.4x · jpg	0.88:1	cover	lazy	DojoLiq Apple Pear 10ml Nic S…
Thumbnail	209×238px @2.4x · jpg	0.88:1	cover	lazy	Avomi CLIQ Mini Prefilled Pod…
Thumbnail	209×238px @2.4x · jpg	0.88:1	cover	lazy	Vaporesso Xros 5 Pod Vape Kit
Thumbnail	209×238px @2.4x · jpg	0.88:1	cover	lazy	Nordic Spirit Spearmint Nic P…
Thumbnail	209×238px · png	0.88:1	cover	lazy	Just Juice Bar Range Spearmin…
Thumbnail	209×238px · png	0.88:1	cover	lazy	Oxva Xlim Pro 2 Pod Vape Kit
Thumbnail	209×238px · png	0.88:1	cover	lazy	Avomi FLIQ 4in1 Prefilled Pod…
Thumbnail	209×238px · png	0.88:1	cover	lazy	Lost Mary BM6000 Strawberry I…
Thumbnail	209×238px · png	0.88:1	cover	lazy	Elux Legend Lemon & Lime Nic …
_+54 further images on the page._

Image pipeline: 66 images (40 measured in detail); 83% ship a 2× source; 76% are lazy-loaded; 100% carry alt text; average aspect 1.35:1; formats png ×31, webp ×15, jpg ×13, svg ×7.

Icon system
They are stroke-first (84% of shapes are stroked, not filled) — keep fill: none and paint with currentColor on the stroke.

Icon property	Measured value
Icons sampled	300
Box sizes	15 / 17 / 22px
Stroke width	1.5
Corners / caps	round
Delivery	mixed
Icon fonts	5 glyphs (generic ×5)
Web fonts
Family	Format	Weight	Display	Host
swiper-icons	data	400	—	data:
JudgemeStar	woff	normal	—	data:
The resolved fallback stacks — copy them verbatim; the fallbacks are what the page shows before the webfont lands:

--font-body: "Plus Jakarta Sans", sans-serif;
--font-heading: "Plus Jakarta Sans", sans-serif;
_Headings and body share one family — the hierarchy is carried by weight and size alone._

Font delivery: mixed from fonts.googleapis.com, fonts.gstatic.com (link fonts.googleapis.com; link fonts.gstatic.com). 11 faces registered, 2 actually loaded and 9 never used — do not ship the dead weights.

Brand marks: apple-touch-icon present.

Rich media
Embeds: 4 iframes (other ×4).
_Asset notes: background-image hunt capped at 1200 elements · 400 inline SVGs — icon profile sampled the first 300 · 3 cross-origin stylesheets could not be read for @font-face rules._

Layout
Content is centered in a ~1000px max-width container. Cards use ~8px padding. The hero heading is start-aligned.

Page Blueprint
┌──────────────────────────────────────────────────────────┐
│ HEADER                                    95px · #080f15 │
├──────────────────────────────────────────────────────────┤
│ 1. CONTENT                                450px · 71% vh │
│   #ffffff · 991px container                              │
├──────────────────────────────────────────────────────────┤
│ 2. CONTENT                                445px · 70% vh │
│   #eef5fa · 4 cols · 975px container                     │
├──────────────────────────────────────────────────────────┤
│ 3. CONTENT                                202px · 32% vh │
│   #eef5fa · 975px container                              │
├──────────────────────────────────────────────────────────┤
│ 4. CONTENT                                486px · 77% vh │
│   #ffffff · 2 cols · 343px container                     │
├──────────────────────────────────────────────────────────┤
│ 5. CONTENT                               738px · 116% vh │
│   #ffffff · 1 col · 975px container                      │
├──────────────────────────────────────────────────────────┤
│ 6. CONTENT                                134px · 21% vh │
│   #ffffff · 1 col · 975px container · overlaps previous  │
├──────────────────────────────────────────────────────────┤
│ 7. LOGO WALL                              133px · 21% vh │
│   #ffffff · 12 cols · 975px container · overlaps previous│
├──────────────────────────────────────────────────────────┤
│ 8. CTA                                    288px · 45% vh │
│   #080f15 (dark) · 1 col · 664px container               │
├──────────────────────────────────────────────────────────┤
│ 9. TESTIMONIALS                          843px · 133% vh │
│   #ffffff · 1 col · 975px container                      │
├──────────────────────────────────────────────────────────┤
│ 10. CONTENT                              646px · 102% vh │
│   #f4f4f5 · 4 cols · 975px container                     │
├──────────────────────────────────────────────────────────┤
│ 11. FAQ                                 1206px · 190% vh │
│   #ffffff · 2 cols · 975px container                     │
├──────────────────────────────────────────────────────────┤
│ 12. CONTENT                              704px · 111% vh │
│   #ffffff · 5 cols · 670px container                     │
├──────────────────────────────────────────────────────────┤
│ FOOTER                5 columns · 602px · #080f15 (dark) │
└──────────────────────────────────────────────────────────┘
#	Band	Height	Background	Container	Padding	Columns
1	Content	450px (71% vh)	#ffffff	991px / 16px gutter	0px	—
2	Content	445px (70% vh)	#eef5fa	975px / 16px gutter	15px / 20px	4
3	Content	202px (32% vh)	#eef5fa	975px / 16px gutter	10px / 1px	—
4	Content	486px (77% vh)	#ffffff	343px / 0px gutter	18px	2
5	Content	738px (116% vh)	#ffffff	975px / 16px gutter	18px	1
6	Content	134px (21% vh)	#ffffff	975px / 16px gutter	0px	1
7	Logo wall	133px (21% vh)	#ffffff	975px / 0px gutter	15px / 18px	12
8	CTA	288px (45% vh)	#080f15 dark	664px / 0px gutter	0px	1
9	Testimonials	843px (133% vh)	#ffffff	975px / 16px gutter	36px	1
10	Content	646px (102% vh)	#f4f4f5	975px / 16px gutter	36px	4
11	FAQ	1206px (190% vh)	#ffffff	975px / 16px gutter	36px	2
12	Content	704px (111% vh)	#ffffff	670px / 0px gutter	0px	5
How to rebuild each band
1 · Content — 450px tall, about 71% of the viewport. Background #ffffff; inner surfaces use #6200e0 on 33% of its elements and #91f974 on 33% of its elements. Content sits in a 991px container with 16px side padding, vertical padding 0px top / 0px bottom. Text is #ffffff at 1:1 against the band, set in Plus Jakarta Sans 700 16px/22px on 20% of its text and Plus Jakarta Sans 700 22px/22px on 20% of its text.

2 · Content — 445px tall, about 70% of the viewport. Background #eef5fa; inner surfaces use #111f2a on 100% of its elements. Content sits in a 975px container with 16px side padding, vertical padding 15px top / 20px bottom, 4 columns at a 0px row / 20px column gap, items no narrower than 229px. Text is #000000 at 19.1:1 against the band, set in Plus Jakarta Sans 400 13px/22px on 31% of its text and Plus Jakarta Sans 700 15px/31px on 31% of its text.

3 · Content — 202px tall. Background #eef5fa. Content sits in a 975px container with 16px side padding, vertical padding 10px top / 1px bottom. Text is #000000 at 19.1:1 against the band, set in Plus Jakarta Sans 400 14px/22px on 86% of its text and Plus Jakarta Sans 800 22px/31px on 14% of its text.

4 · Content — 486px tall, about 77% of the viewport. Background #ffffff. Content sits in a 343px container with 0px side padding, vertical padding 18px top / 18px bottom, 2 columns at a 0px gap, items no narrower than 45px. Text is #ffffff at 1:1 against the band, set in Plus Jakarta Sans 700 14px/22px on 31% of its text and Plus Jakarta Sans 400 16px/22px on 31% of its text.

5 · Content — 738px tall, about 116% of the viewport. Background #ffffff; inner surfaces use #e16bde on 33% of its elements and #d3fdc7 on 17% of its elements. Content sits in a 975px container with 16px side padding, vertical padding 18px top / 18px bottom, a single column. Text is #000000 at 21:1 against the band, set in Plus Jakarta Sans 700 13px/22px on 40% of its text and Plus Jakarta Sans 700 12px/17px on 20% of its text.

6 · Content — 134px tall. Background #ffffff; inner surfaces use #eef5fa on 44% of its elements and #e5e7eb on 22% of its elements. Content sits in a 975px container with 16px side padding, vertical padding 0px top / 0px bottom, a single column. Text is #111f2a at 16.8:1 against the band, set in Plus Jakarta Sans 400 13px/22px on 75% of its text and Plus Jakarta Sans 700 13px/22px on 7% of its text. Watch out: it overlaps the band above — negative margin or a translate, not flow.

7 · Logo wall — 133px tall. Background #ffffff. Content sits in a 975px container with 0px side padding, vertical padding 15px top / 18px bottom, 12 columns at a 0px gap, items no narrower than 89px. Watch out: it overlaps the band above — negative margin or a translate, not flow.

8 · CTA — 288px tall. Background #080f15 (dark); inner surfaces use #ffffff on 67% of its elements and #222e36 on 17% of its elements. Content sits in a 664px container with 0px side padding, vertical padding 0px top / 0px bottom, a single column. Text is #91f974 at 14.7:1 against the band, set in Plus Jakarta Sans 400 13px/22px on 63% of its text and Plus Jakarta Sans 700 13px/22px on 13% of its text. Watch out: this is a dark band inside a light page — text, borders and button fills all invert here.

Page chrome
Header — 95px tall, position: static, background #080f15, 975px inner container, 0px side padding, overlaps the hero rather than pushing it down.
Footer — 5 columns (row-cluster), column widths 118 / 118 / 118 / 118 / 118px, 602px tall, background #080f15 (dark band), padding 36px / 36px, 670px inner container.
Grid & Composition
Container widths: 980px on 8 bands · 340px on 1 band · 660px on 1 band. The widest measured column is 980px — build the shell at that width and let narrower bands opt down.

Grid recipes
Where	Display	Columns	Gap	Align / justify
div.category-columns__grid	grid	4 · repeat(4, 1fr)	0px row / 20px column	normal / normal
div.flex	flex / row	2	0px	normal / space-between
div.tabbed-brands__header-wrapper	flex / row	1	16px	center / space-between
div.logo-inner	flex / row	1	0px row / 40px column	center / space-between
div#swiper-wrapper-bf2c7d23c0ffdf…	flex / row	12	0px	center / normal
div.text-white	flex / column	1	33px	normal / normal
div.reviews-slider__header-wrapper	flex / row	1	12px row / 0px column	center / space-between
div.blogs__wrapper	flex / row	4	20px	normal / normal
div.faq-accordions__header-wrapper	flex / row	2	12px row / 0px column	center / space-between
div.flex	flex / row	5	0px row / 20px column	normal / normal
_+6 further measured containers._

Z-index layer stack
z	Role	Position	Element
100	Header	sticky	div.header-section · 1007×134px
50	Decor	absolute	a.absolute · 343×439px
50	Decor	absolute	a.absolute · 270×439px
50	Decor	absolute	a.absolute · 313×192px
50	Decor	absolute	a.absolute · 145×224px
50	Decor	absolute	a.absolute · 145×224px
20	Decor	absolute	a.absolute · 209×238px
20	Decor	absolute	a.absolute · 209×238px
20	Decor	absolute	a.absolute · 209×238px
20	Decor	absolute	a.absolute · 209×238px
Z-index scale in use: 10 · 20 · 50 · 100 — reuse exactly these 4 steps, do not invent intermediate values.

Vertical rhythm: bands sit a median 0px apart, most commonly 0px, across 12 bands and section padding clusters at 20px (top: 36px ×3, 16px ×2, 20px ×2).

Landing Page Anatomy
The page tells a conversion story in this order — rebuild sections in this sequence:

Order	Section	Heading / evidence	Key elements
1	Content section	#shopify-section-template--27288677253501__slideshow_H38QqL	CTA: "Shop Now" + "Shop Now" · 6 images
2	Hero	Vapestore - Online Vape Shop	CTA: "Shop All Categories" + "Shop Now" + "Shop Now" · 9 images
3	Content section	Your Trusted Source for All Vaping Needs	—
4	Testimonials	:root{ --promo-height: 254px } #shopify-section-template--27	10 images
5	Testimonials	Trending Vape Products	CTA: "Shop All Brands" + "Trending" + "E-liquids" · 279 images
6	Content section	#shopify-section-template--27288677253501__scrolling_logos_n	12 images
7	CTA band	Subscribe to our newsletter!	CTA: "Sign Me Up" + "Sign Me Up" · 1 images
8	Testimonials	Latest Vapestore Reviews	19 images
9	Content section	Latest Vape News: Expert Tips & Advice	14 images
10	Footer	FAQs	CTA: "Got a question? Contact Us" · 9 images
Section flow: content → hero → content → testimonials → testimonials → content → cta-band → testimonials → content → footer

Hero & Conversion
Headline: "Vapestore - Online Vape Shop"
Subheadline: "Easy-to-use kits with prefilled pods. Pair with your favourite compatible refill pod flavours for a flexible alternative to disposable vapes"
Nav anatomy: "Vapestore" logo · 7 links ("Account Summary", "Orders", "Account Information", "Address Book", "Vapestore plus+"…) · CTA: "View All", "0"
CTA repetition: "Back" ×41, "Add to bag" ×40, "-" ×27, "+" ×27, "Add to Bag" ×27, "Shop Now" ×12, "View All" ×2, "Sign Me Up" ×2 — the same conversion ask returns at every scroll depth
Full CTA copy inventory: "Back" · "Add to bag" · "-" · "+" · "Add to Bag" · "Shop Now"
Signature Devices
These patterns define the site's identity — repeat them across every new page:

The Pill Button Language — every interactive element is fully rounded (9999px radius) — buttons, tags, inputs and badges share one geometry
Card-on-Canvas Contrast — #eef5fa surfaces float on a #ffffff canvas — separation comes from background contrast, not shadows
Content & Copy
Copy per band
Band	Eyebrow	Heading	CTA
CTA band	—	—	"Shop Now" + "Go to slide 1"
Hero	—	Vapestore - Online Vape Shop	"Shop Now"
Content	—	Your Trusted Source for All Vaping Needs	—
Content	—	Trending Vape Products	"Trending" + "E-liquids"
CTA band	—	Subscribe to our newsletter!	"Sign Me Up"
Testimonials	—	Latest Vapestore Reviews	—
Content	—	Latest Vape News: Expert Tips & Advice	"Explore the latest ad…" + "Get a hands-on …
FAQ	—	FAQs	"Got a question? Conta…"
_4 further bands carried no headline copy._

Navigation copy
Actions: "0" (secondary)
Shape: logo reads "Account Summary Orders …" and is an image/SVG, unknown alignment, a mobile menu button exists
Footer columns
**** — Contact Us, Rewards Scheme, Delivery Information, Warranty & Returns
**** — About Us, Brand Directory, Vape Discount Codes, Black Friday, Cyber Monday, Store Finder, Environment Policy, Quality Policy
**** — Vaping Blogs, Classic Vaping vs Sub…, Vaping Top Tips, Battery Safety, Vaping Terms
**** — E-Liquid, Classic Vape Kits (PG…, Sub-Ohm Vape Kits (VG…, Tanks, Coils, Accesories, Best Sellers
**** — Privacy Policy, Terms & Conditions, Cookie Policy, Age Verification, Direct Marketing Poli…, PECR Policy
Also in the footer — legal line "© 2026 Vapestoreall rights reserved"
Pricing table
Tier	Price	Badge	CTA	Key features
—	£11.95,	—	Shop Now	—
—	£10	—	Shop Now	—
—	£1.99	New!	—	—
—	£10	—	—	—
—	£2	—	—	—
Forms
Other form — ue (text); submits with "Sign Me Up" via POST.
FAQ
"How is Vaping an Alternative to Smoking?"
"Which Vape Kit Should I Choose?"
"Top Prefilled Pod Vape to use in 2025?"
"Which E-Liquid Should I Use?"
"Which Nicotine Strength Is Right For Me?"
"How To Choose The Best E-Liquid Flavour"
"What Vape Coils Do I Need To Use?"
"What Are Box Mods?"
_Built with details disclosures._

Testimonials
Latest Vapestore Reviews Rated 'Excellent' by 19,176+ happy customers on TrustPilot
"Customer service were really helpful explaining the products & pods.Also exactly correct in advising the strength of pod liquid I would need after I had state…
"I been buying liquids, vapes and vape pods from this website for nearly two years, they have good deals always for vape liquids and once I ordered vape it cam…
Logo wall: 5 / 12 · IVG · 6 / 12 · Vaporesso · 7 / 12 · Elf Bar · 8 / 12 · Double Drip · 9 / 12 · Bar Juice · 10 / 12 · Riot Squad — 12 marks shown as social proof.

Voice & tone
Heading case: Title Case — 17 sentence, 83 title, 0 upper across 100 headings. Match the dominant one exactly; mixing reads as a different brand.
Heading length: 5.3 words on average over 30 headings — medium; a full clause per heading.
Person: first person plural — the company speaks about itself (you ×22, we ×39, i ×39).
Questions: 23% of headlines are questions.
Reading level: standard — 16.3 words per sentence, 5 letters per word.
Jargon: low (0% of words).
CTA verbs: "shop" ×4, "sign" ×2, "explore" ×1, "get" ×1 — every button starts with one of these.
Signature phrases: "prefilled pod" ×5, "online vape" ×3, "vape shop" ×3, "pod kit" ×3, "vapestore online" ×2, "trusted source" ×2 — repeat them; they are the vocabulary of the brand.
Punctuation & emoji: 4 exclamation marks and 0 emojis in the captured copy — stay inside that budget.
Document metadata: title "Vapestore | UK's #1 Online Vape Shop for E-Liquid, Vape Kits & Coils"; description "Shop trusted vapes and e-liquids at our leading vape shop online. Discover top brands, expert support, and fast UK delivery. Order now for …"; heading hierarchy H1 ×1 · H2 ×10 · H3 ×12; lang en.

Accessibility Profile
Contrast discipline: 92% of measured text usage clears WCAG AA (4.5:1)
Focus design: 42 :focus rules in stylesheets
Reduced motion: no prefers-reduced-motion handling found — add it when rebuilding
Semantics: 10 landmarks · 74 ARIA-carrying elements · 100% of images have alt text
Responsive
Breakpoints declared in stylesheets: 36rem, 390px, 430px, 500px, 600px, 601px, 749px, 767px, 768px, 789.98px, 800px, 989px, 990px, 991px, 992px, 1025px, 1225px, 1280px, 1440px, 1800px, 2000px.

Current viewport analyzed at 1022×634 (desktop-scale view). The site also uses container queries for component-level responsiveness.

Responsive Behaviour
Strategy: mobile-first (min-width queries build up) — 154 min-width rules, 32 max-width rules, 2 range rules.

Ladder: the 12 breakpoints match no standard scale — they are custom to this site.

Breakpoint matrix
Tier	Query	Layout	Spacing	Type	Hidden / shown
xs	≥390px	max-width 390px	—	font-size 17px	—
<sm	≤500px	width max-content	padding-top 0px	—	—
<sm	≤576px	height 3px	—	—	—
sm	≥600px	2 col	—	—	—
<sm	≤600px	max-width 140px	margin-top 0px	font-size 20px	—
sm	≥601px	—	—	—	−1
<md	≤749px	max-width 100%	—	—	—
<md	≤767px	width 100%	padding-bottom 0px	—	—
Across the 12 stops the ladder rewrites 70 declarations in 42 rules, the heaviest being <sm at 15. Nothing else moves — anything not in the matrix above holds at every width.

Mobile adaptation
Visibility: 3 selectors hidden and 0 revealed by width (other).
Modern CSS in play
Container queries are in use — components size to their container, not the viewport. Port the @container rules or the layout will not match at intermediate widths.
Intrinsic grids — auto-fit / minmax() do the column maths instead of breakpoints.
forced-colors (Windows high contrast) is handled.
Orientation queries are used.
Feature queries: screen and (forced-colors: active) · (forced-colors: active) · screen and (max-width: 800px) and… — progressive enhancement is deliberate here.
Fluid type: sizes interpolate with clamp() / viewport units rather than stepping at breakpoints.

_Caveats: 9 further width conditions were dropped past the 12-breakpoint cap. 2 declared breakpoint values had no capturable declarations (cross-origin or nested stylesheets). rem/em lengths were converted at the assumed 16px root font size._

Agent Prompt Guide
Quick Color Reference

canvas: #ffffff
primary text: #000000
secondary text: #2563eb
muted text: #3f3f46
brand accent: #111f2a
surface: #eef5fa
border: #e5e7eb
border strong: #6b7280
Example Component Prompts

Rebuild the full landing page in exactly this order: content → hero → content → testimonials → testimonials → content → cta-band → testimonials → content → footer. Use the Hero & Conversion spec for the first screen, one component recipe per section, and the section rhythm from the Layout metrics.
Create the primary button: #00000000 background, #000000 text, border-radius 0px, padding 0px 0px, font Plus Jakarta Sans 400 16px. On hover, transition opacity, filter 0.15s.
Create a card: #ffffff background, border-radius 0px, padding 0px 0px, no shadow.
Create the display heading: Plus Jakarta Sans weight 700, 42px, line-height 0.48, #000000 on #ffffff.
Quick Start
CSS Custom Properties
:root {
  /* Colors */
  --color-bg-canvas: #ffffff;
  --color-text-primary: #000000;
  --color-text-secondary: #2563eb;
  --color-text-muted: #3f3f46;
  --color-accent: #111f2a;
  --color-bg-surface: #eef5fa;
  --color-border: #e5e7eb;
  --color-border-strong: #6b7280;
  --color-gray-dark: #a1a1aa;
  --color-green-light: #d3fdc7;
  --color-gray-deep: #18181b;
  --color-green-dark: #5eb047;
  --color-blue-light: #bbd6ed;

  /* Typography — Font Families */
  --font-plus-jakarta-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-helvetica: 'Helvetica', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 42px;
  --leading-display: 0.48;
  --text-heading-lg: 30px;
  --leading-heading-lg: 1.33;
  --text-heading: 26px;
  --leading-heading: 3;
  --text-heading-sm: 22px;
  --leading-heading-sm: 1.41;
  --text-subheading: 20px;
  --leading-subheading: 1.55;
  --text-body: 17px;
  --leading-body: 1.38;
  --text-small: 15px;
  --leading-small: 1.57;
  --text-caption: 13px;
  --leading-caption: 1.69;

  /* Layout */
  --page-max-width: 1000px;
  --card-padding: 8px;
  --element-gap: 8px;
  --spacing-unit: 4px;

  /* Border Radius */
  --radius-pill: 9999px;
  --radius-4: 4px;
  --radius-8: 8px;
  --radius-12: 12px;
  --radius-16: 16px;

  /* Shadows */
  --shadow-sm: rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161, 161, 170) 0px 2px 2px 0px, rgb(244, 244, 245) 0px 0px 0px 4px;
  --shadow-md: rgb(145, 249, 116) 0px 0px 0px 0px, rgb(94, 176, 71) 0px 0px 0px 0px, rgb(233, 254, 227) 0px 0px 0px 0px;
  --shadow-lg: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgb;
  --shadow-xl: rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161, 161, 170) 0px 1px 1px 0px, rgb(244, 244, 245) 0px 0px 0px 2px;
  --shadow-4: rgb(161, 161, 170) 0px 2px 2px 0px;

  /* Motion */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-moderate: 500ms;
  --duration-slow: 6000ms;
  --ease-custom-1: ease;
  --ease-in-out-standard: cubic-bezier(0.40, 0.00, 0.20, 1.00);
  --ease-custom-3: ease-in-out;
  --ease-custom-4: linear;
  --ease-custom-5: cubic-bezier(0.55, 0.06, 0.68, 0.19);

  /* Iconography */
  --icon-stroke: 1.5;
  --icon-size: 17px;
}
Tailwind v4
@theme {
  /* Colors */
  --color-bg-canvas: #ffffff;
  --color-text-primary: #000000;
  --color-text-secondary: #2563eb;
  --color-text-muted: #3f3f46;
  --color-accent: #111f2a;
  --color-bg-surface: #eef5fa;
  --color-border: #e5e7eb;
  --color-border-strong: #6b7280;
  --color-gray-dark: #a1a1aa;
  --color-green-light: #d3fdc7;
  --color-gray-deep: #18181b;
  --color-green-dark: #5eb047;
  --color-blue-light: #bbd6ed;

  /* Typography */
  --font-plus-jakarta-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --font-helvetica: 'Helvetica', ui-sans-serif, system-ui, sans-serif;
  --text-display: 42px;
  --text-heading-lg: 30px;
  --text-heading: 26px;
  --text-heading-sm: 22px;
  --text-subheading: 20px;
  --text-body: 17px;
  --text-small: 15px;
  --text-caption: 13px;

  /* Shadows */
  --shadow-sm: rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161, 161, 170) 0px 2px 2px 0px, rgb(244, 244, 245) 0px 0px 0px 4px;
  --shadow-md: rgb(145, 249, 116) 0px 0px 0px 0px, rgb(94, 176, 71) 0px 0px 0px 0px, rgb(233, 254, 227) 0px 0px 0px 0px;
  --shadow-lg: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgb;
  --shadow-xl: rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161, 161, 170) 0px 1px 1px 0px, rgb(244, 244, 245) 0px 0px 0px 2px;
  --shadow-4: rgb(161, 161, 170) 0px 2px 2px 0px;

  /* Motion */
  --animate-duration-fast: 150ms;
  --animate-duration-base: 300ms;
  --animate-duration-moderate: 500ms;
  --animate-duration-slow: 6000ms;
}
Rebuild Checklist
Build in this order. Every item carries the measured numbers it needs — nothing here requires going back to the page.

Paste the
:root
block from
Design Token System
— 73 custom properties across 10 naming groups. Nothing below should hard-code a value that exists there.
Add the dark-theme override block — 0 variables change between light and dark.
Set the type scale: 42 / 30 / 26 / 22 / 20 / 17 / 15 / 13px over 8 steps, Plus Jakarta Sans + Helvetica.
Set the spacing scale: 4 / 6 / 8 / 10 / 11 / 12 / 16 / 20px on a 4px base unit.
Set the radius scale: 4px (button), 8px (button), 12px (card), 16px (card), 20px (card).
Define 5 elevation steps, lightest first:
rgb(228, 228, 231) 0px 0px 0px 1px, rgb(161…
,
rgb(145, 249, 116) 0px 0px 0px 0px, rgb(94,…
,
rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0…
.
Build the shell: a 980px max-width centred container with 16px side gutters.
Paint the canvas
#ffffff
and set the body text colour from the palette — this is a light page.
Build the header: 95px tall,
position: sticky; top: 0
, background
#080f15
.
Band 1 —
Content
: 450px tall,
#ffffff
background, 991px container, 0px top padding.
Band 2 —
Content
: 445px tall,
#eef5fa
background, 975px container, 15px top padding, 4 columns. Headline: "Vapestore - Online Vape Shop".
Band 3 —
Content
: 202px tall,
#eef5fa
background, 975px container, 10px top padding. Headline: "Your Trusted Source for All Vaping Needs".
Band 4 —
Content
: 486px tall,
#ffffff
background, 343px container, 18px top padding, 2 columns.
Band 5 —
Content
: 738px tall,
#ffffff
background, 975px container, 18px top padding. Headline: "Trending Vape Products".
Band 6 —
Content
: 134px tall,
#ffffff
background, 975px container, 0px top padding.
Band 7 —
Logo wall
: 133px tall,
#ffffff
background, 975px container, 15px top padding, 12 columns.
Band 8 —
CTA
: 288px tall,
#080f15
background, 664px container, 0px top padding. Headline: "Subscribe to our newsletter!".
Band 9 —
Testimonials
: 843px tall,
#ffffff
background, 975px container, 36px top padding. Headline: "Latest Vapestore Reviews".
Band 10 —
Content
: 646px tall,
#f4f4f5
background, 975px container, 36px top padding, 4 columns. Headline: "Latest Vape News: Expert Tips & Advice".
Band 11 —
FAQ
: 1206px tall,
#ffffff
background, 975px container, 36px top padding, 2 columns. Headline: "FAQs".
Band 12 —
Content
: 704px tall,
#ffffff
background, 670px container, 0px top padding, 5 columns.
Build the primary button:
#00000000
on
#000000
text, 0px radius, 0px 0px padding, Plus Jakarta Sans 400 1… — 129 instances on the page.
Build the secondary button: 0.8px solid #5eb047 border, 8px radius, 11px 11px padding,
#111f2a
text.
Build the card:
#ffffff
surface, 0px radius, 0px 0px padding, no border, flat — 42 instances.
Build the text input: 0px tall, 2.4px solid #9bdb89 border, 100% radius, Plus Jakarta Sans 16px.
Build the footer: 5 link columns, 602px tall,
#080f15
background.
Wire hover states in the page's own language — *color* on 3 of 14 archetypes. Copy the deltas from the state matrix; do not invent a lift where the page tints.
Wire focus: mixed, ring
#00000000
.
Set the transition recipe: fast 150ms, base 300ms, moderate 500ms, easing
ease
.
Wire the scroll reveal:
transform
on transform over 6000ms, fired once by IntersectionObserver.
Add the breakpoint ladder: ≥390px / ≤500px / ≤576px / ≥600px / ≤600px / ≥601px / ≤749px / ≤767px / 768–991px / ≥768px / ≤768px / ≤790px, mobile-first.
Accessibility polish before shipping: 92% of text already clears 4.5:1 — fix the remainder rather than copying it; 7 tap targets sit under 44px — pad them out; no
prefers-reduced-motion
handling exists — add it; there is no skip link — add one.
Extraction Coverage
What was actually measured, and where the measurement stops. Read this before trusting a number above.

Scan: 6890 elements styled · viewport 1022×634px · elapsed 5787ms.
Deep pass: mode full, 14 scroll passes over 14 planned steps of 507px.
Page: 6334px tall (10 viewports), grown from 6449px as lazy content materialised.
Lazy loading: DOM went 8017 → 8017 nodes.
Virtualised list detected. Anything measured inside it is a sample, not the whole list.
Frames: 4 iframes, 2 cross-origin and therefore unreadable.
Bands sampled: 10 viewport-height slices covering the full page.
Stylesheets: 58 read, 3 blocked by CORS, 2 recovered by refetch — rules in the blocked sheets are invisible to every section above.
States & overlays: 8 hidden surfaces revealed and measured; 14 component archetypes resolved from 123 indexed pseudo-state rules; 11 live focus probes.
Restoration: verified — every injected style and attribute was removed after measuring.
Inventory: 12 sections · 16 grid containers · 20 stacking layers · 40 images, 2 font faces · 12 copy bands · 73 custom properties · 12 breakpoints analysed.
Limits reached during the scan
2 cross-origin iframes skipped
1 further stylesheets not indexed (cap 60)
52 further hidden overlays not measured (cap 8)
background-image hunt capped at 1200 elements
6 component/width-scoped var blocks skipped
9 further width conditions were dropped past the 12-breakpoint cap.
2 declared breakpoint values had no capturable declarations (cross-origin or nested stylesheets).
Known Gaps
2 cross-origin iframes skipped
1 cross-origin stylesheet not read (agechecked.verifico.io) — granting DesignMD site access lets it fetch these and recover their hover/keyframe rules
assets: background-image hunt capped at 1200 elements
assets: 400 inline SVGs — icon profile sampled the first 300
assets: 3 cross-origin stylesheets could not be read for @font-face rules 
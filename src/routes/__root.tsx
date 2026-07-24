import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportPlatformError } from "../lib/error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportPlatformError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "SUBMERGE – AI-Powered Ocean Intelligence Platform & Marine Analytics" },
      { name: "description", content: "SUBMERGE is a research-grade ocean intelligence platform using AI environmental analytics, oceanographic telemetry, marine pollution tracking, and coral conservation data." },
      { name: "keywords", content: "ocean intelligence platform, marine pollution monitoring, AI environmental analytics, ocean data visualization, ocean health index, microplastics telemetry, chemical spill detection, marine conservation software" },
      { name: "author", content: "SUBMERGE Intelligence Team" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "theme-color", content: "#00e5ff" },
      { name: "application-name", content: "SUBMERGE" },
      { property: "og:title", content: "SUBMERGE – AI-Powered Ocean Intelligence Platform" },
      { property: "og:description", content: "Real-time ocean health monitoring, marine pollution detection, AI environmental telemetry, and ecosystem recovery solutions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://submerge-ocean.intel" },
      { property: "og:site_name", content: "SUBMERGE Ocean Intelligence" },
      { property: "og:image", content: "https://submerge-ocean.intel/favicon.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SUBMERGE – AI-Powered Ocean Intelligence Platform" },
      { name: "twitter:description", content: "Monitor global ocean health, marine pollution, toxic chemical telemetry, and coral reef conservation in real-time." },
      { name: "twitter:image", content: "https://submerge-ocean.intel/favicon.png" },
    ],
    links: [
      { rel: "canonical", href: "https://submerge-ocean.intel/" },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SUBMERGE",
  "alternateName": ["SUBMERGE Ocean Intel", "SUBMERGE AI Platform"],
  "url": "https://submerge-ocean.intel",
  "description": "AI-powered ocean intelligence, marine pollution monitoring, and oceanographic environmental analytics platform.",
  "publisher": {
    "@type": "Organization",
    "name": "SUBMERGE Intelligence Team"
  }
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SUBMERGE Ocean Intelligence Platform",
  "applicationCategory": "EnvironmentalAnalytics",
  "operatingSystem": "Web Browser",
  "url": "https://submerge-ocean.intel",
  "description": "Research-grade platform for monitoring ocean pollution, microplastics accumulation, marine ecosystems, biodiversity, and AI-driven environmental recovery.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Real-time ocean health index tracking",
    "Microplastic waste density mapping",
    "Chemical compound & toxic spill analysis",
    "Industrial pollution source detection",
    "Marine life biodiversity monitoring",
    "Coral reef health diagnostics",
    "AI-generated ocean recovery timelines"
  ]
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SUBMERGE Ocean Intelligence",
  "url": "https://submerge-ocean.intel",
  "logo": "https://submerge-ocean.intel/favicon.png",
  "description": "Advanced oceanographic intelligence, marine conservation software, and AI pollution analytics.",
  "knowsAbout": [
    "Oceanography",
    "Marine Biology",
    "Ocean Pollution Monitoring",
    "Coral Reef Conservation",
    "Environmental Data Science"
  ]
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

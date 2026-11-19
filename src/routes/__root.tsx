
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dagim Tadesse — Software Engineer & AI/ML Developer" },
      {
        name: "description",
        content:
          "Portfolio of Dagim Tadesse — Software Engineering student at AASTU building at the intersection of AI, data, and real software.",
      },
      { name: "author", content: "Dagim Tadesse" },
      { property: "og:title", content: "Dagim Tadesse — Software Engineer & AI/ML Developer" },
      {
        property: "og:description",
        content:
          "Building at the intersection of AI, data, and real software. Open to internships.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dagim Tadesse — Software Engineer & AI/ML Developer" },
      { name: "description", content: "Dagim's Digital Canvas is a personal portfolio website showcasing a Software Engineering student's skills." },
      { property: "og:description", content: "Dagim's Digital Canvas is a personal portfolio website showcasing a Software Engineering student's skills." },
      { name: "twitter:description", content: "Dagim's Digital Canvas is a personal portfolio website showcasing a Software Engineering student's skills." },
      { property: "og:image", content: "https://dagim-tadesse.vercel.app/og-image.jpeg?v=2" },
      { name: "twitter:image", content: "https://dagim-tadesse.vercel.app/og-image.jpeg?v=2" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Syne:wght@500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/logo.jpg?v=2",
        type: "image/jpeg",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo.jpg?v=2",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Syne:wght@500;600;700;800&display=swap"
        />
        <link rel="icon" href="/logo.jpg?v=2" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpg?v=2" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg?v=2" />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-[#00ffd1]/25 selection:text-[#00ffd1]">
        <div
          id="boot-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090e] transition-opacity duration-300"
        >
          <div className="relative flex flex-col items-center gap-5 px-6 text-center">
            {/* Ambient glow */}
            <div className="absolute -inset-10 rounded-full bg-[#00ffd1]/10 blur-3xl pointer-events-none" />
            
            {/* Logo / Monogram */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00ffd1]/30 bg-[#0d121c] shadow-[0_0_30px_rgba(0,255,209,0.2)]">
              <span className="font-display text-2xl font-black tracking-wider text-white">
                DT<span className="text-[#00ffd1]">.</span>
              </span>
              <div className="absolute -inset-1 animate-spin rounded-2xl border border-transparent border-t-[#00ffd1]/60" />
            </div>

            <div>
              <p className="font-display text-lg font-bold tracking-tight text-white">
                Dagim Tadesse
              </p>
              <div className="mt-1 flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ffd1]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#00ffd1]/80">
                  Initializing Portfolio Core
                </span>
              </div>
            </div>
          </div>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const hideBootScreen = () => {
      const bootScreen = document.getElementById("boot-screen");
      if (bootScreen) {
        bootScreen.style.opacity = "0";
        bootScreen.style.pointerEvents = "none";
        bootScreen.style.transition = "opacity 240ms ease";
        window.setTimeout(() => {
          bootScreen.remove();
        }, 240);
      }
    };

    if (document.readyState === "complete") {
      hideBootScreen();
      return;
    }

    window.addEventListener("load", hideBootScreen, { once: true });

    return () => {
      window.removeEventListener("load", hideBootScreen);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster theme="dark" position="bottom-right" richColors />
      <Outlet />
    </QueryClientProvider>
  );
}

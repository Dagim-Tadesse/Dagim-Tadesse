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
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Dagim Tadesse — Software Engineer & AI/ML Developer" },
      { name: "description", content: "Dagim's Digital Canvas is a personal portfolio website showcasing a Software Engineering student's skills." },
      { property: "og:description", content: "Dagim's Digital Canvas is a personal portfolio website showcasing a Software Engineering student's skills." },
      { name: "twitter:description", content: "Dagim's Digital Canvas is a personal portfolio website showcasing a Software Engineering student's skills." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7a6e1230-c155-43c7-bd47-6a24883092cc/id-preview-a7ca53b6--cced11b6-1fa3-49a5-99dd-802988b294c8.lovable.app-1778322765802.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7a6e1230-c155-43c7-bd47-6a24883092cc/id-preview-a7ca53b6--cced11b6-1fa3-49a5-99dd-802988b294c8.lovable.app-1778322765802.png" },
    ],
    links: [
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
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="icon" href="/logo.jpg?v=2" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpg?v=2" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg?v=2" />
      </head>
      <body>
        <div
          id="boot-screen"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <div className="h-12 w-12 rounded-full border border-primary/30 border-t-primary animate-spin" />
            <div>
              <p className="font-display text-xl font-semibold tracking-tight text-foreground">
                Loading Dagim Tadesse
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Preparing the portfolio experience...
              </p>
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
        bootScreen.style.transition = "opacity 220ms ease";
        window.setTimeout(() => {
          bootScreen.remove();
        }, 220);
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
      <Outlet />
    </QueryClientProvider>
  );
}

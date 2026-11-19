import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Code2,
  FolderGit2,
  GraduationCap,
  Mail,
  User,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Copy,
  Terminal,
  Trophy,
  FileDown,
} from "lucide-react";
import { toast } from "sonner";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onNavigate: (id: string) => void;
  onOpenConsole?: () => void;
}

export function CommandMenu({ open, setOpen, onNavigate, onOpenConsole }: CommandMenuProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !open)) {
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("dagimtadesse25@gmail.com");
    toast.success("Email copied to clipboard!", {
      description: "dagimtadesse25@gmail.com",
    });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="relative border-b border-white/10 bg-[#0d121c] px-3 py-1">
        <CommandInput
          placeholder="Type a command, jump to a section, or ask..."
          className="text-sm font-sans"
        />
      </div>
      <CommandList className="max-h-[380px] bg-[#0d121c] font-sans text-sm text-slate-200">
        <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">
          No matching results found.
        </CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => onNavigate("about"))}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <User className="h-4 w-4 text-[#00ffd1]" />
            <span>About Dagim & Philosophy</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => onNavigate("projects"))}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <FolderGit2 className="h-4 w-4 text-[#00ffd1]" />
            <span>Selected Projects & Demos</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => onNavigate("skills"))}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <Code2 className="h-4 w-4 text-[#00ffd1]" />
            <span>Technical Toolkit & Stack</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => onNavigate("experience"))}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>Experience, Tech Lead & Hackathons</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => onNavigate("contact"))}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <Mail className="h-4 w-4 text-[#00ffd1]" />
            <span>Contact & Inquiries</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="bg-white/10" />

        <CommandGroup heading="Interactive Demos">
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                onNavigate("home");
                if (onOpenConsole) onOpenConsole();
              })
            }
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <Terminal className="h-4 w-4 text-purple-400" />
            <span>Launch Live AI & ML Simulator</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.open("https://price-guard-ai.vercel.app/", "_blank");
              })
            }
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Open PriceGuard-AI Live App</span>
            <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="bg-white/10" />

        <CommandGroup heading="Quick Actions & Socials">
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.open("/Dagim_Tadesse_CV.pdf", "_blank");
              })
            }
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <FileDown className="h-4 w-4 text-[#00ffd1]" />
            <span>Download Curriculum Vitae (PDF)</span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">PDF</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(copyEmail)}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <Copy className="h-4 w-4 text-[#00ffd1]" />
            <span>Copy Email Address</span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">
              dagimtadesse25@gmail.com
            </span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.open("https://github.com/Dagim-Tadesse", "_blank");
              })
            }
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <Github className="h-4 w-4" />
            <span>Visit GitHub Profile</span>
            <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.open(
                  "https://www.linkedin.com/in/dagim-tadesse-ba6b30263/",
                  "_blank",
                );
              })
            }
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/10 aria-selected:bg-white/10"
          >
            <Linkedin className="h-4 w-4 text-blue-400" />
            <span>Connect on LinkedIn</span>
            <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

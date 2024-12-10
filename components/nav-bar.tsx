"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Send, Icon } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import bscLogo from "../app/bsc.png";

export function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.12),transparent_50%)] backdrop-blur-lg border-b border-neutral-800">
      <div className="max-w-7xl mx-auto sm:px-1 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center ">
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-500 rounded-sm" />
            </div>
            <span className="text-lg font-semibold">Referral Game</span>
          </div>
          <div className="flex items-center gap-4">
          <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
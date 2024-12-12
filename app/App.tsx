"use client";

import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/nav-bar";
import { FeatureCard } from "@/components/feature-card";
import { Wallet, User, Users, Shield, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useContractRead } from 'wagmi';
import { Toaster } from 'sonner';
import { Send } from "lucide-react";
import img1 from "./assets/img1.png";
import bscLogo from "./assets/bsc.png";
import Faq from './Faq';
import Dashboard from './Dashboard';

const contractAddress = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '') as `0x${string}`;
const contractABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || '{}');


export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
    const queryReferrer = searchParams.get("ref");
  }, [searchParams]);


  const { data: totalUsers, isLoading: loadingTotalUsers } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'totalUsers',
  });

  if (!isMounted) return null;

  return (
  
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
       <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,87,34,0.05)_0%,transparent_50%)]" />
      </div>

      <Toaster theme="dark" expand position="top-center" />
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.25),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] px-4 py-1.5 rounded-full mb-8">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-500/50 rounded-full animate-pulse" />
            </div>
            <span className="text-sm text-neutral-400">Powered by BSC</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
  Unlock Your Potential with <br /><span className="text-orange-500">Referral Game</span>
  
</h1>
          
          <p className="text-lg text-neutral-400 text-base mb-12 max-w-3xl mx-auto">
          Leverage the power of a 5-level referral system to grow your network and your wealth. 
          <br/> It’s easy, secure, and scalable. The more you refer, the more you earn!
          <br />Start Building Your Network Today.
           </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
  className="bg-orange-600/80 hover:bg-orange-800 text-lg h-10 px-8 rounded-lg relative overflow-hidden group"
  onClick={() => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  {/* Gradient overlay with smooth transition on hover */}
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
  
  {/* Button text */}
  <span className="relative">Sign Up</span>
</Button>

  <Button 
    size="lg" 
    variant="outline" 
    className="border-neutral-800 hover:bg-neutral-800/50 text-lg h-10 px-8 rounded-lg"
    onClick={() => {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    Why RG <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
          </div>
          
 {/* 
  <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-6 text-lg text-neutral-500 text-center sm:text-left">
  <div className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
    Total Users: {loadingTotalUsers ? 'Loading...' : (totalUsers !== undefined ? totalUsers.toString() : '0')}
  </div>
  <div className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
    Total earned: {loadingTotalUsers ? 'Loading...' : ((Number(totalUsers) || 0) * 0.05).toFixed(2)} BNB
  </div>
</div>
  */}

        </div>
      </section>

{/* How it works Section */}
<section className="py-20 relative">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.08),transparent_70%)]" />
  
  <div className="max-w-6xl mx-auto px-4 relative">
    <h2 className="text-center text-2xl font-semibold mb-12">How it Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
      <FeatureCard
        icon={User}
        title="Sign Up"
        description="Pay a one-time 0.05 BNB fee to access all features and start earning."
      />
      <FeatureCard
        icon={Users}
        title="Refer"
        description="Share your referral link to invite others. More referrals, more earnings."
      />
      <FeatureCard
        icon={Wallet}
        title="Withdraw"
        description=" Withdraw earnings directly to your wallet once you meet the requirement."
      />
    </div>
  </div>
</section>

      {/* Dashboard */}
      <section id="dashboard" className="py-20 relative">
      <Dashboard />
      </section>

      {/* Services Section */}
      <section id="faq" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.08),transparent_70%)]" />
        
        <div className="max-w-6xl mx-auto px-4 relative">
          <h2 className="text-center text-2xl font-bold mb-12">Why Referral Game?</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Shield}
              title="100% Secure"
              description="Built on the Binance Smart Chain for full transparency. 
              Your funds and data are safe."
            />
            <FeatureCard
              icon={Users}
              title="5 Levels Referral System"
              description="Earn more as you refer more people. The system is designed to maximize your earnings."
            />
            <FeatureCard
              icon={Wallet}
              title="Easy Withdrawals"
              description="Withdraw your earnings with ease, directly to your wallet once you meet the requirement."
            />
          </div>
        </div>
      </section>

      
     <section className="py-20 relative">
      <Faq />
      </section>
      

<section className="relative">
<div className="max-w-7xl mx-auto px-4 text-center relative space-x-2">
<p className="text-xl text-orange-400 text-base max-w-3xl mx-auto">
Maximize your potential by building a powerful network.
           </p>
           </div>
           <div className="max-w-7xl mx-auto px-4 text-center relative space-x-2">
<p className="text-xl text-orange-500 text-base mb-8 max-w-3xl mx-auto">
The more you refer, the more you grow!
           </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
  className="bg-orange-600/80 hover:bg-orange-800 text-lg h-10 px-8 rounded-lg relative overflow-hidden group"
  onClick={() => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  {/* Gradient overlay with smooth transition on hover */}
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
  
  {/* Button text */}
  <span className="relative">Join Referral Game</span>
</Button>
</div>
</div>
      </section>
      

  <div className="max-w-7xl mx-auto text-center relative">
  <img src={img1.src} alt="img2" className="w-[800px] mx-auto" />
  </div>


      <section className="py-5 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 text-center relative space-x-2">
      <Button
    variant="secondary"
    size="icon"
    onClick={() =>
      window.open("https://bscscan.com/address/0x1F6d4106f71E3969621713df134A028ebfEc704C#code", "_blank", "noopener,noreferrer")
    }
  >
    <img src={bscLogo.src} alt="BSC Logo" className="w-4 h-4 hover:cursor-pointer" />
  </Button>

  <Button
    variant="secondary"
    size="icon"
    onClick={() =>
      window.open("https://t.me/referral_game_ro", "_blank", "noopener,noreferrer")
    }
  >
    <Send className="hover:cursor-pointer hover:text-primary w-4 h-4" />
  </Button>
</div>
</section>


      {/* Companies Section */}
      <section className="py-5 border-t border-neutral-800 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.08),transparent_70%)]" />
       
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <h3 className="text-sm text-neutral-500">@2024 Referral Game</h3>
        </div>
      </section>
    </main>
  );
}

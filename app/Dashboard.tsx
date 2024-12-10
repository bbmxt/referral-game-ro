"use client";

import { Copy } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction, useBalance } from 'wagmi';
import { toast } from 'sonner';
import "./LevelsCard.css"; 

const contractAddress = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '') as `0x${string}`;
const contractABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || '{}');


export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading: loadingBalance } = useBalance({
    address: address, // user's address
  });
  const [referrer, setReferrer] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const userBalance = balanceData?.value;

  useEffect(() => {
    setIsMounted(true);
    const queryReferrer = searchParams.get("ref");
    if (queryReferrer && isValidAddress(queryReferrer)) {
      setReferrer(queryReferrer);
    }
  }, [searchParams]);

  const toBNB = (wei: bigint | string) => (Number(wei) / 1e18).toFixed(2);

  const { data: signUpFee, isLoading: loadingSignUpFee } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'fee',
  });

  const { data: totalUsers, isLoading: loadingTotalUsers } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'totalUsers',
  });

  const { data: isSignedUp, isLoading: loadingIsSignedUp } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'signedUp',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const { data: earnings } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'earnings',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const { data: downline, isLoading: loadingDownline } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'downline',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const { write: signUp, data: signUpData } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'signUp',
  });

  const { write: withdraw, data: withdrawData } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'withdraw',
  });

  const { isLoading: isSignUpLoading, isSuccess: isSignUpSuccess } = useWaitForTransaction({
    hash: signUpData?.hash,
  });

  const { isLoading: isWithdrawLoading, isSuccess: isWithdrawSuccess } = useWaitForTransaction({
    hash: withdrawData?.hash,
  });

  const isValidAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleSignUp = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet.');
      return;
    }
  
    if (!address) {
      toast.error('Wallet address not detected. Please try reconnecting your wallet.');
      return;
    }
  
    if (!referrer || !isValidAddress(referrer)) {
      toast.error('Referrer address is invalid or missing.');
      return;
    }
  
    if (typeof signUpFee !== "bigint") {
      toast.error('Sign-up fee not retrieved.');
      return;
    }
  
    // Check real balance
    const userBalance = balanceData?.value;
  
    if (!userBalance || BigInt(userBalance) < BigInt(signUpFee)) {
      toast.error('Insufficient funds.');
      return;
    }
  
    try {
      signUp({ args: [referrer], value: signUpFee });
      toast('Signing up...');
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };
  
  const handleWithdraw = () => {
    if (downline && downline[0] >= 5) {
      withdraw();
      toast('Withdrawal in process...');
    } else {
      toast.error('You need at least 5 users at Level 1 to withdraw.');
    }
  };

  const copyToClipboard = () => {
    if (address) {
      const referralLink = `${window.location.origin}/?ref=${address}`;
      navigator.clipboard.writeText(referralLink)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy the link.'));
    }
  };

  if (!isMounted) return null;

  return (
  
    <main>
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
       <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,87,34,0.05)_0%,transparent_50%)]" />
      </div>

      {/* Dashboard */}
      <section>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.08),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 relative">

            {/* Main Content */}
            <div className="text-center col-span-9">
            <h2 className="text-center text-2xl font-semibold mb-12">Your Dashboard</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                  <h3 className="text-lg font-semibold text-orange-500 mb-4">Earnings</h3>
           
                  <div className="flex flex-col gap-4 text-center">
                  {/* Total Earned */}
                  <div className="flex justify-between items-center gap-4">
                    <span className="font-medium">Total Earned:</span>
                    <span className="font-bold">
                      {earnings ? `${toBNB(earnings[0])} BNB` : '0.00 BNB'}
                    </span>
                  </div>
              
                  {/* Withdrawable */}
                  <div className="flex justify-between items-center gap-4">
                    <span className="font-medium">Withdrawable:</span>
                    <span className="font-bold">
                      {earnings ? `${toBNB(earnings[1])} BNB` : '0.00 BNB'}
                    </span>
                  </div>
                </div>
              
                {/* Fee Notice */}
                <p className="text-left text-sm text-neutral-400 ml-1 mt-6">
                  1% fee applies
                </p>
              
                {/* Withdraw Button */}
                <button
                  onClick={handleWithdraw}
                  disabled={isWithdrawLoading || !earnings?.[1] || (earnings[1] === 0)}
                  className="w-full py-3 rounded-md bg-orange-600 text-white font-semibold hover:bg-orange-800 transition duration-300 disabled:bg-neutral-700 disabled:cursor-not-allowed"
                >
                  {isWithdrawLoading ? 'Withdrawing...' : 'Withdraw'}
                </button>
              
                {/* Success Message */}
                {isWithdrawSuccess && (
                  <p className="mt-4 text-center text-green-400">
                    Withdrawal successful! 
                  </p>
                )}


                  </div>
                  <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                  <h3 className="text-lg font-semibold text-orange-500">Downline</h3>
                 
              {!isSignedUp && !isSignUpSuccess && (
  <>  
  <p className="text-center text-neutral-300 mt-4">
  Sign up to access your Downline details and start growing your network.
  </p>
  <p className="text-left text-sm text-neutral-400 ml-1 mt-10">
  fee 0.05 BNB
  </p>
             <button
      onClick={handleSignUp}
      disabled={isSignUpLoading}
      className="w-full p-3 rounded-md bg-primary hover:bg-orange-800 transition duration-300 disabled:bg-muted"
      >
      {isSignUpLoading ? 'Signing Up...' : 'Sign Up'}
    </button>
    {isSignUpSuccess && toast.success('Successfully signed up!')}
  </>
)}

{
  (isSignedUp || isSignUpSuccess) ? (
    loadingDownline ? (
      <p className="text-center text-muted-foreground">Loading...</p>
    ) : (
      downline && downline.length >= 5 ? (
        <div className="flex flex-col">
        
          {/* Level 1 */}
          <div className="level mt-4 flex justify-center lg:gap-1">
  <span className={`${downline[0] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    Level 1: 
  </span>
  <span className={`${downline[0] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    {downline[0]?.toString() || '0'} users
  </span>
</div>

<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
<div className="level-row mt-4">
  <span className={`${downline[1] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    Level 2:
  </span>
  <span className={`${downline[1] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    {downline[1]?.toString() || '0'} users
  </span>
</div>

<div className="level-row mt-4">
  <span className={`${downline[2] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    Level 3:
  </span>
  <span className={`${downline[2] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    {downline[2]?.toString() || '0'} users
  </span>
</div>
<div className="level-row mt-4">
  <span className={`${downline[3] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    Level 4:
  </span>
  <span className={`${downline[3] < 1 ? 'text-muted-foreground' : ''} level-text`}>
  {downline[3]?.toString() || '0'} users
  </span>
</div>

<div className="level-row mt-4 mb-8">
  <span className={`${downline[4] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    Level 5:
  </span>
  <span className={`${downline[4] < 1 ? 'text-muted-foreground' : ''} level-text`}>
    {downline[4]?.toString() || '0'} users 
  </span>
</div>
    </div>
  {/* Total Users Calculation */}
          <div className="level flex justify-center">
  <span className={`${downline[0] < 1 ? 'text-muted-foreground' : ''} level-text`}>
  Total:{" "}
  </span>
  <span className={`${downline[0] < 1 ? 'text-muted-foreground' : ''} level-text`}>
   
  {
      downline.reduce((acc, value) => acc + (Number(value) || 0), 0)
    } users
  </span>
</div>
 </div>
      ) : null 
    )
  ) : null 
}
</div>
  </div>
                
                <div className="bg-neutral-900 rounded-xl p-4 mt-4 border border-neutral-800">
                <h3 className="text-lg font-semibold text-center">
            Share Your Link</h3>
          <div className="mt-6 w-full h-20 flex items-center justify-center">
           {(isSignedUp || isSignUpSuccess) ? (
  <div className="text-center text-neutral-400">
    <p>Invite friends to join and start earning. Copy and share your personalized link::</p>
    <div className="flex items-center justify-center mt-2 space-x-2">
      <p className="text-primary">
      {`${window.location.origin}/?ref=${
    window.innerWidth < 640 ? `${(address ?? "").substring(0, 10)}...` : address ?? ""
  }`}
      </p>
      <button onClick={copyToClipboard}>
        <Copy className="w-4 h-4" />
      </button>
    </div>
  </div>
) : (
  <p className="text-center text-gray-500">You are not signed up yet.</p>
)}

                </div>
                </div>
              </div>
          </div>
      </section>
    </main>
  );
}

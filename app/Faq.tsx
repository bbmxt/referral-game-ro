'use client';

import * as React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';

const Faq = () => {
  return (
    <div>
    <section>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.08),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-center text-2xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto px-4 py-10">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
        <AccordionTrigger className="text-left">
            What is Referral Game?
          </AccordionTrigger>
          <AccordionContent>
          Referral Game is a decentralized platform where users can sign up, refer others, and earn rewards based on referrals. It utilizes a multi-level referral system, allowing users to earn rewards from referrals up to 5 levels deep.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
        <AccordionTrigger className="text-left">
            How can I sign up?
          </AccordionTrigger>
          <AccordionContent>
            To sign up, you must pay a one-time sign-up fee of <strong>0.05 BNB</strong>. You also need to provide a <strong>referrer address</strong> (someone who is already signed up). Make sure you are not referring yourself.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
        <AccordionTrigger className="text-left">
            Who can be my referrer?
          </AccordionTrigger>
          <AccordionContent>
            Your referrer must be an existing user who has already signed up. You cannot refer yourself.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
        <AccordionTrigger className="text-left">
            How are the rewards distributed?
          </AccordionTrigger>
          <AccordionContent>
            Referral rewards are distributed across 5 levels. When you sign up and pay the sign-up fee:
            <ul className="list-disc ml-6">
              <li>Your referrer at level 1 gets a reward of <strong>0.01 BNB</strong>.</li>
              <li>The referrer has another referrer (level 2), they also receive a reward of <strong>0.01 BNB</strong>.</li>
              <li>This continues for up to 5 levels, distributing a reward at each level.</li>
            </ul>
           </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left">
          What is the withdrawal requirement? 
          </AccordionTrigger>
          <AccordionContent>
            To withdraw funds from your account, you must have at least <strong>5 referrals</strong> at <strong>level 1</strong> (the first level of the referral system). This is a requirement to ensure you have an active downline before being able to withdraw your earned rewards.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
        <AccordionTrigger className="text-left">
            How can I withdraw funds?
          </AccordionTrigger>
          <AccordionContent>
            You can withdraw the funds in your withdrawable balance. However, before you can withdraw, your <strong>level 1 referrals</strong> must meet the requirement of having <strong>at least 5 users</strong>.
            <br /><br />
            The withdrawal process:
            <ul className="list-disc ml-6">
              <li>The platform takes a <strong>1% withdrawal fee</strong>.</li>
              <li>The remaining amount is sent to your wallet.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
        <AccordionTrigger className="text-left">
            What is the withdrawal fee?
          </AccordionTrigger>
          <AccordionContent>
            The withdrawal fee is set at <strong>1%</strong> of the amount you are withdrawing. 
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
        <AccordionTrigger className="text-left">
            Can I refer myself or sign up without a referrer?
          </AccordionTrigger>
          <AccordionContent>
            No, you cannot refer yourself. Additionally, you cannot sign up without a valid referrer. The contract ensures that all new users have a direct or indirect referrer.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
        <AccordionTrigger className="text-left">
            What happens if I don’t have enough balance to withdraw?
          </AccordionTrigger>
          <AccordionContent>
            If your <strong>withdrawable balance</strong> is 0 or you have not met the required number of <strong>level 1 referrals</strong>, you will not be able to make a withdrawal.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11">
        <AccordionTrigger className="text-left">
            What is the purpose of the 'downline' function?
          </AccordionTrigger>
          <AccordionContent>
            The <strong>downline</strong> function allows you to view the referral structure. It provides information about how many referrals you have at each of the 5 levels.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
      </div>
    </section>
   
    </div>
  );
};

export default Faq;

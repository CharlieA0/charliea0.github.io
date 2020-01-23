---
layout: post 
title: "So our officer... or going slow is hard"
categories: fsae
---

Hello and welcome back to the wonderful mishmash of projects and fun.

It's fall, the leaves are turning, and I shiver whenever I see rowers on the Charles. You know what that means. This blog comes back to life. 

I want to start off by documenting some of my work on my main Formula Student project this year - power limiting. 

Power limiting you ask. Isn't that easy to solve, just go slower. Well yes that would be one way to do it, but there is an issue that we don't want our racecar to go slow. What would the point of that be?

We've actually been struggling with this problem for 3 years. In 2018, we were actually dequeued from the Endurance event for exceeding the power limit. That was a real blow to the point total.

The mechanical engineers in the audience might have a good idea for how we could produce power. Well, 
$ P = \Tau \cdot \omega $ right?

We command a torque and we know the motor speed from the resolver? Cough, cough maybe some subulties from the different motor efficienies in different regimes but nothing a dynometer test can't fix. 

Well, this is kinda of what we assumed in 2018. We had guessed the max speed we would see and then set a torque limit. This was handled by the Rinehart inverter, a very nice, very fancy machine that's been the bane of three power limiting leads existance. You see the Rinehart is very difficult to model. It has its own internal controls (basically a PID loop) that are responsible for actually tracking the torque you've commanded. 

The Rinehart introduces a host of quirks. For example, rapidly decreasing the torque command can cause it to overshoot and command negative torque (and negative power). 

If you want to see how well limiting with the Rinehart max torque setting works, here is a plot.

![Rod-Palmer-Power](/assets/rod-palmer-power.png)

So based off of the driver's max speed here and the Rinehart's torque limit, we should see a max of 65 kW here. Instead the power hits up to 88 kW. I suspect the only reason it didn't increase anymore was the battery voltage sag prevented us from producing anymore torque.

We've already had one testing trip at Palmer trying a very simple proportional control. I try to always start with the simplest thing. The idea was to start controlling power very quickly. I had thought that the failure for power limiting last year was that they were trying to control a plant whose output (power) changed by 600 kW/s at a frequency of ~10 Hz

What we had been doing was guessing the max speed

I've also joined MIT Driverless and because I'm a masochist.  

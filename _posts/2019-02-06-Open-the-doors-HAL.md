---
layout: post
title: "Open the pod bay doors, HAL Emulation"
categories: projects
---

# New Race Car project !!!

Hey-y'all! I wanted to share a real MIT FSAE project emulating the STM32f413's HAL libraries. Our team switched from LPC to STM32 microcontrollers this year. We've also pushed to write many more unit tests and maybe even move toward automated build testing.

Our problem is that unit testing code for microcontrollers is hard. Our projects run on systems with very limited resources, restricted input/out, and dependent on the physical boards the microcontrollers are part of. This makes running tests on hardware slow, tricky to interpret, and hard to setup. 

To show an example, the wheel speed sensing code I wrote for the car's sensor nodes uses input capture interupts to measure quadrature encoded signals. The output speed is therefore dependent on values in specific GPIO registers and in a timer. Testing this code in hardware would require either feeding in known values through a testing rig or somehow replacing those calls with *'TEST'* versions. This a recipe for too much work and/or messing preprocesor hacking. Not much fun.

I think the alternative we went with, native testing, is much better. Since our code is written in C, we have can compile it to run on our laptops like normal, non-embedded code. With a couple of additional targets added to our Makefile and judicious use of testing frameworks like [Unity](http://www.throwtheswitch.org/unity/), we can quickly put together a powerful testing framework.

There are a couple of issues that need to be taken care of though. Firstly, our code uses constant global pointers which represent memory-mapped peripherals on the STM32. While our tests will compile, when we run them they will try to access unallocated memory locations and immediately throw a segmentation fault or worse.

While this seems like a bad problem, STM's Hardware Abstraction Layer libraries provide a solution. Since they encapsulate the details of accessing physical registers and other peripherals, we can create a mocked version of these with allocated memory for native emulations of hardware locations. 

That is exactly what I did in this project. I ripped out the hardware basis of the STM32F413's HAL and CMSIS libraries and replaced it with an emulated version.

Its important to note that this allows our tests to compile and run, it doesn't make hardware functions work - after all the hardware doesn't exist when running natively. To let our programmers replace HAL functions with their own mocked version, I also declared them `__weak` (we use gcc exclusively). I also started writing useful mock-ups of common functionality. 

This whole project is on github at [stm32f4-hal-emulation](https://github.com/CharlieA0/stm32f4-hal-emulaton). 


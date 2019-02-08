---
layout: post
title: "Differentiating your filter"
categories: project
---

I wanted to write up a really cool filter that I got to implement on the 2019 year car. Since I'm responsible for torque vectoring with the car's wheel hub motors (*Shameless plug for future post*), I'm doing a lot of sensor work. So far though, this is been the coolest project.

There is a straightforward take the derivative of a discrete signal. If you skip the subtlety of how derivatives analogize to finite differencing, you could just say something like <span> $ \frac{d}{dt} x[i] = \frac{x[i]-x[i-1]}{\Delta t} $ </span>. This actually works great. It has minimal phase lag, is a causal system (real-time), and only requires keeping track of the two most recent values in the signal. If you're clever you can sample at a constant frequency which removes the time dependence and makes it LTI. More standard five-point stencil methods work similarly.

The difficulty arises when we introduce higher frequency noise into the system. The transfer function is $ H(s) = \frac{1 - s^{-1}}{T} $ so the frequency response is $ H(j\omega) = \frac{1 - (j\omega)^{-1}}{T} = \frac{1}{T} \cdot (1 + j\omega)$. Since the response is increasing with frequency, our derivative system is a high pass filter. It amplifies our higher frequency noise. 

There are many approaches to solve this, but we are looking for one that is simple to implement, fast, and has minimal phase lag. These properties are important since we use signals and their derivatives to make torque vectoring decisions. If the results are too laggy, then our torque vectoring controller won't be responsive.

I found a paper *Realtime Implementation of an Algebraic Derivative Estimation Scheme* by Josef Zehetner, Johann Reger, and Martin Horn with a highly satisfactory method. I would recommend you read their [paper](https://www.researchgate.net/publication/4294257_A_Derivative_Estimation_Toolbox_based_on_Algebraic_Methods_-_Theory_and_Practice) for the full details. Essentially, we isolate a particular term in the Taylor series of the signal using a linear operator. This method is nice since it only requires maintaining a circular buffer of the most recent samples. When we want to read the filter, we only need to sum a poylnomial function over each value in this window.

It works pretty good. Here is an example with $x[n] = \sqrt{n}$


Without any noise, our basic sequential difference method works well.

![Sequential difference derivative](/assets/Noiseless.png)

But once we add noise, it falls apart. You may notice that there is actually more noise in the derivative than the original signal. 

![Noise sequential difference](/assets/Noisy.png)

Our derivative filter comes to the rescue though. Other than some weirdness caused by the shortened window near the begining of the signal, it looks pretty good. 

![Filtered derivative](/assets/Filtered.png)

Just since they are real sweet, I might add some more plots of piecewise signals later. If you'd like to see the code for the filter you can find it [here](https://github.com/CharlieA0/derivative-filter).


 

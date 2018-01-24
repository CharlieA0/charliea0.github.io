I am leading a group at Bronxville building an autonomous flying drone. Our goal is to assemble a quadcopter (Helicopter with four props in an X-configuration) capable of self-navigation using GPS waypoint files. Although there are several excellent open-source autopilots, we decided to write our own for twice the fun.

Right now we are about half done, having built some thing that can more or less hover in-place, so I thought I would upload the code here and document the journey.

We got the group together last summer. It is a solid bunch including seniors, juniors, and sophomores. There is only one other programmer in the group – a fun guy if you like Linux pineapples – so we are a little light on coders.

The first step was to scare up some funding so we calculated a first order estimate of the cost. Then I had the privilege of running from the Student Faculty Legislature to the School Foundation to the Business Office back to Student Faculty Legislature and finally to the Principal. Fortunately, our school generously encourages independent research and funding was obtained.

We ordered a laundry list of parts from Hobby King, a Hong Kong discount RC distributer. Most items on the site cost at least 30% less compared to other vendors, so it is a good source for ESCs, motors, batteries, and other standard components. Of course, the shipping adds heavily to the price and takes nearly a month. DHL, a company I have learned to love and hate, performs it.

In the meantime, we decided to get a head start on the code. We borrowed an Arduino Mega from the school to be the brains of the copter. I had some experience with C and I had read Eliot Wilson's excellent book on AVR programming so I was pretty confident. Looking back, I probably shouldn't have been.

All of my C programming had been on desktops with forgiving memory protections and helpful tools like gdb. It was also exclusively procedural. The closest I came to an object was the odd struct.

You can probably imagine what our early looked like. It was strewn with pointer typos, malformed classes,  and * gasp * parallel arrays. I never raised a single seg fault though.

Anyway, we finally figured out we should brush up on OOP programming in C++. The site cppreference.com was super helpful. Anyway we eventually figured out that Arduino was C++ library rather than a language.

Arduino code is written in C++, compiled by avr-gcc, and flashed on to a microcontroller by arvdude. This toolchain is mostly hidden by the Arduino IDE, but when something goes wrong it can difficult to troubleshoot.

The first parts to arrive were the GPS and Inertial Measurement Unit (IMU) from SparkFun. The IMU had nine degrees of freedom: a three axis compass, a three axis gyroscope, and a three axis accelerometer. Figuring out the drone's orientation from these instruments is interesting problem.

Gravity is always pulling on the drone, so on average the accelerometer readings will produce a vector pointing down. The accelerometer is frequently jiggled however, so over the short term it can be highly inaccurate.

The gyroscope's reading of the angular velocity, on the other hand, is very stable, but over time it can pick up angular momentum and 'drift' away from an accurate reading. So neither instrument can accurately predict the drone's orientation.

The solution to the puzzle is use a the accelerometer readings over the long term and the gyroscope readings over the short term. This done by putting the accelerometer reading through low-pass filter, putting the integrated gyroscope reading through a high-pass filter, and combining the result.

I won't go into the specifics here because it is well documented elsewhere on the web, but this technique is called a complementary filtering. It makes the small angle approximation (we pretend sin(&#1012) is linear) which is acceptable for our drone because it should never turn by more 15 degrees.

Once we had an accurate measurement of the drone's orientation, we needed a way to change it. The motors alternate clockwise and counterclockwise spinning props in X configuration. This means that we can increase and decrease power to various sets of motors to change the yaw, roll, and pitch individually or in combination.

Unlike an airplane or helicopter, quadcopters are not aerodynamically stable. Without constant correction, little errors will rapidly grow until the drone spins out of control. This is good because it makes them highly maneuverable, but bad because it means the drone will naturally <i>want</i> to crash.

We used a PID controller to make those corrections. It calculates the difference between the desired angle, say 0 degrees, and the current angle, say 1 degree. That is the error. Then it produces a control signal based on the sum of a term proportional to the error, a term proportional to the integral of the error, and a term proportional to derivative of the error. The motors are adjusted based on that control signal to to correct the error.

The mathematics behind PID controllers is quite sophisticated, but intuitively it is same process you might use to adjust a faucet's water temperature. You start by turning to its hottest setting, and then crank it back as the water becomes too warm.

Anyway, they were relatively simple to implement once we understood them. It was bonus points that I got to bug my math teachers about Laplace transforms though, so that was an upside.

Both the complementary filter and PID controller have several constants which we tuned by placing the drone on a fixed axis. A rod was passed through the frame so that the drone could only rotate around one arm. We had a lot of fun (and cut a few fingers) with that.

Now we are at the hovering stage. We are about to start testing the PID and complementary filter off the axis. After that we will implement GPS navigation using waypoint files and distance-direction vectors.

Stay tuned for part two.  Also check out the 3D JavaScript Flight Planner we wrote to generate the waypoint files.

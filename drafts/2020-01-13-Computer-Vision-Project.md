---
layout: post
title: "Cameras something, something mumble..."
categories: FSAE
---

I'm probably the n+1th person to mention the past weeks have been crazy.
A global pandemic and US recession tend to make for extrodinary times.
I so appreciate the incredible efforts of our medical responders, essential
worker,

I thought I would post a write-up of a project I really enjoyed from last
semester. I had the privilege to that my first graduate class, MIT's 6.869
Advances in Computer Vision.

I can't recommend the class highly enough. It is basically two professors
presenting the papers they feel were most signficant in the past 20 years.
The workload is relatively light for a graduate class. It is entirely project-
focused with no exams. The weekly psets implement work from the covered papers
and a final project is 40% of the grade.

Suprisingly for me, the course wasn't exclusively machine-learning based.
The first half of the course gave an in-depth overview of camera models, epipolar geometry,
graphical networks, filters, and other topics I had relatively little experience
with.

I really enjoyed these topics and they helped frame the machine learning in the second half.

Continuing my tradition of being more interested in clever math than machine
learning. I decided to work on a non-ML final project.

Specifically, I wanted to try stereo auto-calibration for MIT's Driverless race car.
Sensor calibration has been a consistent pain point for our team. For stereo-vision,
it requires running a matlab script while carefully moving special calibration boards.

![He looks happy, right?](/assets/calibration-targets.png)

This calibration procedure is labor intensive and can eat up a lot of our valuable testing time at Delft. Even worse, our stereo pair's mounts are 3D-printed and so not perfectly rigid.
(I owe Driverless's mechanical team a dirty look for that decision).

We have found the camera pair's extrinsic calibration drifts over time, especially under high accelerations while racing. This means our statically determined calibration becomes progressively less accurate.
At Valkenburg in Delft, we have had to pause testing and recalibrate - wasting time.

Believing this current process was metamorphic schist, my goal for the 6.869 project
was to build an autocalibration procedure. The idea is to have a ROS node constantly
running that can update the calibration even as the cameras shift.

I'll provide a summary, but if you want to read the whole project report it is
[here](/assets/6_869_Final_Report.pdf).





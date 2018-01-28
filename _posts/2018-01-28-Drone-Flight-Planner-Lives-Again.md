
I've resurrected the flight planner I wrote for my high school autonomous drone research project.

This project let us create paths of waypoints for quadcopter to follow faster and more accurately that looking up coordinates in Google Earth. It also let specify commands like HOVER or CIRCLE to perform at waypoints. This was my first real foray in to web development.

Please enjoy!

## FlightTool
Creates, displays, and exports coordinate waypoint flight plans for drone autopilots. Powered by Cesium Engine.

Try out [FlightTool](https://charliea0.github.io/projects/FlightTool/FlightTool.html).

### Controls:
 * Double Left-Click: Create a waypoint,
 * Right-Click: Remove a waypoint,
 * Left-Click: Select a waypoint,
 * Select point → Click camera in infobox: Rotate view,
 * Toolbar Fields: Change the selected waypoint,
 * Export: Export the waypoints to a file (not currently formatted for Arudpilot Missions)

Install Cesium and Node.js from [Cesium's Site](http://cesiumjs.org/tutorials/cesium-up-and-running/) to run locally.

**MIT License**

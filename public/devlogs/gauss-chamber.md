# Bridging Theory and Intuition

_TL;DR_

Table of contents

1. [The What](#the-what)
2. [The Why](#the-why)
   1. [Orbital](#orbital)
   2. aaa
3. [The How](#the-how)
   1. [Tech Stack](#tech-stack)
   2. [The Circuit Simulator](#the-circuit-simulator)
   3. [Reusable Components](#reusable-components)
4. [Discovering GitHub](#discovering-github)
5. [Best Practices](#best-practices)

## The What

Gauss Chamber was Julian's and my entry for the Orbital 25 hackathon at the artemis level. In short, Gauss Chamber is a game that plays similar to the portal franchise, where the player moves chamber to chamber, solving puzzles along the way. The main difference, is that the portal mechanics have been swapped out for electromagnetic and circuitry puzzles. So instead of flinging cubes through portals or making speedy things go through portals, the player has to solve puzzles by charging objects to affect their trajectories and by swapping out electrical components.

## Orbital

Orbital is NUS' 3-month-long hackathon throughout the summer vacation.

Getting into the artemis level meant that we had to work on the codebase much more professionally, with proper documentation, 2 week sprints planning, pr code review, and all the sorts. We also had to learn how to use GitHub workflows and their project sprint management. It was a lot of admin work but I'm proud of it.

We were ambitious and attempted to get into the Artemis level, which was the highest level above the Gemini and Apollo levels, about 5 percent of the cohort. We thought to just try aiming for it as there was no harm in trying. Worst case scenario, we would get into the Apollo level instead. Much to our surprise, we got into the Artemis level.

## Tech Stack

Gauss Chamber was built using the Godot game engine. Another key component was the addon large-linear-algebra, which allowed us to do matrix math and solve for linear systems of equations, the backbone of the circuit simulation.

Assets were created using Blender and Inkscape. Though looking back, we should have used an asset pack. Creating assets was a time-consuming process, and we should have prioritized other aspects of the project like more puzzles and polish.

## GitHub is cool

One thing I didn't expect going into the hackathon was how helpful GitHub would be for collaboration. Coming from a mechanical engineering background, our version control was not great. We hosted CAD files on cloud storage like OneDrive and any work we did would automatically be synced upstream. This was mostly okay when people had distinct tasks, but it was a nightmare dealing with assemblies and conflicts when multiple people were working on the same file. Our solution to this was to announce that we would be working on a file, and request that noone else were to work on it until we were done.

GitHub's pull request and merging workflow made this workflow much more bearable. It allowed us to work on our own branches and only later merge them into the main branch. This made it much easier to resolve conflicts, as we can see what the conflicts are directly and decide which version to keep. Aside from that, it also allowed us to easily review each other's code and point out any issues before merging to the main branch, reducing the chance of bugs later down the line.

Another great benefit of GitHub was GitHub actions. GitHub actions are essentially scripts that you can setup to run after an event (say, a push to the main branch). For our project, we setup a workflow that would automamtically build the game for Windows, Linux, and macOS and publish it to itch.io everytime we merged the main branch to the release branch.

## The Circuit Simulator

Im still very proud of the circuit simulation aspect of the game. It uses DFS to identify connected components then creates an impedance matrix. It also supported capacitors and inductors by having them act as current/voltage sources and storing their current and charge values in a variable.

## Reusable Components

Working on this project caused a lot of boilerplate code to be written. These include how the game loads in levels, how the game manages the UI and state, and how the game saves and loads data.

### Level Loading

Another aspect that we were proud of was the scene loader, which evolved from a more primitive level loader singleton. The new scene loader allows for smooth fade in loading screen transitions and it allows types of scenes to be setup differently, say the main menu and game scenes or maybe a cutscene.

## Draft

This project taught me a lot about best practices in managing large codebases. It also taught me how to use GitHub workflows and their project sprint management.

Started out with a basic FPS controller from previous projects, inspired by the movement in source engine games. Almost all of my FPS game projects used this controller, which was a good starting point for the game. Before the hackathon started, we brainstormed ideas for what the game would be about. We eventually decided that since we both had experience and interest in science, that the game should be a pseudo-educational game that was based on some physics concepts. We finally landed on the idea of electromagnetism and how charged objects interact with electromagnetic fields and each other.

Setting up the prototype was pretty quick as I had a lot of experience with Godot. We wrote the proposal detailing what the scope of the game would be, including the gameplay loop, features, and rough development timeline.

Gameplay wise, a lot of changes. First started out as only charged objects and electromagnetic fields. Then we expanded by introducing circuitry, which in and of itself experienced a lot of changes. The logic for how circuit components worked was hard coded in the physical representations of them in the engine. This caused a lof of issues when how they worked changed, like a switch that shorts a circuit or a socket that can accept multiple components at runtime. In the end I migrated the system to a more modular approach, following the behavior pattern where the logic of the components can be swapped out at runtime.

We had some playtests with electrical engineering students to see how intuitive our interpretation of the concepts were.

[The proposal](https://drive.google.com/drive/folders/11w5NU3apfN75Qt8CQgs2kPEQe_GlNjSt?usp=sharing)
[The code](https://github.com/satiniize/gauss-chamber)
[The demo](https://satiniize.itch.io/gauss-chamber)

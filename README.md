# Knights Travails

An upgrade version of the Knights Travails Assignment of The Odin Project

Interactive visualization of the shortest path a knight can take across a chessboard. Built as a visual implementation of the classic Knights Travails problem using Breadth-First Search (BFS).

<p align="center">
https://github.com/user-attachments/assets/ff0a6b89-78d0-45d1-ba29-209ca536f491
</p>
## What it does

- Click to choose a start square
- Click another square as the target
- The board explores possible moves using BFS
- The shortest possible path is animated step by step

## How it works

- Each square is treated as a graph node
- Legal knight moves form edges
- BFS guarantees the shortest path
- Parent tracking reconstructs the final route

## Features

- Animated knight movement
- Real-time BFS exploration
- Final path highlight
- Clean, minimal UI

## Local Setup

```bash
git clone https://github.com/NyxLumen/Knights-Travails.git
cd Knights-Travails
npx serve
```

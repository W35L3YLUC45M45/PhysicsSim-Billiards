# Billiards
    
* Recommended opening the project with the VSCode with the Live Server extension *

PROJECT DEVELOPED BY: Arnau Metaute and Wesley Lucas

For the resolution of this Physics Simulation project we carried out the creation of an American pool, which was composed of the following characteristics:
- The player who puts a ball first determines which balls each one will put
- If a player does not touch any ball, touches the black ball or touches an opponent's ball with the white, his opponent will have two moves
- When a player has placed all his balls, the above penalties do not apply
- If a player puts the black ball before putting all the other balls, he loses
- The black ball must be placed last, in the opposite hole to which the last ball was placed
- If the white ball is slipped into a hole, the other player will get an extra roll
- The points and colors of the balls are visible at all times, except at the beginning of the game
- The turn lasts until three seconds after the roll, at which time it is not allowed to interact with the pool

In addition, the following criteria and extras have been completed:
- Initialization of the game from the reading of a JSON: it is carried out at the beginning of the game and is used to place the balls in place
- Control of players' turns: The current turn of the player will be visible in the name of the players themselves, who will be marked accordingly
- Score control: There is control of the balls placed in addition to control of the hole where they have been placed to ensure the correct operation of the black  ball
- Realistic collisions: Created more realistic collisions that take into account not only the force with which they collide, but also the angle, allowing multiple balls to collide at once

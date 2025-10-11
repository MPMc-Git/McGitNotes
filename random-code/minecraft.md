## Minecraft stuffs, mostly command blocks

#### Building an automatic Iron Golem spawner
1. Perform the following command
   - /scoreboard objectives add NightSpawned dummy "Night Event Flag"
1.  Create an Unconditional, Repeating, Always Active Command Block with the following:
    - /execute if score NightFlag NightSpawned matches 0 run execute if time 13000 run summon minecraft:iron_golem ~ ~1 ~
    - Replace ~ ~1 ~ in the summon command with the exact coordinates where you want the Iron Golem to appear (e.g., 100 64 -50).
1. Create a Conditional, Chain, Always Active Command Block with the following:
    - /scoreboard players set NightFlag NightSpawned 1
1. Create an Unconditional, Repeating, Always Active Command Block with the following:
    - /execute if score NightFlag NightSpawned matches 1 run execute if time 1000 run scoreboard players set NightFlag NightSpawned 0

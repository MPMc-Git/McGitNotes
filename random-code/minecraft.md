## Minecraft stuffs, mostly command blocks

#### Building an automatic Iron Golem spawner
*This is in 1.21.10 Java Edition*
1. Perform the following commands
   - `/scoreboard objectives add WorldTime dummy`
   - `/scoreboard objectives add IsNight dummy`
1. Create an Unconditional, Repeating, Always Active Command Block with the following:
    - `/execute store result score #WorldTime WorldTime run time query daytime`
1. Create a Conditional, Chain, Always Active Command Block with the following:
    - `/execute if score #WorldTime WorldTime matches 13000 if score #Flag IsNight matches 1 run summon minecraft:iron_golem ~ -1 ~`
    - **NOTE**: Replace ~ -1 ~ to the location you want the Iron Golem summoned
1. Create a Conditional, Chain, Always Active Command Block with the following:
    - `/execute if score #WorldTime WorldTime matches 12000 run scoreboard players set #Flag IsNight 1`
1. Create a Conditional, Chain, Always Active Command Block with the following:
    - `/execute if score #WorldTime WorldTime matches 14000 run scoreboard players set #Flag IsNight 0`
**IMPORTANT**: You need to put each block connected to teach other, facing the same direction.  

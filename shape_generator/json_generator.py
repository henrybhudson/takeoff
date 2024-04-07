import json
import random

#array holding the possible astronomical objects
star_colours = ["#9db4ff", "#a2b9ff", "#a7bcff", "#aabfff", "#afc3ff", "#baccff", "#c0d1ff", "#cad8ff", "#e4e8ff", "#edeeff", "#fbf8ff", "#fff9f9", "#fff5ec", "#fff4e8", "#fff1df", "#ffebd1", "#ffd7ae", "#ffc690", "#ffbe7f", "#ffbb7b", "#ffbb7b", "#ffc100", "#ff9a00", "#ff7400"];
planet_colours = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "white", "grey", "brown"]
moon_colours = ["#b3b3b3", "#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373"]

#generate 25 of each type of astronomical object for 3 stages
def generate_stars(stage):
    stars = []
    for i in range(25):
        star = {
            "color": random.choice(star_colours),
            "radius": random.randint(35, 70),
            "coor": None
        }
        stars.append(star)
        print(star)

        with open(stage, 'w') as outfile:
            json.dump(stars, outfile)
        print('stars added to JSON')

def generate_planets(stage):
    planets = []
    for i in range(25):
        planet = {
            "color": random.choice(planet_colours),
            "radius": random.randint(1, 100),
            "coor": None
        }
        planets.append(planet)
        print(planet)

        with open(stage, 'w') as outfile:
            json.dump(planets, outfile)
        print('Planets added to JSON')

def generate_moons(stage):
    moons = []
    for i in range(25):
        moon = {
            "color": random.choice(moon_colours),
            "radius": random.randint(1, 100),
            "coor": None
        }
        moons.append(moon)
        print(moon)

        with open(stage, 'w') as outfile:
            json.dump(moons, outfile)
        print('Moons added to JSON')

star_stages = ['stars_stage_1.json', 'stars_stage_2.json', 'stars_stage_3.json']
planet_stages = ['planets_stage_1.json', 'planets_stage_2.json', 'planets_stage_3.json']
moon_stages = ['moons_stage_1.json', 'moons_stage_2.json', 'moons_stage_3.json']

for stage in star_stages:
    generate_stars(stage)

for stage in planet_stages:
    generate_planets(stage)

for stage in moon_stages:
    generate_moons(stage)

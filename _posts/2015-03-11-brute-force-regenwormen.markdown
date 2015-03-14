---
layout: post
title: "Brute force Regenwormen"
date: 2015-03-11 21:00:00
---

I'm not great at games, but I do appreciate the elegance of a small game with a limited set of rules that can be enjoyed by both children and adults. One of those games definitely is Regenwormen (this is the Dutch name, in German, it is called Heckmeck am Bratwurmeck, in English, I don't have a clue). Every time I play it, my mind wanders over the statistical backgrounds of the game and on the possibility to 'brute force' solve this game. Turns out to be easier than I thought: you can actually do it live in javascript in your browser. In fact you just have.

Check out the results below. On the right, you see all possible combinations that you could pick from a roll of dice (you can only pick one type of dice in Heckmeck). They are ordered by the chance you will pick them **assuming you play optimal**. That is why in the initial situation, the probability of two worms is much higher than that of two fives. The chances of throwing a combination containing two fives or two worms are, of course, equal, but normally, when you throw two worms, you'll pick them, while in a roll containing two fives might also contain two worms or four fours, which are better picks. Some interesting findings:
 * It is better at the first roll to pick one one, two or three than picking three threes
 * 
 * 


Check for yourself: [Optimal play at Heckmeck am Bratwurmeck](/article/heckmeck.html)
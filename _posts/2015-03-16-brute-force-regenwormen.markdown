---
layout: post
title: "Brute force Regenwormen"
date: 2015-03-16 21:00:00
---

[<img alt="Screenshot of full calculator" src="/img/heckmeck/screenshot.png" align="right" >](/article/heckmeck.html) I'm not great at games, but I do appreciate the elegance of a small game with a limited set of rules that can be enjoyed by both children and adults. One of those games definitely is Regenwormen (this is the Dutch name, in German, the original, it is called Heckmeck am Bratwurmeck, in English, Pichomino). Every time I play it, my mind wanders over the statistical backgrounds of the game and on the possibility to 'brute force' solve this game. Turns out to be easier than I thought: you can actually do it live in javascript in your browser. In fact you just have.

Check out the results with the link below. On the right, you see all possible combinations that you could pick from a roll of dice (you can only pick one type of dice in Heckmeck). They are ordered by the chance you will pick them **assuming you play optimal**. That is why in the initial situation, the probability of two worms is much higher than that of two fives. The chances of throwing a combination containing two 5s or two worms are, of course, equal, but normally, when you throw two worms, you'll pick them, while in a roll containing two 5s might also contain two worms or four 4s, which are better picks. Some interesting findings:
 
 * It is better at the first roll to pick one 1, 2 or 3 than picking three 3s
 * At your first roll, picking one worm (better safe than sorry) is a pretty bad idea: even picking one 3 or one 4 gives more value
 * On average, you will score 1.6 worms per round. If you pick up two worms or two 5's after your first roll, your expectation has gone down a bit (meaning that having to take two worms after roll one is bad luck)

#### Links
- Check for yourself: [Optimal play at Heckmeck am Bratwurmeck](/article/heckmeck.html)
- The game itself: [Wikipedia](http://de.wikipedia.org/wiki/Heckmeck_am_Bratwurmeck)

#### To do
The calculator currently doesn't take into account that later in te game, not all stones are available anymore. If the lower stones are all gone, this significantly changes the optimal play. Also, stones that can be "stolen" from other players may also impact the best choice.

#### Why
I set out on this small app as an exercise in TypeScript programming. It is the extension to javascript that Microsoft has created and is now finally adopted outside the MS world. It brings all the power and availability of good old javascript, but with stronger typed structures where you want them. Very nice. See [my repository here](https://github.com/Teun/heckmeck).

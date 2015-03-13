---
layout: post
title: "Brute force Regenwormen"
date: 2015-03-11 21:00:00
scripts: >
    <script src="/js/heckmeck/knockout.js"></script>
    <script src="/js/heckmeck/require.js"></script>
    <script>require.config({baseUrl: '/js/heckmeck'});
    require(['app'], function(app) {(new app("/img/heckmeck/")).init($('#komain')[0]);});
    </script>
---

I'm not great at games, but I do appreciate the elegance of a small game with a limited set of rules that can be enjoyed by both children and adults. One of those games definitely is Regenwormen (this is the Dutch name, in German, it is called Heckmeck am Bratwurmeck, in English, I don't have a clue). Every time I play it, my mind wanders over the statistical backgrounds of the game and on the possibility to 'brute force' solve this game. Turns out to be easier than I thought: you can actually do it live in javascript in your browser. In fact you just have.

Check out the results below. On the right, you see all possible combinations that you could pick from a roll of dice (you can only pick one type of dice in Heckmeck). They are ordered by the chance you will pick them **assuming you play optimal**

## Optimal play Heckmeck

<div class="row">
<div class="col-md-4">
    <div data-bind="visible: CurrentSet.expectation().DiceLeft() == 8">
        No dice picked yet.
    </div>
    <div style="display:none" data-bind="visible: CurrentSet.expectation().DiceLeft() < 8">
        <a class="btn btn-default" href="#" role="button" data-bind="click:clearAll">Clear</a>
    </div>
    <div id="currentRoll" data-bind="html:$root.fmt.imgRoll(CurrentSet.dice())">
    </div>


</div>
<div class="col-md-8">
  <div id="expectations" data-bind="with:CurrentSet.expectation">
    <div>If you play optimal from now on, you expect: <span data-bind="text:ExpectedValue().toFixed(3)"></span></div>
    <div>If you quit now, you have: <span data-bind="text:CurrentValue()"></span></div>
    <div style="display:none"  data-bind="visible: ExpectedValue() > CurrentValue()" >Throw again!</div>
    <div style="display:none"  data-bind="visible: ExpectedValue() <= CurrentValue()" >Quit now!</div>
    <table>
        <thead>
            <th data-bind="click:function(d,e){sortOrder('chance')}">probability</th>
            <th data-bind="click:function(d,e){sortOrder('value')}">value</th>
            <th> </th>      
        </thead>
      <tbody data-bind="foreach:PickExpectations()">
        <tr>
          <td data-bind="text:$root.fmt.chance($data.chance)"></td>
          <td data-bind="html:$root.fmt.improvement($root.CurrentSet.expectation().ExpectedValue(), $data.value)"></td>
          <td data-bind="click: $root.addPick  , html:$root.fmt.imgPick($data.roll)"></td>
        </tr> 
      </tbody>  
    </table>    

  </div>   
</div>


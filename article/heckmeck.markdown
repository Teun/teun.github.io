---
layout: article
title: "Optimal play at Heckmeck am Bratwurmeck"
scripts: >
    <script src="/js/heckmeck/knockout.js"></script>
    <script src="/js/heckmeck/require.js"></script>
    <script>require.config({baseUrl: '/js/heckmeck'});
    require(['app'], function(app) {(new app("/img/heckmeck/")).init($('#komain')[0]);});
    </script>
    <link rel="stylesheet" href="/css/heckmeck/app.css">
---

<div id="komain" class="container">
  <div class="row">
    <div class="col-sm-1">
      <div data-bind="visible: CurrentSet.expectation().DiceLeft() == 8">
          No dice picked yet.
      </div>
      <div id="currentRoll" data-bind="html:$root.fmt.imgRoll(CurrentSet.dice())">
      </div>
      <div style="display:none" data-bind="visible: CurrentSet.expectation().DiceLeft() < 8">
          <a class="btn btn-default" href="#" role="button" data-bind="click:clearAll">Clear</a>
      </div>
    </div>
    <div class="col-sm-7">
      <div id="expectations" data-bind="with:CurrentSet.expectation">
        <div>If you play optimal from now on, you expect: <span data-bind="text:ExpectedValue().toFixed(3)"></span></div>
        <div>If you quit now, you have: <span data-bind="text:CurrentValue()"></span></div>
        <div style="display:none"  data-bind="visible: ExpectedValue() > CurrentValue()" class="throw-again">Throw again!</div>
        <div style="display:none"  data-bind="visible: ExpectedValue() <= CurrentValue()" class="quit-now" >Quit now!</div>
        <table class="roll-options">
            <thead>
                <th class="sort-me" data-bind="click:function(d,e){sortOrder('chance')}">probability</th>
                <th class="sort-me" data-bind="click:function(d,e){sortOrder('value')}">value</th>
                <th> </th>      
            </thead>
          <tbody data-bind="foreach:PickExpectations()">
            <tr data-bind="css:{ alt:$index()%2 }">
              <td data-bind="text:$root.fmt.chance($data.chance)"></td>
              <td data-bind="html:$root.fmt.improvement($root.CurrentSet.expectation().ExpectedValue(), $data.value)"></td>
              <td data-bind="click: $root.addPick  , html:$root.fmt.imgPick($data.roll)"></td>
            </tr> 
          </tbody>  
        </table>    

      </div>   
    </div>
  </div>
</div>
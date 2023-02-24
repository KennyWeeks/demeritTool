<script></script>

<!--The reason I am making everything inline styled is because
the printing process of these pages will not carry the styles over, and 
in svelte, the .css is bundled, so I actually don't have access to it until
the final render, so this process just makes everything easier because
I can map the childnodes of the 'main-component' to an object, and 
just copy the style strings over-->

<!--width:calc(8.5*96px);
        height:calc(11*96px);
        box-shadow:inset 0 0 0 1px #000;
        position:absolute;
        top:100vh;
        left:50%;
        transform:translate(-50%);
        margin-bottom:10px;
        overflow:hidden;
        background-color:#00ff00;-->

<div id="main-component" style="width:calc(8.5*96px); height:calc(11*96px); position:relative; overflow:hidden; background-color:#fff;">

    <!--margin-top:calc(1*96px);
            margin-left:calc(1*96px);
            border:2px solid #000;-->

    <!--<img src="header.png" style="margin-top:96px; margin-left:96px;" alt="Fire Academy Header"/>-->

    <!--width:calc(6.5*96px);
            border-bottom:3px solid #000;
            display:flex;
            justify-content:space-between;
            flex-flow:row;
            flex-wrap:nowrap;
            margin-left:96px;-->

    <div id="header" style="width:calc(6.5*96px); border-bottom:3px solid #000; display:flex; justify-content:space-between;
    flex-flow:row; flex-wrap:nowrap; margin-left:96px;">


        <div class="itemblocks" id="test" style="font-size:18px; margin-bottom:0px; flex-grow:2;">

            <h3 class="description" style="margin-bottom:0px; font-weight:normal;">Name <span id="name-text"></span></h3>

        </div>

        <div class="itemblocks" style="font-size:18px; margin-bottom:0px; flex-grow:1;">

            <h3 class="description" style="margin-bottom:0px; font-weight:normal;">Date <span id="date-text"></span></h3>

        </div>

        <div class="itemblocks" style="font-size:18px; margin-bottom:0px; flex-grow:1;">

            <h3 class="description" style="margin-bottom:0px; font-weight:normal;">HR # <span id="number-text"></span></h3>

        </div>

    </div>

    <!--text-transform:uppercase;
            font-weight:normal;
            margin-left:96px;
            font-size:16px;-->

    <h3 id="infraction" style="text-transform:uppercase; font-weight:normal; margin-left:96px; font-size:16px;">Infraction:</h3>

    <!--width:calc(6.5*96px);
            margin-left:96px;
            font-size:15.25px;-->

    <p id="infraction-starting-line" style="width:calc(6.5*96px); margin-left:96px; font-size:15.25px;">I earned <span id="demerit-points">(#)</span> demerit points at approximately <span id="time">(time)</span> for a/an <span id="infraction-space">infraction</span>. <span id="assigned">(Who assigned
    you the demerits, if Capt. Spell out Captain)</span> assigned me this demerit report because <span id="demerit-description">...</span></p>

    <!--width:calc(6.5*96px + 2px);
            border-bottom:0.25px solid #000;
            border-right:0.25px solid #000;
            position:absolute;
            bottom:96px;
            left:96px;-->

    <table cellspacing="0" style="width:calc(6.5*96px); border-bottom:0.25px solid #000; border-right:0.25px solid #000; position:absolute; bottom:96px; left:96px;">
        <colgroup>
            <col span="1" style="width: 0%;">
            <col span="1" style="width: 45%;">
            <col span="1" style="width: 30%;">
            <col span="1" style="width: 25%;">
        </colgroup>
        <tr>
            <!--box-shadow:inset 0 0 0 0.25px #000;
                overflow:hidden;
                padding:10px;
                padding-top:5px;
                padding-bottom:35px;
                font-style:italic;
                font-size:14px;-->
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;"></td>
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Recruit Signature</td>
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">HR #</td>
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Date</td>
        </tr>
        <tr>
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;"></td>
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Academy Staff Signature</td>
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">HR #</td>
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Date</td>
        </tr>
    </table>

</div>

<style>

    #main-component {
        color:#000;
    }

    @media only screen and (max-width:500px) {
        #main-component {
            transform:scale(0.5);
        }
    }

</style>
var main = function(){
    $("button[name='calc']").click(function(){ // ".calculate"
        //assigning data from input fields into variables - 'Cos o Tobie' section
        var age = parseInt($("input[name='wiek']").val());
        var height = parseInt($("input[name='wzrost']").val());
        var gender = 'woman';
        if ($("input[value='Man']").is(':checked')) gender='man';
        var waga = parseInt($("input[name='waga']").val());
        var stomach="1/2"
        if ($("input[value='full']").is(':checked')) stomach='1';
        if ($("input[value='empty']").is(':checked')) stomach='0';
        //calculating BMI index and avoiding mistakes due to wrong inputs
        var problem=0;
        if (age>0 && height>0 && waga>0) problem=0;
        else problem=1;
        var BMI = waga / (height*height/10000)

        //assigning data from input fields into variables - 'Ile Wypiłeś' section

        var ile1 = parseInt($("input[name='ilewody']").val());
        var ile2 = parseInt($("input[name='ilewina']").val());
        var ile3 = parseInt($("input[name='ilepiwa']").val());
        var ile4 = parseInt($("input[name='iledrinkow']").val());
        if (!$("input[name='ilewody']").val()) ile1=0; //avoiding mistakes in case user will not fill the fields
        if (!$("input[name='ilewina']").val()) ile2=0;
        if (!$("input[name='ilepiwa']").val()) ile3=0;
        if (!$("input[name='iledrinkow']").val()) ile4=0;

        var moc1 = parseInt($("input[name='moc1']").val());
        var moc2 = parseInt($("input[name='moc2']").val());
        var moc3 = parseInt($("input[name='moc3']").val());
        var moc4 = parseInt($("input[name='moc4']").val());
        if (!$("input[name='moc1']").val()) moc1=0; //avoiding mistakes in case user will not fill the fields
        if (!$("input[name='moc2']").val()) moc2=0;
        if (!$("input[name='moc3']").val()) moc3=0;
        if (!$("input[name='moc4']").val()) moc4=0;

        var czego1, czego2, czego3, czego4;
        switch($("select[name='miary1']").val()){ //assinging mililiters depending on the option chosen by user
            case "mk":
                czego1=25; 
                break;
            case "sk":
                czego1=30;
                break;
            case "dk":
                czego1=50;
                break;
            case "b02":
                czego1=200;
                break;
            case "b05":
                czego1=500;
                break;
            case "b07":
                czego1=700;
                break;
            default: czego1=1;
        }

        switch($("select[name='miary2']").val()){ //assinging mililiters depending on the option chosen by user
            case "mkl":
                czego2=100;
                break;
            case "dkl":
                czego2=150;
                break;
            case "b075":
                czego2=750;
                break;
            default: czego2=1;
        }

        switch($("select[name='miary3']").val()){ //assinging mililiters depending on the option chosen by user
            case "mk":
                czego3=300;
                break;
            case "dk":
                czego3=500;
                break;
            case "b033":
                czego3=330;
                break;
            case "b05":
                czego3=500;
                break;
            case "b066":
                czego3=660;
                break;
            default: czego3=1;
        }

        switch($("select[name='miary4']").val()){ //assinging mililiters depending on the option chosen by user
            case "ds":
                czego4=250;
                break;
            case "ss":
                czego4=200;
                break;
            case "ks":
                czego4=150;
                break;
            default: czego4=1;
        }


        // calculating the sum of alcohol that was consumed
        var A=0, K=0.7, P=0;
        if (gender=="woman") K=0.6
        A = (ile1*czego1/100 * moc1 + ile2*czego2/100 * moc2 + ile3*czego3/100 * moc3 + ile4*czego4/100 * moc4)*0.79;
        if (BMI<25) P=A/(K*waga); //there are 2 ways to calculate promiles depending on BMI. That's why here we have 'if'
        else{
            masa_tluszczu=((BMI-24.99)/BMI)*waga;
            P=A/(0.2*masa_tluszczu + K*(waga-masa_tluszczu));
        }
        P=Math.round(P*100)/100;
        
        
        // % of alcohol vs time
        var days=0, sober_time=0;
        if (stomach=="0") topP_time = 0; //how many hours after finishing drinking, user has the most alcohol in blood. It depends on stomach.
        else if (stomach=="1/2") topP_time = 1;
        else topP_time = 2;
        var stopHour = parseInt($("select[name='startHour']").val()) + parseInt($("select[name='how_many_hours']").val());
        while (stopHour>24){
            stopHour-=24; 
        } 

        var metabolism=10;
        if (gender=="woman") metabolism=8;
        var currentState=A; //current state is equal to alcohol in blood. every hour it's less and less
        while (currentState>0){
            sober_time+=1;
            currentState-=metabolism;
        }
        var time_OK = stopHour+sober_time+topP_time; //time when user qwill be totally fine. No alcohol in blood.
        while (time_OK>24) {
            time_OK-=24;
            days+=1;
        }
        var time_alcOK = time_OK-2;
        if (time_alcOK<0) time_alcOK+=24;
        sober_time+=topP_time;
        if (P!=0 && problem==0){ //it only works when user drink more than 0 mililiters of alcohol and proper fields ane filled
            $("#result").html("Wyniki:"); //results added to element #result
            if (P>6) $("#result").append("</br>Ilość alkoholu we krwi po wypiciu tego wszystkiego to: "+P+" ‰. Nie żyjesz.");
            else $("#result").append("</br>Ilość alkoholu we krwi po wypiciu tego wszystkiego to: "+P+" ‰");
            $("#result").append('</br>Skończyłeś pić o '+stopHour+'.00.');
            $("#result").append('</br>Będziesz trzeźwiał przez '+sober_time+' godzin po skończeniu picia.');
            if (days==0) $("#result").append('</br>Możesz prowadzić samochód o '+time_alcOK+'.00 . Będziesz miał wtedy mniej niż 0.2 ‰.');
            else $("#result").append('</br>Możesz prowadzić samochód po '+days+' dniach, o godz. '+time_alcOK+'.00 . Będziesz miał wtedy mniej niż 0.2 ‰.');
            $("#result").append('</br>Będziesz całkowicie trzeźwy o godzinie '+time_OK+".00");

        }
        else if (P!=0) alert("Wprowadż dane o sobie!");
        else if (problem==0 ) alert("Wprowadż dane na temat wypitego alkoholu!");
    });

    $("button[name='clear']").click(function(){ //'Wyczysc formularz' button
        $("input[name='ilewody']").val("");
        $("input[name='ilewina']").val("");
        $("input[name='ilepiwa']").val("");
        $("input[name='iledrinkow']").val("");

        $("input[name='moc1']").val("");
        $("input[name='moc2']").val("");
        $("input[name='moc3']").val("");
        $("input[name='moc4']").val("");

        $("#result").html("Wyniki:");
    });
}
$(document).ready(main); 

var main = function(){

$("#calc").click(calc_alcohol);
$("#clear").click(clear_alc);  
    var age, 
    height, 
    gender = 'woman', 
    weight, stomach='1/2', 
    problem=0, 
    how_much1, how_much2, how_much3, how_much4, 
    power1, power2, power3, power4, 
    alc_type1, alc_type2, alc_type3, alc_type4, 
    A=0, 
    K=0.7, 
    P=0, 
    stopHour, 
    topP_time, 
    days=0, 
    sober_time=0, 
    time_OK, 
    time_alcOK; //creating global variables

    function calc_alcohol(){ // "function calculating everything. css class = .calculate"

        get_data_About_You();
        get_data_Alcohol();
        get_data_How_long_was_party();
        data_validation();
        promile_calc();
        sober_period_calc();
        show_results();

    };

    function get_data_About_You(){        //assigning data from input fields into variables - 'Cos o Tobie' section
            age = parseInt($("input[id='age']").val());
            height = parseInt($("input[id='height']").val());
            if ($("input[value='Man']").is(':checked')) gender='man';
            weight = parseInt($("input[id='weight']").val());
            if ($("input[value='full']").is(':checked')) stomach='1';
            if ($("input[value='empty']").is(':checked')) stomach='0';
    }


        
    function get_data_Alcohol(){ //assigning data from input fields into variables - 'Ile Wypiłeś' section
            P=0;
            how_much1 = parseInt($("input[id='How_much_vodka']").val());
            how_much2 = parseInt($("input[id='How_much_wine']").val());
            how_much3 = parseInt($("input[id='How_much_beer']").val());
            how_much4 = parseInt($("input[id='How_much_drinks']").val());

            power1 = parseInt($("input[id='power1']").val());
            power2 = parseInt($("input[id='power2']").val());
            power3 = parseInt($("input[id='power3']").val());
            power4 = parseInt($("input[id='power4']").val());

            switch($("select[id='measure1']").val()){ //assinging mililiters depending on the option chosen by user
                case "mk":
                    alc_type1=25; 
                    break;
                case "sk":
                    alc_type=30;
                    break;
                case "dk":
                    alc_type1=50;
                    break;
                case "b02":
                    alc_type1=200;
                    break;
                case "b05":
                    alc_type1=500;
                    break;
                case "b07":
                    alc_type1=700;
                    break;
                default: alc_type1=1;
            }

            switch($("select[id='measure2']").val()){ //assinging mililiters depending on the option chosen by user             
                case "mkl":
                    alc_type2=100;
                    break;
                case "dkl":
                    alc_type2=150;
                    break;
                case "b075":
                    alc_type2=750;
                    break;
                default: alc_type2=1;
            }

            switch($("select[id='measure3']").val()){ //assinging mililiters depending on the option chosen by user               
                case "mk":
                    alc_type3=300;
                    break;
                case "dk":
                    alc_type3=500;
                    break;
                case "b033":
                    alc_type3=330;
                    break;
                case "b05":
                    alc_type3=500;
                    break;
                case "b066":
                    alc_type3=660;
                    break;
                default: alc_type3=1;
            }

            switch($("select[id='measure4']").val()){ //assinging mililiters depending on the option chosen by user
                case "ds":
                    alc_type4=250;
                    break;
                case "ss":
                    alc_type4=200;
                    break;
                case "ks":
                    alc_type4=150;
                    break;
                default: alc_type4=1;
            }
    }

    function get_data_How_long_was_party() { //assigning data from input fields into variables - 'Cos o Tobie' section
            stopHour = parseInt($("input[id='startHour']").val()) + parseInt($("input[id='how_many_hours']").val());
            while (stopHour>24) stopHour-=24; 
    }


    function data_validation() {//avoiding mistakes due to wrong inputs
            if (age>0 && height>0 && weight>0) problem=0;
            else problem=1;
            if (!$("input[id='How_much_vodka']").val()) how_much1=0; //avoiding mistakes in case user will not fill the fields
            if (!$("input[id='How_much_wine']").val()) how_much2=0;
            if (!$("input[id='How_much_beer']").val()) how_much3=0;
            if (!$("input[id='How_much_drinks']").val()) how_much4=0;
            if (!$("input[id='power1']").val()) power1=0; //avoiding mistakes in case user will not fill the fields
            if (!$("input[id='power2']").val()) power2=0;
            if (!$("input[id='power3']").val()) power3=0;
            if (!$("input[id='power4']").val()) power4=0;

    }


    function promile_calc(){// calculating BMI and the sum of alcohol that was consumed
            var BMI = weight / (height*height/10000)
            if (gender=="woman") K=0.6 //K is 0.6 for women and 0.7 for men
            A = (how_much1*alc_type1/100 * power1 + how_much2*alc_type2/100 * power2 + how_much3*alc_type3/100 * power3 + how_much4*alc_type4/100 * power4)*0.79; //A is sum of alcohol consumed
            if (BMI<25) P=A/(K*weight); //there are 2 ways to calculate promiles depending on BMI. That's why here we have 'if'
            else{
                fat=((BMI-24.99)/BMI)*weight;
                P=A/(0.2*fat + K*(weight-fat));
            }
            P=Math.round(P*100)/100; // <-result, alcohol in blood
    }
        
    function sober_period_calc(){  // % of alcohol vs time
            sober_time=0;
            days=0;
            if (stomach=="0") topP_time = 0; //how many hours after finishing drinking, user has the most alcohol in blood. It depends on stomach.
            else if (stomach=="1/2") topP_time = 1;
            else topP_time = 2;

            var metabolism=10;
            if (gender=="woman") metabolism=8;
            var currentState=A; //current state is equal to alcohol in blood. every hour it's less and less
            while (currentState>0){
                sober_time+=1;
                currentState-=metabolism;
            }
            time_OK = stopHour+sober_time+topP_time; //time when user will be totally fine. No alcohol in blood.
            while (time_OK>24) {
                time_OK-=24;
                days+=1;
            }
            time_alcOK = time_OK-2;
            if (time_alcOK<0) time_alcOK+=24;
            sober_time+=topP_time;
    }
    
    function show_results(){
            if (P!=0 && problem==0){ //it only works when user drink more than 0 mililiters of alcohol and proper fields ane filled
                $("#result").html("Wyniki:"); //results added to element #result
                if (P>6) $("#result").append("<span></br>Ilość alkoholu we krwi po wypiciu tego wszystkiego to: "+P+" ‰. Nie żyjesz.</span>");
                else $("#result").append("<span></br>Ilość alkoholu we krwi po wypiciu tego wszystkiego to: "+P+" ‰</span>");
                $("#result").append('<span></br>Skończyłeś pić o '+stopHour+'.00.</span>');
                $("#result").append('<span></br>Będziesz trzeźwiał przez '+sober_time+' godzin po skończeniu picia.</span>');
                if (days==0) $("#result").append('<span></br>Możesz prowadzić samochód o '+time_alcOK+'.00 . Będziesz miał wtedy mniej niż 0.2 ‰.</span>');
                else $("#result").append('<span></br>Możesz prowadzić samochód po '+days+' dniach, o godz. '+time_alcOK+'.00 . Będziesz miał wtedy mniej niż 0.2 ‰.</span>');
                $("#result").append('<span></br>Będziesz całkowicie trzeźwy o godzinie '+time_OK+".00</span>");

            }
            else if (P!=0) alert("Wprowadż dane o sobie!");
            else if (problem==0 ) alert("Wprowadż dane na temat wypitego alkoholu!");
    }

    
    function clear_alc() { //'Wyczysc formularz' button
        $("input[id='How_much_vodka']").val("");
        $("input[id='How_much_wine']").val("");
        $("input[id='How_much_beer']").val("");
        $("input[id='How_much_drinks']").val("");

        $("input[id='power1']").val("");
        $("input[id='power2']").val("");
        $("input[id='power3']").val("");
        $("input[id='power4']").val("");

        $("#result").html("Wyniki:");
    };
}

$(document).ready(main);

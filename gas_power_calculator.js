//slider functionality
(function()
{

            var cases_slider = document.getElementById('cases_slider');
            noUiSlider.create(cases_slider, {
              start:1000,
              behaviour:'tap',
              connect:'lower',
              step: 10,
              range: {
                'min':100,
                '30%':1000,
                '70%':10000,
                'max':100000
              },
              format: wNumb({
                decimals:0
              })
            });
            cases_slider.noUiSlider.on('update', function(values, handle){
              cases_input.value = values[handle];
            });
            cases_slider.noUiSlider.on('set', function(){
                update();
            });
            cases_input.addEventListener('change', function(){
              cases_slider.noUiSlider.set(this.value);
            });

            var controls_slider = document.getElementById('controls_slider');
            noUiSlider.create(controls_slider, {
                start: 1000,
                behaviour: 'tap',
                connect: 'lower',
                step: 10,
                range: {
                    'min':100,
                    '30%':1000,
                    '70%':10000,
                    'max':100000
                },
                format: wNumb({
                    decimals: 0
                })
            });
            controls_slider.noUiSlider.on('update', function(values, handle){
                controls_input.value = values[handle];
            });
            controls_slider.noUiSlider.on('set', function(){
                update();
            });
            controls_input.addEventListener('change', function(){
              controls_slider.noUiSlider.set(this.value);
            });

            var sig_slider = document.getElementById('sig_slider');
            noUiSlider.create(sig_slider, {
               start: 0.000007,
                behaviour: 'tap',
                connect: 'lower',
                range: {
                    'min':  1e-10,
                    '10%':1e-9,
                    '20%':1e-8,
                    '30%':1e-7,
                    '40%':1e-6,
                    '50%':1e-5,
                    '60%':1e-4,
                    '70%':1e-3,
                    '80%':1e-2,
                    '90%':1e-1,
                    'max':  1
                },
                format: wNumb({
                    decimals: 10,
                })
            });

            //slider to input
            sig_slider.noUiSlider.on('update', function(values, handle){
                var val = parseFloat(values[handle]);
                //2 significant digits
                sig_input.value = val.toFixed(Math.abs(Math.ceil(Math.log10(val)))+2);
            });
            sig_slider.noUiSlider.on('set', function(){
                update();
            });
            //input to slider
            sig_input.addEventListener('change', function(){
                sig_slider.noUiSlider.set(this.value);
            });

            var prev_slider = document.getElementById('prev_slider');
            noUiSlider.create(prev_slider, {
                start: 0.1,
                behaviour: 'tap',
                connect: 'lower',
                range: {
                    'min':  0.0001,
                    'max':  1
                },
                format: wNumb({
                    decimals:4
                })
            });
            prev_slider.noUiSlider.on('update', function(values, handle){
              prev_input.value = values[handle];
            });
            prev_slider.noUiSlider.on('set', function(){
                update();
            });
            prev_input.addEventListener('change', function(){
              prev_slider.noUiSlider.set(this.value);
            });

           var allele_slider = document.getElementById('allele_slider');
           noUiSlider.create(allele_slider, {
                start: 0.5,
                behaviour: 'tap',
                connect: 'lower',
                range: {
                    'min':  0.0001,
                    'max':  1
                },
                format: wNumb({
                    decimals:4
                })
            });
            allele_slider.noUiSlider.on('update', function(values, handle){
              allele_input.value = values[handle];
            });
            allele_slider.noUiSlider.on('set', function(){
                update();
            });
            allele_input.addEventListener('change', function(){
              allele_slider.noUiSlider.set(this.value);
            });

            var rr_slider = document.getElementById('rr_slider');
            noUiSlider.create(rr_slider, {
              start: 1.5,
                behaviour: 'tap',
                connect: 'lower',
                range: {
                    'min':1,
                    '50%':3,
                    'max':10
                },
                format: wNumb({
                    decimals:4
                })
            });
            rr_slider.noUiSlider.on('update', function(values, handle){
              rr_input.value = values[handle];
            });
            rr_slider.noUiSlider.on('set', function(){
                update();
            });
            rr_input.addEventListener('change', function(){
              rr_slider.noUiSlider.set(this.value);
            });

})();

//helper functions to calculate power
var LOWER_TAIL_ONE = 7.5;
var UPPER_TAIL_ZERO = 20;

//squares a number
function square(x)
{
    return x * x;
}

// Inverse normal distribution
function ninv(p)
{
    var SPLIT1 = 0.425;
    var SPLIT2 = 5.0;
    var CONST1 = 0.180625;
    var CONST2 = 1.6;

    var a = [
        3.3871328727963666080E0,
        1.3314166789178437745E2,
        1.9715909503065514427E3,
        1.3731693765509461125E4,
        4.5921953931549871457E4,
        6.7265770927008700853E4,
        3.3430575583588128105E4,
        2.5090809287301226727E3
    ] ;

    var b = [
        4.2313330701600911252E1,
        6.8718700749205790830E2,
        5.3941960214247511077E3,
        2.1213794301586595867E4,
        3.9307895800092710610E4,
        2.8729085735721942674E4,
        5.2264952788528545610E3
    ] ;

    var c = [
        1.42343711074968357734E0,
        4.63033784615654529590E0,
        5.76949722146069140550E0,
        3.64784832476320460504E0,
        1.27045825245236838258E0,
        2.41780725177450611770E-1,
        2.27238449892691845833E-2,
        7.74545014278341407640E-4
    ] ;

    var d = [
        2.05319162663775882187E0,
        1.67638483018380384940E0,
        6.89767334985100004550E-1,
        1.48103976427480074590E-1,
        1.51986665636164571966E-2,
        5.47593808499534494600E-4,
        1.05075007164441684324E-9
    ] ;

    var e = [
        6.65790464350110377720E0,
        5.46378491116411436990E0,
        1.78482653991729133580E0,
        2.96560571828504891230E-1,
        2.65321895265761230930E-2,
        1.24266094738807843860E-3,
        2.71155556874348757815E-5,
        2.01033439929228813265E-7
    ] ;

    var f = [
        5.99832206555887937690E-1,
        1.36929880922735805310E-1,
        1.48753612908506148525E-2,
        7.86869131145613259100E-4,
        1.84631831751005468180E-5,
        1.42151175831644588870E-7,
        2.04426310338993978564E-15
    ] ;

    var q = p - 0.5;
    var r;
    var x;

    if ( Math.abs( q ) < SPLIT1 ) {
        r = CONST1 - q * q ;
        return q * ((((((( a[7] * r + a[6] ) * r + a[5] ) * r + a[4] ) * r
                       + a[3] ) * r + a[2] ) * r + a[1] ) * r + a[0] ) /
        ((((((( b[6] * r + b[5] ) * r + b[4] ) * r + b[3] ) * r
            + b[2] ) * r + b[1] ) * r + b[0] ) * r + 1.0 ) ;
    } else {
        if ( q < 0 )
            r = p ;
        else
            r = 1.0 - p ;

        if ( r < 1e-10)
            return (q < 0 ? -20.0 : 20.0);

        if ( r > 0.0 )
        {
            r = Math.sqrt( -Math.log( r ) ) ;
            if ( r <= SPLIT2 )
            {
                r -= CONST2 ;
                x = ((((((( c[7] * r + c[6] ) * r + c[5] ) * r + c[4] ) * r
                        + c[3] ) * r + c[2] ) * r + c[1] ) * r + c[0] ) /
                ((((((( d[6] * r + d[5] ) * r + d[4] ) * r + d[3] ) * r
                    + d[2] ) * r + d[1] ) * r + d[0] ) * r + 1.0 ) ;
            }
            else
            {
                r -= SPLIT2 ;
                x =  ((((((( e[7] * r + e[6] ) * r + e[5] ) * r + e[4] ) * r
                         + e[3] ) * r + e[2] ) * r + e[1] ) * r + e[0] ) /
                ((((((( f[6] * r + f[5] ) * r + f[4] ) * r + f[3] ) * r
                    + f[2] ) * r + f[1] ) * r + f[0] ) * r + 1.0 ) ;
            }
        }
        else
            x = 9;

        if ( q < 0 )
            x = -x ;
        return x ;
    }
}

// The standard normal distribution
function ndist(z, upper)
{

    if (z < 0)
    {
        upper = !upper;
        z = -z;
    }

    if ( ((z > LOWER_TAIL_ONE) && !upper) || (z > UPPER_TAIL_ZERO))
        return (upper) ? 0.0 : 1.0;

    var p;
    var y = 0.5 * z * z;

    if (z < 1.28)
    {
        p = 0.5 - z * (0.398942280444 - 0.399903438504 * y /
                       (y + 5.75885480458 - 29.8213557808 /
                        (y + 2.62433121679 + 48.6959930692 /
                         (y + 5.92885724438))));
    }
    else
    {
        p = 0.398942270385 * Math.exp (-y) /
        (z - 2.8052e-8 + 1.00000615302 /
         (z + 3.98064794e-4 + 1.98615381364 /
          (z - 0.151679116635 + 5.29330324926 /
           (z + 4.8385912808 - 15.1508972451 /
            (z + 0.742380924027 + 30.789933034 /
             (z + 3.99019417011))))));
    }

    return (upper) ? p : 1 - p;
}

//calculates all variables
//graphs power for selected variable
function calculate(ncases, ncontrols, freq, risk, prevalence, alpha)
{
    // Genotype frequencies
    var p = [square(freq), 2 * freq * (1. - freq), square(1. - freq)];
    var aa_freq = p[0];
    var ab_freq = p[1];
    var bb_freq = p[2];

    //genotype probabilities
    var f = [risk * risk, risk, 1.0];
    var scale = prevalence / (f[0]*p[0] + f[1]*p[1] + f[2]*p[2]);

    // Adjusted penetrances
    f[0] *= scale;
    f[1] *= scale;
    f[2] *= scale;

    var error = false;

    if (f[0] > 1.0)
    {
        //this will result in error
        error = true;
    }

    var aa_prob = f[0];
    var ab_prob = f[1];
    var bb_prob = f[2];

    var C = - ninv(alpha * 0.5);
    var pcases = (f[0] * p[0] + f[1] * p[1] * 0.5) / prevalence; //disease allele freq cases
    var pcontrols = ( (1. - f[0]) * p[0] + (1. - f[1]) * p[1] * 0.5) / (1. - prevalence); //disease allele freq controls
    var vcases = pcases * (1.0 - pcases);
    var vcontrols = pcontrols * (1.0 - pcontrols);
    var ncp = (pcases - pcontrols) / Math.sqrt( (vcases / ncases + vcontrols / ncontrols) * 0.5 );
    var P = ndist(-C - ncp, false) + ndist(C - ncp, true); //results power

    var results_array = [P, pcases, pcontrols, aa_freq, aa_prob, ab_freq, ab_prob, bb_freq, bb_prob, error];

    return results_array;
}

//updates progress bar section
function print(ncases, ncontrols, freq, risk, prevalence, alpha, error)
{
  var a = calculate(ncases, ncontrols, freq, risk, prevalence, alpha);
  var P = a[0]; var pcases = a[1]; var pcontrols =a[2]; var aa_freq = a[3]; var aa_prob = a[4];
  var ab_freq = a[5]; var ab_prob = a[6]; var bb_freq = a[7]; var bb_prob = a[8]; var error = a[9];

  if (error){return;}

  $("#power_progress").html(P.toFixed(3)).attr("style","width:" + (P * 100) + "%;");
  $('#cases_progress').html(pcases.toFixed(3)).attr("style","width:" + (pcases * 100) + "%;");
  $('#controls_progress').html(pcontrols.toFixed(3)).attr("style","width:" + (pcontrols * 100) + "%;");
  $('#AA_freq').html(aa_freq.toFixed(3));
  $('#AA_progress').html(aa_prob.toFixed(3)).attr("style","width:" + (aa_prob * 100) + "%;");
  $('#AB_freq').html(ab_freq.toFixed(3));
  $('#AB_progress').html(ab_prob.toFixed(3)).attr("style","width:" + (ab_prob * 100) + "%;");
  $('#BB_freq').html(bb_freq.toFixed(3));
  $('#BB_progress').html(bb_prob.toFixed(3)).attr("style","width:" + (bb_prob * 100) + "%;");
}

//updates graph section
//selectparam comes from select picker
function graph(ncases, ncontrols, freq, risk, prevalence, alpha, selectparam)
{
  //check initial condition errors
  var a = calculate(ncases, ncontrols, freq, risk, prevalence, alpha);
  var error = a[9];
  if (error)
  {
      alert("I don't like the genetic model you requested! \nPlease try different parameters");
      return;
  }

  //find points
  var i; var j; var calc; var x=[]; var y=[]; var err; var testx=[]; var graphdata=[]; var graphtype;
  if(selectparam == "Cases"){
    testx = [100,125,150,200,250,300,350,400,450,500,600,700,800,900,1000,1250,1500,2000,3000,5000,7000,10000,20000,30000,50000,100000];
    for (i=0; i < testx.length; i++) {
      calc = calculate(testx[i], ncontrols, freq, risk, prevalence, alpha);
      err = calc[9];
      if (err){continue;}
      x.push(testx[i]);
      y.push(parseFloat(calc[0].toFixed(3)));
    }
    graphtype = "logarithmic";
  }
  else if(selectparam == "Controls"){
    testx = [100,125,150,200,250,300,350,400,450,500,600,700,800,900,1000,1250,1500,2000,3000,5000,7000,10000,20000,30000,50000,100000];
    for (i=0; i < testx.length; i++) {
      calc = calculate(ncases, testx[i], freq, risk, prevalence, alpha);
      err = calc[9];
      if (err){continue;}
      x.push(testx[i]);
      y.push(parseFloat(calc[0].toFixed(3)));
    }
    graphtype = "logarithmic";
  }
  else if (selectparam == "Significance level"){
    testx = [1e-10,2e-10,3e-10,4e-10,5e-10,1e-9,5e-9,1e-8,5e-8,1e-7,5e-7,1e-6,7e-6,1e-5,5e-5,1e-4,5e-4,1e-3,5e-3,1e-2,5e-2,1e-1,5e-1,1];
    for (i=0; i < testx.length; i++) {
      calc = calculate(ncases, ncontrols, freq, risk, prevalence, testx[i]);
      err = calc[9];
      if (err){continue;}
      x.push(testx[i]);
      y.push(parseFloat(calc[0].toFixed(3)));
    }
    graphtype = "logarithmic";
  }
  else if (selectparam == "Prevalence"){
    testx = [0.001,0.01,0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,1];
    for (i=0; i < testx.length; i++) {
      calc = calculate(ncases, ncontrols, freq, risk, testx[i], alpha);
      err = calc[9];
      if (err){continue;}
      x.push(testx[i]);
      y.push(parseFloat(calc[0].toFixed(3)));
    }
    graphtype = "linear";
  }
  else if (selectparam == "Disease Allele Frequency"){
    testx = [0.001,0.01,0.02,0.03,0.04,0.05,0.06,0.07,0.08,0.09,0.1,0.12,0.15,0.17,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.81,0.82,0.83,0.84,0.85,0.86,0.87,0.88,0.89,0.9,0.91,0.92,0.93,0.94,0.95,0.96,0.97,0.98,0.99];
    for (i=0; i < testx.length; i++) {
      calc = calculate(ncases, ncontrols, testx[i], risk, prevalence, alpha);
      err = calc[9];
      if (err){continue;}
      x.push(testx[i]);
      y.push(parseFloat(calc[0].toFixed(3)));
    }
    graphtype = "linear";
  }
  else if (selectparam == "Genotype Relative Risk"){
    testx = [1,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3,3.5,4,4.5,5,6,7,8,9,10];
    for (i=0; i < testx.length; i++) {
      calc = calculate(ncases, ncontrols, freq, testx[i], prevalence, alpha);
      err = calc[9];
      if (err)
      {continue;}
      x.push(testx[i]);
      y.push(parseFloat(calc[0].toFixed(3)));
    }
    graphtype = "logarithmic";
  }
  //fill data array for graph
  for (j=0; j<x.length; j++) {
    graphdata.push([x[j],y[j]]);
  }
  //graph using highcharts api
  $('#highcharts_graph').highcharts({
      chart: {
          type: 'scatter',
          zoomType: 'x'
      },
      colors: ['#40658f'],
      title:{
          text:''
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
           'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      plotOptions:{
          scatter:{
            lineWidth:2
          }
      },
      xAxis: {
          title: {
            text: selectparam
          },
          type: graphtype
      },
      yAxis: {
          title: {
              text: 'Statistical Power'
          },
          max: 1
      },
      legend: {
            enabled: false
        },
      series: [{
          name: selectparam,
          data: graphdata
      }]
  });

}

//updates both progress bar and graph sections. Called from sliders
function update()
{
  //get values from sliders and x variable selection for graph
  var ncases = cases_slider.noUiSlider.get();
  var ncontrols = controls_slider.noUiSlider.get();
  var freq = allele_slider.noUiSlider.get();
  var risk = rr_slider.noUiSlider.get();
  var prevalence = prev_slider.noUiSlider.get();
  var alpha = sig_input.value;
  var selectparam = $("#x_graph option:selected").val();

  //update progress bars and graph
  print(ncases, ncontrols, freq, risk, prevalence, alpha);
  graph(ncases, ncontrols, freq, risk, prevalence, alpha, selectparam);
}

//updates graph section when selectpicker in changed
$("#x_graph").change(function ()
{
  //get values from sliders and x variable selection for graph
  var ncases = cases_slider.noUiSlider.get();
  var ncontrols = controls_slider.noUiSlider.get();
  var freq = allele_slider.noUiSlider.get();
  var risk = rr_slider.noUiSlider.get();
  var prevalence = prev_slider.noUiSlider.get();
  var alpha = sig_input.value;
  var selectparam = $("#x_graph option:selected").val();

  //updates graph
  graph(ncases, ncontrols, freq, risk, prevalence, alpha, selectparam);
})

//stand-in graph for default parameters
$(function ()
{
  $('#highcharts_graph').highcharts({
      chart: {
          type: 'scatter',
          zoomType: 'x'
      },
      colors: ['#40658f'],
      title:{
        text:''
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
           'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      plotOptions:{
          scatter:{
            lineWidth:2
          }
      },
      xAxis: {
          title: {
            text: 'Cases'
          },
          type: 'logarithmic'

      },
      yAxis: {
          title: {
              text: 'Statistical Power'
          },

          max: 1
      },
      legend: {
            enabled: false
        },

      series: [{
          name: 'Cases',
          data: [[100,0.075],[125,0.131],[150,0.2],[200,0.357],[250,0.51],[300,0.639],[350,0.74],[400,0.815],[450,0.869],[500,0.907],[600,0.953],[700,0.975],[800,0.986],[900,0.992],[1000,0.995],[1250,0.999],[1500,0.999],[2000,1],[3000,1],[5000,1],[7000,1],[10000,1],[20000,1],[30000,1],[50000,1],[100000,1]]
      }]
  });
})

$(document).ready(function()
{
	$(this).scrollTop(0);

	var switches = [false, false, false, false, false];

	var ids = 
	[
		"comproj-div-1-1-1", "comproj-div-2-1-1", "comproj-div-3-1-1", "comproj-div-4-1-1", 

		"engproj-div-1-1-1" 
	];

	$("#comproj-div-1-1-1").click(function()
	{
		switches[0] = !switches[0];
	});
	$("#comproj-div-2-1-1").click(function()
	{
		switches[1] = !switches[1];
	});
	$("#comproj-div-3-1-1").click(function()
	{
		switches[2] = !switches[2];
	});
	$("#comproj-div-4-1-1").click(function()
	{
		switches[3] = !switches[3];
	});

	$("#engproj-div-1-1-1").click(function()
	{
		switches[4] = !switches[4];
	});

	$(".collapse").on('show.bs.collapse', function()
	{
		change_border_radius(switches, ids);
	});
	$(".collapse").on('hidden.bs.collapse', function()
	{
		change_border_radius(switches, ids);
	});
});

function tab_clicked(tabNameInput)
{
	var tabNameArray = ["about", "comproj", "engproj", "contact"];
	var bgColorArray = ["#2B7A78", "OliveDrab", "OliveDrab", "#202020"]; //8BC064 OliveDrab DarkOliveGreen
	var navlinkCol = ["black", "black", "black", "grey"];
	$('.tab-content').css('visibility', 'hidden');
	$('.nav-item').css('cssText', 'background-color: #202020 !important');
	$('#div1').css('background-color', '#151515');

	window.setTimeout(function()
	{
		$('#div1').css('background-color', bgColorArray[jQuery.inArray(tabNameInput, tabNameArray)]);
		$('.nav-item').css('cssText', 'background-color: ' + bgColorArray[jQuery.inArray(tabNameInput, tabNameArray)] + ' !important');
		$('.nav-link').css('cssText', 'color: ' + navlinkCol[jQuery.inArray(tabNameInput, tabNameArray)] + ' !important');
		$('.nav-link.active').css('cssText', 'color: gainsboro !important');
		$('.tab-content').css('visibility', 'visible');
	}, 500);
}

function change_border_radius(inputArray1, inputArray2)
{
	for (var i = 0; i < inputArray1.length; i++)
	{
		if (inputArray1[i])
		{
			document.getElementById(inputArray2[i]).style.borderBottomLeftRadius = "0px";
			document.getElementById(inputArray2[i]).style.borderBottomRightRadius = "0px";
			document.getElementById(inputArray2[i].concat("-arrow")).innerHTML = "<h1> &nbsp;&nbsp;⌃ &nbsp;&nbsp;</h1>";
		}
		else
		{
			document.getElementById(inputArray2[i]).style.borderBottomLeftRadius = "15px";
			document.getElementById(inputArray2[i]).style.borderBottomRightRadius = "15px";
			document.getElementById(inputArray2[i].concat("-arrow")).innerHTML = "<h1> &nbsp;&nbsp;⌄ &nbsp;&nbsp;</h1>";
		}
	}
}

function cv_button_clicked()
{
	window.open('https://www.google.com/', '_blank');
}

function func_copy(textString)
{
alert('yo');
	/* Get the text field */
	//var copyText = document.getElementById("myInput");

	/* Select the text field */
	//copyText.select();
	//copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	/* Copy the text inside the text field */
	//document.execCommand("copy");

	/* Alert the copied text */
	//alert("Copied the text: " + copyText.value);
}




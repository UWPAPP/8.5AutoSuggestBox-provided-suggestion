// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
			// this is a good place to decide whether to populate an input field or choose a different initial view.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// A Launch activation happens when the user launches your app via the tile
			// or invokes a toast notification by clicking or tapping on the body.
			if (args.detail.arguments) {
				// TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
				// to take the user in response to them invoking a toast notification.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: This application had been suspended and was then terminated to reclaim memory.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
				// Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		}

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();



    //得到搜索数据的列表
	var suggestionList = ["Shanghai", "Istanbul", "Karachi", "Delhi", "Mumbai", "Moscow", "Seoul", "Beijing", "Jakarta",
        "Tokyo", "Mexico City", "Kinshasa", "New York City", "Lagos", "London", "Lima", "Bogota", "Tehran", "Ho Chi Minh City", "Hong Kong",
        "Bangkok", "Dhaka", "Cairo", "Hanoi", "Rio de Janeiro", "Lahore", "Chonquing", "Bengaluru", "Tianjin", "Baghdad", "Riyadh", "Singapore",
        "Santiago", "Saint Petersburg", "Surat", "Chennai", "Kolkata", "Yangon", "Guangzhou", "Alexandria", "Shenyang", "Hyderabad", "Ahmedabad",
        "Ankara", "Johannesburg", "Wuhan", "Los Angeles", "Yokohama", "Abidjan", "Busan", "Cape Town", "Durban", "Pune", "Jeddah", "Berlin",
        "Pyongyang", "Kanpur", "Madrid", "Jaipur", "Nairobi", "Chicago", "Houston", "Philadelphia", "Phoenix", "San Antonio", "San Diego",
        "Dallas", "San Jose", "Jacksonville", "Indianapolis", "San Francisco", "Austin", "Columbus", "Fort Worth", "Charlotte", "Detroit",
        "El Paso", "Memphis", "Baltimore", "Boston", "Seattle Washington", "Nashville", "Denver", "Louisville", "Milwaukee", "Portland",
        "Las Vegas", "Oklahoma City", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Long Beach", "Kansas City", "Mesa", "Virginia Beach",
        "Atlanta", "Colorado Springs", "Omaha", "Raleigh", "Miami", "Cleveland", "Tulsa", "Oakland", "Minneapolis", "Wichita", "Arlington",
        "Bakersfield", "New Orleans", "Honolulu", "Anaheim", "Tampa", "Aurora", "Santa Ana", "St. Louis", "Pittsburgh", "Corpus Christi",
        "Riverside", "Cincinnati", "Lexington", "Anchorage", "Stockton", "Toledo", "St. Paul", "Newark", "Greensboro", "Buffalo", "Plano",
        "Lincoln", "Henderson", "Fort Wayne", "Jersey City", "St. Petersburg", "Chula Vista", "Norfolk", "Orlando", "Chandler", "Laredo", "Madison",
        "Winston-Salem", "Lubbock", "Baton Rouge", "Durham", "Garland", "Glendale", "Reno", "Hialeah", "Chesapeake", "Scottsdale", "North Las Vegas",
        "Irving", "Fremont", "Irvine", "Birmingham", "Rochester", "San Bernardino", "Spokane", "Toronto", "Montreal", "Vancouver", "Ottawa-Gatineau",
        "Calgary", "Edmonton", "Quebec City", "Winnipeg", "Hamilton"];

    //搜索过程的方法
	function suggestionsRequestedHandler(eventObject) {
	    var queryText = eventObject.detail.queryText,
        query = queryText.toLowerCase(),
        suggestionCollection = eventObject.detail.searchSuggestionCollection;
	    if (queryText.length > 0) {
	        for (var i = 0, len = suggestionList.length; i < len; i++) {
	            if (suggestionList[i].substr(0, query.length).toLowerCase() === query) {
	                suggestionCollection.appendQuerySuggestion(suggestionList[i]);
	            }
	        }
	    }
	}

    //搜索结束的方法
	function querySubmittedHandler(eventObject) {
	    var queryText = eventObject.detail.queryText;
	    WinJS.log && WinJS.log(queryText, "sample", "status");
	}

    //打印信息
	WinJS.log = function (msg, source, type) {
	    if (type === "status") {
	        document.getElementById("statusEl").innerHTML += msg + "<br/>";
	    }
	}

    //NameSpace
	WinJS.Namespace.define("Sample", {
	    suggestionsRequestedHandler: WinJS.UI.eventHandler(suggestionsRequestedHandler),
	    querySubmittedHandler: WinJS.UI.eventHandler(querySubmittedHandler)
	});

	WinJS.UI.processAll();



})();
